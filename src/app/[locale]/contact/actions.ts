"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { createLead, isLeadThrottled, recordAttempt, type Plan } from "@/lib/account/db";
import { notifyAdminOfLead, safeSend, sendLeadReceivedEmail } from "@/lib/account/email";
import { cleanSource } from "@/lib/source";
import { validateLead, type LeadFieldErrors } from "@/lib/account/lead-validation";

/** Erreurs renvoyées au formulaire, qui les affiche sous les champs concernés sans perdre la saisie. */
export type LeadFormState = { errors: LeadFieldErrors; throttled?: boolean; values: Record<string, string> } | null;

function field(formData: FormData, name: string, max = 500): string {
  return String(formData.get(name) ?? "").trim().slice(0, max);
}

export async function submitLead(locale: Locale, _prev: LeadFormState, formData: FormData): Promise<LeadFormState> {
  // Piège à robots : ce champ caché reste vide pour un humain.
  if (field(formData, "website")) redirect(`/${locale}/contact?sent=1`);

  const name = field(formData, "name", 120);
  const email = field(formData, "email", 254).toLowerCase();
  const phone = field(formData, "phone", 40);
  // Valeurs renvoyées pour que le formulaire les réaffiche : rien n'est perdu en cas d'erreur.
  const values: Record<string, string> = {};
  for (const key of ["name", "email", "phone", "company", "plan", "message"]) values[key] = field(formData, key, 2000);
  const errors = validateLead({ name, email, phone, consent: formData.get("consent") === "on" });
  // Sans JavaScript, renvoyer un état bloque le rendu côté serveur (vinext) : on redirige vers
  // /contact, qui affiche le message en haut. Le champ « js » est rempli par le formulaire hydraté.
  const withJs = formData.get("js") === "1";
  if (Object.keys(errors).length > 0) {
    if (!withJs) redirect(`/${locale}/contact?error=${Object.keys(errors).length === 1 && errors.consent ? "consent" : "generic"}`);
    return { errors, values };
  }

  const h = await headers();
  const ip = h.get("cf-connecting-ip") ?? h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
  if (await isLeadThrottled(ip)) {
    if (!withJs) redirect(`/${locale}/contact?error=throttled`);
    return { errors: {}, throttled: true, values };
  }

  const planValue = field(formData, "plan");
  const planInterest: Plan | null = planValue === "essentiel" || planValue === "croissance" ? planValue : null;
  await recordAttempt("lead", email, ip, true);

  const lead = await createLead({
    name,
    email,
    phone: phone || null,
    company: field(formData, "company", 160) || null,
    message: field(formData, "message", 2000) || null,
    planInterest,
    locale,
    source: cleanSource(formData.get("source")),
  });
  await safeSend(() => notifyAdminOfLead(lead), `notification prospect ${lead.email}`);
  await safeSend(() => sendLeadReceivedEmail(lead), `accusé prospect ${lead.email}`);
  redirect(`/${locale}/contact?sent=1`);
}
