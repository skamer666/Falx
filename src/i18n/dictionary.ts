import type { Locale } from "./config";

export const dictionary = {
  fr: {
    nav: {
      pricing: "Formules",
      guide: "Guide",
      faq: "FAQ",
      login: "Connexion",
      diagnosticCta: "Voir les formules",
      home: "Thrax Legal, accueil",
      menuOpen: "Ouvrir le menu",
      menuClose: "Fermer le menu",
      menuLabel: "Menu",
      menuCloseLabel: "Fermer",
    },
    footer: {
      tagline: "Votre juriste externalisé, à prix fixe.",
      description:
        "Thrax Legal s'occupe des besoins juridiques de votre indépendance ou PME : rédaction de contrats, résolution de litiges, conformité nLPD. Sans avocat à l'heure, sans rendez-vous.",
      contact: "Nous contacter",
      hours: "Horaires",
      hoursValue: "Lundi à vendredi",
      hoursValue2: "09:00 à 18:00",
      menu: "Menu",
      home: "Accueil",
      diagnostic: "Formules",
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
      pricing: "Formeln",
      guide: "Ratgeber",
      faq: "FAQ",
      login: "Anmelden",
      diagnosticCta: "Formeln ansehen",
      home: "Thrax Legal, Startseite",
      menuOpen: "Menü öffnen",
      menuClose: "Menü schliessen",
      menuLabel: "Menü",
      menuCloseLabel: "Schliessen",
    },
    footer: {
      tagline: "Ihr externer Rechtsberater, zum Fixpreis.",
      description:
        "Thrax Legal kümmert sich um die rechtlichen Bedürfnisse Ihrer Selbstständigkeit oder Ihres KMU: Vertragserstellung, Streitfalllösung, DSG-Konformität. Ohne Anwalt nach Stundensatz, ohne Termin.",
      contact: "Kontakt",
      hours: "Öffnungszeiten",
      hoursValue: "Montag bis Freitag",
      hoursValue2: "09:00 bis 18:00 Uhr",
      menu: "Menü",
      home: "Startseite",
      diagnostic: "Formeln",
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
      pricing: "Plans",
      guide: "Guide",
      faq: "FAQ",
      login: "Log in",
      diagnosticCta: "See the plans",
      home: "Thrax Legal, home",
      menuOpen: "Open menu",
      menuClose: "Close menu",
      menuLabel: "Menu",
      menuCloseLabel: "Close",
    },
    footer: {
      tagline: "Your outsourced legal counsel, at a fixed price.",
      description:
        "Thrax Legal handles the legal needs of your independent business or SME: contract drafting, dispute resolution, FADP compliance. No hourly lawyer, no appointment.",
      contact: "Contact us",
      hours: "Hours",
      hoursValue: "Monday to Friday",
      hoursValue2: "9:00 am to 6:00 pm",
      menu: "Menu",
      home: "Home",
      diagnostic: "Plans",
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
      pricing: "Formule",
      guide: "Guida",
      faq: "FAQ",
      login: "Accedi",
      diagnosticCta: "Vedere le formule",
      home: "Thrax Legal, home",
      menuOpen: "Apri il menu",
      menuClose: "Chiudi il menu",
      menuLabel: "Menu",
      menuCloseLabel: "Chiudi",
    },
    footer: {
      tagline: "Il vostro giurista esternalizzato, a prezzo fisso.",
      description:
        "Thrax Legal si occupa delle esigenze legali della vostra attività indipendente o PMI: redazione di contratti, risoluzione di controversie, conformità nLPD. Senza avvocato a ore, senza appuntamento.",
      contact: "Contattaci",
      hours: "Orari",
      hoursValue: "Lunedì a venerdì",
      hoursValue2: "09:00 - 18:00",
      menu: "Menu",
      home: "Home",
      diagnostic: "Formule",
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
