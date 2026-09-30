-- Schéma de référence de la base D1. Il est appliqué automatiquement par src/lib/account/schema.ts :
-- ce fichier ne sert qu'à la documentation.

CREATE TABLE audit_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    actor_id TEXT,
    actor_email TEXT,
    action TEXT NOT NULL,
    target_type TEXT,
    target_id TEXT,
    detail TEXT,
    created_at INTEGER NOT NULL
  );

CREATE TABLE dossier_messages (
    id TEXT PRIMARY KEY,
    dossier_id TEXT NOT NULL REFERENCES dossiers(id),
    author_role TEXT NOT NULL,
    author_id TEXT,
    body TEXT NOT NULL,
    attachments TEXT,
    internal INTEGER NOT NULL DEFAULT 0,
    created_at INTEGER NOT NULL
  );

CREATE TABLE dossiers (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id),
    category TEXT NOT NULL,
    urgency TEXT NOT NULL DEFAULT 'normal',
    description TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'nouveau',
    attachments TEXT,
    created_at INTEGER NOT NULL
  , kind TEXT NOT NULL DEFAULT 'dossier', units INTEGER NOT NULL DEFAULT 1, due_at INTEGER, closed_at INTEGER, updated_at INTEGER, internal_notes TEXT, admin_unread INTEGER NOT NULL DEFAULT 1, client_unread INTEGER NOT NULL DEFAULT 0);

CREATE TABLE login_attempts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    kind TEXT NOT NULL,
    email TEXT,
    ip TEXT,
    success INTEGER NOT NULL DEFAULT 0,
    created_at INTEGER NOT NULL
  );

CREATE TABLE magic_links (
    token TEXT PRIMARY KEY,
    email TEXT NOT NULL,
    expires_at INTEGER NOT NULL,
    used_at INTEGER
  );

CREATE TABLE password_tokens (
    token_hash TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id),
    purpose TEXT NOT NULL,
    expires_at INTEGER NOT NULL,
    used_at INTEGER
  );

CREATE TABLE payments (
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
  );

CREATE TABLE schema_meta (key TEXT PRIMARY KEY, value TEXT NOT NULL);

CREATE TABLE sessions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id),
    expires_at INTEGER NOT NULL,
    created_at INTEGER NOT NULL
  );

CREATE TABLE users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    company TEXT,
    plan TEXT NOT NULL DEFAULT 'essentiel',
    locale TEXT NOT NULL DEFAULT 'fr',
    created_at INTEGER NOT NULL
  , password_hash TEXT, status TEXT NOT NULL DEFAULT 'pending', paid_until INTEGER, phone TEXT, notes TEXT, last_login_at INTEGER, terms_accepted_at INTEGER, updated_at INTEGER);

CREATE INDEX idx_attempts_email ON login_attempts(kind, email, created_at);

CREATE INDEX idx_attempts_ip ON login_attempts(kind, ip, created_at);

CREATE INDEX idx_audit_created ON audit_log(created_at);

CREATE INDEX idx_dossiers_status ON dossiers(status, created_at);

CREATE INDEX idx_dossiers_user ON dossiers(user_id);

CREATE INDEX idx_messages_dossier ON dossier_messages(dossier_id, created_at);

CREATE INDEX idx_payments_created ON payments(created_at);

CREATE INDEX idx_payments_user ON payments(user_id, created_at);

CREATE INDEX idx_sessions_user ON sessions(user_id);

CREATE INDEX idx_tokens_user ON password_tokens(user_id);
