// Balise Google Ads (mesure des conversions), chargée UNIQUEMENT après accord du visiteur.
// Tant que GOOGLE_ADS_ID est vide, aucune balise n'est chargée et le bandeau de consentement n'apparaît pas.
// Les deux valeurs se trouvent dans Google Ads → Objectifs → Conversions → l'action « Achat » → « Balise » ; ce ne sont pas des secrets.
export const GOOGLE_ADS_ID = ""; // par ex. "AW-123456789"
export const GOOGLE_ADS_PURCHASE_LABEL = ""; // par ex. "AbCdEfGhIjKlMn-op"

export const CONSENT_STORAGE_KEY = "thrax_consent";
export const CONSENT_EVENT = "thrax-consent-granted";
