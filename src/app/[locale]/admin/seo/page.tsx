import Link from "next/link";
import SubmitButton from "@/components/account/SubmitButton";
import { AdminDenied, AdminShell, Card, Empty, FIELD, FIELD_LABEL, Flash, PageHeader } from "@/components/admin/parts";
import SeoPlanRunner from "@/components/admin/SeoPlanRunner";
import { getAdminBadges } from "@/lib/account/admin-db";
import { formatDateTime } from "@/lib/account/format";
import { getSessionUserRaw } from "@/lib/account/session";
import { RESEARCH_PLAN, dataForSeoAuth, listBatches } from "@/lib/seo-research";
import { runCustomAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminSeoPage({ searchParams }: { searchParams: Promise<{ ok?: string; error?: string }> }) {
  const admin = await getSessionUserRaw();
  if (!admin?.is_admin) return <AdminDenied signedIn={Boolean(admin)} />;
  const { ok, error } = await searchParams;
  const [badges, auth, batches] = await Promise.all([getAdminBadges(), dataForSeoAuth(), listBatches()]);

  return (
    <AdminShell active="seo" adminEmail={admin.email} badges={badges}>
      <PageHeader title="SEO" subtitle="Volumes de recherche, coût par clic et premiers résultats Google en Suisse (DataForSEO)." />
      {ok === "deleted" ? <Flash>Rapport supprimé.</Flash> : null}
      {error === "empty" ? <Flash tone="error">Indiquez au moins un mot-clé.</Flash> : null}

      <Card title="Connexion DataForSEO">
        <p className="text-sm text-text-muted">
          {auth ? (
            <>
              Identifiants trouvés dans les secrets du Worker (<span className="font-mono text-xs">{auth.source}</span>).
            </>
          ) : (
            <>
              Aucun identifiant trouvé. Ajoutez dans Cloudflare (Worker <span className="font-mono text-xs">falx</span>, Settings, Variables
              and Secrets) deux secrets nommés <span className="font-mono text-xs">DATAFORSEO_LOGIN</span> et{" "}
              <span className="font-mono text-xs">DATAFORSEO_PASSWORD</span> (mot de passe d’API du tableau de bord DataForSEO).
            </>
          )}
        </p>
      </Card>

      <Card title="Recherche complète Thrax Legal" className="mt-6">
        <p className="mb-4 text-sm leading-relaxed text-text-muted">
          {RESEARCH_PLAN.length} étapes préparées : volumes et coût par clic de ~130 mots-clés (FR et DE), idées de mots-clés pour l’offre et le
          guide, et le top 10 Google Suisse sur 7 recherches clés. Coût estimé : environ 0,50 USD. À la fin, un lien de partage en lecture
          seule permet de transmettre les résultats sans donner accès à l’admin ni à la clé.
        </p>
        <SeoPlanRunner disabled={!auth} />
      </Card>

      <Card title="Recherche libre" className="mt-6">
        <form action={runCustomAction} className="grid gap-4 md:grid-cols-[1fr_180px_180px]">
          <div className="md:row-span-2">
            <label htmlFor="keywords" className={FIELD_LABEL}>
              Mots-clés (un par ligne)
            </label>
            <textarea id="keywords" name="keywords" rows={6} required placeholder={"cgv suisse\ncontrat de travail suisse"} className={`${FIELD} mt-1 resize-y`} />
          </div>
          <div>
            <label htmlFor="kind" className={FIELD_LABEL}>
              Type
            </label>
            <select id="kind" name="kind" className={`${FIELD} mt-1`} defaultValue="volumes">
              <option value="volumes">Volumes et CPC</option>
              <option value="ideas">Idées de mots-clés</option>
              <option value="serp">Top 10 Google (1er mot-clé)</option>
            </select>
          </div>
          <div>
            <label htmlFor="language" className={FIELD_LABEL}>
              Langue
            </label>
            <select id="language" name="language" className={`${FIELD} mt-1`} defaultValue="fr">
              <option value="fr">Français</option>
              <option value="de">Allemand</option>
              <option value="en">Anglais</option>
              <option value="it">Italien</option>
            </select>
          </div>
          <div className="md:col-span-2 md:col-start-2 md:self-end">
            <SubmitButton className="w-full">Lancer</SubmitButton>
          </div>
        </form>
      </Card>

      <Card title="Rapports" className="mt-6">
        {batches.length === 0 ? (
          <Empty>Aucun rapport pour l’instant.</Empty>
        ) : (
          <ul className="divide-y divide-border">
            {batches.map((b) => (
              <li key={b.batch} className="flex flex-wrap items-center justify-between gap-3 py-3 text-sm">
                <div>
                  <Link href={`/fr/admin/seo/${b.batch}`} className="font-medium underline underline-offset-4">
                    {b.reports > 1 ? "Recherche complète" : b.label}
                  </Link>
                  <p className="text-xs text-text-muted">
                    {formatDateTime(b.created_at, "fr")} · {b.reports} résultat(s) · {Number(b.cost ?? 0).toFixed(3)} USD
                    {b.errors ? <span className="text-danger"> · {b.errors} erreur(s)</span> : null}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </AdminShell>
  );
}
