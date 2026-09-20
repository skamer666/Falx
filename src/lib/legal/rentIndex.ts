export type RentEvaluation = {
  increasePercent: number;
  potentiallyAbusive: boolean;
};

// Seuil indicatif simplifié : au-delà de cette hausse relative, un contrôle
// détaillé au regard du taux hypothécaire de référence est recommandé.
const ABUSIVE_THRESHOLD_PERCENT = 3;

export function evaluateRentIncrease(
  oldRent: number,
  newRent: number,
): RentEvaluation {
  if (!oldRent || oldRent <= 0) {
    return { increasePercent: 0, potentiallyAbusive: false };
  }
  const increasePercent = ((newRent - oldRent) / oldRent) * 100;
  return {
    increasePercent,
    potentiallyAbusive: increasePercent > ABUSIVE_THRESHOLD_PERCENT,
  };
}
