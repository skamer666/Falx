import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Schibsted_Grotesk } from "next/font/google";
import JsonLd from "@/components/site/JsonLd";
import SourceTracker from "@/components/site/SourceTracker";
import { LOCALES, LOCALE_TAGS, isLocale, type Locale } from "@/i18n/config";
import { SITE_URL } from "@/lib/site";
import { localeAlternates } from "@/lib/seo";
import "../globals.css";

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  display: "swap",
});

const TITLES: Record<Locale, string> = {
  fr: "Abonnement juridique PME, dès 290 CHF/mois | Thrax Legal",
  de: "KMU-Rechtsabo ab CHF 290/Monat | Thrax Legal",
  en: "SME legal subscription from CHF 290/month | Thrax Legal",
  it: "Abbonamento legale PMI da CHF 290/mese | Thrax Legal",
};

const DESCRIPTIONS: Record<Locale, string> = {
  fr: "Juriste externalisé pour indépendants et PME de Suisse romande : contrats, litiges, conformité nLPD. Prix fixe dès 290 CHF/mois, sans engagement.",
  de: "Externer Rechtsberater für Selbstständige und KMU in der Westschweiz: Verträge, Streitfälle, DSG-Konformität. Fixpreis ab CHF 290/Monat, ohne Bindung.",
  en: "Outsourced legal counsel for independents and SMEs in French-speaking Switzerland: contracts, disputes, FADP compliance. From CHF 290/month, no commitment.",
  it: "Giurista esternalizzato per indipendenti e PMI della Svizzera romanda: contratti, controversie, conformità nLPD. Da CHF 290/mese, senza impegno.",
};

const OG_LOCALE: Record<Locale, string> = {
  fr: "fr_CH",
  de: "de_CH",
  en: "en_CH",
  it: "it_CH",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "fr";
  const title = TITLES[locale];
  const description = DESCRIPTIONS[locale];

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: localeAlternates(locale),
    openGraph: {
      title,
      description,
      type: "website",
      locale: OG_LOCALE[locale],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

function organizationJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: "Thrax Legal",
    url: `${SITE_URL}/${locale}`,
    description: DESCRIPTIONS[locale],
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Suisse romande",
    },
    email: "hey@thrax-legal.ch",
    logo: `${SITE_URL}/icon.png`,
    availableLanguage: ["fr", "de", "en", "it"],
    priceRange: "CHF 290 - CHF 690 / mois",
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) {
    notFound();
  }
  const locale = rawLocale;

  return (
    <html lang={LOCALE_TAGS[locale]} className={`${schibstedGrotesk.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-bg text-text">
        <JsonLd data={organizationJsonLd(locale)} />
        <SourceTracker />
        {children}
      </body>
    </html>
  );
}
