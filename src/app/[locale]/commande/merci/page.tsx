import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import { Container } from "@/components/site/ui";
import { isLocale, DEFAULT_LOCALE } from "@/i18n/config";
import { getService, serviceText } from "@/lib/services/catalog";
import { SERVICES_UI } from "@/lib/services/strings";

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
  searchParams: Promise<{ service?: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const { service: slug } = await searchParams;
  const service = slug ? getService(slug) : undefined;
  const t = SERVICES_UI[locale].thanks;
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
            <h1 className="mt-6 text-[2rem] font-semibold leading-tight tracking-[-0.02em]">{t.heading}</h1>
            {service ? <p className="mt-3 text-lg font-medium">{serviceText(locale, service.slug).name}</p> : null}
            <p className="mt-4 text-base leading-relaxed text-text-muted">{t.body}</p>
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
