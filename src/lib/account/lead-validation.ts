/** Règles du formulaire « Être rappelé », partagées par le navigateur et le serveur. */
export type LeadField = "name" | "email" | "phone" | "consent";
export type LeadFieldErrors = Partial<Record<LeadField, true>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateLead(input: { name: string; email: string; phone: string; consent: boolean }): LeadFieldErrors {
  const errors: LeadFieldErrors = {};
  if (input.name.trim().length < 2) errors.name = true;
  if (!EMAIL.test(input.email.trim())) errors.email = true;
  const phone = input.phone.trim();
  // Facultatif ; s'il est rempli : chiffres, espaces, +, points, tirets, parenthèses, et au moins 6 chiffres.
  if (phone && (!/^[+\d\s().\-/]+$/.test(phone) || phone.replace(/\D/g, "").length < 6)) errors.phone = true;
  if (!input.consent) errors.consent = true;
  return errors;
}
