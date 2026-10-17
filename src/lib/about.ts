import type { Locale } from "@/i18n/config";

export const FOUNDER_NAME = "Grégoire Giuliano";
export const FOUNDER_PHOTO = "/media/photos/gregoire-giuliano.webp";
export const FOUNDER_THUMB = "/media/photos/gregoire-giuliano-sq.webp";
export const FOUNDER_ID = "#founder";

export const ABOUT_PATH = "/a-propos";

type AboutStrings = {
  menu: string;
  metaTitle: string;
  metaDescription: string;
  heading: string;
  role: string;
  intro: string;
  doTitle: string;
  doItems: string[];
  notTitle: string;
  notBody: string;
  idTitle: string;
  idRows: { label: string; value: string }[];
  contactCta: string;
  linksTitle: string;
  cardLine: string;
  cardCta: string;
  cardWrite: string;
};

export const ABOUT_STRINGS: Record<Locale, AboutStrings> = {
  fr: {
    menu: "Qui sommes-nous",
    metaTitle: "Qui sommes-nous ? | Thrax Legal",
    metaDescription:
      "Thrax Legal est un service juridique en ligne à prix fixe pour la Suisse romande, dirigé par Grégoire Giuliano. Qui nous sommes, ce que nous faisons et ce que nous ne faisons pas.",
    heading: "Qui sommes-nous",
    role: "Fondateur de Thrax Legal",
    intro:
      "Je dirige Thrax Legal, un service juridique en ligne à prix fixe pour les particuliers, indépendants et PME de Suisse romande. Quand on reçoit une poursuite, un congé de bail ou une lettre de licenciement, on a besoin d'une réponse claire, rapide, et d'un prix connu avant de commencer : c'est ce que nous proposons.",
    doTitle: "Ce que nous faisons",
    doItems: [
      "Des lettres, démarches et documents juridiques selon le droit suisse, à prix fixe annoncé avant de commander.",
      "Une livraison par email, sans rendez-vous : vous décrivez votre situation en ligne.",
      "Un paiement en ligne sécurisé, et un remboursement complet si nous ne pouvons pas traiter votre demande.",
      "Des réponses en français, en allemand, en anglais ou en italien.",
    ],
    notTitle: "Ce que nous ne sommes pas",
    notBody:
      "Thrax Legal n'est pas un cabinet d'avocats et ne représente pas ses clients devant les tribunaux. Si votre situation dépasse ce que nous pouvons faire, nous vous l'indiquons et vous êtes remboursé.",
    idTitle: "Informations légales",
    idRows: [
      { label: "Exploitant", value: "Grégoire Giuliano" },
      { label: "Entreprise (BCE)", value: "n° {BCE}" },
      { label: "Adresse", value: "Avenue Floréal 20, 1410 Waterloo, Belgique" },
      { label: "Email", value: "hey@thrax-legal.ch" },
      { label: "Réponse", value: "en principe sous un jour ouvré" },
    ],
    contactCta: "Nous écrire",
    linksTitle: "Pour aller plus loin",
    cardLine: "Une question avant de commander ? Écrivez-moi : je réponds en principe sous un jour ouvré.",
    cardCta: "Qui sommes-nous",
    cardWrite: "Écrire à Grégoire",
  },
  de: {
    menu: "Über uns",
    metaTitle: "Über uns | Thrax Legal",
    metaDescription:
      "Thrax Legal ist ein juristischer Online-Service zum Fixpreis für die Westschweiz, geleitet von Grégoire Giuliano. Wer wir sind, was wir tun und was nicht.",
    heading: "Über uns",
    role: "Gründer von Thrax Legal",
    intro:
      "Ich leite Thrax Legal, einen juristischen Online-Service zum Fixpreis für Privatpersonen, Selbstständige und KMU in der Westschweiz. Wer eine Betreibung, eine Mietkündigung oder ein Kündigungsschreiben erhält, braucht eine klare, schnelle Antwort und einen Preis, den man vor Beginn kennt. Genau das bieten wir.",
    doTitle: "Was wir tun",
    doItems: [
      "Briefe, Verfahren und juristische Dokumente nach Schweizer Recht, zu einem Fixpreis, der vor der Bestellung feststeht.",
      "Lieferung per E-Mail, ohne Termin: Sie schildern Ihre Situation online.",
      "Sichere Online-Zahlung und volle Rückerstattung, falls wir Ihre Anfrage nicht bearbeiten können.",
      "Antworten auf Französisch, Deutsch, Englisch oder Italienisch.",
    ],
    notTitle: "Was wir nicht sind",
    notBody:
      "Thrax Legal ist keine Anwaltskanzlei und vertritt seine Kundschaft nicht vor Gericht. Geht Ihre Situation über das hinaus, was wir leisten können, sagen wir es Ihnen, und Sie erhalten Ihr Geld zurück.",
    idTitle: "Rechtliche Angaben",
    idRows: [
      { label: "Betreiber", value: "Grégoire Giuliano" },
      { label: "Unternehmen (ZUNB/BCE)", value: "Nr. {BCE}" },
      { label: "Adresse", value: "Avenue Floréal 20, 1410 Waterloo, Belgien" },
      { label: "E-Mail", value: "hey@thrax-legal.ch" },
      { label: "Antwort", value: "in der Regel innert eines Arbeitstags" },
    ],
    contactCta: "Schreiben Sie uns",
    linksTitle: "Weiterführende Informationen",
    cardLine: "Eine Frage vor der Bestellung? Schreiben Sie mir: Ich antworte in der Regel innert eines Arbeitstags.",
    cardCta: "Über uns",
    cardWrite: "Grégoire schreiben",
  },
  en: {
    menu: "About us",
    metaTitle: "About us | Thrax Legal",
    metaDescription:
      "Thrax Legal is a fixed-price online legal service for French-speaking Switzerland, run by Grégoire Giuliano. Who we are, what we do and what we don't.",
    heading: "About us",
    role: "Founder of Thrax Legal",
    intro:
      "I run Thrax Legal, a fixed-price online legal service for individuals, freelancers and small businesses in French-speaking Switzerland. When you receive a debt enforcement notice, a lease termination or a dismissal letter, you need a clear, fast answer and a price you know before you start. That is what we offer.",
    doTitle: "What we do",
    doItems: [
      "Letters, procedures and legal documents under Swiss law, at a fixed price shown before you order.",
      "Delivery by email, no appointment: you describe your situation online.",
      "Secure online payment, and a full refund if we cannot handle your request.",
      "Replies in French, German, English or Italian.",
    ],
    notTitle: "What we are not",
    notBody:
      "Thrax Legal is not a law firm and does not represent clients before courts. If your situation goes beyond what we can do, we tell you and you are refunded.",
    idTitle: "Legal information",
    idRows: [
      { label: "Operator", value: "Grégoire Giuliano" },
      { label: "Business (BCE)", value: "no. {BCE}" },
      { label: "Address", value: "Avenue Floréal 20, 1410 Waterloo, Belgium" },
      { label: "Email", value: "hey@thrax-legal.ch" },
      { label: "Reply time", value: "usually within one working day" },
    ],
    contactCta: "Write to us",
    linksTitle: "Learn more",
    cardLine: "A question before you order? Write to me: I usually reply within one working day.",
    cardCta: "About us",
    cardWrite: "Write to Grégoire",
  },
  it: {
    menu: "Chi siamo",
    metaTitle: "Chi siamo | Thrax Legal",
    metaDescription:
      "Thrax Legal è un servizio giuridico online a prezzo fisso per la Svizzera romanda, diretto da Grégoire Giuliano. Chi siamo, cosa facciamo e cosa non facciamo.",
    heading: "Chi siamo",
    role: "Fondatore di Thrax Legal",
    intro:
      "Dirigo Thrax Legal, un servizio giuridico online a prezzo fisso per privati, indipendenti e PMI della Svizzera romanda. Quando si riceve un precetto esecutivo, una disdetta di locazione o una lettera di licenziamento, servono una risposta chiara e rapida e un prezzo noto prima di iniziare. È ciò che offriamo.",
    doTitle: "Cosa facciamo",
    doItems: [
      "Lettere, pratiche e documenti giuridici secondo il diritto svizzero, a un prezzo fisso indicato prima dell'ordine.",
      "Consegna via email, senza appuntamento: descrivete la vostra situazione online.",
      "Pagamento online sicuro e rimborso completo se non possiamo trattare la vostra richiesta.",
      "Risposte in francese, tedesco, inglese o italiano.",
    ],
    notTitle: "Cosa non siamo",
    notBody:
      "Thrax Legal non è uno studio legale e non rappresenta i clienti davanti ai tribunali. Se la vostra situazione va oltre ciò che possiamo fare, ve lo diciamo e venite rimborsati.",
    idTitle: "Informazioni legali",
    idRows: [
      { label: "Gestore", value: "Grégoire Giuliano" },
      { label: "Impresa (BCE)", value: "n. {BCE}" },
      { label: "Indirizzo", value: "Avenue Floréal 20, 1410 Waterloo, Belgio" },
      { label: "Email", value: "hey@thrax-legal.ch" },
      { label: "Risposta", value: "di regola entro un giorno lavorativo" },
    ],
    contactCta: "Scriveteci",
    linksTitle: "Per saperne di più",
    cardLine: "Una domanda prima di ordinare? Scrivetemi: rispondo di regola entro un giorno lavorativo.",
    cardCta: "Chi siamo",
    cardWrite: "Scrivere a Grégoire",
  },
};
