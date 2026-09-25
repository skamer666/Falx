import type { MetadataRoute } from "next";
import { GUIDE_ARTICLES } from "@/lib/guide/articles";
import { LOCALES, LOCALE_TAGS } from "@/i18n/config";
import { SITE_URL } from "@/lib/site";

function alternates(path: string) {
  return {
    languages: Object.fromEntries(
      LOCALES.map((locale) => [LOCALE_TAGS[locale], `${SITE_URL}/${locale}${path}`]),
    ),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    entries.push(
      {
        url: `${SITE_URL}/${locale}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 1,
        alternates: alternates(""),
      },
      {
        url: `${SITE_URL}/${locale}/suivi-conformite`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: alternates("/suivi-conformite"),
      },
      {
        url: `${SITE_URL}/${locale}/guide`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.7,
        alternates: alternates("/guide"),
      },
      ...GUIDE_ARTICLES.map((article) => ({
        url: `${SITE_URL}/${locale}/guide/${article.slug}`,
        lastModified: new Date(article.updatedAt),
        changeFrequency: "monthly" as const,
        priority: 0.6,
        alternates: alternates(`/guide/${article.slug}`),
      })),
      {
        url: `${SITE_URL}/${locale}/confidentialite`,
        lastModified: now,
        changeFrequency: "yearly",
        priority: 0.3,
        alternates: alternates("/confidentialite"),
      },
    );
  }

  return entries;
}
