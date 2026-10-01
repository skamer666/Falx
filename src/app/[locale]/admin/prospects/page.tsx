import Link from "next/link";
import { EXPRESS_PRICE, getService, serviceText } from "@/lib/services/catalog";
import { priceLabel, vatLabel } from "@/lib/services/strings";
import type { Lead } from "@/lib/account/model";
import SubmitButton from "@/components/account/SubmitButton";
import { ActionButton, AdminDenied, AdminShell, Card, Empty, FIELD, FIELD_LABEL, Flash, PageHeader } from "@/components/admin/parts";
import { getAdminBadges } from "@/lib/account/admin-db";
import { getSourceSummary, listLeads, LEAD_STATUSES, currentTime, type LeadStatus } from "@/lib/account/db";
import { PLAN_LABEL_FR } from "@/lib/account/admin-labels";
import { formatDateTime } from "@/lib/account/format";
import { getSessionUserRaw } from "@/lib/account/session";
import { deleteLeadAction, saveLeadNotesAction, sendLeadInviteAction, setLeadStatusAction } from "../actions";

export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<LeadStatus, string> = { nouveau: "À rappeler", contacte: "Contacté", converti: "Converti", perdu: "Perdu" };
const FLASH: Record<string, string> = {
  status: "Statut mis à jour.",
  note: "Note enregistrée.",
  invite: "Lien d'inscription envoyé par email.",
  deleted: "Prospect supprimé.",
};

export default async function AdminProspectsPage({
  searchParams,
}: {
  searchParams: Promise<{ statut?: string; q?: string; ok?: string }>;
}) {
  const admin = await getSessionUserRaw();
  if (!admin?.is_admin) return <AdminDenied signedIn={Boolean(admin)} />;
  const { statut, q, ok } = await searchParams;
  const status = LEAD_STATUSES.find((s) => s === statut);

  const [leads, badges, sources] = await Promise.all([
    listLeads({ status, q: q?.trim() || undefined }),
    getAdminBadges(),
    getSourceSummary(90),
  ]);
  const now = currentTime();
  const tabs: { key: string; label: string }[] = [{ key: "", label: "Tous" }, ...LEAD_STATUSES.map((s) => ({ key: s, label: STATUS_LABEL[s] }))];

  return (
    <AdminShell active="prospects" adminEmail={admin.email} badges={badges}>
      <PageHeader title="Prospects" subtitle="Personnes qui ont laissé leurs coordonnées via « Être rappelé »." />
      {ok && FLASH[ok] ? <Flash>{FLASH[ok]}</Flash> : null}

      {sources.length ? (
        <div className="mb-5 rounded-2xl border border-border bg-surface p-4">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-text-muted">Provenance des demandes (90 derniers jours)</p>
          <table className="mt-3 w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-text-muted">
                <th className="pb-2 font-medium">Canal</th>
                <th className="pb-2 text-right font-medium">Rappels</th>
                <th className="pb-2 text-right font-medium">Inscriptions</th>
                <th className="pb-2 text-right font-medium">Clients payants</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sources.map((row) => (
                <tr key={row.channel}>
                  <td className="py-1.5">{row.channel}</td>
                  <td className="py-1.5 text-right tabular-nums">{row.leads}</td>
                  <td className="py-1.5 text-right tabular-nums">{row.signups}</td>
                  <td className="py-1.5 text-right tabular-nums">{row.paying}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      <div className="mb-4 flex flex-wrap gap-1.5">
        {tabs.map((tab) => (
          <Link
            key={tab.key || "all"}
            href={tab.key ? `/fr/admin/prospects?statut=${tab.key}` : "/fr/admin/prospects"}
            className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${
              (status ?? "") === tab.key ? "bg-text font-medium text-bg" : "border border-border text-text-muted hover:bg-surface hover:text-text"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      <form method="get" className="mb-5 flex flex-wrap items-end gap-3 rounded-2xl border border-border bg-surface p-4">
        {status ? <input type="hidden" name="statut" value={status} /> : null}
        <div className="min-w-[220px] flex-1">
          <label className={FIELD_LABEL} htmlFor="q">
            Recherche
          </label>
          <input id="q" name="q" defaultValue={q} placeholder="Nom, email, entreprise, message…" className={`${FIELD} mt-1`} />
        </div>
        <SubmitButton className="!px-5 !py-2">Filtrer</SubmitButton>
      </form>

      {leads.length === 0 ? (
        <Empty>Aucun prospect pour l&apos;instant. Le formulaire est sur la page /contact.</Empty>
      ) : (
        <div className="space-y-4">
          {leads.map((lead) => {
            const ageDays = Math.floor((now - lead.created_at) / 86_400_000);
            return (
              <Card key={lead.id} className="scroll-mt-6">
                <div id={`lead-${lead.id}`} className="grid gap-5 lg:grid-cols-3">
                  <div className="lg:col-span-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-base font-semibold">{lead.name}</h2>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          lead.status === "nouveau" ? "bg-text text-bg" : "border border-border bg-surface text-text-muted"
                        }`}
                      >
                        {STATUS_LABEL[lead.status]}
                      </span>
                      {lead.plan_interest ? <span className="text-xs text-text-muted">Intéressé par {PLAN_LABEL_FR[lead.plan_interest]}</span> : null}
                    </div>
                    {lead.service ? <OrderBadge lead={lead} /> : null}
                    {lead.company ? <p className="text-sm text-text-muted">{lead.company}</p> : null}
                    <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                      <a href={`mailto:${lead.email}`} className="underline underline-offset-4">
                        {lead.email}
                      </a>
                      {lead.phone ? (
                        <a href={`tel:${lead.phone.replace(/\s/g, "")}`} className="font-medium underline underline-offset-4">
                          {lead.phone}
                        </a>
                      ) : (
                        <span className="text-text-muted">pas de téléphone</span>
                      )}
                    </p>
                    {lead.message ? <p className="mt-3 whitespace-pre-wrap rounded-xl border border-border bg-surface px-4 py-3 text-sm leading-relaxed">{lead.message}</p> : null}
                    <p className="mt-3 text-xs text-text-muted">
                      Reçu le {formatDateTime(lead.created_at, "fr")} ({lead.locale.toUpperCase()}) · provenance : {lead.source ?? "inconnue"}
                      {ageDays >= 300 ? <span className="font-medium text-danger"> · à supprimer bientôt (12 mois)</span> : null}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <ActionButton action={sendLeadInviteAction.bind(null, lead.id)} variant="primary" confirm="Envoyer à ce prospect un email avec le lien d'inscription en ligne ?" className="!py-1.5 !text-xs">
                        Envoyer le lien d&apos;inscription
                      </ActionButton>
                      {LEAD_STATUSES.filter((s) => s !== lead.status).map((s) => (
                        <ActionButton key={s} action={setLeadStatusAction.bind(null, lead.id, s)} className="!py-1.5 !text-xs">
                          {STATUS_LABEL[s]}
                        </ActionButton>
                      ))}
                      <ActionButton action={deleteLeadAction.bind(null, lead.id)} variant="danger" confirm="Supprimer définitivement ce prospect et ses données ?" className="!py-1.5 !text-xs">
                        Supprimer
                      </ActionButton>
                    </div>
                  </div>

                  <form action={saveLeadNotesAction.bind(null, lead.id)} className="space-y-2">
                    <label className={FIELD_LABEL} htmlFor={`notes-${lead.id}`}>
                      Notes internes
                    </label>
                    <textarea id={`notes-${lead.id}`} name="notes" rows={5} defaultValue={lead.notes ?? ""} className={`${FIELD} resize-y`} />
                    <SubmitButton className="!px-4 !py-1.5 !text-xs">Enregistrer la note</SubmitButton>
                  </form>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </AdminShell>
  );
}

/** Commande à l'acte : prestation, prix, option express et date limite signalée. */
function OrderBadge({ lead }: { lead: Lead }) {
  if (lead.service === "devis-particuliers" || lead.service === "devis-entreprises") {
    return (
      <p className="mt-1 flex flex-wrap items-center gap-2 text-sm">
        <span className="rounded-full bg-text px-2.5 py-0.5 text-xs font-semibold text-bg">Devis à faire</span>
        <span className="font-semibold">{lead.service === "devis-particuliers" ? "Particulier" : "Entreprise"} : problème hors catalogue</span>
      </p>
    );
  }
  const service = lead.service ? getService(lead.service) : undefined;
  if (!service) return <p className="mt-1 text-sm font-medium">Commande : {lead.service}</p>;
  return (
    <p className="mt-1 flex flex-wrap items-center gap-2 text-sm">
      <span className="rounded-full bg-text px-2.5 py-0.5 text-xs font-semibold text-bg">Commande</span>
      <span className="font-semibold">{serviceText("fr", service.slug).name}</span>
      <span className="text-text-muted">
        {priceLabel("fr", service.price, service.from)} {vatLabel("fr", service.audience)}
        {lead.express ? ` + express ${priceLabel("fr", EXPRESS_PRICE)}` : ""}
      </span>
      {lead.express ? <span className="rounded-full bg-danger-soft px-2.5 py-0.5 text-xs font-semibold text-danger">EXPRESS 24 h</span> : null}
      {lead.deadline ? <span className="text-xs font-medium text-danger">Date limite : {lead.deadline}</span> : null}
    </p>
  );
}
