import { PrimaryButton } from "./ui";

export default function PaywallCard({
  price,
  bullets,
  checkoutHref,
  ctaLabel = "Débloquer le rapport complet",
  deliveryNote = "Livraison immédiate",
  guaranteeNote = "Remboursé sous 14 jours si besoin",
  disabled = false,
}: {
  price: string;
  bullets: string[];
  checkoutHref: string;
  ctaLabel?: string;
  deliveryNote?: string;
  guaranteeNote?: string;
  disabled?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
      <p className="text-2xl font-semibold tracking-tight text-text">
        {price}
      </p>
      <ul className="mt-4 space-y-2.5">
        {bullets.map((bullet) => (
          <li
            key={bullet}
            className="flex items-start gap-2.5 text-sm leading-relaxed text-text-muted"
          >
            <span
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
              aria-hidden
            />
            {bullet}
          </li>
        ))}
      </ul>
      <PrimaryButton
        href={checkoutHref}
        disabled={disabled}
        className="mt-6 w-full"
      >
        {ctaLabel}
      </PrimaryButton>
      <p className="mt-3 text-center text-xs text-text-muted">
        Paiement sécurisé &middot; {deliveryNote}
        {guaranteeNote ? <> &middot; {guaranteeNote}</> : null}
      </p>
    </div>
  );
}
