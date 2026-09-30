"use server";

import { redirect } from "next/navigation";
import {
  addMessage,
  addQuotaAdjustment,
  deleteQuotaAdjustment,
  cycleStart,
  addMonths,
  type QuotaField,
  type QuotaItem,
  createPasswordToken,
  createUser,
  deleteUserSessions,
  getDossier,
  getUserByEmail,
  getUserById,
  markDossierRead,
  normalizeEmail,
  setDossierStatus,
  updateDossierAdminFields,
  DOSSIER_STATUSES,
  PAYMENT_METHODS,
  PLANS,
  ACCOUNT_STATUSES,
  type AccountStatus,
  type DossierStatus,
  type Plan,
} from "@/lib/account/db";
import {
  deletePayment,
  logAudit,
  recordPayment,
  setAccountStatus,
  setPaidUntil,
  setPlan,
  updateClientFields,
} from "@/lib/account/admin-db";
import { safeSend, sendAccountActiveEmail, sendPasswordLinkEmail, sendReplyEmail } from "@/lib/account/email";
import { randomToken, sha256Hex } from "@/lib/account/password";
import { getCurrentAdmin } from "@/lib/account/session";
import { storeUploads } from "@/lib/account/uploads";
import { DOSSIER_STATUS_LABEL } from "@/lib/account/admin-labels";

async function requireAdmin() {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/fr/compte");
  return admin;
}

function text(formData: FormData, name: string, max = 500): string {
  return String(formData.get(name) ?? "").trim().slice(0, max);
}

/** « 149 », « 149.00 » et « 149,50 » → centimes. */
function parseChf(value: string): number | null {
  const normalized = value.replace(/['\s]/g, "").replace(",", ".");
  if (!/^\d+(\.\d{1,2})?$/.test(normalized)) return null;
  const rappen = Math.round(Number(normalized) * 100);
  return rappen > 0 && rappen <= 10_000_000 ? rappen : null;
}

function clientUrl(id: string, flash: string) {
  return `/fr/admin/clients/${id}?${flash}`;
}

// ---------------------------------------------------------------------------
// Clients
// ---------------------------------------------------------------------------

export async function createClientAction(formData: FormData) {
  const admin = await requireAdmin();
  const email = normalizeEmail(text(formData, "email", 254));
  const name = text(formData, "name", 120);
  const plan: Plan = text(formData, "plan") === "croissance" ? "croissance" : "essentiel";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || name.length < 2) redirect("/fr/admin/clients?error=create");
  if (await getUserByEmail(email)) redirect("/fr/admin/clients?error=exists");

  const locale = (["fr", "de", "en", "it"] as const).find((l) => l === text(formData, "locale")) ?? "fr";
  const user = await createUser({
    email,
    name,
    company: text(formData, "company", 160) || null,
    phone: text(formData, "phone", 40) || null,
    plan,
    locale,
    status: "pending",
    termsAcceptedAt: null,
  });
  await logAudit({ actor: admin, action: "client_created", targetType: "user", targetId: user.id, detail: `${email} · ${plan}` });

  if (formData.get("invite") === "on") {
    const token = randomToken();
    await createPasswordToken(user.id, "set", 60 * 60 * 1000, await sha256Hex(token));
    await safeSend(() => sendPasswordLinkEmail(email, token, locale));
  }
  redirect(clientUrl(user.id, "ok=created"));
}

export async function recordPaymentAction(userId: string, formData: FormData) {
  const admin = await requireAdmin();
  const user = await getUserById(userId);
  if (!user) redirect("/fr/admin/clients");

  const amountRappen = parseChf(text(formData, "amount", 20));
  const months = Math.round(Number(text(formData, "months", 3)));
  const plan = PLANS.find((p) => p === text(formData, "plan")) ?? user.plan;
  const method = PAYMENT_METHODS.find((m) => m === text(formData, "method")) ?? "virement";
  if (!amountRappen || !Number.isFinite(months) || months < 1 || months > 24) redirect(clientUrl(userId, "error=payment"));

  const { paidUntil } = await recordPayment({
    userId,
    plan,
    amountRappen,
    method,
    reference: text(formData, "reference", 120) || null,
    months,
    note: text(formData, "note", 500) || null,
    createdBy: admin.email,
  });
  await logAudit({
    actor: admin,
    action: "payment_recorded",
    targetType: "user",
    targetId: userId,
    detail: `CHF ${(amountRappen / 100).toFixed(2)} · ${months} mois · ${method} · ${user.email}`,
  });
  if (formData.get("notify") === "on") {
    await safeSend(() => sendAccountActiveEmail(user.email, user.name, plan, paidUntil, user.locale));
  }
  redirect(clientUrl(userId, "ok=payment"));
}

export async function deletePaymentAction(userId: string, paymentId: string) {
  const admin = await requireAdmin();
  const removed = await deletePayment(paymentId);
  if (removed) {
    await logAudit({
      actor: admin,
      action: "payment_deleted",
      targetType: "user",
      targetId: userId,
      detail: `CHF ${(removed.amount_rappen / 100).toFixed(2)} du ${new Date(removed.created_at).toISOString().slice(0, 10)}`,
    });
  }
  redirect(clientUrl(userId, "ok=payment_deleted"));
}

export async function setStatusAction(userId: string, status: AccountStatus) {
  const admin = await requireAdmin();
  if (!ACCOUNT_STATUSES.includes(status)) redirect(clientUrl(userId, "error=status"));
  const user = await getUserById(userId);
  if (!user || user.is_admin) redirect("/fr/admin/clients");
  await setAccountStatus(userId, status);
  await logAudit({ actor: admin, action: "status_changed", targetType: "user", targetId: userId, detail: `${user.status} → ${status} · ${user.email}` });
  redirect(clientUrl(userId, "ok=status"));
}

export async function changePlanAction(userId: string, formData: FormData) {
  const admin = await requireAdmin();
  const plan = PLANS.find((p) => p === text(formData, "plan"));
  const user = await getUserById(userId);
  if (!plan || !user) redirect("/fr/admin/clients");
  await setPlan(userId, plan);
  await logAudit({ actor: admin, action: "plan_changed", targetType: "user", targetId: userId, detail: `${user.plan} → ${plan} · ${user.email}` });
  redirect(clientUrl(userId, "ok=plan"));
}

export async function extendPeriodAction(userId: string, formData: FormData) {
  const admin = await requireAdmin();
  const days = Math.round(Number(text(formData, "days", 4)));
  const user = await getUserById(userId);
  if (!user || !Number.isFinite(days) || days < 1 || days > 366) redirect(clientUrl(userId, "error=extend"));
  const base = user.paid_until && user.paid_until > Date.now() ? user.paid_until : Date.now();
  const next = base + days * 86_400_000;
  await setPaidUntil(userId, next);
  if (user.status !== "active") await setAccountStatus(userId, "active");
  await logAudit({ actor: admin, action: "period_extended", targetType: "user", targetId: userId, detail: `+${days} jours sans paiement · ${user.email}` });
  redirect(clientUrl(userId, "ok=extended"));
}

export async function updateClientAction(userId: string, formData: FormData) {
  const admin = await requireAdmin();
  const name = text(formData, "name", 120);
  if (name.length < 2) redirect(clientUrl(userId, "error=client"));
  await updateClientFields(userId, {
    name,
    company: text(formData, "company", 160) || null,
    phone: text(formData, "phone", 40) || null,
    notes: text(formData, "notes", 5000) || null,
  });
  await logAudit({ actor: admin, action: "client_updated", targetType: "user", targetId: userId });
  redirect(clientUrl(userId, "ok=client"));
}

export async function sendPasswordLinkAction(userId: string) {
  const admin = await requireAdmin();
  const user = await getUserById(userId);
  if (!user) redirect("/fr/admin/clients");
  const token = randomToken();
  await createPasswordToken(userId, "reset", 60 * 60 * 1000, await sha256Hex(token));
  await safeSend(() => sendPasswordLinkEmail(user.email, token, user.locale));
  await logAudit({ actor: admin, action: "password_link_sent", targetType: "user", targetId: userId, detail: user.email });
  redirect(clientUrl(userId, "ok=link"));
}

export async function revokeSessionsAction(userId: string) {
  const admin = await requireAdmin();
  await deleteUserSessions(userId);
  await logAudit({ actor: admin, action: "sessions_revoked", targetType: "user", targetId: userId });
  redirect(clientUrl(userId, "ok=sessions"));
}

// ---------------------------------------------------------------------------
// Demandes
// ---------------------------------------------------------------------------

function dossierUrl(id: string, flash: string) {
  return `/fr/admin/dossiers/${id}?${flash}`;
}

export async function replyAction(dossierId: string, formData: FormData) {
  const admin = await requireAdmin();
  const dossier = await getDossier(dossierId);
  if (!dossier) redirect("/fr/admin/dossiers");

  const internal = formData.get("mode") === "note";
  const body = text(formData, "body", 20_000);
  const uploads = await storeUploads(formData, "attachments", dossier.user_id, "admin");
  if (!uploads.ok) redirect(dossierUrl(dossierId, "error=file"));
  if (!body && uploads.attachments.length === 0) redirect(dossierUrl(dossierId, "error=empty"));

  await addMessage({
    dossierId,
    authorRole: "admin",
    authorId: admin.id,
    body: body || "(document joint)",
    attachments: uploads.attachments,
    internal,
  });

  const nextStatus = DOSSIER_STATUSES.find((s) => s === text(formData, "set_status"));
  if (!internal && nextStatus && nextStatus !== dossier.status) await setDossierStatus(dossierId, nextStatus);
  await markDossierRead(dossierId, "admin");

  if (!internal && formData.get("notify") === "on") {
    const client = await getUserById(dossier.user_id);
    if (client) await safeSend(() => sendReplyEmail(client.email, client.locale, dossierId, nextStatus === "traite"));
  }
  await logAudit({
    actor: admin,
    action: internal ? "dossier_note" : "dossier_reply",
    targetType: "dossier",
    targetId: dossierId,
    detail: `${uploads.attachments.length} pièce(s) jointe(s)`,
  });
  redirect(dossierUrl(dossierId, internal ? "ok=note" : "ok=reply"));
}

export async function setDossierStatusAction(dossierId: string, status: DossierStatus, notify: boolean) {
  const admin = await requireAdmin();
  const dossier = await getDossier(dossierId);
  if (!dossier || !DOSSIER_STATUSES.includes(status)) redirect("/fr/admin/dossiers");
  await setDossierStatus(dossierId, status);
  await logAudit({
    actor: admin,
    action: "dossier_status",
    targetType: "dossier",
    targetId: dossierId,
    detail: `${DOSSIER_STATUS_LABEL[dossier.status]} → ${DOSSIER_STATUS_LABEL[status]}`,
  });
  if (notify && status === "traite") {
    const client = await getUserById(dossier.user_id);
    if (client) await safeSend(() => sendReplyEmail(client.email, client.locale, dossierId, true));
  }
  redirect(dossierUrl(dossierId, "ok=status"));
}

export async function updateDossierFieldsAction(dossierId: string, formData: FormData) {
  const admin = await requireAdmin();
  const units = Math.max(1, Math.min(10, Math.round(Number(text(formData, "units", 3)) || 1)));
  const kind = text(formData, "kind") === "question" ? "question" : "dossier";
  const due = text(formData, "due_at", 10);
  const dueAt = /^\d{4}-\d{2}-\d{2}$/.test(due) ? Date.parse(`${due}T16:00:00Z`) : null;
  await updateDossierAdminFields(dossierId, {
    units,
    kind,
    internalNotes: text(formData, "internal_notes", 10_000) || null,
    dueAt: dueAt !== null && Number.isFinite(dueAt) ? dueAt : null,
  });
  await logAudit({ actor: admin, action: "dossier_updated", targetType: "dossier", targetId: dossierId, detail: `${kind} · décompte ${units}` });
  redirect(dossierUrl(dossierId, "ok=fields"));
}

// ---------------------------------------------------------------------------
// Quotas : dossiers faits / faisables, ajoutés ou retirés pour un mois donné
// ---------------------------------------------------------------------------

export async function adjustQuotaAction(userId: string, formData: FormData) {
  const admin = await requireAdmin();
  const user = await getUserById(userId);
  if (!user) redirect("/fr/admin/clients");

  const field: QuotaField = text(formData, "field") === "allowance" ? "allowance" : "used";
  const item: QuotaItem = text(formData, "item") === "question" ? "question" : "dossier";
  const delta = Math.round(Number(text(formData, "delta", 6).replace(",", ".")));
  const month = text(formData, "month", 7);
  let cycle = cycleStart();
  if (/^\d{4}-\d{2}$/.test(month)) {
    const parsed = Date.parse(`${month}-01T00:00:00Z`);
    if (Number.isFinite(parsed)) cycle = parsed;
  }
  if (!Number.isFinite(delta) || delta === 0 || Math.abs(delta) > 100) redirect(clientUrl(userId, "error=quota"));
  // On ne saisit que le mois en cours, les 6 derniers mois ou les 12 prochains.
  if (cycle < addMonths(cycleStart(), -6) || cycle > addMonths(cycleStart(), 12)) redirect(clientUrl(userId, "error=quota"));

  await addQuotaAdjustment({ userId, cycle, item, field, delta, note: text(formData, "note", 300) || null, createdBy: admin.email });
  await logAudit({
    actor: admin,
    action: "quota_adjusted",
    targetType: "user",
    targetId: userId,
    detail: `${delta > 0 ? "+" : ""}${delta} ${item === "dossier" ? "dossier(s)" : "question(s)"} ${field === "used" ? "fait(s)" : "faisable(s)"} · ${new Date(cycle).toISOString().slice(0, 7)} · ${user.email}`,
  });
  redirect(clientUrl(userId, "ok=quota"));
}

export async function deleteQuotaAdjustmentAction(userId: string, adjustmentId: string) {
  const admin = await requireAdmin();
  const removed = await deleteQuotaAdjustment(adjustmentId);
  if (removed) {
    await logAudit({
      actor: admin,
      action: "quota_adjustment_deleted",
      targetType: "user",
      targetId: userId,
      detail: `${removed.delta > 0 ? "+" : ""}${removed.delta} ${removed.item} ${removed.field === "used" ? "faits" : "faisables"} · ${new Date(removed.cycle_start).toISOString().slice(0, 7)}`,
    });
  }
  redirect(clientUrl(userId, "ok=quota_deleted"));
}
