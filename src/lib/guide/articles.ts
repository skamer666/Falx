export type GuideArticle = {
  slug: string;
  title: string;
  /** Titre court utilisé dans les listes et le maillage interne. */
  shortTitle: string;
  description: string;
  updatedAt: string;
};

export const GUIDE_ARTICLES: GuideArticle[] = [
  {
    slug: "quest-ce-que-la-nlpd",
    title: "Qu'est-ce que la nLPD ? Guide complet pour les PME suisses",
    shortTitle: "Qu'est-ce que la nLPD ?",
    description:
      "La nLPD expliquée simplement : qui est concerné, depuis quand, et ce qu'elle change concrètement pour une PME suisse.",
    updatedAt: "2026-09-25",
  },
  {
    slug: "registre-des-traitements",
    title: "Registre des traitements de données : modèle et obligations (nLPD)",
    shortTitle: "Le registre des traitements",
    description:
      "Ce que doit contenir un registre des traitements conforme, qui doit en tenir un, et comment le mettre en place dans une PME.",
    updatedAt: "2026-09-25",
  },
  {
    slug: "politique-de-confidentialite",
    title: "Politique de confidentialité conforme nLPD : ce qu'elle doit contenir",
    shortTitle: "La politique de confidentialité",
    description:
      "Les mentions obligatoires d'une politique de confidentialité nLPD, pour un site web comme pour la gestion RH.",
    updatedAt: "2026-09-25",
  },
  {
    slug: "sanctions-nlpd",
    title: "Sanctions nLPD : amendes et risques pour les PME et leurs dirigeants",
    shortTitle: "Les sanctions nLPD",
    description:
      "Qui peut être sanctionné, dans quels cas, et jusqu'à quel montant : ce que prévoit réellement la loi révisée.",
    updatedAt: "2026-09-25",
  },
  {
    slug: "contrat-sous-traitance-dpa",
    title: "Contrat de sous-traitance (DPA) : quand et pourquoi en avoir un",
    shortTitle: "Le contrat de sous-traitance (DPA)",
    description:
      "Hébergeur, CRM, comptabilité en ligne : pourquoi ces prestataires doivent être couverts par un contrat de sous-traitance.",
    updatedAt: "2026-09-25",
  },
];

export function getGuideArticle(slug: string): GuideArticle | undefined {
  return GUIDE_ARTICLES.find((article) => article.slug === slug);
}

export function getRelatedArticles(slug: string, count = 3): GuideArticle[] {
  return GUIDE_ARTICLES.filter((article) => article.slug !== slug).slice(0, count);
}
