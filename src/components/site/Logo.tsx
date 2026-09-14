/**
 * Placeholder temporaire (option "initiale encadrée") — à remplacer par le
 * logo définitif une fois dessiné.
 */
export function FalxGlyph({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`font-serif-display leading-none text-papier ${className}`}
    >
      F
    </span>
  );
}

export default function Logo({
  wordmark = true,
  className = "",
}: {
  wordmark?: boolean;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-encre">
        <FalxGlyph className="text-lg" />
      </span>
      {wordmark ? (
        <span className="font-serif-display text-xl tracking-tight text-ink">
          Falx
        </span>
      ) : null}
    </span>
  );
}
