import {
  ACCOUNT_STATUSES,
  PLAN_QUOTAS,
  QUESTION_QUOTAS,
  getQuotaSummary,
  listQuotaAdjustments,
  type QuotaAdjustment,
  type QuotaSummary,
  PLAN_PRICE_RAPPEN,
  PLANS,
  accessState,
  addMonths,
  adminEmails,
  cycleStart,
  db,
  newId,
  toUser,
  USER_COLUMNS,
  type AccessState,
  type AccountStatus,
  type AccountUser,
  type Dossier,
  type DossierKind,
  type DossierStatus,
  type Payment,
  type Plan,
} from "./db";

// ---------------------------------------------------------------------------
// Journal d'audit
// ---------------------------------------------------------------------------

export type AuditEntry = {
  id: number;
  actor_id: string | null;
  actor_email: string | null;
  action: string;
  target_type: string | null;
  target_id: string | null;
  detail: string | null;
  created_at: number;
};

export async function logAudit(input: {
  actor: Pick<AccountUser, "id" | "email"> | null;
  action: string;
  targetType?: string;
  targetId?: string;
  detail?: string;
}): Promise<void> {
  await (await db())
    .prepare(
      "INSERT INTO audit_log (actor_id, actor_email, action, target_type, target_id, detail, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
    )
    .bind(
      input.actor?.id ?? null,
      input.actor?.email ?? null,
      input.action,
      input.targetType ?? null,
      input.targetId ?? null,
      input.detail ?? null,
      Date.now(),
    )
    .run();
}

export async function listAuditForTarget(targetId: string, limit = 50): Promise<AuditEntry[]> {
  const { results } = await (await db())
    .prepare("SELECT * FROM audit_log WHERE target_id = ? ORDER BY created_at DESC, id DESC LIMIT ?")
    .bind(targetId, limit)
    .all<AuditEntry>();
  return results ?? [];
}

export async function countAudit(): Promise<number> {
  const row = await (await db()).prepare("SELECT COUNT(*) AS n FROM audit_log").first<{ n: number }>();
  return row?.n ?? 0;
}

export async function listAudit(limit = 100, offset = 0): Promise<AuditEntry[]> {
  const { results } = await (await db())
    .prepare("SELECT * FROM audit_log ORDER BY created_at DESC, id DESC LIMIT ? OFFSET ?")
    .bind(limit, offset)
    .all<AuditEntry>();
  return results ?? [];
}

// ---------------------------------------------------------------------------
// Clients
// ---------------------------------------------------------------------------

export type ClientRow = AccountUser & {
  access: AccessState;
  dossiers_used: number;
  questions_used: number;
  /** Dossiers / questions faisables ce mois (formule + ajustements). */
  dossiers_allowance: number;
  questions_allowance: number;
  open_dossiers: number;
  unread: number;
  total_paid_rappen: number;
};

export type ClientFilter = {
  q?: string;
  /** Filtre sur l'état d'accès calculé (ok, pending, expired, paused, cancelled). */
  access?: AccessState;
  plan?: Plan;
  sort?: "recent" | "name" | "paid_until" | "last_login";
};

export async function listClients(filter: ClientFilter = {}): Promise<ClientRow[]> {
  const database = await db();
  const admins = await adminEmails();
  const start = cycleStart();
  const columns = USER_COLUMNS.split(", ").map((c) => `users.${c}`).join(", ");

  const where: string[] = [];
  const params: (string | number)[] = [start, start, start, start, start, start];
  if (admins.length > 0) {
    where.push(`users.email NOT IN (${admins.map(() => "?").join(", ")})`);
    params.push(...admins);
  }
  if (filter.plan) {
    where.push("users.plan = ?");
    params.push(filter.plan);
  }
  if (filter.q) {
    where.push("(users.email LIKE ? OR users.name LIKE ? OR COALESCE(users.company, '') LIKE ?)");
    const like = `%${filter.q.replace(/[%_]/g, " ").trim()}%`;
    params.push(like, like, like);
  }

  const { results } = await database
    .prepare(
      `SELECT ${columns},
        (SELECT COALESCE(SUM(units), 0) FROM dossiers d WHERE d.user_id = users.id AND d.kind = 'dossier' AND d.created_at >= ?) AS raw_dossiers_used,
        (SELECT COALESCE(SUM(CASE WHEN d.kind = 'question' THEN 1 ELSE 0 END), 0) FROM dossiers d WHERE d.user_id = users.id AND d.created_at >= ?) AS raw_questions_used,
        (SELECT COALESCE(SUM(delta), 0) FROM quota_adjustments q WHERE q.user_id = users.id AND q.cycle_start = ? AND q.item = 'dossier' AND q.field = 'used') AS adj_dossiers_used,
        (SELECT COALESCE(SUM(delta), 0) FROM quota_adjustments q WHERE q.user_id = users.id AND q.cycle_start = ? AND q.item = 'question' AND q.field = 'used') AS adj_questions_used,
        (SELECT COALESCE(SUM(delta), 0) FROM quota_adjustments q WHERE q.user_id = users.id AND q.cycle_start = ? AND q.item = 'dossier' AND q.field = 'allowance') AS adj_dossiers_allow,
        (SELECT COALESCE(SUM(delta), 0) FROM quota_adjustments q WHERE q.user_id = users.id AND q.cycle_start = ? AND q.item = 'question' AND q.field = 'allowance') AS adj_questions_allow,
        (SELECT COUNT(*) FROM dossiers d WHERE d.user_id = users.id AND d.status != 'traite') AS open_dossiers,
        (SELECT COUNT(*) FROM dossiers d WHERE d.user_id = users.id AND d.admin_unread = 1) AS unread,
        (SELECT COALESCE(SUM(amount_rappen), 0) FROM payments p WHERE p.user_id = users.id) AS total_paid_rappen
       FROM users ${where.length ? `WHERE ${where.join(" AND ")}` : ""}`,
    )
    .bind(...params)
    .all<
      Omit<ClientRow, "access" | "is_admin" | "dossiers_used" | "questions_used" | "dossiers_allowance" | "questions_allowance"> & {
        raw_dossiers_used: number;
        raw_questions_used: number;
        adj_dossiers_used: number;
        adj_questions_used: number;
        adj_dossiers_allow: number;
        adj_questions_allow: number;
      }
    >();

  let rows: ClientRow[] = (results ?? []).map((row) => {
    const user = toUser(row, admins);
    return {
      ...row,
      ...user,
      dossiers_used: Math.max(0, row.raw_dossiers_used + row.adj_dossiers_used),
      questions_used: Math.max(0, row.raw_questions_used + row.adj_questions_used),
      dossiers_allowance: Math.max(0, PLAN_QUOTAS[user.plan] + row.adj_dossiers_allow),
      questions_allowance: Math.max(0, QUESTION_QUOTAS[user.plan] + row.adj_questions_allow),
      access: accessState(user),
    };
  });
  if (filter.access) rows = rows.filter((row) => row.access === filter.access);

  const sort = filter.sort ?? "recent";
  rows.sort((a, b) => {
    if (sort === "name") return a.name.localeCompare(b.name, "fr");
    if (sort === "paid_until") return (a.paid_until ?? Infinity) - (b.paid_until ?? Infinity);
    if (sort === "last_login") return (b.last_login_at ?? 0) - (a.last_login_at ?? 0);
    return b.created_at - a.created_at;
  });
  return rows;
}

export type ClientDetail = {
  user: AccountUser;
  access: AccessState;
  payments: Payment[];
  dossiers: Dossier[];
  quota: QuotaSummary;
  adjustments: QuotaAdjustment[];
  sessions: number;
};

export async function getClientDetail(userId: string): Promise<ClientDetail | null> {
  const database = await db();
  const admins = await adminEmails();
  const row = await database.prepare(`SELECT ${USER_COLUMNS} FROM users WHERE id = ?`).bind(userId).first<Omit<AccountUser, "is_admin">>();
  if (!row) return null;
  const user = toUser(row, admins);
  const [payments, dossiers, quota, adjustments, sessions] = await Promise.all([
    database.prepare("SELECT * FROM payments WHERE user_id = ? ORDER BY created_at DESC").bind(userId).all<Payment>(),
    database.prepare("SELECT * FROM dossiers WHERE user_id = ? ORDER BY created_at DESC").bind(userId).all<Dossier>(),
    getQuotaSummary(userId, user.plan),
    listQuotaAdjustments(userId),
    database
      .prepare("SELECT COUNT(*) AS n FROM sessions WHERE user_id = ? AND expires_at > ?")
      .bind(userId, Date.now())
      .first<{ n: number }>(),
  ]);
  return {
    user,
    access: accessState(user),
    payments: payments.results ?? [],
    dossiers: dossiers.results ?? [],
    quota,
    adjustments,
    sessions: sessions?.n ?? 0,
  };
}

export async function setAccountStatus(userId: string, status: AccountStatus): Promise<void> {
  if (!ACCOUNT_STATUSES.includes(status)) throw new Error("Statut invalide");
  const database = await db();
  await database.prepare("UPDATE users SET status = ?, updated_at = ? WHERE id = ?").bind(status, Date.now(), userId).run();
  // Une pause ou une résiliation coupe immédiatement les connexions ouvertes.
  if (status !== "active") await database.prepare("DELETE FROM sessions WHERE user_id = ?").bind(userId).run();
}

export async function setPlan(userId: string, plan: Plan): Promise<void> {
  if (!PLANS.includes(plan)) throw new Error("Formule invalide");
  await (await db()).prepare("UPDATE users SET plan = ?, updated_at = ? WHERE id = ?").bind(plan, Date.now(), userId).run();
}

export async function setPaidUntil(userId: string, paidUntil: number | null): Promise<void> {
  await (await db())
    .prepare("UPDATE users SET paid_until = ?, updated_at = ? WHERE id = ?")
    .bind(paidUntil, Date.now(), userId)
    .run();
}

export async function updateClientFields(
  userId: string,
  input: { name: string; company: string | null; phone: string | null; notes: string | null },
): Promise<void> {
  await (await db())
    .prepare("UPDATE users SET name = ?, company = ?, phone = ?, notes = ?, updated_at = ? WHERE id = ?")
    .bind(input.name, input.company, input.phone, input.notes, Date.now(), userId)
    .run();
}

// ---------------------------------------------------------------------------
// Paiements (saisie manuelle en attendant le module de paiement)
// ---------------------------------------------------------------------------

export async function recordPayment(input: {
  userId: string;
  plan: Plan;
  amountRappen: number;
  method: string;
  reference: string | null;
  months: number;
  note: string | null;
  createdBy: string;
}): Promise<{ payment: Payment; paidUntil: number }> {
  const database = await db();
  const row = await database
    .prepare("SELECT paid_until FROM users WHERE id = ?")
    .bind(input.userId)
    .first<{ paid_until: number | null }>();
  if (!row) throw new Error("Client introuvable");

  const now = Date.now();
  // Un renouvellement en avance prolonge la période existante au lieu de la raccourcir.
  const periodStart = row.paid_until && row.paid_until > now ? row.paid_until : now;
  const periodEnd = addMonths(periodStart, input.months);
  const payment: Payment = {
    id: newId(),
    user_id: input.userId,
    amount_rappen: input.amountRappen,
    method: input.method,
    reference: input.reference,
    plan: input.plan,
    period_start: periodStart,
    period_end: periodEnd,
    note: input.note,
    created_by: input.createdBy,
    created_at: now,
  };

  await database.batch([
    database
      .prepare(
        "INSERT INTO payments (id, user_id, amount_rappen, method, reference, plan, period_start, period_end, note, created_by, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      )
      .bind(
        payment.id,
        payment.user_id,
        payment.amount_rappen,
        payment.method,
        payment.reference,
        payment.plan,
        payment.period_start,
        payment.period_end,
        payment.note,
        payment.created_by,
        payment.created_at,
      ),
    database
      .prepare("UPDATE users SET status = 'active', plan = ?, paid_until = ?, updated_at = ? WHERE id = ?")
      .bind(input.plan, periodEnd, now, input.userId),
  ]);
  return { payment, paidUntil: periodEnd };
}

export async function deletePayment(paymentId: string): Promise<Payment | null> {
  const database = await db();
  const payment = await database.prepare("SELECT * FROM payments WHERE id = ?").bind(paymentId).first<Payment>();
  if (!payment) return null;
  await database.prepare("DELETE FROM payments WHERE id = ?").bind(paymentId).run();
  // La période payée redevient celle du dernier paiement restant.
  const last = await database
    .prepare("SELECT MAX(period_end) AS end FROM payments WHERE user_id = ?")
    .bind(payment.user_id)
    .first<{ end: number | null }>();
  await database
    .prepare("UPDATE users SET paid_until = ?, updated_at = ? WHERE id = ?")
    .bind(last?.end ?? null, Date.now(), payment.user_id)
    .run();
  return payment;
}

export type PaymentRow = Payment & { client_name: string; client_email: string; client_company: string | null };

export async function listPayments(filter: { from?: number; to?: number; q?: string } = {}): Promise<PaymentRow[]> {
  const where: string[] = [];
  const params: (string | number)[] = [];
  if (filter.from) {
    where.push("p.created_at >= ?");
    params.push(filter.from);
  }
  if (filter.to) {
    where.push("p.created_at < ?");
    params.push(filter.to);
  }
  if (filter.q) {
    where.push("(u.email LIKE ? OR u.name LIKE ? OR COALESCE(u.company, '') LIKE ? OR COALESCE(p.reference, '') LIKE ?)");
    const like = `%${filter.q.replace(/[%_]/g, " ").trim()}%`;
    params.push(like, like, like, like);
  }
  const { results } = await (await db())
    .prepare(
      `SELECT p.*, u.name AS client_name, u.email AS client_email, u.company AS client_company
       FROM payments p JOIN users u ON u.id = p.user_id
       ${where.length ? `WHERE ${where.join(" AND ")}` : ""}
       ORDER BY p.created_at DESC`,
    )
    .bind(...params)
    .all<PaymentRow>();
  return results ?? [];
}

export async function listUserPayments(userId: string): Promise<Payment[]> {
  const { results } = await (await db())
    .prepare("SELECT * FROM payments WHERE user_id = ? ORDER BY created_at DESC")
    .bind(userId)
    .all<Payment>();
  return results ?? [];
}

// ---------------------------------------------------------------------------
// Dossiers (vue admin)
// ---------------------------------------------------------------------------

export type AdminDossierRow = Dossier & {
  client_name: string;
  client_email: string;
  client_company: string | null;
  client_plan: Plan;
};

export type DossierFilter = {
  status?: DossierStatus | "ouverts";
  kind?: DossierKind;
  q?: string;
  overdue?: boolean;
  unread?: boolean;
  urgent?: boolean;
  userId?: string;
};

export async function listAdminDossiers(filter: DossierFilter = {}, limit = 300): Promise<AdminDossierRow[]> {
  const where: string[] = [];
  const params: (string | number)[] = [];
  if (filter.status === "ouverts") where.push("d.status != 'traite'");
  else if (filter.status) {
    where.push("d.status = ?");
    params.push(filter.status);
  }
  if (filter.kind) {
    where.push("d.kind = ?");
    params.push(filter.kind);
  }
  if (filter.userId) {
    where.push("d.user_id = ?");
    params.push(filter.userId);
  }
  if (filter.overdue) {
    where.push("d.status != 'traite' AND d.due_at IS NOT NULL AND d.due_at < ?");
    params.push(Date.now());
  }
  if (filter.unread) where.push("d.admin_unread = 1");
  if (filter.urgent) where.push("d.urgency = 'urgent'");
  if (filter.q) {
    where.push("(u.email LIKE ? OR u.name LIKE ? OR COALESCE(u.company, '') LIKE ? OR d.description LIKE ?)");
    const like = `%${filter.q.replace(/[%_]/g, " ").trim()}%`;
    params.push(like, like, like, like);
  }
  const { results } = await (await db())
    .prepare(
      `SELECT d.*, u.name AS client_name, u.email AS client_email, u.company AS client_company, u.plan AS client_plan
       FROM dossiers d JOIN users u ON u.id = d.user_id
       ${where.length ? `WHERE ${where.join(" AND ")}` : ""}
       ORDER BY CASE WHEN d.status = 'traite' THEN 1 ELSE 0 END, COALESCE(d.due_at, d.created_at) ASC
       LIMIT ?`,
    )
    .bind(...params, limit)
    .all<AdminDossierRow>();
  return results ?? [];
}

export async function getAdminDossier(id: string): Promise<AdminDossierRow | null> {
  const row = await (await db())
    .prepare(
      `SELECT d.*, u.name AS client_name, u.email AS client_email, u.company AS client_company, u.plan AS client_plan
       FROM dossiers d JOIN users u ON u.id = d.user_id WHERE d.id = ?`,
    )
    .bind(id)
    .first<AdminDossierRow>();
  return row ?? null;
}

// ---------------------------------------------------------------------------
// Statistiques de la vue d'ensemble
// ---------------------------------------------------------------------------

export type Stats = {
  clients: Record<AccessState, number> & { total: number };
  mrrRappen: number;
  revenueMonthRappen: number;
  revenuePrevMonthRappen: number;
  revenueTotalRappen: number;
  revenueByMonth: { label: string; rappen: number }[];
  dossiers: {
    open: number;
    overdue: number;
    unread: number;
    createdThisMonth: number;
    treatedThisMonth: number;
    avgCloseHours: number | null;
  };
  renewalsDue: ClientRow[];
  expired: ClientRow[];
  pendingSignups: ClientRow[];
  queue: AdminDossierRow[];
};

export async function getStats(): Promise<Stats> {
  const database = await db();
  const now = Date.now();
  const monthStart = cycleStart(now);
  const prevMonthStart = addMonths(monthStart, -1);

  const clients = await listClients();
  const count: Stats["clients"] = { ok: 0, pending: 0, paused: 0, cancelled: 0, expired: 0, total: clients.length };
  let mrrRappen = 0;
  for (const client of clients) {
    count[client.access] += 1;
    if (client.access === "ok") mrrRappen += PLAN_PRICE_RAPPEN[client.plan];
  }

  const [revenueRows, dossierStats, queue] = await Promise.all([
    database.prepare("SELECT amount_rappen, created_at FROM payments").all<{ amount_rappen: number; created_at: number }>(),
    database
      .prepare(
        `SELECT
          SUM(CASE WHEN status != 'traite' THEN 1 ELSE 0 END) AS open,
          SUM(CASE WHEN status != 'traite' AND due_at IS NOT NULL AND due_at < ?1 THEN 1 ELSE 0 END) AS overdue,
          SUM(CASE WHEN admin_unread = 1 THEN 1 ELSE 0 END) AS unread,
          SUM(CASE WHEN created_at >= ?2 THEN 1 ELSE 0 END) AS created_month,
          SUM(CASE WHEN status = 'traite' AND closed_at >= ?2 THEN 1 ELSE 0 END) AS treated_month,
          AVG(CASE WHEN status = 'traite' AND closed_at >= ?3 THEN closed_at - created_at END) AS avg_close_ms
        FROM dossiers`,
      )
      .bind(now, monthStart, now - 30 * 86_400_000)
      .first<{
        open: number | null;
        overdue: number | null;
        unread: number | null;
        created_month: number | null;
        treated_month: number | null;
        avg_close_ms: number | null;
      }>(),
    listAdminDossiers({ status: "ouverts" }, 8),
  ]);

  let revenueMonth = 0;
  let revenuePrev = 0;
  let revenueTotal = 0;
  const monthsBack = 6;
  const buckets: { start: number; label: string; rappen: number }[] = [];
  for (let i = monthsBack - 1; i >= 0; i--) {
    const start = addMonths(monthStart, -i);
    buckets.push({
      start,
      label: new Date(start).toLocaleDateString("fr-CH", { month: "short", timeZone: "UTC" }),
      rappen: 0,
    });
  }
  for (const payment of revenueRows.results ?? []) {
    revenueTotal += payment.amount_rappen;
    if (payment.created_at >= monthStart) revenueMonth += payment.amount_rappen;
    else if (payment.created_at >= prevMonthStart) revenuePrev += payment.amount_rappen;
    for (let i = buckets.length - 1; i >= 0; i--) {
      if (payment.created_at >= buckets[i].start) {
        buckets[i].rappen += payment.amount_rappen;
        break;
      }
    }
  }

  const inSevenDays = now + 7 * 86_400_000;
  return {
    clients: count,
    mrrRappen,
    revenueMonthRappen: revenueMonth,
    revenuePrevMonthRappen: revenuePrev,
    revenueTotalRappen: revenueTotal,
    revenueByMonth: buckets.map(({ label, rappen }) => ({ label, rappen })),
    dossiers: {
      open: dossierStats?.open ?? 0,
      overdue: dossierStats?.overdue ?? 0,
      unread: dossierStats?.unread ?? 0,
      createdThisMonth: dossierStats?.created_month ?? 0,
      treatedThisMonth: dossierStats?.treated_month ?? 0,
      avgCloseHours: dossierStats?.avg_close_ms ? Math.round(dossierStats.avg_close_ms / 3_600_000) : null,
    },
    renewalsDue: clients
      .filter((c) => c.access === "ok" && c.paid_until !== null && c.paid_until <= inSevenDays)
      .sort((a, b) => (a.paid_until ?? 0) - (b.paid_until ?? 0)),
    expired: clients.filter((c) => c.access === "expired"),
    pendingSignups: clients.filter((c) => c.access === "pending"),
    queue,
  };
}

/** Pastilles de la navigation : demandes non lues et inscriptions à activer. */
export async function getAdminBadges(): Promise<{ dossiers: number; clients: number; prospects: number }> {
  const database = await db();
  const admins = await adminEmails();
  const [unread, pending, leads] = await Promise.all([
    database.prepare("SELECT COUNT(*) AS n FROM dossiers WHERE admin_unread = 1").first<{ n: number }>(),
    database
      .prepare(
        `SELECT COUNT(*) AS n FROM users WHERE status = 'pending' ${admins.length ? `AND email NOT IN (${admins.map(() => "?").join(", ")})` : ""}`,
      )
      .bind(...admins)
      .first<{ n: number }>(),
    database.prepare("SELECT COUNT(*) AS n FROM leads WHERE status = 'nouveau'").first<{ n: number }>(),
  ]);
  return { dossiers: unread?.n ?? 0, clients: pending?.n ?? 0, prospects: leads?.n ?? 0 };
}
