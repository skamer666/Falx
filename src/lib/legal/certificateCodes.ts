export type CertificateAnalysis = {
  flaggedCount: number;
  riskLevel: "faible" | "modéré" | "élevé";
  explanations: string[];
};

const CODE_PHRASES: { pattern: RegExp; explanation: string }[] = [
  {
    pattern: /a fait preuve de bonne volont[ée]/i,
    explanation:
      "Cette formulation est classiquement associée à un rendement jugé insuffisant.",
  },
  {
    pattern: /s['’]est efforc/i,
    explanation:
      "Sous-entend que les objectifs n'ont pas été pleinement atteints malgré les efforts fournis.",
  },
  {
    pattern: /dans l['’]ensemble/i,
    explanation:
      "Ce qualificatif limitatif nuance fortement l'appréciation positive qui l'accompagne.",
  },
  {
    pattern: /a essay[ée] de/i,
    explanation: "Insinue un résultat non atteint malgré la tentative.",
  },
  {
    pattern: /sociable/i,
    explanation:
      "Utilisé seul, sans référence aux compétences professionnelles, ce terme est parfois employé comme formulation codée.",
  },
  {
    pattern: /a montr[ée] de l['’]int[ée]r[êe]t pour/i,
    explanation:
      "Suggère un intérêt sans résultat concret associé, souvent utilisé pour éviter une critique directe.",
  },
];

export function analyzeCertificate(text: string): CertificateAnalysis {
  const matches = CODE_PHRASES.filter((entry) => entry.pattern.test(text));

  const riskLevel: CertificateAnalysis["riskLevel"] =
    matches.length === 0 ? "faible" : matches.length <= 2 ? "modéré" : "élevé";

  return {
    flaggedCount: matches.length,
    riskLevel,
    explanations: matches.map((m) => m.explanation),
  };
}
