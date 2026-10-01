import Link from "next/link";
import SubmitButton from "@/components/account/SubmitButton";
import { AdminDenied, AdminShell, Card, Empty, PageHeader } from "@/components/admin/parts";
import { getAdminBadges } from "@/lib/account/admin-db";
import { formatDateTime } from "@/lib/account/format";
import { getSessionUserRaw } from "@/lib/account/session";
import { getBatch, type KeywordRow, type SerpRow } from "@/lib/seo-research";
import { SITE_URL } from "@/lib/site";
import { deleteBatchAction } from "../actions";

export const dynamic = "force-dynamic";

const fmt = (n: number | null, digits = 0) => (n === null || n === undefined ? "—" : n.toLocaleString("fr-CH", { maximumFractionDigits: digits, minimumFractionDigits: digits }));

export default async function AdminSeoBatchPage({ params }: { params: Promise<{ batch: string }> }) {
  const admin = await getSessionUserRaw();
  if (!admin?.is_admin) return <AdminDenied signedIn={Boolean(admin)} />;
  const { batch } = await params;
  const [badges, reports] = await Promise.all([getAdminBadges(), getBatch(batch)]);

  if (!reports.length) {
    return (
      <AdminShell active="seo" adminEmail={admin.email} badges={badges}>
        <PageHeader title="Rapport introuvable" />
        <Link href="/fr/admin/seo" className="text-sm underline underline-offset-4">
          Retour
        </Link>
      </AdminShell>
    );
  }

  const shareUrl = `${SITE_URL}/api/seo-report/${reports[0].share_token}`;
  const cost = reports.reduce((sum, r) => sum + (r.cost ?? 0), 0);

  return (
    <AdminShell active="seo" adminEmail={admin.email} badges={badges}>
      <PageHeader
        title={reports.length > 1 ? "Recherche complète" : reports[0].label}
        subtitle={`${formatDateTime(reports[0].created_at, "fr")} · ${cost.toFixed(3)} USD · Suisse`}
      />

      <Card title="Lien de partage (lecture seule)">
        <p className="text-sm text-text-muted">
          Ce lien affiche uniquement les résultats de ce rapport (format JSON). Il ne permet ni de lancer une recherche, ni d’accéder à
          l’admin. Supprimez le rapport pour le désactiver.
        </p>
        <p className="mt-3 break-all rounded-xl border border-border bg-bg px-3 py-2 font-mono text-xs">{shareUrl}</p>
      </Card>

      {reports.map((report) => {
        const rows = JSON.parse(report.result) as unknown[];
        return (
          <Card key={report.id} title={report.label} className="mt-6">
            {report.error ? (
              <p className="text-sm text-danger">Erreur : {report.error}</p>
            ) : rows.length === 0 ? (
              <Empty>Aucun résultat.</Empty>
            ) : report.kind === "serp" ? (
              <ol className="space-y-3 text-sm">
                {(rows as SerpRow[]).map((row) => (
                  <li key={row.rank + row.url}>
                    <p className="font-medium">
                      {row.rank}. {row.title}
                    </p>
                    <p className="text-xs text-text-muted">{row.domain}</p>
                    <p className="text-xs text-text-muted">{row.description}</p>
                  </li>
                ))}
              </ol>
            ) : (
              <div className="-mx-2 max-h-[560px] overflow-auto">
                <table className="w-full min-w-[520px] text-left text-sm">
                  <thead className="sticky top-0 bg-surface text-xs text-text-muted">
                    <tr>
                      <th className="px-2 py-2 font-medium">Mot-clé</th>
                      <th className="px-2 py-2 text-right font-medium">Recherches / mois</th>
                      <th className="px-2 py-2 text-right font-medium">CPC</th>
                      <th className="px-2 py-2 text-right font-medium">Enchère haute</th>
                      <th className="px-2 py-2 font-medium">Concurrence</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {(rows as KeywordRow[]).map((row) => (
                      <tr key={row.keyword}>
                        <td className="px-2 py-1.5">{row.keyword}</td>
                        <td className="px-2 py-1.5 text-right tabular-nums">{fmt(row.volume)}</td>
                        <td className="px-2 py-1.5 text-right tabular-nums">{fmt(row.cpc, 2)}</td>
                        <td className="px-2 py-1.5 text-right tabular-nums">{fmt(row.bidHigh, 2)}</td>
                        <td className="px-2 py-1.5 text-xs text-text-muted">{row.competition ?? "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        );
      })}

      <form action={deleteBatchAction.bind(null, batch)} className="mt-6">
        <SubmitButton variant="danger" confirm="Supprimer ce rapport et désactiver son lien de partage ?">
          Supprimer le rapport
        </SubmitButton>
      </form>
    </AdminShell>
  );
}
