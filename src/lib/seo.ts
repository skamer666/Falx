import type { Metadata } from "next";
import { LOCALES, LOCALE_TAGS, type Locale } from "@/i18n/config";
import { SITE_URL } from "@/lib/site";

const OG_LOCALE: Record<Locale, string> = { fr: "fr_CH", de: "de_CH", en: "en_CH", it: "it_CH" };
const BRAND = " | Thrax Legal";
const MAX_TITLE = 65;

/** URL canonique + versions linguistiques (hreflang), avec le français comme version par défaut. */
export function localeAlternates(locale: Locale, path = ""): NonNullable<Metadata["alternates"]> {
  return {
    canonical: `/${locale}${path}`,
    languages: {
      ...Object.fromEntries(LOCALES.map((l) => [LOCALE_TAGS[l], `${SITE_URL}/${l}${path}`])),
      "x-default": `${SITE_URL}/fr${path}`,
    },
  };
}

/** Titre de page limité à ~65 caractères pour ne pas être tronqué dans Google. */
export function seoTitle(title: string): string {
  if ((title + BRAND).length <= MAX_TITLE) return title + BRAND;
  if (title.length <= MAX_TITLE) return title;
  const head = title.split(/\s?:\s/)[0];
  return (head + BRAND).length <= MAX_TITLE ? head + BRAND : head.slice(0, MAX_TITLE);
}

/** Métadonnées complètes d'une page indexable : titre, description, hreflang, Open Graph, Twitter. */
export function pageMetadata(input: { locale: Locale; path: string; title: string; description: string }): Metadata {
  const { locale, path, title, description } = input;
  return {
    title: { absolute: title },
    description,
    alternates: localeAlternates(locale, path),
    openGraph: { title, description, type: "website", locale: OG_LOCALE[locale], url: `${SITE_URL}/${locale}${path}`, siteName: "Thrax Legal" },
    twitter: { card: "summary_large_image", title, description },
  };
}
