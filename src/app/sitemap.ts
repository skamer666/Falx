import type { MetadataRoute } from "next";
import { GUIDE_ARTICLES } from "@/lib/guide/articles";
import { SERVICES } from "@/lib/services/catalog";
import { LOCALES, LOCALE_TAGS } from "@/i18n/config";
import { CONTENT_UPDATED, SITE_URL } from "@/lib/site";
import { TERMS_VERSION } from "@/lib/account/legal";

/** Versions linguistiques de la page, plus x-default (français), comme dans les balises hreflang des pages. */
function alternates(path: string) {
  return {
    languages: {
      ...Object.fromEntries(LOCALES.map((locale) => [LOCALE_TAGS[locale], `${SITE_URL}/${locale}${path}`])),
      "x-default": `${SITE_URL}/fr${path}`,
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Dates réelles de modification du contenu (pas « maintenant » à chaque génération : Google ignorerait le champ).
  const updated = new Date(CONTENT_UPDATED);
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    entries.push(
      {
        url: `${SITE_URL}/${locale}`,
        lastModified: updated,
        changeFrequency: "weekly",
        priority: 1,
        alternates: alternates(""),
      },
      {
        url: `${SITE_URL}/${locale}/particuliers`,
        lastModified: updated,
        changeFrequency: "weekly",
        priority: 0.9,
        alternates: alternates("/particuliers"),
      },
      {
        url: `${SITE_URL}/${locale}/entreprises`,
        lastModified: updated,
        changeFrequency: "weekly",
        priority: 0.9,
        alternates: alternates("/entreprises"),
      },
      ...SERVICES.map((service) => ({
        url: `${SITE_URL}/${locale}/${service.audience}/${service.slug}`,
        lastModified: updated,
        changeFrequency: "monthly" as const,
        priority: 0.8,
        alternates: alternates(`/${service.audience}/${service.slug}`),
      })),
      {
        url: `${SITE_URL}/${locale}/contact`,
        lastModified: updated,
        changeFrequency: "yearly",
        priority: 0.5,
        alternates: alternates("/contact"),
      },
      {
        url: `${SITE_URL}/${locale}/mentions-legales`,
        lastModified: updated,
        changeFrequency: "yearly",
        priority: 0.3,
        alternates: alternates("/mentions-legales"),
      },
      {
        url: `${SITE_URL}/${locale}/a-propos`,
        lastModified: updated,
        changeFrequency: "yearly",
        priority: 0.5,
        alternates: alternates("/a-propos"),
      },
      {
        url: `${SITE_URL}/${locale}/alternative-embauche-juriste`,
        lastModified: updated,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: alternates("/alternative-embauche-juriste"),
      },
      {
        url: `${SITE_URL}/${locale}/guide`,
        lastModified: updated,
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
        lastModified: updated,
        changeFrequency: "yearly",
        priority: 0.3,
        alternates: alternates("/confidentialite"),
      },
      {
        url: `${SITE_URL}/${locale}/conditions-generales`,
        lastModified: new Date(TERMS_VERSION),
        changeFrequency: "yearly",
        priority: 0.3,
        alternates: alternates("/conditions-generales"),
      },
    );
  }

  return entries;
}
