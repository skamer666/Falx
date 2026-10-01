import type { Metadata } from "next";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import JsonLd from "@/components/site/JsonLd";
import { CallbackBand, CompareBlock, HowItWorks, HubFaq, HubHero } from "@/components/site/services/blocks";
import { isLocale, DEFAULT_LOCALE } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { SERVICES_UI } from "@/lib/services/strings";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const t = SERVICES_UI[locale].hub.particuliers;
  return pageMetadata({ locale, path: "/particuliers", title: t.metaTitle, description: t.metaDescription });
}

export default async function ParticuliersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const ui = SERVICES_UI[locale];
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ui.hubFaq.particuliers.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
  };
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <Nav />
      <main className="bg-bg text-text">
        <HubHero locale={locale} audience="particuliers" />
        <HowItWorks locale={locale} />
        <CompareBlock locale={locale} />
        <HubFaq locale={locale} audience="particuliers" />
        <CallbackBand locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
