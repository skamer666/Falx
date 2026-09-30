// Types et règles métier purs (aucun accès base de données : importable partout).
import type { Locale } from "@/i18n/config";

export type Plan = "essentiel" | "croissance";
export const PLANS: Plan[] = ["essentiel", "croissance"];

/** pending = inscrit, pas encore payé · active = payé · paused = mise en pause · cancelled = résilié */
export type AccountStatus = "pending" | "active" | "paused" | "cancelled";
export const ACCOUNT_STATUSES: AccountStatus[] = ["pending", "active", "paused", "cancelled"];

export type DossierStatus = "nouveau" | "en_cours" | "attente_client" | "traite";
export const DOSSIER_STATUSES: DossierStatus[] = ["nouveau", "en_cours", "attente_client", "traite"];
export type DossierKind = "question" | "dossier";

export type AccountUser = {
  id: string;
  email: string;
  name: string;
  company: string | null;
  plan: Plan;
  locale: Locale;
  created_at: number;
  status: AccountStatus;
  paid_until: number | null;
  phone: string | null;
  notes: string | null;
  last_login_at: number | null;
  terms_accepted_at: number | null;
  /** Calculé au chargement à partir de ADMIN_EMAILS, jamais stocké. */
  is_admin: boolean;
};

export type Attachment = { key: string; name: string; size: number };

export type Dossier = {
  id: string;
  user_id: string;
  category: string;
  urgency: "normal" | "urgent";
  description: string;
  status: DossierStatus;
  attachments: string | null;
  created_at: number;
  kind: DossierKind;
  units: number;
  due_at: number | null;
  closed_at: number | null;
  updated_at: number | null;
  internal_notes: string | null;
  admin_unread: number;
  client_unread: number;
};

export type DossierMessage = {
  id: string;
  dossier_id: string;
  author_role: "client" | "admin";
  author_id: string | null;
  body: string;
  attachments: string | null;
  internal: number;
  created_at: number;
};

export type Payment = {
  id: string;
  user_id: string;
  amount_rappen: number;
  method: string;
  reference: string | null;
  plan: Plan;
  period_start: number;
  period_end: number;
  note: string | null;
  created_by: string | null;
  created_at: number;
};

/** Dossiers complets inclus par mois. */
export const PLAN_QUOTAS: Record<Plan, number> = { essentiel: 5, croissance: 12 };
/** Questions rapides incluses par mois. */
export const QUESTION_QUOTAS: Record<Plan, number> = { essentiel: 10, croissance: 30 };
/** Prix mensuel en centimes (rappen) : sert aux revenus récurrents estimés et au pré-remplissage des paiements. */
export const PLAN_PRICE_RAPPEN: Record<Plan, number> = { essentiel: 14_900, croissance: 34_900 };

/**
 * Ajustement manuel de quota pour un mois d'abonnement :
 * - field « used » : dossiers/questions déjà faits (à ajouter ou à retirer du décompte)
 * - field « allowance » : dossiers/questions faisables en plus (ou en moins) ce mois-là
 */
export type QuotaItem = "dossier" | "question";
export type QuotaField = "used" | "allowance";
export type QuotaAdjustment = {
  id: string;
  user_id: string;
  cycle_start: number;
  item: QuotaItem;
  field: QuotaField;
  delta: number;
  note: string | null;
  created_by: string | null;
  created_at: number;
};

export type QuotaSummary = {
  /** Ce qui a été consommé ce mois : demandes reçues + ajustements manuels (jamais < 0). */
  used: { dossiers: number; questions: number };
  /** Ce qui est faisable ce mois : formule + ajustements manuels (jamais < 0). */
  allowance: { dossiers: number; questions: number };
  /** Part des ajustements manuels, pour l'affichage admin. */
  adjust: { usedDossiers: number; usedQuestions: number; allowDossiers: number; allowQuestions: number };
};

export const PAYMENT_METHODS = ["virement", "twint", "carte", "especes", "autre"] as const;
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export const MAX_FILES = 5;
export const MAX_FILE_BYTES = 10 * 1024 * 1024;

/** Ajoute des mois calendaires (UTC) à un timestamp. */
export function addMonths(timestamp: number, months: number): number {
  const date = new Date(timestamp);
  const day = date.getUTCDate();
  date.setUTCDate(1);
  date.setUTCMonth(date.getUTCMonth() + months);
  const lastDay = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0)).getUTCDate();
  date.setUTCDate(Math.min(day, lastDay));
  return date.getTime();
}

/** Ajoute des jours ouvrés (samedi et dimanche ignorés). */
export function addBusinessDays(timestamp: number, days: number): number {
  const date = new Date(timestamp);
  let remaining = days;
  while (remaining > 0) {
    date.setUTCDate(date.getUTCDate() + 1);
    const weekday = date.getUTCDay();
    if (weekday !== 0 && weekday !== 6) remaining -= 1;
  }
  return date.getTime();
}

/** Délai de réponse contractuel (heures ouvrées), cf. CGV art. 3 et 5. */
export function slaHours(plan: Plan, kind: DossierKind, urgency: "normal" | "urgent"): number {
  if (kind === "question") return plan === "croissance" ? 24 : 48;
  if (urgency === "urgent" && plan === "croissance") return 24;
  return plan === "croissance" ? 48 : 72;
}

export function computeDueAt(createdAt: number, plan: Plan, kind: DossierKind, urgency: "normal" | "urgent"): number {
  return addBusinessDays(createdAt, Math.max(1, Math.ceil(slaHours(plan, kind, urgency) / 24)));
}

export type AccessState = "ok" | "pending" | "paused" | "cancelled" | "expired";

/** Un client accède à son espace seulement s'il est actif ET payé pour la période en cours. */
export function accessState(user: Pick<AccountUser, "status" | "paid_until" | "is_admin">, now = Date.now()): AccessState {
  if (user.is_admin) return "ok";
  if (user.status === "pending") return "pending";
  if (user.status === "paused") return "paused";
  if (user.status === "cancelled") return "cancelled";
  if (!user.paid_until || user.paid_until <= now) return "expired";
  return "ok";
}

/** Début du mois d'abonnement en cours (proxy du cycle de facturation). */
export function cycleStart(now = Date.now()): number {
  const d = new Date(now);
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1);
}

export function formatChf(rappen: number): string {
  return (rappen / 100).toLocaleString("fr-CH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function parseAttachments(raw: string | null): Attachment[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as Attachment[]) : [];
  } catch {
    return [];
  }
}

export function sanitizeFilename(name: string): string {
  const cleaned = name
    .normalize("NFKD")
    .replace(/[^\w.\- ]+/g, "_")
    .replace(/\s+/g, "_")
    .replace(/\.{2,}/g, ".")
    .slice(-120);
  return cleaned || "fichier";
}

/** Horloge injectable : les pages serveur l'appellent à la place de Date.now() (règle react-hooks/purity). */
export function currentTime(): number {
  return Date.now();
}
