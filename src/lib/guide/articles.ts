import type { Locale } from "@/i18n/config";

export type GuideArticle = {
  slug: string;
  title: Record<Locale, string>;
  /** Titre court utilisé dans les listes et le maillage interne. */
  shortTitle: Record<Locale, string>;
  description: Record<Locale, string>;
  updatedAt: string;
};

export const GUIDE_ARTICLES: GuideArticle[] = [
  {
    slug: "quest-ce-que-la-nlpd",
    title: {
      fr: "Qu'est-ce que la nLPD ? Guide complet pour les PME suisses",
      de: "Was ist das DSG? Der vollständige Ratgeber für Schweizer KMU",
      en: "What is the Swiss FADP? A complete guide for SMEs",
    },
    shortTitle: {
      fr: "Qu'est-ce que la nLPD ?",
      de: "Was ist das DSG?",
      en: "What is the FADP?",
    },
    description: {
      fr: "La nLPD expliquée simplement : qui est concerné, depuis quand, et ce qu'elle change concrètement pour une PME suisse.",
      de: "Das DSG einfach erklärt: wer betroffen ist, seit wann, und was sich für ein Schweizer KMU konkret ändert.",
      en: "The Swiss FADP explained simply: who it applies to, since when, and what actually changes for an SME.",
    },
    updatedAt: "2026-09-25",
  },
  {
    slug: "registre-des-traitements",
    title: {
      fr: "Registre des traitements de données : modèle et obligations (nLPD)",
      de: "Verarbeitungsverzeichnis: Vorlage und Pflichten nach DSG",
      en: "Records of processing activities: template and obligations (FADP)",
    },
    shortTitle: {
      fr: "Le registre des traitements",
      de: "Das Verarbeitungsverzeichnis",
      en: "Records of processing",
    },
    description: {
      fr: "Ce que doit contenir un registre des traitements conforme, qui doit en tenir un, et comment le mettre en place dans une PME.",
      de: "Was ein konformes Verarbeitungsverzeichnis enthalten muss, wer eines führen muss, und wie man es in einem KMU einführt.",
      en: "What a compliant record of processing must contain, who needs one, and how to set it up in an SME.",
    },
    updatedAt: "2026-09-25",
  },
  {
    slug: "politique-de-confidentialite",
    title: {
      fr: "Politique de confidentialité conforme nLPD : ce qu'elle doit contenir",
      de: "DSG-konforme Datenschutzerklärung: der nötige Inhalt",
      en: "FADP-compliant privacy policy: what it must contain",
    },
    shortTitle: {
      fr: "La politique de confidentialité",
      de: "Die Datenschutzerklärung",
      en: "The privacy policy",
    },
    description: {
      fr: "Les mentions obligatoires d'une politique de confidentialité nLPD, pour un site web comme pour la gestion RH.",
      de: "Die Pflichtangaben einer DSG-konformen Datenschutzerklärung, für die Website wie für den HR-Bereich.",
      en: "The mandatory content of a FADP-compliant privacy policy, for a website as well as for HR.",
    },
    updatedAt: "2026-09-25",
  },
  {
    slug: "sanctions-nlpd",
    title: {
      fr: "Sanctions nLPD : amendes et risques pour les PME et leurs dirigeants",
      de: "DSG-Sanktionen: Bussen und Risiken für KMU und ihre Verantwortlichen",
      en: "FADP penalties: fines and risks for SMEs and their leaders",
    },
    shortTitle: {
      fr: "Les sanctions nLPD",
      de: "Die DSG-Sanktionen",
      en: "FADP penalties",
    },
    description: {
      fr: "Qui peut être sanctionné, dans quels cas, et jusqu'à quel montant : ce que prévoit réellement la loi révisée.",
      de: "Wer sanktioniert werden kann, in welchen Fällen, und bis zu welcher Höhe: was das revidierte Gesetz wirklich vorsieht.",
      en: "Who can be fined, in what cases, and up to how much: what the revised law actually provides for.",
    },
    updatedAt: "2026-09-25",
  },
  {
    slug: "contrat-sous-traitance-dpa",
    title: {
      fr: "Contrat de sous-traitance (DPA) : quand et pourquoi en avoir un",
      de: "Auftragsverarbeitungsvertrag (AVV): wann und warum nötig",
      en: "Data processing agreement (DPA): when and why you need one",
    },
    shortTitle: {
      fr: "Le contrat de sous-traitance (DPA)",
      de: "Der Auftragsverarbeitungsvertrag (AVV)",
      en: "The data processing agreement (DPA)",
    },
    description: {
      fr: "Hébergeur, CRM, comptabilité en ligne : pourquoi ces prestataires doivent être couverts par un contrat de sous-traitance.",
      de: "Hosting, CRM, Online-Buchhaltung: warum diese Dienstleister durch einen Auftragsverarbeitungsvertrag abgedeckt sein müssen.",
      en: "Hosting, CRM, online accounting: why these vendors need to be covered by a data processing agreement.",
    },
    updatedAt: "2026-09-25",
  },
];

export function getGuideArticle(slug: string): GuideArticle | undefined {
  return GUIDE_ARTICLES.find((article) => article.slug === slug);
}

export function getRelatedArticles(slug: string, count = 3): GuideArticle[] {
  return GUIDE_ARTICLES.filter((article) => article.slug !== slug).slice(0, count);
}
