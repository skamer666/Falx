"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { CONSENT_EVENT, CONSENT_STORAGE_KEY, GOOGLE_ADS_ID } from "@/lib/ads";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __thraxGtagLoaded?: boolean;
  }
}

const TEXT: Record<Locale, { text: string; accept: string; refuse: string; more: string; open: string }> = {
  fr: {
    text: "Avec votre accord, nous utilisons un cookie de Google Ads pour savoir quelles annonces mènent à une commande. Rien n'est chargé si vous refusez.",
    accept: "Accepter",
    refuse: "Refuser",
    more: "Détails",
    open: "Cookies",
  },
  de: {
    text: "Mit Ihrer Einwilligung verwenden wir einen Google-Ads-Cookie, um zu wissen, welche Anzeigen zu einer Bestellung führen. Bei Ablehnung wird nichts geladen.",
    accept: "Akzeptieren",
    refuse: "Ablehnen",
    more: "Details",
    open: "Cookies",
  },
  en: {
    text: "With your consent, we use a Google Ads cookie to know which ads lead to an order. Nothing is loaded if you decline.",
    accept: "Accept",
    refuse: "Decline",
    more: "Details",
    open: "Cookies",
  },
  it: {
    text: "Con il vostro consenso utilizziamo un cookie di Google Ads per sapere quali annunci portano a un ordine. Se rifiutate, non viene caricato nulla.",
    accept: "Accetta",
    refuse: "Rifiuta",
    more: "Dettagli",
    open: "Cookie",
  },
};

function readConsent(): "granted" | "denied" | null {
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

/** Charge la balise Google Ads : mesure des conversions seulement (pas de personnalisation, pas d'analyse). */
function loadGoogleTag() {
  if (!GOOGLE_ADS_ID || window.__thraxGtagLoaded) return;
  window.__thraxGtagLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments);
  };
  window.gtag("consent", "default", { ad_storage: "granted", ad_user_data: "granted", ad_personalization: "denied", analytics_storage: "denied" });
  window.gtag("js", new Date());
  window.gtag("config", GOOGLE_ADS_ID, { allow_ad_personalization_signals: false });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GOOGLE_ADS_ID)}`;
  document.head.appendChild(script);
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

/** Bandeau de consentement : n'apparaît que si une balise publicitaire est configurée. */
export default function ConsentBanner({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const t = TEXT[locale];

  useEffect(() => {
    if (!GOOGLE_ADS_ID) return;
    const consent = readConsent();
    if (consent === "granted") loadGoogleTag();
    const reopen = () => setOpen(true);
    // Affichage différé d'un tick : le bandeau ne fait pas partie du HTML serveur.
    const timer = consent === null ? window.setTimeout(reopen, 0) : undefined;
    window.addEventListener("thrax-consent-open", reopen);
    return () => {
      if (timer) window.clearTimeout(timer);
      window.removeEventListener("thrax-consent-open", reopen);
    };
  }, []);

  if (!GOOGLE_ADS_ID || !open) return null;

  const choose = (value: "granted" | "denied") => {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
    } catch {
      // Stockage indisponible : le choix vaut pour cette page seulement.
    }
    setOpen(false);
    if (value === "granted") loadGoogleTag();
    else {
      // Retrait du consentement : on ne recharge rien ; la balise éventuellement chargée disparaît au prochain chargement.
    }
  };

  return (
    <div role="dialog" aria-label="Cookies" className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-2xl rounded-2xl border border-white/15 bg-[#131316] p-4 text-sm text-[#f5f5f7] shadow-[0_20px_60px_rgba(0,0,0,0.5)] sm:p-5">
      <p className="leading-relaxed text-[#cfcfd6]">
        {t.text}{" "}
        <Link href={`/${locale}/confidentialite`} className="underline underline-offset-4">
          {t.more}
        </Link>
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" onClick={() => choose("granted")} className="rounded-full bg-[#f5f5f7] px-5 py-2 text-sm font-semibold text-[#101010]">
          {t.accept}
        </button>
        <button type="button" onClick={() => choose("denied")} className="rounded-full border border-white/25 px-5 py-2 text-sm font-semibold">
          {t.refuse}
        </button>
      </div>
    </div>
  );
}

/** Lien du pied de page pour rouvrir le choix (et retirer son accord). */
export function ConsentReopen({ locale }: { locale: Locale }) {
  if (!GOOGLE_ADS_ID) return null;
  return (
    <button
      type="button"
      onClick={() => {
        try {
          window.localStorage.removeItem(CONSENT_STORAGE_KEY);
        } catch {
          // Sans stockage, on rouvre simplement le bandeau.
        }
        window.dispatchEvent(new Event("thrax-consent-open"));
      }}
      className="underline underline-offset-4 hover:text-text"
    >
      {TEXT[locale].open}
    </button>
  );
}
