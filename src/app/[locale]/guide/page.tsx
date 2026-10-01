import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import { Container } from "@/components/site/ui";
import { GUIDE_ARTICLES } from "@/lib/guide/articles";
import { isLocale, DEFAULT_LOCALE, type Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";

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
    heading: "Le droit des PME suisses, étape par étape",
    intro: "Des guides pratiques pour indépendants et PME de Suisse romande, sans jargon inutile. Pour une question précise, ",
    introLinkLabel: "voir les formules d'abonnement",
    metaTitle: "Guide juridique pour indépendants et PME suisses | Thrax Legal",
    metaDescription:
      "Contrats, CGV, droit du travail, conformité nLPD, recouvrement : guides pratiques pour indépendants et PME de Suisse romande.",
  },
  de: {
    title: "Ratgeber",
    kicker: "Ratgeber",
    heading: "Recht für Schweizer KMU, Schritt für Schritt",
    intro: "Praktische Ratgeber für Selbstständige und KMU in der Westschweiz, ohne unnötigen Fachjargon. Für eine konkrete Frage: ",
    introLinkLabel: "Abo-Formeln ansehen",
    metaTitle: "Rechtsratgeber für Selbstständige und Schweizer KMU | Thrax Legal",
    metaDescription:
      "Verträge, AGB, Arbeitsrecht, DSG-Konformität, Inkasso: praktische Ratgeber für Selbstständige und KMU in der Westschweiz.",
  },
  en: {
    title: "Guide",
    kicker: "Guide",
    heading: "Swiss SME law, step by step",
    intro: "Practical guides for freelancers and SMEs in French-speaking Switzerland, without unnecessary jargon. For a specific question, ",
    introLinkLabel: "see the subscription plans",
    metaTitle: "Legal guide for Swiss freelancers and SMEs | Thrax Legal",
    metaDescription:
      "Contracts, T&Cs, employment law, FADP compliance, debt collection: practical guides for freelancers and SMEs in French-speaking Switzerland.",
  },
  it: {
    title: "Guida",
    kicker: "Guida",
    heading: "Il diritto delle PMI svizzere, passo dopo passo",
    intro: "Guide pratiche per indipendenti e PMI della Svizzera romanda, senza inutile gergo tecnico. Per una domanda precisa, ",
    introLinkLabel: "vedere le formule di abbonamento",
    metaTitle: "Guida legale per indipendenti e PMI svizzere | Thrax Legal",
    metaDescription:
      "Contratti, condizioni generali, diritto del lavoro, conformità nLPD, recupero crediti: guide pratiche per indipendenti e PMI della Svizzera romanda.",
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
  return pageMetadata({ locale, path: "/guide", title: t.metaTitle, description: t.metaDescription });
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
                  href={`/${locale}/#offre`}
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
