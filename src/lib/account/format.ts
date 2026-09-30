import type { Locale } from "@/i18n/config";

export const DATE_LOCALE: Record<Locale, string> = { fr: "fr-CH", de: "de-CH", en: "en-CH", it: "it-CH" };

export function formatDate(timestamp: number, locale: Locale): string {
  return new Date(timestamp).toLocaleDateString(DATE_LOCALE[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Zurich",
  });
}

export function formatDateTime(timestamp: number, locale: Locale): string {
  return new Date(timestamp).toLocaleString(DATE_LOCALE[locale], {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Zurich",
  });
}

export function formatShortDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("fr-CH", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Europe/Zurich",
  });
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} o`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} Ko`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
}
