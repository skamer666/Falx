import Link from "next/link";
import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import Nav from "./Nav";
import Footer from "./Footer";
import GuideCta from "./GuideCta";
import JsonLd from "./JsonLd";
import { Container } from "./ui";
import { getRelatedArticles, type GuideArticle } from "@/lib/guide/articles";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thraxlegal.ch";

export default function GuideLayout({
  article,
  children,
}: {
  article: GuideArticle;
  children: ReactNode;
}) {
  const related = getRelatedArticles(article.slug);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Guide", item: `${siteUrl}/guide` },
      {
        "@type": "ListItem",
        position: 3,
        name: article.shortTitle,
        item: `${siteUrl}/guide/${article.slug}`,
      },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    dateModified: article.updatedAt,
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
              <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-xs text-text-muted">
                <Link href="/" className="hover:text-text">
                  Accueil
                </Link>
                <span aria-hidden>/</span>
                <Link href="/guide" className="hover:text-text">
                  Guide
                </Link>
                <span aria-hidden>/</span>
                <span className="text-text">{article.shortTitle}</span>
              </nav>
              <h1 className="mt-4 text-[2rem] font-semibold leading-[1.15] tracking-[-0.02em] text-text sm:text-[2.5rem]">
                {article.title}
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-text-muted">
                {article.description}
              </p>
              <p className="mt-4 text-xs text-text-muted">
                Mis à jour le{" "}
                {new Date(article.updatedAt).toLocaleDateString("fr-CH", {
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
              <GuideCta className="mt-12" />
            </Reveal>
          </Container>
        </section>

        {related.length > 0 ? (
          <section className="theme-light border-t border-border bg-surface py-16">
            <Container className="mx-auto max-w-2xl">
              <Reveal>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-text-muted">
                  À lire aussi
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {related.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/guide/${item.slug}`}
                      className="group rounded-2xl border border-border bg-bg p-5 transition-colors hover:border-white/20"
                    >
                      <p className="text-sm font-semibold leading-snug text-text group-hover:text-text">
                        {item.shortTitle}
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-text-muted">
                        {item.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </Reveal>
            </Container>
          </section>
        ) : null}
      </main>
      <Footer />
    </>
  );
}
