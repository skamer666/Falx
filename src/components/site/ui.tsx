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
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button
      type={type ?? "button"}
      onClick={onClick}
      disabled={disabled}
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

export function PriceBadge({
  amount,
  label,
  className = "",
}: {
  amount: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`inline-flex items-center gap-3 rounded-full border border-border bg-surface px-5 py-2.5 ${className}`}
    >
      <span className="text-lg font-semibold tracking-tight text-text">
        {amount}
      </span>
      <span className="h-4 w-px bg-border" aria-hidden />
      <span className="text-sm text-text-muted">{label}</span>
    </div>
  );
}

export function TrustBar({
  items,
  className = "",
}: {
  items: string[];
  className?: string;
}) {
  return (
    <div className={`border-y border-border bg-surface/50 ${className}`}>
      <Container className="flex flex-col gap-4 py-8 md:flex-row md:flex-wrap md:items-center md:justify-center md:gap-x-10 md:gap-y-3">
        {items.map((item) => (
          <p
            key={item}
            className="max-w-sm text-sm leading-relaxed text-text-muted md:text-center"
          >
            {item}
          </p>
        ))}
      </Container>
    </div>
  );
}

export function LawyerComparison({
  lawyerRange,
  lawyerNote,
  thraxPrice,
  thraxNote,
  className = "",
}: {
  lawyerRange: string;
  lawyerNote: string;
  thraxPrice: string;
  thraxNote: string;
  className?: string;
}) {
  return (
    <div className={`grid gap-4 sm:grid-cols-2 ${className}`}>
      <div className="rounded-2xl border border-border bg-surface p-6">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-text-muted">
          Avocat traditionnel
        </p>
        <p className="mt-3 text-2xl font-semibold tracking-tight text-text-muted">
          {lawyerRange}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-text-muted">
          {lawyerNote}
        </p>
      </div>
      <div className="rounded-2xl border border-text bg-surface p-6">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-text-muted">
          Thrax Legal
        </p>
        <p className="mt-3 text-2xl font-semibold tracking-tight text-text">
          {thraxPrice}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-text-muted">
          {thraxNote}
        </p>
      </div>
      <p className="sm:col-span-2 text-xs text-text-muted">
        Estimation basée sur un tarif horaire usuel de 250 à 600 CHF pour un
        avocat en Suisse.
      </p>
    </div>
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
    <div className={`grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3 ${className}`}>
      {steps.map((step, index) => (
        <div key={step.title} className="bg-bg p-8">
          <span className="text-sm font-medium text-text-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-4 text-[20px] font-semibold leading-[1.2] tracking-[-0.02em] text-text">
            {step.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">
            {step.description}
          </p>
        </div>
      ))}
    </div>
  );
}
