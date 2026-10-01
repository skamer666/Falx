import type { Locale } from "@/i18n/config";

export type GuideArticle = {
  slug: string;
  title: Record<Locale, string>;
  /** Titre court utilisé dans les listes et le maillage interne. */
  shortTitle: Record<Locale, string>;
  description: Record<Locale, string>;
  /** Titre affiché dans Google (≤ 60 caractères environ). */
  metaTitle?: Record<Locale, string>;
  publishedAt: string;
  updatedAt: string;
};

export const GUIDE_ARTICLES: GuideArticle[] = [
  {
    slug: "cgv-suisses-guide",
    title: {
      fr: "CGV en Suisse : le guide complet pour rédiger des conditions générales valables",
      de: "AGB in der Schweiz: der vollständige Leitfaden für gültige Allgemeine Geschäftsbedingungen",
      en: "Terms and conditions in Switzerland: the complete guide to drafting valid T&Cs",
      it: "Condizioni generali in Svizzera: la guida completa per redigerle in modo valido",
    },
    shortTitle: {
      fr: "Rédiger ses CGV",
      de: "AGB erstellen",
      en: "Drafting T&Cs",
      it: "Redigere le condizioni generali",
    },
    description: {
      fr: "Comment rédiger des CGV valables en Suisse : clauses essentielles, règle de l’insolite, B2B ou B2C, erreurs fréquentes et checklist.",
      de: "So erstellen Sie gültige AGB in der Schweiz: wichtige Klauseln, Ungewöhnlichkeitsregel, B2B oder B2C, häufige Fehler und Checkliste.",
      en: "How to draft valid terms and conditions in Switzerland: key clauses, the unusual-clause rule, B2B vs B2C, common mistakes and a checklist.",
      it: "Come redigere condizioni generali valide in Svizzera: clausole essenziali, regola dell’insolito, B2B o B2C, errori frequenti e checklist.",
    },
    metaTitle: {
      fr: "CGV en Suisse : guide complet et checklist | Thrax Legal",
      de: "AGB in der Schweiz: Leitfaden und Checkliste | Thrax Legal",
      en: "Swiss terms and conditions: complete guide | Thrax Legal",
      it: "Condizioni generali in Svizzera: guida completa | Thrax Legal",
    },
    publishedAt: "2026-09-29",
    updatedAt: "2026-10-01",
  },
  {
    slug: "contrat-de-travail-suisse-pme",
    title: {
      fr: "Contrat de travail en Suisse : guide complet, exemple et clauses pour les PME",
      de: "Arbeitsvertrag in der Schweiz: Kündigungsfristen, Probezeit, Überstunden – der Leitfaden für KMU",
      en: "Employment contracts in Switzerland: the complete guide for SMEs",
      it: "Contratto di lavoro in Svizzera: la guida completa per le PMI",
    },
    shortTitle: {
      fr: "Contrat de travail",
      de: "Arbeitsvertrag",
      en: "Employment contract",
      it: "Contratto di lavoro",
    },
    description: {
      fr: "Exemple de structure, période d’essai, délais de congé, heures supplémentaires, maladie, non-concurrence : un contrat de travail suisse solide.",
      de: "Kündigungsfristen, Probezeit, Überstunden, Lohnfortzahlung, Konkurrenzverbot, Beispielaufbau: was ein Schweizer Arbeitsvertrag regeln muss.",
      en: "Probation, notice periods, overtime, sick pay, non-compete clauses, social insurance: what a Swiss employment contract must cover.",
      it: "Periodo di prova, disdetta, ore supplementari, malattia, divieto di concorrenza, assicurazioni sociali: cosa prevedere nel contratto di lavoro.",
    },
    metaTitle: {
      fr: "Contrat de travail suisse : guide et exemple | Thrax Legal",
      de: "Arbeitsvertrag & Kündigungsfrist Schweiz | Thrax Legal",
      en: "Swiss employment contracts: SME guide 2026 | Thrax Legal",
      it: "Contratto di lavoro in Svizzera: guida PMI | Thrax Legal",
    },
    publishedAt: "2026-09-29",
    updatedAt: "2026-10-01",
  },
  {
    slug: "mise-en-demeure-recouvrement-suisse",
    title: {
      fr: "Mise en demeure en Suisse : modèle, poursuite et facture impayée, étape par étape",
      de: "Betreibung in der Schweiz: Mahnung, Zahlungsbefehl und Rechtsvorschlag Schritt für Schritt",
      en: "Unpaid invoice in Switzerland: formal notice, debt collection and recovery step by step",
      it: "Fattura non pagata in Svizzera: diffida, esecuzione e recupero passo dopo passo",
    },
    shortTitle: {
      fr: "Mise en demeure et poursuite",
      de: "Mahnung und Betreibung",
      en: "Unpaid invoice",
      it: "Fattura non pagata",
    },
    description: {
      fr: "Modèle de mise en demeure, réquisition de poursuite, commandement de payer, opposition, extrait des poursuites : récupérer une facture impayée en Suisse.",
      de: "Mahnung, Betreibungsbegehren, Zahlungsbefehl, Rechtsvorschlag, Rechtsöffnung, Betreibungsregisterauszug: so treiben Sie eine offene Rechnung ein.",
      en: "Reminders, formal notice, interest, debt collection, objections, limitation periods: how to recover an unpaid invoice in Switzerland, step by step.",
      it: "Sollecito, diffida, interessi, esecuzione, opposizione, rigetto, prescrizione: come recuperare una fattura non pagata in Svizzera, passo dopo passo.",
    },
    metaTitle: {
      fr: "Mise en demeure en Suisse : modèle et poursuite | Thrax Legal",
      de: "Betreibung Schweiz: Mahnung bis Zahlungsbefehl | Thrax Legal",
      en: "Unpaid invoice in Switzerland: what to do | Thrax Legal",
      it: "Fattura non pagata in Svizzera: cosa fare? | Thrax Legal",
    },
    publishedAt: "2026-09-29",
    updatedAt: "2026-10-01",
  },
  {
    slug: "conformite-nlpd-pme",
    title: {
      fr: "nLPD (loi suisse sur la protection des données) : ce que votre PME doit faire",
      de: "DSG Schweiz: was Ihr KMU nach dem neuen Datenschutzgesetz wirklich tun muss",
      en: "Swiss FADP: what your SME really needs to do (guide and checklist)",
      it: "Nuova LPD: cosa deve davvero fare la vostra PMI (guida e checklist)",
    },
    shortTitle: {
      fr: "Conformité nLPD",
      de: "DSG-Konformität",
      en: "FADP compliance",
      it: "Conformità LPD",
    },
    description: {
      fr: "Politique de confidentialité, sous-traitants, transferts à l’étranger, sécurité, fuites, cookies, IA : les obligations nLPD concrètes pour une PME suisse.",
      de: "Datenschutzerklärung, Auftragsbearbeiter, Auslandsübermittlung, Sicherheit, Datenpannen, Cookies, KI: die konkreten DSG-Pflichten für Schweizer KMU.",
      en: "Privacy policy, processors, transfers abroad, security, data breaches, cookies, AI: the practical obligations of the Swiss FADP for SMEs.",
      it: "Informativa privacy, responsabili del trattamento, trasferimenti all’estero, sicurezza, violazioni, cookie, IA: gli obblighi LPD concreti per le PMI.",
    },
    metaTitle: {
      fr: "nLPD : obligations des PME et checklist 2026 | Thrax Legal",
      de: "DSG Schweiz für KMU: Pflichten und Checkliste | Thrax Legal",
      en: "Swiss FADP for SMEs: duties and checklist | Thrax Legal",
      it: "Nuova LPD per PMI: obblighi e checklist | Thrax Legal",
    },
    publishedAt: "2026-09-29",
    updatedAt: "2026-10-01",
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
      fr: "Durée, loyer indexé ou échelonné, charges, travaux, remise en état, transfert, résiliation : signer un bail commercial en Suisse sans mauvaise surprise.",
      de: "Dauer, Index- oder Staffelmiete, Nebenkosten, Umbauten, Rückbau, Übertragung, Kündigung: Geschäftsräume in der Schweiz ohne böse Überraschung mieten.",
      en: "Term, indexed or stepped rent, charges, fit-out works, reinstatement, transfer, termination: signing a Swiss commercial lease without surprises.",
      it: "Durata, pigione indicizzata o scalare, spese accessorie, lavori, ripristino, trasferimento, disdetta: firmare una locazione commerciale senza sorprese.",
    },
    metaTitle: {
      fr: "Bail commercial en Suisse : clauses à vérifier | Thrax Legal",
      de: "Geschäftsmiete Schweiz: Klauseln prüfen | Thrax Legal",
      en: "Commercial lease in Switzerland: key clauses | Thrax Legal",
      it: "Locazione commerciale in Svizzera: clausole | Thrax Legal",
    },
    publishedAt: "2026-09-29",
    updatedAt: "2026-10-01",
  },
];

export function getGuideArticle(slug: string): GuideArticle | undefined {
  return GUIDE_ARTICLES.find((article) => article.slug === slug);
}

export function getRelatedArticles(slug: string, count = 3): GuideArticle[] {
  return GUIDE_ARTICLES.filter((article) => article.slug !== slug).slice(0, count);
}
