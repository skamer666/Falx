import { PrimaryButton } from "./ui";
import type { Locale } from "@/i18n/config";

const STRINGS: Record<Locale, { title: string; body: string; cta: string }> = {
  fr: {
    title: "Une question sur votre situation ?",
    body: "Abonnement juridique PME dès 49 CHF/mois : posez vos questions par écrit, réponse rédigée sous 48 à 72h, sans engagement.",
    cta: "Voir les formules",
  },
  de: {
    title: "Eine Frage zu Ihrer Situation?",
    body: "KMU-Rechtsabo ab CHF 49/Monat: Stellen Sie Ihre Fragen schriftlich, ausformulierte Antwort innert 48 bis 72h, ohne Vertragsbindung.",
    cta: "Formeln ansehen",
  },
  en: {
    title: "A question about your situation?",
    body: "SME legal subscription from CHF 49/month: ask your questions in writing, drafted answer within 48 to 72h, no commitment.",
    cta: "See the plans",
  },
  it: {
    title: "Una domanda sulla vostra situazione?",
    body: "Abbonamento legale per PMI da CHF 49/mese: ponete le vostre domande per iscritto, risposta redatta entro 48-72h, senza impegno.",
    cta: "Vedere le formule",
  },
};

export default function GuideCta({
  locale,
  className = "",
}: {
  locale: Locale;
  className?: string;
}) {
  const t = STRINGS[locale];
  return (
    <div
      className={`rounded-2xl border border-border bg-surface p-6 text-center md:p-8 ${className}`}
    >
      <p className="text-lg font-semibold text-text">{t.title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-text-muted">
        {t.body}
      </p>
      <PrimaryButton href={`/${locale}/#offre`} className="mt-5 px-6 py-3 text-sm">
        {t.cta}
      </PrimaryButton>
    </div>
  );
}
