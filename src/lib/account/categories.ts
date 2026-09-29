import type { Locale } from "@/i18n/config";

export const DOSSIER_CATEGORIES = [
  "contrat",
  "litige",
  "travail",
  "recouvrement",
  "nlpd",
  "bail",
  "autre",
] as const;

export type DossierCategory = (typeof DOSSIER_CATEGORIES)[number];

export const CATEGORY_LABELS: Record<Locale, Record<DossierCategory, string>> = {
  fr: {
    contrat: "Contrat commercial ou CGV",
    litige: "Litige à régler",
    travail: "Droit du travail",
    recouvrement: "Recouvrement de créance",
    nlpd: "Conformité nLPD",
    bail: "Bail commercial",
    autre: "Autre demande",
  },
  de: {
    contrat: "Handelsvertrag oder AGB",
    litige: "Zu lösender Streitfall",
    travail: "Arbeitsrecht",
    recouvrement: "Forderungseinzug",
    nlpd: "DSG-Konformität",
    bail: "Geschäftsmietvertrag",
    autre: "Andere Anfrage",
  },
  en: {
    contrat: "Commercial contract or T&Cs",
    litige: "Dispute to resolve",
    travail: "Employment law",
    recouvrement: "Debt collection",
    nlpd: "FADP compliance",
    bail: "Commercial lease",
    autre: "Other request",
  },
  it: {
    contrat: "Contratto commerciale o condizioni generali",
    litige: "Controversia da risolvere",
    travail: "Diritto del lavoro",
    recouvrement: "Recupero crediti",
    nlpd: "Conformità nLPD",
    bail: "Locazione commerciale",
    autre: "Altra richiesta",
  },
};

export const STATUS_LABELS: Record<Locale, Record<"nouveau" | "en_cours" | "traite", string>> = {
  fr: { nouveau: "Reçu", en_cours: "En cours", traite: "Traité" },
  de: { nouveau: "Erhalten", en_cours: "In Bearbeitung", traite: "Erledigt" },
  en: { nouveau: "Received", en_cours: "In progress", traite: "Completed" },
  it: { nouveau: "Ricevuto", en_cours: "In corso", traite: "Trattato" },
};
