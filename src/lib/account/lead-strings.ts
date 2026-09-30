import type { Locale } from "@/i18n/config";

export type LeadStrings = {
  metaTitle: string;
  heading: string;
  subheading: string;
  nameLabel: string;
  emailLabel: string;
  phoneLabel: string;
  companyLabel: string;
  planLabel: string;
  planNone: string;
  planEssentiel: string;
  planCroissance: string;
  messageLabel: string;
  messagePlaceholder: string;
  consentBefore: string;
  consentLink: string;
  consentAfter: string;
  cta: string;
  sentHeading: string;
  sentBody: string;
  backHome: string;
  errorGeneric: string;
  errorConsent: string;
  errorThrottled: string;
  linkLabel: string;
  alternative: string;
  alternativeCta: string;
  heroCta: string;
  stickyCta: string;
  calloutText: string;
  sectionEyebrow: string;
  sectionHeading: string;
  sectionBody: string;
  points: string[];
};

export const LEAD_STRINGS: Record<Locale, LeadStrings> = {
  fr: {
    metaTitle: "Être rappelé | Thrax Legal",
    heading: "Être rappelé",
    subheading: "Laissez vos coordonnées : nous vous rappelons pour répondre à vos questions, sans engagement.",
    nameLabel: "Nom et prénom",
    emailLabel: "Adresse email",
    phoneLabel: "Téléphone (recommandé)",
    companyLabel: "Entreprise (facultatif)",
    planLabel: "Formule qui vous intéresse",
    planNone: "Je ne sais pas encore",
    planEssentiel: "Essentiel",
    planCroissance: "Croissance",
    messageLabel: "Votre besoin en quelques mots (facultatif)",
    messagePlaceholder: "Ex. : contrat de distribution, litige avec un client, CGV pour ma boutique…",
    consentBefore: "J’accepte que Thrax Legal utilise ces informations pour me recontacter, conformément à la ",
    consentLink: "politique de confidentialité",
    consentAfter: ".",
    cta: "Être rappelé",
    sentHeading: "Merci, nous vous rappelons",
    sentBody: "Votre demande est bien reçue. Nous vous recontactons dans les meilleurs délais (en principe sous 1 jour ouvré).",
    backHome: "Retour à l’accueil",
    errorGeneric: "Vérifiez votre nom et votre adresse email.",
    errorConsent: "Merci d’accepter l’utilisation de vos informations pour être rappelé.",
    errorThrottled: "Trop de demandes depuis votre connexion. Réessayez dans une heure.",
    linkLabel: "Pas encore décidé ? Laissez vos coordonnées, nous vous rappelons.",
    alternative: "Vous savez déjà ce qu’il vous faut ?",
    alternativeCta: "S’inscrire directement",
    heroCta: "Être rappelé gratuitement",
    stickyCta: "Être rappelé",
    calloutText: "Une question avant de choisir ?",
    sectionEyebrow: "Sans engagement",
    sectionHeading: "Pas encore prêt ? Laissez-nous vos coordonnées.",
    sectionBody: "Décrivez votre besoin en quelques mots : nous vous rappelons pour répondre à vos questions et vous dire si l’abonnement vous convient. Gratuit, sans engagement, sans paiement.",
    points: ["Gratuit et sans engagement", "Nous vous rappelons en principe sous 1 jour ouvré", "Vos informations ne servent qu’à vous recontacter"],
  },
  de: {
    metaTitle: "Rückruf | Thrax Legal",
    heading: "Rückruf anfordern",
    subheading: "Hinterlassen Sie Ihre Kontaktdaten: Wir rufen Sie zurück, um Ihre Fragen zu beantworten, unverbindlich.",
    nameLabel: "Vor- und Nachname",
    emailLabel: "E-Mail-Adresse",
    phoneLabel: "Telefon (empfohlen)",
    companyLabel: "Unternehmen (freiwillig)",
    planLabel: "Formel, die Sie interessiert",
    planNone: "Ich weiss es noch nicht",
    planEssentiel: "Essentiel",
    planCroissance: "Croissance",
    messageLabel: "Ihr Anliegen in wenigen Worten (freiwillig)",
    messagePlaceholder: "Z. B.: Vertriebsvertrag, Streit mit einem Kunden, AGB für meinen Shop …",
    consentBefore: "Ich bin damit einverstanden, dass Thrax Legal diese Angaben verwendet, um mich zu kontaktieren, gemäss der ",
    consentLink: "Datenschutzerklärung",
    consentAfter: ".",
    cta: "Rückruf anfordern",
    sentHeading: "Danke, wir rufen Sie zurück",
    sentBody: "Ihre Anfrage ist eingegangen. Wir melden uns so rasch wie möglich (in der Regel innert 1 Arbeitstag).",
    backHome: "Zurück zur Startseite",
    errorGeneric: "Prüfen Sie Ihren Namen und Ihre E-Mail-Adresse.",
    errorConsent: "Bitte stimmen Sie der Verwendung Ihrer Angaben für den Rückruf zu.",
    errorThrottled: "Zu viele Anfragen von Ihrer Verbindung. Versuchen Sie es in einer Stunde erneut.",
    linkLabel: "Noch unentschlossen? Hinterlassen Sie Ihre Kontaktdaten, wir rufen Sie zurück.",
    alternative: "Sie wissen schon, was Sie brauchen?",
    alternativeCta: "Direkt anmelden",
    heroCta: "Kostenlos zurückgerufen werden",
    stickyCta: "Rückruf",
    calloutText: "Eine Frage vor der Wahl?",
    sectionEyebrow: "Unverbindlich",
    sectionHeading: "Noch nicht bereit? Hinterlassen Sie Ihre Kontaktdaten.",
    sectionBody: "Beschreiben Sie Ihr Anliegen in wenigen Worten: Wir rufen Sie zurück, beantworten Ihre Fragen und sagen Ihnen, ob das Abonnement zu Ihnen passt. Kostenlos, unverbindlich, ohne Zahlung.",
    points: ["Kostenlos und unverbindlich", "Wir rufen Sie in der Regel innert 1 Arbeitstag zurück", "Ihre Angaben dienen nur dazu, Sie zu kontaktieren"],
  },
  en: {
    metaTitle: "Request a call back | Thrax Legal",
    heading: "Request a call back",
    subheading: "Leave your details: we'll call you back to answer your questions, with no commitment.",
    nameLabel: "Full name",
    emailLabel: "Email address",
    phoneLabel: "Phone (recommended)",
    companyLabel: "Company (optional)",
    planLabel: "Plan you're interested in",
    planNone: "I don't know yet",
    planEssentiel: "Essential",
    planCroissance: "Growth",
    messageLabel: "Your need in a few words (optional)",
    messagePlaceholder: "E.g. distribution contract, dispute with a customer, T&Cs for my shop…",
    consentBefore: "I agree that Thrax Legal may use this information to contact me, in accordance with the ",
    consentLink: "privacy policy",
    consentAfter: ".",
    cta: "Request a call back",
    sentHeading: "Thank you, we'll call you back",
    sentBody: "Your request has been received. We'll get back to you as soon as possible (in principle within 1 business day).",
    backHome: "Back to home",
    errorGeneric: "Check your name and email address.",
    errorConsent: "Please agree to the use of your information so we can contact you.",
    errorThrottled: "Too many requests from your connection. Try again in an hour.",
    linkLabel: "Not decided yet? Leave your details and we'll call you back.",
    alternative: "Already know what you need?",
    alternativeCta: "Sign up directly",
    heroCta: "Get a free call back",
    stickyCta: "Call back",
    calloutText: "A question before you choose?",
    sectionEyebrow: "No commitment",
    sectionHeading: "Not ready yet? Leave us your details.",
    sectionBody: "Describe your need in a few words: we call you back to answer your questions and tell you whether the subscription suits you. Free, no commitment, no payment.",
    points: ["Free and no commitment", "We call you back, in principle within 1 business day", "Your details are only used to contact you"],
  },
  it: {
    metaTitle: "Essere richiamati | Thrax Legal",
    heading: "Essere richiamati",
    subheading: "Lasciate i vostri recapiti: vi richiamiamo per rispondere alle vostre domande, senza impegno.",
    nameLabel: "Nome e cognome",
    emailLabel: "Indirizzo email",
    phoneLabel: "Telefono (consigliato)",
    companyLabel: "Azienda (facoltativo)",
    planLabel: "Formula di vostro interesse",
    planNone: "Non lo so ancora",
    planEssentiel: "Essentiel",
    planCroissance: "Croissance",
    messageLabel: "La vostra esigenza in poche parole (facoltativo)",
    messagePlaceholder: "Es.: contratto di distribuzione, controversia con un cliente, condizioni generali per il mio negozio…",
    consentBefore: "Accetto che Thrax Legal utilizzi queste informazioni per ricontattarmi, conformemente all’",
    consentLink: "informativa sulla privacy",
    consentAfter: ".",
    cta: "Essere richiamati",
    sentHeading: "Grazie, vi richiamiamo",
    sentBody: "La vostra richiesta è stata ricevuta. Vi ricontattiamo il prima possibile (in linea di principio entro 1 giorno lavorativo).",
    backHome: "Torna alla home",
    errorGeneric: "Controllate nome e indirizzo email.",
    errorConsent: "Vi preghiamo di accettare l’uso delle vostre informazioni per essere richiamati.",
    errorThrottled: "Troppe richieste dalla vostra connessione. Riprovate tra un’ora.",
    linkLabel: "Non avete ancora deciso? Lasciate i vostri recapiti e vi richiamiamo.",
    alternative: "Sapete già di cosa avete bisogno?",
    alternativeCta: "Iscrivetevi direttamente",
    heroCta: "Essere richiamati gratuitamente",
    stickyCta: "Richiamo",
    calloutText: "Una domanda prima di scegliere?",
    sectionEyebrow: "Senza impegno",
    sectionHeading: "Non siete ancora pronti? Lasciateci i vostri recapiti.",
    sectionBody: "Descrivete la vostra esigenza in poche parole: vi richiamiamo per rispondere alle vostre domande e dirvi se l’abbonamento fa per voi. Gratuito, senza impegno, senza pagamento.",
    points: ["Gratuito e senza impegno", "Vi richiamiamo in linea di principio entro 1 giorno lavorativo", "I vostri dati servono solo per ricontattarvi"],
  },
};
