import Link from "next/link";
import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import Nav from "./Nav";
import Footer from "./Footer";
import GuideCta from "./GuideCta";
import JsonLd from "./JsonLd";
import { Container } from "./ui";
import { getRelatedArticles, type GuideArticle } from "@/lib/guide/articles";
import type { Locale } from "@/i18n/config";
import { SITE_URL } from "@/lib/site";

const STRINGS: Record<
  Locale,
  {
    breadcrumbHome: string;
    breadcrumbGuide: string;
    updatedOn: string;
    seeAlso: string;
    dateLocale: string;
  }
> = {
  fr: {
    breadcrumbHome: "Accueil",
    breadcrumbGuide: "Guide",
    updatedOn: "Mis à jour le",
    seeAlso: "À lire aussi",
    dateLocale: "fr-CH",
  },
  de: {
    breadcrumbHome: "Startseite",
    breadcrumbGuide: "Ratgeber",
    updatedOn: "Aktualisiert am",
    seeAlso: "Auch interessant",
    dateLocale: "de-CH",
  },
  en: {
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guide",
    updatedOn: "Updated on",
    seeAlso: "Related articles",
    dateLocale: "en-CH",
  },
  it: {
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guida",
    updatedOn: "Aggiornato il",
    seeAlso: "Da leggere anche",
    dateLocale: "it-CH",
  },
};

export default function GuideLayout({
  article,
  locale,
  children,
}: {
  article: GuideArticle;
  locale: Locale;
  children: ReactNode;
}) {
  const t = STRINGS[locale];
  const related = getRelatedArticles(article.slug);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t.breadcrumbHome, item: `${SITE_URL}/${locale}` },
      {
        "@type": "ListItem",
        position: 2,
        name: t.breadcrumbGuide,
        item: `${SITE_URL}/${locale}/guide`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.shortTitle[locale],
        item: `${SITE_URL}/${locale}/guide/${article.slug}`,
      },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title[locale],
    description: article.description[locale],
    dateModified: article.updatedAt,
    inLanguage: locale,
    author: {
      "@type": "Organization",
      name: "Thrax Legal",
    },
    publisher: {
      "@type": "Organization",
      name: "Thrax Legal",
    },
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={articleJsonLd} />
      <Nav />
      <main className="bg-bg text-text">
        <section className="theme-light border-b border-border bg-bg pb-16 pt-32 md:pt-40">
          <Container className="mx-auto max-w-2xl">
            <Reveal>
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-muted">
                <Link href={`/${locale}`} className="hover:text-text">
                  {t.breadcrumbHome}
                </Link>
                <span aria-hidden>/</span>
                <Link href={`/${locale}/guide`} className="hover:text-text">
                  {t.breadcrumbGuide}
                </Link>
                <span aria-hidden>/</span>
                <span className="text-text">{article.shortTitle[locale]}</span>
              </nav>
              <h1 className="mt-4 text-[2rem] font-semibold leading-[1.15] tracking-[-0.02em] text-text sm:text-[2.5rem]">
                {article.title[locale]}
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-text-muted">
                {article.description[locale]}
              </p>
              <p className="mt-4 text-xs text-text-muted">
                {t.updatedOn}{" "}
                {new Date(article.updatedAt).toLocaleDateString(t.dateLocale, {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </Reveal>
          </Container>
        </section>

        <section className="theme-light bg-bg py-12 md:py-16">
          <Container className="mx-auto max-w-2xl">
            <Reveal>
              <div className="article-body">{children}</div>
              <GuideCta locale={locale} className="mt-12" />
            </Reveal>
          </Container>
        </section>

        {related.length > 0 ? (
          <section className="theme-light border-t border-border bg-surface py-16">
            <Container className="mx-auto max-w-2xl">
              <Reveal>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-text-muted">
                  {t.seeAlso}
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {related.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/${locale}/guide/${item.slug}`}
                      className="group rounded-2xl border border-border bg-bg p-5 transition-colors hover:border-white/20"
                    >
                      <p className="text-sm font-semibold leading-snug text-text group-hover:text-text">
                        {item.shortTitle[locale]}
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-text-muted">
                        {item.description[locale]}
                      </p>
                    </Link>
                  ))}
                </div>
              </Reveal>
            </Container>
          </section>
        ) : null}
      </main>
      <Footer locale={locale} />
    </>
  );
}
