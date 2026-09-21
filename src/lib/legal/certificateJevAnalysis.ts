import { callJev, isNoulAnswer, type JevQuestion } from "./jev";
import type { FlagTier } from "./certificateCodes";

// Catalogue basé sur "Base de connaissances IA - Certificat de travail -
// Thrax Legal" (Google Doc). Contrairement à certificateCodes.ts (regex sur
// un extrait, utilisé par l'outil gratuit), ici Jev évalue le texte COMPLET
// du certificat et détecte des reformulations proches, pas uniquement le
// mot-à-mot. Jev ne rédige jamais l'explication : celle-ci reste la nôtre,
// déjà sourcée et vérifiée.

type RiskCatalogEntry = {
  id: string;
  instructions: string;
  explanation: string;
  tier: FlagTier;
  source: string;
};

const RISK_CATALOG: RiskCatalogEntry[] = [
  {
    id: "rapports_conformes_attentes",
    instructions:
      "Le texte contient-il, au sujet des relations du travailleur avec ses collègues ou les clients, une formulation édulcorée du type « conformes à nos attentes » ou équivalent, plutôt que d'affirmer explicitement de bonnes ou d'excellentes relations ?",
    explanation:
      "Cette tournure a été jugée porteuse d'un sous-entendu défavorable et contraire au principe de bienveillance. La jurisprudence lui préfère « a entretenu de bonnes relations » ou « d'excellentes relations » si la qualité du travailleur le justifie.",
    tier: "confirme",
    source: "Cour d'appel civile du Tribunal cantonal vaudois, HC/2014/8, consid. 5c",
  },
  {
    id: "bonne_volonte",
    instructions:
      "Le texte dit-il du travailleur qu'il « a fait preuve de bonne volonté » ou une formulation très proche mettant l'accent sur l'intention plutôt que sur le résultat obtenu ?",
    explanation:
      "Formulation répertoriée par la doctrine comme mettant l'accent sur l'intention plutôt que sur le résultat, ce qui peut sous-entendre un rendement jugé insuffisant.",
    tier: "vigilance",
    source:
      "GEISER/MÜLLER, Arbeitsrecht in der Schweiz, 3e éd. 2015, N 700 s., cités in Martin Antipas, Certificats de travail, Neuchâtel 2018",
  },
  {
    id: "sest_efforce",
    instructions:
      "Le texte dit-il du travailleur qu'il « s'est efforcé de » accomplir ses tâches, ou une formulation équivalente qui insiste sur l'effort fourni plutôt que sur l'objectif atteint ?",
    explanation:
      "Insiste sur l'effort fourni plutôt que sur l'objectif atteint. La doctrine range cette tournure parmi les formulations susceptibles de nuancer une appréciation en apparence positive.",
    tier: "vigilance",
    source: "Martin Antipas, Certificats de travail, Neuchâtel 2018, ch. VIII",
  },
  {
    id: "dans_ensemble",
    instructions:
      "Le texte utilise-t-il un qualificatif restrictif du type « dans l'ensemble » pour nuancer une appréciation par ailleurs positive sur le travail ou la conduite du travailleur ?",
    explanation:
      "Qualificatif restrictif qui nuance l'appréciation positive qui l'accompagne. Son poids réel ne peut s'apprécier qu'à la lumière du reste du certificat.",
    tier: "vigilance",
    source:
      "STREIFF/VON KAENEL/RUDOLPH, Arbeitsvertrag, 7e éd. 2012, N 3b et 9 ad art. 330a CO",
  },
  {
    id: "a_essaye_de",
    instructions:
      "Le texte dit-il du travailleur qu'il « a essayé de » atteindre un résultat, plutôt que d'affirmer qu'il l'a atteint ?",
    explanation:
      "Peut insinuer que le résultat visé n'a pas été atteint malgré la tentative. À comparer avec la description des tâches effectivement accomplies ailleurs dans le document.",
    tier: "vigilance",
    source:
      "GEISER/MÜLLER, Arbeitsrecht in der Schweiz, 3e éd. 2015, N 701, cités in Martin Antipas, op. cit.",
  },
  {
    id: "montre_interet",
    instructions:
      "Le texte dit-il du travailleur qu'il « a montré de l'intérêt pour » une tâche ou un domaine, sans mentionner de résultat concret obtenu dans ce domaine ?",
    explanation:
      "Décrit un intérêt manifesté sans en attester le résultat concret, une tournure régulièrement utilisée pour éviter une critique frontale.",
    tier: "vigilance",
    source:
      "GEISER/MÜLLER, Arbeitsrecht in der Schweiz, 3e éd. 2015, N 701, cités in Martin Antipas, op. cit.",
  },
];

// Signaux de cohérence globale (section 6 du document de connaissances) :
// ce que le pattern-matching phrase par phrase ne peut pas voir.
const GLOBAL_SIGNAL_QUESTIONS = {
  formulations_generiques: {
    type: "noul",
    instructions:
      "Ce certificat de travail est-il rédigé presque exclusivement à l'aide de formules toutes faites et génériques, sans détail concret sur les tâches, responsabilités ou réalisations effectives du travailleur ?",
  },
  incoherence_motif: {
    type: "noul",
    instructions:
      "Ce texte contient-il une incohérence apparente entre une appréciation globalement positive du travailleur et un motif de fin des rapports de travail mentionné dans le même texte ?",
  },
} satisfies Record<string, JevQuestion>;

export type JevRiskItem = {
  id: string;
  explanation: string;
  tier: FlagTier;
  source: string;
  probability: number;
};

export type JevGlobalSignal = {
  id: keyof typeof GLOBAL_SIGNAL_QUESTIONS;
  label: string;
  probability: number;
};

export type JevCertificateAnalysis = {
  riskLevel: "faible" | "modéré" | "élevé";
  items: JevRiskItem[];
  globalSignals: JevGlobalSignal[];
  model: "jev-latest";
};

const PROBABILITY_THRESHOLD = 0.5;

const GLOBAL_SIGNAL_LABELS: Record<keyof typeof GLOBAL_SIGNAL_QUESTIONS, string> = {
  formulations_generiques:
    "Certificat rédigé de façon largement générique, peu personnalisée",
  incoherence_motif:
    "Incohérence apparente entre l'appréciation générale et le motif de fin des rapports de travail",
};

export async function analyzeCertificateWithJev(
  fullText: string,
): Promise<JevCertificateAnalysis> {
  const questions: Record<string, JevQuestion> = {
    ...Object.fromEntries(
      RISK_CATALOG.map((entry) => [
        entry.id,
        { type: "noul", instructions: entry.instructions } as JevQuestion,
      ]),
    ),
    ...GLOBAL_SIGNAL_QUESTIONS,
  };

  const answers = await callJev({ certificate_text: fullText }, questions);

  const items: JevRiskItem[] = RISK_CATALOG.map((entry) => {
    const answer = answers[entry.id];
    const probability = answer && isNoulAnswer(answer) ? answer.noul : 0;
    return {
      id: entry.id,
      explanation: entry.explanation,
      tier: entry.tier,
      source: entry.source,
      probability,
    };
  }).filter((item) => item.probability >= PROBABILITY_THRESHOLD);

  const globalSignals: JevGlobalSignal[] = (
    Object.keys(GLOBAL_SIGNAL_QUESTIONS) as (keyof typeof GLOBAL_SIGNAL_QUESTIONS)[]
  )
    .map((id) => {
      const answer = answers[id];
      const probability = answer && isNoulAnswer(answer) ? answer.noul : 0;
      return { id, label: GLOBAL_SIGNAL_LABELS[id], probability };
    })
    .filter((signal) => signal.probability >= PROBABILITY_THRESHOLD);

  const confirmedCount = items.filter((item) => item.tier === "confirme").length;
  const riskLevel: JevCertificateAnalysis["riskLevel"] =
    confirmedCount > 0 ? "élevé" : items.length > 0 ? "modéré" : "faible";

  return { riskLevel, items, globalSignals, model: "jev-latest" };
}
