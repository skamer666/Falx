"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { Locale } from "@/i18n/config";
import {
  addMessage,
  consumePasswordToken,
  createDossier,
  createPasswordToken,
  createSession,
  createUser,
  deleteSession,
  deleteUserSessions,
  getDossier,
  getPasswordHash,
  getUserByEmail,
  getUserById,
  getUserForLogin,
  isAdminEmail,
  isLoginBlocked,
  isResetThrottled,
  isSignupThrottled,
  recordAttempt,
  setPasswordHash,
  touchLastLogin,
  updateProfile,
  type DossierKind,
  type Plan,
  accessState,
  peekPasswordToken,
} from "@/lib/account/db";
import {
  notifyAdminOfClientMessage,
  notifyAdminOfDossier,
  notifyAdminOfSignup,
  safeSend,
  sendPasswordLinkEmail,
  sendSignupReceivedEmail,
} from "@/lib/account/email";
import { checkPasswordStrength, hashPassword, randomToken, sha256Hex, verifyPassword } from "@/lib/account/password";
import { clearSessionCookie, getCurrentUser, getSessionCookieValue, getSessionUserRaw, setSessionCookie } from "@/lib/account/session";
import { logAudit } from "@/lib/account/admin-db";
import { CATEGORY_LABELS, DOSSIER_CATEGORIES } from "@/lib/account/categories";
import { ACCOUNT_STRINGS } from "@/lib/account/strings";
import { TERMS_VERSION } from "@/lib/account/legal";
import { storeUploads } from "@/lib/account/uploads";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

async function clientIp(): Promise<string | null> {
  const h = await headers();
  return h.get("cf-connecting-ip") ?? h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
}

function field(formData: FormData, name: string, max = 500): string {
  return String(formData.get(name) ?? "").trim().slice(0, max);
}

// ---------------------------------------------------------------------------
// Connexion : email + mot de passe, et seulement si le compte est payé
// ---------------------------------------------------------------------------

export async function login(locale: Locale, formData: FormData) {
  const email = field(formData, "email", 254).toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!isValidEmail(email) || !password) redirect(`/${locale}/compte?error=invalid`);

  const ip = await clientIp();
  if (await isLoginBlocked(email, ip)) redirect(`/${locale}/compte?error=locked&email=${encodeURIComponent(email)}`);

  const user = await getUserForLogin(email);
  const valid = await verifyPassword(password, user?.password_hash ?? null);
  if (!user || !valid) {
    await recordAttempt("login", email, ip, false);
    redirect(`/${locale}/compte?error=invalid&email=${encodeURIComponent(email)}`);
  }

  // Mot de passe correct : on peut maintenant dire pourquoi l'accès est refusé.
  const state = accessState(user);
  if (state !== "ok") {
    await recordAttempt("login", email, ip, true);
    redirect(`/${locale}/compte?error=${state}&email=${encodeURIComponent(email)}`);
  }

  await recordAttempt("login", email, ip, true);
  const session = await createSession(user.id);
  await setSessionCookie(session.id, session.expires_at);
  await touchLastLogin(user.id);
  if (user.is_admin) {
    await logAudit({ actor: user, action: "login", targetType: "user", targetId: user.id });
    redirect("/fr/admin");
  }
  redirect(`/${user.locale}/compte/tableau-de-bord`);
}

export async function logout(locale: Locale) {
  const sessionId = await getSessionCookieValue();
  if (sessionId) await deleteSession(sessionId);
  await clearSessionCookie();
  redirect(`/${locale}/compte?notice=signout`);
}

// ---------------------------------------------------------------------------
// Inscription (compte créé « en attente », activé à la main après paiement)
// ---------------------------------------------------------------------------

export async function createAccount(locale: Locale, formData: FormData) {
  const email = field(formData, "email", 254).toLowerCase();
  const name = field(formData, "name", 120);
  const company = field(formData, "company", 160);
  const phone = field(formData, "phone", 40);
  const message = field(formData, "message", 1000);
  const plan: Plan = field(formData, "plan") === "croissance" ? "croissance" : "essentiel";
  const terms = formData.get("terms") === "on";
  const aiConsent = formData.get("ai_consent") === "on";
  const back = (error: string) =>
    `/${locale}/compte/inscription?error=${error}&email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}`;

  if (!isValidEmail(email)) redirect(back("email"));
  if (name.length < 2) redirect(back("name"));
  if (!terms) redirect(back("terms"));
  if (!aiConsent) redirect(back("ai"));

  if (await getUserByEmail(email)) redirect(`/${locale}/compte?error=exists&email=${encodeURIComponent(email)}`);

  const ip = await clientIp();
  if (await isSignupThrottled(ip)) redirect(back("throttled"));
  await recordAttempt("signup", email, ip, true);

  const user = await createUser({
    email,
    name,
    company: company || null,
    phone: phone || null,
    plan,
    locale,
    status: "pending",
    termsAcceptedAt: Date.now(),
    aiConsentAt: Date.now(),
    termsVersion: TERMS_VERSION,
    signupMessage: message || null,
  });
  await logAudit({ actor: null, action: "signup", targetType: "user", targetId: user.id, detail: `${email} · ${plan}` });
  await safeSend(() => sendSignupReceivedEmail(email, name, plan, locale, TERMS_VERSION), `confirmation inscription ${email}`);
  await safeSend(
    () => notifyAdminOfSignup({ userId: user.id, name, email, company: company || null, phone: phone || null, plan, message: message || null }),
    `notification inscription ${email}`,
  );
  redirect(`/${locale}/compte/verifier?type=signup&email=${encodeURIComponent(email)}`);
}

// ---------------------------------------------------------------------------
// Mot de passe oublié / première définition
// ---------------------------------------------------------------------------

export async function requestPasswordReset(locale: Locale, formData: FormData) {
  const email = field(formData, "email", 254).toLowerCase();
  if (!isValidEmail(email)) redirect(`/${locale}/compte/mot-de-passe-oublie?error=email`);
  if (await isResetThrottled(email)) redirect(`/${locale}/compte/mot-de-passe-oublie?error=throttled`);
  await recordAttempt("reset", email, await clientIp(), false);

  let user = await getUserByEmail(email);
  // Amorçage de l'administrateur : son adresse est dans ADMIN_EMAILS, son compte se crée ici.
  if (!user && (await isAdminEmail(email))) {
    user = await createUser({
      email,
      name: "Administrateur",
      company: null,
      plan: "croissance",
      locale: "fr",
      status: "active",
      termsAcceptedAt: Date.now(),
    });
    await logAudit({ actor: null, action: "admin_bootstrap", targetType: "user", targetId: user.id, detail: email });
  }

  if (user) {
    const token = randomToken();
    await createPasswordToken(user.id, "reset", 60 * 60 * 1000, await sha256Hex(token));
    await safeSend(() => sendPasswordLinkEmail(user.email, token, user.locale));
  }
  // Même réponse que le compte existe ou non.
  redirect(`/${locale}/compte/verifier?type=reset&email=${encodeURIComponent(email)}`);
}

export async function setPasswordFromToken(locale: Locale, token: string, formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");
  const back = (error: string) => `/${locale}/compte/mot-de-passe?token=${encodeURIComponent(token)}&error=${error}`;

  if (password !== confirm) redirect(back("mismatch"));
  const tokenHash = await sha256Hex(token);
  // On valide d'abord le jeton sans le brûler : une faute de frappe ne doit pas l'invalider.
  const userId = await peekPasswordToken(tokenHash);
  if (!userId) redirect(`/${locale}/compte/mot-de-passe?token=x&error=invalid`);
  const user = await getUserById(userId);
  if (!user) redirect(`/${locale}/compte/mot-de-passe?token=x&error=invalid`);
  const problem = checkPasswordStrength(password, user.email);
  if (problem) redirect(back(`password_${problem}`));

  const consumed = await consumePasswordToken(tokenHash);
  if (!consumed) redirect(`/${locale}/compte/mot-de-passe?token=x&error=invalid`);

  await setPasswordHash(consumed, await hashPassword(password));
  await deleteUserSessions(consumed); // tout appareil connecté doit se reconnecter
  await logAudit({ actor: null, action: "password_set", targetType: "user", targetId: consumed, detail: user.email });
  redirect(`/${user.locale}/compte?notice=reset&email=${encodeURIComponent(user.email)}`);
}

// ---------------------------------------------------------------------------
// Demandes (questions rapides et dossiers)
// ---------------------------------------------------------------------------

export async function submitDossier(locale: Locale, formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect(`/${locale}/compte`);

  const kind: DossierKind = field(formData, "kind") === "question" ? "question" : "dossier";
  const category = field(formData, "category");
  const urgency = field(formData, "urgency") === "urgent" && user.plan === "croissance" ? "urgent" : "normal";
  const description = field(formData, "description", 10_000);

  if (!(DOSSIER_CATEGORIES as readonly string[]).includes(category) || description.length < 10) {
    redirect(`/${locale}/compte/nouveau-dossier?error=1`);
  }

  const uploads = await storeUploads(formData, "attachments", user.id);
  if (!uploads.ok) redirect(`/${locale}/compte/nouveau-dossier?error=file`);

  const dossier = await createDossier({
    userId: user.id,
    plan: user.plan,
    kind,
    category,
    urgency,
    description,
    attachments: uploads.attachments,
  });

  const t = ACCOUNT_STRINGS.fr;
  await safeSend(() =>
    notifyAdminOfDossier({
      dossierId: dossier.id,
      userEmail: user.email,
      userName: user.name,
      plan: user.plan,
      kindLabel: t.kinds[kind],
      category: CATEGORY_LABELS.fr[category as keyof (typeof CATEGORY_LABELS)["fr"]] ?? category,
      urgency,
      description,
      attachmentCount: uploads.attachments.length,
    }),
  );

  redirect(`/${locale}/compte/tableau-de-bord?soumis=1`);
}

export async function replyToDossier(locale: Locale, dossierId: string, formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect(`/${locale}/compte`);
  const dossier = await getDossier(dossierId);
  if (!dossier || dossier.user_id !== user.id) redirect(`/${locale}/compte/tableau-de-bord`);

  const body = field(formData, "body", 10_000);
  const uploads = await storeUploads(formData, "attachments", user.id, "messages");
  if (!uploads.ok) redirect(`/${locale}/compte/dossier/${dossierId}?error=file`);
  if (!body && uploads.attachments.length === 0) redirect(`/${locale}/compte/dossier/${dossierId}?error=empty`);

  await addMessage({
    dossierId,
    authorRole: "client",
    authorId: user.id,
    body: body || "(document joint)",
    attachments: uploads.attachments,
  });
  await safeSend(
    () => notifyAdminOfClientMessage({ dossierId, userEmail: user.email, userName: user.name, body: body || "(document joint)" }),
    `notification message ${user.email}`,
  );
  redirect(`/${locale}/compte/dossier/${dossierId}?sent=1`);
}

// ---------------------------------------------------------------------------
// Paramètres du compte
// ---------------------------------------------------------------------------

export async function saveProfile(locale: Locale, formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect(`/${locale}/compte`);
  const name = field(formData, "name", 120);
  if (name.length < 2) redirect(`/${locale}/compte/parametres?error=profile`);
  await updateProfile(user.id, { name, company: field(formData, "company", 160) || null, phone: field(formData, "phone", 40) || null });
  redirect(`/${locale}/compte/parametres?saved=profile`);
}

export async function changePassword(locale: Locale, formData: FormData) {
  const user = await getSessionUserRaw();
  if (!user) redirect(`/${locale}/compte`);
  const current = String(formData.get("current") ?? "");
  const next = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  const ip = await clientIp();
  if (await isLoginBlocked(user.email, ip)) redirect(`/${locale}/compte/parametres?error=locked`);
  if (!(await verifyPassword(current, await getPasswordHash(user.id)))) {
    await recordAttempt("login", user.email, ip, false);
    redirect(`/${locale}/compte/parametres?error=wrong`);
  }
  if (next !== confirm) redirect(`/${locale}/compte/parametres?error=mismatch`);
  const problem = checkPasswordStrength(next, user.email);
  if (problem) redirect(`/${locale}/compte/parametres?error=password_${problem}`);

  await setPasswordHash(user.id, await hashPassword(next));
  // On garde la session courante, on coupe toutes les autres.
  await deleteUserSessions(user.id);
  const session = await createSession(user.id);
  await setSessionCookie(session.id, session.expires_at);
  redirect(`/${locale}/compte/parametres?saved=password`);
}
