import type { Metadata } from "next";
import { isLocale, DEFAULT_LOCALE, type Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { getService, servicesFor, serviceText, type Audience, type ServiceDef } from "./catalog";
import { priceLabel, vatLabel } from "./strings";

/** Logique commune aux routes /particuliers/[slug] et /entreprises/[slug]. */
export function serviceStaticParams(audience: Audience) {
  return servicesFor(audience).map((service) => ({ slug: service.slug }));
}

export function resolveService(rawLocale: string, slug: string, audience: Audience): { locale: Locale; service: ServiceDef | null } {
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const service = getService(slug);
  return { locale, service: service && service.audience === audience ? service : null };
}

const GEO: Record<Locale, string> = { fr: "en Suisse", de: "in der Schweiz", en: "in Switzerland", it: "in Svizzera" };
const GEO_WORD = /suisse|schweiz|switzerland|svizzera|romand|genève|lausanne/i;
const BRAND = " | Thrax Legal";

/** Titre de page : sujet + « Suisse » + prix quand ça tient en 60 caractères, avec la marque si elle rentre. */
export function serviceSeoTitle(locale: Locale, name: string, price: string): string {
  const geo = GEO_WORD.test(name) ? name : `${name} ${GEO[locale]}`;
  const candidates = [`${geo} – ${price}`, geo, `${name} – ${price}`, name];
  const pick = candidates.find((c) => c.length <= 60) ?? name.slice(0, 60);
  return pick.length + BRAND.length <= 60 ? pick + BRAND : pick;
}

export function serviceMetadata(locale: Locale, service: ServiceDef): Metadata {
  const t = serviceText(locale, service.slug);
  const price = `${priceLabel(locale, service.price, service.from)} ${vatLabel(locale, service.audience)}`;
  let description = `${t.short} ${price}.`;
  if (description.length > 160) description = `${description.slice(0, 157).replace(/\s+\S*$/, "")}…`;
  return pageMetadata({ locale, path: `/${service.audience}/${service.slug}`, title: serviceSeoTitle(locale, t.name, priceLabel(locale, service.price, service.from)), description });
}
