import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GuideLayout from "@/components/site/GuideLayout";
import { GUIDE_ARTICLES, getGuideArticle } from "@/lib/guide/articles";
import { ArticleBlocks, parseArticle } from "@/lib/guide/content";
import { GUIDE_CONTENT } from "@/content/guide";
import { isLocale, DEFAULT_LOCALE } from "@/i18n/config";
import { pageMetadata, seoTitle } from "@/lib/seo";

export function generateStaticParams() {
  return GUIDE_ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const article = getGuideArticle(slug);
  if (!article) return {};
  return pageMetadata({
    locale,
    path: `/guide/${article.slug}`,
    title: article.metaTitle?.[locale] ?? seoTitle(article.title[locale]),
    description: article.description[locale],
  });
}

export default async function GuideArticlePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: rawLocale, slug } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const article = getGuideArticle(slug);
  const source = GUIDE_CONTENT[slug]?.[locale];
  if (!article || !source) notFound();

  const parsed = parseArticle(source);
  return (
    <GuideLayout article={article} locale={locale} toc={parsed.toc} faq={parsed.faq} wordCount={parsed.wordCount}>
      <ArticleBlocks blocks={parsed.blocks} />
    </GuideLayout>
  );
}
