import Link from "next/link";
import SubmitButton from "@/components/account/SubmitButton";
import { AdminDenied, AdminShell, Empty, FIELD, FIELD_LABEL, LinkButton, PageHeader, Stat } from "@/components/admin/parts";
import { getAdminBadges, listPayments } from "@/lib/account/admin-db";
import { METHOD_LABEL, PLAN_LABEL_FR } from "@/lib/account/admin-labels";
import { addMonths, formatChf } from "@/lib/account/model";
import { formatShortDate } from "@/lib/account/format";
import { getSessionUserRaw } from "@/lib/account/session";

export const dynamic = "force-dynamic";

export default async function AdminPaymentsPage({
  searchParams,
}: {
  searchParams: Promise<{ mois?: string; q?: string }>;
}) {
  const admin = await getSessionUserRaw();
  if (!admin?.is_admin) return <AdminDenied signedIn={Boolean(admin)} />;
  const { mois, q } = await searchParams;

  let from: number | undefined;
  let to: number | undefined;
  if (mois && /^\d{4}-\d{2}$/.test(mois)) {
    from = Date.parse(`${mois}-01T00:00:00Z`);
    if (Number.isFinite(from)) to = addMonths(from, 1);
    else from = undefined;
  }
  const [rows, badges] = await Promise.all([listPayments({ from, to, q: q?.trim() || undefined }), getAdminBadges()]);
  const total = rows.reduce((sum, row) => sum + row.amount_rappen, 0);
  const exportQuery = new URLSearchParams({ type: "payments", ...(mois ? { mois } : {}) }).toString();

  return (
    <AdminShell active="paiements" adminEmail={admin.email} badges={{ dossiers: badges.dossiers, clients: badges.clients }}>
      <PageHeader
        title="Paiements"
        subtitle="Registre des encaissements saisis à la main (en attendant le module de paiement)"
        actions={<LinkButton href={`/api/admin/export?${exportQuery}`}>Exporter en CSV</LinkButton>}
      />

      <div className="mb-5 grid gap-4 sm:grid-cols-3">
        <Stat label="Total de la sélection" value={`CHF ${formatChf(total)}`} hint={`${rows.length} paiement${rows.length > 1 ? "s" : ""}`} />
      </div>

      <form method="get" className="mb-5 grid gap-3 rounded-2xl border border-border bg-surface p-4 sm:grid-cols-4">
        <div>
          <label className={FIELD_LABEL} htmlFor="mois">
            Mois
          </label>
          <input id="mois" name="mois" type="month" defaultValue={mois} className={`${FIELD} mt-1`} />
        </div>
        <div className="sm:col-span-2">
          <label className={FIELD_LABEL} htmlFor="q">
            Recherche
          </label>
          <input id="q" name="q" defaultValue={q} placeholder="Client, entreprise, référence…" className={`${FIELD} mt-1`} />
        </div>
        <div className="flex items-end gap-3">
          <SubmitButton className="!px-5 !py-2">Filtrer</SubmitButton>
          <Link href="/fr/admin/paiements" className="pb-2 text-sm text-text-muted underline underline-offset-4 hover:text-text">
            Réinitialiser
          </Link>
        </div>
      </form>

      {rows.length === 0 ? (
        <Empty>Aucun paiement dans cette sélection. Les paiements s&apos;enregistrent depuis la fiche d&apos;un client.</Empty>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border bg-bg">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-border bg-surface text-xs text-text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Client</th>
                <th className="px-4 py-3 font-medium">Période couverte</th>
                <th className="px-4 py-3 font-medium">Mode</th>
                <th className="px-4 py-3 text-right font-medium">Montant</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((row) => (
                <tr key={row.id} className="hover:bg-surface/60">
                  <td className="px-4 py-3 text-text-muted">{formatShortDate(row.created_at)}</td>
                  <td className="px-4 py-3">
                    <Link href={`/fr/admin/clients/${row.user_id}`} className="font-medium hover:underline">
                      {row.client_name}
                    </Link>
                    <p className="text-xs text-text-muted">{row.client_company ?? row.client_email}</p>
                  </td>
                  <td className="px-4 py-3 text-text-muted">
                    {formatShortDate(row.period_start)} → {formatShortDate(row.period_end)}
                    <p className="text-xs">
                      {PLAN_LABEL_FR[row.plan]}
                      {row.reference ? ` · ${row.reference}` : ""}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-text-muted">{METHOD_LABEL[row.method] ?? row.method}</td>
                  <td className="px-4 py-3 text-right font-medium">CHF {formatChf(row.amount_rappen)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminShell>
  );
}
