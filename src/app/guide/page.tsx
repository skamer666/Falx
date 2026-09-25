import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import { Container } from "@/components/site/ui";
import { GUIDE_ARTICLES } from "@/lib/guide/articles";

export const metadata: Metadata = {
  title: "Guide de la conformité nLPD pour PME suisses | Thrax Legal",
  description:
    "Tout comprendre à la nLPD : registre des traitements, politique de confidentialité, sanctions, contrats de sous-traitance. Guides pratiques pour PME suisses.",
  alternates: {
    canonical: "/guide",
  },
};

export default function GuidePage() {
  return (
    <>
      <Nav />
      <main className="bg-bg text-text">
        <section className="theme-light border-b border-border bg-bg pb-16 pt-32 md:pt-40">
          <Container className="mx-auto max-w-2xl">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-text-muted">
                Guide
              </p>
              <h1 className="mt-4 text-[2.25rem] font-semibold leading-[1.1] tracking-[-0.02em] text-text sm:text-5xl">
                Comprendre la nLPD, étape par étape
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-muted">
                Des guides pratiques pour PME suisses, sans jargon inutile.
                Pour aller plus loin,{" "}
                <Link
                  href="/#diagnostic"
                  className="text-text underline decoration-dotted underline-offset-4 hover:text-text-muted"
                >
                  faites le diagnostic gratuit
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
                    href={`/guide/${article.slug}`}
                    className="group flex items-center justify-between gap-6 py-8"
                  >
                    <div className="max-w-lg">
                      <h2 className="text-lg font-semibold leading-snug text-text">
                        {article.title}
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-text-muted">
                        {article.description}
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
      <Footer />
    </>
  );
}
