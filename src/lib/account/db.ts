import type { Locale } from "@/i18n/config";
import { ensureSchema } from "./schema";
import {
  computeDueAt,
  cycleStart,
  type AccountStatus,
  type AccountUser,
  type Attachment,
  type Dossier,
  type DossierKind,
  type DossierMessage,
  type DossierStatus,
  type Plan,
} from "./model";

export * from "./model";

// Dynamic import defers resolution of the "cloudflare:workers" native module to
// request time. A static import would make Next's build-time page-data
// collection (which evaluates route modules in plain Node.js) fail, since that
// module only exists inside the Cloudflare Workers runtime (vinext/workerd).
export async function db(): Promise<D1Database> {
  const { env } = await import("cloudflare:workers");
  await ensureSchema(env.DB);
  return env.DB;
}

async function bucket(): Promise<R2Bucket> {
  const { env } = await import("cloudflare:workers");
  return env.DOSSIERS;
}

export async function readEnv(name: string): Promise<string | undefined> {
  const { env } = await import("cloudflare:workers");
  const value = (env as unknown as Record<string, unknown>)[name];
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

export function newId() {
  return crypto.randomUUID();
}

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

// ---------------------------------------------------------------------------
// Administrateurs : identifiés par leur adresse (variable ADMIN_EMAILS), jamais par une colonne modifiable.
// ---------------------------------------------------------------------------

export const DEFAULT_ADMIN_EMAIL = "hey@thrax-legal.ch";

export async function adminEmails(): Promise<string[]> {
  const raw = (await readEnv("ADMIN_EMAILS")) ?? DEFAULT_ADMIN_EMAIL;
  return raw
    .split(",")
    .map((value) => normalizeEmail(value))
    .filter(Boolean);
}

export async function isAdminEmail(email: string): Promise<boolean> {
  return (await adminEmails()).includes(normalizeEmail(email));
}

// ---------------------------------------------------------------------------
// Utilisateurs
// ---------------------------------------------------------------------------

export const USER_COLUMNS =
  "id, email, name, company, plan, locale, created_at, status, paid_until, phone, notes, last_login_at, terms_accepted_at";

type UserRow = Omit<AccountUser, "is_admin">;

export function toUser(row: UserRow, admins: string[]): AccountUser {
  return { ...row, is_admin: admins.includes(row.email) };
}

export async function getUserByEmail(email: string): Promise<AccountUser | null> {
  const row = await (await db())
    .prepare(`SELECT ${USER_COLUMNS} FROM users WHERE email = ?`)
    .bind(normalizeEmail(email))
    .first<UserRow>();
  return row ? toUser(row, await adminEmails()) : null;
}

export async function getUserById(id: string): Promise<AccountUser | null> {
  const row = await (await db()).prepare(`SELECT ${USER_COLUMNS} FROM users WHERE id = ?`).bind(id).first<UserRow>();
  return row ? toUser(row, await adminEmails()) : null;
}

/** Utilisateur + hash du mot de passe, réservé à la vérification de connexion. */
export async function getUserForLogin(email: string): Promise<(AccountUser & { password_hash: string | null }) | null> {
  const row = await (await db())
    .prepare(`SELECT ${USER_COLUMNS}, password_hash FROM users WHERE email = ?`)
    .bind(normalizeEmail(email))
    .first<UserRow & { password_hash: string | null }>();
  return row ? { ...toUser(row, await adminEmails()), password_hash: row.password_hash } : null;
}

export async function getPasswordHash(userId: string): Promise<string | null> {
  const row = await (await db())
    .prepare("SELECT password_hash FROM users WHERE id = ?")
    .bind(userId)
    .first<{ password_hash: string | null }>();
  return row?.password_hash ?? null;
}

export async function createUser(input: {
  email: string;
  name: string;
  company: string | null;
  plan: Plan;
  locale: Locale;
  status?: AccountStatus;
  passwordHash?: string | null;
  phone?: string | null;
  termsAcceptedAt?: number | null;
}): Promise<AccountUser> {
  const id = newId();
  const created_at = Date.now();
  const email = normalizeEmail(input.email);
  const status = input.status ?? "pending";
  await (await db())
    .prepare(
      "INSERT INTO users (id, email, name, company, plan, locale, created_at, status, password_hash, phone, terms_accepted_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    )
    .bind(
      id,
      email,
      input.name,
      input.company,
      input.plan,
      input.locale,
      created_at,
      status,
      input.passwordHash ?? null,
      input.phone ?? null,
      input.termsAcceptedAt ?? null,
      created_at,
    )
    .run();
  return {
    id,
    email,
    name: input.name,
    company: input.company,
    plan: input.plan,
    locale: input.locale,
    created_at,
    status,
    paid_until: null,
    phone: input.phone ?? null,
    notes: null,
    last_login_at: null,
    terms_accepted_at: input.termsAcceptedAt ?? null,
    is_admin: (await adminEmails()).includes(email),
  };
}

export async function setPasswordHash(userId: string, hash: string): Promise<void> {
  await (await db())
    .prepare("UPDATE users SET password_hash = ?, updated_at = ? WHERE id = ?")
    .bind(hash, Date.now(), userId)
    .run();
}

export async function updateProfile(
  userId: string,
  input: { name: string; company: string | null; phone: string | null },
): Promise<void> {
  await (await db())
    .prepare("UPDATE users SET name = ?, company = ?, phone = ?, updated_at = ? WHERE id = ?")
    .bind(input.name, input.company, input.phone, Date.now(), userId)
    .run();
}

export async function touchLastLogin(userId: string): Promise<void> {
  await (await db()).prepare("UPDATE users SET last_login_at = ? WHERE id = ?").bind(Date.now(), userId).run();
}

// ---------------------------------------------------------------------------
// Jetons (définition / réinitialisation du mot de passe) : seul le hash SHA-256 est stocké.
// ---------------------------------------------------------------------------

export async function createPasswordToken(
  userId: string,
  purpose: "set" | "reset",
  ttlMs: number,
  tokenHash: string,
): Promise<void> {
  const database = await db();
  // Un seul jeton valide à la fois par utilisateur.
  await database.prepare("DELETE FROM password_tokens WHERE user_id = ? AND used_at IS NULL").bind(userId).run();
  await database
    .prepare("INSERT INTO password_tokens (token_hash, user_id, purpose, expires_at, used_at) VALUES (?, ?, ?, ?, NULL)")
    .bind(tokenHash, userId, purpose, Date.now() + ttlMs)
    .run();
}

/** Vérifie un jeton sans le consommer (pour afficher le formulaire). */
export async function peekPasswordToken(tokenHash: string): Promise<string | null> {
  const row = await (await db())
    .prepare("SELECT user_id, expires_at, used_at FROM password_tokens WHERE token_hash = ?")
    .bind(tokenHash)
    .first<{ user_id: string; expires_at: number; used_at: number | null }>();
  if (!row || row.used_at !== null || row.expires_at < Date.now()) return null;
  return row.user_id;
}

/** Consomme un jeton : renvoie l'identifiant de l'utilisateur ou null. */
export async function consumePasswordToken(tokenHash: string): Promise<string | null> {
  const database = await db();
  const result = await database
    .prepare("UPDATE password_tokens SET used_at = ? WHERE token_hash = ? AND used_at IS NULL AND expires_at >= ?")
    .bind(Date.now(), tokenHash, Date.now())
    .run();
  if (!result.meta.changes) return null;
  const row = await database
    .prepare("SELECT user_id FROM password_tokens WHERE token_hash = ?")
    .bind(tokenHash)
    .first<{ user_id: string }>();
  return row?.user_id ?? null;
}

// ---------------------------------------------------------------------------
// Sessions
// ---------------------------------------------------------------------------

export async function createSession(userId: string): Promise<{ id: string; expires_at: number }> {
  const id = newId();
  const expires_at = Date.now() + 1000 * 60 * 60 * 24 * 30; // 30 jours
  await (await db())
    .prepare("INSERT INTO sessions (id, user_id, expires_at, created_at) VALUES (?, ?, ?, ?)")
    .bind(id, userId, expires_at, Date.now())
    .run();
  return { id, expires_at };
}

export async function getSessionUser(sessionId: string): Promise<AccountUser | null> {
  const row = await (await db())
    .prepare(
      `SELECT ${USER_COLUMNS.split(", ")
        .map((c) => `users.${c}`)
        .join(", ")} FROM sessions JOIN users ON users.id = sessions.user_id WHERE sessions.id = ? AND sessions.expires_at > ?`,
    )
    .bind(sessionId, Date.now())
    .first<UserRow>();
  return row ? toUser(row, await adminEmails()) : null;
}

export async function deleteSession(sessionId: string): Promise<void> {
  await (await db()).prepare("DELETE FROM sessions WHERE id = ?").bind(sessionId).run();
}

export async function deleteUserSessions(userId: string): Promise<void> {
  await (await db()).prepare("DELETE FROM sessions WHERE user_id = ?").bind(userId).run();
}

// ---------------------------------------------------------------------------
// Protection contre la force brute
// ---------------------------------------------------------------------------

const ATTEMPT_WINDOW_MS = 15 * 60 * 1000;
export const MAX_FAILURES_PER_EMAIL = 8;
export const MAX_FAILURES_PER_IP = 30;
export const MAX_RESETS_PER_EMAIL_PER_HOUR = 5;

export async function recordAttempt(kind: "login" | "reset", email: string | null, ip: string | null, success: boolean) {
  const database = await db();
  await database
    .prepare("INSERT INTO login_attempts (kind, email, ip, success, created_at) VALUES (?, ?, ?, ?, ?)")
    .bind(kind, email ? normalizeEmail(email) : null, ip, success ? 1 : 0, Date.now())
    .run();
  // Ménage : on ne garde que 7 jours d'historique.
  if (Math.random() < 0.02) {
    await database.prepare("DELETE FROM login_attempts WHERE created_at < ?").bind(Date.now() - 7 * 86_400_000).run();
  }
}

export async function isLoginBlocked(email: string, ip: string | null): Promise<boolean> {
  const database = await db();
  const since = Date.now() - ATTEMPT_WINDOW_MS;
  const byEmail = await database
    .prepare("SELECT COUNT(*) AS n FROM login_attempts WHERE kind = 'login' AND success = 0 AND email = ? AND created_at > ?")
    .bind(normalizeEmail(email), since)
    .first<{ n: number }>();
  if ((byEmail?.n ?? 0) >= MAX_FAILURES_PER_EMAIL) return true;
  if (ip) {
    const byIp = await database
      .prepare("SELECT COUNT(*) AS n FROM login_attempts WHERE kind = 'login' AND success = 0 AND ip = ? AND created_at > ?")
      .bind(ip, since)
      .first<{ n: number }>();
    if ((byIp?.n ?? 0) >= MAX_FAILURES_PER_IP) return true;
  }
  return false;
}

export async function isResetThrottled(email: string): Promise<boolean> {
  const row = await (await db())
    .prepare("SELECT COUNT(*) AS n FROM login_attempts WHERE kind = 'reset' AND email = ? AND created_at > ?")
    .bind(normalizeEmail(email), Date.now() - 3_600_000)
    .first<{ n: number }>();
  return (row?.n ?? 0) >= MAX_RESETS_PER_EMAIL_PER_HOUR;
}

// ---------------------------------------------------------------------------
// Dossiers & questions
// ---------------------------------------------------------------------------

export async function createDossier(input: {
  userId: string;
  plan: Plan;
  kind: DossierKind;
  category: string;
  urgency: "normal" | "urgent";
  description: string;
  attachments: Attachment[];
}): Promise<Dossier> {
  const id = newId();
  const created_at = Date.now();
  const attachments = input.attachments.length > 0 ? JSON.stringify(input.attachments) : null;
  const due_at = computeDueAt(created_at, input.plan, input.kind, input.urgency);
  await (await db())
    .prepare(
      "INSERT INTO dossiers (id, user_id, category, urgency, description, status, attachments, created_at, kind, units, due_at, updated_at, admin_unread, client_unread) VALUES (?, ?, ?, ?, ?, 'nouveau', ?, ?, ?, 1, ?, ?, 1, 0)",
    )
    .bind(id, input.userId, input.category, input.urgency, input.description, attachments, created_at, input.kind, due_at, created_at)
    .run();
  return {
    id,
    user_id: input.userId,
    category: input.category,
    urgency: input.urgency,
    description: input.description,
    status: "nouveau",
    attachments,
    created_at,
    kind: input.kind,
    units: 1,
    due_at,
    closed_at: null,
    updated_at: created_at,
    internal_notes: null,
    admin_unread: 1,
    client_unread: 0,
  };
}

export async function listDossiers(userId: string): Promise<Dossier[]> {
  const { results } = await (await db())
    .prepare("SELECT * FROM dossiers WHERE user_id = ? ORDER BY created_at DESC")
    .bind(userId)
    .all<Dossier>();
  return results ?? [];
}

export async function getDossier(id: string): Promise<Dossier | null> {
  const row = await (await db()).prepare("SELECT * FROM dossiers WHERE id = ?").bind(id).first<Dossier>();
  return row ?? null;
}

/** Consommation du mois en cours : dossiers (selon leur décompte) et questions rapides. */
export async function getUsageThisCycle(userId: string): Promise<{ dossiers: number; questions: number }> {
  const row = await (await db())
    .prepare(
      "SELECT COALESCE(SUM(CASE WHEN kind = 'dossier' THEN units ELSE 0 END), 0) AS dossiers, COALESCE(SUM(CASE WHEN kind = 'question' THEN 1 ELSE 0 END), 0) AS questions FROM dossiers WHERE user_id = ? AND created_at >= ?",
    )
    .bind(userId, cycleStart())
    .first<{ dossiers: number; questions: number }>();
  return { dossiers: row?.dossiers ?? 0, questions: row?.questions ?? 0 };
}

export async function listMessages(dossierId: string, includeInternal: boolean): Promise<DossierMessage[]> {
  const { results } = await (await db())
    .prepare(
      `SELECT * FROM dossier_messages WHERE dossier_id = ? ${includeInternal ? "" : "AND internal = 0"} ORDER BY created_at ASC`,
    )
    .bind(dossierId)
    .all<DossierMessage>();
  return results ?? [];
}

export async function addMessage(input: {
  dossierId: string;
  authorRole: "client" | "admin";
  authorId: string | null;
  body: string;
  attachments: Attachment[];
  internal?: boolean;
}): Promise<void> {
  const database = await db();
  const now = Date.now();
  const internal = input.internal ? 1 : 0;
  await database
    .prepare(
      "INSERT INTO dossier_messages (id, dossier_id, author_role, author_id, body, attachments, internal, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    )
    .bind(
      newId(),
      input.dossierId,
      input.authorRole,
      input.authorId,
      input.body,
      input.attachments.length > 0 ? JSON.stringify(input.attachments) : null,
      internal,
      now,
    )
    .run();
  if (internal) return;
  if (input.authorRole === "client") {
    // Une réponse du client relance le dossier s'il attendait son retour ou était clôturé.
    await database
      .prepare(
        "UPDATE dossiers SET updated_at = ?, admin_unread = 1, status = CASE WHEN status IN ('attente_client', 'traite') THEN 'en_cours' ELSE status END, closed_at = CASE WHEN status = 'traite' THEN NULL ELSE closed_at END WHERE id = ?",
      )
      .bind(now, input.dossierId)
      .run();
  } else {
    await database
      .prepare("UPDATE dossiers SET updated_at = ?, client_unread = 1, status = CASE WHEN status = 'nouveau' THEN 'en_cours' ELSE status END WHERE id = ?")
      .bind(now, input.dossierId)
      .run();
  }
}

export async function markDossierRead(dossierId: string, who: "client" | "admin"): Promise<void> {
  await (await db())
    .prepare(`UPDATE dossiers SET ${who === "client" ? "client_unread" : "admin_unread"} = 0 WHERE id = ?`)
    .bind(dossierId)
    .run();
}

export async function setDossierStatus(dossierId: string, status: DossierStatus): Promise<void> {
  const now = Date.now();
  await (await db())
    .prepare(
      "UPDATE dossiers SET status = ?, updated_at = ?, closed_at = ?, client_unread = 1, admin_unread = 0 WHERE id = ?",
    )
    .bind(status, now, status === "traite" ? now : null, dossierId)
    .run();
}

export async function updateDossierAdminFields(
  dossierId: string,
  input: { units: number; kind: DossierKind; internalNotes: string | null; dueAt: number | null },
): Promise<void> {
  await (await db())
    .prepare("UPDATE dossiers SET units = ?, kind = ?, internal_notes = ?, due_at = ?, updated_at = ? WHERE id = ?")
    .bind(input.units, input.kind, input.internalNotes, input.dueAt, Date.now(), dossierId)
    .run();
}

// ---------------------------------------------------------------------------
// Fichiers (R2)
// ---------------------------------------------------------------------------

export async function putAttachment(key: string, data: ArrayBuffer, contentType: string): Promise<void> {
  await (await bucket()).put(key, data, { httpMetadata: { contentType } });
}

export async function getAttachment(key: string): Promise<R2ObjectBody | null> {
  return (await bucket()).get(key);
}
