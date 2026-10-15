// Client Stripe minimal (REST + fetch) : aucune dépendance, compatible Cloudflare Workers.
// Les clés ne sont jamais écrites dans le code : STRIPE_SECRET_KEY (clé restreinte rk_…) et
// STRIPE_WEBHOOK_SECRET (whsec_…) vivent dans les secrets Cloudflare du Worker.
import { readEnv } from "@/lib/account/db";

const API = "https://api.stripe.com/v1";
/** Tolérance sur l'horodatage de la signature d'un webhook (secondes). */
const SIGNATURE_TOLERANCE = 300;

export async function stripeConfigured(): Promise<boolean> {
  return Boolean(await readEnv("STRIPE_SECRET_KEY"));
}

export type CheckoutInput = {
  amountRappen: number;
  productName: string;
  customerEmail: string;
  leadId: string;
  locale: string;
  successUrl: string;
  cancelUrl: string;
  /** Clé d'idempotence : un double clic n'ouvre pas deux sessions. */
  idempotencyKey: string;
};

export type CheckoutSession = { id: string; url: string };

const STRIPE_LOCALES = new Set(["fr", "de", "en", "it"]);

/** Crée une session Stripe Checkout (paiement unique en CHF). Le montant vient toujours du serveur. */
export async function createCheckoutSession(input: CheckoutInput): Promise<CheckoutSession> {
  const key = await readEnv("STRIPE_SECRET_KEY");
  if (!key) throw new Error("STRIPE_SECRET_KEY absente : le paiement en ligne n'est pas encore activé.");
  if (!Number.isInteger(input.amountRappen) || input.amountRappen < 50) throw new Error("Montant invalide.");

  const body = new URLSearchParams();
  body.set("mode", "payment");
  body.set("line_items[0][quantity]", "1");
  body.set("line_items[0][price_data][currency]", "chf");
  body.set("line_items[0][price_data][unit_amount]", String(input.amountRappen));
  body.set("line_items[0][price_data][product_data][name]", input.productName.slice(0, 250));
  body.set("customer_email", input.customerEmail);
  body.set("client_reference_id", input.leadId);
  body.set("metadata[lead_id]", input.leadId);
  body.set("payment_intent_data[description]", input.productName.slice(0, 250));
  body.set("payment_intent_data[metadata][lead_id]", input.leadId);
  body.set("success_url", input.successUrl);
  body.set("cancel_url", input.cancelUrl);
  if (STRIPE_LOCALES.has(input.locale)) body.set("locale", input.locale);
  // Pas de payment_method_types : les moyens (carte, TWINT…) se règlent dans le tableau de bord Stripe.

  const res = await fetch(`${API}/checkout/sessions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "Idempotency-Key": input.idempotencyKey,
    },
    body,
  });
  const data = (await res.json()) as { id?: string; url?: string; error?: { message?: string } };
  if (!res.ok || !data.id || !data.url) {
    throw new Error(`Stripe a refusé la session : ${data.error?.message ?? res.status}`);
  }
  return { id: data.id, url: data.url };
}

function hex(bytes: ArrayBuffer): string {
  return Array.from(new Uint8Array(bytes), (b) => b.toString(16).padStart(2, "0")).join("");
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** Vérifie l'en-tête Stripe-Signature (HMAC-SHA256 de « t.payload ») sur le corps brut. */
export async function verifyStripeSignature(rawBody: string, header: string | null, secret: string, now = Date.now()): Promise<boolean> {
  if (!header) return false;
  const parts = header.split(",").map((p) => p.trim().split("="));
  const timestamp = parts.find(([k]) => k === "t")?.[1];
  const signatures = parts.filter(([k]) => k === "v1").map(([, v]) => v ?? "");
  if (!timestamp || signatures.length === 0) return false;
  if (Math.abs(now / 1000 - Number(timestamp)) > SIGNATURE_TOLERANCE) return false;

  const cryptoKey = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const expected = hex(await crypto.subtle.sign("HMAC", cryptoKey, new TextEncoder().encode(`${timestamp}.${rawBody}`)));
  return signatures.some((signature) => timingSafeEqual(signature, expected));
}

/** Type de moyen de paiement réellement utilisé (« card », « twint »…), ou null si Stripe ne répond pas. */
export async function paymentMethodType(paymentIntentId: string): Promise<string | null> {
  const key = await readEnv("STRIPE_SECRET_KEY");
  if (!key || !/^pi_[A-Za-z0-9_]+$/.test(paymentIntentId)) return null;
  try {
    const res = await fetch(`${API}/payment_intents/${paymentIntentId}?expand[]=latest_charge`, { headers: { Authorization: `Bearer ${key}` } });
    if (!res.ok) return null;
    const data = (await res.json()) as { latest_charge?: { payment_method_details?: { type?: string } } | null };
    return data.latest_charge?.payment_method_details?.type ?? null;
  } catch {
    return null;
  }
}
