import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import { Container, PrimaryButton } from "@/components/site/ui";
import { Notice } from "@/components/account/ui";
import { isLocale, DEFAULT_LOCALE, type Locale } from "@/i18n/config";
import { BCE_NUMBER } from "@/lib/account/legal";
import { pageMetadata } from "@/lib/seo";
import { LEAD_STRINGS } from "@/lib/account/lead-strings";
import LeadForm from "@/components/site/LeadForm";

const CONTACT_DESCRIPTION: Record<Locale, string> = {
  fr: "Laissez vos coordonnées : nous vous rappelons pour répondre à vos questions sur l'abonnement juridique PME. Gratuit et sans engagement.",
  de: "Hinterlassen Sie Ihre Kontaktdaten: Wir rufen Sie zurück und beantworten Ihre Fragen zum KMU-Rechtsabo. Kostenlos und unverbindlich.",
  en: "Leave your details: we'll call you back to answer your questions about the SME legal subscription. Free, no commitment.",
  it: "Lasciate i vostri recapiti: vi richiamiamo per rispondere alle domande sull'abbonamento legale per PMI. Gratuito e senza impegno.",
};

const CONTACT_INFO: Record<string, (bce: string) => string> = {
  fr: (bce) => `Vous pouvez aussi nous écrire à hey@thrax-legal.ch : nous répondons en principe sous un jour ouvré, en français, en allemand, en anglais ou en italien. Thrax Legal est exploité par Grégoire Giuliano (entreprise belge n° ${bce}), Avenue Floréal 20, 1410 Waterloo, Belgique. Nous ne sommes pas un cabinet d'avocats et ne représentons pas nos clients devant les tribunaux.`,
  de: (bce) => `Sie können uns auch an hey@thrax-legal.ch schreiben: Wir antworten in der Regel innert eines Arbeitstags, auf Französisch, Deutsch, Englisch oder Italienisch. Thrax Legal wird von Grégoire Giuliano betrieben (belgisches Unternehmen Nr. ${bce}), Avenue Floréal 20, 1410 Waterloo, Belgien. Wir sind keine Anwaltskanzlei und vertreten unsere Kundschaft nicht vor Gericht.`,
  en: (bce) => `You can also write to us at hey@thrax-legal.ch: we usually reply within one working day, in French, German, English or Italian. Thrax Legal is operated by Grégoire Giuliano (Belgian business no. ${bce}), Avenue Floréal 20, 1410 Waterloo, Belgium. We are not a law firm and do not represent our clients before courts.`,
  it: (bce) => `Potete anche scriverci a hey@thrax-legal.ch: rispondiamo di regola entro un giorno lavorativo, in francese, tedesco, inglese o italiano. Thrax Legal è gestito da Grégoire Giuliano (impresa belga n. ${bce}), Avenue Floréal 20, 1410 Waterloo, Belgio. Non siamo uno studio legale e non rappresentiamo i nostri clienti davanti ai tribunali.`,
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

              <p className="mt-6 text-sm leading-relaxed text-text-muted">{CONTACT_INFO[locale](BCE_NUMBER)}</p>

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
