import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import { Container } from "@/components/site/ui";
import { isLocale, DEFAULT_LOCALE } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { SERVICES_UI } from "@/lib/services/strings";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const t = SERVICES_UI[locale].home;
  return pageMetadata({ locale, path: "", title: t.metaTitle, description: t.metaDescription });
}

function PersonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-9 w-9 md:h-11 md:w-11" aria-hidden>
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-9 w-9 md:h-11 md:w-11" aria-hidden>
      <rect x="4" y="3" width="16" height="18" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 md:h-8 md:w-8" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Accueil : un seul choix, particulier ou entreprise, en deux très grands boutons. */
export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const t = SERVICES_UI[locale].home;

  const choices = [
    { href: `/${locale}/particuliers`, data: t.b2c, icon: <PersonIcon />, light: true },
    { href: `/${locale}/entreprises`, data: t.b2b, icon: <BuildingIcon />, light: false },
  ];

  return (
    <>
      <Nav />
      <main className="bg-bg text-text">
        <section className="flex min-h-[100svh] flex-col justify-center pb-12 pt-28 md:pt-32">
          <Container className="mx-auto max-w-6xl">
            <h1 className="text-center text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-5xl md:text-6xl">{t.title}</h1>
            <p className="mt-5 text-center text-lg text-text-muted md:text-xl">{t.question}</p>

            <div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-2 md:gap-6">
              {choices.map(({ href, data, icon, light }) => (
                <Link
                  key={href}
                  href={href}
                  className={`group flex min-h-[230px] flex-col justify-between gap-6 rounded-[28px] p-7 transition-transform duration-200 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/60 md:min-h-[400px] md:p-10 ${
                    light ? "bg-[#fcfbf7] text-[#101010]" : "border border-white/15 bg-surface text-text"
                  }`}
                >
                  <span className="flex items-center justify-between">
                    {icon}
                    <span
                      className={`flex h-14 w-14 items-center justify-center rounded-full transition-colors md:h-16 md:w-16 ${
                        light ? "bg-[#101010] text-[#fcfbf7]" : "bg-text text-bg"
                      }`}
                    >
                      <Arrow />
                    </span>
                  </span>
                  <span>
                    <span className="block text-[2.1rem] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-5xl md:text-[3.6rem]">
                      {data.label}
                    </span>
                    <span className={`mt-3 block text-base md:text-lg ${light ? "text-[#101010]/70" : "text-text-muted"}`}>{data.hint}</span>
                    <span className="mt-4 block text-base font-semibold md:text-lg">{data.price}</span>
                  </span>
                </Link>
              ))}
            </div>

            <p className="mt-8 text-center text-sm text-text-muted">{t.proof.join(" · ")}</p>
            <p className="mt-3 text-center text-sm text-text-muted">
              {t.notSure}{" "}
              <Link href={`/${locale}/contact`} className="font-semibold text-text underline underline-offset-4">
                {t.notSureCta}
              </Link>
            </p>
          </Container>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
