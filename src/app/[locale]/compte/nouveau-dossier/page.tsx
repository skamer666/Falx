import type { Metadata } from "next";
import Link from "next/link";
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
import { getQuotaSummary } from "@/lib/account/db";
import { DOSSIER_CATEGORIES, CATEGORY_LABELS } from "@/lib/account/categories";
import { ACCOUNT_STRINGS } from "@/lib/account/strings";
import { submitDossier } from "../actions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  return { title: ACCOUNT_STRINGS[locale].newRequest.metaTitle, robots: { index: false, follow: false } };
}

export default async function NouveauDossierPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ error?: string; kind?: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const { error, kind } = await searchParams;
  const t = ACCOUNT_STRINGS[locale].newRequest;

  const gate = await getClientGate();
  if (gate.kind === "anonymous") return <SignInPrompt locale={locale} />;
  if (gate.kind === "blocked") return <AccessBlocked locale={locale} state={gate.state} name={gate.user.name} />;
  const user = gate.user;

  const quota = await getQuotaSummary(user.id, user.plan);
  const dossiersLeft = Math.max(0, quota.allowance.dossiers - quota.used.dossiers);
  const questionsLeft = Math.max(0, quota.allowance.questions - quota.used.questions);
  const isCroissance = user.plan === "croissance";

  return (
    <>
      <Nav />
      <main className="bg-bg text-text">
        <section className="theme-light border-b border-border bg-bg pb-16 pt-32 md:pt-40">
          <Container className="mx-auto max-w-xl">
            <Reveal>
              <Link
                href={`/${locale}/compte/tableau-de-bord`}
                className="text-sm text-text-muted underline underline-offset-4 hover:text-text"
              >
                ← {t.back}
              </Link>
              <h1 className="mt-6 text-[2rem] font-semibold leading-[1.15] tracking-[-0.02em] text-text">{t.heading}</h1>
              <p className="mt-3 text-base leading-relaxed text-text-muted">{t.subheading}</p>

              {error === "file" ? <Notice tone="error">{t.errorFile}</Notice> : null}
              {error === "1" ? <Notice tone="error">{t.error}</Notice> : null}

              <form
                action={submitDossier.bind(null, locale)}
                encType="multipart/form-data"
                className="mt-8 flex flex-col gap-5"
              >
                <fieldset>
                  <legend className={LABEL}>{t.kindLabel}</legend>
                  <div className="mt-3 grid gap-3">
                    <label className="flex cursor-pointer items-start justify-between gap-3 rounded-xl border border-border bg-surface px-4 py-3 has-checked:border-text">
                      <span>
                        <span className="block text-sm font-semibold text-text">{t.kindQuestionTitle}</span>
                        <span className="block text-xs leading-relaxed text-text-muted">{t.kindQuestionNote}</span>
                        <span className="mt-1 block text-xs font-medium text-text">{t.quotaQuestion(questionsLeft)}</span>
                      </span>
                      <input type="radio" name="kind" value="question" defaultChecked={kind === "question"} className="mt-1 h-4 w-4 accent-text" />
                    </label>
                    <label className="flex cursor-pointer items-start justify-between gap-3 rounded-xl border border-border bg-surface px-4 py-3 has-checked:border-text">
                      <span>
                        <span className="block text-sm font-semibold text-text">{t.kindDossierTitle}</span>
                        <span className="block text-xs leading-relaxed text-text-muted">{t.kindDossierNote}</span>
                        <span className="mt-1 block text-xs font-medium text-text">{t.quotaDossier(dossiersLeft)}</span>
                      </span>
                      <input type="radio" name="kind" value="dossier" defaultChecked={kind !== "question"} className="mt-1 h-4 w-4 accent-text" />
                    </label>
                  </div>
                </fieldset>

                <div>
                  <label htmlFor="category" className={LABEL}>
                    {t.categoryLabel}
                  </label>
                  <select id="category" name="category" required defaultValue="" className={INPUT}>
                    <option value="" disabled>
                      —
                    </option>
                    {DOSSIER_CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {CATEGORY_LABELS[locale][category]}
                      </option>
                    ))}
                  </select>
                </div>

                <fieldset>
                  <legend className={LABEL}>{t.urgencyLabel}</legend>
                  <div className="mt-3 flex flex-col gap-2">
                    <label className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 has-checked:border-text">
                      <input type="radio" name="urgency" value="normal" defaultChecked className="h-4 w-4 accent-text" />
                      <span className="text-sm text-text">{t.urgencyNormal}</span>
                    </label>
                    <label
                      className={`flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 has-checked:border-text ${
                        isCroissance ? "" : "opacity-40"
                      }`}
                    >
                      <input type="radio" name="urgency" value="urgent" disabled={!isCroissance} className="h-4 w-4 accent-text" />
                      <span className="text-sm text-text">{t.urgencyUrgent}</span>
                    </label>
                  </div>
                </fieldset>

                <div>
                  <label htmlFor="description" className={LABEL}>
                    {t.descriptionLabel}
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    minLength={10}
                    rows={8}
                    placeholder={t.descriptionPlaceholder}
                    className={`${INPUT} resize-y leading-relaxed`}
                  />
                </div>

                <div>
                  <label htmlFor="attachments" className={LABEL}>
                    {t.attachmentsLabel}
                  </label>
                  <input
                    id="attachments"
                    name="attachments"
                    type="file"
                    multiple
                    className="mt-2 w-full rounded-xl border border-dashed border-border bg-surface px-4 py-3 text-sm text-text-muted file:mr-4 file:rounded-full file:border-0 file:bg-text file:px-4 file:py-2 file:text-xs file:font-medium file:text-bg"
                  />
                  <p className="mt-2 text-xs text-text-muted">{t.attachmentsNote}</p>
                </div>

                <SubmitButton className="mt-2 w-full">{t.cta}</SubmitButton>
              </form>
            </Reveal>
          </Container>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
