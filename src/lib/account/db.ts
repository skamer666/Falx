import type { Locale } from "@/i18n/config";

export type Plan = "essentiel" | "croissance";

export type AccountUser = {
  id: string;
  email: string;
  name: string;
  company: string | null;
  plan: Plan;
  locale: Locale;
  created_at: number;
};

export type Dossier = {
  id: string;
  user_id: string;
  category: string;
  urgency: "normal" | "urgent";
  description: string;
  status: "nouveau" | "en_cours" | "traite";
  attachments: string | null;
  created_at: number;
};

export const PLAN_QUOTAS: Record<Plan, number> = {
  essentiel: 3,
  croissance: 8,
};

// Dynamic import defers resolution of the "cloudflare:workers" native module to
// request time. A static import would make Next's build-time page-data
// collection (which evaluates route modules in plain Node.js) fail, since that
// module only exists inside the Cloudflare Workers runtime (vinext/workerd).
async function db(): Promise<D1Database> {
  const { env } = await import("cloudflare:workers");
  return env.DB;
}

async function bucket(): Promise<R2Bucket> {
  const { env } = await import("cloudflare:workers");
  return env.DOSSIERS;
}

function newId() {
  return crypto.randomUUID();
}

export async function getUserByEmail(email: string): Promise<AccountUser | null> {
  const row = await (await db())
    .prepare("SELECT * FROM users WHERE email = ?")
    .bind(email.trim().toLowerCase())
    .first<AccountUser>();
  return row ?? null;
}

export async function getUserById(id: string): Promise<AccountUser | null> {
  const row = await (await db()).prepare("SELECT * FROM users WHERE id = ?").bind(id).first<AccountUser>();
  return row ?? null;
}

export async function createUser(input: {
  email: string;
  name: string;
  company: string | null;
  plan: Plan;
  locale: Locale;
}): Promise<AccountUser> {
  const id = newId();
  const created_at = Date.now();
  await (await db())
    .prepare(
      "INSERT INTO users (id, email, name, company, plan, locale, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
    )
    .bind(id, input.email.trim().toLowerCase(), input.name, input.company, input.plan, input.locale, created_at)
    .run();
  return { id, email: input.email.trim().toLowerCase(), name: input.name, company: input.company, plan: input.plan, locale: input.locale, created_at };
}

export async function createMagicLink(email: string): Promise<string> {
  const token = newId();
  const expires_at = Date.now() + 1000 * 60 * 15; // 15 min
  await (await db())
    .prepare("INSERT INTO magic_links (token, email, expires_at, used_at) VALUES (?, ?, ?, NULL)")
    .bind(token, email.trim().toLowerCase(), expires_at)
    .run();
  return token;
}

export async function consumeMagicLink(token: string): Promise<string | null> {
  const database = await db();
  const row = await database
    .prepare("SELECT email, expires_at, used_at FROM magic_links WHERE token = ?")
    .bind(token)
    .first<{ email: string; expires_at: number; used_at: number | null }>();
  if (!row || row.used_at !== null || row.expires_at < Date.now()) return null;
  await database.prepare("UPDATE magic_links SET used_at = ? WHERE token = ?").bind(Date.now(), token).run();
  return row.email;
}

export async function createSession(userId: string): Promise<{ id: string; expires_at: number }> {
  const id = newId();
  const expires_at = Date.now() + 1000 * 60 * 60 * 24 * 30; // 30 days
  await (await db())
    .prepare("INSERT INTO sessions (id, user_id, expires_at, created_at) VALUES (?, ?, ?, ?)")
    .bind(id, userId, expires_at, Date.now())
    .run();
  return { id, expires_at };
}

export async function getSessionUser(sessionId: string): Promise<AccountUser | null> {
  const row = await (await db())
    .prepare(
      "SELECT users.* FROM sessions JOIN users ON users.id = sessions.user_id WHERE sessions.id = ? AND sessions.expires_at > ?",
    )
    .bind(sessionId, Date.now())
    .first<AccountUser>();
  return row ?? null;
}

export async function deleteSession(sessionId: string): Promise<void> {
  await (await db()).prepare("DELETE FROM sessions WHERE id = ?").bind(sessionId).run();
}

export async function createDossier(input: {
  userId: string;
  category: string;
  urgency: "normal" | "urgent";
  description: string;
  attachments: { key: string; name: string; size: number }[];
}): Promise<Dossier> {
  const id = newId();
  const created_at = Date.now();
  const attachments = input.attachments.length > 0 ? JSON.stringify(input.attachments) : null;
  await (await db())
    .prepare(
      "INSERT INTO dossiers (id, user_id, category, urgency, description, status, attachments, created_at) VALUES (?, ?, ?, ?, ?, 'nouveau', ?, ?)",
    )
    .bind(id, input.userId, input.category, input.urgency, input.description, attachments, created_at)
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
  };
}

export async function listDossiers(userId: string): Promise<Dossier[]> {
  const { results } = await (await db())
    .prepare("SELECT * FROM dossiers WHERE user_id = ? ORDER BY created_at DESC")
    .bind(userId)
    .all<Dossier>();
  return results ?? [];
}

/** Dossiers counted since the 1st of the current calendar month (billing cycle proxy until Stripe is live). */
export async function countDossiersThisCycle(userId: string): Promise<number> {
  const now = new Date();
  const cycleStart = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1);
  const row = await (await db())
    .prepare("SELECT COUNT(*) as count FROM dossiers WHERE user_id = ? AND created_at >= ?")
    .bind(userId, cycleStart)
    .first<{ count: number }>();
  return row?.count ?? 0;
}

export async function putAttachment(key: string, data: ArrayBuffer, contentType: string): Promise<void> {
  await (await bucket()).put(key, data, { httpMetadata: { contentType } });
}
