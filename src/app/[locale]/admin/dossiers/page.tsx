import Link from "next/link";
import { currentTime } from "@/lib/account/model";
import SubmitButton from "@/components/account/SubmitButton";
import { AdminDenied, AdminShell, Empty, FIELD, FIELD_LABEL, LinkButton, PageHeader, StatusBadge } from "@/components/admin/parts";
import { getAdminBadges, listAdminDossiers, type DossierFilter } from "@/lib/account/admin-db";
import { KIND_LABEL, PLAN_LABEL_FR } from "@/lib/account/admin-labels";
import { CATEGORY_LABELS, type DossierCategory } from "@/lib/account/categories";
import { formatShortDate } from "@/lib/account/format";
import type { DossierKind } from "@/lib/account/model";
import { getSessionUserRaw } from "@/lib/account/session";

export const dynamic = "force-dynamic";

const TABS: { key: string; label: string }[] = [
  { key: "ouverts", label: "Ouvertes" },
  { key: "retard", label: "En retard" },
  { key: "nonlus", label: "Non lues" },
  { key: "urgent", label: "Urgentes" },
  { key: "traites", label: "Traitées" },
  { key: "tous", label: "Toutes" },
];

export default async function AdminDossiersPage({
  searchParams,
}: {
  searchParams: Promise<{ vue?: string; kind?: string; q?: string }>;
}) {
  const admin = await getSessionUserRaw();
  if (!admin?.is_admin) return <AdminDenied signedIn={Boolean(admin)} />;
  const { vue, kind, q } = await searchParams;
  const view = TABS.some((t) => t.key === vue) ? (vue as string) : "ouverts";

  const filter: DossierFilter = { q: q?.trim() || undefined };
  if (view === "ouverts") filter.status = "ouverts";
  if (view === "retard") filter.overdue = true;
  if (view === "nonlus") filter.unread = true;
  if (view === "urgent") {
    filter.urgent = true;
    filter.status = "ouverts";
  }
  if (view === "traites") filter.status = "traite";
  if (kind === "question" || kind === "dossier") filter.kind = kind as DossierKind;

  const [rows, badges] = await Promise.all([listAdminDossiers(filter), getAdminBadges()]);
  const now = currentTime();
  const tabHref = (key: string) => {
    const params = new URLSearchParams({ vue: key });
    if (kind) params.set("kind", kind);
    if (q) params.set("q", q);
    return `/fr/admin/dossiers?${params.toString()}`;
  };

  return (
    <AdminShell active="dossiers" adminEmail={admin.email} badges={{ dossiers: badges.dossiers, clients: badges.clients }}>
      <PageHeader
        title="Demandes"
        subtitle={`${rows.length} résultat${rows.length > 1 ? "s" : ""}, triées par échéance`}
        actions={<LinkButton href="/api/admin/export?type=dossiers">Exporter en CSV</LinkButton>}
      />

      <div className="mb-4 flex flex-wrap gap-1.5">
        {TABS.map((tab) => (
          <Link
            key={tab.key}
            href={tabHref(tab.key)}
            className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${
              view === tab.key ? "bg-text font-medium text-bg" : "border border-border text-text-muted hover:bg-surface hover:text-text"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      <form method="get" className="mb-5 grid gap-3 rounded-2xl border border-border bg-surface p-4 sm:grid-cols-4">
        <input type="hidden" name="vue" value={view} />
        <div className="sm:col-span-2">
          <label className={FIELD_LABEL} htmlFor="q">
            Recherche
          </label>
          <input id="q" name="q" defaultValue={q} placeholder="Client, entreprise, mot du texte…" className={`${FIELD} mt-1`} />
        </div>
        <div>
          <label className={FIELD_LABEL} htmlFor="kind">
            Type
          </label>
          <select id="kind" name="kind" defaultValue={kind ?? ""} className={`${FIELD} mt-1`}>
            <option value="">Tous</option>
            <option value="question">Questions rapides</option>
            <option value="dossier">Dossiers</option>
          </select>
        </div>
        <div className="flex items-end">
          <SubmitButton className="!px-5 !py-2">Filtrer</SubmitButton>
        </div>
      </form>

      {rows.length === 0 ? (
        <Empty>Aucune demande dans cette vue.</Empty>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border bg-bg">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="border-b border-border bg-surface text-xs text-text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Client</th>
                <th className="px-4 py-3 font-medium">Demande</th>
                <th className="px-4 py-3 font-medium">Reçue</th>
                <th className="px-4 py-3 font-medium">Échéance</th>
                <th className="px-4 py-3 font-medium">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((row) => {
                const overdue = row.status !== "traite" && row.due_at !== null && row.due_at < now;
                return (
                  <tr key={row.id} className="hover:bg-surface/60">
                    <td className="px-4 py-3">
                      <Link href={`/fr/admin/dossiers/${row.id}`} className="font-medium hover:underline">
                        {row.client_name}
                      </Link>
                      {row.admin_unread ? <span className="ml-2 inline-block h-2 w-2 rounded-full bg-danger align-middle" title="Non lu" /> : null}
                      <p className="text-xs text-text-muted">
                        {row.client_company ? `${row.client_company} · ` : ""}
                        {PLAN_LABEL_FR[row.client_plan]}
                      </p>
                    </td>
                    <td className="max-w-xs px-4 py-3">
                      <p className="text-text">
                        {CATEGORY_LABELS.fr[row.category as DossierCategory] ?? row.category}
                        <span className="ml-2 text-xs text-text-muted">
                          {KIND_LABEL[row.kind]}
                          {row.units > 1 ? ` ×${row.units}` : ""}
                        </span>
                        {row.urgency === "urgent" ? <span className="ml-2 text-xs font-medium text-danger">urgent</span> : null}
                      </p>
                      <p className="truncate text-xs text-text-muted">{row.description}</p>
                    </td>
                    <td className="px-4 py-3 text-text-muted">{formatShortDate(row.created_at)}</td>
                    <td className={`px-4 py-3 ${overdue ? "font-medium text-danger" : "text-text-muted"}`}>
                      {row.status === "traite" ? "—" : row.due_at ? formatShortDate(row.due_at) : "—"}
                      {overdue ? <span className="block text-xs">en retard</span> : null}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={row.status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </AdminShell>
  );
}
