"use client";

import { useState } from "react";
import { runPlanStepAction, startPlanAction } from "@/app/[locale]/admin/seo/actions";

type StepState = { label: string; status: "waiting" | "running" | "done" | "error"; detail?: string };

/** Lance le plan de recherche étape par étape (une requête courte par étape). */
export default function SeoPlanRunner({ disabled }: { disabled: boolean }) {
  const [steps, setSteps] = useState<StepState[]>([]);
  const [running, setRunning] = useState(false);
  const [batch, setBatch] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  async function run() {
    if (!window.confirm("Lancer la recherche complète ? Coût estimé : environ 0,50 USD sur votre compte DataForSEO.")) return;
    setRunning(true);
    setTotal(0);
    try {
      const plan = await startPlanAction();
      setBatch(plan.batch);
      const state: StepState[] = plan.steps.map((label) => ({ label, status: "waiting" }));
      setSteps([...state]);
      let cost = 0;
      for (let i = 0; i < plan.steps.length; i++) {
        state[i] = { ...state[i], status: "running" };
        setSteps([...state]);
        const result = await runPlanStepAction(plan.batch, plan.shareToken, i);
        cost += result.cost;
        setTotal(cost);
        state[i] = result.ok
          ? { ...state[i], status: "done", detail: `${result.rows} lignes` }
          : { ...state[i], status: "error", detail: result.error ?? "erreur" };
        setSteps([...state]);
        // Identifiants refusés : inutile de continuer.
        if (!result.ok && /4010\d|not authorized|introuvables/i.test(result.error ?? "")) break;
      }
    } catch (error) {
      setSteps((prev) => [...prev, { label: "Interruption", status: "error", detail: error instanceof Error ? error.message : String(error) }]);
    }
    setRunning(false);
  }

  const icon = { waiting: "·", running: "…", done: "✓", error: "!" } as const;

  return (
    <div>
      <button
        type="button"
        onClick={run}
        disabled={disabled || running}
        className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-bg transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
      >
        {running ? "Recherche en cours…" : "Lancer la recherche complète"}
      </button>
      {steps.length ? (
        <ul className="mt-4 space-y-1.5 text-sm">
          {steps.map((step, index) => (
            <li key={index} className={step.status === "error" ? "text-danger" : "text-text-muted"}>
              <span className="mr-2 inline-block w-4 text-center font-semibold text-text">{icon[step.status]}</span>
              {step.label}
              {step.detail ? <span className="ml-2 text-xs">({step.detail})</span> : null}
            </li>
          ))}
        </ul>
      ) : null}
      {batch && !running ? (
        <p className="mt-4 text-sm">
          Terminé, coût total : {total.toFixed(3)} USD.{" "}
          <a href={`/fr/admin/seo/${batch}`} className="font-medium underline underline-offset-4">
            Voir le rapport et son lien de partage
          </a>
        </p>
      ) : null}
    </div>
  );
}
