import type { MetadataRoute } from "next";
import { GUIDE_ARTICLES } from "@/lib/guide/articles";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thraxlegal.ch";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/suivi-conformite`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/guide`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...GUIDE_ARTICLES.map((article) => ({
      url: `${siteUrl}/guide/${article.slug}`,
      lastModified: new Date(article.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
