import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import { Container, PrimaryButton } from "@/components/site/ui";
import { Notice } from "@/components/account/ui";
import { isLocale, DEFAULT_LOCALE } from "@/i18n/config";
import { LEAD_STRINGS } from "@/lib/account/lead-strings";
import LeadForm from "@/components/site/LeadForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  return {
    title: LEAD_STRINGS[locale].metaTitle,
    alternates: { canonical: `/${locale}/contact` },
  };
}

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ sent?: string; error?: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const { sent, error } = await searchParams;
  const t = LEAD_STRINGS[locale];

  if (sent === "1") {
    return (
      <>
        <Nav />
        <main className="bg-bg text-text">
          <section className="theme-light flex min-h-screen items-center border-b border-border bg-bg pb-16 pt-32 md:pt-40">
            <Container className="mx-auto max-w-sm text-center">
              <Reveal>
                <h1 className="text-[2rem] font-semibold leading-[1.15] tracking-[-0.02em] text-text">{t.sentHeading}</h1>
                <p className="mt-3 text-base leading-relaxed text-text-muted">{t.sentBody}</p>
                <PrimaryButton href={`/${locale}`} className="mt-8 px-6 py-3">
                  {t.backHome}
                </PrimaryButton>
              </Reveal>
            </Container>
          </section>
        </main>
        <Footer locale={locale} />
      </>
    );
  }

  const errorMessage =
    error === "generic" ? t.errorGeneric : error === "consent" ? t.errorConsent : error === "throttled" ? t.errorThrottled : null;

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

              <LeadForm locale={locale} className="mt-8" />

              <p className="mt-6 border-t border-border pt-6 text-sm text-text-muted">
                {t.alternative}{" "}
                <Link href={`/${locale}/compte/inscription`} className="font-medium text-text underline underline-offset-4">
                  {t.alternativeCta}
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
