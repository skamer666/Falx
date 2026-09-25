import { PrimaryButton } from "./ui";

export default function GuideCta({
  className = "",
  title = "Faites le point sur votre conformité",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-border bg-surface p-6 text-center md:p-8 ${className}`}
    >
      <p className="text-lg font-semibold text-text">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-text-muted">
        Diagnostic gratuit en 2 minutes, puis un Pack Conformité nLPD complet
        à prix fixe (590 CHF) si vous en avez besoin.
      </p>
      <PrimaryButton href="/#diagnostic" className="mt-5 px-6 py-3 text-sm">
        Faire mon diagnostic gratuit
      </PrimaryButton>
    </div>
  );
}
