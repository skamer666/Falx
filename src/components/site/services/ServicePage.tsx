import Link from "next/link";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import FaqAccordion from "@/components/site/FaqAccordion";
import JsonLd from "@/components/site/JsonLd";
import { Container } from "@/components/site/ui";
import type { Locale } from "@/i18n/config";
import { SITE_URL } from "@/lib/site";
import { categoryText, getService, servicePath, serviceText, type ServiceDef } from "@/lib/services/catalog";
import { priceLabel, SERVICES_UI, vatLabel } from "@/lib/services/strings";
import { GUIDE_ARTICLES } from "@/lib/guide/articles";
import VideoEmbed from "@/components/site/VideoEmbed";
import { SERVICE_VIDEOS, VIDEO_STRINGS } from "@/lib/videos";
import OrderForm from "./OrderForm";

function Check() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="mt-0.5 h-5 w-5 shrink-0" aria-hidden>
      <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Fiche d'une prestation à prix fixe : description, inclus, FAQ et formulaire de commande. */
export default function ServicePage({ locale, service, error }: { locale: Locale; service: ServiceDef; error?: string }) {
  const ui = SERVICES_UI[locale];
  const t = serviceText(locale, service.slug);
  const audienceLabel = ui.home[service.audience === "particuliers" ? "b2c" : "b2b"].label;
  const price = priceLabel(locale, service.price, service.from);
  const vat = vatLabel(locale, service.audience);
  const orderLabel = `${ui.form.submit} · ${price}`;
  const related = service.related.map(getService).filter((s): s is ServiceDef => Boolean(s));
  const guide = service.guide ? GUIDE_ARTICLES.find((a) => a.slug === service.guide) : undefined;
  const hubPath = `/${locale}/${service.audience}`;
  const video = SERVICE_VIDEOS[`${service.audience}/${service.slug}`];
  const vs = VIDEO_STRINGS[locale];
  const url = `${SITE_URL}${servicePath(locale, service)}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: t.name,
      description: t.short,
      serviceType: categoryText(locale, service.category).name,
      areaServed: { "@type": "AdministrativeArea", name: "Suisse romande" },
      provider: { "@type": "LegalService", name: "Thrax Legal", url: `${SITE_URL}/${locale}` },
      offers: {
        "@type": "Offer",
        price: String(service.price),
        priceCurrency: "CHF",
        url,
        availability: "https://schema.org/InStock",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: t.faq.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: ui.service.breadcrumbHome, item: `${SITE_URL}/${locale}` },
        { "@type": "ListItem", position: 2, name: audienceLabel, item: `${SITE_URL}${hubPath}` },
        { "@type": "ListItem", position: 3, name: t.name, item: url },
      ],
    },
  ];

  return (
    <>
      {jsonLd.map((data, index) => (
        <JsonLd key={index} data={data} />
      ))}
      <div className="pb-24 lg:pb-0">
        <Nav />
        <main className="theme-light bg-bg text-text">
          <section className="pb-14 pt-28 md:pb-20 md:pt-36">
            <Container className="mx-auto max-w-6xl">
              <nav aria-label="Fil d'Ariane" className="text-sm text-text-muted">
                <Link href={`/${locale}`} className="hover:text-text">
                  {ui.service.breadcrumbHome}
                </Link>
                <span aria-hidden> / </span>
                <Link href={hubPath} className="hover:text-text">
                  {audienceLabel}
                </Link>
                <span aria-hidden> / </span>
                <span>{categoryText(locale, service.category).name}</span>
              </nav>

              <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-14">
                <div className="min-w-0">
                  <h1 className="text-[2rem] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[2.6rem] md:text-5xl">{t.name}</h1>

                  {/* Prix visible tout de suite sur mobile, avant le texte. */}
                  <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 lg:hidden">
                    <span className="text-3xl font-semibold tracking-[-0.02em]">{price}</span>
                    <span className="text-sm text-text-muted">{vat}</span>
                    <span className="w-full text-sm text-text-muted">{ui.service.delivery(service.days)}</span>
                  </div>
                  <a
                    href="#commander"
                    className="mt-5 inline-flex min-h-14 w-full items-center justify-center rounded-full bg-accent px-8 text-base font-semibold text-bg sm:w-auto lg:hidden"
                  >
                    {orderLabel}
                  </a>

                  <p className="mt-6 text-lg leading-relaxed text-text-muted">{t.intro}</p>

                  {video ? (
                    <div className="mt-8">
                      <VideoEmbed videoId={video.id} poster={video.poster} title={`${t.name} — ${vs.heading}`} playLabel={vs.play} playPosition="corner" />
                      {vs.note ? <p className="mt-2 text-xs text-text-muted">{vs.note}</p> : null}
                    </div>
                  ) : null}

                  <h2 className="mt-10 text-xl font-semibold">{ui.service.included}</h2>
                  <ul className="mt-4 flex flex-col gap-3">
                    {t.included.map((item) => (
                      <li key={item} className="flex gap-3 text-base leading-relaxed">
                        <Check />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <h2 className="mt-10 text-xl font-semibold">{ui.service.needs}</h2>
                  <p className="mt-3 text-base leading-relaxed text-text-muted">{t.needs}</p>

                  <div className="mt-10 rounded-2xl bg-surface p-6">
                    <h2 className="text-base font-semibold">{ui.service.note}</h2>
                    <p className="mt-2 text-[15px] leading-relaxed text-text-muted">{t.note}</p>
                  </div>

                  {guide ? (
                    <Link
                      href={`/${locale}/guide/${guide.slug}`}
                      className="mt-6 inline-block text-sm font-semibold text-text underline underline-offset-4"
                    >
                      {ui.service.guide} →
                    </Link>
                  ) : null}

                  <h2 className="mt-12 text-xl font-semibold">{ui.service.faq}</h2>
                  <FaqAccordion items={t.faq} className="mt-4" />
                </div>

                <aside id="commander" className="scroll-mt-28 lg:sticky lg:top-28 lg:self-start">
                  <div className="rounded-3xl border border-border bg-surface p-6 shadow-[0_24px_60px_-40px_rgba(0,0,0,0.45)] md:p-7">
                    <p className="text-sm font-semibold text-text-muted">{ui.service.orderTitle}</p>
                    <div className="mt-1 flex flex-wrap items-baseline gap-x-2">
                      <span className="text-4xl font-semibold tracking-[-0.02em]">{price}</span>
                      <span className="text-sm text-text-muted">{vat}</span>
                    </div>
                    <ul className="mt-3 space-y-1 text-sm text-text-muted">
                      <li>{ui.service.delivery(service.days)}</li>
                      <li>{ui.service.revision}</li>
                    </ul>
                    <div className="mt-6">
                      <OrderForm locale={locale} service={service} submitLabel={orderLabel} error={error} />
                    </div>
                    <p className="mt-4 text-center text-xs leading-relaxed text-text-muted">{ui.service.payAfter}</p>
                  </div>
                  <p className="mt-4 text-xs leading-relaxed text-text-muted">{ui.service.notLawyer}</p>
                </aside>
              </div>
            </Container>
          </section>

          {related.length ? (
            <section className="border-t border-border bg-surface py-12 md:py-16">
              <Container className="mx-auto max-w-6xl">
                <h2 className="text-xl font-semibold">{ui.service.related}</h2>
                <div className="mt-6 grid gap-3 md:grid-cols-3">
                  {related.map((item) => (
                    <Link
                      key={item.slug}
                      href={servicePath(locale, item)}
                      className="flex min-h-20 items-center justify-between gap-4 rounded-2xl border border-border bg-bg px-5 py-4 font-semibold transition-colors hover:border-text"
                    >
                      <span>{serviceText(locale, item.slug).name}</span>
                      <span className="shrink-0 text-sm">{priceLabel(locale, item.price, item.from)}</span>
                    </Link>
                  ))}
                </div>
              </Container>
            </section>
          ) : null}
        </main>
        <Footer locale={locale} />
      </div>

      {/* Barre fixe sur mobile : le prix et le bouton restent toujours visibles. */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/95 backdrop-blur lg:hidden">
        <Container className="flex items-center justify-between gap-4 py-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-text">{t.name}</p>
            <p className="text-sm text-text-muted">
              {price} <span className="text-xs">{vat}</span>
            </p>
          </div>
          <a
            href="#commander"
            className="inline-flex min-h-12 shrink-0 items-center rounded-full bg-accent px-6 text-sm font-semibold text-bg"
          >
            {ui.service.mobileCta}
          </a>
        </Container>
      </div>
    </>
  );
}
