import Link from "next/link";
import { PrimaryButton } from "./ui";
import type { Locale } from "@/i18n/config";
import { SERVICES, servicePath, serviceText } from "@/lib/services/catalog";
import { priceLabel, vatLabel } from "@/lib/services/strings";

const STRINGS: Record<Locale, { title: string; body: string; cta: string; subscription: string }> = {
  fr: {
    title: "On s'en occupe pour vous",
    body: "Un prix fixe, annoncé avant de commencer. Vous ne payez qu'après notre confirmation.",
    cta: "Voir toutes les prestations",
    subscription: "Des besoins réguliers ? Voir l'abonnement",
  },
  de: {
    title: "Wir übernehmen das für Sie",
    body: "Ein Fixpreis, vor Beginn bekannt. Sie zahlen erst nach unserer Bestätigung.",
    cta: "Alle Leistungen ansehen",
    subscription: "Regelmässiger Bedarf? Das Abo ansehen",
  },
  en: {
    title: "We'll handle it for you",
    body: "A fixed price, announced before we start. You only pay after our confirmation.",
    cta: "See all services",
    subscription: "Regular needs? See the subscription",
  },
  it: {
    title: "Ce ne occupiamo noi",
    body: "Un prezzo fisso, annunciato prima di iniziare. Pagate solo dopo la nostra conferma.",
    cta: "Vedere tutte le prestazioni",
    subscription: "Esigenze regolari? Vedere l'abbonamento",
  },
};

/** Encadré de fin d'article : les prestations à prix fixe liées au sujet du guide. */
export default function GuideCta({
  locale,
  articleSlug,
  className = "",
}: {
  locale: Locale;
  articleSlug?: string;
  className?: string;
}) {
  const t = STRINGS[locale];
  const related = articleSlug ? SERVICES.filter((s) => s.guide === articleSlug).slice(0, 3) : [];
  return (
    <div className={`rounded-2xl border border-border bg-surface p-6 md:p-8 ${className}`}>
      <p className="text-lg font-semibold text-text">{t.title}</p>
      <p className="mt-2 text-sm leading-relaxed text-text-muted">{t.body}</p>
      {related.length ? (
        <ul className="mt-5 divide-y divide-border overflow-hidden rounded-xl border border-border bg-bg">
          {related.map((service) => (
            <li key={service.slug}>
              <Link
                href={servicePath(locale, service)}
                className="flex items-center justify-between gap-4 px-4 py-3.5 text-sm font-semibold text-text transition-colors hover:bg-surface-hover"
              >
                <span>{serviceText(locale, service.slug).name}</span>
                <span className="shrink-0 whitespace-nowrap">
                  {priceLabel(locale, service.price, service.from)}{" "}
                  <span className="text-xs font-normal text-text-muted">{vatLabel(locale, service.audience)}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <PrimaryButton href={`/${locale}/entreprises`} className="px-6 py-3 text-sm">
          {t.cta}
        </PrimaryButton>
        <Link href={`/${locale}/entreprises#abonnement`} className="text-sm font-medium text-text underline underline-offset-4">
          {t.subscription}
        </Link>
      </div>
    </div>
  );
}
