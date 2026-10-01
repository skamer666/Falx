"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { createLead, isLeadThrottled, recordAttempt } from "@/lib/account/db";
import { notifyAdminOfOrder, safeSend, sendOrderReceivedEmail } from "@/lib/account/email";
import { cleanSource } from "@/lib/source";
import { getService, servicePath, type Audience } from "@/lib/services/catalog";

function field(formData: FormData, name: string, max = 500): string {
  return String(formData.get(name) ?? "").trim().slice(0, max);
}

/** Commande d'une prestation à l'acte : enregistrée comme prospect avec la prestation, puis confirmée à la main. */
export async function submitOrder(locale: Locale, slug: string, formData: FormData) {
  const service = getService(slug);
  if (!service) redirect(`/${locale}`);
  const back = servicePath(locale, service);

  // Piège à robots : ce champ caché reste vide pour un humain.
  if (field(formData, "website")) redirect(`/${locale}/commande/merci`);

  const h = await headers();
  const ip = h.get("cf-connecting-ip") ?? h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
  if (await isLeadThrottled(ip)) redirect(`${back}?error=throttled#commander`);

  const name = field(formData, "name", 120);
  const email = field(formData, "email", 254).toLowerCase();
  const situation = field(formData, "situation", 4000);
  if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || situation.length < 10) {
    redirect(`${back}?error=generic#commander`);
  }
  if (formData.get("terms") !== "on" || formData.get("ai") !== "on") redirect(`${back}?error=consent#commander`);

  const deadline = field(formData, "deadline", 20);
  await recordAttempt("lead", email, ip, true);

  const lead = await createLead({
    name,
    email,
    phone: field(formData, "phone", 40) || null,
    company: field(formData, "company", 160) || null,
    message: situation,
    planInterest: null,
    locale,
    source: cleanSource(formData.get("source")),
    service: service.slug,
    express: service.express && formData.get("express") === "on",
    deadline: /^\d{4}-\d{2}-\d{2}$/.test(deadline) ? deadline : null,
  });
  await safeSend(() => notifyAdminOfOrder(lead), `notification commande ${lead.email}`);
  await safeSend(() => sendOrderReceivedEmail(lead), `accusé commande ${lead.email}`);
  redirect(`/${locale}/commande/merci?service=${service.slug}`);
}

/** Demande de devis : le problème n'est pas dans la liste des prestations. */
export async function submitQuote(locale: Locale, audience: Audience, formData: FormData) {
  const back = `/${locale}/${audience}`;
  if (field(formData, "website")) redirect(`/${locale}/commande/merci?service=devis-${audience}`);

  const h = await headers();
  const ip = h.get("cf-connecting-ip") ?? h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
  if (await isLeadThrottled(ip)) redirect(`${back}?devis=throttled#devis`);

  const name = field(formData, "name", 120);
  const email = field(formData, "email", 254).toLowerCase();
  const situation = field(formData, "situation", 4000);
  if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || situation.length < 10) {
    redirect(`${back}?devis=generic#devis`);
  }
  if (formData.get("terms") !== "on" || formData.get("ai") !== "on") redirect(`${back}?devis=consent#devis`);

  await recordAttempt("lead", email, ip, true);
  const lead = await createLead({
    name,
    email,
    phone: field(formData, "phone", 40) || null,
    company: field(formData, "company", 160) || null,
    message: situation,
    planInterest: null,
    locale,
    source: cleanSource(formData.get("source")),
    service: `devis-${audience}`,
  });
  await safeSend(() => notifyAdminOfOrder(lead), `notification devis ${lead.email}`);
  await safeSend(() => sendOrderReceivedEmail(lead), `accusé devis ${lead.email}`);
  redirect(`/${locale}/commande/merci?service=devis-${audience}`);
}
