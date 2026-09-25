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
    slug: "comment-contester-une-amende-en-suisse",
    title: {
      fr: "Comment contester une amende en Suisse ? Le guide complet",
      de: "Wie ficht man eine Busse in der Schweiz an? Der vollständige Ratgeber",
      en: "How to contest a fine in Switzerland: the complete guide",
      it: "Come contestare una multa in Svizzera: la guida completa",
    },
    shortTitle: {
      fr: "Comment contester une amende ?",
      de: "Wie eine Busse anfechten?",
      en: "How to contest a fine?",
      it: "Come contestare una multa?",
    },
    description: {
      fr: "Amende d'ordre, ordonnance pénale, opposition : les délais et la procédure à connaître avant d'agir.",
      de: "Ordnungsbusse, Strafbefehl, Einsprache: die Fristen und das Verfahren, die Sie kennen müssen, bevor Sie handeln.",
      en: "Fixed penalty notice, penal order, objection: the deadlines and procedure to know before you act.",
      it: "Multa disciplinare, decreto penale, opposizione: i termini e la procedura da conoscere prima di agire.",
    },
    updatedAt: "2026-09-25",
  },
  {
    slug: "exces-de-vitesse-suisse",
    title: {
      fr: "Excès de vitesse en Suisse : sanctions, retrait de permis et recours",
      de: "Geschwindigkeitsübertretung in der Schweiz: Sanktionen, Ausweisentzug und Einsprache",
      en: "Speeding in Switzerland: penalties, licence suspension and appeals",
      it: "Eccesso di velocità in Svizzera: sanzioni, ritiro della licenza e ricorso",
    },
    shortTitle: {
      fr: "Excès de vitesse",
      de: "Geschwindigkeitsübertretung",
      en: "Speeding",
      it: "Eccesso di velocità",
    },
    description: {
      fr: "Les seuils qui changent tout, la différence entre amende et mesure administrative, et vos options pour réagir.",
      de: "Die Schwellenwerte, auf die es ankommt, der Unterschied zwischen Busse und Administrativmassnahme, und Ihre Handlungsoptionen.",
      en: "The thresholds that change everything, the difference between a fine and a licence measure, and your options.",
      it: "Le soglie che cambiano tutto, la differenza tra multa e misura amministrativa, e le vostre opzioni.",
    },
    updatedAt: "2026-09-25",
  },
  {
    slug: "amende-stationnement",
    title: {
      fr: "Amende de stationnement : quand et comment la contester",
      de: "Parkbusse: wann und wie man sie anficht",
      en: "Parking fine: when and how to contest it",
      it: "Multa per parcheggio: quando e come contestarla",
    },
    shortTitle: {
      fr: "Amende de stationnement",
      de: "Parkbusse",
      en: "Parking fine",
      it: "Multa per parcheggio",
    },
    description: {
      fr: "Signalisation mal placée, véhicule prêté, disque oublié : les cas les plus fréquents où une contestation a une chance.",
      de: "Falsch platzierte Signalisation, verliehenes Fahrzeug, vergessene Parkscheibe: die häufigsten Fälle mit Erfolgschancen.",
      en: "Poorly placed signage, a borrowed car, a forgotten parking disc: the most common cases with real chances.",
      it: "Segnaletica mal posizionata, veicolo prestato, disco orario dimenticato: i casi più frequenti con reali possibilità.",
    },
    updatedAt: "2026-09-25",
  },
  {
    slug: "amende-cff-sans-billet",
    title: {
      fr: "Amende CFF sans billet : peut-on la contester ?",
      de: "SBB-Busse ohne Billett: Kann man sie anfechten?",
      en: "SBB/CFF fine for travelling without a ticket: can you contest it?",
      it: "Multa FFS senza biglietto: si può contestare?",
    },
    shortTitle: {
      fr: "Amende CFF sans billet",
      de: "SBB-Busse ohne Billett",
      en: "SBB/CFF fine",
      it: "Multa FFS senza biglietto",
    },
    description: {
      fr: "Panne de l'app, correspondance ratée, distributeur en panne : ce qui marche vraiment face aux CFF.",
      de: "App-Ausfall, verpasster Anschluss, defekter Automat: was gegenüber den SBB wirklich funktioniert.",
      en: "App failure, missed connection, broken ticket machine: what actually works against SBB/CFF.",
      it: "Guasto dell'app, coincidenza persa, distributore guasto: cosa funziona davvero contro le FFS.",
    },
    updatedAt: "2026-09-25",
  },
  {
    slug: "vices-de-procedure-amende-suisse",
    title: {
      fr: "Vices de procédure : le motif de contestation le plus solide et le moins connu",
      de: "Verfahrensmängel: der stärkste und am wenigsten bekannte Einspruchsgrund",
      en: "Procedural defects: the strongest and least-known ground for contesting a fine",
      it: "Vizi di procedura: il motivo di contestazione più solido e meno conosciuto",
    },
    shortTitle: {
      fr: "Vices de procédure",
      de: "Verfahrensmängel",
      en: "Procedural defects",
      it: "Vizi di procedura",
    },
    description: {
      fr: "Certificat de vérification du radar, preuve vidéo d'un particulier, signalisation insuffisante : les failles techniques que la police doit démontrer, pas vous.",
      de: "Radar-Eichzertifikat, Video eines Privaten, unzureichende Signalisation: die technischen Mängel, die die Polizei beweisen muss, nicht Sie.",
      en: "Radar verification certificate, private video evidence, insufficient signage: the technical flaws the authority must prove, not you.",
      it: "Certificato di verifica del radar, prova video di un privato, segnaletica insufficiente: le lacune tecniche che la polizia deve dimostrare, non voi.",
    },
    updatedAt: "2026-09-25",
  },
  {
    slug: "defaut-traduction-amende-suisse",
    title: {
      fr: "Amende non traduite : un motif de nullité que peu de gens connaissent",
      de: "Nicht übersetzte Busse: ein kaum bekannter Nichtigkeitsgrund",
      en: "Untranslated fine: a little-known ground for nullity",
      it: "Multa non tradotta: un motivo di nullità poco conosciuto",
    },
    shortTitle: {
      fr: "Amende non traduite",
      de: "Nicht übersetzte Busse",
      en: "Untranslated fine",
      it: "Multa non tradotta",
    },
    description: {
      fr: "Si l'amende ou l'ordonnance pénale n'est pas dans une langue que vous comprenez, la procédure peut être frappée de nullité absolue.",
      de: "Ist die Busse oder der Strafbefehl nicht in einer Sprache verfasst, die Sie verstehen, kann das Verfahren absolut nichtig sein.",
      en: "If the fine or penal order isn't in a language you understand, the proceedings may be absolutely null.",
      it: "Se la multa o il decreto penale non sono in una lingua che comprendete, il procedimento può essere assolutamente nullo.",
    },
    updatedAt: "2026-09-25",
  },
  {
    slug: "retrait-de-permis",
    title: {
      fr: "Retrait de permis en Suisse : ce qu'il faut savoir",
      de: "Führerausweisentzug in der Schweiz: was Sie wissen müssen",
      en: "Licence suspension in Switzerland: what you need to know",
      it: "Ritiro della licenza in Svizzera: cosa c'è da sapere",
    },
    shortTitle: {
      fr: "Retrait de permis",
      de: "Führerausweisentzug",
      en: "Licence suspension",
      it: "Ritiro della licenza",
    },
    description: {
      fr: "Une procédure séparée de l'amende, avec ses propres règles : durée, motifs, et marge de manœuvre réelle.",
      de: "Ein von der Busse getrenntes Verfahren mit eigenen Regeln: Dauer, Gründe und tatsächlicher Handlungsspielraum.",
      en: "A separate procedure from the fine, with its own rules: duration, grounds, and real room to manoeuvre.",
      it: "Una procedura separata dalla multa, con proprie regole: durata, motivi e reale margine di manovra.",
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
