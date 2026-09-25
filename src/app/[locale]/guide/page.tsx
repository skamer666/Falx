import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import { Container } from "@/components/site/ui";
import { GUIDE_ARTICLES } from "@/lib/guide/articles";
import { isLocale, DEFAULT_LOCALE, type Locale } from "@/i18n/config";

const STRINGS: Record<
  Locale,
  {
    title: string;
    kicker: string;
    heading: string;
    intro: string;
    introLinkLabel: string;
    metaTitle: string;
    metaDescription: string;
  }
> = {
  fr: {
    title: "Guide",
    kicker: "Guide",
    heading: "Comprendre la nLPD, étape par étape",
    intro: "Des guides pratiques pour PME suisses, sans jargon inutile. Pour aller plus loin, ",
    introLinkLabel: "faites le diagnostic gratuit",
    metaTitle: "Guide de la conformité nLPD pour PME suisses | Thrax Legal",
    metaDescription:
      "Tout comprendre à la nLPD : registre des traitements, politique de confidentialité, sanctions, contrats de sous-traitance. Guides pratiques pour PME suisses.",
  },
  de: {
    title: "Ratgeber",
    kicker: "Ratgeber",
    heading: "Das DSG verstehen, Schritt für Schritt",
    intro: "Praktische Ratgeber für Schweizer KMU, ohne unnötigen Fachjargon. Für den nächsten Schritt: ",
    introLinkLabel: "kostenlose Diagnose starten",
    metaTitle: "DSG-Konformitätsratgeber für Schweizer KMU | Thrax Legal",
    metaDescription:
      "Alles zum DSG verstehen: Verarbeitungsverzeichnis, Datenschutzerklärung, Sanktionen, Auftragsverarbeitungsverträge. Praktische Ratgeber für Schweizer KMU.",
  },
  en: {
    title: "Guide",
    kicker: "Guide",
    heading: "Understanding the Swiss FADP, step by step",
    intro: "Practical guides for Swiss SMEs, without unnecessary jargon. To go further, ",
    introLinkLabel: "take the free diagnostic",
    metaTitle: "Swiss FADP compliance guide for SMEs | Thrax Legal",
    metaDescription:
      "Everything on the Swiss FADP: records of processing, privacy policy, penalties, data processing agreements. Practical guides for Swiss SMEs.",
  },
  it: {
    title: "Guida",
    kicker: "Guida",
    heading: "Capire la nLPD, passo dopo passo",
    intro: "Guide pratiche per PMI svizzere, senza inutile gergo tecnico. Per andare oltre, ",
    introLinkLabel: "fate la diagnosi gratuita",
    metaTitle: "Guida alla conformità nLPD per PMI svizzere | Thrax Legal",
    metaDescription:
      "Capire tutto sulla nLPD: registro dei trattamenti, informativa sulla privacy, sanzioni, contratti di sub-trattamento. Guide pratiche per PMI svizzere.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const t = STRINGS[locale];
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: {
      canonical: `/${locale}/guide`,
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const t = STRINGS[locale];

  return (
    <>
      <Nav />
      <main className="bg-bg text-text">
        <section className="theme-light border-b border-border bg-bg pb-16 pt-32 md:pt-40">
          <Container className="mx-auto max-w-2xl">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-text-muted">
                {t.kicker}
              </p>
              <h1 className="mt-4 text-[2.25rem] font-semibold leading-[1.1] tracking-[-0.02em] text-text sm:text-5xl">
                {t.heading}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-muted">
                {t.intro}
                <Link
                  href={`/${locale}/#diagnostic`}
                  className="text-text underline decoration-dotted underline-offset-4 hover:text-text-muted"
                >
                  {t.introLinkLabel}
                </Link>
                .
              </p>
            </Reveal>
          </Container>
        </section>

        <section className="theme-light bg-bg py-16 md:py-20">
          <Container className="mx-auto max-w-2xl">
            <div className="divide-y divide-border border-t border-border">
              {GUIDE_ARTICLES.map((article, index) => (
                <Reveal key={article.slug} delay={index * 60}>
                  <Link
                    href={`/${locale}/guide/${article.slug}`}
                    className="group flex items-center justify-between gap-6 py-8"
                  >
                    <div className="max-w-lg">
                      <h2 className="text-lg font-semibold leading-snug text-text">
                        {article.title[locale]}
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-text-muted">
                        {article.description[locale]}
                      </p>
                    </div>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border transition-colors duration-200 group-hover:border-white/25 group-hover:bg-surface">
                      <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                        <path
                          d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
