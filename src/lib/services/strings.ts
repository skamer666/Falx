import type { Locale } from "@/i18n/config";
import type { Audience } from "./catalog";

type Step = { title: string; text: string };
type Faq = { q: string; a: string };

export type ServicesUi = {
  home: {
    metaTitle: string;
    metaDescription: string;
    title: string;
    question: string;
    b2c: { label: string; hint: string; price: string };
    b2b: { label: string; hint: string; price: string };
    proof: string[];
    notSure: string;
    notSureCta: string;
  };
  hub: Record<
    Audience,
    { metaTitle: string; metaDescription: string; eyebrow: string; title: string; subtitle: string; switchLabel: string }
  >;
  finder: {
    searchLabel: string;
    searchPlaceholder: Record<Audience, string>;
    popular: string;
    all: string;
    noResult: string;
    noResultCta: string;
    order: string;
  };
  price: { vatIncl: string; vatExcl: string; from: string };
  days: (n: number) => string;
  steps: { title: string; intro: string; items: Step[] };
  compare: { title: string; lawyer: [string, string, string]; alone: [string, string, string]; us: [string, string, string] };
  hubFaq: Record<Audience, Faq[]>;
  faqTitle: string;
  callback: { title: string; body: string; cta: string };
  service: {
    breadcrumbHome: string;
    included: string;
    needs: string;
    note: string;
    faq: string;
    related: string;
    guide: string;
    delivery: (n: number) => string;
    revision: string;
    payAfter: string;
    orderTitle: string;
    mobileCta: string;
    notLawyer: string;
  };
  form: {
    name: string;
    email: string;
    phone: string;
    company: string;
    situation: string;
    situationPlaceholder: string;
    deadline: string;
    express: string;
    expressHint: string;
    filesNote: string;
    consentLink: string;
    termsAnd: string;
    termsBefore: string;
    termsLink: string;
    submit: string;
    errors: { generic: string; consent: string; throttled: string };
  };
  thanks: { metaTitle: string; heading: string; body: string; next: string[]; back: string; quoteHeading: string; quoteBody: string };
  quote: {
    title: string;
    body: string;
    points: [string, string, string];
    cta: string;
    situation: string;
    situationPlaceholder: Record<Audience, string>;
    submit: string;
    label: Record<Audience, string>;
  };
};

const fr: ServicesUi = {
  home: {
    metaTitle: "Thrax Legal | Le juridique à prix fixe, Suisse romande",
    metaDescription:
      "Lettres, contrats, litiges, démarches : particuliers et entreprises de Suisse romande, un prix fixe annoncé avant de commencer. Dès 49 CHF.",
    title: "Le juridique à prix fixe, jamais à l'heure.",
    question: "Vous êtes :",
    b2c: { label: "Je suis un particulier", hint: "Travail, logement, achats, impôts, famille", price: "Dès 49 CHF" },
    b2b: { label: "Je suis une entreprise", hint: "Factures impayées, contrats, employés, nLPD", price: "À l'acte ou en abonnement" },
    proof: ["Prix fixe annoncé avant de commencer", "Réponse claire, par écrit", "Suisse romande"],
    notSure: "Vous ne savez pas quoi choisir ?",
    notSureCta: "Être rappelé gratuitement",
  },
  hub: {
    particuliers: {
      metaTitle: "Aide juridique pour particuliers à prix fixe | Thrax Legal",
      metaDescription:
        "Certificat de travail, licenciement, loyer, garantie, assurance, poursuite, testament : votre lettre ou votre document à prix fixe, dès 49 CHF.",
      eyebrow: "Pour les particuliers en Suisse romande",
      title: "De quoi avez-vous besoin ?",
      subtitle: "Trouvez votre situation dans la liste. On rédige le document, vous l'envoyez vous-même, et le prix indiqué est celui que vous payez.",
      switchLabel: "Vous êtes une entreprise ?",
    },
    entreprises: {
      metaTitle: "Service juridique externalisé pour PME, à prix fixe | Thrax Legal",
      metaDescription:
        "Recouvrement, CGV, contrats, employés, nLPD : prestations à prix fixe pour indépendants et PME de Suisse romande, à l'acte ou en abonnement.",
      eyebrow: "Pour les indépendants et les PME de Suisse romande",
      title: "Votre service juridique externalisé, à prix fixe.",
      subtitle: "Choisissez une prestation à l'acte, ou passez à l'abonnement si vos besoins sont réguliers.",
      switchLabel: "Vous êtes un particulier ?",
    },
  },
  finder: {
    searchLabel: "Rechercher",
    searchPlaceholder: {
      particuliers: "Ex. certificat de travail, loyer, licenciement…",
      entreprises: "Ex. facture impayée, CGV, contrat de travail…",
    },
    popular: "Les plus demandées",
    all: "Tout",
    noResult: "Aucune prestation ne correspond. Décrivez-nous votre problème : on vous fait un devis à prix fixe, gratuit.",
    noResultCta: "Demander un devis gratuit",
    order: "Commander",
  },
  price: { vatIncl: "prix final", vatExcl: "HT", from: "dès" },
  days: (n) => (n === 1 ? "Livré sous 1 jour ouvré" : `Livré sous ${n} jours ouvrés`),
  steps: {
    title: "Comment ça se passe",
    intro: "Tout se fait par écrit, depuis chez vous. Vous connaissez le prix avant de commencer, et vous ne payez qu'une fois qu'on a confirmé pouvoir vous aider.",
    items: [
      { title: "Vous nous racontez ce qui se passe", text: "Choisissez une prestation et décrivez votre situation avec vos mots. Inutile de connaître le vocabulaire juridique." },
      { title: "On vérifie avant que vous payiez", text: "On lit votre demande et on vous répond par email, en principe sous un jour ouvré. Si la prestation ne convient pas à votre cas, on vous le dit, et vous ne payez rien." },
      { title: "Vous payez et vous envoyez vos pièces", text: "Par TWINT ou facture QR. Ensuite, vous répondez à notre email avec les documents utiles : le contrat, la lettre reçue, des photos." },
      { title: "Vous recevez votre document", text: "Il est prêt à envoyer, avec une note qui explique quoi en faire et quel délai surveiller. Si quelque chose ne vous convient pas, on le corrige une fois sans frais." },
    ],
  },
  compare: {
    title: "Pourquoi pas un avocat, ou faire seul ?",
    lawyer: ["Avocat", "200 à 600 CHF de l'heure", "Indispensable devant un tribunal, souvent surdimensionné pour une lettre."],
    alone: ["Faire seul", "Gratuit, mais risqué", "Un délai raté ou une mauvaise formulation, et vos droits peuvent tomber."],
    us: ["Thrax Legal", "Un prix fixe, dès 49 CHF", "Le bon document, au bon moment, avec les délais vérifiés."],
  },
  hubFaq: {
    particuliers: [
      { q: "Thrax Legal est-il un cabinet d'avocats ?", a: "Non. Nous rédigeons vos lettres, analyses et documents, et vous les envoyez ou les déposez vous-même. Si votre situation exige un avocat, par exemple pour plaider, nous vous le disons avant que vous payiez." },
      { q: "Quand est-ce que je paie ?", a: "Après notre confirmation écrite que la prestation convient à votre situation. Le prix affiché est le prix final : rien ne s'y ajoute." },
      { q: "Et si mon délai expire bientôt ?", a: "Choisissez l'option express (+49 CHF) : le document est livré en 24 heures ouvrées. Indiquez la date limite dans votre demande." },
      { q: "J'ai une protection juridique, est-ce utile ?", a: "Votre assurance intervient surtout quand le litige est ouvert, après un dossier de sinistre. Nous rédigeons le courrier tout de suite, à prix fixe." },
      { q: "Travaillez-vous aussi pour des entreprises ?", a: "Oui. Avant chaque mandat, nous vérifions que nous ne travaillons pas pour la partie adverse." },
    ],
    entreprises: [
      { q: "À l'acte ou en abonnement ?", a: "À l'acte si vous avez un besoin ponctuel. L'abonnement devient intéressant dès que vous avez plusieurs demandes par mois : il inclut un volume de questions et de dossiers." },
      { q: "Quand est-ce que je paie une prestation à l'acte ?", a: "Après notre confirmation écrite du prix et du délai. Les prix des prestations pour entreprises sont indiqués hors TVA." },
    ],
  },
  faqTitle: "Questions fréquentes",
  callback: {
    title: "Pas sûr de ce qu'il vous faut ?",
    body: "Décrivez votre situation : on vous répond avec la bonne prestation et son prix, sans engagement.",
    cta: "Être rappelé gratuitement",
  },
  service: {
    breadcrumbHome: "Accueil",
    included: "Ce qui est inclus",
    needs: "Ce qu'il nous faut",
    note: "Bon à savoir",
    faq: "Questions fréquentes",
    related: "Prestations liées",
    guide: "Lire le guide gratuit sur ce sujet",
    delivery: (n) => (n === 1 ? "Livré sous 1 jour ouvré" : `Livré sous ${n} jours ouvrés`),
    revision: "Un tour de corrections inclus",
    payAfter: "Vous ne payez qu'après notre confirmation écrite. TWINT ou facture QR.",
    orderTitle: "Commander",
    mobileCta: "Commander",
    notLawyer: "Thrax Legal n'est pas un cabinet d'avocats et ne vous représente pas devant les tribunaux.",
  },
  form: {
    name: "Nom et prénom",
    email: "Email",
    phone: "Téléphone (facultatif)",
    company: "Entreprise",
    situation: "Votre situation",
    situationPlaceholder: "En quelques phrases : ce qui s'est passé, ce que vous voulez obtenir.",
    deadline: "Date limite éventuelle (facultatif)",
    express: "Option express : livré en 24 h ouvrées",
    expressHint: "+49 CHF, si un délai court bientôt",
    filesNote: "Vos documents : vous pourrez nous les envoyer après notre confirmation.",
    consentLink: "politique de confidentialité",
    termsAnd: " et la ",
    termsBefore: "J'accepte les ",
    termsLink: "conditions générales",
    submit: "Commander",
    errors: {
      generic: "Merci de vérifier votre nom, votre email et la description de votre situation.",
      consent: "Merci de cocher les deux cases d'acceptation.",
      throttled: "Trop de demandes depuis cette connexion. Réessayez dans une heure ou écrivez-nous à hey@thrax-legal.ch.",
    },
  },
  thanks: {
    metaTitle: "Commande reçue | Thrax Legal",
    heading: "Merci, votre demande est bien reçue",
    body: "Nous vérifions que la prestation convient à votre situation et vous confirmons par email le prix et le délai, en principe sous 1 jour ouvré.",
    next: [
      "Vous recevez notre confirmation et les instructions de paiement (TWINT ou facture QR).",
      "Vous nous envoyez vos documents en répondant à l'email.",
      "Nous livrons votre document dans le délai annoncé.",
    ],
    back: "Retour à l'accueil",
    quoteHeading: "Merci, nous préparons votre devis",
    quoteBody: "Nous étudions votre situation et vous envoyons un devis à prix fixe par email, en principe sous 1 jour ouvré. Il est gratuit et sans engagement.",
  },
  quote: {
    title: "Votre problème n'est pas dans la liste ?",
    body: "Décrivez-le-nous. On vous répond avec un devis à prix fixe.",
    points: ["Gratuit et sans engagement", "Prix fixe, annoncé avant de commencer", "Réponse en principe sous 1 jour ouvré"],
    cta: "Demander un devis gratuit",
    situation: "Décrivez votre problème",
    situationPlaceholder: {
      particuliers: "Ex. : mon ancien employeur refuse de me payer mes heures, mon garagiste a facturé une réparation non demandée…",
      entreprises: "Ex. : un fournisseur ne livre pas, un ancien associé utilise notre nom, nous voulons vérifier un contrat de franchise…",
    },
    submit: "Recevoir mon devis gratuit",
    label: { particuliers: "Demande de devis (particulier)", entreprises: "Demande de devis (entreprise)" },
  },
};

const de: ServicesUi = {
  home: {
    metaTitle: "Thrax Legal | Rechtliches zum Fixpreis, Westschweiz",
    metaDescription:
      "Briefe, Verträge, Streitfälle, Verfahren: für Privatpersonen und Unternehmen in der Westschweiz, Fixpreis vor Beginn. Ab CHF 49.",
    title: "Rechtliches zum Fixpreis, nie nach Stunden.",
    question: "Sie sind:",
    b2c: { label: "Ich bin Privatperson", hint: "Arbeit, Wohnen, Einkäufe, Steuern, Familie", price: "Ab CHF 49" },
    b2b: { label: "Ich bin ein Unternehmen", hint: "Offene Rechnungen, Verträge, Personal, DSG", price: "Einzeln oder im Abo" },
    proof: ["Fixpreis vor Beginn", "Klare schriftliche Antwort", "Westschweiz"],
    notSure: "Sie wissen nicht, was Sie wählen sollen?",
    notSureCta: "Kostenlosen Rückruf anfordern",
  },
  hub: {
    particuliers: {
      metaTitle: "Rechtshilfe für Privatpersonen zum Fixpreis | Thrax Legal",
      metaDescription:
        "Arbeitszeugnis, Kündigung, Miete, Kaution, Versicherung, Betreibung, Testament: Ihr Brief oder Dokument zum Fixpreis, ab CHF 49.",
      eyebrow: "Für Privatpersonen in der Westschweiz",
      title: "Was brauchen Sie?",
      subtitle: "Suchen Sie Ihre Situation in der Liste. Wir verfassen das Dokument, Sie versenden es selbst, und der angegebene Preis ist der, den Sie zahlen.",
      switchLabel: "Sie sind ein Unternehmen?",
    },
    entreprises: {
      metaTitle: "Externer Rechtsdienst für KMU zum Fixpreis | Thrax Legal",
      metaDescription:
        "Inkasso, AGB, Verträge, Personal, DSG: Leistungen zum Fixpreis für Selbstständige und KMU in der Westschweiz, einzeln oder im Abo.",
      eyebrow: "Für Selbstständige und KMU in der Westschweiz",
      title: "Ihr externer Rechtsdienst, zum Fixpreis.",
      subtitle: "Wählen Sie eine Einzelleistung oder das Abo, wenn Ihr Bedarf regelmässig ist.",
      switchLabel: "Sie sind Privatperson?",
    },
  },
  finder: {
    searchLabel: "Suchen",
    searchPlaceholder: {
      particuliers: "z. B. Arbeitszeugnis, Miete, Kündigung …",
      entreprises: "z. B. offene Rechnung, AGB, Arbeitsvertrag …",
    },
    popular: "Am meisten gefragt",
    all: "Alle",
    noResult: "Keine Leistung passt. Beschreiben Sie Ihr Problem: Wir erstellen eine kostenlose Fixpreis-Offerte.",
    noResultCta: "Kostenlose Offerte anfordern",
    order: "Bestellen",
  },
  price: { vatIncl: "Endpreis", vatExcl: "exkl. MWST", from: "ab" },
  days: (n) => (n === 1 ? "Lieferung innert 1 Arbeitstag" : `Lieferung innert ${n} Arbeitstagen`),
  steps: {
    title: "So läuft es ab",
    intro: "Alles läuft schriftlich, bequem von zu Hause aus. Sie kennen den Preis vorher und zahlen erst, wenn wir bestätigt haben, dass wir Ihnen helfen können.",
    items: [
      { title: "Sie schildern uns, was passiert ist", text: "Wählen Sie eine Leistung und beschreiben Sie Ihre Situation in eigenen Worten. Juristische Fachbegriffe brauchen Sie nicht." },
      { title: "Wir prüfen, bevor Sie zahlen", text: "Wir lesen Ihre Anfrage und antworten per E-Mail, in der Regel innert eines Arbeitstags. Passt die Leistung nicht zu Ihrem Fall, sagen wir es Ihnen, und Sie zahlen nichts." },
      { title: "Sie zahlen und senden Ihre Unterlagen", text: "Per TWINT oder QR-Rechnung. Danach antworten Sie auf unsere E-Mail mit den nötigen Dokumenten: Vertrag, erhaltener Brief, Fotos." },
      { title: "Sie erhalten Ihr Dokument", text: "Versandbereit, mit einer Notiz, was damit zu tun ist und welche Frist läuft. Passt etwas nicht, korrigieren wir es einmal kostenlos." },
    ],
  },
  compare: {
    title: "Warum nicht ein Anwalt oder selbst machen?",
    lawyer: ["Anwalt", "CHF 200 bis 600 pro Stunde", "Vor Gericht unverzichtbar, für einen Brief oft überdimensioniert."],
    alone: ["Selbst machen", "Gratis, aber riskant", "Eine verpasste Frist oder falsche Formulierung, und Ihre Rechte können verfallen."],
    us: ["Thrax Legal", "Ein Fixpreis, ab CHF 49", "Das richtige Dokument zur richtigen Zeit, mit geprüften Fristen."],
  },
  hubFaq: {
    particuliers: [
      { q: "Ist Thrax Legal eine Anwaltskanzlei?", a: "Nein. Wir verfassen Ihre Briefe, Analysen und Dokumente, und Sie versenden oder reichen sie selbst ein. Braucht es einen Anwalt, sagen wir es Ihnen, bevor Sie bezahlen." },
      { q: "Wann bezahle ich?", a: "Nach unserer schriftlichen Bestätigung, dass die Leistung zu Ihrer Situation passt. Der angegebene Preis ist der Endpreis: Es kommt nichts hinzu." },
      { q: "Und wenn meine Frist bald abläuft?", a: "Wählen Sie die Express-Option (+CHF 49): Lieferung innert 24 Arbeitsstunden. Geben Sie das Fristende in Ihrer Anfrage an." },
      { q: "Ich habe eine Rechtsschutzversicherung, lohnt es sich?", a: "Die Versicherung greift vor allem, wenn der Streit eröffnet ist, nach einer Schadenmeldung. Wir verfassen den Brief sofort, zum Fixpreis." },
      { q: "Arbeiten Sie auch für Unternehmen?", a: "Ja. Vor jedem Mandat prüfen wir, dass wir nicht für die Gegenpartei tätig sind." },
    ],
    entreprises: [
      { q: "Einzeln oder im Abo?", a: "Einzeln bei punktuellem Bedarf. Das Abo lohnt sich ab mehreren Anfragen pro Monat: Es umfasst ein Volumen an Fragen und Anliegen." },
      { q: "Wann bezahle ich eine Einzelleistung?", a: "Nach unserer schriftlichen Bestätigung von Preis und Frist. Preise für Unternehmen verstehen sich exkl. MWST." },
    ],
  },
  faqTitle: "Häufige Fragen",
  callback: {
    title: "Nicht sicher, was Sie brauchen?",
    body: "Beschreiben Sie Ihre Situation: Wir antworten mit der passenden Leistung und ihrem Preis, unverbindlich.",
    cta: "Kostenlosen Rückruf anfordern",
  },
  service: {
    breadcrumbHome: "Startseite",
    included: "Inbegriffen",
    needs: "Was wir brauchen",
    note: "Gut zu wissen",
    faq: "Häufige Fragen",
    related: "Verwandte Leistungen",
    guide: "Den kostenlosen Ratgeber zum Thema lesen",
    delivery: (n) => (n === 1 ? "Lieferung innert 1 Arbeitstag" : `Lieferung innert ${n} Arbeitstagen`),
    revision: "Eine Korrekturrunde inbegriffen",
    payAfter: "Sie zahlen erst nach unserer schriftlichen Bestätigung. TWINT oder QR-Rechnung.",
    orderTitle: "Bestellen",
    mobileCta: "Bestellen",
    notLawyer: "Thrax Legal ist keine Anwaltskanzlei und vertritt Sie nicht vor Gericht.",
  },
  form: {
    name: "Vor- und Nachname",
    email: "E-Mail",
    phone: "Telefon (freiwillig)",
    company: "Unternehmen",
    situation: "Ihre Situation",
    situationPlaceholder: "In wenigen Sätzen: was geschehen ist und was Sie erreichen möchten.",
    deadline: "Allfällige Frist (freiwillig)",
    express: "Express-Option: Lieferung innert 24 Arbeitsstunden",
    expressHint: "+CHF 49, wenn eine Frist bald abläuft",
    filesNote: "Ihre Unterlagen können Sie nach unserer Bestätigung senden.",
    consentLink: "Datenschutzerklärung",
    termsAnd: " und die ",
    termsBefore: "Ich akzeptiere die ",
    termsLink: "Allgemeinen Geschäftsbedingungen",
    submit: "Bestellen",
    errors: {
      generic: "Bitte prüfen Sie Name, E-Mail und die Beschreibung Ihrer Situation.",
      consent: "Bitte kreuzen Sie beide Zustimmungsfelder an.",
      throttled: "Zu viele Anfragen von dieser Verbindung. Versuchen Sie es in einer Stunde erneut oder schreiben Sie an hey@thrax-legal.ch.",
    },
  },
  thanks: {
    metaTitle: "Bestellung erhalten | Thrax Legal",
    heading: "Danke, Ihre Anfrage ist eingegangen",
    body: "Wir prüfen, ob die Leistung zu Ihrer Situation passt, und bestätigen Ihnen Preis und Frist per E-Mail, in der Regel innert 1 Arbeitstag.",
    next: [
      "Sie erhalten unsere Bestätigung und die Zahlungsangaben (TWINT oder QR-Rechnung).",
      "Sie senden uns Ihre Unterlagen als Antwort auf die E-Mail.",
      "Wir liefern Ihr Dokument in der angegebenen Frist.",
    ],
    back: "Zur Startseite",
    quoteHeading: "Danke, wir erstellen Ihre Offerte",
    quoteBody: "Wir prüfen Ihre Situation und senden Ihnen eine Fixpreis-Offerte per E-Mail, in der Regel innert 1 Arbeitstag. Sie ist kostenlos und unverbindlich.",
  },
  quote: {
    title: "Ihr Problem ist nicht in der Liste?",
    body: "Beschreiben Sie es uns. Wir antworten mit einer Offerte zum Fixpreis.",
    points: ["Kostenlos und unverbindlich", "Fixpreis, vor Beginn bekannt", "Antwort in der Regel innert 1 Arbeitstag"],
    cta: "Kostenlose Offerte anfordern",
    situation: "Beschreiben Sie Ihr Problem",
    situationPlaceholder: {
      particuliers: "z. B.: Mein früherer Arbeitgeber zahlt meine Stunden nicht, meine Garage hat eine nicht bestellte Reparatur verrechnet …",
      entreprises: "z. B.: Ein Lieferant liefert nicht, ein ehemaliger Partner verwendet unseren Namen, wir möchten einen Franchisevertrag prüfen …",
    },
    submit: "Kostenlose Offerte erhalten",
    label: { particuliers: "Offertanfrage (Privatperson)", entreprises: "Offertanfrage (Unternehmen)" },
  },
};

const en: ServicesUi = {
  home: {
    metaTitle: "Thrax Legal | Fixed-price legal help, French-speaking Switzerland",
    metaDescription:
      "Letters, contracts, disputes, procedures: for individuals and businesses in French-speaking Switzerland, a fixed price before we start. From CHF 49.",
    title: "Legal help at a fixed price, never by the hour.",
    question: "You are:",
    b2c: { label: "I'm an individual", hint: "Work, housing, purchases, tax, family", price: "From CHF 49" },
    b2b: { label: "I'm a business", hint: "Unpaid invoices, contracts, staff, FADP", price: "Per service or by subscription" },
    proof: ["Fixed price before we start", "Clear written answer", "French-speaking Switzerland"],
    notSure: "Not sure what to choose?",
    notSureCta: "Request a free call back",
  },
  hub: {
    particuliers: {
      metaTitle: "Fixed-price legal help for individuals | Thrax Legal",
      metaDescription:
        "Work reference, dismissal, rent, deposit, insurance, debt enforcement, will: your letter or document at a fixed price, from CHF 49.",
      eyebrow: "For individuals in French-speaking Switzerland",
      title: "What do you need?",
      subtitle: "Find your situation in the list. We draft the document, you send it yourself, and the price shown is the price you pay.",
      switchLabel: "Are you a business?",
    },
    entreprises: {
      metaTitle: "Outsourced legal service for SMEs, fixed price | Thrax Legal",
      metaDescription:
        "Debt collection, T&Cs, contracts, staff, FADP: fixed-price services for freelancers and SMEs in French-speaking Switzerland, per service or by subscription.",
      eyebrow: "For freelancers and SMEs in French-speaking Switzerland",
      title: "Your outsourced legal service, at a fixed price.",
      subtitle: "Pick a one-off service, or switch to the subscription if your needs are regular.",
      switchLabel: "Are you an individual?",
    },
  },
  finder: {
    searchLabel: "Search",
    searchPlaceholder: {
      particuliers: "e.g. work reference, rent, dismissal…",
      entreprises: "e.g. unpaid invoice, T&Cs, employment contract…",
    },
    popular: "Most requested",
    all: "All",
    noResult: "No service matches. Describe your problem: we'll send a free fixed-price quote.",
    noResultCta: "Request a free quote",
    order: "Order",
  },
  price: { vatIncl: "final price", vatExcl: "excl. VAT", from: "from" },
  days: (n) => (n === 1 ? "Delivered within 1 working day" : `Delivered within ${n} working days`),
  steps: {
    title: "How it works",
    intro: "Everything happens in writing, from home. You know the price before we start, and you only pay once we have confirmed we can help.",
    items: [
      { title: "You tell us what happened", text: "Choose a service and describe your situation in your own words. You don't need any legal vocabulary." },
      { title: "We check before you pay", text: "We read your request and reply by email, usually within one working day. If the service doesn't fit your case, we tell you, and you pay nothing." },
      { title: "You pay and send your documents", text: "By TWINT or QR bill. Then you reply to our email with the relevant documents: the contract, the letter you received, photos." },
      { title: "You receive your document", text: "Ready to send, with a note explaining what to do with it and which deadline to watch. If something isn't right, we correct it once at no charge." },
    ],
  },
  compare: {
    title: "Why not a lawyer, or do it yourself?",
    lawyer: ["Lawyer", "CHF 200 to 600 per hour", "Essential in court, often overkill for a letter."],
    alone: ["Do it yourself", "Free, but risky", "A missed deadline or the wrong wording, and your rights can lapse."],
    us: ["Thrax Legal", "A fixed price, from CHF 49", "The right document at the right time, deadlines checked."],
  },
  hubFaq: {
    particuliers: [
      { q: "Is Thrax Legal a law firm?", a: "No. We draft your letters, analyses and documents, and you send or file them yourself. If your situation needs a lawyer, we tell you before you pay." },
      { q: "When do I pay?", a: "After we confirm in writing that the service fits your situation. The displayed price is final: nothing is added." },
      { q: "What if my deadline is close?", a: "Choose the express option (+CHF 49): delivered within 24 working hours. Mention the deadline in your request." },
      { q: "I have legal protection insurance, is this useful?", a: "Insurance mainly steps in once a dispute is open, after a claim. We draft the letter right away, at a fixed price." },
      { q: "Do you also work for businesses?", a: "Yes. Before each assignment we check we don't act for the other party." },
    ],
    entreprises: [
      { q: "One-off or subscription?", a: "One-off for an occasional need. The subscription pays off with several requests a month: it includes a volume of questions and matters." },
      { q: "When do I pay for a one-off service?", a: "After we confirm the price and timing in writing. Business prices exclude VAT." },
    ],
  },
  faqTitle: "Frequently asked questions",
  callback: {
    title: "Not sure what you need?",
    body: "Describe your situation: we reply with the right service and its price, no commitment.",
    cta: "Request a free call back",
  },
  service: {
    breadcrumbHome: "Home",
    included: "What's included",
    needs: "What we need",
    note: "Good to know",
    faq: "Frequently asked questions",
    related: "Related services",
    guide: "Read the free guide on this topic",
    delivery: (n) => (n === 1 ? "Delivered within 1 working day" : `Delivered within ${n} working days`),
    revision: "One round of revisions included",
    payAfter: "You only pay after our written confirmation. TWINT or QR bill.",
    orderTitle: "Order",
    mobileCta: "Order",
    notLawyer: "Thrax Legal is not a law firm and does not represent you in court.",
  },
  form: {
    name: "Full name",
    email: "Email",
    phone: "Phone (optional)",
    company: "Company",
    situation: "Your situation",
    situationPlaceholder: "In a few sentences: what happened and what you want to achieve.",
    deadline: "Any deadline (optional)",
    express: "Express option: delivered within 24 working hours",
    expressHint: "+CHF 49, if a deadline is close",
    filesNote: "You can send us your documents after our confirmation.",
    consentLink: "privacy policy",
    termsAnd: " and the ",
    termsBefore: "I accept the ",
    termsLink: "terms and conditions",
    submit: "Order",
    errors: {
      generic: "Please check your name, email and the description of your situation.",
      consent: "Please tick both acceptance boxes.",
      throttled: "Too many requests from this connection. Try again in an hour or write to hey@thrax-legal.ch.",
    },
  },
  thanks: {
    metaTitle: "Order received | Thrax Legal",
    heading: "Thank you, your request has been received",
    body: "We check that the service fits your situation and confirm the price and timing by email, usually within 1 working day.",
    next: [
      "You receive our confirmation and payment details (TWINT or QR bill).",
      "You send us your documents by replying to the email.",
      "We deliver your document within the announced time.",
    ],
    back: "Back to home",
    quoteHeading: "Thank you, we're preparing your quote",
    quoteBody: "We review your situation and email you a fixed-price quote, usually within 1 working day. It is free and without obligation.",
  },
  quote: {
    title: "Your problem isn't on the list?",
    body: "Describe it to us. We'll reply with a fixed-price quote.",
    points: ["Free and without obligation", "Fixed price, announced before we start", "Reply usually within 1 working day"],
    cta: "Request a free quote",
    situation: "Describe your problem",
    situationPlaceholder: {
      particuliers: "e.g. my former employer won't pay my hours, my garage charged for a repair I didn't ask for…",
      entreprises: "e.g. a supplier doesn't deliver, a former partner uses our name, we want to check a franchise agreement…",
    },
    submit: "Get my free quote",
    label: { particuliers: "Quote request (individual)", entreprises: "Quote request (business)" },
  },
};

const it: ServicesUi = {
  home: {
    metaTitle: "Thrax Legal | Assistenza giuridica a prezzo fisso, Svizzera romanda",
    metaDescription:
      "Lettere, contratti, controversie, pratiche: per privati e imprese della Svizzera romanda, un prezzo fisso prima di iniziare. Da CHF 49.",
    title: "Il giuridico a prezzo fisso, mai a ore.",
    question: "Siete:",
    b2c: { label: "Sono un privato", hint: "Lavoro, abitazione, acquisti, imposte, famiglia", price: "Da CHF 49" },
    b2b: { label: "Sono un'impresa", hint: "Fatture non pagate, contratti, personale, nLPD", price: "A prestazione o in abbonamento" },
    proof: ["Prezzo fisso prima di iniziare", "Risposta chiara, per scritto", "Svizzera romanda"],
    notSure: "Non sapete cosa scegliere?",
    notSureCta: "Essere richiamati gratuitamente",
  },
  hub: {
    particuliers: {
      metaTitle: "Assistenza giuridica per privati a prezzo fisso | Thrax Legal",
      metaDescription:
        "Certificato di lavoro, licenziamento, pigione, garanzia, assicurazione, esecuzione, testamento: la vostra lettera o documento a prezzo fisso, da CHF 49.",
      eyebrow: "Per i privati in Svizzera romanda",
      title: "Di cosa avete bisogno?",
      subtitle: "Trovate la vostra situazione nella lista. Redigiamo il documento, lo inviate voi stessi, e il prezzo indicato è quello che pagate.",
      switchLabel: "Siete un'impresa?",
    },
    entreprises: {
      metaTitle: "Servizio giuridico esternalizzato per PMI, prezzo fisso | Thrax Legal",
      metaDescription:
        "Incasso, CG, contratti, personale, nLPD: prestazioni a prezzo fisso per indipendenti e PMI della Svizzera romanda, a prestazione o in abbonamento.",
      eyebrow: "Per indipendenti e PMI in Svizzera romanda",
      title: "Il vostro servizio giuridico esternalizzato, a prezzo fisso.",
      subtitle: "Scegliete una prestazione singola o passate all'abbonamento se le vostre esigenze sono regolari.",
      switchLabel: "Siete un privato?",
    },
  },
  finder: {
    searchLabel: "Cerca",
    searchPlaceholder: {
      particuliers: "Es. certificato di lavoro, pigione, licenziamento…",
      entreprises: "Es. fattura non pagata, CG, contratto di lavoro…",
    },
    popular: "Le più richieste",
    all: "Tutte",
    noResult: "Nessuna prestazione corrisponde. Descriveteci il problema: vi facciamo un preventivo gratuito a prezzo fisso.",
    noResultCta: "Chiedere un preventivo gratuito",
    order: "Ordinare",
  },
  price: { vatIncl: "prezzo finale", vatExcl: "IVA esclusa", from: "da" },
  days: (n) => (n === 1 ? "Consegna entro 1 giorno lavorativo" : `Consegna entro ${n} giorni lavorativi`),
  steps: {
    title: "Come funziona",
    intro: "Tutto avviene per iscritto, da casa vostra. Conoscete il prezzo prima di iniziare e pagate solo dopo che abbiamo confermato di potervi aiutare.",
    items: [
      { title: "Ci raccontate cosa succede", text: "Scegliete una prestazione e descrivete la vostra situazione con parole vostre. Non serve conoscere il linguaggio giuridico." },
      { title: "Verifichiamo prima che paghiate", text: "Leggiamo la richiesta e vi rispondiamo per email, di regola entro un giorno lavorativo. Se la prestazione non fa al caso vostro, ve lo diciamo e non pagate nulla." },
      { title: "Pagate e inviate i documenti", text: "Con TWINT o fattura QR. Poi rispondete alla nostra email con i documenti utili: il contratto, la lettera ricevuta, delle foto." },
      { title: "Ricevete il vostro documento", text: "Pronto da inviare, con una nota che spiega cosa farne e quale termine tenere d'occhio. Se qualcosa non va, lo correggiamo una volta senza costi." },
    ],
  },
  compare: {
    title: "Perché non un avvocato, o fare da soli?",
    lawyer: ["Avvocato", "CHF 200-600 all'ora", "Indispensabile in tribunale, spesso eccessivo per una lettera."],
    alone: ["Fare da soli", "Gratis, ma rischioso", "Un termine mancato o una formulazione sbagliata, e i vostri diritti possono decadere."],
    us: ["Thrax Legal", "Un prezzo fisso, da CHF 49", "Il documento giusto al momento giusto, con i termini verificati."],
  },
  hubFaq: {
    particuliers: [
      { q: "Thrax Legal è uno studio legale?", a: "No. Redigiamo lettere, analisi e documenti, che inviate o depositate voi. Se la vostra situazione richiede un avvocato, ve lo diciamo prima che paghiate." },
      { q: "Quando pago?", a: "Dopo la nostra conferma scritta che la prestazione è adatta alla vostra situazione. Il prezzo indicato è finale: non si aggiunge nulla." },
      { q: "E se il mio termine scade presto?", a: "Scegliete l'opzione express (+CHF 49): consegna entro 24 ore lavorative. Indicate la scadenza nella richiesta." },
      { q: "Ho una protezione giuridica, è utile?", a: "L'assicurazione interviene soprattutto a controversia aperta, dopo una notifica di sinistro. Noi redigiamo la lettera subito, a prezzo fisso." },
      { q: "Lavorate anche per imprese?", a: "Sì. Prima di ogni mandato verifichiamo di non lavorare per la controparte." },
    ],
    entreprises: [
      { q: "A prestazione o in abbonamento?", a: "A prestazione per un bisogno puntuale. L'abbonamento conviene con più richieste al mese: include un volume di domande e pratiche." },
      { q: "Quando pago una prestazione singola?", a: "Dopo la nostra conferma scritta di prezzo e termine. I prezzi per le imprese sono IVA esclusa." },
    ],
  },
  faqTitle: "Domande frequenti",
  callback: {
    title: "Non siete sicuri di cosa vi serve?",
    body: "Descrivete la vostra situazione: vi rispondiamo con la prestazione giusta e il suo prezzo, senza impegno.",
    cta: "Essere richiamati gratuitamente",
  },
  service: {
    breadcrumbHome: "Home",
    included: "Cosa è incluso",
    needs: "Cosa ci serve",
    note: "Buono a sapersi",
    faq: "Domande frequenti",
    related: "Prestazioni correlate",
    guide: "Leggere la guida gratuita sul tema",
    delivery: (n) => (n === 1 ? "Consegna entro 1 giorno lavorativo" : `Consegna entro ${n} giorni lavorativi`),
    revision: "Un giro di correzioni incluso",
    payAfter: "Pagate solo dopo la nostra conferma scritta. TWINT o fattura QR.",
    orderTitle: "Ordinare",
    mobileCta: "Ordinare",
    notLawyer: "Thrax Legal non è uno studio legale e non vi rappresenta in tribunale.",
  },
  form: {
    name: "Nome e cognome",
    email: "Email",
    phone: "Telefono (facoltativo)",
    company: "Impresa",
    situation: "La vostra situazione",
    situationPlaceholder: "In poche frasi: cosa è successo e cosa volete ottenere.",
    deadline: "Eventuale scadenza (facoltativo)",
    express: "Opzione express: consegna entro 24 ore lavorative",
    expressHint: "+CHF 49, se un termine scade presto",
    filesNote: "Potrete inviarci i documenti dopo la nostra conferma.",
    consentLink: "informativa sulla privacy",
    termsAnd: " e l'",
    termsBefore: "Accetto le ",
    termsLink: "condizioni generali",
    submit: "Ordinare",
    errors: {
      generic: "Verificate nome, email e descrizione della situazione.",
      consent: "Spuntate entrambe le caselle di accettazione.",
      throttled: "Troppe richieste da questa connessione. Riprovate tra un'ora o scriveteci a hey@thrax-legal.ch.",
    },
  },
  thanks: {
    metaTitle: "Ordine ricevuto | Thrax Legal",
    heading: "Grazie, la vostra richiesta è stata ricevuta",
    body: "Verifichiamo che la prestazione sia adatta alla vostra situazione e vi confermiamo prezzo e termine per email, di regola entro 1 giorno lavorativo.",
    next: [
      "Ricevete la nostra conferma e le istruzioni di pagamento (TWINT o fattura QR).",
      "Ci inviate i documenti rispondendo all'email.",
      "Consegniamo il documento nel termine annunciato.",
    ],
    back: "Torna alla home",
    quoteHeading: "Grazie, prepariamo il vostro preventivo",
    quoteBody: "Esaminiamo la vostra situazione e vi inviamo un preventivo a prezzo fisso per email, di regola entro 1 giorno lavorativo. È gratuito e senza impegno.",
  },
  quote: {
    title: "Il vostro problema non è nell'elenco?",
    body: "Descrivetecelo. Vi rispondiamo con un preventivo a prezzo fisso.",
    points: ["Gratuito e senza impegno", "Prezzo fisso, annunciato prima di iniziare", "Risposta di regola entro 1 giorno lavorativo"],
    cta: "Chiedere un preventivo gratuito",
    situation: "Descrivete il vostro problema",
    situationPlaceholder: {
      particuliers: "Es.: il mio ex datore di lavoro non mi paga le ore, il garage ha fatturato una riparazione non richiesta…",
      entreprises: "Es.: un fornitore non consegna, un ex socio usa il nostro nome, vogliamo verificare un contratto di franchising…",
    },
    submit: "Ricevere il preventivo gratuito",
    label: { particuliers: "Richiesta di preventivo (privato)", entreprises: "Richiesta di preventivo (impresa)" },
  },
};

export const SERVICES_UI: Record<Locale, ServicesUi> = { fr, de, en, it };

/** « 149 CHF » / « dès 590 CHF » selon la langue (format suisse). */
export function priceLabel(locale: Locale, price: number, from?: boolean): string {
  const ui = SERVICES_UI[locale];
  const amount = price.toLocaleString("fr-CH").replace(/ | /g, "'");
  const value = locale === "fr" ? `${amount} CHF` : `CHF ${amount}`;
  return from ? `${ui.price.from} ${value}` : value;
}

export function vatLabel(locale: Locale, audience: Audience): string {
  return audience === "particuliers" ? SERVICES_UI[locale].price.vatIncl : SERVICES_UI[locale].price.vatExcl;
}
