// Schéma D1 auto-migré.
//
// La base de production est créée sans passer par `wrangler d1 migrations`,
// donc le schéma est appliqué ici, une seule fois par instance du Worker, de
// façon idempotente (CREATE ... IF NOT EXISTS + ALTER TABLE seulement si la
// colonne manque). `schema.sql` à la racine du dépôt documente le résultat.

export const SCHEMA_VERSION = 8;

const TABLES: string[] = [
  `CREATE TABLE IF NOT EXISTS schema_meta (key TEXT PRIMARY KEY, value TEXT NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    company TEXT,
    plan TEXT NOT NULL DEFAULT 'essentiel',
    locale TEXT NOT NULL DEFAULT 'fr',
    created_at INTEGER NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS magic_links (
    token TEXT PRIMARY KEY,
    email TEXT NOT NULL,
    expires_at INTEGER NOT NULL,
    used_at INTEGER
  )`,
  `CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id),
    expires_at INTEGER NOT NULL,
    created_at INTEGER NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS dossiers (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id),
    category TEXT NOT NULL,
    urgency TEXT NOT NULL DEFAULT 'normal',
    description TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'nouveau',
    attachments TEXT,
    created_at INTEGER NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS payments (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id),
    amount_rappen INTEGER NOT NULL,
    method TEXT NOT NULL,
    reference TEXT,
    plan TEXT NOT NULL,
    period_start INTEGER NOT NULL,
    period_end INTEGER NOT NULL,
    note TEXT,
    created_by TEXT,
    created_at INTEGER NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS password_tokens (
    token_hash TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id),
    purpose TEXT NOT NULL,
    expires_at INTEGER NOT NULL,
    used_at INTEGER
  )`,
  `CREATE TABLE IF NOT EXISTS login_attempts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    kind TEXT NOT NULL,
    email TEXT,
    ip TEXT,
    success INTEGER NOT NULL DEFAULT 0,
    created_at INTEGER NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS dossier_messages (
    id TEXT PRIMARY KEY,
    dossier_id TEXT NOT NULL REFERENCES dossiers(id),
    author_role TEXT NOT NULL,
    author_id TEXT,
    body TEXT NOT NULL,
    attachments TEXT,
    internal INTEGER NOT NULL DEFAULT 0,
    created_at INTEGER NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS quota_adjustments (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id),
    cycle_start INTEGER NOT NULL,
    item TEXT NOT NULL,
    field TEXT NOT NULL,
    delta INTEGER NOT NULL,
    note TEXT,
    created_by TEXT,
    created_at INTEGER NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS leads (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    message TEXT,
    plan_interest TEXT,
    locale TEXT NOT NULL DEFAULT 'fr',
    status TEXT NOT NULL DEFAULT 'nouveau',
    notes TEXT,
    privacy_consent_at INTEGER,
    created_at INTEGER NOT NULL,
    contacted_at INTEGER
  )`,
  `CREATE TABLE IF NOT EXISTS seo_reports (
    id TEXT PRIMARY KEY,
    batch TEXT NOT NULL,
    share_token TEXT NOT NULL,
    label TEXT NOT NULL,
    kind TEXT NOT NULL,
    language TEXT NOT NULL,
    input TEXT NOT NULL,
    result TEXT NOT NULL,
    cost REAL NOT NULL DEFAULT 0,
    error TEXT,
    created_at INTEGER NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS audit_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    actor_id TEXT,
    actor_email TEXT,
    action TEXT NOT NULL,
    target_type TEXT,
    target_id TEXT,
    detail TEXT,
    created_at INTEGER NOT NULL
  )`,
];

// Colonnes ajoutées après la création initiale des tables.
const COLUMNS: Record<string, [string, string][]> = {
  users: [
    ["password_hash", "TEXT"],
    ["status", "TEXT NOT NULL DEFAULT 'pending'"],
    ["paid_until", "INTEGER"],
    ["phone", "TEXT"],
    ["notes", "TEXT"],
    ["last_login_at", "INTEGER"],
    ["terms_accepted_at", "INTEGER"],
    ["ai_consent_at", "INTEGER"],
    ["terms_version", "TEXT"],
    ["signup_message", "TEXT"],
    ["signup_source", "TEXT"],
    ["updated_at", "INTEGER"],
  ],
  leads: [["source", "TEXT"]],
  dossiers: [
    ["kind", "TEXT NOT NULL DEFAULT 'dossier'"],
    ["units", "INTEGER NOT NULL DEFAULT 1"],
    ["due_at", "INTEGER"],
    ["closed_at", "INTEGER"],
    ["updated_at", "INTEGER"],
    ["internal_notes", "TEXT"],
    ["admin_unread", "INTEGER NOT NULL DEFAULT 1"],
    ["client_unread", "INTEGER NOT NULL DEFAULT 0"],
  ],
};

const INDEXES: string[] = [
  `CREATE INDEX IF NOT EXISTS idx_dossiers_user ON dossiers(user_id)`,
  `CREATE INDEX IF NOT EXISTS idx_dossiers_status ON dossiers(status, created_at)`,
  `CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id)`,
  `CREATE INDEX IF NOT EXISTS idx_payments_user ON payments(user_id, created_at)`,
  `CREATE INDEX IF NOT EXISTS idx_payments_created ON payments(created_at)`,
  `CREATE INDEX IF NOT EXISTS idx_messages_dossier ON dossier_messages(dossier_id, created_at)`,
  `CREATE INDEX IF NOT EXISTS idx_quota_user ON quota_adjustments(user_id, cycle_start)`,
  `CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status, created_at)`,
  `CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_log(created_at)`,
  `CREATE INDEX IF NOT EXISTS idx_seo_batch ON seo_reports(batch, created_at)`,
  `CREATE INDEX IF NOT EXISTS idx_seo_share ON seo_reports(share_token)`,
  `CREATE INDEX IF NOT EXISTS idx_attempts_email ON login_attempts(kind, email, created_at)`,
  `CREATE INDEX IF NOT EXISTS idx_attempts_ip ON login_attempts(kind, ip, created_at)`,
  `CREATE INDEX IF NOT EXISTS idx_tokens_user ON password_tokens(user_id)`,
];

async function migrate(db: D1Database): Promise<void> {
  await db.batch(TABLES.map((sql) => db.prepare(sql)));

  for (const [table, columns] of Object.entries(COLUMNS)) {
    const info = await db.prepare(`PRAGMA table_info(${table})`).all<{ name: string }>();
    const existing = new Set((info.results ?? []).map((row) => row.name));
    for (const [name, definition] of columns) {
      if (existing.has(name)) continue;
      try {
        await db.prepare(`ALTER TABLE ${table} ADD COLUMN ${name} ${definition}`).run();
      } catch (error) {
        // Une autre instance a pu ajouter la colonne entre-temps.
        if (!/duplicate column/i.test(String(error))) throw error;
      }
    }
  }

  await db.batch(INDEXES.map((sql) => db.prepare(sql)));

  // Les dossiers existants avant la migration ne doivent pas ressortir comme « non lus ».
  await db
    .prepare("UPDATE dossiers SET admin_unread = 0 WHERE updated_at IS NULL AND status != 'nouveau'")
    .run();

  await db
    .prepare("INSERT INTO schema_meta (key, value) VALUES ('version', ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value")
    .bind(String(SCHEMA_VERSION))
    .run();
}

let ready: Promise<void> | null = null;

/** Applique le schéma une fois par instance (les appels suivants sont gratuits). */
export function ensureSchema(db: D1Database): Promise<void> {
  if (!ready) {
    ready = (async () => {
      try {
        const row = await db
          .prepare("SELECT value FROM schema_meta WHERE key = 'version'")
          .first<{ value: string }>();
        if (row && Number(row.value) >= SCHEMA_VERSION) return;
      } catch {
        // schema_meta n'existe pas encore : première migration.
      }
      await migrate(db);
    })().catch((error) => {
      ready = null;
      throw error;
    });
  }
  return ready;
}
