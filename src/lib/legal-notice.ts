import type { Locale } from "@/i18n/config";

export const LEGAL_NOTICE_PATH = "/mentions-legales";

type Row = { label: string; value: string };
type LegalNoticeStrings = {
  menu: string;
  metaTitle: string;
  metaDescription: string;
  heading: string;
  intro: string;
  rows: Row[];
  hostTitle: string;
  host: string;
  pricesTitle: string;
  prices: string;
  moreTitle: string;
};

/** Mentions légales : identité complète de l'exploitant (exigée par la loi et par les moyens de paiement comme TWINT). {BCE} est remplacé par le numéro d'entreprise. */
export const LEGAL_NOTICE: Record<Locale, LegalNoticeStrings> = {
  fr: {
    menu: "Mentions légales",
    metaTitle: "Mentions légales | Thrax Legal",
    metaDescription: "Identité de l'exploitant de Thrax Legal : nom, forme juridique, numéro d'entreprise, adresse et contact.",
    heading: "Mentions légales",
    intro: "Informations sur l'exploitant du site thrax-legal.ch et du service Thrax Legal.",
    rows: [
      { label: "Nom commercial", value: "Thrax Legal" },
      { label: "Exploitant (propriétaire)", value: "Grégoire Giuliano" },
      { label: "Forme juridique", value: "Entreprise individuelle (personne physique), sans société distincte" },
      { label: "Numéro d'entreprise (BCE)", value: "{BCE}" },
      { label: "Adresse", value: "Avenue Floréal 20, 1410 Waterloo, Belgique" },
      { label: "Email", value: "hey@thrax-legal.ch" },
      { label: "TVA", value: "Non applicable (régime de franchise des petites entreprises)" },
      { label: "Directeur de la publication", value: "Grégoire Giuliano" },
    ],
    hostTitle: "Hébergement",
    host: "Cloudflare, Inc., 101 Townsend Street, San Francisco, CA 94107, États-Unis.",
    pricesTitle: "Prix",
    prices: "Tous les prix sont indiqués en francs suisses (CHF) et payables en ligne, par carte bancaire, via notre prestataire de paiement Stripe.",
    moreTitle: "Voir aussi",
  },
  de: {
    menu: "Impressum",
    metaTitle: "Impressum | Thrax Legal",
    metaDescription: "Angaben zum Betreiber von Thrax Legal: Name, Rechtsform, Unternehmensnummer, Adresse und Kontakt.",
    heading: "Impressum",
    intro: "Angaben zum Betreiber der Website thrax-legal.ch und des Dienstes Thrax Legal.",
    rows: [
      { label: "Handelsname", value: "Thrax Legal" },
      { label: "Betreiber (Inhaber)", value: "Grégoire Giuliano" },
      { label: "Rechtsform", value: "Einzelunternehmen (natürliche Person), keine eigene Gesellschaft" },
      { label: "Unternehmensnummer (BCE)", value: "{BCE}" },
      { label: "Adresse", value: "Avenue Floréal 20, 1410 Waterloo, Belgien" },
      { label: "E-Mail", value: "hey@thrax-legal.ch" },
      { label: "MWST", value: "Nicht anwendbar (Kleinunternehmerregelung)" },
      { label: "Verantwortlich für den Inhalt", value: "Grégoire Giuliano" },
    ],
    hostTitle: "Hosting",
    host: "Cloudflare, Inc., 101 Townsend Street, San Francisco, CA 94107, USA.",
    pricesTitle: "Preise",
    prices: "Alle Preise sind in Schweizer Franken (CHF) angegeben und werden online per Karte über unseren Zahlungsdienstleister Stripe bezahlt.",
    moreTitle: "Siehe auch",
  },
  en: {
    menu: "Legal notice",
    metaTitle: "Legal notice | Thrax Legal",
    metaDescription: "Who operates Thrax Legal: name, legal form, business number, address and contact details.",
    heading: "Legal notice",
    intro: "Information about the operator of the thrax-legal.ch website and the Thrax Legal service.",
    rows: [
      { label: "Trade name", value: "Thrax Legal" },
      { label: "Operator (owner)", value: "Grégoire Giuliano" },
      { label: "Legal form", value: "Sole proprietorship (natural person), no separate company" },
      { label: "Business number (BCE)", value: "{BCE}" },
      { label: "Address", value: "Avenue Floréal 20, 1410 Waterloo, Belgium" },
      { label: "Email", value: "hey@thrax-legal.ch" },
      { label: "VAT", value: "Not applicable (small-business exemption)" },
      { label: "Publication director", value: "Grégoire Giuliano" },
    ],
    hostTitle: "Hosting",
    host: "Cloudflare, Inc., 101 Townsend Street, San Francisco, CA 94107, USA.",
    pricesTitle: "Prices",
    prices: "All prices are shown in Swiss francs (CHF) and paid online by card through our payment provider Stripe.",
    moreTitle: "See also",
  },
  it: {
    menu: "Note legali",
    metaTitle: "Note legali | Thrax Legal",
    metaDescription: "Chi gestisce Thrax Legal: nome, forma giuridica, numero d'impresa, indirizzo e contatti.",
    heading: "Note legali",
    intro: "Informazioni sul gestore del sito thrax-legal.ch e del servizio Thrax Legal.",
    rows: [
      { label: "Nome commerciale", value: "Thrax Legal" },
      { label: "Gestore (titolare)", value: "Grégoire Giuliano" },
      { label: "Forma giuridica", value: "Impresa individuale (persona fisica), senza società distinta" },
      { label: "Numero d'impresa (BCE)", value: "{BCE}" },
      { label: "Indirizzo", value: "Avenue Floréal 20, 1410 Waterloo, Belgio" },
      { label: "Email", value: "hey@thrax-legal.ch" },
      { label: "IVA", value: "Non applicabile (franchigia per piccole imprese)" },
      { label: "Responsabile della pubblicazione", value: "Grégoire Giuliano" },
    ],
    hostTitle: "Hosting",
    host: "Cloudflare, Inc., 101 Townsend Street, San Francisco, CA 94107, USA.",
    pricesTitle: "Prezzi",
    prices: "Tutti i prezzi sono indicati in franchi svizzeri (CHF) e pagati online con carta tramite il nostro fornitore di pagamenti Stripe.",
    moreTitle: "Vedere anche",
  },
};
