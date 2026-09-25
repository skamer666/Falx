import { PrimaryButton } from "./ui";
import type { Locale } from "@/i18n/config";

const STRINGS: Record<Locale, { title: string; body: string; cta: string }> = {
  fr: {
    title: "Faites le point sur votre conformité",
    body: "Diagnostic gratuit en 2 minutes, puis un Pack Conformité nLPD complet à prix fixe (590 CHF) si vous en avez besoin.",
    cta: "Faire mon diagnostic gratuit",
  },
  de: {
    title: "Prüfen Sie Ihre Konformität",
    body: "Kostenlose Diagnose in 2 Minuten, danach bei Bedarf ein vollständiges DSG-Compliance-Paket zum Fixpreis (CHF 590).",
    cta: "Gratis-Diagnose starten",
  },
  en: {
    title: "Check where your compliance stands",
    body: "Free 2-minute diagnostic, then a complete FADP Compliance Pack at a fixed price (CHF 590) if you need one.",
    cta: "Start my free diagnostic",
  },
  it: {
    title: "Fate il punto sulla vostra conformità",
    body: "Diagnosi gratuita in 2 minuti, poi un Pack Conformità nLPD completo a prezzo fisso (CHF 590) se ne avete bisogno.",
    cta: "Fare la mia diagnosi gratuita",
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
      <PrimaryButton href={`/${locale}/#diagnostic`} className="mt-5 px-6 py-3 text-sm">
        {t.cta}
      </PrimaryButton>
    </div>
  );
}
