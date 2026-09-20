export type DebtorType = "pro" | "particulier";

export function estimateRecoveryOdds(
  amount: number,
  debtorType: DebtorType,
): number {
  let odds = debtorType === "pro" ? 72 : 61;
  if (amount > 10000) odds -= 8;
  if (amount < 500) odds -= 5;
  return Math.max(30, Math.min(92, Math.round(odds)));
}

export const BASE_FEE_CHF = 89;
export const SUCCESS_COMMISSION_PERCENT = 15;
