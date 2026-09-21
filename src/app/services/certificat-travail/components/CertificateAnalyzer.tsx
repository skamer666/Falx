"use client";

import { useState } from "react";
import { PrimaryButton } from "@/components/site/ui";
import PaywallCard from "@/components/site/PaywallCard";
import type { FlagTier } from "@/lib/legal/certificateCodes";

type JevRiskItem = {
  id: string;
  explanation: string;
  tier: FlagTier;
  source: string;
  probability: number;
};

type JevGlobalSignal = {
  id: string;
  label: string;
  probability: number;
};

type AnalysisResult = {
  riskLevel: "faible" | "modéré" | "élevé";
  items: JevRiskItem[];
  globalSignals: JevGlobalSignal[];
};

const RISK_STYLES: Record<AnalysisResult["riskLevel"], string> = {
  faible: "border-success/30 bg-success-soft text-success",
  modéré: "border-accent/30 bg-accent/10 text-accent",
  élevé: "border-danger/30 bg-danger-soft text-danger",
};

const RISK_LABELS: Record<AnalysisResult["riskLevel"], string> = {
  faible: "Aucun point de vigilance identifié",
  modéré: "Point(s) de vigilance identifié(s) selon la doctrine",
  élevé: "Formulation confirmée par la jurisprudence",
};

const TIER_LABELS: Record<FlagTier, string> = {
  confirme: "Confirmé par la jurisprudence",
  vigilance: "À surveiller selon la doctrine",
};

const TIER_STYLES: Record<FlagTier, string> = {
  confirme: "bg-danger-soft text-danger",
  vigilance: "bg-accent/10 text-accent",
};

const MIN_WORD_COUNT = 80;

function wordCount(value: string): number {
  const trimmed = value.trim();
  return trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0;
}

export default function CertificateAnalyzer() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const currentWordCount = wordCount(text);
  const isTooShort = currentWordCount > 0 && currentWordCount < MIN_WORD_COUNT;

  async function handleAnalyze() {
    setError(null);
    setResult(null);
    setIsLoading(true);
    try {
      const response = await fetch("/api/certificate-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "Une erreur est survenue.");
        return;
      }
      setResult(data as AnalysisResult);
    } catch {
      setError("Impossible de contacter le service d'analyse. Réessayez dans un instant.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
      <label htmlFor="certificate-text" className="block text-sm font-medium text-text">
        Collez le certificat de travail complet ici.
      </label>
      <textarea
        id="certificate-text"
        rows={8}
        value={text}
        onChange={(event) => {
          setText(event.target.value);
          setResult(null);
          setError(null);
        }}
        placeholder="Exemple : Madame Dupont a travaillé au sein de notre entreprise du... Elle s'est efforcée de mener à bien les tâches qui lui ont été confiées..."
        className="mt-3 w-full rounded-lg border border-border bg-bg px-4 py-3 text-sm text-text placeholder:text-text-muted/60 focus:border-accent focus:outline-none"
      />
      <p className="mt-2 text-xs text-text-muted">
        Les tribunaux suisses interdisent d&rsquo;isoler une phrase de son
        contexte : collez le certificat complet plutôt qu&rsquo;une phrase
        unique pour une lecture fiable.
      </p>

      <PrimaryButton
        type="button"
        onClick={handleAnalyze}
        disabled={!text.trim() || isTooShort || isLoading}
        className="mt-4 w-full sm:w-auto"
      >
        {isLoading ? "Analyse en cours..." : "Lancer l’analyse (Gratuit)"}
      </PrimaryButton>
      <p className="mt-3 text-xs text-text-muted">
        Aucune donnée conservée après l&rsquo;analyse, conforme nLPD.
      </p>

      {isTooShort ? (
        <p className="mt-4 rounded-lg border border-border bg-bg p-4 text-sm text-text-muted">
          Ce passage est trop court pour une lecture fiable. Collez le
          certificat complet plutôt qu&rsquo;un extrait : la jurisprudence
          l&rsquo;exige, et notre analyse aussi.
        </p>
      ) : null}

      {error ? (
        <p className="mt-4 rounded-lg border border-danger/30 bg-danger-soft p-4 text-sm text-danger">
          {error}
        </p>
      ) : null}

      {result ? (
        <div className="mt-8 border-t border-border pt-8">
          <div
            className={`inline-flex items-center gap-3 rounded-full border px-5 py-2.5 ${RISK_STYLES[result.riskLevel]}`}
          >
            <span className="text-sm font-semibold tracking-tight sm:text-base">
              {result.items.length === 0
                ? RISK_LABELS.faible
                : `${result.items.length} ${result.items.length <= 1 ? "point de vigilance identifié" : "points de vigilance identifiés"}`}
            </span>
          </div>

          {result.items.length > 0 ? (
            <div className="relative mt-6">
              <ul className="space-y-3">
                {result.items.map((item) => (
                  <li key={item.id} className="rounded-lg border border-border bg-bg p-4 text-sm">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${TIER_STYLES[item.tier]}`}
                      >
                        {TIER_LABELS[item.tier]}
                      </span>
                      <span className="text-xs text-text-muted">{item.source}</span>
                    </div>
                    <p className="mt-3 select-none blur-[3px] text-text-muted">
                      {item.explanation}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="mt-6 text-sm leading-relaxed text-text-muted">
              Aucune formulation à risque, confirmée par la jurisprudence ou
              identifiée par la doctrine, détectée dans ce texte.
              L&rsquo;absence de formulation isolée ne dispense pas
              d&rsquo;une lecture de l&rsquo;ensemble du document :
              c&rsquo;est ce que fait le rapport détaillé.
            </p>
          )}

          {result.globalSignals.length > 0 ? (
            <ul className="mt-4 space-y-2">
              {result.globalSignals.map((signal) => (
                <li
                  key={signal.id}
                  className="rounded-lg border border-accent/20 bg-accent/5 p-3 text-xs text-text-muted"
                >
                  {signal.label}
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-8">
            <PaywallCard
              price="99 CHF"
              checkoutHref="/checkout/certificat-travail"
              bullets={[
                "Rapport détaillé, phrase par phrase, avec sources",
                "Texte de remplacement proposé",
                "Mise en demeure formelle prête à envoyer (art. 330a CO)",
              ]}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
