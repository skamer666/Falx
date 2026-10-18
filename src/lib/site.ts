// À ajuster via NEXT_PUBLIC_SITE_URL si le domaine change.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thrax-legal.ch";

/** Identifiants stables des entités schema.org (relient l'organisation, le site, les services et les vidéos). */
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@ThraxLegal";

/** Dates de dernière modification réelle du contenu (sitemap). À mettre à jour quand le contenu change vraiment. */
export const CONTENT_UPDATED = "2026-10-18";

/** À passer à true seulement quand TWINT est actif dans Stripe (Paramètres → Moyens de paiement) : il apparaît alors sur la page de paiement. */
export const TWINT_ENABLED = true;
