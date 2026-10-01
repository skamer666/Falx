import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import { Container, PrimaryButton } from "@/components/site/ui";
import { Notice } from "@/components/account/ui";
import { isLocale, DEFAULT_LOCALE, type Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { LEAD_STRINGS } from "@/lib/account/lead-strings";
import LeadForm from "@/components/site/LeadForm";

const CONTACT_DESCRIPTION: Record<Locale, string> = {
  fr: "Laissez vos coordonnées : nous vous rappelons pour répondre à vos questions sur l'abonnement juridique PME. Gratuit et sans engagement.",
  de: "Hinterlassen Sie Ihre Kontaktdaten: Wir rufen Sie zurück und beantworten Ihre Fragen zum KMU-Rechtsabo. Kostenlos und unverbindlich.",
  en: "Leave your details: we'll call you back to answer your questions about the SME legal subscription. Free, no commitment.",
  it: "Lasciate i vostri recapiti: vi richiamiamo per rispondere alle domande sull'abbonamento legale per PMI. Gratuito e senza impegno.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  return pageMetadata({ locale, path: "/contact", title: LEAD_STRINGS[locale].metaTitle, description: CONTACT_DESCRIPTION[locale] });
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
