import { getLead, markOrderExpired, markOrderPaid, setLeadStatus } from "@/lib/account/db";
import { logAudit } from "@/lib/account/admin-db";
import { notifyAdminOfPayment, safeSend, sendPaymentConfirmedEmail } from "@/lib/account/email";
import { paymentMethodType, verifyStripeSignature } from "@/lib/payments/stripe";
import { readEnv } from "@/lib/account/db";

export const dynamic = "force-dynamic";

type CheckoutSessionObject = {
  id: string;
  payment_status?: string;
  amount_total?: number | null;
  currency?: string | null;
  payment_intent?: string | null;
  metadata?: { lead_id?: string } | null;
  client_reference_id?: string | null;
};
type StripeEvent = { id: string; type: string; data: { object: CheckoutSessionObject } };

const METHOD_LABEL: Record<string, string> = { card: "carte", twint: "twint" };

/**
 * Webhook Stripe : l'unique endroit qui confirme un paiement (jamais la page de retour).
 * Il vérifie la signature, marque la commande payée (une seule fois) puis prévient le client et l'admin.
 */
export async function POST(request: Request) {
  const secret = await readEnv("STRIPE_WEBHOOK_SECRET");
  if (!secret) return new Response("Webhook non configuré", { status: 503 });

  const raw = await request.text();
  if (!(await verifyStripeSignature(raw, request.headers.get("stripe-signature"), secret))) {
    return new Response("Signature invalide", { status: 400 });
  }

  let event: StripeEvent;
  try {
    event = JSON.parse(raw) as StripeEvent;
  } catch {
    return new Response("Corps invalide", { status: 400 });
  }
  const session = event.data?.object;
  if (!session?.id) return new Response("ok");

  if (event.type === "checkout.session.expired") {
    await markOrderExpired(session.id);
    return new Response("ok");
  }

  const paidNow =
    event.type === "checkout.session.async_payment_succeeded" ||
    (event.type === "checkout.session.completed" && session.payment_status === "paid");
  if (!paidNow) return new Response("ok");

  // Seul un paiement en francs suisses, du montant attendu côté Stripe, est enregistré.
  if ((session.currency ?? "chf").toLowerCase() !== "chf" || !session.amount_total) return new Response("ok");

  const intent = typeof session.payment_intent === "string" ? session.payment_intent : null;
  const type = intent ? await paymentMethodType(intent) : null;
  const payment = await markOrderPaid(session.id, {
    method: type ? (METHOD_LABEL[type] ?? type) : null,
    paymentIntent: intent,
    amountRappen: session.amount_total,
  });
  if (!payment) return new Response("ok"); // déjà traité (Stripe renvoie parfois deux fois)

  const lead = await getLead(payment.lead_id);
  await logAudit({ actor: null, action: "order_paid", targetType: "lead", targetId: payment.lead_id, detail: `CHF ${(payment.amount_rappen / 100).toFixed(2)} (${payment.method ?? "?"})` });
  if (lead) {
    await setLeadStatus(lead.id, "converti");
    await safeSend(() => sendPaymentConfirmedEmail(lead, payment.amount_rappen), `confirmation paiement ${lead.email}`);
    await safeSend(() => notifyAdminOfPayment(lead, payment.amount_rappen, payment.method), `notification paiement ${lead.email}`);
  }
  return new Response("ok");
}
