import Image from "next/image";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image
        src="/logo/crest-light.png"
        alt=""
        width={30}
        height={40}
        className="h-9 w-auto shrink-0"
      />
      <span className="inline-flex items-baseline gap-1.5">
        <span className="text-lg font-semibold tracking-tight text-text">
          Thrax
        </span>
        <span className="text-lg font-normal tracking-tight text-text-muted">
          Legal
        </span>
      </span>
    </span>
  );
}
