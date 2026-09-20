"use client";

import { useSyncExternalStore } from "react";

function daysRemaining(deadline: Date): number {
  const ms = deadline.getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
}

function subscribe(callback: () => void) {
  const id = setInterval(callback, 60_000);
  return () => clearInterval(id);
}

export default function CountdownBadge({
  deadline,
  className = "",
}: {
  deadline: Date;
  className?: string;
}) {
  const days = useSyncExternalStore(
    subscribe,
    () => daysRemaining(deadline),
    () => daysRemaining(deadline),
  );

  const urgent = days <= 7;

  return (
    <div
      className={`inline-flex items-center gap-3 rounded-full border px-5 py-2.5 ${
        urgent
          ? "border-danger/30 bg-danger-soft"
          : "border-border bg-surface"
      } ${className}`}
    >
      <span
        className={`text-lg font-semibold tracking-tight ${
          urgent ? "text-danger" : "text-text"
        }`}
      >
        {days} {days === 1 ? "jour" : "jours"}
      </span>
      <span className="h-4 w-px bg-border" aria-hidden />
      <span className="text-sm text-text-muted">
        restants pour contester
      </span>
    </div>
  );
}
