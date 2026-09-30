import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import { Container } from "@/components/site/ui";
import SubmitButton from "@/components/account/SubmitButton";
import { INPUT, LABEL, Notice } from "@/components/account/ui";
import { isLocale, DEFAULT_LOCALE } from "@/i18n/config";
import { ACCOUNT_STRINGS } from "@/lib/account/strings";
import { createAccount } from "../actions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  return { title: ACCOUNT_STRINGS[locale].signup.metaTitle, robots: { index: false, follow: false } };
}

export default async function InscriptionPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ email?: string; name?: string; plan?: string; error?: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const { email, name, plan, error } = await searchParams;
  const strings = ACCOUNT_STRINGS[locale];
  const t = strings.signup;

  let errorMessage: string | null = null;
  if (error === "email" || error === "name" || error === "terms" || error === "ai") errorMessage = t.errors[error];
  else if (error?.startsWith("password_")) {
    const key = error.slice("password_".length) as keyof typeof strings.passwordProblems;
    errorMessage = strings.passwordProblems[key] ?? null;
  }

  return (
    <>
      <Nav />
      <main className="bg-bg text-text">
        <section className="theme-light border-b border-border bg-bg pb-16 pt-32 md:pt-40">
          <Container className="mx-auto max-w-md">
            <Reveal>
              <h1 className="text-[2rem] font-semibold leading-[1.15] tracking-[-0.02em] text-text">{t.heading}</h1>
              <p className="mt-3 text-base leading-relaxed text-text-muted">{t.subheading}</p>

              {errorMessage ? <Notice tone="error">{errorMessage}</Notice> : null}

              <form action={createAccount.bind(null, locale)} className="mt-8 flex flex-col gap-5">
                <div>
                  <label htmlFor="email" className={LABEL}>
                    {t.emailLabel}
                  </label>
                  <input id="email" name="email" type="email" required autoComplete="email" defaultValue={email} className={INPUT} />
                </div>
                <div>
                  <label htmlFor="name" className={LABEL}>
                    {t.nameLabel}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    minLength={2}
                    autoComplete="name"
                    defaultValue={name}
                    placeholder={t.namePlaceholder}
                    className={INPUT}
                  />
                </div>
                <div>
                  <label htmlFor="company" className={LABEL}>
                    {t.companyLabel}
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    placeholder={t.companyPlaceholder}
                    className={INPUT}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className={LABEL}>
                    {t.phoneLabel}
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder={t.phonePlaceholder}
                    className={INPUT}
                  />
                </div>
                <div>
                  <label htmlFor="password" className={LABEL}>
                    {t.passwordLabel}
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    minLength={8}
                    autoComplete="new-password"
                    className={INPUT}
                  />
                  <p className="mt-2 text-xs text-text-muted">{t.passwordHint}</p>
                </div>

                <fieldset>
                  <legend className={LABEL}>{t.planLabel}</legend>
                  <div className="mt-3 grid gap-3">
                    <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-border bg-surface px-4 py-3 has-checked:border-text">
                      <span>
                        <span className="block text-sm font-semibold text-text">{t.planEssentiel}</span>
                        <span className="block text-xs text-text-muted">{t.planEssentielNote}</span>
                      </span>
                      <input type="radio" name="plan" value="essentiel" defaultChecked={plan !== "croissance"} className="h-4 w-4 accent-text" />
                    </label>
                    <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-border bg-surface px-4 py-3 has-checked:border-text">
                      <span>
                        <span className="block text-sm font-semibold text-text">{t.planCroissance}</span>
                        <span className="block text-xs text-text-muted">{t.planCroissanceNote}</span>
                      </span>
                      <input type="radio" name="plan" value="croissance" defaultChecked={plan === "croissance"} className="h-4 w-4 accent-text" />
                    </label>
                  </div>
                </fieldset>

                <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-text-muted">
                  <input type="checkbox" name="terms" required className="mt-1 h-4 w-4 shrink-0 accent-text" />
                  <span>
                    {t.termsBefore}
                    <Link href={`/${locale}/conditions-generales`} target="_blank" className="text-text underline underline-offset-4">
                      {t.termsCgv}
                    </Link>
                    {t.termsMiddle}
                    <Link href={`/${locale}/confidentialite`} target="_blank" className="text-text underline underline-offset-4">
                      {t.termsPrivacy}
                    </Link>
                    {t.termsAfter}
                  </span>
                </label>

                <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-text-muted">
                  <input type="checkbox" name="ai_consent" required className="mt-1 h-4 w-4 shrink-0 accent-text" />
                  <span>
                    {t.aiLabel}
                    <span className="mt-1 block text-xs">{t.aiHelp}</span>
                  </span>
                </label>

                <p className="rounded-xl border border-border bg-surface px-4 py-3 text-xs leading-relaxed text-text-muted">
                  {t.activationNote}
                </p>

                <SubmitButton className="w-full">{t.cta}</SubmitButton>
              </form>

              <p className="mt-6 border-t border-border pt-6 text-sm text-text-muted">
                {t.haveAccount}{" "}
                <Link href={`/${locale}/compte`} className="font-medium text-text underline underline-offset-4">
                  {t.signIn}
                </Link>
              </p>
            </Reveal>
          </Container>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
