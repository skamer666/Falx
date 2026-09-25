"use client";

import { useState } from "react";
import { PrimaryButton } from "./ui";

type Answer = "oui" | "non" | "nsp";

type Question = {
  q: string;
  gap: string;
};

const QUESTIONS: Question[] = [
  {
    q: "Avez-vous un registre des traitements de données à jour ?",
    gap: "Registre des traitements manquant ou incomplet",
  },
  {
    q: "Votre site web affiche-t-il une politique de confidentialité conforme à la nLPD ?",
    gap: "Politique de confidentialité absente ou non conforme",
  },
  {
    q: "Avez-vous des contrats de sous-traitance (DPA) avec vos prestataires (hébergeur, comptabilité en ligne, CRM) ?",
    gap: "Contrats de sous-traitance (DPA) manquants avec vos prestataires",
  },
  {
    q: "Savez-vous exactement quoi faire en cas de violation de données (fuite, piratage) ?",
    gap: "Aucune procédure en cas de violation de données",
  },
  {
    q: "Vos contrats de travail précisent-ils comment les données de vos employés sont traitées ?",
    gap: "Contrats de travail non conformes sur le traitement des données RH",
  },
  {
    q: "Avez-vous désigné une personne responsable des questions de protection des données ?",
    gap: "Aucun point de contact désigné pour la protection des données",
  },
];

const OPTIONS: { value: Answer; label: string }[] = [
  { value: "oui", label: "Oui" },
  { value: "non", label: "Non" },
  { value: "nsp", label: "Je ne sais pas" },
];

function riskLevel(score: number): { label: string; tone: "success" | "danger" } {
  if (score >= 80) return { label: "Risque faible", tone: "success" };
  if (score >= 40) return { label: "Risque modéré", tone: "danger" };
  return { label: "Risque élevé", tone: "danger" };
}

export default function Autodiagnostic({
  checkoutHref,
  className = "",
}: {
  checkoutHref: string;
  className?: string;
}) {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const currentStep = answers.length;
  const isDone = currentStep >= QUESTIONS.length;

  function answer(value: Answer) {
    setAnswers((prev) => [...prev, value]);
  }

  function goBack() {
    setAnswers((prev) => prev.slice(0, -1));
  }

  function restart() {
    setAnswers([]);
  }

  if (isDone) {
    const gaps = QUESTIONS.filter((_, i) => answers[i] !== "oui").map((q) => q.gap);
    const score = Math.round(((QUESTIONS.length - gaps.length) / QUESTIONS.length) * 100);
    const risk = riskLevel(score);

    return (
      <div className={`rounded-2xl border border-border bg-surface p-6 md:p-8 ${className}`}>
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-text-muted">
          Résultat de votre diagnostic
        </p>
        <div className="mt-4 flex items-baseline gap-4">
          <span className="text-5xl font-semibold tracking-tight text-text">
            {score}%
          </span>
          <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              risk.tone === "success"
                ? "bg-success-soft text-success"
                : "bg-danger-soft text-danger"
            }`}
          >
            {risk.label}
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-text-muted">
          de conformité nLPD estimée pour votre PME.
        </p>

        {gaps.length > 0 ? (
          <div className="mt-6 border-t border-border pt-6">
            <p className="text-sm font-medium text-text">
              {gaps.length} point{gaps.length > 1 ? "s" : ""} à corriger&nbsp;:
            </p>
            <ul className="mt-3 space-y-2.5">
              {gaps.map((gap) => (
                <li
                  key={gap}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-text-muted"
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-danger"
                    aria-hidden
                  />
                  {gap}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="mt-6 border-t border-border pt-6 text-sm leading-relaxed text-text-muted">
            Bonne nouvelle&nbsp;: aucun point bloquant identifié sur ces
            critères. Le Pack Conformité formalise et documente votre
            situation pour la rendre opposable en cas de contrôle.
          </p>
        )}

        <div className="mt-8 border-t border-border pt-6">
          <PrimaryButton href={checkoutHref} className="w-full px-8 py-3.5 text-base">
            {gaps.length > 0
              ? `Corriger ces ${gaps.length} point${gaps.length > 1 ? "s" : ""} — Pack Conformité nLPD, 590 CHF`
              : "Formaliser ma conformité — Pack Conformité nLPD, 590 CHF"}
          </PrimaryButton>
          <button
            type="button"
            onClick={restart}
            className="mt-4 block w-full text-center text-xs text-text-muted underline decoration-dotted underline-offset-4 hover:text-text"
          >
            Refaire le diagnostic
          </button>
        </div>
      </div>
    );
  }

  const question = QUESTIONS[currentStep];

  return (
    <div className={`rounded-2xl border border-border bg-surface p-6 md:p-8 ${className}`}>
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-text-muted">
          Question {currentStep + 1} / {QUESTIONS.length}
        </p>
        {currentStep > 0 ? (
          <button
            type="button"
            onClick={goBack}
            className="text-xs text-text-muted underline decoration-dotted underline-offset-4 hover:text-text"
          >
            Précédent
          </button>
        ) : null}
      </div>

      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full bg-accent transition-all duration-300"
          style={{
            width: `${(currentStep / QUESTIONS.length) * 100}%`,
          }}
        />
      </div>

      <p className="mt-6 text-lg font-medium leading-snug text-text md:text-xl">
        {question.q}
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        {OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => answer(option.value)}
            className="flex-1 rounded-xl border border-border bg-bg px-5 py-3.5 text-sm font-medium text-text transition-colors hover:border-accent hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {option.label}
          </button>
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-text-muted">
        Gratuit &middot; 2 minutes &middot; Résultat immédiat, sans email requis
      </p>
    </div>
  );
}
