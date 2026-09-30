import Link from "next/link";
import { AdminDenied, AdminShell, Card, PageHeader } from "@/components/admin/parts";
import SubmitButton from "@/components/account/SubmitButton";
import { Notice } from "@/components/account/ui";
import { sendTestEmailAction } from "../actions";
import { getAdminBadges } from "@/lib/account/admin-db";
import { adminEmails, db, readEnv } from "@/lib/account/db";
import { SCHEMA_VERSION } from "@/lib/account/schema";
import { getSessionUserRaw } from "@/lib/account/session";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

function Row({ label, ok, children }: { label: string; ok: boolean; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 py-3">
      <span
        className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
          ok ? "bg-success-soft text-text" : "bg-danger-soft text-danger"
        }`}
      >
        {ok ? "✓" : "!"}
      </span>
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-text-muted">{children}</p>
      </div>
    </li>
  );
}

export default async function AdminSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ test?: string; reason?: string }>;
}) {
  const { test, reason } = await searchParams;
  const admin = await getSessionUserRaw();
  if (!admin?.is_admin) return <AdminDenied signedIn={Boolean(admin)} />;

  const [badges, admins, resendKey, adminEnv] = await Promise.all([
    getAdminBadges(),
    adminEmails(),
    readEnv("RESEND_API_KEY"),
    readEnv("ADMIN_EMAILS"),
  ]);
  const database = await db();
  const version = await database.prepare("SELECT value FROM schema_meta WHERE key = 'version'").first<{ value: string }>();

  return (
    <AdminShell active="parametres" adminEmail={admin.email} badges={badges}>
      <PageHeader title="Paramètres" subtitle="État de la configuration du site." />
      {test === "ok" ? <Notice tone="success">Email de test envoyé à {admins.join(", ")}. Vérifiez votre boîte (et les indésirables).</Notice> : null}
      {test === "fail" ? <Notice tone="error">L&apos;envoi a échoué : {reason ?? "erreur inconnue"}</Notice> : null}
      <Card title="Diagnostic">
        <ul className="divide-y divide-border">
          <Row label="Envoi d'emails (Resend)" ok={Boolean(resendKey)}>
            {resendKey
              ? "Clé API configurée : les emails partent depuis hey@thrax-legal.ch."
              : "Aucune clé RESEND_API_KEY : les emails ne partent pas (ils sont seulement écrits dans les journaux). Ajoutez-la comme Secret du Worker."}
          </Row>
          <Row label="Administrateurs" ok>
            {admins.join(", ")}
            {adminEnv ? " (variable ADMIN_EMAILS)" : " (valeur par défaut, ajoutez ADMIN_EMAILS pour en changer)"}
          </Row>
          <Row label="Adresse du site" ok>
            {SITE_URL} : utilisée dans les liens des emails.
          </Row>
          <Row label="Base de données" ok={Number(version?.value ?? 0) >= SCHEMA_VERSION}>
            Schéma version {version?.value ?? "?"} (attendu {SCHEMA_VERSION}). Les migrations s&apos;appliquent seules.
          </Row>
        </ul>
      </Card>

      <Card title="Notifications par email" className="mt-6">
        <p className="text-sm leading-relaxed text-text-muted">
          Vous recevez un email à <strong className="text-text">{admins.join(", ")}</strong> à chaque nouvelle inscription, nouvelle
          demande d&apos;abonnement, nouveau prospect « Être rappelé », nouvelle demande et nouveau message d&apos;un client. Un envoi
          raté est inscrit dans le <Link href="/fr/admin/journal" className="underline underline-offset-4">Journal</Link>.
        </p>
        <form action={sendTestEmailAction} className="mt-4">
          <SubmitButton>Envoyer un email de test</SubmitButton>
        </form>
      </Card>

      <Card title="Comment ça marche" className="mt-6">
        <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-text-muted">
          <li>Un prospect laisse ses coordonnées (« Être rappelé », page Prospects) ou s&apos;inscrit directement : dans les deux cas vous le rappelez, sans paiement à ce stade.</li>
          <li>Un client s&apos;inscrit : son compte est créé <strong className="text-text">« à activer »</strong> et il ne peut pas se connecter.</li>
          <li>Il vous paie (virement, TWINT…). Vous ouvrez sa fiche et cliquez sur <strong className="text-text">Enregistrer un paiement</strong>.</li>
          <li>L&apos;accès s&apos;ouvre jusqu&apos;à la fin de la période payée, et il reçoit un email.</li>
          <li>À l&apos;échéance sans nouveau paiement, l&apos;accès se ferme tout seul. Ses dossiers sont conservés.</li>
          <li>Le jour où le module de paiement est branché, il appellera la même fonction d&apos;enregistrement de paiement.</li>
        </ol>
      </Card>
    </AdminShell>
  );
}
