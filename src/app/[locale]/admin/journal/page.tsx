import Link from "next/link";
import { AdminDenied, AdminShell, Card, Empty, PageHeader } from "@/components/admin/parts";
import { countAudit, getAdminBadges, listAudit } from "@/lib/account/admin-db";
import { AUDIT_LABEL } from "@/lib/account/admin-labels";
import { formatDateTime } from "@/lib/account/format";
import { getSessionUserRaw } from "@/lib/account/session";

export const dynamic = "force-dynamic";
const PAGE_SIZE = 50;

export default async function AdminJournalPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const admin = await getSessionUserRaw();
  if (!admin?.is_admin) return <AdminDenied signedIn={Boolean(admin)} />;
  const { page } = await searchParams;
  const current = Math.max(1, Math.round(Number(page) || 1));

  const [entries, total, badges] = await Promise.all([listAudit(PAGE_SIZE, (current - 1) * PAGE_SIZE), countAudit(), getAdminBadges()]);
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <AdminShell active="journal" adminEmail={admin.email} badges={badges}>
      <PageHeader title="Journal d'activité" subtitle="Toutes les actions sensibles : paiements, changements de statut, réponses, connexions admin." />
      <Card>
        {entries.length === 0 ? (
          <Empty>Aucune activité.</Empty>
        ) : (
          <div className="-mx-2 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="text-xs text-text-muted">
                <tr>
                  <th className="px-2 pb-2 font-medium">Date</th>
                  <th className="px-2 pb-2 font-medium">Action</th>
                  <th className="px-2 pb-2 font-medium">Détail</th>
                  <th className="px-2 pb-2 font-medium">Par</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {entries.map((entry) => (
                  <tr key={entry.id}>
                    <td className="whitespace-nowrap px-2 py-2.5 text-text-muted">{formatDateTime(entry.created_at, "fr")}</td>
                    <td className="px-2 py-2.5 font-medium">
                      {entry.target_type === "user" && entry.target_id ? (
                        <Link href={`/fr/admin/clients/${entry.target_id}`} className="hover:underline">
                          {AUDIT_LABEL[entry.action] ?? entry.action}
                        </Link>
                      ) : entry.target_type === "dossier" && entry.target_id ? (
                        <Link href={`/fr/admin/dossiers/${entry.target_id}`} className="hover:underline">
                          {AUDIT_LABEL[entry.action] ?? entry.action}
                        </Link>
                      ) : (
                        (AUDIT_LABEL[entry.action] ?? entry.action)
                      )}
                    </td>
                    <td className="px-2 py-2.5 text-text-muted">{entry.detail ?? "—"}</td>
                    <td className="px-2 py-2.5 text-text-muted">{entry.actor_email ?? "système"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {pages > 1 ? (
          <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-sm">
            {current > 1 ? (
              <Link href={`/fr/admin/journal?page=${current - 1}`} className="underline underline-offset-4">
                ← Plus récent
              </Link>
            ) : (
              <span />
            )}
            <span className="text-text-muted">
              Page {current} / {pages}
            </span>
            {current < pages ? (
              <Link href={`/fr/admin/journal?page=${current + 1}`} className="underline underline-offset-4">
                Plus ancien →
              </Link>
            ) : (
              <span />
            )}
          </div>
        ) : null}
      </Card>
    </AdminShell>
  );
}
