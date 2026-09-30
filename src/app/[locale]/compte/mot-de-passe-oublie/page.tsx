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
import { requestPasswordReset } from "../actions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  return { title: ACCOUNT_STRINGS[locale].forgot.metaTitle, robots: { index: false, follow: false } };
}

export default async function ForgotPasswordPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ error?: string; email?: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const { error, email } = await searchParams;
  const strings = ACCOUNT_STRINGS[locale];
  const t = strings.forgot;

  return (
    <>
      <Nav />
      <main className="bg-bg text-text">
        <section className="theme-light flex min-h-screen items-center border-b border-border bg-bg pb-16 pt-32 md:pt-40">
          <Container className="mx-auto max-w-sm">
            <Reveal>
              <h1 className="text-[2rem] font-semibold leading-[1.15] tracking-[-0.02em] text-text">{t.heading}</h1>
              <p className="mt-3 text-base leading-relaxed text-text-muted">{t.subheading}</p>

              {error === "email" ? <Notice tone="error">{t.errorEmail}</Notice> : null}
              {error === "throttled" ? <Notice tone="error">{t.errorThrottled}</Notice> : null}

              <form action={requestPasswordReset.bind(null, locale)} className="mt-8 flex flex-col gap-4">
                <div>
                  <label htmlFor="email" className={LABEL}>
                    {strings.login.emailLabel}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="username"
                    defaultValue={email}
                    placeholder={strings.login.emailPlaceholder}
                    className={INPUT}
                  />
                </div>
                <SubmitButton className="w-full">{t.cta}</SubmitButton>
              </form>

              <p className="mt-6 text-sm">
                <Link href={`/${locale}/compte`} className="text-text-muted underline underline-offset-4 hover:text-text">
                  {t.back}
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
