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
    <div className={`mx-auto w-full max-w-[1440px] px-6 md:px-9 ${className}`}>
      {children}
    </div>
  );
}

export function PrimaryButton({
  href,
  children,
  className = "",
  type,
  onClick,
  disabled,
}: {
  href?: string;
  children: ReactNode;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
}) {
  const classes = `inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-bg transition-colors duration-200 hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-accent ${className}`;
  if (href && !disabled) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <button
      type={type ?? "button"}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      className={classes}
    >
      {children}
    </button>
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
      className={`inline-flex items-center justify-center rounded-lg border border-border px-6 py-3 text-sm font-medium text-text transition-colors duration-200 hover:border-white/20 hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${className}`}
    >
      {children}
    </Link>
  );
}

export function CircleArrowLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-3 text-sm font-medium text-text focus-visible:outline-none ${className}`}
    >
      {children}
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border transition-colors duration-200 group-hover:border-white/25 group-hover:bg-surface">
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
    </Link>
  );
}

export function StepList({
  steps,
  className = "",
}: {
  steps: { title: string; description: string }[];
  className?: string;
}) {
  return (
    <ol className={`relative text-left ${className}`}>
      {steps.map((step, index) => (
        <li key={step.title} className="relative border-l border-border pb-9 pl-8 last:border-transparent last:pb-0">
          <span
            aria-hidden
            className="absolute -left-[13px] top-0 flex h-[26px] w-[26px] items-center justify-center rounded-full border border-border bg-surface text-xs font-semibold text-text"
          >
            {index + 1}
          </span>
          <h3 className="text-[17px] font-semibold leading-snug text-text">{step.title}</h3>
          <p className="mt-1.5 text-[15px] leading-relaxed text-text-muted">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
