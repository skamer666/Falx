"use client";

import { useMemo, useState } from "react";
import CountdownBadge from "@/components/site/CountdownBadge";
import PaywallCard from "@/components/site/PaywallCard";
import { PrimaryButton } from "@/components/site/ui";
import { evaluateRentIncrease } from "@/lib/legal/rentIndex";

export default function RentCalculator() {
  const [oldRent, setOldRent] = useState("");
  const [newRent, setNewRent] = useState("");
  const [moveInDate, setMoveInDate] = useState("");
  const [noticeDate, setNoticeDate] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const oldValue = Number(oldRent.replace(",", "."));
  const newValue = Number(newRent.replace(",", "."));
  const canCalculate = oldValue > 0 && newValue > 0;

  const result = useMemo(
    () => (submitted && canCalculate ? evaluateRentIncrease(oldValue, newValue) : null),
    [submitted, canCalculate, oldValue, newValue],
  );

  const deadline = useMemo(() => {
    if (!noticeDate) return null;
    const parsed = new Date(noticeDate);
    parsed.setDate(parsed.getDate() + 30);
    return parsed;
  }, [noticeDate]);

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="font-medium text-text">Ancien loyer (CHF/mois)</span>
          <input
            type="number"
            min="0"
            inputMode="decimal"
            value={oldRent}
            onChange={(event) => {
              setOldRent(event.target.value);
              setSubmitted(false);
            }}
            placeholder="1450"
            className="mt-2 w-full rounded-lg border border-border bg-bg px-4 py-3 text-sm text-text placeholder:text-text-muted/60 focus:border-accent focus:outline-none"
          />
        </label>

        <label className="block text-sm">
          <span className="font-medium text-text">Nouveau loyer (CHF/mois)</span>
          <input
            type="number"
            min="0"
            inputMode="decimal"
            value={newRent}
            onChange={(event) => {
              setNewRent(event.target.value);
              setSubmitted(false);
            }}
            placeholder="1580"
            className="mt-2 w-full rounded-lg border border-border bg-bg px-4 py-3 text-sm text-text placeholder:text-text-muted/60 focus:border-accent focus:outline-none"
          />
        </label>

        <label className="block text-sm">
          <span className="font-medium text-text">Date d&rsquo;emménagement</span>
          <input
            type="date"
            value={moveInDate}
            onChange={(event) => setMoveInDate(event.target.value)}
            className="mt-2 w-full rounded-lg border border-border bg-bg px-4 py-3 text-sm text-text focus:border-accent focus:outline-none"
          />
        </label>

        <label className="block text-sm">
          <span className="font-medium text-text">
            Date de réception de l&rsquo;avis de hausse
          </span>
          <input
            type="date"
            value={noticeDate}
            onChange={(event) => setNoticeDate(event.target.value)}
            className="mt-2 w-full rounded-lg border border-border bg-bg px-4 py-3 text-sm text-text focus:border-accent focus:outline-none"
          />
          <span className="mt-1.5 block text-xs text-text-muted">
            Utilisée pour calculer votre délai de contestation.
          </span>
        </label>
      </div>

      <PrimaryButton
        type="button"
        onClick={() => setSubmitted(true)}
        disabled={!canCalculate}
        className="mt-5 w-full sm:w-auto"
      >
        Vérifier la légalité de la hausse
      </PrimaryButton>

      {deadline ? (
        <CountdownBadge deadline={deadline} className="mt-5" />
      ) : null}

      {result ? (
        <div className="mt-8 border-t border-border pt-8">
          <p className="text-sm text-text-muted">
            Hausse constatée : {result.increasePercent.toFixed(1)}%
          </p>
          <p
            className={`mt-2 text-2xl font-semibold tracking-tight ${
              result.potentiallyAbusive ? "text-danger" : "text-success"
            }`}
          >
            {result.potentiallyAbusive
              ? "Hausse potentiellement abusive détectée"
              : "Hausse dans une fourchette usuelle"}
          </p>

          <div className="mt-8">
            <PaywallCard
              price="129 CHF"
              ctaLabel="Obtenir mon kit de contestation"
              checkoutHref="/checkout/hausse-loyer"
              bullets={[
                "Contestation rédigée pour votre Commission de conciliation cantonale",
                "Calcul détaillé au regard du taux hypothécaire de référence",
                "Modèle de courrier et guide d'envoi pas à pas",
              ]}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
