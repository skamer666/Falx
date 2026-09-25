"use client";

import Link from "next/link";
import { LOCALES, LOCALE_LABELS, type Locale } from "@/i18n/config";

function swapLocale(pathname: string, target: Locale): string {
  const segments = pathname.split("/");
  // segments[0] === "" (chemin absolu), segments[1] === locale actuelle
  segments[1] = target;
  return segments.join("/") || `/${target}`;
}

export default function LocaleSwitcher({
  locale,
  pathname,
  className = "",
}: {
  locale: Locale;
  pathname: string;
  className?: string;
}) {
  return (
    <div className={`items-center gap-1 text-xs font-medium text-text-muted ${className}`}>
      {LOCALES.map((target, index) => (
        <span key={target} className="flex items-center gap-1">
          {index > 0 ? <span aria-hidden>&middot;</span> : null}
          <Link
            href={swapLocale(pathname, target)}
            aria-current={target === locale ? "true" : undefined}
            className={`rounded px-1 transition-colors hover:text-text ${
              target === locale ? "text-text" : ""
            }`}
          >
            {LOCALE_LABELS[target]}
          </Link>
        </span>
      ))}
    </div>
  );
}
