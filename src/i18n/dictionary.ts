import type { Locale } from "./config";

export const dictionary = {
  fr: {
    nav: {
      pricing: "Tarifs",
      guide: "Guide",
      faq: "FAQ",
      diagnosticCta: "Diagnostic gratuit en 2 min",
      home: "Thrax Legal, accueil",
      menuOpen: "Ouvrir le menu",
      menuClose: "Fermer le menu",
      menuLabel: "Menu",
      menuCloseLabel: "Fermer",
    },
    footer: {
      tagline: "Contestez votre amende, à prix fixe.",
      description:
        "Thrax Legal évalue vos chances de contester une amende suisse et prépare votre opposition, sans avocat, sans rendez-vous.",
      contact: "Nous contacter",
      hours: "Horaires",
      hoursValue: "Lundi à vendredi",
      hoursValue2: "09:00 à 18:00",
      menu: "Menu",
      home: "Accueil",
      diagnostic: "Diagnostic gratuit",
      guide: "Guide",
      faq: "FAQ",
      disclaimer:
        "Thrax Legal n'est pas un cabinet d'avocats : nous ne portons pas le titre d'avocat et n'assurons pas la représentation devant les tribunaux, réservée aux avocats inscrits à un registre cantonal suisse. Pour toute procédure contentieuse nécessitant une représentation, nous vous orientons vers un avocat.",
      terms: "Conditions générales",
      privacy: "Politique de confidentialité",
      region: "Suisse · FR/DE/EN/IT",
      rights: "Tous droits réservés.",
    },
  },
  de: {
    nav: {
      pricing: "Preise",
      guide: "Ratgeber",
      faq: "FAQ",
      diagnosticCta: "Gratis-Diagnose in 2 Min.",
      home: "Thrax Legal, Startseite",
      menuOpen: "Menü öffnen",
      menuClose: "Menü schliessen",
      menuLabel: "Menü",
      menuCloseLabel: "Schliessen",
    },
    footer: {
      tagline: "Fechten Sie Ihre Busse an, zum Fixpreis.",
      description:
        "Thrax Legal beurteilt Ihre Chancen, eine Schweizer Busse anzufechten, und bereitet Ihre Einsprache vor — ohne Anwalt, ohne Termin.",
      contact: "Kontakt",
      hours: "Öffnungszeiten",
      hoursValue: "Montag bis Freitag",
      hoursValue2: "09:00 bis 18:00 Uhr",
      menu: "Menü",
      home: "Startseite",
      diagnostic: "Gratis-Diagnose",
      guide: "Ratgeber",
      faq: "FAQ",
      disclaimer:
        "Thrax Legal ist keine Anwaltskanzlei: Wir führen keinen Anwaltstitel und übernehmen keine Vertretung vor Gericht, die ausschliesslich im kantonalen Anwaltsregister eingetragenen Anwältinnen und Anwälten vorbehalten ist. Bei streitigen Verfahren, die eine Vertretung erfordern, verweisen wir Sie an eine Anwältin oder einen Anwalt.",
      terms: "Allgemeine Geschäftsbedingungen",
      privacy: "Datenschutzerklärung",
      region: "Schweiz · FR/DE/EN/IT",
      rights: "Alle Rechte vorbehalten.",
    },
  },
  en: {
    nav: {
      pricing: "Pricing",
      guide: "Guide",
      faq: "FAQ",
      diagnosticCta: "Free 2-min diagnostic",
      home: "Thrax Legal, home",
      menuOpen: "Open menu",
      menuClose: "Close menu",
      menuLabel: "Menu",
      menuCloseLabel: "Close",
    },
    footer: {
      tagline: "Contest your fine, at a fixed price.",
      description:
        "Thrax Legal assesses your chances of contesting a Swiss fine and prepares your objection — no lawyer, no appointment.",
      contact: "Contact us",
      hours: "Hours",
      hoursValue: "Monday to Friday",
      hoursValue2: "9:00 am to 6:00 pm",
      menu: "Menu",
      home: "Home",
      diagnostic: "Free diagnostic",
      guide: "Guide",
      faq: "FAQ",
      disclaimer:
        "Thrax Legal is not a law firm: we do not hold the title of attorney and do not represent clients before courts, which is reserved to attorneys registered with a Swiss cantonal bar. For any contentious matter requiring representation, we refer you to an attorney.",
      terms: "Terms & Conditions",
      privacy: "Privacy Policy",
      region: "Switzerland · FR/DE/EN/IT",
      rights: "All rights reserved.",
    },
  },
  it: {
    nav: {
      pricing: "Prezzi",
      guide: "Guida",
      faq: "FAQ",
      diagnosticCta: "Diagnosi gratuita in 2 min",
      home: "Thrax Legal, home",
      menuOpen: "Apri il menu",
      menuClose: "Chiudi il menu",
      menuLabel: "Menu",
      menuCloseLabel: "Chiudi",
    },
    footer: {
      tagline: "Contestate la vostra multa, a prezzo fisso.",
      description:
        "Thrax Legal valuta le vostre possibilità di contestare una multa svizzera e prepara la vostra opposizione — senza avvocato, senza appuntamento.",
      contact: "Contattaci",
      hours: "Orari",
      hoursValue: "Lunedì a venerdì",
      hoursValue2: "09:00 - 18:00",
      menu: "Menu",
      home: "Home",
      diagnostic: "Diagnosi gratuita",
      guide: "Guida",
      faq: "FAQ",
      disclaimer:
        "Thrax Legal non è uno studio legale: non portiamo il titolo di avvocato e non garantiamo la rappresentanza davanti ai tribunali, riservata agli avvocati iscritti a un albo cantonale svizzero. Per qualsiasi procedura contenziosa che richieda una rappresentanza, vi indirizziamo verso un avvocato.",
      terms: "Termini e condizioni",
      privacy: "Informativa sulla privacy",
      region: "Svizzera · FR/DE/EN/IT",
      rights: "Tutti i diritti riservati.",
    },
  },
} satisfies Record<Locale, unknown>;

export function getDictionary(locale: Locale) {
  return dictionary[locale];
}
