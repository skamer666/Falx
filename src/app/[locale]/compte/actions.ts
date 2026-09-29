"use server";

import { redirect } from "next/navigation";
import type { Locale } from "@/i18n/config";
import {
  createUser,
  createMagicLink,
  createDossier,
  getUserByEmail,
  putAttachment,
  type Plan,
} from "@/lib/account/db";
import { sendMagicLinkEmail, notifyAdminOfDossier } from "@/lib/account/email";
import { getCurrentUser, clearSessionCookie, getSessionCookieValue } from "@/lib/account/session";
import { deleteSession } from "@/lib/account/db";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function requestAccess(locale: Locale, formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!isValidEmail(email)) {
    redirect(`/${locale}/compte?error=email`);
  }

  const existing = await getUserByEmail(email);
  if (!existing) {
    redirect(`/${locale}/compte/inscription?email=${encodeURIComponent(email)}`);
  }

  const token = await createMagicLink(email);
  await sendMagicLinkEmail(email, token, existing.locale);
  redirect(`/${locale}/compte/verifier?email=${encodeURIComponent(email)}`);
}

export async function createAccount(locale: Locale, formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const name = String(formData.get("name") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const plan = (String(formData.get("plan") ?? "essentiel") as Plan) === "croissance" ? "croissance" : "essentiel";

  if (!isValidEmail(email) || name.length < 2) {
    redirect(`/${locale}/compte/inscription?email=${encodeURIComponent(email)}&error=1`);
  }

  const existing = await getUserByEmail(email);
  if (!existing) {
    await createUser({ email, name, company: company || null, plan, locale });
  }

  const token = await createMagicLink(email);
  await sendMagicLinkEmail(email, token, locale);
  redirect(`/${locale}/compte/verifier?email=${encodeURIComponent(email)}`);
}

export async function logout(locale: Locale) {
  const sessionId = await getSessionCookieValue();
  if (sessionId) await deleteSession(sessionId);
  await clearSessionCookie();
  redirect(`/${locale}/compte`);
}

export async function submitDossier(locale: Locale, formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect(`/${locale}/compte`);

  const category = String(formData.get("category") ?? "").trim();
  const urgency = String(formData.get("urgency") ?? "normal") === "urgent" ? "urgent" : "normal";
  const description = String(formData.get("description") ?? "").trim();

  if (!category || description.length < 10) {
    redirect(`/${locale}/compte/nouveau-dossier?error=1`);
  }

  const files = formData.getAll("attachments").filter((f): f is File => f instanceof File && f.size > 0);
  const attachments: { key: string; name: string; size: number }[] = [];
  for (const file of files.slice(0, 5)) {
    const key = `dossiers/${user.id}/${Date.now()}-${file.name}`;
    const buffer = await file.arrayBuffer();
    await putAttachment(key, buffer, file.type || "application/octet-stream");
    attachments.push({ key, name: file.name, size: file.size });
  }

  await createDossier({ userId: user.id, category, urgency, description, attachments });
  await notifyAdminOfDossier({
    userEmail: user.email,
    userName: user.name,
    plan: user.plan,
    category,
    urgency,
    description,
    attachmentCount: attachments.length,
  });

  redirect(`/${locale}/compte/tableau-de-bord?soumis=1`);
}
