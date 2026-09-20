import Image from "next/image";

export default function Logo({
  wordmark = true,
  className = "",
}: {
  wordmark?: boolean;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-encre">
        <Image
          src="/logo/crest-dark.webp"
          alt="Falx"
          fill
          className="object-cover"
          sizes="36px"
        />
      </span>
      {wordmark ? (
        <span className="font-display text-xl tracking-tight text-ink">
          Falx
        </span>
      ) : null}
    </span>
  );
}
