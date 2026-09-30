import Link from "next/link";
import { currentTime } from "@/lib/account/model";
import SubmitButton from "@/components/account/SubmitButton";
import {
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
import { getAdminBadges, getAdminDossier } from "@/lib/account/admin-db";
import { listMessages, markDossierRead, parseAttachments, DOSSIER_STATUSES, type Attachment } from "@/lib/account/db";
import { DOSSIER_STATUS_LABEL, KIND_LABEL, PLAN_LABEL_FR } from "@/lib/account/admin-labels";
import { CATEGORY_LABELS, type DossierCategory } from "@/lib/account/categories";
import { formatBytes, formatDateTime } from "@/lib/account/format";
import { getSessionUserRaw } from "@/lib/account/session";
import { replyAction, setDossierStatusAction, updateDossierFieldsAction } from "../../actions";

export const dynamic = "force-dynamic";

const FLASH: Record<string, string> = {
  reply: "Réponse envoyée au client.",
  note: "Note interne enregistrée.",
  status: "Statut mis à jour.",
  fields: "Modifications enregistrées.",
};
const ERRORS: Record<string, string> = {
  empty: "Écrivez un message ou joignez un document.",
  file: "Un fichier dépasse 10 Mo.",
};

function Files({ files }: { files: Attachment[] }) {
  if (files.length === 0) return null;
  return (
    <ul className="mt-2 flex flex-wrap gap-2">
      {files.map((file) => (
        <li key={file.key}>
          <a
            href={`/api/files?key=${encodeURIComponent(file.key)}`}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-bg px-3 py-1.5 text-xs text-text hover:bg-surface"
          >
            {file.name}
            <span className="text-text-muted">{formatBytes(file.size)}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default async function AdminDossierPage({
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

  const dossier = await getAdminDossier(id);
  const badges = await getAdminBadges();
  if (!dossier) {
    return (
      <AdminShell active="dossiers" adminEmail={admin.email} badges={badges}>
        <PageHeader title="Demande introuvable" />
        <Link href="/fr/admin/dossiers" className="text-sm underline underline-offset-4">
          ← Retour aux demandes
        </Link>
      </AdminShell>
    );
  }

  if (dossier.admin_unread) await markDossierRead(dossier.id, "admin");
  const messages = await listMessages(dossier.id, true);
  const now = currentTime();
  const overdue = dossier.status !== "traite" && dossier.due_at !== null && dossier.due_at < now;
  const dueInput = dossier.due_at ? new Date(dossier.due_at).toISOString().slice(0, 10) : "";

  return (
    <AdminShell active="dossiers" adminEmail={admin.email} badges={{ dossiers: Math.max(0, badges.dossiers - (dossier.admin_unread ? 1 : 0)), clients: badges.clients }}>
      <Link href="/fr/admin/dossiers" className="text-sm text-text-muted underline underline-offset-4 hover:text-text">
        ← Demandes
      </Link>
      <div className="mt-4">
        <PageHeader
          title={CATEGORY_LABELS.fr[dossier.category as DossierCategory] ?? dossier.category}
          subtitle={`${KIND_LABEL[dossier.kind]}${dossier.units > 1 ? ` (compte pour ${dossier.units})` : ""} · reçue le ${formatDateTime(dossier.created_at, "fr")}`}
          actions={<StatusBadge status={dossier.status} />}
        />
      </div>
      {ok && FLASH[ok] ? <Flash>{FLASH[ok]}</Flash> : null}
      {error && ERRORS[error] ? <Flash tone="error">{ERRORS[error]}</Flash> : null}
      {overdue ? <Flash tone="error">Délai contractuel dépassé ({dossier.due_at ? formatDateTime(dossier.due_at, "fr") : ""}).</Flash> : null}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card title="Demande du client">
            <p className="whitespace-pre-wrap text-sm leading-relaxed">{dossier.description}</p>
            <Files files={parseAttachments(dossier.attachments)} />
            {dossier.urgency === "urgent" ? <p className="mt-3 text-xs font-semibold text-danger">Marquée URGENTE (formule Croissance)</p> : null}
          </Card>

          <Card title={`Échanges (${messages.length})`}>
            {messages.length === 0 ? (
              <Empty>Aucun échange pour l&apos;instant.</Empty>
            ) : (
              <div className="space-y-3">
                {messages.map((message) => {
                  const internal = message.internal === 1;
                  const fromClient = message.author_role === "client";
                  return (
                    <div
                      key={message.id}
                      className={`rounded-xl border px-4 py-3 ${
                        internal ? "border-dashed border-text/30 bg-surface" : fromClient ? "border-border bg-bg" : "border-text/15 bg-surface"
                      }`}
                    >
                      <p className="flex items-center justify-between gap-3 text-xs text-text-muted">
                        <span className="font-semibold text-text">
                          {internal ? "Note interne (invisible du client)" : fromClient ? dossier.client_name : "Vous"}
                        </span>
                        <span>{formatDateTime(message.created_at, "fr")}</span>
                      </p>
                      <p className="mt-1.5 whitespace-pre-wrap text-sm leading-relaxed">{message.body}</p>
                      <Files files={parseAttachments(message.attachments)} />
                    </div>
                  );
                })}
              </div>
            )}

            <form action={replyAction.bind(null, dossier.id)} encType="multipart/form-data" className="mt-6 space-y-3 border-t border-border pt-5">
              <div>
                <label className={FIELD_LABEL} htmlFor="body">
                  Répondre au client, ou ajouter une note interne
                </label>
                <textarea id="body" name="body" rows={6} maxLength={20000} className={`${FIELD} mt-1 resize-y leading-relaxed`} />
              </div>
              <div>
                <label className={FIELD_LABEL} htmlFor="attachments">
                  Documents (livrables, 5 max, 10 Mo chacun)
                </label>
                <input
                  id="attachments"
                  name="attachments"
                  type="file"
                  multiple
                  className="mt-1 w-full rounded-lg border border-dashed border-border bg-surface px-3 py-2 text-sm text-text-muted file:mr-3 file:rounded-full file:border-0 file:bg-text file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-bg"
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className={FIELD_LABEL} htmlFor="set_status">
                    Statut après envoi
                  </label>
                  <select id="set_status" name="set_status" defaultValue={dossier.status === "nouveau" ? "en_cours" : dossier.status} className={`${FIELD} mt-1`}>
                    {DOSSIER_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {DOSSIER_STATUS_LABEL[status]}
                      </option>
                    ))}
                  </select>
                </div>
                <label className="flex items-end gap-2 pb-2 text-sm text-text-muted">
                  <input type="checkbox" name="notify" defaultChecked className="h-4 w-4 accent-text" />
                  Prévenir le client par email
                </label>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="submit"
                  name="mode"
                  value="reply"
                  className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-2 text-sm font-medium text-bg transition-colors hover:bg-accent-hover"
                >
                  Envoyer au client
                </button>
                <button
                  type="submit"
                  name="mode"
                  value="note"
                  className="inline-flex items-center justify-center rounded-full border border-border px-5 py-2 text-sm font-medium text-text transition-colors hover:bg-surface"
                >
                  Enregistrer comme note interne
                </button>
              </div>
            </form>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Client">
            <p className="text-sm font-medium">
              <Link href={`/fr/admin/clients/${dossier.user_id}`} className="hover:underline">
                {dossier.client_name}
              </Link>
            </p>
            <p className="text-xs text-text-muted">{dossier.client_company ?? ""}</p>
            <p className="mt-1 text-xs text-text-muted">
              <a href={`mailto:${dossier.client_email}`} className="underline underline-offset-4">
                {dossier.client_email}
              </a>
            </p>
            <p className="mt-2 text-xs text-text-muted">Formule {PLAN_LABEL_FR[dossier.client_plan]}</p>
          </Card>

          <Card title="Statut">
            <div className="flex flex-wrap gap-2">
              {DOSSIER_STATUSES.filter((s) => s !== dossier.status).map((status) => (
                <ActionButton key={status} action={setDossierStatusAction.bind(null, dossier.id, status, true)} className="!py-1.5 !text-xs">
                  {DOSSIER_STATUS_LABEL[status]}
                </ActionButton>
              ))}
            </div>
            <p className="mt-3 text-xs text-text-muted">« Traité » prévient automatiquement le client.</p>
          </Card>

          <Card title="Décompte et suivi">
            <form action={updateDossierFieldsAction.bind(null, dossier.id)} className="space-y-3">
              <div>
                <label className={FIELD_LABEL} htmlFor="kind">
                  Type
                </label>
                <select id="kind" name="kind" defaultValue={dossier.kind} className={`${FIELD} mt-1`}>
                  <option value="question">Question rapide</option>
                  <option value="dossier">Dossier</option>
                </select>
              </div>
              <div>
                <label className={FIELD_LABEL} htmlFor="units">
                  Compte pour (dossiers)
                </label>
                <input id="units" name="units" type="number" min={1} max={10} defaultValue={dossier.units} className={`${FIELD} mt-1`} />
                <p className="mt-1 text-xs text-text-muted">2 ou plus si plusieurs livrables ou parties, ou plus de 20 pages (CGV art. 3).</p>
              </div>
              <div>
                <label className={FIELD_LABEL} htmlFor="due_at">
                  Échéance
                </label>
                <input id="due_at" name="due_at" type="date" defaultValue={dueInput} className={`${FIELD} mt-1`} />
              </div>
              <div>
                <label className={FIELD_LABEL} htmlFor="internal_notes">
                  Mémo interne
                </label>
                <textarea id="internal_notes" name="internal_notes" rows={4} defaultValue={dossier.internal_notes ?? ""} className={`${FIELD} mt-1 resize-y`} />
              </div>
              <SubmitButton className="!px-5 !py-2">Enregistrer</SubmitButton>
            </form>
          </Card>
        </div>
      </div>
    </AdminShell>
  );
}
