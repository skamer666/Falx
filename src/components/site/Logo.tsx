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
      <Image
        src="/logo/crest-light.png"
        alt="Falx"
        width={30}
        height={40}
        className="h-9 w-auto shrink-0"
      />
      {wordmark ? (
        <span className="font-display text-xl tracking-tight text-ink">
          Falx
        </span>
      ) : null}
    </span>
  );
}
