"use client";

import { useEffect } from "react";
import { describeVisit, SOURCE_MAX_AGE_MS, SOURCE_STORAGE_KEY } from "@/lib/source";

type Stored = { label: string; at: number };

export function readStoredSource(): string | null {
  try {
    const raw = window.localStorage.getItem(SOURCE_STORAGE_KEY);
    if (!raw) return null;
    const stored = JSON.parse(raw) as Stored;
    if (!stored?.label || Date.now() - stored.at > SOURCE_MAX_AGE_MS) return null;
    return stored.label;
  } catch {
    return null;
  }
}

/**
 * Retient la provenance de la visite (annonce, lien, moteur de recherche) pour la joindre
 * à une éventuelle demande. Une visite issue d'une campagne remplace la précédente ; sinon
 * on garde la première provenance connue.
 */
export default function SourceTracker() {
  useEffect(() => {
    try {
      const visit = describeVisit(new URL(window.location.href), document.referrer, window.location.hostname);
      const existing = readStoredSource();
      if (visit && (visit.campaign || !existing)) {
        window.localStorage.setItem(SOURCE_STORAGE_KEY, JSON.stringify({ label: visit.label, at: Date.now() }));
      } else if (!visit && !existing) {
        const page = window.location.pathname.slice(0, 80);
        window.localStorage.setItem(SOURCE_STORAGE_KEY, JSON.stringify({ label: `Direct · page ${page}`, at: Date.now() }));
      }
    } catch {
      // Stockage indisponible (navigation privée stricte…) : sans conséquence.
    }
  }, []);
  return null;
}
