export type FlagTier = "confirme" | "vigilance";

export type CertificateMyth = {
  belief: string;
  reality: string;
  source: string;
};

// Idées reçues sur les « codes » de certificat de travail que la jurisprudence
// et la doctrine majoritaire suisses écartent explicitement. Gardé pour usage
// interne (ne pas afficher sur le site public, voir historique du projet).
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

export function getCertificateMyths(): CertificateMyth[] {
  return MYTHS;
}
