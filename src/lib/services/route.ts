import type { Metadata } from "next";
import { isLocale, DEFAULT_LOCALE, type Locale } from "@/i18n/config";
import { pageMetadata, seoTitle } from "@/lib/seo";
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

export function serviceMetadata(locale: Locale, service: ServiceDef): Metadata {
  const t = serviceText(locale, service.slug);
  const price = `${priceLabel(locale, service.price, service.from)} ${vatLabel(locale, service.audience)}`;
  let description = `${t.short} ${price}.`;
  if (description.length > 160) description = `${description.slice(0, 157).replace(/\s+\S*$/, "")}…`;
  return pageMetadata({ locale, path: `/${service.audience}/${service.slug}`, title: seoTitle(t.name), description });
}
