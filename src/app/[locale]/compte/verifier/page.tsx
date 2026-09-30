import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import { Container } from "@/components/site/ui";
import { isLocale, DEFAULT_LOCALE } from "@/i18n/config";
import { ACCOUNT_STRINGS } from "@/lib/account/strings";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ type?: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const { type } = await searchParams;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const t = ACCOUNT_STRINGS[locale].check;
  return { title: (type === "signup" ? t.signup : t.reset).metaTitle, robots: { index: false, follow: false } };
}

export default async function VerifierPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ email?: string; type?: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const { email, type } = await searchParams;
  const strings = ACCOUNT_STRINGS[locale].check;
  const t = type === "signup" ? strings.signup : strings.reset;

  return (
    <>
      <Nav />
      <main className="bg-bg text-text">
        <section className="theme-light flex min-h-screen items-center border-b border-border bg-bg pb-16 pt-32 md:pt-40">
          <Container className="mx-auto max-w-sm text-center">
            <Reveal>
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-border bg-surface">
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-text">
                  <path
                    d="M3 7l9 6 9-6M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h1 className="mt-6 text-[2rem] font-semibold leading-[1.15] tracking-[-0.02em] text-text">{t.heading}</h1>
              <p className="mt-3 text-base leading-relaxed text-text-muted">
                {t.body} {email ? <strong className="text-text">{email}</strong> : null}
                {type === "signup" ? "." : ","} {type === "signup" ? null : t.note}
              </p>
              {type === "signup" ? <p className="mt-3 text-sm leading-relaxed text-text-muted">{t.note}</p> : null}
              <p className="mt-8 text-sm">
                <Link href={`/${locale}/compte`} className="text-text-muted underline underline-offset-4 hover:text-text">
                  {strings.back}
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
