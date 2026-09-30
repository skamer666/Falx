import Link from "next/link";
import { currentTime } from "@/lib/account/model";
import SubmitButton from "@/components/account/SubmitButton";
import {
  AccessBadge,
  ActionButton,
  AdminDenied,
  AdminShell,
  Card,
  Empty,
  FIELD,
  FIELD_LABEL,
  Flash,
  PageHeader,
  StatusBadge,
} from "@/components/admin/parts";
import { getAdminBadges, getClientDetail, listAuditForTarget } from "@/lib/account/admin-db";
import { AUDIT_LABEL, KIND_LABEL, METHOD_LABEL, PLAN_LABEL_FR } from "@/lib/account/admin-labels";
import { PAYMENT_METHODS, PLAN_PRICE_RAPPEN, PLAN_QUOTAS, QUESTION_QUOTAS, formatChf } from "@/lib/account/model";
import { CATEGORY_LABELS, type DossierCategory } from "@/lib/account/categories";
import { formatDateTime, formatShortDate } from "@/lib/account/format";
import { getSessionUserRaw } from "@/lib/account/session";
import {
  adjustQuotaAction,
  changePlanAction,
  deleteQuotaAdjustmentAction,
  deletePaymentAction,
  extendPeriodAction,
  recordPaymentAction,
  revokeSessionsAction,
  sendPasswordLinkAction,
  setStatusAction,
  updateClientAction,
} from "../../actions";

export const dynamic = "force-dynamic";

const FLASH: Record<string, string> = {
  created: "Client créé.",
  payment: "Paiement enregistré : l'accès est ouvert jusqu'à la nouvelle échéance.",
  payment_deleted: "Paiement supprimé.",
  status: "Statut mis à jour.",
  plan: "Formule modifiée.",
  extended: "Période prolongée.",
  client: "Fiche enregistrée.",
  link: "Lien de mot de passe envoyé par email.",
  sessions: "Toutes les sessions ont été fermées.",
  quota: "Quota ajusté : les compteurs du client sont à jour.",
  quota_deleted: "Ajustement supprimé, compteurs recalculés.",
};
const ERRORS: Record<string, string> = {
  payment: "Montant ou durée invalide (ex. 290.00 CHF, 1 à 24 mois).",
  extend: "Nombre de jours invalide (1 à 366).",
  client: "Le nom est obligatoire.",
  status: "Statut invalide.",
  quota: "Quantité invalide (un nombre entier non nul, entre −100 et 100) ou mois hors plage.",
};

export default async function AdminClientPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ ok?: string; error?: string }>;
}) {
  const admin = await getSessionUserRaw();
  if (!admin?.is_admin) return <AdminDenied signedIn={Boolean(admin)} />;
  const { id } = await params;
  const { ok, error } = await searchParams;

  const [detail, badges, audit] = await Promise.all([getClientDetail(id), getAdminBadges(), listAuditForTarget(id, 20)]);
  if (!detail) {
    return (
      <AdminShell active="clients" adminEmail={admin.email} badges={badges}>
        <PageHeader title="Client introuvable" />
        <Link href="/fr/admin/clients" className="text-sm underline underline-offset-4">
          ← Retour aux clients
        </Link>
      </AdminShell>
    );
  }
  const { user, access, payments, dossiers, quota, adjustments, sessions } = detail;
  const now = currentTime();
  const currentMonth = new Date(now).toISOString().slice(0, 7);

  return (
    <AdminShell active="clients" adminEmail={admin.email} badges={badges}>
      <Link href="/fr/admin/clients" className="text-sm text-text-muted underline underline-offset-4 hover:text-text">
        ← Clients
      </Link>
      <div className="mt-4">
        <PageHeader
          title={user.name}
          subtitle={`${user.company ? `${user.company} · ` : ""}${user.email}`}
          actions={<AccessBadge access={access} />}
        />
      </div>
      {ok && FLASH[ok] ? <Flash>{FLASH[ok]}</Flash> : null}
      {error && ERRORS[error] ? <Flash tone="error">{ERRORS[error]}</Flash> : null}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card title="Abonnement et accès">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-4">
              <div>
                <dt className="text-xs text-text-muted">Formule</dt>
                <dd className="mt-0.5 font-medium">{PLAN_LABEL_FR[user.plan]}</dd>
              </div>
              <div>
                <dt className="text-xs text-text-muted">Valable jusqu&apos;au</dt>
                <dd className={`mt-0.5 font-medium ${access === "expired" ? "text-danger" : ""}`}>
                  {user.paid_until ? formatShortDate(user.paid_until) : "—"}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-text-muted">Dossiers ce mois</dt>
                <dd className="mt-0.5 font-medium">
                  {quota.used.dossiers} / {quota.allowance.dossiers}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-text-muted">Questions ce mois</dt>
                <dd className="mt-0.5 font-medium">
                  {quota.used.questions} / {quota.allowance.questions}
                </dd>
              </div>
            </dl>

            <form action={recordPaymentAction.bind(null, user.id)} className="mt-6 grid gap-3 rounded-xl border border-border bg-surface p-4 sm:grid-cols-6">
              <p className="text-sm font-semibold sm:col-span-6">Enregistrer un paiement reçu</p>
              <div className="sm:col-span-3">
                <label className={FIELD_LABEL} htmlFor="plan">
                  Formule
                </label>
                <select id="plan" name="plan" defaultValue={user.plan} className={`${FIELD} mt-1`}>
                  <option value="essentiel">Essentiel ({formatChf(PLAN_PRICE_RAPPEN.essentiel)} CHF)</option>
                  <option value="croissance">Croissance ({formatChf(PLAN_PRICE_RAPPEN.croissance)} CHF)</option>
                </select>
              </div>
              <div className="sm:col-span-3">
                <label className={FIELD_LABEL} htmlFor="amount">
                  Montant (CHF)
                </label>
                <input
                  id="amount"
                  name="amount"
                  required
                  inputMode="decimal"
                  defaultValue={(PLAN_PRICE_RAPPEN[user.plan] / 100).toFixed(2)}
                  className={`${FIELD} mt-1`}
                />
              </div>
              <div className="sm:col-span-2">
                <label className={FIELD_LABEL} htmlFor="months">
                  Mois
                </label>
                <input id="months" name="months" type="number" min={1} max={24} defaultValue={1} required className={`${FIELD} mt-1`} />
              </div>
              <div className="sm:col-span-4">
                <label className={FIELD_LABEL} htmlFor="method">
                  Mode
                </label>
                <select id="method" name="method" className={`${FIELD} mt-1`}>
                  {PAYMENT_METHODS.map((method) => (
                    <option key={method} value={method}>
                      {METHOD_LABEL[method]}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-3">
                <label className={FIELD_LABEL} htmlFor="reference">
                  Référence
                </label>
                <input id="reference" name="reference" className={`${FIELD} mt-1`} />
              </div>
              <div className="sm:col-span-3">
                <label className={FIELD_LABEL} htmlFor="note">
                  Note
                </label>
                <input id="note" name="note" className={`${FIELD} mt-1`} />
              </div>
              <label className="flex items-center gap-2 text-sm text-text-muted sm:col-span-6">
                <input type="checkbox" name="notify" defaultChecked className="h-4 w-4 accent-text" />
                Prévenir le client par email que son espace est actif
              </label>
              <div className="sm:col-span-6">
                <SubmitButton className="!px-5 !py-2">Enregistrer et ouvrir l&apos;accès</SubmitButton>
                <p className="mt-2 text-xs text-text-muted">
                  La période démarre à la date du jour, ou à l&apos;échéance actuelle en cas de renouvellement anticipé.
                </p>
              </div>
            </form>

            <div className="mt-5 flex flex-wrap items-end gap-3">
              <form action={extendPeriodAction.bind(null, user.id)} className="flex items-end gap-2">
                <div>
                  <label className={FIELD_LABEL} htmlFor="days">
                    Offrir des jours
                  </label>
                  <input id="days" name="days" type="number" min={1} max={366} defaultValue={7} className={`${FIELD} mt-1 w-24`} />
                </div>
                <SubmitButton variant="ghost" confirm="Prolonger l'accès sans paiement enregistré ?" className="!px-4 !py-2">
                  Prolonger
                </SubmitButton>
              </form>
              <form action={changePlanAction.bind(null, user.id)} className="flex items-end gap-2">
                <div>
                  <label className={FIELD_LABEL} htmlFor="plan2">
                    Changer de formule
                  </label>
                  <select id="plan2" name="plan" defaultValue={user.plan} className={`${FIELD} mt-1`}>
                    <option value="essentiel">Essentiel</option>
                    <option value="croissance">Croissance</option>
                  </select>
                </div>
                <SubmitButton variant="ghost" className="!px-4 !py-2">
                  Appliquer
                </SubmitButton>
              </form>
            </div>

            <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-4">
              {user.status !== "active" ? (
                <ActionButton action={setStatusAction.bind(null, user.id, "active")} variant="ghost" confirm="Réactiver le compte ? L'accès dépend aussi de la date de fin de période.">
                  Réactiver
                </ActionButton>
              ) : null}
              {user.status === "active" ? (
                <ActionButton action={setStatusAction.bind(null, user.id, "paused")} confirm="Mettre l'abonnement en pause ? Le client est déconnecté immédiatement.">
                  Mettre en pause
                </ActionButton>
              ) : null}
              {user.status !== "cancelled" ? (
                <ActionButton action={setStatusAction.bind(null, user.id, "cancelled")} variant="danger" confirm="Résilier cet abonnement ? Le client est déconnecté immédiatement.">
                  Résilier
                </ActionButton>
              ) : null}
            </div>
          </Card>

          <Card title="Dossiers et questions du mois">
            <div className="grid gap-3 sm:grid-cols-2">
              {(
                [
                  { label: "Dossiers", used: quota.used.dossiers, allowance: quota.allowance.dossiers, base: PLAN_QUOTAS[user.plan], usedAdj: quota.adjust.usedDossiers, allowAdj: quota.adjust.allowDossiers },
                  { label: "Questions rapides", used: quota.used.questions, allowance: quota.allowance.questions, base: QUESTION_QUOTAS[user.plan], usedAdj: quota.adjust.usedQuestions, allowAdj: quota.adjust.allowQuestions },
                ] as const
              ).map((row) => (
                <div key={row.label} className="rounded-xl border border-border bg-surface p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.08em] text-text-muted">{row.label}</p>
                  <p className="mt-1 text-2xl font-semibold tracking-[-0.02em]">
                    {row.used} <span className="text-base font-normal text-text-muted">faits sur {row.allowance} faisables</span>
                  </p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border">
                    <div className="h-full rounded-full bg-text" style={{ width: `${row.allowance === 0 ? (row.used > 0 ? 100 : 0) : Math.min(100, Math.round((row.used / row.allowance) * 100))}%` }} />
                  </div>
                  <p className="mt-2 text-xs text-text-muted">
                    Formule {row.base}
                    {row.allowAdj !== 0 ? ` ${row.allowAdj > 0 ? "+" : "−"} ${Math.abs(row.allowAdj)} ajusté` : ""}
                    {row.usedAdj !== 0 ? ` · ${row.usedAdj > 0 ? "+" : "−"}${Math.abs(row.usedAdj)} fait${Math.abs(row.usedAdj) > 1 ? "s" : ""} saisi${Math.abs(row.usedAdj) > 1 ? "s" : ""} à la main` : ""}
                    {row.used > row.allowance ? " · forfait dépassé" : ""}
                  </p>
                </div>
              ))}
            </div>

            <form action={adjustQuotaAction.bind(null, user.id)} className="mt-5 grid gap-3 rounded-xl border border-border bg-surface p-4 sm:grid-cols-6">
              <p className="text-sm font-semibold sm:col-span-6">Ajouter ou retirer</p>
              <div className="sm:col-span-3">
                <label className={FIELD_LABEL} htmlFor="q-field">
                  Quoi
                </label>
                <select id="q-field" name="field" className={`${FIELD} mt-1`}>
                  <option value="used">Déjà faits (comptent dans la consommation)</option>
                  <option value="allowance">Faisables (en plus ou en moins dans l&apos;abonnement)</option>
                </select>
              </div>
              <div className="sm:col-span-3">
                <label className={FIELD_LABEL} htmlFor="q-item">
                  Type
                </label>
                <select id="q-item" name="item" className={`${FIELD} mt-1`}>
                  <option value="dossier">Dossiers</option>
                  <option value="question">Questions rapides</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className={FIELD_LABEL} htmlFor="q-delta">
                  Quantité (+ ajoute, − retire)
                </label>
                <input id="q-delta" name="delta" type="number" step={1} min={-100} max={100} defaultValue={1} required className={`${FIELD} mt-1`} />
              </div>
              <div className="sm:col-span-2">
                <label className={FIELD_LABEL} htmlFor="q-month">
                  Mois concerné
                </label>
                <input id="q-month" name="month" type="month" defaultValue={currentMonth} required className={`${FIELD} mt-1`} />
              </div>
              <div className="sm:col-span-2">
                <label className={FIELD_LABEL} htmlFor="q-note">
                  Motif
                </label>
                <input id="q-note" name="note" placeholder="Geste commercial, dossier hors plateforme…" className={`${FIELD} mt-1`} />
              </div>
              <div className="sm:col-span-6">
                <SubmitButton className="!px-5 !py-2">Enregistrer l&apos;ajustement</SubmitButton>
                <p className="mt-2 text-xs text-text-muted">
                  Exemples : « Faisables + 2 » offre 2 dossiers ce mois-ci ; « Déjà faits + 1 » compte un dossier réalisé hors plateforme ; « Déjà faits − 1 » en retire un du décompte.
                </p>
              </div>
            </form>

            {adjustments.length > 0 ? (
              <div className="-mx-2 mt-5 overflow-x-auto">
                <table className="w-full min-w-[520px] text-left text-sm">
                  <thead className="text-xs text-text-muted">
                    <tr>
                      <th className="px-2 pb-2 font-medium">Mois</th>
                      <th className="px-2 pb-2 font-medium">Ajustement</th>
                      <th className="px-2 pb-2 font-medium">Motif</th>
                      <th className="px-2 pb-2" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {adjustments.map((adjustment) => (
                      <tr key={adjustment.id}>
                        <td className="px-2 py-2.5 text-text-muted">{new Date(adjustment.cycle_start).toISOString().slice(0, 7)}</td>
                        <td className="px-2 py-2.5 font-medium">
                          {adjustment.delta > 0 ? "+" : "−"}
                          {Math.abs(adjustment.delta)} {adjustment.item === "dossier" ? "dossier" : "question"}
                          {Math.abs(adjustment.delta) > 1 ? "s" : ""} {adjustment.field === "used" ? "fait" : "faisable"}
                          {Math.abs(adjustment.delta) > 1 ? "s" : ""}
                        </td>
                        <td className="px-2 py-2.5 text-text-muted">{adjustment.note ?? "—"}</td>
                        <td className="px-2 py-2.5 text-right">
                          <ActionButton
                            action={deleteQuotaAdjustmentAction.bind(null, user.id, adjustment.id)}
                            variant="danger"
                            confirm="Supprimer cet ajustement ? Les compteurs seront recalculés."
                            className="!py-1 !text-xs"
                          >
                            Supprimer
                          </ActionButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
          </Card>

          <Card title={`Paiements (${payments.length})`}>
            {payments.length === 0 ? (
              <Empty>Aucun paiement enregistré.</Empty>
            ) : (
              <div className="-mx-2 overflow-x-auto">
                <table className="w-full min-w-[560px] text-left text-sm">
                  <thead className="text-xs text-text-muted">
                    <tr>
                      <th className="px-2 pb-2 font-medium">Date</th>
                      <th className="px-2 pb-2 font-medium">Période</th>
                      <th className="px-2 pb-2 font-medium">Montant</th>
                      <th className="px-2 pb-2 font-medium">Mode</th>
                      <th className="px-2 pb-2" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {payments.map((payment) => (
                      <tr key={payment.id}>
                        <td className="px-2 py-2.5 text-text-muted">{formatShortDate(payment.created_at)}</td>
                        <td className="px-2 py-2.5 text-text-muted">
                          {formatShortDate(payment.period_start)} → {formatShortDate(payment.period_end)}
                          <br />
                          <span className="text-xs">{PLAN_LABEL_FR[payment.plan]}{payment.reference ? ` · ${payment.reference}` : ""}</span>
                        </td>
                        <td className="px-2 py-2.5 font-medium">CHF {formatChf(payment.amount_rappen)}</td>
                        <td className="px-2 py-2.5 text-text-muted">{METHOD_LABEL[payment.method] ?? payment.method}</td>
                        <td className="px-2 py-2.5 text-right">
                          <ActionButton
                            action={deletePaymentAction.bind(null, user.id, payment.id)}
                            variant="danger"
                            confirm="Supprimer ce paiement ? La date de fin de période sera recalculée."
                            className="!py-1 !text-xs"
                          >
                            Supprimer
                          </ActionButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>

          <Card title={`Demandes (${dossiers.length})`}>
            {dossiers.length === 0 ? (
              <Empty>Aucune demande pour l&apos;instant.</Empty>
            ) : (
              <ul className="divide-y divide-border">
                {dossiers.map((dossier) => (
                  <li key={dossier.id}>
                    <Link href={`/fr/admin/dossiers/${dossier.id}`} className="flex flex-wrap items-center justify-between gap-2 py-2.5 hover:bg-surface/60">
                      <span className="min-w-0">
                        <span className="block text-sm font-medium">
                          {CATEGORY_LABELS.fr[dossier.category as DossierCategory] ?? dossier.category}
                          <span className="ml-2 text-xs font-normal text-text-muted">{KIND_LABEL[dossier.kind]}</span>
                          {dossier.admin_unread ? <span className="ml-2 inline-block h-2 w-2 rounded-full bg-danger align-middle" /> : null}
                        </span>
                        <span className="block text-xs text-text-muted">
                          {formatShortDate(dossier.created_at)}
                          {dossier.status !== "traite" && dossier.due_at && dossier.due_at < now ? <span className="font-medium text-danger"> · en retard</span> : null}
                        </span>
                      </span>
                      <StatusBadge status={dossier.status} />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Fiche">
            <form action={updateClientAction.bind(null, user.id)} className="space-y-3">
              <div>
                <label className={FIELD_LABEL} htmlFor="name">
                  Nom
                </label>
                <input id="name" name="name" required minLength={2} defaultValue={user.name} className={`${FIELD} mt-1`} />
              </div>
              <div>
                <label className={FIELD_LABEL} htmlFor="company">
                  Entreprise
                </label>
                <input id="company" name="company" defaultValue={user.company ?? ""} className={`${FIELD} mt-1`} />
              </div>
              <div>
                <label className={FIELD_LABEL} htmlFor="phone">
                  Téléphone
                </label>
                <input id="phone" name="phone" type="tel" defaultValue={user.phone ?? ""} className={`${FIELD} mt-1`} />
              </div>
              <div>
                <label className={FIELD_LABEL} htmlFor="notes">
                  Notes internes (jamais visibles du client)
                </label>
                <textarea id="notes" name="notes" rows={5} defaultValue={user.notes ?? ""} className={`${FIELD} mt-1 resize-y`} />
              </div>
              <SubmitButton className="!px-5 !py-2">Enregistrer</SubmitButton>
            </form>
            {user.signup_message ? (
              <div className="mt-5 rounded-xl border border-border bg-surface px-3 py-2.5 text-xs">
                <p className="font-medium text-text">Message à l&apos;inscription</p>
                <p className="mt-1 whitespace-pre-wrap leading-relaxed text-text-muted">{user.signup_message}</p>
              </div>
            ) : null}
            <dl className="mt-5 space-y-1.5 border-t border-border pt-4 text-xs text-text-muted">
              <div className="flex justify-between gap-3">
                <dt>Inscrit le</dt>
                <dd>{formatDateTime(user.created_at, "fr")}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>Dernière connexion</dt>
                <dd>{user.last_login_at ? formatDateTime(user.last_login_at, "fr") : "jamais"}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>CGV acceptées</dt>
                <dd className="text-right">{user.terms_accepted_at ? `${formatDateTime(user.terms_accepted_at, "fr")}${user.terms_version ? ` · version ${user.terms_version}` : ""}` : "non enregistré"}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>IA (Claude) acceptée</dt>
                <dd>{user.ai_consent_at ? formatDateTime(user.ai_consent_at, "fr") : "non enregistré"}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>Langue</dt>
                <dd className="uppercase">{user.locale}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>Sessions ouvertes</dt>
                <dd>{sessions}</dd>
              </div>
            </dl>
          </Card>

          <Card title="Sécurité">
            <div className="flex flex-col items-start gap-2">
              <ActionButton action={sendPasswordLinkAction.bind(null, user.id)} confirm="Envoyer un email de choix de mot de passe à ce client ?">
                Envoyer un lien de mot de passe
              </ActionButton>
              <ActionButton action={revokeSessionsAction.bind(null, user.id)} confirm="Déconnecter ce client de tous ses appareils ?">
                Fermer toutes ses sessions
              </ActionButton>
            </div>
          </Card>

          <Card title="Historique">
            {audit.length === 0 ? (
              <Empty>Rien pour l&apos;instant.</Empty>
            ) : (
              <ul className="space-y-2 text-xs">
                {audit.map((entry) => (
                  <li key={entry.id}>
                    <p className="font-medium text-text">{AUDIT_LABEL[entry.action] ?? entry.action}</p>
                    {entry.detail ? <p className="text-text-muted">{entry.detail}</p> : null}
                    <p className="text-text-muted">{formatDateTime(entry.created_at, "fr")}</p>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </div>
    </AdminShell>
  );
}
