"use client";

import { useState } from "react";
import { PrimaryButton } from "./ui";
import type { Locale } from "@/i18n/config";

type Answer = "oui" | "non" | "nsp";

type Question = {
  q: string;
  gap: string;
};

type Content = {
  questions: Question[];
  options: { value: Answer; label: string }[];
  riskLow: string;
  riskMedium: string;
  riskHigh: string;
  resultLabel: string;
  scoreCaption: string;
  pointsToFix: (n: number) => string;
  noGapsFound: string;
  ctaFix: (n: number) => string;
  ctaFormalize: string;
  restart: string;
  questionCounter: (current: number, total: number) => string;
  previous: string;
  freeTag: string;
};

const CONTENT: Record<Locale, Content> = {
  fr: {
    questions: [
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
    ],
    options: [
      { value: "oui", label: "Oui" },
      { value: "non", label: "Non" },
      { value: "nsp", label: "Je ne sais pas" },
    ],
    riskLow: "Risque faible",
    riskMedium: "Risque modéré",
    riskHigh: "Risque élevé",
    resultLabel: "Résultat de votre diagnostic",
    scoreCaption: "de conformité nLPD estimée pour votre PME.",
    pointsToFix: (n) => `${n} point${n > 1 ? "s" : ""} à corriger :`,
    noGapsFound:
      "Bonne nouvelle : aucun point bloquant identifié sur ces critères. Le Pack Conformité formalise et documente votre situation pour la rendre opposable en cas de contrôle.",
    ctaFix: (n) => `Corriger ces ${n} point${n > 1 ? "s" : ""} — Pack Conformité nLPD, 590 CHF`,
    ctaFormalize: "Formaliser ma conformité — Pack Conformité nLPD, 590 CHF",
    restart: "Refaire le diagnostic",
    questionCounter: (current, total) => `Question ${current} / ${total}`,
    previous: "Précédent",
    freeTag: "Gratuit · 2 minutes · Résultat immédiat, sans email requis",
  },
  de: {
    questions: [
      {
        q: "Führen Sie ein aktuelles Verarbeitungsverzeichnis?",
        gap: "Verarbeitungsverzeichnis fehlt oder ist unvollständig",
      },
      {
        q: "Hat Ihre Website eine DSG-konforme Datenschutzerklärung?",
        gap: "Datenschutzerklärung fehlt oder ist nicht konform",
      },
      {
        q: "Haben Sie Auftragsverarbeitungsverträge (AVV) mit Ihren Dienstleistern (Hosting, Online-Buchhaltung, CRM)?",
        gap: "Auftragsverarbeitungsverträge (AVV) mit Dienstleistern fehlen",
      },
      {
        q: "Wissen Sie genau, was bei einer Datenschutzverletzung (Leck, Hackerangriff) zu tun ist?",
        gap: "Kein Verfahren für den Fall einer Datenschutzverletzung",
      },
      {
        q: "Regeln Ihre Arbeitsverträge, wie die Daten Ihrer Mitarbeitenden bearbeitet werden?",
        gap: "Arbeitsverträge regeln die HR-Datenbearbeitung nicht konform",
      },
      {
        q: "Haben Sie eine verantwortliche Person für Datenschutzfragen bestimmt?",
        gap: "Keine benannte Ansprechperson für Datenschutz",
      },
    ],
    options: [
      { value: "oui", label: "Ja" },
      { value: "non", label: "Nein" },
      { value: "nsp", label: "Weiss ich nicht" },
    ],
    riskLow: "Geringes Risiko",
    riskMedium: "Mittleres Risiko",
    riskHigh: "Hohes Risiko",
    resultLabel: "Ergebnis Ihrer Diagnose",
    scoreCaption: "geschätzte DSG-Konformität für Ihr KMU.",
    pointsToFix: (n) => `${n} zu behebende${n > 1 ? "" : "r"} Punkt${n > 1 ? "e" : ""} :`,
    noGapsFound:
      "Gute Nachricht : Bei diesen Kriterien wurde kein kritischer Punkt gefunden. Das Compliance-Paket dokumentiert Ihre Situation formell, damit sie im Kontrollfall belegbar ist.",
    ctaFix: (n) => `Diese ${n} Punkt${n > 1 ? "e" : ""} beheben — DSG-Compliance-Paket, CHF 590`,
    ctaFormalize: "Konformität formalisieren — DSG-Compliance-Paket, CHF 590",
    restart: "Diagnose wiederholen",
    questionCounter: (current, total) => `Frage ${current} / ${total}`,
    previous: "Zurück",
    freeTag: "Kostenlos · 2 Minuten · Sofortiges Ergebnis, keine E-Mail nötig",
  },
  en: {
    questions: [
      {
        q: "Do you have an up-to-date record of processing activities?",
        gap: "Missing or incomplete record of processing activities",
      },
      {
        q: "Does your website display a privacy policy compliant with the FADP?",
        gap: "Missing or non-compliant privacy policy",
      },
      {
        q: "Do you have data processing agreements (DPAs) with your vendors (hosting, online accounting, CRM)?",
        gap: "Missing data processing agreements (DPAs) with vendors",
      },
      {
        q: "Do you know exactly what to do in the event of a data breach (leak, hack)?",
        gap: "No procedure in place for data breaches",
      },
      {
        q: "Do your employment contracts specify how employee data is processed?",
        gap: "Employment contracts not compliant on HR data processing",
      },
      {
        q: "Have you designated someone responsible for data protection questions?",
        gap: "No designated data protection contact",
      },
    ],
    options: [
      { value: "oui", label: "Yes" },
      { value: "non", label: "No" },
      { value: "nsp", label: "Not sure" },
    ],
    riskLow: "Low risk",
    riskMedium: "Moderate risk",
    riskHigh: "High risk",
    resultLabel: "Your diagnostic results",
    scoreCaption: "estimated FADP compliance for your SME.",
    pointsToFix: (n) => `${n} point${n > 1 ? "s" : ""} to fix:`,
    noGapsFound:
      "Good news: no blocking issue found on these criteria. The Compliance Pack formalises and documents your situation so it holds up under review.",
    ctaFix: (n) => `Fix these ${n} point${n > 1 ? "s" : ""} — nFADP Compliance Pack, CHF 590`,
    ctaFormalize: "Formalise my compliance — nFADP Compliance Pack, CHF 590",
    restart: "Retake the diagnostic",
    questionCounter: (current, total) => `Question ${current} / ${total}`,
    previous: "Back",
    freeTag: "Free · 2 minutes · Instant result, no email required",
  },
};

function riskLevel(
  score: number,
  content: Content,
): { label: string; tone: "success" | "danger" } {
  if (score >= 80) return { label: content.riskLow, tone: "success" };
  if (score >= 40) return { label: content.riskMedium, tone: "danger" };
  return { label: content.riskHigh, tone: "danger" };
}

export default function Autodiagnostic({
  checkoutHref,
  locale,
  className = "",
}: {
  checkoutHref: string;
  locale: Locale;
  className?: string;
}) {
  const content = CONTENT[locale];
  const [answers, setAnswers] = useState<Answer[]>([]);
  const currentStep = answers.length;
  const isDone = currentStep >= content.questions.length;

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
    const gaps = content.questions
      .filter((_, i) => answers[i] !== "oui")
      .map((q) => q.gap);
    const score = Math.round(
      ((content.questions.length - gaps.length) / content.questions.length) * 100,
    );
    const risk = riskLevel(score, content);

    return (
      <div className={`rounded-2xl border border-border bg-surface p-6 md:p-8 ${className}`}>
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-text-muted">
          {content.resultLabel}
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
          {content.scoreCaption}
        </p>

        {gaps.length > 0 ? (
          <div className="mt-6 border-t border-border pt-6">
            <p className="text-sm font-medium text-text">
              {content.pointsToFix(gaps.length)}
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
            {content.noGapsFound}
          </p>
        )}

        <div className="mt-8 border-t border-border pt-6">
          <PrimaryButton href={checkoutHref} className="w-full px-8 py-3.5 text-base">
            {gaps.length > 0 ? content.ctaFix(gaps.length) : content.ctaFormalize}
          </PrimaryButton>
          <button
            type="button"
            onClick={restart}
            className="mt-4 block w-full text-center text-xs text-text-muted underline decoration-dotted underline-offset-4 hover:text-text"
          >
            {content.restart}
          </button>
        </div>
      </div>
    );
  }

  const question = content.questions[currentStep];

  return (
    <div className={`rounded-2xl border border-border bg-surface p-6 md:p-8 ${className}`}>
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-text-muted">
          {content.questionCounter(currentStep + 1, content.questions.length)}
        </p>
        {currentStep > 0 ? (
          <button
            type="button"
            onClick={goBack}
            className="text-xs text-text-muted underline decoration-dotted underline-offset-4 hover:text-text"
          >
            {content.previous}
          </button>
        ) : null}
      </div>

      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full bg-accent transition-all duration-300"
          style={{
            width: `${(currentStep / content.questions.length) * 100}%`,
          }}
        />
      </div>

      <p className="mt-6 text-lg font-medium leading-snug text-text md:text-xl">
        {question.q}
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        {content.options.map((option) => (
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

      <p className="mt-6 text-center text-xs text-text-muted">{content.freeTag}</p>
    </div>
  );
}
