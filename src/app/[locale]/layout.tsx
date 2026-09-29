import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Schibsted_Grotesk } from "next/font/google";
import JsonLd from "@/components/site/JsonLd";
import { LOCALES, LOCALE_TAGS, isLocale, type Locale } from "@/i18n/config";
import { SITE_URL } from "@/lib/site";
import "../globals.css";

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  display: "swap",
});

const TITLES: Record<Locale, string> = {
  fr: "Abonnement juridique PME en Suisse romande, dès 49 CHF/mois | Thrax Legal",
  de: "KMU-Rechtsabo in der Westschweiz, ab CHF 49/Monat | Thrax Legal",
  en: "SME legal subscription in French-speaking Switzerland, from CHF 49/month | Thrax Legal",
  it: "Abbonamento legale per PMI nella Svizzera romanda, da CHF 49/mese | Thrax Legal",
};

const DESCRIPTIONS: Record<Locale, string> = {
  fr: "Thrax Legal répond par écrit aux questions juridiques des indépendants et PME de Suisse romande (contrats, CGV, droit du travail, nLPD). Prix fixe mensuel dès 49 CHF, sans engagement, réponse sous 48-72h.",
  de: "Thrax Legal beantwortet schriftlich die Rechtsfragen von Selbstständigen und KMU in der Westschweiz (Verträge, AGB, Arbeitsrecht, DSG). Fixer Monatspreis ab CHF 49, ohne Vertragsbindung, Antwort innert 48-72h.",
  en: "Thrax Legal answers in writing the legal questions of independents and SMEs in French-speaking Switzerland (contracts, T&Cs, employment law, FADP). Fixed monthly price from CHF 49, no commitment, answer within 48-72h.",
  it: "Thrax Legal risponde per iscritto alle domande legali di indipendenti e PMI della Svizzera romanda (contratti, condizioni generali, diritto del lavoro, nLPD). Prezzo fisso mensile da CHF 49, senza impegno, risposta entro 48-72h.",
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
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(
        LOCALES.map((l) => [LOCALE_TAGS[l], `${SITE_URL}/${l}`]),
      ),
    },
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
    address: {
      "@type": "PostalAddress",
      addressCountry: "CH",
    },
    priceRange: "CHF 49 - CHF 119 / mois",
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
        {children}
      </body>
    </html>
  );
}
