import type { Metadata } from "next";
import Link from "next/link";
import { currentTime } from "@/lib/account/model";
import Reveal from "@/components/Reveal";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import SignInPrompt from "@/components/site/SignInPrompt";
import AccessBlocked from "@/components/site/AccessBlocked";
import SubmitButton from "@/components/account/SubmitButton";
import { Container, PrimaryButton } from "@/components/site/ui";
import { isLocale, DEFAULT_LOCALE } from "@/i18n/config";
import { getClientGate } from "@/lib/account/session";
import { listDossiers, getUsageThisCycle, PLAN_QUOTAS, QUESTION_QUOTAS } from "@/lib/account/db";
import { CATEGORY_LABELS, STATUS_LABELS, type DossierCategory } from "@/lib/account/categories";
import { formatDate } from "@/lib/account/format";
import { ACCOUNT_STRINGS, PLAN_LABEL } from "@/lib/account/strings";
import { logout } from "../actions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  return { title: ACCOUNT_STRINGS[locale].dash.metaTitle, robots: { index: false, follow: false } };
}

function Quota({ label, text, used, total, note }: { label: string; text: string; used: number; total: number; note: string | null }) {
  const pct = Math.min(100, Math.round((used / total) * 100));
  return (
    <div className="rounded-2xl border border-border bg-bg p-6">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-text">{label}</p>
        <p className="text-sm text-text-muted">{text}</p>
      </div>
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-border">
        <div className="h-full rounded-full bg-text transition-[width]" style={{ width: `${pct}%` }} />
      </div>
      {note ? <p className="mt-3 text-xs text-text-muted">{note}</p> : null}
    </div>
  );
}

export default async function TableauDeBordPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ soumis?: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const { soumis } = await searchParams;
  const t = ACCOUNT_STRINGS[locale].dash;

  const gate = await getClientGate();
  if (gate.kind === "anonymous") return <SignInPrompt locale={locale} />;
  if (gate.kind === "blocked") return <AccessBlocked locale={locale} state={gate.state} name={gate.user.name} />;
  const user = gate.user;

  const [dossiers, usage] = await Promise.all([listDossiers(user.id), getUsageThisCycle(user.id)]);
  const dossierQuota = PLAN_QUOTAS[user.plan];
  const questionQuota = QUESTION_QUOTAS[user.plan];
  const now = currentTime();
  const renewalSoon = !user.is_admin && user.paid_until !== null && user.paid_until - now < 7 * 86_400_000;

  return (
    <>
      <Nav />
      <main className="bg-bg text-text">
        <section className="theme-light border-b border-border bg-bg pb-12 pt-32 md:pt-40">
          <Container className="mx-auto max-w-3xl!">
            <Reveal>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-[2rem] font-semibold leading-[1.15] tracking-[-0.02em] text-text">
                    {t.greeting}, {user.name.split(" ")[0]}
                  </h1>
                  <p className="mt-2 text-sm text-text-muted">
                    {t.plan} : <span className="font-medium text-text">{PLAN_LABEL[locale][user.plan]}</span>
                    {user.paid_until && !user.is_admin ? (
                      <>
                        {" · "}
                        {t.validUntil} <span className="font-medium text-text">{formatDate(user.paid_until, locale)}</span>
                      </>
                    ) : null}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/${locale}/compte/parametres`}
                    className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-text transition-colors duration-200 hover:bg-surface"
                  >
                    {t.settings}
                  </Link>
                  <form action={logout.bind(null, locale)}>
                    <SubmitButton variant="ghost" className="!rounded-lg !px-5 !py-2.5">
                      {t.logout}
                    </SubmitButton>
                  </form>
                </div>
              </div>

              {soumis === "1" ? (
                <p className="mt-6 rounded-xl border border-success/30 bg-success-soft px-4 py-3 text-sm text-text">{t.successBanner}</p>
              ) : null}
              {renewalSoon && user.paid_until ? (
                <p className="mt-6 rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-muted">
                  {t.renewalBanner(formatDate(user.paid_until, locale))}
                </p>
              ) : null}
            </Reveal>
          </Container>
        </section>

        <section className="theme-light bg-surface py-10">
          <Container className="mx-auto max-w-3xl!">
            <Reveal>
              <div className="grid gap-4 sm:grid-cols-2">
                <Quota
                  label={t.dossiersQuota}
                  text={t.used(usage.dossiers, dossierQuota)}
                  used={usage.dossiers}
                  total={dossierQuota}
                  note={usage.dossiers > dossierQuota ? t.overDossiers : null}
                />
                <Quota
                  label={t.questionsQuota}
                  text={t.used(usage.questions, questionQuota)}
                  used={usage.questions}
                  total={questionQuota}
                  note={usage.questions > questionQuota ? t.overQuestions : null}
                />
              </div>
              <div className="mt-6 flex justify-center sm:justify-start">
                <PrimaryButton href={`/${locale}/compte/nouveau-dossier`} className="px-6 py-3">
                  {t.newRequest}
                </PrimaryButton>
              </div>
            </Reveal>
          </Container>
        </section>

        <section className="theme-light bg-bg py-12 md:py-16">
          <Container className="mx-auto max-w-3xl!">
            <Reveal>
              <h2 className="text-[20px] font-semibold leading-[1.2] tracking-[-0.02em] text-text">{t.requestsHeading}</h2>

              {dossiers.length === 0 ? (
                <div className="mt-6 rounded-2xl border border-dashed border-border p-10 text-center">
                  <p className="text-sm text-text-muted">{t.empty}</p>
                  <PrimaryButton href={`/${locale}/compte/nouveau-dossier`} className="mt-5 px-6 py-3">
                    {t.emptyCta}
                  </PrimaryButton>
                </div>
              ) : (
                <div className="mt-6 divide-y divide-border border-t border-border">
                  {dossiers.map((dossier) => {
                    const overdue = dossier.status !== "traite" && dossier.due_at !== null && dossier.due_at < now;
                    return (
                      <Link
                        key={dossier.id}
                        href={`/${locale}/compte/dossier/${dossier.id}`}
                        className="flex flex-wrap items-center justify-between gap-3 py-4 transition-colors hover:bg-surface/60"
                      >
                        <div className="min-w-0">
                          <p className="flex flex-wrap items-center gap-2 text-sm font-semibold text-text">
                            {CATEGORY_LABELS[locale][dossier.category as DossierCategory] ?? dossier.category}
                            <span className="rounded-full bg-surface px-2 py-0.5 text-[11px] font-medium text-text-muted">
                              {ACCOUNT_STRINGS[locale].kinds[dossier.kind]}
                            </span>
                            {dossier.client_unread ? (
                              <span className="rounded-full bg-text px-2 py-0.5 text-[11px] font-medium text-bg">{t.newReply}</span>
                            ) : null}
                          </p>
                          <p className="mt-1 truncate text-xs text-text-muted">
                            {formatDate(dossier.created_at, locale)}
                            {dossier.status !== "traite" && dossier.due_at ? (
                              <>
                                {" · "}
                                {overdue ? t.overdueNote : `${t.dueBy} ${formatDate(dossier.due_at, locale)}`}
                              </>
                            ) : null}
                          </p>
                        </div>
                        <span className="shrink-0 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-text-muted">
                          {STATUS_LABELS[locale][dossier.status]}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </Reveal>
          </Container>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
