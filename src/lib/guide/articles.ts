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
    slug: "cgv-suisses-guide",
    title: {
      fr: "Rédiger ses CGV en Suisse : le guide complet pour indépendants et PME",
      de: "AGB in der Schweiz erstellen: der vollständige Ratgeber für Selbstständige und KMU",
      en: "Drafting Swiss T&Cs: the complete guide for freelancers and SMEs",
      it: "Redigere le condizioni generali in Svizzera: la guida completa per indipendenti e PMI",
    },
    shortTitle: {
      fr: "Rédiger ses CGV",
      de: "AGB erstellen",
      en: "Drafting T&Cs",
      it: "Redigere le condizioni generali",
    },
    description: {
      fr: "Ce que doivent contenir des CGV suisses valables, les clauses souvent oubliées, et les erreurs qui les rendent inopposables.",
      de: "Was gültige Schweizer AGB enthalten müssen, häufig vergessene Klauseln, und die Fehler, die sie unwirksam machen.",
      en: "What valid Swiss T&Cs must contain, commonly forgotten clauses, and the mistakes that make them unenforceable.",
      it: "Cosa devono contenere condizioni generali svizzere valide, le clausole spesso dimenticate, e gli errori che le rendono inopponibili.",
    },
    updatedAt: "2026-09-29",
  },
  {
    slug: "contrat-de-travail-suisse-pme",
    title: {
      fr: "Contrat de travail en Suisse : ce qu'une PME doit absolument prévoir",
      de: "Arbeitsvertrag in der Schweiz: was ein KMU unbedingt regeln muss",
      en: "Employment contracts in Switzerland: what an SME must get right",
      it: "Contratto di lavoro in Svizzera: cosa una PMI deve assolutamente prevedere",
    },
    shortTitle: {
      fr: "Contrat de travail",
      de: "Arbeitsvertrag",
      en: "Employment contract",
      it: "Contratto di lavoro",
    },
    description: {
      fr: "Période d'essai, délais de congé, clause de non-concurrence : les clauses qui protègent réellement votre entreprise.",
      de: "Probezeit, Kündigungsfristen, Konkurrenzverbot: die Klauseln, die Ihr Unternehmen wirklich schützen.",
      en: "Probation period, notice periods, non-compete clause: the clauses that actually protect your business.",
      it: "Periodo di prova, termini di disdetta, clausola di non concorrenza: le clausole che proteggono davvero la vostra azienda.",
    },
    updatedAt: "2026-09-29",
  },
  {
    slug: "mise-en-demeure-recouvrement-suisse",
    title: {
      fr: "Facture impayée en Suisse : comment rédiger une mise en demeure efficace",
      de: "Unbezahlte Rechnung in der Schweiz: wie Sie eine wirksame Mahnung verfassen",
      en: "Unpaid invoice in Switzerland: how to draft an effective formal notice",
      it: "Fattura non pagata in Svizzera: come redigere una diffida efficace",
    },
    shortTitle: {
      fr: "Facture impayée",
      de: "Unbezahlte Rechnung",
      en: "Unpaid invoice",
      it: "Fattura non pagata",
    },
    description: {
      fr: "Les étapes avant la poursuite (LP) : rappel, mise en demeure, et ce qui donne réellement du poids à votre lettre.",
      de: "Die Schritte vor der Betreibung: Mahnung, Inverzugsetzung, und was Ihrem Schreiben wirklich Gewicht verleiht.",
      en: "The steps before formal debt collection: reminder, formal notice, and what actually gives your letter weight.",
      it: "Le tappe prima dell'esecuzione: sollecito, diffida, e ciò che dà davvero peso alla vostra lettera.",
    },
    updatedAt: "2026-09-29",
  },
  {
    slug: "conformite-nlpd-pme",
    title: {
      fr: "Conformité nLPD pour PME : ce qui est vraiment obligatoire",
      de: "DSG-Konformität für KMU: was wirklich obligatorisch ist",
      en: "FADP compliance for SMEs: what's actually mandatory",
      it: "Conformità nLPD per PMI: cosa è davvero obbligatorio",
    },
    shortTitle: {
      fr: "Conformité nLPD",
      de: "DSG-Konformität",
      en: "FADP compliance",
      it: "Conformità nLPD",
    },
    description: {
      fr: "Registre des traitements, politique de confidentialité, sous-traitants : le strict nécessaire pour une PME, sans usine à gaz.",
      de: "Verarbeitungsverzeichnis, Datenschutzerklärung, Auftragsverarbeiter: das absolut Nötige für ein KMU, ohne Überkomplexität.",
      en: "Records of processing, privacy policy, processors: the strict minimum for an SME, without overengineering.",
      it: "Registro dei trattamenti, informativa sulla privacy, sub-responsabili: il minimo indispensabile per una PMI, senza complicazioni inutili.",
    },
    updatedAt: "2026-09-29",
  },
  {
    slug: "bail-commercial-suisse-guide",
    title: {
      fr: "Bail commercial en Suisse : les clauses à vérifier avant de signer",
      de: "Geschäftsmietvertrag in der Schweiz: die Klauseln, die Sie vor der Unterschrift prüfen sollten",
      en: "Commercial lease in Switzerland: the clauses to check before signing",
      it: "Locazione commerciale in Svizzera: le clausole da verificare prima di firmare",
    },
    shortTitle: {
      fr: "Bail commercial",
      de: "Geschäftsmietvertrag",
      en: "Commercial lease",
      it: "Locazione commerciale",
    },
    description: {
      fr: "Durée, résiliation anticipée, travaux, sous-location : ce qui distingue un bail commercial équilibré d'un piège.",
      de: "Dauer, vorzeitige Kündigung, Umbauten, Untermiete: was einen ausgewogenen Geschäftsmietvertrag von einer Falle unterscheidet.",
      en: "Duration, early termination, works, subletting: what separates a balanced commercial lease from a trap.",
      it: "Durata, disdetta anticipata, lavori, sublocazione: cosa distingue una locazione commerciale equilibrata da una trappola.",
    },
    updatedAt: "2026-09-29",
  },
];

export function getGuideArticle(slug: string): GuideArticle | undefined {
  return GUIDE_ARTICLES.find((article) => article.slug === slug);
}

export function getRelatedArticles(slug: string, count = 3): GuideArticle[] {
  return GUIDE_ARTICLES.filter((article) => article.slug !== slug).slice(0, count);
}
