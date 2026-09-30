import Link from "next/link";
import SubmitButton from "@/components/account/SubmitButton";
import { AccessBadge, AdminDenied, AdminShell, Card, Empty, FIELD, FIELD_LABEL, Flash, LinkButton, PageHeader } from "@/components/admin/parts";
import { getAdminBadges, listClients, type ClientFilter } from "@/lib/account/admin-db";
import { ACCESS_LABEL, PLAN_LABEL_FR } from "@/lib/account/admin-labels";
import type { AccessState, Plan } from "@/lib/account/model";
import { formatShortDate } from "@/lib/account/format";
import { getSessionUserRaw } from "@/lib/account/session";
import { createClientAction } from "../actions";

export const dynamic = "force-dynamic";

const ACCESS_FILTERS = Object.keys(ACCESS_LABEL) as AccessState[];

export default async function AdminClientsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; access?: string; plan?: string; sort?: string; error?: string }>;
}) {
  const admin = await getSessionUserRaw();
  if (!admin?.is_admin) return <AdminDenied signedIn={Boolean(admin)} />;
  const { q, access, plan, sort, error } = await searchParams;

  const filter: ClientFilter = {
    q: q?.trim() || undefined,
    access: ACCESS_FILTERS.find((a) => a === access),
    plan: plan === "essentiel" || plan === "croissance" ? (plan as Plan) : undefined,
    sort: sort === "name" || sort === "paid_until" || sort === "last_login" ? sort : "recent",
  };
  const [clients, badges] = await Promise.all([listClients(filter), getAdminBadges()]);
  const exportQuery = new URLSearchParams({ type: "clients" }).toString();

  return (
    <AdminShell active="clients" adminEmail={admin.email} badges={{ dossiers: badges.dossiers, clients: badges.clients }}>
      <PageHeader
        title="Clients"
        subtitle={`${clients.length} résultat${clients.length > 1 ? "s" : ""}`}
        actions={<LinkButton href={`/api/admin/export?${exportQuery}`}>Exporter en CSV</LinkButton>}
      />
      {error === "create" ? <Flash tone="error">Email ou nom invalide.</Flash> : null}
      {error === "exists" ? <Flash tone="error">Un compte existe déjà avec cet email.</Flash> : null}

      <form method="get" className="mb-5 grid gap-3 rounded-2xl border border-border bg-surface p-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <label className={FIELD_LABEL} htmlFor="q">
            Recherche
          </label>
          <input id="q" name="q" defaultValue={q} placeholder="Nom, email, entreprise…" className={`${FIELD} mt-1`} />
        </div>
        <div>
          <label className={FIELD_LABEL} htmlFor="access">
            Statut
          </label>
          <select id="access" name="access" defaultValue={filter.access ?? ""} className={`${FIELD} mt-1`}>
            <option value="">Tous</option>
            {ACCESS_FILTERS.map((a) => (
              <option key={a} value={a}>
                {ACCESS_LABEL[a]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={FIELD_LABEL} htmlFor="plan">
            Formule
          </label>
          <select id="plan" name="plan" defaultValue={filter.plan ?? ""} className={`${FIELD} mt-1`}>
            <option value="">Toutes</option>
            <option value="essentiel">Essentiel</option>
            <option value="croissance">Croissance</option>
          </select>
        </div>
        <div>
          <label className={FIELD_LABEL} htmlFor="sort">
            Tri
          </label>
          <select id="sort" name="sort" defaultValue={filter.sort} className={`${FIELD} mt-1`}>
            <option value="recent">Plus récents</option>
            <option value="name">Nom</option>
            <option value="paid_until">Échéance</option>
            <option value="last_login">Dernière connexion</option>
          </select>
        </div>
        <div className="flex items-end gap-2 sm:col-span-2 lg:col-span-5">
          <SubmitButton className="!px-5 !py-2">Filtrer</SubmitButton>
          <Link href="/fr/admin/clients" className="text-sm text-text-muted underline underline-offset-4 hover:text-text">
            Réinitialiser
          </Link>
        </div>
      </form>

      {clients.length === 0 ? (
        <Empty>Aucun client ne correspond.</Empty>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border bg-bg">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-border bg-surface text-xs text-text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Client</th>
                <th className="px-4 py-3 font-medium">Formule</th>
                <th className="px-4 py-3 font-medium">Statut</th>
                <th className="px-4 py-3 font-medium">Valable jusqu&apos;au</th>
                <th className="px-4 py-3 font-medium">Ce mois</th>
                <th className="px-4 py-3 font-medium">Dernière connexion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-surface/60">
                  <td className="px-4 py-3">
                    <Link href={`/fr/admin/clients/${client.id}`} className="font-medium hover:underline">
                      {client.name}
                    </Link>
                    {client.unread ? <span className="ml-2 inline-block h-2 w-2 rounded-full bg-danger align-middle" title="Demandes non lues" /> : null}
                    <p className="text-xs text-text-muted">{client.company ? `${client.company} · ` : ""}{client.email}</p>
                  </td>
                  <td className="px-4 py-3 text-text-muted">{PLAN_LABEL_FR[client.plan]}</td>
                  <td className="px-4 py-3">
                    <AccessBadge access={client.access} />
                  </td>
                  <td className={`px-4 py-3 ${client.access === "expired" ? "font-medium text-danger" : "text-text-muted"}`}>
                    {client.paid_until ? formatShortDate(client.paid_until) : "—"}
                  </td>
                  <td className="px-4 py-3 text-xs text-text-muted">
                    {client.dossiers_used}/{client.dossiers_allowance} dossiers
                    <br />
                    {client.questions_used}/{client.questions_allowance} questions
                  </td>
                  <td className="px-4 py-3 text-text-muted">{client.last_login_at ? formatShortDate(client.last_login_at) : "jamais"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Card title="Ajouter un client à la main" className="mt-8">
        <p className="mb-4 text-sm text-text-muted">
          Pour quelqu&apos;un qui paie par téléphone ou virement sans passer par le formulaire. Le compte est créé « à activer » : enregistrez ensuite son paiement.
        </p>
        <form action={createClientAction} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className={FIELD_LABEL} htmlFor="c-name">
              Nom et prénom
            </label>
            <input id="c-name" name="name" required minLength={2} className={`${FIELD} mt-1`} />
          </div>
          <div>
            <label className={FIELD_LABEL} htmlFor="c-email">
              Email
            </label>
            <input id="c-email" name="email" type="email" required className={`${FIELD} mt-1`} />
          </div>
          <div>
            <label className={FIELD_LABEL} htmlFor="c-company">
              Entreprise
            </label>
            <input id="c-company" name="company" className={`${FIELD} mt-1`} />
          </div>
          <div>
            <label className={FIELD_LABEL} htmlFor="c-phone">
              Téléphone
            </label>
            <input id="c-phone" name="phone" type="tel" className={`${FIELD} mt-1`} />
          </div>
          <div>
            <label className={FIELD_LABEL} htmlFor="c-plan">
              Formule
            </label>
            <select id="c-plan" name="plan" className={`${FIELD} mt-1`}>
              <option value="essentiel">Essentiel</option>
              <option value="croissance">Croissance</option>
            </select>
          </div>
          <div>
            <label className={FIELD_LABEL} htmlFor="c-locale">
              Langue
            </label>
            <select id="c-locale" name="locale" className={`${FIELD} mt-1`}>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="en">English</option>
              <option value="it">Italiano</option>
            </select>
          </div>
          <label className="flex items-center gap-2 text-sm text-text-muted sm:col-span-2 lg:col-span-3">
            <input type="checkbox" name="invite" defaultChecked className="h-4 w-4 accent-text" />
            Envoyer un email pour qu&apos;il choisisse son mot de passe
          </label>
          <div className="sm:col-span-2 lg:col-span-3">
            <SubmitButton className="!px-5 !py-2">Créer le client</SubmitButton>
          </div>
        </form>
      </Card>
    </AdminShell>
  );
}
