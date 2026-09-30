"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { createLead, isLeadThrottled, recordAttempt, type Plan } from "@/lib/account/db";
import { notifyAdminOfLead, safeSend, sendLeadReceivedEmail } from "@/lib/account/email";

function field(formData: FormData, name: string, max = 500): string {
  return String(formData.get(name) ?? "").trim().slice(0, max);
}

export async function submitLead(locale: Locale, formData: FormData) {
  // Piège à robots : ce champ caché reste vide pour un humain.
  if (field(formData, "website")) redirect(`/${locale}/contact?sent=1`);

  const h = await headers();
  const ip = h.get("cf-connecting-ip") ?? h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
  if (await isLeadThrottled(ip)) redirect(`/${locale}/contact?error=throttled`);

  const name = field(formData, "name", 120);
  const email = field(formData, "email", 254).toLowerCase();
  if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) redirect(`/${locale}/contact?error=generic`);
  if (formData.get("consent") !== "on") redirect(`/${locale}/contact?error=consent`);

  const planValue = field(formData, "plan");
  const planInterest: Plan | null = planValue === "essentiel" || planValue === "croissance" ? planValue : null;
  await recordAttempt("lead", email, ip, true);

  const lead = await createLead({
    name,
    email,
    phone: field(formData, "phone", 40) || null,
    company: field(formData, "company", 160) || null,
    message: field(formData, "message", 2000) || null,
    planInterest,
    locale,
  });
  await safeSend(() => notifyAdminOfLead(lead), `notification prospect ${lead.email}`);
  await safeSend(() => sendLeadReceivedEmail(lead), `accusé prospect ${lead.email}`);
  redirect(`/${locale}/contact?sent=1`);
}
