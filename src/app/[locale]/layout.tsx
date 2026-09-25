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
  fr: "Conformité nLPD pour PME suisses, dès 590 CHF | Thrax Legal",
  de: "DSG-Konformität für Schweizer KMU, ab 590 CHF | Thrax Legal",
  en: "Swiss FADP compliance for SMEs, from CHF 590 | Thrax Legal",
};

const DESCRIPTIONS: Record<Locale, string> = {
  fr: "Thrax Legal met votre PME en conformité avec la nLPD révisée : registre des traitements, politique de confidentialité, contrats de sous-traitance. Prix fixe, sans avocat, sans rendez-vous.",
  de: "Thrax Legal bringt Ihr KMU in Einklang mit dem revidierten Datenschutzgesetz (DSG): Verarbeitungsverzeichnis, Datenschutzerklärung, Auftragsverarbeitungsverträge. Fixpreis, ohne Anwalt, ohne Termin.",
  en: "Thrax Legal brings your SME into compliance with the revised Swiss Federal Act on Data Protection (FADP): records of processing, privacy policy, data processing agreements. Fixed price, no lawyer, no appointment.",
};

const OG_LOCALE: Record<Locale, string> = {
  fr: "fr_CH",
  de: "de_CH",
  en: "en_CH",
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
      "@type": "Country",
      name: "Switzerland",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "CH",
    },
    priceRange: "CHF 590 - CHF 79/mo",
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
