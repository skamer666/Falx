import Link from "next/link";
import FaqAccordion from "@/components/site/FaqAccordion";
import { Container } from "@/components/site/ui";
import type { Locale } from "@/i18n/config";
import { CATEGORIES, categoryText, servicePath, servicesFor, serviceText, type Audience } from "@/lib/services/catalog";
import { priceLabel, SERVICES_UI } from "@/lib/services/strings";
import ServiceFinder, { type FinderCategory, type FinderItem } from "./ServiceFinder";

export function finderData(locale: Locale, audience: Audience): { items: FinderItem[]; categories: FinderCategory[] } {
  const services = servicesFor(audience);
  const items = services.map((service) => {
    const text = serviceText(locale, service.slug);
    return {
      slug: service.slug,
      href: servicePath(locale, service),
      name: text.name,
      short: text.short,
      price: priceLabel(locale, service.price, service.from),
      category: service.category,
      popular: Boolean(service.popular),
      search: `${categoryText(locale, service.category).name} ${text.intro} ${text.included.join(" ")}`,
    };
  });
  const categories = CATEGORIES[audience].map((id) => ({
    id,
    name: categoryText(locale, id).name,
    count: services.filter((s) => s.category === id).length,
  }));
  return { items, categories };
}

/** En-tête de la page Particuliers / Entreprises : titre + recherche + liste filtrable. */
export function HubHero({ locale, audience, dark = false }: { locale: Locale; audience: Audience; dark?: boolean }) {
  const ui = SERVICES_UI[locale];
  const t = ui.hub[audience];
  const { items, categories } = finderData(locale, audience);
  const other: Audience = audience === "particuliers" ? "entreprises" : "particuliers";
  return (
    <section className={`${dark ? "" : "theme-light"} border-b border-border bg-bg pb-14 pt-28 md:pb-20 md:pt-36`}>
      <Container className="mx-auto max-w-4xl">
        <p className="text-sm text-text-muted">{t.eyebrow}</p>
        <h1 className="mt-3 text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.03em] text-text sm:text-5xl md:text-[3.5rem]">
          {t.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-text-muted">{t.subtitle}</p>
        <div className="mt-8">
          <ServiceFinder
            items={items}
            categories={categories}
            callbackHref="#devis"
            strings={{
              ...ui.finder,
              searchPlaceholder: ui.finder.searchPlaceholder[audience],
              quoteTitle: ui.quote.title,
              quoteCta: ui.quote.cta,
            }}
          />
        </div>
        <p className="mt-6 text-sm text-text-muted">
          {t.switchLabel}{" "}
          <Link href={`/${locale}/${other}`} className="font-semibold text-text underline underline-offset-4">
            {ui.home[other === "particuliers" ? "b2c" : "b2b"].label}
          </Link>
        </p>
      </Container>
    </section>
  );
}

export function HowItWorks({ locale, className = "" }: { locale: Locale; className?: string }) {
  const t = SERVICES_UI[locale].steps;
  return (
    <section className={`theme-light bg-surface py-14 md:py-20 ${className}`}>
      <Container className="mx-auto grid max-w-4xl gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-14">
        <div>
          <h2 className="text-[26px] font-semibold tracking-[-0.02em] text-text md:text-3xl">{t.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-text-muted">{t.intro}</p>
        </div>
        <ol className="relative">
          {t.items.map((step, index) => (
            <li key={step.title} className="relative border-l border-border pb-9 pl-8 last:border-transparent last:pb-0">
              <span
                aria-hidden
                className="absolute -left-[13px] top-0 flex h-[26px] w-[26px] items-center justify-center rounded-full border border-border bg-surface text-xs font-semibold text-text"
              >
                {index + 1}
              </span>
              <h3 className="text-[17px] font-semibold leading-snug text-text">{step.title}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export function CompareBlock({ locale }: { locale: Locale }) {
  const t = SERVICES_UI[locale].compare;
  const cards = [
    { data: t.lawyer, highlight: false },
    { data: t.alone, highlight: false },
    { data: t.us, highlight: true },
  ];
  return (
    <section className="theme-light bg-bg py-14 md:py-20">
      <Container className="mx-auto max-w-4xl">
        <h2 className="text-[26px] font-semibold tracking-[-0.02em] text-text md:text-3xl">{t.title}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {cards.map(({ data, highlight }) => (
            <div
              key={data[0]}
              className={`rounded-2xl p-6 ${highlight ? "bg-text text-bg" : "border border-border bg-surface text-text"}`}
            >
              <p className={`text-xs font-semibold uppercase tracking-[0.14em] ${highlight ? "text-bg/70" : "text-text-muted"}`}>{data[0]}</p>
              <p className="mt-3 text-xl font-semibold">{data[1]}</p>
              <p className={`mt-2 text-sm leading-relaxed ${highlight ? "text-bg/80" : "text-text-muted"}`}>{data[2]}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function HubFaq({ locale, audience }: { locale: Locale; audience: Audience }) {
  const ui = SERVICES_UI[locale];
  return (
    <section id="faq" className="theme-light scroll-mt-28 bg-surface py-14 md:py-20">
      <Container className="mx-auto max-w-2xl">
        <h2 className="text-[26px] font-semibold tracking-[-0.02em] text-text md:text-3xl">{ui.faqTitle}</h2>
        <FaqAccordion items={ui.hubFaq[audience]} className="mt-8" />
      </Container>
    </section>
  );
}

export function CallbackBand({ locale }: { locale: Locale }) {
  const t = SERVICES_UI[locale].callback;
  return (
    <section className="border-t border-border bg-bg py-14 md:py-20">
      <Container className="mx-auto flex max-w-4xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h2 className="text-[26px] font-semibold tracking-[-0.02em] text-text md:text-3xl">{t.title}</h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-text-muted">{t.body}</p>
        </div>
        <Link
          href={`/${locale}/contact`}
          className="inline-flex min-h-14 shrink-0 items-center justify-center rounded-full bg-accent px-8 text-base font-semibold text-bg transition-colors hover:bg-accent-hover"
        >
          {t.cta}
        </Link>
      </Container>
    </section>
  );
}
