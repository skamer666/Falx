import type { Metadata } from "next";
import Link from "next/link";
import { currentTime } from "@/lib/account/model";
import Reveal from "@/components/Reveal";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import SignInPrompt from "@/components/site/SignInPrompt";
import AccessBlocked from "@/components/site/AccessBlocked";
import SubmitButton from "@/components/account/SubmitButton";
import { INPUT, LABEL, Notice } from "@/components/account/ui";
import { Container } from "@/components/site/ui";
import { isLocale, DEFAULT_LOCALE } from "@/i18n/config";
import { getClientGate } from "@/lib/account/session";
import { getDossier, listMessages, markDossierRead, parseAttachments, type Attachment } from "@/lib/account/db";
import { CATEGORY_LABELS, STATUS_LABELS, type DossierCategory } from "@/lib/account/categories";
import { formatBytes, formatDate, formatDateTime } from "@/lib/account/format";
import { ACCOUNT_STRINGS } from "@/lib/account/strings";
import { replyToDossier } from "../../actions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  return { title: ACCOUNT_STRINGS[locale].detail.metaTitle, robots: { index: false, follow: false } };
}

function Files({ files, label }: { files: Attachment[]; label?: string }) {
  if (files.length === 0) return null;
  return (
    <div className="mt-3">
      {label ? <p className="text-xs font-medium uppercase tracking-[0.1em] text-text-muted">{label}</p> : null}
      <ul className="mt-2 flex flex-col gap-1.5">
        {files.map((file) => (
          <li key={file.key}>
            <a
              href={`/api/files?key=${encodeURIComponent(file.key)}`}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-bg px-3 py-1.5 text-sm text-text hover:bg-surface"
            >
              <span className="truncate">{file.name}</span>
              <span className="shrink-0 text-xs text-text-muted">{formatBytes(file.size)}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function DossierDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; id: string }>;
  searchParams: Promise<{ error?: string; sent?: string }>;
}) {
  const { locale: rawLocale, id } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const { error, sent } = await searchParams;
  const strings = ACCOUNT_STRINGS[locale];
  const t = strings.detail;

  const gate = await getClientGate();
  if (gate.kind === "anonymous") return <SignInPrompt locale={locale} />;
  if (gate.kind === "blocked") return <AccessBlocked locale={locale} state={gate.state} name={gate.user.name} />;
  const user = gate.user;

  const dossier = await getDossier(id);
  if (!dossier || dossier.user_id !== user.id) {
    return (
      <>
        <Nav />
        <main className="bg-bg text-text">
          <section className="theme-light flex min-h-screen items-center bg-bg pb-16 pt-32">
            <Container className="mx-auto max-w-sm text-center">
              <p className="text-base text-text-muted">{t.notFound}</p>
              <Link href={`/${locale}/compte/tableau-de-bord`} className="mt-6 inline-block text-sm underline underline-offset-4">
                {t.back}
              </Link>
            </Container>
          </section>
        </main>
        <Footer locale={locale} />
      </>
    );
  }

  if (dossier.client_unread) await markDossierRead(dossier.id, "client");
  const messages = await listMessages(dossier.id, false);
  const now = currentTime();
  const overdue = dossier.status !== "traite" && dossier.due_at !== null && dossier.due_at < now;

  return (
    <>
      <Nav />
      <main className="bg-bg text-text">
        <section className="theme-light border-b border-border bg-bg pb-16 pt-32 md:pt-40">
          <Container className="mx-auto max-w-2xl!">
            <Reveal>
              <Link
                href={`/${locale}/compte/tableau-de-bord`}
                className="text-sm text-text-muted underline underline-offset-4 hover:text-text"
              >
                ← {t.back}
              </Link>

              <div className="mt-6 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h1 className="text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.02em] text-text">
                    {CATEGORY_LABELS[locale][dossier.category as DossierCategory] ?? dossier.category}
                  </h1>
                  <p className="mt-2 flex flex-wrap items-center gap-2 text-sm text-text-muted">
                    <span className="rounded-full bg-surface px-2.5 py-0.5 text-xs font-medium">{strings.kinds[dossier.kind]}</span>
                    {dossier.urgency === "urgent" ? (
                      <span className="rounded-full bg-danger-soft px-2.5 py-0.5 text-xs font-medium text-danger">{t.urgent}</span>
                    ) : null}
                    {t.submittedOn} {formatDate(dossier.created_at, locale)}
                  </p>
                </div>
                <span className="shrink-0 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-text-muted">
                  {STATUS_LABELS[locale][dossier.status]}
                </span>
              </div>

              {dossier.status !== "traite" && dossier.due_at ? (
                <p className="mt-4 text-sm text-text-muted">
                  {overdue ? strings.dash.overdueNote : `${t.dueBy} ${formatDate(dossier.due_at, locale)}`}
                </p>
              ) : null}
              {dossier.status === "attente_client" ? <Notice tone="info">{t.waitingNote}</Notice> : null}
              {dossier.status === "traite" ? <Notice tone="info">{t.closedNote}</Notice> : null}
              {sent === "1" ? <Notice tone="success">{t.sent}</Notice> : null}
              {error === "empty" ? <Notice tone="error">{t.errorReply}</Notice> : null}
              {error === "file" ? <Notice tone="error">{t.errorFile}</Notice> : null}

              <div className="mt-8 rounded-2xl border border-border bg-surface p-5">
                <p className="text-xs font-medium uppercase tracking-[0.1em] text-text-muted">{t.yourRequest}</p>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-text">{dossier.description}</p>
                <Files files={parseAttachments(dossier.attachments)} label={t.attachments} />
              </div>

              <h2 className="mt-10 text-[18px] font-semibold tracking-[-0.02em] text-text">{t.conversation}</h2>
              {messages.length === 0 ? (
                <p className="mt-3 text-sm text-text-muted">{t.noMessages}</p>
              ) : (
                <div className="mt-4 flex flex-col gap-3">
                  {messages.map((message) => {
                    const mine = message.author_role === "client";
                    return (
                      <div
                        key={message.id}
                        className={`rounded-2xl border px-5 py-4 ${mine ? "border-border bg-bg" : "border-text/15 bg-surface"}`}
                      >
                        <p className="flex items-center justify-between gap-3 text-xs text-text-muted">
                          <span className="font-semibold text-text">{mine ? t.you : t.team}</span>
                          <span>{formatDateTime(message.created_at, locale)}</span>
                        </p>
                        <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-text">{message.body}</p>
                        <Files files={parseAttachments(message.attachments)} />
                      </div>
                    );
                  })}
                </div>
              )}

              <form
                action={replyToDossier.bind(null, locale, dossier.id)}
                encType="multipart/form-data"
                className="mt-8 flex flex-col gap-4 border-t border-border pt-8"
              >
                <div>
                  <label htmlFor="body" className={LABEL}>
                    {t.replyLabel}
                  </label>
                  <textarea
                    id="body"
                    name="body"
                    rows={5}
                    maxLength={10000}
                    placeholder={t.replyPlaceholder}
                    className={`${INPUT} resize-y leading-relaxed`}
                  />
                </div>
                <div>
                  <label htmlFor="attachments" className={LABEL}>
                    {t.replyAttach}
                  </label>
                  <input
                    id="attachments"
                    name="attachments"
                    type="file"
                    multiple
                    className="mt-2 w-full rounded-xl border border-dashed border-border bg-surface px-4 py-3 text-sm text-text-muted file:mr-4 file:rounded-full file:border-0 file:bg-text file:px-4 file:py-2 file:text-xs file:font-medium file:text-bg"
                  />
                </div>
                <SubmitButton className="self-start">{t.replyCta}</SubmitButton>
              </form>
            </Reveal>
          </Container>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
