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
    toc: string;
    readingTime: (minutes: number) => string;
  }
> = {
  fr: {
    breadcrumbHome: "Accueil",
    breadcrumbGuide: "Guide",
    updatedOn: "Mis à jour le",
    seeAlso: "À lire aussi",
    dateLocale: "fr-CH",
    toc: "Sommaire",
    readingTime: (m) => `${m} min de lecture`,
  },
  de: {
    breadcrumbHome: "Startseite",
    breadcrumbGuide: "Ratgeber",
    updatedOn: "Aktualisiert am",
    seeAlso: "Auch interessant",
    dateLocale: "de-CH",
    toc: "Inhalt",
    readingTime: (m) => `${m} Min. Lesezeit`,
  },
  en: {
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guide",
    updatedOn: "Updated on",
    seeAlso: "Related articles",
    dateLocale: "en-CH",
    toc: "Contents",
    readingTime: (m) => `${m} min read`,
  },
  it: {
    breadcrumbHome: "Home",
    breadcrumbGuide: "Guida",
    updatedOn: "Aggiornato il",
    seeAlso: "Da leggere anche",
    dateLocale: "it-CH",
    toc: "Indice",
    readingTime: (m) => `${m} min di lettura`,
  },
};

export default function GuideLayout({
  article,
  locale,
  children,
  toc = [],
  faq = [],
  wordCount,
}: {
  article: GuideArticle;
  locale: Locale;
  children: ReactNode;
  toc?: { id: string; text: string }[];
  faq?: { question: string; answer: string }[];
  wordCount?: number;
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

  const url = `${SITE_URL}/${locale}/guide/${article.slug}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title[locale],
    description: article.description[locale],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    inLanguage: locale,
    mainEntityOfPage: url,
    image: `${SITE_URL}/opengraph-image.png`,
    ...(wordCount ? { wordCount } : {}),
    author: {
      "@type": "Organization",
      name: "Thrax Legal",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Thrax Legal",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.png` },
    },
  };

  const faqJsonLd = faq.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }
    : null;
  const minutes = wordCount ? Math.max(1, Math.round(wordCount / 220)) : null;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={articleJsonLd} />
      {faqJsonLd ? <JsonLd data={faqJsonLd} /> : null}
      <Nav />
      <main className="bg-bg text-text">
        <section className="theme-light border-b border-border bg-bg pb-16 pt-32 md:pt-40">
          <Container className="mx-auto max-w-3xl!">
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
                {minutes ? ` · ${t.readingTime(minutes)}` : null}
              </p>
            </Reveal>
          </Container>
        </section>

        <section className="theme-light bg-bg py-12 md:py-16">
          <Container className="mx-auto max-w-3xl!">
            <Reveal>
              {toc.length > 2 ? (
                <nav aria-label={t.toc} className="mb-10 rounded-2xl border border-border bg-surface p-5">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-text-muted">{t.toc}</p>
                  <ol className="mt-3 space-y-1.5 text-sm">
                    {toc.map((item) => (
                      <li key={item.id}>
                        <a href={`#${item.id}`} className="text-text-muted underline-offset-4 hover:text-text hover:underline">
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              ) : null}
              <div className="article-body">{children}</div>
              <GuideCta locale={locale} articleSlug={article.slug} className="mt-12" />
            </Reveal>
          </Container>
        </section>

        {related.length > 0 ? (
          <section className="theme-light border-t border-border bg-surface py-16">
            <Container className="mx-auto max-w-3xl!">
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
