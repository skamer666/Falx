"use client";

import { useState } from "react";
import { PrimaryButton } from "./ui";
import type { Locale } from "@/i18n/config";

type FineType = "stationnement" | "vitesse" | "cff" | "autre";
type YesNo = "oui" | "non";
type Deadline = "moins10" | "entre10et30" | "plus30";
type Reason = "oui" | "peutetre" | "non";
type StepKey = "type" | "paid" | "deadline" | "reason";

type Answers = {
  type?: FineType;
  paid?: YesNo;
  deadline?: Deadline;
  reason?: Reason;
};

type Content = {
  typeQuestion: string;
  typeOptions: { value: FineType; label: string }[];
  paidQuestion: string;
  paidOptions: { value: YesNo; label: string }[];
  deadlineQuestion: string;
  deadlineOptions: { value: Deadline; label: string }[];
  reasonQuestion: string;
  reasonOptions: { value: Reason; label: string }[];
  questionCounter: (current: number, total: number) => string;
  previous: string;
  freeTag: string;
  paidResultTitle: string;
  paidResultBody: string;
  paidResultTip: string;
  restart: string;
  chancesGood: string;
  chancesUncertain: string;
  chancesLow: string;
  resultLabel: string;
  resultCaptionGood: string;
  resultCaptionUncertain: string;
  resultCaptionLow: string;
  ctaLabel: string;
};

const CONTENT: Record<Locale, Content> = {
  fr: {
    typeQuestion: "Quel type d'amende avez-vous reçu ?",
    typeOptions: [
      { value: "stationnement", label: "Stationnement" },
      { value: "vitesse", label: "Excès de vitesse" },
      { value: "cff", label: "Transport public (CFF)" },
      { value: "autre", label: "Autre infraction" },
    ],
    paidQuestion: "Avez-vous déjà payé cette amende ?",
    paidOptions: [
      { value: "non", label: "Non" },
      { value: "oui", label: "Oui" },
    ],
    deadlineQuestion: "Depuis combien de temps l'avez-vous reçue ?",
    deadlineOptions: [
      { value: "moins10", label: "Moins de 10 jours" },
      { value: "entre10et30", label: "Entre 10 et 30 jours" },
      { value: "plus30", label: "Plus de 30 jours" },
    ],
    reasonQuestion: "Avez-vous un motif concret de contestation (signalisation, erreur, circonstance particulière) ?",
    reasonOptions: [
      { value: "oui", label: "Oui, clairement" },
      { value: "peutetre", label: "Peut-être" },
      { value: "non", label: "Non" },
    ],
    questionCounter: (current, total) => `Question ${current} / ${total}`,
    previous: "Précédent",
    freeTag: "Gratuit · 2 minutes · Résultat immédiat, sans email requis",
    paidResultTitle: "Amende déjà payée",
    paidResultBody:
      "Payer une amende vaut acceptation définitive : il n'existe ensuite aucun recours pour revenir dessus. Ce dossier n'est malheureusement plus contestable.",
    paidResultTip:
      "Pour la prochaine fois : ne payez jamais avant d'avoir vérifié vos options, même « pour être tranquille ».",
    restart: "Refaire le diagnostic",
    chancesGood: "Bonnes chances",
    chancesUncertain: "Chances incertaines",
    chancesLow: "Chances faibles",
    resultLabel: "Résultat de votre diagnostic",
    resultCaptionGood:
      "Votre dossier présente un motif concret et le délai est encore ouvert. Une contestation bien argumentée vaut la peine.",
    resultCaptionUncertain:
      "Certains éléments jouent en votre faveur, d'autres non. Un examen par notre équipe permettra d'y voir clair avant d'agir.",
    resultCaptionLow:
      "Sur la base de vos réponses, les chances semblent limitées. Un examen gratuit par notre équipe peut néanmoins révéler un élément que le diagnostic ne capture pas.",
    ctaLabel: "Commander mon Pack Contestation — 89 CHF",
  },
  de: {
    typeQuestion: "Welche Art von Busse haben Sie erhalten?",
    typeOptions: [
      { value: "stationnement", label: "Parkieren" },
      { value: "vitesse", label: "Geschwindigkeitsübertretung" },
      { value: "cff", label: "Öffentlicher Verkehr (SBB)" },
      { value: "autre", label: "Andere Widerhandlung" },
    ],
    paidQuestion: "Haben Sie diese Busse bereits bezahlt?",
    paidOptions: [
      { value: "non", label: "Nein" },
      { value: "oui", label: "Ja" },
    ],
    deadlineQuestion: "Wie lange ist es her, dass Sie sie erhalten haben?",
    deadlineOptions: [
      { value: "moins10", label: "Weniger als 10 Tage" },
      { value: "entre10et30", label: "Zwischen 10 und 30 Tagen" },
      { value: "plus30", label: "Mehr als 30 Tage" },
    ],
    reasonQuestion: "Haben Sie einen konkreten Grund für eine Anfechtung (Signalisation, Fehler, besonderer Umstand)?",
    reasonOptions: [
      { value: "oui", label: "Ja, eindeutig" },
      { value: "peutetre", label: "Vielleicht" },
      { value: "non", label: "Nein" },
    ],
    questionCounter: (current, total) => `Frage ${current} / ${total}`,
    previous: "Zurück",
    freeTag: "Kostenlos · 2 Minuten · Sofortiges Ergebnis, keine E-Mail nötig",
    paidResultTitle: "Busse bereits bezahlt",
    paidResultBody:
      "Das Bezahlen einer Busse gilt als endgültige Anerkennung: Danach gibt es keinen Weg zurück. Dieser Fall ist leider nicht mehr anfechtbar.",
    paidResultTip:
      "Für das nächste Mal: Zahlen Sie nie, bevor Sie Ihre Möglichkeiten geprüft haben — auch nicht « um Ruhe zu haben ».",
    restart: "Diagnose wiederholen",
    chancesGood: "Gute Chancen",
    chancesUncertain: "Unsichere Chancen",
    chancesLow: "Geringe Chancen",
    resultLabel: "Ergebnis Ihrer Diagnose",
    resultCaptionGood:
      "Ihr Fall weist einen konkreten Grund auf und die Frist läuft noch. Eine gut begründete Einsprache lohnt sich.",
    resultCaptionUncertain:
      "Einige Elemente sprechen für Sie, andere nicht. Eine Prüfung durch unser Team schafft Klarheit, bevor Sie handeln.",
    resultCaptionLow:
      "Nach Ihren Angaben scheinen die Chancen begrenzt. Eine kostenlose Prüfung durch unser Team kann dennoch einen Punkt aufdecken, den die Diagnose nicht erfasst.",
    ctaLabel: "Anfechtungspaket bestellen — CHF 89",
  },
  en: {
    typeQuestion: "What type of fine did you receive?",
    typeOptions: [
      { value: "stationnement", label: "Parking" },
      { value: "vitesse", label: "Speeding" },
      { value: "cff", label: "Public transport (SBB/CFF)" },
      { value: "autre", label: "Other offence" },
    ],
    paidQuestion: "Have you already paid this fine?",
    paidOptions: [
      { value: "non", label: "No" },
      { value: "oui", label: "Yes" },
    ],
    deadlineQuestion: "How long ago did you receive it?",
    deadlineOptions: [
      { value: "moins10", label: "Less than 10 days" },
      { value: "entre10et30", label: "Between 10 and 30 days" },
      { value: "plus30", label: "More than 30 days" },
    ],
    reasonQuestion: "Do you have a concrete reason to contest it (signage, error, particular circumstance)?",
    reasonOptions: [
      { value: "oui", label: "Yes, clearly" },
      { value: "peutetre", label: "Maybe" },
      { value: "non", label: "No" },
    ],
    questionCounter: (current, total) => `Question ${current} / ${total}`,
    previous: "Back",
    freeTag: "Free · 2 minutes · Instant result, no email required",
    paidResultTitle: "Fine already paid",
    paidResultBody:
      "Paying a fine counts as final acceptance: there is no way back afterwards. This case can unfortunately no longer be contested.",
    paidResultTip:
      "Next time: never pay before checking your options, even just “to be done with it”.",
    restart: "Retake the diagnostic",
    chancesGood: "Good chances",
    chancesUncertain: "Uncertain chances",
    chancesLow: "Low chances",
    resultLabel: "Your diagnostic result",
    resultCaptionGood:
      "Your case has a concrete ground and the deadline is still open. A well-argued objection is worth it.",
    resultCaptionUncertain:
      "Some elements are in your favour, others aren't. A review by our team will clarify things before you act.",
    resultCaptionLow:
      "Based on your answers, the chances look limited. A free review by our team may still reveal something the diagnostic doesn't capture.",
    ctaLabel: "Order my Contestation Pack — CHF 89",
  },
  it: {
    typeQuestion: "Che tipo di multa avete ricevuto?",
    typeOptions: [
      { value: "stationnement", label: "Parcheggio" },
      { value: "vitesse", label: "Eccesso di velocità" },
      { value: "cff", label: "Trasporto pubblico (FFS)" },
      { value: "autre", label: "Altra infrazione" },
    ],
    paidQuestion: "Avete già pagato questa multa?",
    paidOptions: [
      { value: "non", label: "No" },
      { value: "oui", label: "Sì" },
    ],
    deadlineQuestion: "Da quanto tempo l'avete ricevuta?",
    deadlineOptions: [
      { value: "moins10", label: "Meno di 10 giorni" },
      { value: "entre10et30", label: "Tra 10 e 30 giorni" },
      { value: "plus30", label: "Più di 30 giorni" },
    ],
    reasonQuestion: "Avete un motivo concreto di contestazione (segnaletica, errore, circostanza particolare)?",
    reasonOptions: [
      { value: "oui", label: "Sì, chiaramente" },
      { value: "peutetre", label: "Forse" },
      { value: "non", label: "No" },
    ],
    questionCounter: (current, total) => `Domanda ${current} / ${total}`,
    previous: "Indietro",
    freeTag: "Gratuito · 2 minuti · Risultato immediato, nessuna email richiesta",
    paidResultTitle: "Multa già pagata",
    paidResultBody:
      "Pagare una multa equivale a un'accettazione definitiva: non esiste poi alcun ricorso possibile. Questo caso purtroppo non è più contestabile.",
    paidResultTip:
      "Per la prossima volta: non pagate mai prima di aver verificato le vostre opzioni, nemmeno «per tranquillità».",
    restart: "Rifare la diagnosi",
    chancesGood: "Buone possibilità",
    chancesUncertain: "Possibilità incerte",
    chancesLow: "Possibilità limitate",
    resultLabel: "Risultato della vostra diagnosi",
    resultCaptionGood:
      "Il vostro caso presenta un motivo concreto e il termine è ancora aperto. Un'opposizione ben argomentata vale la pena.",
    resultCaptionUncertain:
      "Alcuni elementi giocano a vostro favore, altri no. Un esame da parte del nostro team farà chiarezza prima di agire.",
    resultCaptionLow:
      "In base alle vostre risposte, le possibilità sembrano limitate. Un esame gratuito da parte del nostro team può comunque rivelare un elemento che la diagnosi non coglie.",
    ctaLabel: "Ordinare il mio Pack Contestazione — CHF 89",
  },
};

function computeVerdict(
  deadline: Deadline,
  reason: Reason,
): "good" | "uncertain" | "low" {
  if (reason === "non") return "low";
  if (deadline === "plus30") return "uncertain";
  if (reason === "oui") return "good";
  return "uncertain";
}

const STEP_ORDER: StepKey[] = ["type", "paid", "deadline", "reason"];

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
  const [history, setHistory] = useState<StepKey[]>([]);
  const [answers, setAnswers] = useState<Answers>({});

  function answer<K extends StepKey>(step: K, value: Answers[K]) {
    setAnswers((prev) => ({ ...prev, [step]: value }));
    setHistory((prev) => [...prev, step]);
  }

  function goBack() {
    setHistory((prev) => {
      const last = prev[prev.length - 1];
      if (!last) return prev;
      setAnswers((prevAnswers) => {
        const next = { ...prevAnswers };
        delete next[last];
        return next;
      });
      return prev.slice(0, -1);
    });
  }

  function restart() {
    setHistory([]);
    setAnswers({});
  }

  const isPaidStop = answers.paid === "oui";
  const isDone = isPaidStop || STEP_ORDER.every((step) => answers[step] !== undefined);

  if (isPaidStop) {
    return (
      <div className={`rounded-2xl border border-border bg-surface p-6 md:p-8 ${className}`}>
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-text-muted">
          {content.resultLabel}
        </p>
        <p className="mt-4 text-2xl font-semibold text-text">{content.paidResultTitle}</p>
        <p className="mt-3 text-sm leading-relaxed text-text-muted">{content.paidResultBody}</p>
        <p className="mt-4 rounded-xl border border-dashed border-border p-4 text-sm leading-relaxed text-text-muted">
          {content.paidResultTip}
        </p>
        <button
          type="button"
          onClick={restart}
          className="mt-6 block w-full text-center text-xs text-text-muted underline decoration-dotted underline-offset-4 hover:text-text"
        >
          {content.restart}
        </button>
      </div>
    );
  }

  if (isDone) {
    const verdict = computeVerdict(answers.deadline!, answers.reason!);
    const tone = verdict === "good" ? "success" : "danger";
    const label =
      verdict === "good"
        ? content.chancesGood
        : verdict === "uncertain"
          ? content.chancesUncertain
          : content.chancesLow;
    const caption =
      verdict === "good"
        ? content.resultCaptionGood
        : verdict === "uncertain"
          ? content.resultCaptionUncertain
          : content.resultCaptionLow;

    return (
      <div className={`rounded-2xl border border-border bg-surface p-6 md:p-8 ${className}`}>
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-text-muted">
          {content.resultLabel}
        </p>
        <div className="mt-4 flex items-center gap-3">
          <span
            className={`rounded-full px-4 py-1.5 text-base font-semibold ${
              tone === "success" ? "bg-success-soft text-success" : "bg-danger-soft text-danger"
            }`}
          >
            {label}
          </span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-text-muted">{caption}</p>

        <div className="mt-8 border-t border-border pt-6">
          <PrimaryButton href={checkoutHref} className="w-full px-8 py-3.5 text-base">
            {content.ctaLabel}
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

  const currentStep = STEP_ORDER.find((step) => answers[step] === undefined)!;
  const currentIndex = STEP_ORDER.indexOf(currentStep);

  const question =
    currentStep === "type"
      ? content.typeQuestion
      : currentStep === "paid"
        ? content.paidQuestion
        : currentStep === "deadline"
          ? content.deadlineQuestion
          : content.reasonQuestion;

  const options =
    currentStep === "type"
      ? content.typeOptions
      : currentStep === "paid"
        ? content.paidOptions
        : currentStep === "deadline"
          ? content.deadlineOptions
          : content.reasonOptions;

  return (
    <div className={`rounded-2xl border border-border bg-surface p-6 md:p-8 ${className}`}>
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-text-muted">
          {content.questionCounter(currentIndex + 1, STEP_ORDER.length)}
        </p>
        {history.length > 0 ? (
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
          style={{ width: `${(currentIndex / STEP_ORDER.length) * 100}%` }}
        />
      </div>

      <p className="mt-6 text-lg font-medium leading-snug text-text md:text-xl">{question}</p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => answer(currentStep, option.value as never)}
            className="flex-1 rounded-xl border border-border bg-bg px-5 py-3.5 text-sm font-medium text-text transition-colors hover:border-accent hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:min-w-[45%]"
          >
            {option.label}
          </button>
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-text-muted">{content.freeTag}</p>
    </div>
  );
}
