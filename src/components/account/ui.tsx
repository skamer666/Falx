import type { ReactNode } from "react";

export const INPUT =
  "mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-base text-text placeholder:text-text-muted/60 focus:border-text focus:outline-none";
export const LABEL = "text-xs font-medium uppercase tracking-[0.1em] text-text-muted";

export function Notice({ tone, children }: { tone: "error" | "success" | "info"; children: ReactNode }) {
  const styles =
    tone === "error"
      ? "border-danger/30 bg-danger-soft text-danger"
      : tone === "success"
        ? "border-success/30 bg-success-soft text-text"
        : "border-border bg-surface text-text-muted";
  return <p className={`mt-5 rounded-xl border px-4 py-3 text-sm leading-relaxed ${styles}`}>{children}</p>;
}
