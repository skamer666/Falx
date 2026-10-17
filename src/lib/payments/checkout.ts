// Paiement en ligne d'une commande à l'acte : le montant est toujours calculé ici, côté serveur.
import { claimOrderReminder, createOrderPayment, getLead, getOrderPaymentBySession, releaseOrderReminder, type Lead } from "@/lib/account/db";
import { logAudit } from "@/lib/account/admin-db";
import { sendPaymentReminderEmail } from "@/lib/account/email";
import { createCheckoutSession, stripeConfigured } from "@/lib/payments/stripe";
import { EXPRESS_PRICE, getService, servicePath, serviceText } from "@/lib/services/catalog";
import { SITE_URL } from "@/lib/site";

/** Durée de validité du premier lien de paiement (le rappel est envoyé à son expiration). */
const FIRST_LINK_SECONDS = 3600;

/** Montant à payer tout de suite (en rappen), ou null si le prix doit d'abord être confirmé (devis, prix « dès »). */
export function directAmountRappen(lead: Pick<Lead, "service" | "express">): number | null {
  const service = lead.service ? getService(lead.service) : undefined;
  if (!service || service.from) return null;
  const extra = lead.express && service.express ? EXPRESS_PRICE : 0;
  return Math.round((service.price + extra) * 100);
}

/**
 * Ouvre une session Stripe Checkout pour une commande à prix fixe et renvoie son adresse.
 * Renvoie null (sans jamais lever d'erreur) si le paiement direct n'est pas possible : la commande suit alors le parcours manuel.
 */
export async function openDirectCheckout(lead: Lead, options: { reminder?: boolean } = {}): Promise<string | null> {
  const amountRappen = directAmountRappen(lead);
  const service = lead.service ? getService(lead.service) : undefined;
  if (amountRappen === null || !service || !(await stripeConfigured())) return null;
  try {
    const session = await createCheckoutSession({
      amountRappen,
      productName: serviceText(lead.locale, service.slug).name + (lead.express && service.express ? " (express 24 h)" : ""),
      customerEmail: lead.email,
      leadId: lead.id,
      locale: lead.locale,
      successUrl: `${SITE_URL}/${lead.locale}/commande/merci?paid=1&service=${service.slug}&sid={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${SITE_URL}${servicePath(lead.locale, service)}`,
      idempotencyKey: options.reminder ? `order-${lead.id}-reminder` : `order-${lead.id}`,
      // Le premier lien reste ouvert 1 h : au-delà, la session expire et le rappel part avec un lien neuf valable 24 h.
      expiresInSeconds: options.reminder ? undefined : FIRST_LINK_SECONDS,
    });
    await createOrderPayment({ leadId: lead.id, sessionId: session.id, amountRappen, createdBy: null });
    return session.url;
  } catch (error) {
    console.error("[stripe] paiement direct impossible", error);
    try {
      await logAudit({ actor: null, action: "payment_link_failed", targetType: "lead", targetId: lead.id, detail: String(error instanceof Error ? error.message : error).slice(0, 300) });
    } catch {
      // Le journal est indisponible : l'erreur est déjà dans les logs.
    }
    return null;
  }
}

/**
 * Rappel unique d'une commande dont le paiement n'a pas été finalisé : appelé quand Stripe signale l'expiration du lien.
 * Message purement transactionnel (aucune offre, aucune réduction), envoyé une seule fois, à l'adresse donnée pour cette commande.
 * Ne relance ni une commande payée, ni un lien créé à la main depuis l'admin (devis), ni une commande déjà relancée.
 */
export async function sendAbandonedOrderReminder(sessionId: string): Promise<void> {
  const payment = await getOrderPaymentBySession(sessionId);
  if (!payment || payment.created_by !== null) return;
  const lead = await getLead(payment.lead_id);
  if (!lead || lead.status === "converti" || !lead.service) return;
  if (!(await claimOrderReminder(payment.id, lead.id))) return;

  try {
    const url = await openDirectCheckout(lead, { reminder: true });
    if (!url) {
      await releaseOrderReminder(payment.id);
      return;
    }
    await sendPaymentReminderEmail(lead, url, payment.amount_rappen);
    await logAudit({ actor: null, action: "order_reminder_sent", targetType: "lead", targetId: lead.id, detail: `CHF ${(payment.amount_rappen / 100).toFixed(2)}` });
  } catch (error) {
    console.error("[stripe] rappel de paiement impossible", error);
    try {
      await logAudit({ actor: null, action: "order_reminder_failed", targetType: "lead", targetId: lead.id, detail: String(error instanceof Error ? error.message : error).slice(0, 300) });
    } catch {
      // Journal indisponible : l'erreur est déjà dans les logs.
    }
  }
}
