"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Mesure d'audience sans cookie : envoie le chemin de la page, le référent (à la première page seulement)
 * et la largeur d'écran. Rien n'est stocké sur l'appareil du visiteur.
 */
export default function PageViewTracker() {
  const pathname = usePathname();
  const first = useRef(true);
  useEffect(() => {
    try {
      if (navigator.doNotTrack === "1") return;
      const entry = first.current;
      first.current = false;
      const payload = JSON.stringify({
        p: pathname,
        r: entry ? document.referrer : "",
        q: entry ? window.location.search : "",
        w: window.innerWidth,
        e: entry,
      });
      if (!navigator.sendBeacon?.("/api/t", new Blob([payload], { type: "application/json" }))) {
        void fetch("/api/t", { method: "POST", body: payload, headers: { "Content-Type": "application/json" }, keepalive: true });
      }
    } catch {
      // La mesure d'audience ne doit jamais gêner la navigation.
    }
  }, [pathname]);
  return null;
}
