"use client";

import { useState } from "react";
import PaywallCard from "@/components/site/PaywallCard";
import { PrimaryButton } from "@/components/site/ui";
import {
  BASE_FEE_CHF,
  SUCCESS_COMMISSION_PERCENT,
  estimateRecoveryOdds,
  type DebtorType,
} from "@/lib/legal/debtRecovery";

const CANTONS = [
  "Vaud",
  "Genève",
  "Fribourg",
  "Valais",
  "Neuchâtel",
  "Jura",
  "Autre canton",
];

export default function DebtCalculator() {
  const [amount, setAmount] = useState("");
  const [debtorType, setDebtorType] = useState<DebtorType>("pro");
  const [canton, setCanton] = useState(CANTONS[0]);
  const [odds, setOdds] = useState<number | null>(null);

  const numericAmount = Number(amount.replace(",", "."));
  const canCalculate = amount.trim() !== "" && numericAmount > 0;

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="font-medium text-text">Montant de la facture (CHF)</span>
          <input
            type="number"
            min="0"
            inputMode="decimal"
            value={amount}
            onChange={(event) => {
              setAmount(event.target.value);
              setOdds(null);
            }}
            placeholder="3200"
            className="mt-2 w-full rounded-lg border border-border bg-bg px-4 py-3 text-sm text-text placeholder:text-text-muted/60 focus:border-accent focus:outline-none"
          />
        </label>

        <label className="block text-sm">
          <span className="font-medium text-text">Débiteur</span>
          <select
            value={debtorType}
            onChange={(event) => {
              setDebtorType(event.target.value as DebtorType);
              setOdds(null);
            }}
            className="mt-2 w-full rounded-lg border border-border bg-bg px-4 py-3 text-sm text-text focus:border-accent focus:outline-none"
          >
            <option value="pro">Client professionnel</option>
            <option value="particulier">Particulier</option>
          </select>
        </label>

        <label className="block text-sm sm:col-span-2">
          <span className="font-medium text-text">Canton</span>
          <select
            value={canton}
            onChange={(event) => setCanton(event.target.value)}
            className="mt-2 w-full rounded-lg border border-border bg-bg px-4 py-3 text-sm text-text focus:border-accent focus:outline-none"
          >
            {CANTONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>

      <PrimaryButton
        type="button"
        onClick={() => setOdds(estimateRecoveryOdds(numericAmount, debtorType))}
        disabled={!canCalculate}
        className="mt-5 w-full sm:w-auto"
      >
        Estimer mes chances de succès
      </PrimaryButton>

      {odds !== null ? (
        <div className="mt-8 border-t border-border pt-8">
          <p className="text-sm text-text-muted">
            Estimation pour une créance de {numericAmount.toLocaleString("fr-CH")}
            &nbsp;CHF dans le canton de {canton}
          </p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-text">
            {odds}% de chances de recouvrement
          </p>

          <div className="mt-8">
            <PaywallCard
              price={`${BASE_FEE_CHF} CHF`}
              ctaLabel="Ouvrir ma poursuite"
              checkoutHref="/checkout/recouvrement"
              bullets={[
                "Génération et dépôt de la réquisition de poursuite officielle",
                "Suivi de la procédure depuis votre espace client",
                `${SUCCESS_COMMISSION_PERCENT}% de commission, uniquement sur les montants effectivement récupérés`,
              ]}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
