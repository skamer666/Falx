import Link from "next/link";
import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-6 md:px-10 ${className}`}>
      {children}
    </div>
  );
}

export function Kicker({
  children,
  tone = "dark",
}: {
  children: ReactNode;
  tone?: "dark" | "light";
}) {
  return (
    <div
      className={`flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] ${
        tone === "dark" ? "text-sapin" : "text-sapin-pale/80"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          tone === "dark" ? "bg-sapin" : "bg-sapin-pale/80"
        }`}
      />
      {children}
    </div>
  );
}

export function PrimaryButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full bg-sapin px-6 py-3 text-sm font-medium text-papier transition-all duration-300 hover:bg-sapin-light hover:shadow-[0_8px_30px_-8px_rgba(15,61,46,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sapin focus-visible:ring-offset-2 focus-visible:ring-offset-papier ${className}`}
    >
      {children}
    </Link>
  );
}

export function GhostButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-3 text-sm font-medium text-ink underline decoration-ink/25 underline-offset-4 transition-colors duration-300 hover:decoration-ink/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sapin focus-visible:ring-offset-2 focus-visible:ring-offset-papier ${className}`}
    >
      {children}
    </Link>
  );
}

export function GhostButtonLight({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-1.5 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-papier transition-colors duration-300 hover:border-white/45 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-papier focus-visible:ring-offset-2 focus-visible:ring-offset-encre ${className}`}
    >
      {children}
    </Link>
  );
}

export function SectionHeading({
  kicker,
  title,
  description,
  tone = "dark",
}: {
  kicker: string;
  title: ReactNode;
  description?: string;
  tone?: "dark" | "light";
}) {
  return (
    <div className="max-w-2xl">
      <Kicker tone={tone}>{kicker}</Kicker>
      <h2
        className={`font-serif-display mt-5 text-3xl leading-[1.15] tracking-[-0.01em] md:text-4xl ${
          tone === "dark" ? "text-ink" : "text-papier"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-4 text-base leading-relaxed md:text-lg ${
            tone === "dark" ? "text-ink-muted" : "text-ivory-muted"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
