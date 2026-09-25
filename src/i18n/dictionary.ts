import type { Locale } from "./config";

export const dictionary = {
  fr: {
    nav: {
      pricing: "Tarifs",
      monitoring: "Suivi Conformité",
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
      tagline: "La conformité nLPD de votre PME, à prix fixe.",
      description:
        "Thrax Legal met les PME suisses en conformité avec la nLPD : registre des traitements, politique de confidentialité, contrats de sous-traitance.",
      contact: "Nous contacter",
      hours: "Horaires",
      hoursValue: "Lundi à vendredi",
      hoursValue2: "09:00 à 18:00",
      menu: "Menu",
      home: "Accueil",
      diagnostic: "Diagnostic gratuit",
      monitoring: "Suivi Conformité",
      guide: "Guide",
      faq: "FAQ",
      disclaimer:
        "Thrax Legal n'est pas un cabinet d'avocats : nous ne portons pas le titre d'avocat et n'assurons pas la représentation devant les tribunaux, réservée aux avocats inscrits à un registre cantonal suisse. Pour toute procédure contentieuse nécessitant une représentation, nous vous orientons vers un avocat.",
      terms: "Conditions générales",
      region: "Suisse · FR/DE/EN",
      rights: "Tous droits réservés.",
    },
  },
  de: {
    nav: {
      pricing: "Preise",
      monitoring: "Compliance-Abo",
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
      tagline: "DSG-Konformität für Ihr KMU, zum Fixpreis.",
      description:
        "Thrax Legal bringt Schweizer KMU in Einklang mit dem revidierten Datenschutzgesetz (DSG): Verarbeitungsverzeichnis, Datenschutzerklärung, Auftragsverarbeitungsverträge.",
      contact: "Kontakt",
      hours: "Öffnungszeiten",
      hoursValue: "Montag bis Freitag",
      hoursValue2: "09:00 bis 18:00 Uhr",
      menu: "Menü",
      home: "Startseite",
      diagnostic: "Gratis-Diagnose",
      monitoring: "Compliance-Abo",
      guide: "Ratgeber",
      faq: "FAQ",
      disclaimer:
        "Thrax Legal ist keine Anwaltskanzlei: Wir führen keinen Anwaltstitel und übernehmen keine Vertretung vor Gericht, die ausschliesslich im kantonalen Anwaltsregister eingetragenen Anwältinnen und Anwälten vorbehalten ist. Bei streitigen Verfahren, die eine Vertretung erfordern, verweisen wir Sie an eine Anwältin oder einen Anwalt.",
      terms: "Allgemeine Geschäftsbedingungen",
      region: "Schweiz · FR/DE/EN",
      rights: "Alle Rechte vorbehalten.",
    },
  },
  en: {
    nav: {
      pricing: "Pricing",
      monitoring: "Ongoing Compliance",
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
      tagline: "FADP compliance for your SME, at a fixed price.",
      description:
        "Thrax Legal brings Swiss SMEs into compliance with the revised Federal Act on Data Protection (FADP): records of processing, privacy policy, data processing agreements.",
      contact: "Contact us",
      hours: "Hours",
      hoursValue: "Monday to Friday",
      hoursValue2: "9:00 am to 6:00 pm",
      menu: "Menu",
      home: "Home",
      diagnostic: "Free diagnostic",
      monitoring: "Ongoing Compliance",
      guide: "Guide",
      faq: "FAQ",
      disclaimer:
        "Thrax Legal is not a law firm: we do not hold the title of attorney and do not represent clients before courts, which is reserved to attorneys registered with a Swiss cantonal bar. For any contentious matter requiring representation, we refer you to an attorney.",
      terms: "Terms & Conditions",
      region: "Switzerland · FR/DE/EN",
      rights: "All rights reserved.",
    },
  },
} satisfies Record<Locale, unknown>;

export function getDictionary(locale: Locale) {
  return dictionary[locale];
}
