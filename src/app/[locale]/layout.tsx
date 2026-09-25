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
  fr: "Contestez votre amende en Suisse, 89 CHF | Thrax Legal",
  de: "Fechten Sie Ihre Busse in der Schweiz an, CHF 89 | Thrax Legal",
  en: "Contest your Swiss fine, CHF 89 | Thrax Legal",
  it: "Contestate la vostra multa in Svizzera, CHF 89 | Thrax Legal",
};

const DESCRIPTIONS: Record<Locale, string> = {
  fr: "Thrax Legal évalue vos chances de contester une amende suisse (excès de vitesse, stationnement, CFF, retrait de permis) et prépare votre lettre d'opposition. Prix fixe 89 CHF, sans avocat, sous 48h.",
  de: "Thrax Legal beurteilt Ihre Chancen, eine Schweizer Busse anzufechten (Geschwindigkeit, Parkieren, SBB, Führerausweis) und bereitet Ihre Einsprache vor. Fixpreis CHF 89, ohne Anwalt, innert 48 Stunden.",
  en: "Thrax Legal assesses your chances of contesting a Swiss fine (speeding, parking, SBB/CFF, licence withdrawal) and prepares your objection letter. Fixed price CHF 89, no lawyer, within 48 hours.",
  it: "Thrax Legal valuta le vostre possibilità di contestare una multa svizzera (velocità, parcheggio, FFS, ritiro della licenza) e prepara la vostra lettera di opposizione. Prezzo fisso CHF 89, senza avvocato, entro 48 ore.",
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
      "@type": "Country",
      name: "Switzerland",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "CH",
    },
    priceRange: "CHF 89",
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
