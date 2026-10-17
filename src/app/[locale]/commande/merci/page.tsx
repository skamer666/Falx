import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import { Container } from "@/components/site/ui";
import { isLocale, DEFAULT_LOCALE } from "@/i18n/config";
import { getService, servicePath, serviceText, type ServiceDef } from "@/lib/services/catalog";
import { priceLabel, SERVICES_UI } from "@/lib/services/strings";
import type { Locale } from "@/i18n/config";
import { getOrderPaymentBySession } from "@/lib/account/db";
import PurchaseConversion from "@/components/site/PurchaseConversion";

const ALSO_TITLE: Record<Locale, string> = {
  fr: "Souvent demandé en complément",
  de: "Häufig ergänzend bestellt",
  en: "Often ordered alongside",
  it: "Spesso richiesto in aggiunta",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  return { title: SERVICES_UI[locale].thanks.metaTitle, robots: { index: false, follow: false } };
}

export default async function OrderThanksPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ service?: string; paid?: string; sid?: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const { service: slug, paid, sid } = await searchParams;
  const isPaid = paid === "1";
  // Valeur réelle de la commande (lue en base, jamais dans l'adresse) pour déclarer la conversion à Google Ads.
  const payment = isPaid && sid && /^cs_[A-Za-z0-9_]{10,}$/.test(sid) ? await getOrderPaymentBySession(sid) : null;
  const service = slug ? getService(slug) : undefined;
  const t = SERVICES_UI[locale].thanks;
  const isQuote = slug === "devis-particuliers" || slug === "devis-entreprises";
  // Deux prestations liées à prix fixe, seulement après un paiement confirmé par l'utilisateur lui-même (un simple lien, aucun email).
  const alsoOrdered = isPaid && service
    ? service.related.map(getService).filter((s): s is ServiceDef => Boolean(s) && !s!.from).slice(0, 2)
    : [];
  return (
    <>
      <Nav />
      <main className="theme-light bg-bg text-text">
        <section className="pb-20 pt-32 md:pt-40">
          <Container className="mx-auto max-w-xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-text text-bg">
              <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden>
                <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="mt-6 text-[2rem] font-semibold leading-tight tracking-[-0.02em]">{isPaid ? t.paidHeading : isQuote ? t.quoteHeading : t.heading}</h1>
            {service ? <p className="mt-3 text-lg font-medium">{serviceText(locale, service.slug).name}</p> : null}
            <p className="mt-4 text-base leading-relaxed text-text-muted">{isPaid ? t.paidBody : isQuote ? t.quoteBody : t.body}</p>
            {isPaid ? null : (
            <ol className="mt-8 space-y-3">
              {t.next.map((step, index) => (
                <li key={step} className="flex gap-4 rounded-2xl border border-border bg-surface p-4 text-[15px] leading-relaxed">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-text text-sm font-semibold text-bg">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            )}
            {alsoOrdered.length ? (
              <div className="mt-10">
                <h2 className="text-sm font-semibold text-text-muted">{ALSO_TITLE[locale]}</h2>
                <div className="mt-3 grid gap-2">
                  {alsoOrdered.map((item) => (
                    <Link
                      key={item.slug}
                      href={servicePath(locale, item)}
                      className="flex items-center justify-between gap-4 rounded-2xl border border-border px-4 py-3 text-[15px] font-medium transition-colors hover:border-text"
                    >
                      <span>{serviceText(locale, item.slug).name}</span>
                      <span className="shrink-0 text-sm text-text-muted">{priceLabel(locale, item.price, item.from)}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
            {payment && payment.status !== "expired" ? <PurchaseConversion value={payment.amount_rappen / 100} transactionId={payment.id} /> : null}
            <Link href={`/${locale}`} className="mt-10 inline-block text-sm font-semibold underline underline-offset-4">
              {t.back}
            </Link>
          </Container>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
