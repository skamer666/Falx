export const LOCALES = ["fr", "de", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "fr";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export const LOCALE_LABELS: Record<Locale, string> = {
  fr: "FR",
  de: "DE",
  en: "EN",
};

/** BCP47 locale utilisé pour lang="" et les métadonnées OpenGraph. */
export const LOCALE_TAGS: Record<Locale, string> = {
  fr: "fr-CH",
  de: "de-CH",
  en: "en-CH",
};
