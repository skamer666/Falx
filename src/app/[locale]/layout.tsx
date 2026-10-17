import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Schibsted_Grotesk } from "next/font/google";
import JsonLd from "@/components/site/JsonLd";
import SourceTracker from "@/components/site/SourceTracker";
import PageViewTracker from "@/components/site/PageViewTracker";
import ConsentBanner from "@/components/site/ConsentBanner";
import { LOCALES, LOCALE_TAGS, isLocale, type Locale } from "@/i18n/config";
import { ORG_ID, SITE_URL, WEBSITE_ID, YOUTUBE_CHANNEL_URL } from "@/lib/site";
import { localeAlternates } from "@/lib/seo";
import "../globals.css";

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  display: "swap",
});

const TITLES: Record<Locale, string> = {
  fr: "Thrax Legal | Le juridique à prix fixe, Suisse romande",
  de: "Thrax Legal | Rechtliches zum Fixpreis, Westschweiz",
  en: "Thrax Legal | Fixed-price legal help in Switzerland",
  it: "Thrax Legal | Il giuridico a prezzo fisso in Svizzera",
};

const DESCRIPTIONS: Record<Locale, string> = {
  fr: "Lettres, contrats, litiges, démarches : particuliers et entreprises de Suisse romande, un prix fixe annoncé avant de commencer. Dès 49 CHF.",
  de: "Briefe, Verträge, Streitfälle, Verfahren: für Privatpersonen und Unternehmen in der Westschweiz, Fixpreis vor Beginn. Ab CHF 49.",
  en: "Letters, contracts, disputes, procedures: for individuals and businesses in French-speaking Switzerland, a fixed price before we start. From CHF 49.",
  it: "Lettere, contratti, controversie, pratiche: per privati e imprese della Svizzera romanda, un prezzo fisso prima di iniziare. Da CHF 49.",
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
    "@id": ORG_ID,
    name: "Thrax Legal",
    url: `${SITE_URL}/${locale}`,
    sameAs: [YOUTUBE_CHANNEL_URL],
    description: DESCRIPTIONS[locale],
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Suisse romande",
    },
    email: "hey@thrax-legal.ch",
    logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.png`, width: 512, height: 512 },
    image: `${SITE_URL}/opengraph-image.png`,
    availableLanguage: ["fr", "de", "en", "it"],
    priceRange: "CHF 49 - CHF 890",
  };
}

function websiteJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: "Thrax Legal",
    inLanguage: LOCALES.map((l) => LOCALE_TAGS[l]),
    publisher: { "@id": ORG_ID },
    description: DESCRIPTIONS[locale],
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
        <JsonLd data={websiteJsonLd(locale)} />
        <SourceTracker />
          <PageViewTracker />
          <ConsentBanner locale={locale} />
        {children}
      </body>
    </html>
  );
}
