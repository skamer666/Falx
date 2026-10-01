// Catalogue des prestations à prix fixe : structure commune aux 4 langues.
// Les textes (nom, description, inclus, FAQ…) sont dans src/content/services/<langue>.ts.
import type { Locale } from "@/i18n/config";
import { SERVICE_TEXT_FR } from "@/content/services/fr";
import { SERVICE_TEXT_DE } from "@/content/services/de";
import { SERVICE_TEXT_EN } from "@/content/services/en";
import { SERVICE_TEXT_IT } from "@/content/services/it";
import type { CategoryText, ServiceText } from "@/content/services/types";

export type Audience = "particuliers" | "entreprises";
export const AUDIENCES: Audience[] = ["particuliers", "entreprises"];

export type CategoryId =
  | "travail"
  | "logement"
  | "consommation"
  | "argent"
  | "administration"
  | "famille"
  | "sur-mesure"
  | "recouvrement"
  | "contrats"
  | "employeurs"
  | "conformite";

export const CATEGORIES: Record<Audience, CategoryId[]> = {
  particuliers: ["travail", "logement", "consommation", "argent", "administration", "famille", "sur-mesure"],
  entreprises: ["recouvrement", "contrats", "employeurs", "conformite"],
};

/** Supplément de l'option express (livraison en 24 h ouvrées), en CHF. */
export const EXPRESS_PRICE = 49;

export type ServiceDef = {
  slug: string;
  audience: Audience;
  category: CategoryId;
  /** Prix en CHF : TVA incluse pour les particuliers, hors TVA pour les entreprises. */
  price: number;
  /** « Dès » : le prix final est confirmé après analyse. */
  from?: boolean;
  /** Délai de livraison en jours ouvrés, à compter de la confirmation et du paiement. */
  days: number;
  /** Option express 24 h ouvrées disponible. */
  express: boolean;
  /** Mise en avant sur la page d'accueil de l'audience. */
  popular?: boolean;
  related: string[];
  /** Article du guide lié (slug). */
  guide?: string;
};

export const SERVICES: ServiceDef[] = [
  // ---------------------------------------------------------------- Particuliers · Travail
  { slug: "analyse-certificat-de-travail", audience: "particuliers", category: "travail", price: 79, days: 3, express: true, related: ["rectification-certificat-de-travail", "licenciement-opposition", "salaire-impaye"] },
  { slug: "rectification-certificat-de-travail", audience: "particuliers", category: "travail", price: 149, days: 3, express: true, popular: true, related: ["analyse-certificat-de-travail", "licenciement-opposition", "salaire-impaye"] },
  { slug: "licenciement-opposition", audience: "particuliers", category: "travail", price: 149, days: 2, express: true, popular: true, related: ["salaire-impaye", "rectification-certificat-de-travail", "requete-conciliation-travail"] },
  { slug: "relecture-contrat-de-travail", audience: "particuliers", category: "travail", price: 129, days: 2, express: true, related: ["lettre-de-demission", "analyse-certificat-de-travail", "question-juridique"] },
  { slug: "salaire-impaye", audience: "particuliers", category: "travail", price: 149, days: 3, express: true, related: ["requete-conciliation-travail", "licenciement-opposition", "lettre-de-demission"] },
  { slug: "lettre-de-demission", audience: "particuliers", category: "travail", price: 49, days: 1, express: false, related: ["analyse-certificat-de-travail", "salaire-impaye", "relecture-contrat-de-travail"] },
  { slug: "requete-conciliation-travail", audience: "particuliers", category: "travail", price: 290, days: 5, express: true, related: ["salaire-impaye", "licenciement-opposition", "appel-juridique"] },
  // ---------------------------------------------------------------- Particuliers · Logement
  { slug: "baisse-de-loyer", audience: "particuliers", category: "logement", price: 79, days: 2, express: false, popular: true, related: ["contestation-loyer-initial", "decompte-de-charges", "defaut-logement"] },
  { slug: "contestation-loyer-initial", audience: "particuliers", category: "logement", price: 149, days: 2, express: true, related: ["baisse-de-loyer", "decompte-de-charges", "defaut-logement"] },
  { slug: "defaut-logement", audience: "particuliers", category: "logement", price: 99, days: 2, express: true, popular: true, related: ["baisse-de-loyer", "contestation-conge", "garantie-de-loyer"] },
  { slug: "garantie-de-loyer", audience: "particuliers", category: "logement", price: 99, days: 3, express: true, popular: true, related: ["resiliation-anticipee-bail", "decompte-de-charges", "defaut-logement"] },
  { slug: "resiliation-anticipee-bail", audience: "particuliers", category: "logement", price: 69, days: 1, express: false, related: ["garantie-de-loyer", "contestation-conge", "defaut-logement"] },
  { slug: "contestation-conge", audience: "particuliers", category: "logement", price: 190, days: 2, express: true, related: ["defaut-logement", "garantie-de-loyer", "appel-juridique"] },
  { slug: "decompte-de-charges", audience: "particuliers", category: "logement", price: 99, days: 3, express: false, related: ["baisse-de-loyer", "garantie-de-loyer", "contestation-loyer-initial"] },
  { slug: "litige-de-voisinage", audience: "particuliers", category: "logement", price: 79, days: 2, express: false, related: ["lettre-juridique-sur-mesure", "defaut-logement", "appel-juridique"] },
  // ---------------------------------------------------------------- Particuliers · Consommation
  { slug: "resiliation-de-contrat", audience: "particuliers", category: "consommation", price: 49, days: 1, express: false, related: ["contester-une-facture", "relecture-contrat-particulier", "refus-assurance"] },
  { slug: "garantie-achat-defectueux", audience: "particuliers", category: "consommation", price: 79, days: 2, express: false, related: ["litige-artisan", "contester-une-facture", "resiliation-de-contrat"] },
  { slug: "litige-artisan", audience: "particuliers", category: "consommation", price: 99, days: 2, express: true, related: ["garantie-achat-defectueux", "contester-une-facture", "recuperer-argent-prete"] },
  { slug: "contester-une-facture", audience: "particuliers", category: "consommation", price: 69, days: 1, express: false, related: ["poursuite-injustifiee", "resiliation-de-contrat", "litige-artisan"] },
  { slug: "relecture-contrat-particulier", audience: "particuliers", category: "consommation", price: 129, days: 3, express: true, related: ["resiliation-de-contrat", "question-juridique", "garantie-achat-defectueux"] },
  { slug: "vol-annule-retarde", audience: "particuliers", category: "consommation", price: 59, days: 2, express: false, related: ["refus-assurance", "contester-une-facture", "lettre-juridique-sur-mesure"] },
  { slug: "refus-assurance", audience: "particuliers", category: "consommation", price: 149, days: 3, express: true, related: ["opposition-assurance-sociale", "vol-annule-retarde", "resiliation-de-contrat"] },
  // ---------------------------------------------------------------- Particuliers · Argent & poursuites
  { slug: "poursuite-injustifiee", audience: "particuliers", category: "argent", price: 79, days: 1, express: true, popular: true, related: ["contester-une-facture", "recuperer-argent-prete", "appel-juridique"] },
  { slug: "recuperer-argent-prete", audience: "particuliers", category: "argent", price: 99, days: 3, express: false, related: ["poursuite-injustifiee", "litige-artisan", "lettre-juridique-sur-mesure"] },
  // ---------------------------------------------------------------- Particuliers · Impôts & assurances sociales
  { slug: "reclamation-taxation-impots", audience: "particuliers", category: "administration", price: 149, days: 3, express: true, related: ["opposition-assurance-sociale", "question-juridique", "appel-juridique"] },
  { slug: "opposition-assurance-sociale", audience: "particuliers", category: "administration", price: 190, days: 3, express: true, related: ["refus-assurance", "reclamation-taxation-impots", "appel-juridique"] },
  // ---------------------------------------------------------------- Particuliers · Famille & avenir
  { slug: "testament", audience: "particuliers", category: "famille", price: 190, days: 5, express: false, popular: true, related: ["mandat-pour-cause-d-inaptitude", "directives-anticipees", "convention-de-concubinage"] },
  { slug: "mandat-pour-cause-d-inaptitude", audience: "particuliers", category: "famille", price: 149, days: 5, express: false, related: ["directives-anticipees", "testament", "convention-de-concubinage"] },
  { slug: "directives-anticipees", audience: "particuliers", category: "famille", price: 79, days: 3, express: false, related: ["mandat-pour-cause-d-inaptitude", "testament", "question-juridique"] },
  { slug: "convention-de-concubinage", audience: "particuliers", category: "famille", price: 190, days: 5, express: false, related: ["testament", "mandat-pour-cause-d-inaptitude", "separation-divorce-amiable"] },
  { slug: "separation-divorce-amiable", audience: "particuliers", category: "famille", price: 590, from: true, days: 7, express: false, related: ["convention-de-concubinage", "testament", "appel-juridique"] },
  // ---------------------------------------------------------------- Particuliers · Sur mesure
  { slug: "question-juridique", audience: "particuliers", category: "sur-mesure", price: 49, days: 2, express: true, related: ["appel-juridique", "lettre-juridique-sur-mesure", "relecture-contrat-particulier"] },
  { slug: "appel-juridique", audience: "particuliers", category: "sur-mesure", price: 59, days: 2, express: false, related: ["question-juridique", "lettre-juridique-sur-mesure", "relecture-contrat-particulier"] },
  { slug: "lettre-juridique-sur-mesure", audience: "particuliers", category: "sur-mesure", price: 79, days: 2, express: true, related: ["question-juridique", "appel-juridique", "contester-une-facture"] },

  // ---------------------------------------------------------------- Entreprises · Recouvrement & litiges
  { slug: "mise-en-demeure", audience: "entreprises", category: "recouvrement", price: 129, days: 2, express: true, popular: true, related: ["recouvrement-facture-impayee", "requete-de-mainlevee", "litige-commercial"], guide: "mise-en-demeure-recouvrement-suisse" },
  { slug: "recouvrement-facture-impayee", audience: "entreprises", category: "recouvrement", price: 290, days: 3, express: true, popular: true, related: ["mise-en-demeure", "requete-de-mainlevee", "cgv-sur-mesure"], guide: "mise-en-demeure-recouvrement-suisse" },
  { slug: "requete-de-mainlevee", audience: "entreprises", category: "recouvrement", price: 290, days: 3, express: true, related: ["recouvrement-facture-impayee", "mise-en-demeure", "litige-commercial"], guide: "mise-en-demeure-recouvrement-suisse" },
  { slug: "litige-commercial", audience: "entreprises", category: "recouvrement", price: 190, days: 3, express: true, related: ["mise-en-demeure", "relecture-contrat-commercial", "contrat-commercial-sur-mesure"] },
  // ---------------------------------------------------------------- Entreprises · Contrats & CGV
  { slug: "cgv-sur-mesure", audience: "entreprises", category: "contrats", price: 590, days: 5, express: false, popular: true, related: ["politique-de-confidentialite", "contrat-commercial-sur-mesure", "recouvrement-facture-impayee"], guide: "cgv-suisses-guide" },
  { slug: "contrat-commercial-sur-mesure", audience: "entreprises", category: "contrats", price: 390, days: 5, express: false, related: ["relecture-contrat-commercial", "accord-de-confidentialite", "cgv-sur-mesure"] },
  { slug: "relecture-contrat-commercial", audience: "entreprises", category: "contrats", price: 290, days: 3, express: true, related: ["contrat-commercial-sur-mesure", "accord-de-confidentialite", "litige-commercial"] },
  { slug: "accord-de-confidentialite", audience: "entreprises", category: "contrats", price: 149, days: 2, express: true, related: ["contrat-commercial-sur-mesure", "relecture-contrat-commercial", "convention-d-actionnaires"] },
  { slug: "contrat-de-mandat-independant", audience: "entreprises", category: "contrats", price: 190, days: 3, express: false, related: ["contrat-commercial-sur-mesure", "cgv-sur-mesure", "contrat-de-travail-sur-mesure"] },
  // ---------------------------------------------------------------- Entreprises · Employeurs
  { slug: "contrat-de-travail-sur-mesure", audience: "entreprises", category: "employeurs", price: 290, days: 3, express: true, popular: true, related: ["reglement-du-personnel", "certificat-de-travail-employeur", "licenciement-employeur"], guide: "contrat-de-travail-suisse-pme" },
  { slug: "certificat-de-travail-employeur", audience: "entreprises", category: "employeurs", price: 89, days: 2, express: true, popular: true, related: ["licenciement-employeur", "contrat-de-travail-sur-mesure", "avertissement-employe"], guide: "contrat-de-travail-suisse-pme" },
  { slug: "licenciement-employeur", audience: "entreprises", category: "employeurs", price: 190, days: 2, express: true, related: ["avertissement-employe", "certificat-de-travail-employeur", "contrat-de-travail-sur-mesure"], guide: "contrat-de-travail-suisse-pme" },
  { slug: "avertissement-employe", audience: "entreprises", category: "employeurs", price: 89, days: 1, express: false, related: ["licenciement-employeur", "reglement-du-personnel", "certificat-de-travail-employeur"] },
  { slug: "reglement-du-personnel", audience: "entreprises", category: "employeurs", price: 590, days: 7, express: false, related: ["contrat-de-travail-sur-mesure", "pack-conformite-nlpd", "avertissement-employe"] },
  // ---------------------------------------------------------------- Entreprises · Conformité & société
  { slug: "pack-conformite-nlpd", audience: "entreprises", category: "conformite", price: 690, days: 7, express: false, popular: true, related: ["politique-de-confidentialite", "cgv-sur-mesure", "reglement-du-personnel"], guide: "conformite-nlpd-pme" },
  { slug: "politique-de-confidentialite", audience: "entreprises", category: "conformite", price: 290, days: 3, express: false, related: ["pack-conformite-nlpd", "cgv-sur-mesure", "accord-de-confidentialite"], guide: "conformite-nlpd-pme" },
  { slug: "relecture-bail-commercial", audience: "entreprises", category: "conformite", price: 290, days: 3, express: true, related: ["relecture-contrat-commercial", "litige-commercial", "contrat-commercial-sur-mesure"], guide: "bail-commercial-suisse-guide" },
  { slug: "convention-d-actionnaires", audience: "entreprises", category: "conformite", price: 890, days: 7, express: false, related: ["accord-de-confidentialite", "contrat-commercial-sur-mesure", "statuts-d-association"] },
  { slug: "statuts-d-association", audience: "entreprises", category: "conformite", price: 290, days: 5, express: false, related: ["convention-d-actionnaires", "politique-de-confidentialite", "contrat-commercial-sur-mesure"] },
];

const BY_SLUG = new Map(SERVICES.map((service) => [service.slug, service]));

export function getService(slug: string): ServiceDef | undefined {
  return BY_SLUG.get(slug);
}

export function servicesFor(audience: Audience, category?: CategoryId): ServiceDef[] {
  return SERVICES.filter((s) => s.audience === audience && (!category || s.category === category));
}

type LocaleText = { services: Record<string, ServiceText>; categories: Record<CategoryId, CategoryText> };

const TEXT: Record<Locale, LocaleText> = {
  fr: SERVICE_TEXT_FR,
  de: SERVICE_TEXT_DE,
  en: SERVICE_TEXT_EN,
  it: SERVICE_TEXT_IT,
};

export function serviceText(locale: Locale, slug: string): ServiceText {
  return TEXT[locale].services[slug] ?? TEXT.fr.services[slug];
}

export function categoryText(locale: Locale, id: CategoryId): CategoryText {
  return TEXT[locale].categories[id];
}

export function servicePath(locale: Locale, service: Pick<ServiceDef, "audience" | "slug">): string {
  return `/${locale}/${service.audience}/${service.slug}`;
}
