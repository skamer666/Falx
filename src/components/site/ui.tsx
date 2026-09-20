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
      className={`inline-flex items-center justify-center rounded-full bg-sapin px-6 py-3 text-sm font-medium text-papier transition-all duration-300 hover:bg-sapin-light hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sapin focus-visible:ring-offset-2 focus-visible:ring-offset-papier ${className}`}
    >
      {children}
    </Link>
  );
}

export function CircleArrowLink({
  href,
  children,
  tone = "light",
  className = "",
}: {
  href: string;
  children?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const ring =
    tone === "light"
      ? "border-white/40 text-papier hover:border-white hover:bg-white/10"
      : "border-ink/30 text-ink hover:border-ink hover:bg-ink/5";
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-3 focus-visible:outline-none ${className}`}
    >
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${ring}`}
      >
        <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
          <path
            d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {children ? (
        <span
          className={`text-sm font-medium ${tone === "light" ? "text-papier" : "text-ink"}`}
        >
          {children}
        </span>
      ) : null}
    </Link>
  );
}
