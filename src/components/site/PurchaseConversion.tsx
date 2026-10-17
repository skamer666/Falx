"use client";

import { useEffect } from "react";
import { CONSENT_EVENT, GOOGLE_ADS_ID, GOOGLE_ADS_PURCHASE_LABEL } from "@/lib/ads";

/** Déclare l'achat à Google Ads (une seule fois par commande, via transaction_id), seulement si le visiteur a accepté. */
export default function PurchaseConversion({ value, transactionId }: { value: number; transactionId: string }) {
  useEffect(() => {
    if (!GOOGLE_ADS_ID || !GOOGLE_ADS_PURCHASE_LABEL) return;
    let sent = false;
    const fire = () => {
      if (sent || !window.gtag) return;
      sent = true;
      window.gtag("event", "conversion", {
        send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_PURCHASE_LABEL}`,
        value,
        currency: "CHF",
        transaction_id: transactionId,
      });
    };
    fire();
    window.addEventListener(CONSENT_EVENT, fire);
    return () => window.removeEventListener(CONSENT_EVENT, fire);
  }, [value, transactionId]);
  return null;
}
