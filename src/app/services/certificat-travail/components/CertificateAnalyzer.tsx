"use client";

import { useState } from "react";
import { PrimaryButton } from "@/components/site/ui";
import PaywallCard from "@/components/site/PaywallCard";
import {
  analyzeCertificate,
  type CertificateAnalysis,
} from "@/lib/legal/certificateCodes";

const RISK_STYLES: Record<CertificateAnalysis["riskLevel"], string> = {
  faible: "border-success/30 bg-success-soft text-success",
  modéré: "border-accent/30 bg-accent/10 text-accent",
  élevé: "border-danger/30 bg-danger-soft text-danger",
};

export default function CertificateAnalyzer() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<CertificateAnalysis | null>(null);

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
      <label htmlFor="certificate-text" className="block text-sm font-medium text-text">
        Collez le paragraphe &laquo;&nbsp;Évaluation&nbsp;&raquo; de votre certificat ici.
      </label>
      <textarea
        id="certificate-text"
        rows={6}
        value={text}
        onChange={(event) => {
          setText(event.target.value);
          setResult(null);
        }}
        placeholder="Exemple : Madame Dupont s'est efforcée de mener à bien les tâches qui lui ont été confiées..."
        className="mt-3 w-full rounded-lg border border-border bg-bg px-4 py-3 text-sm text-text placeholder:text-text-muted/60 focus:border-accent focus:outline-none"
      />

      <PrimaryButton
        type="button"
        onClick={() => setResult(analyzeCertificate(text))}
        disabled={!text.trim()}
        className="mt-4 w-full sm:w-auto"
      >
        Lancer l&rsquo;analyse (Gratuit)
      </PrimaryButton>
      <p className="mt-3 text-xs text-text-muted">
        Aucune donnée conservée après l&rsquo;analyse, conforme nLPD.
      </p>

      {result ? (
        <div className="mt-8 border-t border-border pt-8">
          <div
            className={`inline-flex items-center gap-3 rounded-full border px-5 py-2.5 ${RISK_STYLES[result.riskLevel]}`}
          >
            <span className="text-lg font-semibold tracking-tight">
              {result.flaggedCount}{" "}
              {result.flaggedCount <= 1 ? "phrase codée détectée" : "phrases codées détectées"}
            </span>
          </div>

          {result.flaggedCount > 0 ? (
            <div className="relative mt-6">
              <ul className="space-y-3 blur-[3px] select-none">
                {result.explanations.map((explanation, index) => (
                  <li
                    key={index}
                    className="rounded-lg border border-border bg-bg p-4 text-sm text-text-muted"
                  >
                    {explanation}
                  </li>
                ))}
              </ul>
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-surface via-surface/70 to-transparent"
              />
            </div>
          ) : (
            <p className="mt-6 text-sm leading-relaxed text-text-muted">
              Aucune formulation codée courante détectée sur ce passage. Pour
              une revue complète de l&rsquo;ensemble du document, le rapport
              détaillé reste recommandé.
            </p>
          )}

          <div className="mt-8">
            <PaywallCard
              price="179 CHF"
              checkoutHref="/checkout/certificat-travail"
              bullets={[
                "Rapport détaillé, phrase par phrase",
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
