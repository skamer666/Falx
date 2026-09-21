export type FlagTier = "confirme" | "vigilance";

export type FlaggedExplanation = {
  text: string;
  tier: FlagTier;
  source: string;
};

export type CertificateAnalysis = {
  flaggedCount: number;
  confirmedCount: number;
  vigilanceCount: number;
  riskLevel: "faible" | "modéré" | "élevé";
  explanations: FlaggedExplanation[];
  wordCount: number;
  isTextTooShort: boolean;
};

export type CertificateMyth = {
  belief: string;
  reality: string;
  source: string;
};

// Seuil retenu pour permettre une lecture contextuelle plutôt qu'une phrase
// isolée, conformément au principe jurisprudentiel selon lequel un passage ne
// doit jamais être extrait de l'ensemble du document (TF 4A_137/2014, consid. 4).
const MIN_WORD_COUNT = 25;

const FLAGGED_PHRASES: {
  pattern: RegExp;
  explanation: string;
  tier: FlagTier;
  source: string;
}[] = [
  {
    pattern: /rapports? conformes? (à|a) (nos|ses|leurs|vos) attentes/i,
    explanation:
      "Cette tournure a été jugée porteuse d'un sous-entendu défavorable et contraire au principe de bienveillance. La jurisprudence lui préfère « a entretenu de bonnes relations » ou « d'excellentes relations » si la qualité du travailleur le justifie.",
    tier: "confirme",
    source: "Cour d'appel civile du Tribunal cantonal vaudois, HC/2014/8, consid. 5c",
  },
  {
    pattern: /a fait preuve de bonne volont[ée]/i,
    explanation:
      "Formulation répertoriée par la doctrine comme mettant l'accent sur l'intention plutôt que sur le résultat, ce qui peut sous-entendre un rendement jugé insuffisant.",
    tier: "vigilance",
    source:
      "GEISER/MÜLLER, Arbeitsrecht in der Schweiz, 3e éd. 2015, N 700 s., cités in Martin Antipas, Certificats de travail, Neuchâtel 2018",
  },
  {
    pattern: /s['’]est efforc/i,
    explanation:
      "Insiste sur l'effort fourni plutôt que sur l'objectif atteint. La doctrine range cette tournure parmi les formulations susceptibles de nuancer une appréciation en apparence positive.",
    tier: "vigilance",
    source: "Martin Antipas, Certificats de travail, Neuchâtel 2018, ch. VIII",
  },
  {
    pattern: /dans l['’]ensemble/i,
    explanation:
      "Qualificatif restrictif qui nuance l'appréciation positive qui l'accompagne. Son poids réel ne peut s'apprécier qu'à la lumière du reste du certificat.",
    tier: "vigilance",
    source:
      "STREIFF/VON KAENEL/RUDOLPH, Arbeitsvertrag, 7e éd. 2012, N 3b et 9 ad art. 330a CO",
  },
  {
    pattern: /a essay[ée] de/i,
    explanation:
      "Peut insinuer que le résultat visé n'a pas été atteint malgré la tentative. À comparer avec la description des tâches effectivement accomplies ailleurs dans le document.",
    tier: "vigilance",
    source:
      "GEISER/MÜLLER, Arbeitsrecht in der Schweiz, 3e éd. 2015, N 701, cités in Martin Antipas, op. cit.",
  },
  {
    pattern: /a montr[ée] de l['’]int[ée]r[êe]t pour/i,
    explanation:
      "Décrit un intérêt manifesté sans en attester le résultat concret, une tournure régulièrement utilisée pour éviter une critique frontale.",
    tier: "vigilance",
    source:
      "GEISER/MÜLLER, Arbeitsrecht in der Schweiz, 3e éd. 2015, N 701, cités in Martin Antipas, op. cit.",
  },
];

// Idées reçues sur les « codes » de certificat de travail que la jurisprudence
// et la doctrine majoritaire suisses écartent explicitement. Affiché librement
// sur le site : la rigueur de ce contenu (sourcé, y compris quand il va à
// l'encontre du réflexe du visiteur) est le principal signal de confiance de
// l'outil, davantage qu'une liste de mots à décoder.
const MYTHS: CertificateMyth[] = [
  {
    belief:
      "« satisfaction » au lieu de « entière satisfaction » est un code annonçant un collaborateur à éviter.",
    reality:
      "Le Tribunal fédéral a expressément écarté cette lecture et refuse toute surenchère dans l'interprétation des formulations usuelles d'un certificat de travail.",
    source: "TF 4A_137/2014 du 10 juin 2014, consid. 4",
  },
  {
    belief:
      "Il existerait un dictionnaire fixe de codes, valable pour tous les certificats et tous les secteurs.",
    reality:
      "La doctrine majoritaire suisse romande retient au contraire qu'il n'existe aucune interprétation uniforme des codes, ceux-ci variant selon les branches, les employeurs et les époques, et que le recours à des codes devrait être proscrit.",
    source:
      "Subilia/Duc, Droit du travail, Lausanne 2010, N 9 ad art. 330a CO, cités in Martin Antipas, Certificats de travail, Neuchâtel 2018",
  },
  {
    belief:
      "Une formulation isolée suffit à démontrer qu'un certificat est défavorable.",
    reality:
      "Les tribunaux exigent une lecture de l'ensemble du document : un passage ne doit jamais être extrait de son contexte ni surévalué isolément.",
    source: "TF 4A_137/2014, consid. 4",
  },
];

export function analyzeCertificate(text: string): CertificateAnalysis {
  const trimmed = text.trim();
  const wordCount = trimmed.length === 0 ? 0 : trimmed.split(/\s+/).filter(Boolean).length;

  const matches = FLAGGED_PHRASES.filter((entry) => entry.pattern.test(text));
  const confirmedCount = matches.filter((m) => m.tier === "confirme").length;
  const vigilanceCount = matches.length - confirmedCount;

  const riskLevel: CertificateAnalysis["riskLevel"] =
    confirmedCount > 0 ? "élevé" : vigilanceCount > 0 ? "modéré" : "faible";

  return {
    flaggedCount: matches.length,
    confirmedCount,
    vigilanceCount,
    riskLevel,
    explanations: matches.map((m) => ({
      text: m.explanation,
      tier: m.tier,
      source: m.source,
    })),
    wordCount,
    isTextTooShort: wordCount > 0 && wordCount < MIN_WORD_COUNT,
  };
}

export function getCertificateMyths(): CertificateMyth[] {
  return MYTHS;
}
