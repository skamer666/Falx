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
import { login } from "./actions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  return { title: ACCOUNT_STRINGS[locale].login.metaTitle, robots: { index: false, follow: false } };
}

export default async function ComptePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ error?: string; email?: string; notice?: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const { error, email, notice } = await searchParams;
  const t = ACCOUNT_STRINGS[locale].login;

  const errorMessage = error && error in t.errors ? t.errors[error as keyof typeof t.errors] : null;
  const noticeMessage = notice === "reset" ? t.notices.reset : notice === "signout" ? t.notices.signout : null;
  const blockedByPayment = error === "pending" || error === "expired" || error === "paused" || error === "cancelled";

  return (
    <>
      <Nav />
      <main className="bg-bg text-text">
        <section className="theme-light flex min-h-screen items-center border-b border-border bg-bg pb-16 pt-32 md:pt-40">
          <Container className="mx-auto max-w-sm">
            <Reveal>
              <h1 className="text-[2rem] font-semibold leading-[1.15] tracking-[-0.02em] text-text">{t.heading}</h1>
              <p className="mt-3 text-base leading-relaxed text-text-muted">{t.subheading}</p>

              {noticeMessage ? <Notice tone="success">{noticeMessage}</Notice> : null}
              {errorMessage ? <Notice tone={blockedByPayment ? "info" : "error"}>{errorMessage}</Notice> : null}

              <form action={login.bind(null, locale)} className="mt-8 flex flex-col gap-4">
                <div>
                  <label htmlFor="email" className={LABEL}>
                    {t.emailLabel}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="username"
                    defaultValue={email}
                    placeholder={t.emailPlaceholder}
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
                    autoComplete="current-password"
                    className={INPUT}
                  />
                </div>
                <SubmitButton className="mt-2 w-full">{t.cta}</SubmitButton>
              </form>

              <p className="mt-5 text-sm">
                <Link href={`/${locale}/compte/mot-de-passe-oublie`} className="text-text-muted underline underline-offset-4 hover:text-text">
                  {t.forgot}
                </Link>
              </p>
              <p className="mt-6 border-t border-border pt-6 text-sm text-text-muted">
                {t.noAccount}{" "}
                <Link href={`/${locale}/compte/inscription`} className="font-medium text-text underline underline-offset-4">
                  {t.createAccount}
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
