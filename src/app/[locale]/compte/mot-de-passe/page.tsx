import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import { Container, PrimaryButton } from "@/components/site/ui";
import SubmitButton from "@/components/account/SubmitButton";
import { INPUT, LABEL, Notice } from "@/components/account/ui";
import { isLocale, DEFAULT_LOCALE } from "@/i18n/config";
import { peekPasswordToken } from "@/lib/account/db";
import { sha256Hex } from "@/lib/account/password";
import { ACCOUNT_STRINGS } from "@/lib/account/strings";
import { setPasswordFromToken } from "../actions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  return {
    title: ACCOUNT_STRINGS[locale].reset.metaTitle,
    robots: { index: false, follow: false },
    referrer: "no-referrer",
  };
}

export default async function ResetPasswordPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ token?: string; error?: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const { token, error } = await searchParams;
  const strings = ACCOUNT_STRINGS[locale];
  const t = strings.reset;

  const userId = token ? await peekPasswordToken(await sha256Hex(token)) : null;
  if (!token || !userId) {
    return (
      <>
        <Nav />
        <main className="bg-bg text-text">
          <section className="theme-light flex min-h-screen items-center border-b border-border bg-bg pb-16 pt-32 md:pt-40">
            <Container className="mx-auto max-w-sm text-center">
              <Reveal>
                <h1 className="text-[2rem] font-semibold leading-[1.15] tracking-[-0.02em] text-text">{t.invalidHeading}</h1>
                <p className="mt-3 text-base leading-relaxed text-text-muted">{t.invalidBody}</p>
                <PrimaryButton href={`/${locale}/compte/mot-de-passe-oublie`} className="mt-8 px-6 py-3">
                  {t.requestNew}
                </PrimaryButton>
              </Reveal>
            </Container>
          </section>
        </main>
        <Footer locale={locale} />
      </>
    );
  }

  let errorMessage: string | null = null;
  if (error === "mismatch") errorMessage = t.mismatch;
  else if (error?.startsWith("password_")) {
    const key = error.slice("password_".length) as keyof typeof strings.passwordProblems;
    errorMessage = strings.passwordProblems[key] ?? null;
  }

  return (
    <>
      <Nav />
      <main className="bg-bg text-text">
        <section className="theme-light flex min-h-screen items-center border-b border-border bg-bg pb-16 pt-32 md:pt-40">
          <Container className="mx-auto max-w-sm">
            <Reveal>
              <h1 className="text-[2rem] font-semibold leading-[1.15] tracking-[-0.02em] text-text">{t.heading}</h1>
              <p className="mt-3 text-base leading-relaxed text-text-muted">{t.subheading}</p>

              {errorMessage ? <Notice tone="error">{errorMessage}</Notice> : null}

              <form action={setPasswordFromToken.bind(null, locale, token)} className="mt-8 flex flex-col gap-4">
                <div>
                  <label htmlFor="password" className={LABEL}>
                    {t.passwordLabel}
                  </label>
                  <input id="password" name="password" type="password" required minLength={8} autoComplete="new-password" className={INPUT} />
                </div>
                <div>
                  <label htmlFor="confirm" className={LABEL}>
                    {t.confirmLabel}
                  </label>
                  <input id="confirm" name="confirm" type="password" required minLength={8} autoComplete="new-password" className={INPUT} />
                </div>
                <SubmitButton className="mt-2 w-full">{t.cta}</SubmitButton>
              </form>
              <p className="mt-6 text-sm">
                <Link href={`/${locale}/compte`} className="text-text-muted underline underline-offset-4 hover:text-text">
                  {strings.check.back}
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
