const GLYPH_PATH =
  "M7 3.5H9.4V20.5H7V3.5ZM9.4 3.5H18L9.4 7.4V3.5ZM9.4 10.4H14.6L9.4 13.1V10.4Z";

export function FalxGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d={GLYPH_PATH} />
    </svg>
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
        <FalxGlyph className="h-4 w-4 text-papier" />
      </span>
      {wordmark ? (
        <span className="font-serif-display text-xl tracking-tight text-ink">
          Falx
        </span>
      ) : null}
    </span>
  );
}
