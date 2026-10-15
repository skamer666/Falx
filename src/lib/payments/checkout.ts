// Paiement en ligne d'une commande à l'acte : le montant est toujours calculé ici, côté serveur.
import { createOrderPayment, type Lead } from "@/lib/account/db";
import { logAudit } from "@/lib/account/admin-db";
import { createCheckoutSession, stripeConfigured } from "@/lib/payments/stripe";
import { EXPRESS_PRICE, getService, servicePath, serviceText } from "@/lib/services/catalog";
import { SITE_URL } from "@/lib/site";

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
export async function openDirectCheckout(lead: Lead): Promise<string | null> {
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
      successUrl: `${SITE_URL}/${lead.locale}/commande/merci?paid=1&service=${service.slug}`,
      cancelUrl: `${SITE_URL}${servicePath(lead.locale, service)}`,
      idempotencyKey: `order-${lead.id}`,
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
