import Link from "next/link";
import { currentTime } from "@/lib/account/model";
import { AccessBadge, AdminDenied, AdminShell, Card, Empty, PageHeader, Stat, StatusBadge } from "@/components/admin/parts";
import { getAdminBadges, getStats, listAudit } from "@/lib/account/admin-db";
import { AUDIT_LABEL, KIND_LABEL, PLAN_LABEL_FR } from "@/lib/account/admin-labels";
import { formatChf } from "@/lib/account/model";
import { formatDateTime, formatShortDate } from "@/lib/account/format";
import { getSessionUserRaw } from "@/lib/account/session";

export const dynamic = "force-dynamic";

function Trend({ current, previous }: { current: number; previous: number }) {
  if (previous === 0) return <>{current === 0 ? "—" : "premier mois d'encaissement"}</>;
  const delta = Math.round(((current - previous) / previous) * 100);
  return <>{delta >= 0 ? `+${delta}` : delta} % vs mois dernier</>;
}

export default async function AdminOverviewPage() {
  const admin = await getSessionUserRaw();
  if (!admin?.is_admin) return <AdminDenied signedIn={Boolean(admin)} />;

  const [stats, badges, activity] = await Promise.all([getStats(), getAdminBadges(), listAudit(8)]);
  const maxMonth = Math.max(1, ...stats.revenueByMonth.map((m) => m.rappen));
  const now = currentTime();

  return (
    <AdminShell active="overview" adminEmail={admin.email} badges={{ dossiers: badges.dossiers, clients: badges.clients }}>
      <PageHeader title="Vue d'ensemble" subtitle={`Mise à jour ${formatDateTime(now, "fr")}`} />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Clients actifs" value={stats.clients.ok} hint={`${stats.clients.total} comptes au total`} />
        <Stat
          label="Revenu récurrent / mois"
          value={`CHF ${formatChf(stats.mrrRappen).replace(/\.00$/, "")}`}
          hint="Estimé d'après les formules des clients actifs"
        />
        <Stat
          label="Encaissé ce mois"
          value={`CHF ${formatChf(stats.revenueMonthRappen).replace(/\.00$/, "")}`}
          hint={<Trend current={stats.revenueMonthRappen} previous={stats.revenuePrevMonthRappen} />}
        />
        <Stat label="À activer (inscrits non payés)" value={stats.clients.pending} tone={stats.clients.pending ? "warn" : undefined} hint="Paiement à enregistrer pour ouvrir l'accès" />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Demandes ouvertes" value={stats.dossiers.open} hint={`${stats.dossiers.createdThisMonth} reçues ce mois`} />
        <Stat label="En retard" value={stats.dossiers.overdue} tone={stats.dossiers.overdue ? "danger" : undefined} hint="Délai contractuel dépassé" />
        <Stat label="Non lues" value={stats.dossiers.unread} hint="Nouvelles demandes et messages clients" />
        <Stat
          label="Traitées ce mois"
          value={stats.dossiers.treatedThisMonth}
          hint={stats.dossiers.avgCloseHours !== null ? `Clôture moyenne ${stats.dossiers.avgCloseHours} h (30 j)` : "—"}
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card
          title="File d'attente"
          className="lg:col-span-2"
          action={
            <Link href="/fr/admin/dossiers" className="text-xs text-text-muted underline underline-offset-4 hover:text-text">
              Tout voir
            </Link>
          }
        >
          {stats.queue.length === 0 ? (
            <Empty>Aucune demande ouverte.</Empty>
          ) : (
            <div className="-mx-2 overflow-x-auto">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead className="text-xs text-text-muted">
                  <tr>
                    <th className="px-2 pb-2 font-medium">Client</th>
                    <th className="px-2 pb-2 font-medium">Type</th>
                    <th className="px-2 pb-2 font-medium">Échéance</th>
                    <th className="px-2 pb-2 font-medium">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {stats.queue.map((row) => {
                    const overdue = row.due_at !== null && row.due_at < now;
                    return (
                      <tr key={row.id} className="hover:bg-surface/60">
                        <td className="px-2 py-2.5">
                          <Link href={`/fr/admin/dossiers/${row.id}`} className="font-medium hover:underline">
                            {row.client_name}
                          </Link>
                          {row.admin_unread ? <span className="ml-2 inline-block h-2 w-2 rounded-full bg-danger align-middle" title="Non lu" /> : null}
                          <p className="text-xs text-text-muted">{row.client_company ?? row.client_email}</p>
                        </td>
                        <td className="px-2 py-2.5 text-text-muted">
                          {KIND_LABEL[row.kind]}
                          {row.urgency === "urgent" ? <span className="ml-1 font-medium text-danger">· urgent</span> : null}
                        </td>
                        <td className={`px-2 py-2.5 ${overdue ? "font-medium text-danger" : "text-text-muted"}`}>
                          {row.due_at ? formatShortDate(row.due_at) : "—"}
                        </td>
                        <td className="px-2 py-2.5">
                          <StatusBadge status={row.status} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        <Card title="Encaissements (6 mois)">
          <div className="flex h-36 items-end gap-2">
            {stats.revenueByMonth.map((month) => (
              <div key={month.label} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
                <div
                  className="w-full rounded-t-md bg-text"
                  style={{ height: `${Math.max(month.rappen ? 6 : 2, Math.round((month.rappen / maxMonth) * 100))}%`, opacity: month.rappen ? 1 : 0.15 }}
                  title={`CHF ${formatChf(month.rappen)}`}
                />
                <span className="text-[11px] capitalize text-text-muted">{month.label}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 border-t border-border pt-3 text-xs text-text-muted">
            Total encaissé : <span className="font-medium text-text">CHF {formatChf(stats.revenueTotalRappen)}</span>
          </p>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card title={`À activer (${stats.pendingSignups.length})`}>
          {stats.pendingSignups.length === 0 ? (
            <Empty>Aucune inscription en attente.</Empty>
          ) : (
            <ul className="divide-y divide-border">
              {stats.pendingSignups.slice(0, 6).map((client) => (
                <li key={client.id}>
                  <Link href={`/fr/admin/clients/${client.id}`} className="flex items-center justify-between gap-3 py-2.5 hover:bg-surface/60">
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium">{client.name}</span>
                      <span className="block truncate text-xs text-text-muted">
                        {PLAN_LABEL_FR[client.plan]} · inscrit le {formatShortDate(client.created_at)}
                      </span>
                    </span>
                    <AccessBadge access="pending" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card title={`À renouveler sous 7 jours (${stats.renewalsDue.length})`}>
          {stats.renewalsDue.length === 0 ? (
            <Empty>Aucun renouvellement proche.</Empty>
          ) : (
            <ul className="divide-y divide-border">
              {stats.renewalsDue.slice(0, 6).map((client) => (
                <li key={client.id}>
                  <Link href={`/fr/admin/clients/${client.id}`} className="flex items-center justify-between gap-3 py-2.5 hover:bg-surface/60">
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium">{client.name}</span>
                      <span className="block truncate text-xs text-text-muted">{PLAN_LABEL_FR[client.plan]}</span>
                    </span>
                    <span className="shrink-0 text-xs font-medium">{client.paid_until ? formatShortDate(client.paid_until) : "—"}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card title={`Expirés (${stats.expired.length})`}>
          {stats.expired.length === 0 ? (
            <Empty>Aucun abonnement expiré.</Empty>
          ) : (
            <ul className="divide-y divide-border">
              {stats.expired.slice(0, 6).map((client) => (
                <li key={client.id}>
                  <Link href={`/fr/admin/clients/${client.id}`} className="flex items-center justify-between gap-3 py-2.5 hover:bg-surface/60">
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium">{client.name}</span>
                      <span className="block truncate text-xs text-text-muted">{PLAN_LABEL_FR[client.plan]}</span>
                    </span>
                    <span className="shrink-0 text-xs font-medium text-danger">{client.paid_until ? formatShortDate(client.paid_until) : "—"}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <Card
        title="Activité récente"
        className="mt-6"
        action={
          <Link href="/fr/admin/journal" className="text-xs text-text-muted underline underline-offset-4 hover:text-text">
            Journal complet
          </Link>
        }
      >
        {activity.length === 0 ? (
          <Empty>Aucune activité enregistrée.</Empty>
        ) : (
          <ul className="divide-y divide-border text-sm">
            {activity.map((entry) => (
              <li key={entry.id} className="flex flex-wrap items-baseline justify-between gap-2 py-2">
                <span>
                  <span className="font-medium">{AUDIT_LABEL[entry.action] ?? entry.action}</span>
                  {entry.detail ? <span className="text-text-muted"> · {entry.detail}</span> : null}
                </span>
                <span className="text-xs text-text-muted">{formatDateTime(entry.created_at, "fr")}</span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </AdminShell>
  );
}
