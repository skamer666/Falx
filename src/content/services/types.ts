export type ServiceText = {
  /** Nom de la prestation (titre H1, cartes). */
  name: string;
  /** Une phrase pour les cartes et la meta description (~120 caractères). */
  short: string;
  /** Paragraphe d'introduction de la fiche. */
  intro: string;
  /** Ce qui est inclus. */
  included: string[];
  /** Ce qu'il nous faut pour commencer. */
  needs: string;
  /** « Bon à savoir » : règle juridique, délai, piège à éviter. */
  note: string;
  faq: { q: string; a: string }[];
};

export type CategoryText = {
  name: string;
  /** Sous-titre court de la catégorie. */
  lead: string;
};
