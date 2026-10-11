/** Règles des formulaires publics (être rappelé, devis, commande), partagées par le navigateur et le serveur. */
export type LeadField = "name" | "email" | "phone" | "consent";
export type LeadFieldErrors = Partial<Record<LeadField, true>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const isValidName = (name: string) => name.trim().length >= 2;
export const isValidEmail = (email: string) => EMAIL.test(email.trim());
/** Facultatif ; s'il est rempli : chiffres, espaces, +, points, tirets, parenthèses, et au moins 6 chiffres. */
export function isValidPhone(phone: string) {
  const value = phone.trim();
  return !value || (/^[+\d\s().\-/]+$/.test(value) && value.replace(/\D/g, "").length >= 6);
}

export function validateLead(input: { name: string; email: string; phone: string; consent: boolean }): LeadFieldErrors {
  const errors: LeadFieldErrors = {};
  if (!isValidName(input.name)) errors.name = true;
  if (!isValidEmail(input.email)) errors.email = true;
  if (!isValidPhone(input.phone)) errors.phone = true;
  if (!input.consent) errors.consent = true;
  return errors;
}

/** Devis et commande : description de la situation, deux cases d'acceptation, entreprise parfois obligatoire. */
export type OrderField = "situation" | "name" | "email" | "phone" | "company" | "terms" | "ai";
export type OrderFieldErrors = Partial<Record<OrderField, true>>;

export function validateOrder(data: FormData, opts: { companyRequired: boolean }): OrderFieldErrors {
  const text = (key: string) => String(data.get(key) ?? "");
  const errors: OrderFieldErrors = {};
  if (text("situation").trim().length < 10) errors.situation = true;
  if (!isValidName(text("name"))) errors.name = true;
  if (!isValidEmail(text("email"))) errors.email = true;
  if (!isValidPhone(text("phone"))) errors.phone = true;
  if (opts.companyRequired && text("company").trim().length < 2) errors.company = true;
  if (data.get("terms") !== "on") errors.terms = true;
  if (data.get("ai") !== "on") errors.ai = true;
  return errors;
}
