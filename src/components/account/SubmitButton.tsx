"use client";

import { useFormStatus } from "react-dom";
import type { ReactNode } from "react";

/** Bouton d'envoi qui se désactive pendant l'exécution de l'action serveur. */
export default function SubmitButton({
  children,
  className = "",
  variant = "primary",
  confirm,
}: {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "ghost" | "danger";
  /** Si défini, demande une confirmation native avant l'envoi. */
  confirm?: string;
}) {
  const { pending } = useFormStatus();
  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";
  const styles =
    variant === "primary"
      ? "bg-accent text-bg hover:bg-accent-hover"
      : variant === "danger"
        ? "border border-danger/40 text-danger hover:bg-danger-soft"
        : "border border-border text-text hover:bg-surface";
  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      onClick={(event) => {
        if (confirm && !window.confirm(confirm)) event.preventDefault();
      }}
      className={`${base} ${styles} ${className}`}
    >
      {pending ? "…" : children}
    </button>
  );
}
