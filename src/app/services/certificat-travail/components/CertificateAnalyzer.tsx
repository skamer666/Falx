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

const RISK_LABELS: Record<CertificateAnalysis["riskLevel"], string> = {
  faible: "Aucun point de vigilance identifié sur cet extrait",
  modéré: "Point(s) de vigilance identifié(s) selon la doctrine",
  élevé: "Formulation confirmée par la jurisprudence",
};

const TIER_LABELS: Record<CertificateAnalysis["explanations"][number]["tier"], string> = {
  confirme: "Confirmé par la jurisprudence",
  vigilance: "À surveiller selon la doctrine",
};

const TIER_STYLES: Record<CertificateAnalysis["explanations"][number]["tier"], string> = {
  confirme: "bg-danger-soft text-danger",
  vigilance: "bg-accent/10 text-accent",
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
      <p className="mt-2 text-xs text-text-muted">
        Les tribunaux suisses interdisent d&rsquo;isoler une phrase de son
        contexte : collez un paragraphe complet plutôt qu&rsquo;une phrase
        unique pour une lecture fiable.
      </p>

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
          {result.isTextTooShort ? (
            <p className="rounded-lg border border-border bg-bg p-4 text-sm text-text-muted">
              Ce passage est trop court pour une lecture fiable. Collez le
              paragraphe entier plutôt qu&rsquo;une phrase isolée : la
              jurisprudence l&rsquo;exige, et notre analyse aussi.
            </p>
          ) : (
            <>
              <div
                className={`inline-flex items-center gap-3 rounded-full border px-5 py-2.5 ${RISK_STYLES[result.riskLevel]}`}
              >
                <span className="text-sm font-semibold tracking-tight sm:text-base">
                  {result.flaggedCount === 0
                    ? RISK_LABELS.faible
                    : `${result.flaggedCount} ${result.flaggedCount <= 1 ? "point de vigilance identifié" : "points de vigilance identifiés"}`}
                </span>
              </div>
              {result.flaggedCount > 0 ? (
                <p className="mt-2 text-xs text-text-muted">
                  {result.confirmedCount > 0
                    ? `Dont ${result.confirmedCount} directement ${result.confirmedCount <= 1 ? "confirmé" : "confirmés"} par un arrêt.`
                    : "Formulations à surveiller, à confirmer au regard de l'ensemble du document."}
                </p>
              ) : null}

              {result.flaggedCount > 0 ? (
                <div className="relative mt-6">
                  <ul className="space-y-3">
                    {result.explanations.map((explanation, index) => (
                      <li
                        key={index}
                        className="rounded-lg border border-border bg-bg p-4 text-sm"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${TIER_STYLES[explanation.tier]}`}
                          >
                            {TIER_LABELS[explanation.tier]}
                          </span>
                          <span className="text-xs text-text-muted">
                            {explanation.source}
                          </span>
                        </div>
                        <p className="mt-3 select-none blur-[3px] text-text-muted">
                          {explanation.text}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="mt-6 text-sm leading-relaxed text-text-muted">
                  Aucune formulation à risque, confirmée par la jurisprudence
                  ou identifiée par la doctrine, détectée sur ce passage.
                  L&rsquo;absence de formulation isolée ne dispense pas d&rsquo;une
                  lecture de l&rsquo;ensemble du document : c&rsquo;est ce que
                  fait le rapport détaillé.
                </p>
              )}

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
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}
