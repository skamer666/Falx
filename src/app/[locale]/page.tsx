import { LEAD_STRINGS } from "@/lib/account/lead-strings";
import LeadForm from "@/components/site/LeadForm";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import FaqAccordion from "@/components/site/FaqAccordion";
import VideoEmbed from "@/components/site/VideoEmbed";
import JsonLd from "@/components/site/JsonLd";
import { GUIDE_ARTICLES } from "@/lib/guide/articles";
import { isLocale, DEFAULT_LOCALE, type Locale } from "@/i18n/config";
import { Container, PrimaryButton, StepList } from "@/components/site/ui";

type FaqItem = { q: string; a: string };
type StepItem = { title: string; description: string };
type Tier = {
  slug: string;
  name: string;
  price: string;
  priceNote: string;
  tagline: string;
  features: string[];
  valueNote: string;
  ctaLabel: string;
  highlight: boolean;
  badge?: string;
};

type HomeContent = {
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCtaLabel: string;
  heroProof: [string, string, string];
  videoEyebrow: string;
  videoHeading: string;
  videoBody: string;
  videoPlayLabel: string;
  videoNote: string;
  aboutHeading: string;
  aboutBody: string;
  pricingHeading: string;
  pricingSubheading: string;
  founderBadge: string;
  tiers: [Tier, Tier];
  perksHeading: string;
  perks: { title: string; text: string }[];
  clarityLinkLabel: string;
  clarity: {
    heading: string;
    intro: string;
    quick: { title: string; limit: string; definition: string; examplesLabel: string; examples: string[] };
    dossier: { title: string; limit: string; definition: string; examplesLabel: string; examples: string[] };
    twoHeading: string;
    two: string[];
    freeHeading: string;
    free: string[];
    promise: string;
  };
  extraQuestionNote: string;
  valueDisclaimer: string;
  stepsHeading: string;
  steps: StepItem[];
  domainsHeading: string;
  domains: string[];
  guideLabel: string;
  guideLinkLabel: string;
  faqHeading: string;
  faq: FaqItem[];
  stickyLabel: string;
  stickyCta: string;
};

const CONTENT: Record<Locale, HomeContent> = {
  fr: {
    metaTitle: "Abonnement juridique PME en Suisse romande | Thrax Legal",
    metaDescription:
      "Votre juriste externalisé pour indépendants et PME de Suisse romande : contrats, litiges, démarches. Prix fixe dès 149 CHF/mois, sans engagement.",
    heroTitle: "Votre juriste externalisé, à prix fixe.",
    heroSubtitle:
      "Contrats, litiges, démarches : votre PME est prise en charge, sans avocat à l'heure ni rendez-vous.",
    heroCtaLabel: "Voir les formules",
    heroProof: ["Traité sous 48 à 72h", "Prix fixe, jamais à l'heure", "Sans engagement"],
    videoEyebrow: "En moins d'une minute",
    videoHeading: "Thrax Legal, expliqué simplement.",
    videoBody: "Un besoin juridique, un juriste qui s'en occupe, une réponse claire par écrit. Voici comment ça se passe.",
    videoPlayLabel: "Voir la vidéo",
    videoNote: "Vidéo hébergée sur YouTube, chargée uniquement au clic.",
    aboutHeading: "Un juriste fractionné, pas un cabinet d'avocats",
    aboutBody:
      "Étudiant en droit avec plusieurs années d'expérience en cabinet d'avocat, je recherche chaque dossier avant de m'en occuper, sans jamais improviser en direct. Pour les dossiers contentieux ou à très haut risque, je vous oriente vers un avocat inscrit à un barreau suisse plutôt que de répondre à l'aveugle.",
    pricingHeading: "Deux formules pour votre PME",
    pricingSubheading: "Choisissez votre volume. Changez ou résiliez à tout moment.",
    founderBadge: "Offre de lancement : les 20 premiers abonnés gardent ce prix tant que leur abonnement reste actif.",
    tiers: [
      {
        slug: "abonnement-essentiel",
        name: "Essentiel",
        price: "149 CHF",
        priceNote: "/ mois, hors TVA",
        tagline: "Pour les indépendants et micro-entreprises",
        features: [
          "10 questions rapides par mois (réponse écrite)",
          "5 dossiers complets par mois (contrat, litige, procédure)",
          "Appel ou visio de cadrage de 15 min pour chaque dossier",
          "Traité sous 72h ouvrées",
          "Prix bloqué tant que vous restez abonné, résiliable à tout moment",
        ],
        valueNote: "Valeur estimée chez un avocat : plus de 3'000 CHF",
        ctaLabel: "Choisir Essentiel",
        highlight: false,
      },
      {
        slug: "abonnement-croissance",
        name: "Croissance",
        price: "349 CHF",
        priceNote: "/ mois, hors TVA",
        tagline: "Pour les PME avec des besoins réguliers",
        badge: "Le plus choisi",
        features: [
          "30 questions rapides par mois (réponse écrite)",
          "12 dossiers complets par mois",
          "Appel ou visio de cadrage de 30 min pour chaque dossier",
          "Traité sous 48h (24h pour les urgences signalées)",
          "Révision de contrat prioritaire chaque mois",
          "Prix bloqué tant que vous restez abonné, résiliable à tout moment",
        ],
        valueNote: "Valeur estimée chez un avocat : plus de 9'000 CHF",
        ctaLabel: "Choisir Croissance",
        highlight: true,
      },
    ],
    perksHeading: "Inclus dans les deux formules",
    perks: [
      { title: "Sans surprise", text: "Ce qui compte comme une question ou comme un dossier est défini ci-dessous, et le décompte vous est confirmé avant de commencer." },
      { title: "Un humain au bout du fil", text: "Vous expliquez votre situation de vive voix (appel ou visio), la réponse reste écrite et vous la gardez." },
      { title: "Pause quand vous voulez", text: "Mettez votre abonnement en pause jusqu'à 2 mois par an, sans perdre votre prix bloqué." },
    ],
    clarityLinkLabel: "Que compte-t-on comme un dossier ou comme une question ?",
    clarity: {
      "heading": "Question rapide ou dossier : c'est défini noir sur blanc",
      "intro": "Pas de zone grise : voici exactement ce qui compte comme une question rapide et ce qui compte comme un dossier.",
      "quick": {
        "title": "Question rapide",
        "limit": "10 par mois en Essentiel, 30 en Croissance",
        "definition": "Une question précise, une réponse écrite de quelques lignes. Environ 15 minutes de travail, sans lire ni rédiger de document. Réponse écrite sous 48 h ouvrées (24 h en Croissance).",
        "examplesLabel": "Exemples",
        "examples": [
          "Cette mention est-elle obligatoire sur ma facture ?",
          "Puis-je demander un acompte de 50 % ?",
          "Quel préavis dois-je respecter pour ce type de contrat ?"
        ]
      },
      "dossier": {
        "title": "Dossier",
        "limit": "5 par mois en Essentiel, 12 en Croissance",
        "definition": "Un travail complet avec un livrable écrit, pour une situation et une partie. Il comprend l'appel ou la visio de cadrage, le livrable et un tour de corrections.",
        "examplesLabel": "Exemples",
        "examples": [
          "Rédiger un contrat de travail",
          "Relire et corriger un contrat de vente (jusqu'à 20 pages)",
          "Envoyer une mise en demeure à un client qui ne paie pas",
          "Rédiger vos CGV ou votre politique de confidentialité nLPD"
        ]
      },
      "twoHeading": "Quand ça compte pour 2 dossiers",
      "two": [
        "Deux livrables différents (un contrat de travail et un règlement du personnel)",
        "Deux personnes ou sociétés concernées (deux employés, deux clients débiteurs)",
        "Un document de plus de 20 pages : un dossier de plus par tranche de 20 pages entamée",
        "Un nouveau sujet, une fois le premier dossier livré"
      ],
      "freeHeading": "Ce qui ne compte pas en plus",
      "free": [
        "Les questions de suivi sur un dossier livré (pendant 14 jours)",
        "Un tour de corrections sur le livrable",
        "Les échanges et pièces complémentaires sur la même situation"
      ],
      "promise": "Avant de commencer, je vous confirme par écrit ce que compte votre demande. Rien n'est décompté sans que vous l'ayez vu."
    },
    extraQuestionNote: "Dossier supplémentaire : 79 CHF, prix fixe.",
    valueDisclaimer:
      "Valeur estimée sur la base des tarifs horaires usuels des avocats en Suisse (200 à 600 CHF/h selon expérience et canton).",
    stepsHeading: "Comment ça marche",
    steps: [
      { title: "Choisissez votre formule", description: "Essentiel ou Croissance, sans engagement, résiliable à tout moment." },
      { title: "Décrivez votre besoin", description: "Contrat, litige, démarche : expliquez votre situation via le formulaire dédié." },
      { title: "On s'en occupe", description: "Contrat rédigé, solution expliquée, avec une trace écrite en cas de litige ou de contrôle." },
    ],
    domainsHeading: "Ce que couvre l'abonnement",
    domains: [
      "Contrats commerciaux & CGV",
      "Droit du travail",
      "Droit des sociétés",
      "Recouvrement amiable",
      "Conformité nLPD",
      "Baux commerciaux",
      "Et autres",
    ],
    guideLabel: "Pour aller plus loin",
    guideLinkLabel: "Voir tout le guide",
    faqHeading: "Questions fréquentes",
    faq: [
      {
        q: "Que couvre l'abonnement ?",
        a: "Rédaction et relecture de contrats, résolution de litiges, explication de vos démarches (droit du travail, CGV, nLPD, recouvrement amiable, baux commerciaux), des questions rapides par écrit et un appel ou une visio de cadrage pour chaque dossier. Les opérations exceptionnelles (levée de fonds, contentieux devant un tribunal, restructuration) ne sont pas incluses. Nous vous orientons vers un avocat spécialisé.",
      },
      {
        q: "Question rapide ou dossier : quelle différence ?",
        a: "Une question rapide est une question précise avec une réponse écrite de quelques lignes (environ 15 minutes de travail, sans lire ni rédiger de document) : 10 par mois en Essentiel, 30 en Croissance. Un dossier est un travail complet avec un livrable écrit, pour une situation et une partie : 5 par mois en Essentiel, 12 en Croissance. Deux livrables, deux personnes ou un document de plus de 20 pages comptent pour 2 dossiers. Le détail, avec des exemples, figure dans la section « Question rapide ou dossier » de cette page.",
      },
      {
        q: "Puis-je résilier à tout moment ?",
        a: "Oui, sans engagement ni justification à fournir : la résiliation est effective à la fin du mois déjà payé. Vous pouvez aussi mettre l'abonnement en pause jusqu'à 2 mois par an. Votre prix reste bloqué tant que vous restez abonné sans interruption, même si nos tarifs augmentent pour les nouveaux clients.",
      },
      {
        q: "Puis-je parler à quelqu'un au téléphone ?",
        a: "Oui. Pour chaque dossier, vous avez un appel ou une visio de cadrage (15 min en Essentiel, 30 min en Croissance) sur rendez-vous : vous expliquez votre situation de vive voix. La réponse et les documents restent ensuite par écrit, ce qui vous laisse une trace en cas de litige ou de contrôle.",
      },
      {
        q: "Et si j'ai plus de dossiers que mon forfait ?",
        a: "Chaque dossier supplémentaire est facturé 79 CHF, prix fixe, jamais à l'heure. Si vous dépassez vos questions rapides du mois, la question est traitée le mois suivant ou, si vous préférez une réponse immédiate, comptée comme un dossier. Vous pouvez aussi changer de formule à tout moment.",
      },
      {
        q: "Thrax Legal est-il un cabinet d'avocats ?",
        a: "Non. Je suis étudiant en droit, avec plusieurs années d'expérience en cabinet d'avocat en recherche juridique et en rédaction : c'est le principe du juriste fractionné. Chaque dossier fait l'objet d'une vraie recherche avant que je m'en occupe, jamais d'une improvisation en direct. Pour les dossiers contentieux ou les opérations complexes, je vous oriente vers un avocat inscrit à un registre cantonal suisse.",
      },
      {
        q: "Le service est-il disponible dans toute la Suisse ?",
        a: "Le service est pensé et positionné pour les indépendants et PME de Suisse romande, mais le site est disponible en français, allemand, anglais et italien.",
      },
    ],
    stickyLabel: "Dès 149 CHF/mois",
    stickyCta: "Voir les formules",
  },
  de: {
    metaTitle: "KMU-Rechtsabo in der Westschweiz | Thrax Legal",
    metaDescription:
      "Ihr externer Rechtsberater für Selbstständige und KMU in der Westschweiz: Verträge, Streitfälle, Verfahren. Fixpreis ab CHF 149/Monat, ohne Vertragsbindung.",
    heroTitle: "Ihr externer Rechtsberater, zum Fixpreis.",
    heroSubtitle:
      "Verträge, Streitfälle, Verfahren: Ihr KMU wird betreut, ohne Anwalt nach Stundensatz und ohne Termin.",
    heroCtaLabel: "Formeln ansehen",
    heroProof: ["Bearbeitet innert 48 bis 72h", "Fixpreis, nie nach Stundensatz", "Ohne Vertragsbindung"],
    videoEyebrow: "In weniger als einer Minute",
    videoHeading: "Thrax Legal, einfach erklärt.",
    videoBody: "Ein rechtliches Anliegen, ein Jurist, der sich darum kümmert, eine klare schriftliche Antwort. So funktioniert es.",
    videoPlayLabel: "Video ansehen",
    videoNote: "Video auf Französisch, auf YouTube gehostet und erst beim Klick geladen.",
    aboutHeading: "Ein fraktionierter Jurist, keine Anwaltskanzlei",
    aboutBody:
      "Als Jurastudent mit mehrjähriger Erfahrung in einer Anwaltskanzlei recherchiere ich jeden Fall, bevor ich mich darum kümmere, ohne am Telefon zu improvisieren. Bei streitigen Fällen oder sehr hohem Risiko verweise ich Sie an eine im kantonalen Anwaltsregister eingetragene Anwältin oder einen Anwalt, statt aufs Geratewohl zu antworten.",
    pricingHeading: "Zwei Formeln für Ihr KMU",
    pricingSubheading: "Wählen Sie Ihr Volumen. Wechseln oder kündigen Sie jederzeit.",
    founderBadge: "Lancierungsangebot: Die ersten 20 Abonnentinnen und Abonnenten behalten diesen Preis, solange ihr Abonnement aktiv bleibt.",
    tiers: [
      {
        slug: "abonnement-essentiel",
        name: "Essentiel",
        price: "CHF 149",
        priceNote: "/ Monat, exkl. MWST",
        tagline: "Für Selbstständige und Kleinstunternehmen",
        features: [
          "10 schnelle Fragen pro Monat (schriftliche Antwort)",
          "5 vollständige Anliegen pro Monat (Vertrag, Streitfall, Verfahren)",
          "Telefon- oder Videogespräch (15 Min.) zur Klärung jedes Anliegens",
          "Bearbeitet innert 72 Arbeitsstunden",
          "Preis fixiert, solange Sie abonniert bleiben, jederzeit kündbar",
        ],
        valueNote: "Geschätzter Wert bei einem Anwalt: über CHF 3'000",
        ctaLabel: "Essentiel wählen",
        highlight: false,
      },
      {
        slug: "abonnement-croissance",
        name: "Croissance",
        price: "CHF 349",
        priceNote: "/ Monat, exkl. MWST",
        tagline: "Für KMU mit regelmässigem Bedarf",
        badge: "Am häufigsten gewählt",
        features: [
          "30 schnelle Fragen pro Monat (schriftliche Antwort)",
          "12 vollständige Anliegen pro Monat",
          "Telefon- oder Videogespräch (30 Min.) zur Klärung jedes Anliegens",
          "Bearbeitet innert 48 Arbeitsstunden (24h bei gemeldeten Notfällen)",
          "Prioritäre Vertragsprüfung jeden Monat",
          "Preis fixiert, solange Sie abonniert bleiben, jederzeit kündbar",
        ],
        valueNote: "Geschätzter Wert bei einem Anwalt: über CHF 9'000",
        ctaLabel: "Croissance wählen",
        highlight: true,
      },
    ],
    perksHeading: "In beiden Formeln inklusive",
    perks: [
      { title: "Ohne Überraschungen", text: "Was als Frage oder Anliegen zählt, ist unten definiert, und die Zählung wird Ihnen vor Beginn bestätigt." },
      { title: "Ein Mensch am Telefon", text: "Sie schildern Ihre Situation mündlich (Telefon oder Video), die Antwort bleibt schriftlich und gehört Ihnen." },
      { title: "Pause, wann Sie wollen", text: "Pausieren Sie Ihr Abo bis zu 2 Monate pro Jahr, ohne Ihren fixierten Preis zu verlieren." },
    ],
    clarityLinkLabel: "Was zählt als Anliegen oder als schnelle Frage?",
    clarity: {
      "heading": "Schnelle Frage oder Anliegen: klar definiert",
      "intro": "Keine Grauzone: So sehen Sie genau, was als schnelle Frage und was als Anliegen zählt.",
      "quick": {
        "title": "Schnelle Frage",
        "limit": "10 pro Monat bei Essentiel, 30 bei Croissance",
        "definition": "Eine präzise Frage, eine schriftliche Antwort in wenigen Zeilen. Rund 15 Minuten Arbeit, ohne ein Dokument zu lesen oder zu verfassen. Schriftliche Antwort innert 48 Arbeitsstunden (24 bei Croissance).",
        "examplesLabel": "Beispiele",
        "examples": [
          "Ist diese Angabe auf meiner Rechnung Pflicht?",
          "Darf ich eine Anzahlung von 50 % verlangen?",
          "Welche Kündigungsfrist gilt für diese Vertragsart?"
        ]
      },
      "dossier": {
        "title": "Anliegen",
        "limit": "5 pro Monat bei Essentiel, 12 bei Croissance",
        "definition": "Eine vollständige Arbeit mit schriftlichem Ergebnis, für eine Situation und eine Partei. Sie umfasst das Telefon- oder Videogespräch, das Ergebnis und eine Korrekturrunde.",
        "examplesLabel": "Beispiele",
        "examples": [
          "Einen Arbeitsvertrag verfassen",
          "Einen Kaufvertrag prüfen und korrigieren (bis 20 Seiten)",
          "Einem säumigen Kunden eine Mahnung senden",
          "Ihre AGB oder Ihre DSG-Datenschutzerklärung verfassen"
        ]
      },
      "twoHeading": "Wann es als 2 Anliegen zählt",
      "two": [
        "Zwei verschiedene Ergebnisse (ein Arbeitsvertrag und ein Personalreglement)",
        "Zwei betroffene Personen oder Firmen (zwei Angestellte, zwei säumige Kunden)",
        "Ein Dokument von mehr als 20 Seiten: ein zusätzliches Anliegen pro angefangene 20 Seiten",
        "Ein neues Thema, nachdem das erste Anliegen geliefert wurde"
      ],
      "freeHeading": "Was nicht zusätzlich zählt",
      "free": [
        "Folgefragen zu einem gelieferten Anliegen (während 14 Tagen)",
        "Eine Korrekturrunde am Ergebnis",
        "Austausch und weitere Unterlagen zur selben Situation"
      ],
      "promise": "Bevor ich beginne, bestätige ich Ihnen schriftlich, wie viele Anliegen Ihre Anfrage zählt. Nichts wird angerechnet, ohne dass Sie es gesehen haben."
    },
    extraQuestionNote: "Zusätzliches Anliegen: CHF 79, Fixpreis.",
    valueDisclaimer:
      "Geschätzter Wert auf Basis üblicher Stundensätze von Anwälten in der Schweiz (CHF 200 bis 600/h je nach Erfahrung und Kanton).",
    stepsHeading: "So funktioniert's",
    steps: [
      { title: "Formel wählen", description: "Essentiel oder Croissance, ohne Vertragsbindung, jederzeit kündbar." },
      { title: "Ihr Anliegen schildern", description: "Vertrag, Streitfall, Verfahren: schildern Sie Ihre Situation über das dafür vorgesehene Formular." },
      { title: "Wir kümmern uns darum", description: "Vertrag erstellt, Lösung erklärt, mit einem schriftlichen Nachweis für Streitfälle oder Kontrollen." },
    ],
    domainsHeading: "Was das Abo abdeckt",
    domains: [
      "Handelsverträge & AGB",
      "Arbeitsrecht",
      "Gesellschaftsrecht",
      "Gütliches Inkasso",
      "DSG-Konformität",
      "Geschäftsmietverträge",
      "Und weitere",
    ],
    guideLabel: "Mehr erfahren",
    guideLinkLabel: "Zum ganzen Ratgeber",
    faqHeading: "Häufige Fragen",
    faq: [
      {
        q: "Was deckt das Abo ab?",
        a: "Erstellung und Prüfung von Verträgen, Lösung von Streitfällen, Erklärung Ihrer Verfahren (Arbeitsrecht, AGB, DSG, gütliches Inkasso, Geschäftsmietverträge), schnelle Fragen mit schriftlicher Antwort und ein Telefon- oder Videogespräch zur Klärung jedes Anliegens. Aussergewöhnliche Vorgänge (Kapitalbeschaffung, Gerichtsverfahren, Restrukturierung) sind nicht enthalten. Wir verweisen Sie an einen spezialisierten Anwalt.",
      },
      {
        q: "Was ist der Unterschied zwischen einer schnellen Frage und einem Anliegen?",
        a: "Eine schnelle Frage ist eine präzise Frage mit einer schriftlichen Antwort in wenigen Zeilen (rund 15 Minuten Arbeit, ohne ein Dokument zu lesen oder zu verfassen): 10 pro Monat bei Essentiel, 30 bei Croissance. Ein Anliegen ist eine vollständige Arbeit mit schriftlichem Ergebnis, für eine Situation und eine Partei: 5 pro Monat bei Essentiel, 12 bei Croissance. Zwei Ergebnisse, zwei Personen oder ein Dokument von mehr als 20 Seiten zählen als 2 Anliegen. Die Details mit Beispielen stehen im Abschnitt «Schnelle Frage oder Anliegen» auf dieser Seite.",
      },
      {
        q: "Kann ich jederzeit kündigen?",
        a: "Ja, ohne Vertragsbindung und ohne Begründung: Die Kündigung wird am Ende des bereits bezahlten Monats wirksam. Sie können das Abo auch bis zu 2 Monate pro Jahr pausieren. Ihr Preis bleibt fixiert, solange Sie ununterbrochen abonniert bleiben, auch wenn unsere Tarife für Neukunden steigen.",
      },
      {
        q: "Kann ich mit jemandem telefonieren?",
        a: "Ja. Für jedes Anliegen gibt es nach Terminvereinbarung ein Telefon- oder Videogespräch zur Klärung (15 Min. bei Essentiel, 30 Min. bei Croissance): Sie schildern Ihre Situation mündlich. Antwort und Dokumente bleiben danach schriftlich, so haben Sie im Streit- oder Kontrollfall einen Nachweis.",
      },
      {
        q: "Was passiert, wenn ich mehr Anliegen habe als mein Kontingent?",
        a: "Jedes zusätzliche Anliegen kostet CHF 79, Fixpreis, nie nach Stundensatz. Wenn Sie Ihre schnellen Fragen des Monats überschreiten, wird die Frage im Folgemonat bearbeitet oder, wenn Sie eine sofortige Antwort bevorzugen, als Anliegen angerechnet. Sie können die Formel auch jederzeit wechseln.",
      },
      {
        q: "Ist Thrax Legal eine Anwaltskanzlei?",
        a: "Nein. Ich bin Jurastudent, mit mehrjähriger Erfahrung in einer Anwaltskanzlei in juristischer Recherche und im Verfassen von Schriftstücken: das Prinzip des fraktionierten Juristen. Jeder Fall wird richtig recherchiert, bevor ich mich darum kümmere, nie am Telefon improvisiert. Bei streitigen Fällen oder komplexen Vorgängen verweise ich Sie an eine im kantonalen Anwaltsregister eingetragene Anwältin oder einen Anwalt.",
      },
      {
        q: "Bieten Sie diesen Dienst in der ganzen Schweiz an?",
        a: "Der Dienst ist für Selbstständige und KMU in der Westschweiz konzipiert, die Website ist aber auf Französisch, Deutsch, Englisch und Italienisch verfügbar.",
      },
    ],
    stickyLabel: "Ab CHF 149/Monat",
    stickyCta: "Formeln ansehen",
  },
  en: {
    metaTitle: "SME legal subscription in French-speaking Switzerland | Thrax Legal",
    metaDescription:
      "Your outsourced legal counsel for independents and SMEs in French-speaking Switzerland: contracts, disputes, procedures. Fixed price from CHF 149/month, no commitment.",
    heroTitle: "Your outsourced legal counsel, at a fixed price.",
    heroSubtitle:
      "Contracts, disputes, procedures: your SME is handled, no hourly lawyer, no appointment.",
    heroCtaLabel: "See the plans",
    heroProof: ["Handled within 48 to 72h", "Fixed price, never hourly", "No commitment"],
    videoEyebrow: "In under a minute",
    videoHeading: "Thrax Legal, simply explained.",
    videoBody: "A legal need, a jurist who handles it, a clear written answer. Here is how it works.",
    videoPlayLabel: "Watch the video",
    videoNote: "Video in French, hosted on YouTube and loaded only when you click.",
    aboutHeading: "A fractional jurist, not a law firm",
    aboutBody:
      "A law student with several years of law firm experience, I research every case before handling it, without live improvisation. For contentious matters or very high-stakes decisions, I refer you to a lawyer registered with a Swiss cantonal bar rather than guess.",
    pricingHeading: "Two plans for your SME",
    pricingSubheading: "Choose your volume. Switch or cancel anytime.",
    founderBadge: "Launch offer: the first 20 subscribers keep this price for as long as their subscription stays active.",
    tiers: [
      {
        slug: "abonnement-essentiel",
        name: "Essential",
        price: "CHF 149",
        priceNote: "/ month, excl. VAT",
        tagline: "For freelancers and micro-businesses",
        features: [
          "10 quick questions per month (written answer)",
          "5 full matters handled per month (contract, dispute, procedure)",
          "15-minute call or video briefing for every matter",
          "Handled within 72 business hours",
          "Price locked while you stay subscribed, cancel anytime",
        ],
        valueNote: "Estimated value from a lawyer: over CHF 3,000",
        ctaLabel: "Choose Essential",
        highlight: false,
      },
      {
        slug: "abonnement-croissance",
        name: "Growth",
        price: "CHF 349",
        priceNote: "/ month, excl. VAT",
        tagline: "For SMEs with regular needs",
        badge: "Most chosen",
        features: [
          "30 quick questions per month (written answer)",
          "12 full matters handled per month",
          "30-minute call or video briefing for every matter",
          "Handled within 48 business hours (24h for flagged urgent cases)",
          "Priority contract review every month",
          "Price locked while you stay subscribed, cancel anytime",
        ],
        valueNote: "Estimated value from a lawyer: over CHF 9,000",
        ctaLabel: "Choose Growth",
        highlight: true,
      },
    ],
    perksHeading: "Included in both plans",
    perks: [
      { title: "No surprises", text: "What counts as a question or a matter is defined below, and the count is confirmed to you before we start." },
      { title: "A human on the line", text: "You explain your situation out loud (call or video), the answer stays in writing and is yours to keep." },
      { title: "Pause whenever you want", text: "Pause your subscription for up to 2 months a year without losing your locked price." },
    ],
    clarityLinkLabel: "What counts as a matter or a quick question?",
    clarity: {
      "heading": "Quick question or matter: clearly defined",
      "intro": "No grey area: here is exactly what counts as a quick question and what counts as a matter.",
      "quick": {
        "title": "Quick question",
        "limit": "10 per month on Essential, 30 on Growth",
        "definition": "One precise question, a written answer of a few lines. About 15 minutes of work, without reading or drafting a document. Written answer within 48 business hours (24 on Growth).",
        "examplesLabel": "Examples",
        "examples": [
          "Is this mention mandatory on my invoice?",
          "Can I ask for a 50% deposit?",
          "What notice period applies to this type of contract?"
        ]
      },
      "dossier": {
        "title": "Matter",
        "limit": "5 per month on Essential, 12 on Growth",
        "definition": "A complete piece of work with a written deliverable, for one situation and one party. It includes the call or video briefing, the deliverable and one round of corrections.",
        "examplesLabel": "Examples",
        "examples": [
          "Draft an employment contract",
          "Review and correct a sales contract (up to 20 pages)",
          "Send a formal demand to a customer who does not pay",
          "Draft your T&Cs or your FADP privacy policy"
        ]
      },
      "twoHeading": "When it counts as 2 matters",
      "two": [
        "Two different deliverables (an employment contract and a staff policy)",
        "Two people or companies involved (two employees, two debtors)",
        "A document over 20 pages: one extra matter per 20 pages started",
        "A new topic, once the first matter is delivered"
      ],
      "freeHeading": "What does not count on top",
      "free": [
        "Follow-up questions on a delivered matter (for 14 days)",
        "One round of corrections on the deliverable",
        "Exchanges and extra documents on the same situation"
      ],
      "promise": "Before starting, I confirm in writing what your request counts as. Nothing is deducted without you having seen it."
    },
    extraQuestionNote: "Extra matter: CHF 79, fixed price.",
    valueDisclaimer:
      "Estimated value based on typical lawyer hourly rates in Switzerland (CHF 200 to 600/h depending on experience and canton).",
    stepsHeading: "How it works",
    steps: [
      { title: "Choose your plan", description: "Essential or Growth, no commitment, cancel anytime." },
      { title: "Describe your need", description: "A contract, a dispute, a procedure: describe your situation via the dedicated form." },
      { title: "We handle it", description: "Contract drafted, solution explained, with a written record for disputes or audits." },
    ],
    domainsHeading: "What the subscription covers",
    domains: [
      "Commercial contracts & T&Cs",
      "Employment law",
      "Corporate law",
      "Amicable debt collection",
      "FADP compliance",
      "Commercial leases",
      "And more",
    ],
    guideLabel: "Go further",
    guideLinkLabel: "See the full guide",
    faqHeading: "Frequently asked questions",
    faq: [
      {
        q: "What does the subscription cover?",
        a: "Drafting and reviewing contracts, resolving disputes, explaining your procedures (employment law, T&Cs, FADP, amicable debt collection, commercial leases), quick questions answered in writing and a call or video briefing for every matter. Exceptional matters (fundraising, court litigation, restructuring) are not included. We refer you to a specialised lawyer.",
      },
      {
        q: "What's the difference between a quick question and a matter?",
        a: "A quick question is one precise question with a written answer of a few lines (about 15 minutes of work, without reading or drafting a document): 10 per month on Essential, 30 on Growth. A matter is a complete piece of work with a written deliverable, for one situation and one party: 5 per month on Essential, 12 on Growth. Two deliverables, two people or a document over 20 pages count as 2 matters. The details, with examples, are in the \"Quick question or matter\" section of this page.",
      },
      {
        q: "Can I cancel anytime?",
        a: "Yes, no commitment and no justification needed: cancellation takes effect at the end of the month already paid. You can also pause your subscription for up to 2 months a year. Your price stays locked as long as you stay subscribed without interruption, even if our rates rise for new customers.",
      },
      {
        q: "Can I talk to someone on the phone?",
        a: "Yes. For every matter you get a call or video briefing by appointment (15 min on Essential, 30 min on Growth): you explain your situation out loud. The answer and documents then stay in writing, which leaves you a record in case of a dispute or an inspection.",
      },
      {
        q: "What if I have more matters than my plan allows?",
        a: "Each extra matter is billed at CHF 79, fixed price, never hourly. If you go over your quick questions for the month, the question is handled the following month or, if you prefer an immediate answer, counted as a matter. You can also change plan at any time.",
      },
      {
        q: "Is Thrax Legal a law firm?",
        a: "No. I'm a law student, with several years of law firm experience in legal research and drafting: the fractional-jurist model. Every case gets real research before I handle it, never live improvisation. For contentious matters or complex transactions, I refer you to a lawyer registered with a Swiss cantonal bar.",
      },
      {
        q: "Do you offer this service across all of Switzerland?",
        a: "The service is designed for freelancers and SMEs in French-speaking Switzerland, but the site is available in French, German, English and Italian.",
      },
    ],
    stickyLabel: "From CHF 149/month",
    stickyCta: "See the plans",
  },
  it: {
    metaTitle: "Abbonamento legale per PMI nella Svizzera romanda | Thrax Legal",
    metaDescription:
      "Il vostro giurista esternalizzato per indipendenti e PMI della Svizzera romanda: contratti, controversie, procedure. Prezzo fisso da CHF 149/mese, senza impegno.",
    heroTitle: "Il vostro giurista esternalizzato, a prezzo fisso.",
    heroSubtitle:
      "Contratti, controversie, procedure: la vostra PMI è seguita, senza avvocato a ore né appuntamento.",
    heroCtaLabel: "Vedere le formule",
    heroProof: ["Gestito entro 48-72h", "Prezzo fisso, mai a ore", "Senza impegno"],
    videoEyebrow: "In meno di un minuto",
    videoHeading: "Thrax Legal, spiegato semplicemente.",
    videoBody: "Un'esigenza legale, un giurista che se ne occupa, una risposta chiara per iscritto. Ecco come funziona.",
    videoPlayLabel: "Guarda il video",
    videoNote: "Video in francese, ospitato su YouTube e caricato solo al clic.",
    aboutHeading: "Un giurista frazionato, non uno studio legale",
    aboutBody:
      "Studente di giurisprudenza con diversi anni di esperienza in uno studio legale, ricerco ogni pratica prima di occuparmene, senza mai improvvisare dal vivo. Per i casi contenziosi o ad altissimo rischio, vi indirizzo verso un avvocato iscritto a un albo cantonale svizzero invece di rispondere alla cieca.",
    pricingHeading: "Due formule per la vostra PMI",
    pricingSubheading: "Scegliete il vostro volume. Cambiate o disdite in qualsiasi momento.",
    founderBadge: "Offerta di lancio: i primi 20 abbonati mantengono questo prezzo finché il loro abbonamento resta attivo.",
    tiers: [
      {
        slug: "abonnement-essentiel",
        name: "Essentiel",
        price: "CHF 149",
        priceNote: "/ mese, IVA esclusa",
        tagline: "Per indipendenti e micro-imprese",
        features: [
          "10 domande rapide al mese (risposta scritta)",
          "5 pratiche complete al mese (contratto, controversia, procedura)",
          "Chiamata o videochiamata di inquadramento di 15 min per ogni pratica",
          "Gestite entro 72 ore lavorative",
          "Prezzo bloccato finché restate abbonati, disdicibile in qualsiasi momento",
        ],
        valueNote: "Valore stimato presso un avvocato: oltre CHF 3'000",
        ctaLabel: "Scegliere Essentiel",
        highlight: false,
      },
      {
        slug: "abonnement-croissance",
        name: "Croissance",
        price: "CHF 349",
        priceNote: "/ mese, IVA esclusa",
        tagline: "Per PMI con esigenze regolari",
        badge: "Il più scelto",
        features: [
          "30 domande rapide al mese (risposta scritta)",
          "12 pratiche complete al mese",
          "Chiamata o videochiamata di inquadramento di 30 min per ogni pratica",
          "Gestite entro 48 ore lavorative (24h per le urgenze segnalate)",
          "Revisione contrattuale prioritaria ogni mese",
          "Prezzo bloccato finché restate abbonati, disdicibile in qualsiasi momento",
        ],
        valueNote: "Valore stimato presso un avvocato: oltre CHF 9'000",
        ctaLabel: "Scegliere Croissance",
        highlight: true,
      },
    ],
    perksHeading: "Incluso in entrambe le formule",
    perks: [
      { title: "Senza sorprese", text: "Cosa conta come domanda o pratica è definito qui sotto, e il conteggio vi viene confermato prima di iniziare." },
      { title: "Una persona all'altro capo del filo", text: "Esponete la vostra situazione a voce (chiamata o video), la risposta resta scritta e la conservate." },
      { title: "Pausa quando volete", text: "Mettete in pausa l'abbonamento fino a 2 mesi all'anno, senza perdere il prezzo bloccato." },
    ],
    clarityLinkLabel: "Cosa conta come pratica o come domanda rapida?",
    clarity: {
      "heading": "Domanda rapida o pratica: definito chiaramente",
      "intro": "Nessuna zona grigia: ecco esattamente cosa conta come domanda rapida e cosa conta come pratica.",
      "quick": {
        "title": "Domanda rapida",
        "limit": "10 al mese con Essentiel, 30 con Croissance",
        "definition": "Una domanda precisa, una risposta scritta di poche righe. Circa 15 minuti di lavoro, senza leggere né redigere documenti. Risposta scritta entro 48 ore lavorative (24 con Croissance).",
        "examplesLabel": "Esempi",
        "examples": [
          "Questa menzione è obbligatoria sulla mia fattura?",
          "Posso chiedere un acconto del 50 %?",
          "Quale preavviso devo rispettare per questo tipo di contratto?"
        ]
      },
      "dossier": {
        "title": "Pratica",
        "limit": "5 al mese con Essentiel, 12 con Croissance",
        "definition": "Un lavoro completo con un risultato scritto, per una situazione e una controparte. Comprende la chiamata o videochiamata di inquadramento, il risultato e un giro di correzioni.",
        "examplesLabel": "Esempi",
        "examples": [
          "Redigere un contratto di lavoro",
          "Rivedere e correggere un contratto di vendita (fino a 20 pagine)",
          "Inviare una diffida a un cliente che non paga",
          "Redigere le vostre condizioni generali o la vostra informativa sulla privacy nLPD"
        ]
      },
      "twoHeading": "Quando conta come 2 pratiche",
      "two": [
        "Due risultati diversi (un contratto di lavoro e un regolamento del personale)",
        "Due persone o società coinvolte (due dipendenti, due debitori)",
        "Un documento di oltre 20 pagine: una pratica in più per ogni blocco di 20 pagine iniziato",
        "Un nuovo argomento, dopo la consegna della prima pratica"
      ],
      "freeHeading": "Cosa non conta in più",
      "free": [
        "Domande di seguito su una pratica consegnata (per 14 giorni)",
        "Un giro di correzioni sul risultato",
        "Scambi e documenti aggiuntivi sulla stessa situazione"
      ],
      "promise": "Prima di iniziare, vi confermo per iscritto cosa conta la vostra richiesta. Nulla viene conteggiato senza che lo abbiate visto."
    },
    extraQuestionNote: "Pratica supplementare: CHF 79, prezzo fisso.",
    valueDisclaimer:
      "Valore stimato sulla base delle tariffe orarie usuali degli avvocati in Svizzera (CHF 200-600/h secondo esperienza e cantone).",
    stepsHeading: "Come funziona",
    steps: [
      { title: "Scegliete la formula", description: "Essentiel o Croissance, senza impegno, disdicibile in qualsiasi momento." },
      { title: "Descrivete l'esigenza", description: "Contratto, controversia, procedura: descrivete la vostra situazione tramite il modulo dedicato." },
      { title: "Ce ne occupiamo noi", description: "Contratto redatto, soluzione spiegata, con una prova scritta in caso di controversia o controllo." },
    ],
    domainsHeading: "Cosa copre l'abbonamento",
    domains: [
      "Contratti commerciali e condizioni generali",
      "Diritto del lavoro",
      "Diritto societario",
      "Recupero crediti amichevole",
      "Conformità nLPD",
      "Locazioni commerciali",
      "E altro",
    ],
    guideLabel: "Per saperne di più",
    guideLinkLabel: "Vedi tutta la guida",
    faqHeading: "Domande frequenti",
    faq: [
      {
        q: "Cosa copre l'abbonamento?",
        a: "Redazione e revisione di contratti, risoluzione di controversie, spiegazione delle procedure (diritto del lavoro, condizioni generali, nLPD, recupero crediti amichevole, locazioni commerciali), domande rapide con risposta scritta e una chiamata o videochiamata di inquadramento per ogni pratica. Le operazioni eccezionali (raccolta fondi, contenzioso giudiziario, ristrutturazione) non sono incluse. Vi indirizziamo a un avvocato specializzato.",
      },
      {
        q: "Domanda rapida o pratica: che differenza c'è?",
        a: "Una domanda rapida è una domanda precisa con una risposta scritta di poche righe (circa 15 minuti di lavoro, senza leggere né redigere documenti): 10 al mese con Essentiel, 30 con Croissance. Una pratica è un lavoro completo con un risultato scritto, per una situazione e una controparte: 5 al mese con Essentiel, 12 con Croissance. Due risultati, due persone o un documento di oltre 20 pagine contano come 2 pratiche. I dettagli, con esempi, sono nella sezione «Domanda rapida o pratica» di questa pagina.",
      },
      {
        q: "Posso disdire in qualsiasi momento?",
        a: "Sì, senza impegno e senza dover fornire motivazioni: la disdetta ha effetto alla fine del mese già pagato. Potete anche mettere in pausa l'abbonamento fino a 2 mesi all'anno. Il vostro prezzo resta bloccato finché restate abbonati senza interruzione, anche se le nostre tariffe aumentano per i nuovi clienti.",
      },
      {
        q: "Posso parlare con qualcuno al telefono?",
        a: "Sì. Per ogni pratica avete una chiamata o videochiamata di inquadramento su appuntamento (15 min con Essentiel, 30 min con Croissance): esponete la vostra situazione a voce. La risposta e i documenti restano poi per iscritto, e vi lasciano una traccia in caso di controversia o controllo.",
      },
      {
        q: "Cosa succede se ho più pratiche del mio pacchetto?",
        a: "Ogni pratica supplementare costa CHF 79, prezzo fisso, mai a ore. Se superate le domande rapide del mese, la domanda è trattata il mese successivo o, se preferite una risposta immediata, conteggiata come pratica. Potete anche cambiare formula in qualsiasi momento.",
      },
      {
        q: "Thrax Legal è uno studio legale?",
        a: "No. Sono uno studente di giurisprudenza, con diversi anni di esperienza in uno studio legale nella ricerca giuridica e nella redazione: il principio del giurista frazionato. Ogni pratica è oggetto di una vera ricerca prima che me ne occupi, mai di un'improvvisazione dal vivo. Per i casi contenziosi o le operazioni complesse, vi indirizzo verso un avvocato iscritto a un albo cantonale svizzero.",
      },
      {
        q: "Offrite questo servizio in tutta la Svizzera?",
        a: "Il servizio è pensato per indipendenti e PMI della Svizzera romanda, ma il sito è disponibile in francese, tedesco, inglese e italiano.",
      },
    ],
    stickyLabel: "Da CHF 149/mese",
    stickyCta: "Vedere le formule",
  },
};

function TierCard({ tier, locale }: { tier: Tier; locale: Locale }) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-6 transition-shadow duration-300 md:p-8 ${
        tier.highlight
          ? "border-accent bg-surface shadow-[0_24px_60px_-32px_rgba(0,0,0,0.35)]"
          : "border-border bg-surface"
      }`}
    >
      {tier.badge ? (
        <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-bg">
          {tier.badge}
        </span>
      ) : null}
      <p className="text-sm font-medium uppercase tracking-[0.14em] text-text-muted">
        {tier.name}
      </p>
      <p className="mt-2 text-sm text-text-muted">{tier.tagline}</p>
      <div className="mt-6 flex items-baseline gap-1">
        <span className="text-3xl font-semibold tracking-[-0.02em] text-text">{tier.price}</span>
        <span className="text-sm text-text-muted">{tier.priceNote}</span>
      </div>
      <p className="mt-2 text-xs font-medium text-accent">{tier.valueNote}</p>
      <ul className="mt-6 flex flex-1 flex-col gap-3">
        {tier.features.map((feature) => (
          <li key={feature} className="flex gap-2 text-sm leading-relaxed text-text-muted">
            <span aria-hidden className="text-text">
              &#10003;
            </span>
            {feature}
          </li>
        ))}
      </ul>
      <PrimaryButton href={`/${locale}/compte/inscription?plan=${tier.slug.replace("abonnement-", "")}`} className="mt-8 w-full px-6 py-3">
        {tier.ctaLabel}
      </PrimaryButton>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
      <path
        d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StickyOrderBar({ locale, t }: { locale: Locale; t: HomeContent }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/95 backdrop-blur">
      <Container className="flex items-center justify-between gap-3 py-3">
        <div className="hidden min-w-0 sm:block">
          <p className="truncate text-sm font-semibold leading-tight text-text">{t.stickyLabel}</p>
        </div>
        <div className="flex w-full items-center justify-end gap-2 sm:w-auto">
          <a
            href="#rappel"
            className="inline-flex flex-1 items-center justify-center rounded-full border border-text/50 px-4 py-2.5 text-sm font-semibold text-text transition-colors duration-200 hover:bg-text hover:text-bg sm:flex-none sm:px-5"
          >
            {LEAD_STRINGS[locale].stickyCta}
          </a>
          <PrimaryButton href={`/${locale}/#offre`} className="flex-1 px-4 py-2.5 text-sm sm:flex-none sm:px-5">
            {t.stickyCta}
          </PrimaryButton>
        </div>
      </Container>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const t = CONTENT[locale];
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: `/${locale}` },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const t = CONTENT[locale];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Thrax Legal",
    description: t.metaDescription,
    brand: { "@type": "Brand", name: "Thrax Legal" },
    offers: t.tiers.map((tier) => ({
      "@type": "Offer",
      name: tier.name,
      price: tier.price.replace(/\D/g, ""),
      priceCurrency: "CHF",
      availability: "https://schema.org/InStock",
      url: `/${locale}/compte/inscription?plan=${tier.slug.replace("abonnement-", "")}`,
    })),
  };

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <JsonLd data={productJsonLd} />
      <div className="pb-24">
        <Nav />
        <main className="bg-bg text-text">
          <section className="relative isolate flex min-h-screen flex-col justify-center overflow-hidden border-b border-border">
            <Image
              src="/media/photos/hero-building.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-30 grayscale"
            />
            <div aria-hidden className="absolute inset-0 bg-bg/80" />
            <Container className="relative mx-auto max-w-3xl py-24 text-center">
              <Reveal>
                <h1 className="text-[2.25rem] font-semibold leading-[1.1] tracking-[-0.02em] text-text sm:text-5xl md:text-6xl">
                  {t.heroTitle}
                </h1>
                <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-text-muted">
                  {t.heroSubtitle}
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <PrimaryButton href={`/${locale}/#offre`} className="px-8 py-3.5 text-base">
                    {t.heroCtaLabel}
                  </PrimaryButton>
                  <a
                    href="#rappel"
                    className="inline-flex items-center justify-center rounded-full border border-text/40 bg-bg/60 px-8 py-3.5 text-base font-medium text-text backdrop-blur transition-colors duration-200 hover:border-text hover:bg-surface"
                  >
                    {LEAD_STRINGS[locale].heroCta}
                  </a>
                </div>
                <div className="mx-auto mt-8 flex max-w-md flex-wrap items-center justify-center gap-x-2 gap-y-1.5 text-xs text-text-muted">
                  {t.heroProof.map((item, index) => (
                    <span key={item} className="flex items-center gap-2">
                      {index > 0 ? (
                        <span aria-hidden className="text-text-muted/40">
                          &middot;
                        </span>
                      ) : null}
                      {item}
                    </span>
                  ))}
                </div>
              </Reveal>
            </Container>
          </section>

          <section className="border-b border-border bg-bg py-16 md:py-24">
            <Container>
              <Reveal className="mx-auto max-w-2xl text-center">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-text-muted">
                  {t.videoEyebrow}
                </p>
                <h2 className="mt-3 text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] text-text md:text-4xl">
                  {t.videoHeading}
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-text-muted">
                  {t.videoBody}
                </p>
              </Reveal>
              <Reveal delay={120} className="mx-auto mt-10 max-w-4xl">
                <VideoEmbed
                  videoId="2A64ZshrWSQ"
                  poster="/media/video/presentation-poster.jpg"
                  title={t.videoHeading}
                  playLabel={t.videoPlayLabel}
                />
                <p className="mt-4 text-center text-xs text-text-muted">{t.videoNote}</p>
              </Reveal>
            </Container>
          </section>

          <section className="theme-light border-y border-border bg-surface py-16 md:py-20">
            <Container className="mx-auto max-w-2xl">
              <Reveal>
                <h2 className="text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-text">
                  {t.aboutHeading}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-text-muted">{t.aboutBody}</p>
              </Reveal>
            </Container>
          </section>

          <section id="offre" className="theme-light scroll-mt-28 bg-bg py-16 md:py-24">
            <Container className="mx-auto max-w-4xl">
              <Reveal>
                <h2 className="text-center text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-text">
                  {t.pricingHeading}
                </h2>
                <p className="mx-auto mt-3 max-w-lg text-center text-base leading-relaxed text-text-muted">
                  {t.pricingSubheading}
                </p>
                <p className="mx-auto mt-4 max-w-lg rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-center text-xs font-medium text-text">
                  {t.founderBadge}
                </p>
                <div className="mt-10 grid gap-6 md:grid-cols-2">
                  {t.tiers.map((tier) => (
                    <TierCard key={tier.slug} tier={tier} locale={locale} />
                  ))}
                </div>
                <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-text/20 bg-surface px-6 py-5 text-center sm:flex-row sm:text-left">
                  <div>
                    <p className="text-base font-semibold text-text">{LEAD_STRINGS[locale].calloutText}</p>
                    <p className="mt-1 text-sm text-text-muted">{LEAD_STRINGS[locale].points[0]}</p>
                  </div>
                  <a
                    href="#rappel"
                    className="inline-flex shrink-0 items-center justify-center rounded-full border border-text bg-bg px-6 py-3 text-sm font-semibold text-text transition-colors duration-200 hover:bg-text hover:text-bg"
                  >
                    {LEAD_STRINGS[locale].heroCta}
                  </a>
                </div>
                <div className="mt-8 rounded-2xl border border-border bg-surface p-6 md:p-8">
                  <p className="text-center text-xs font-medium uppercase tracking-[0.18em] text-text-muted">
                    {t.perksHeading}
                  </p>
                  <div className="mt-6 grid gap-6 md:grid-cols-3">
                    {t.perks.map((perk) => (
                      <div key={perk.title}>
                        <h3 className="text-base font-semibold text-text">{perk.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-text-muted">{perk.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mx-auto mt-6 max-w-lg text-center">
                  <p className="text-sm text-text-muted">
                    {t.extraQuestionNote}
                  </p>
                  <p className="mt-2 text-xs text-text-muted/70">{t.valueDisclaimer}</p>
                  <a href="#dossiers" className="mt-4 inline-block text-sm font-medium text-text underline underline-offset-4">
                    {t.clarityLinkLabel}
                  </a>

                </div>
              </Reveal>
            </Container>
          </section>

          <section id="rappel" className="theme-light scroll-mt-28 border-t border-border bg-surface py-16 md:py-24">
            <Container className="mx-auto max-w-5xl">
              <Reveal>
                <div className="grid gap-10 md:grid-cols-[1fr_1.1fr] md:items-start">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-text-muted">
                      {LEAD_STRINGS[locale].sectionEyebrow}
                    </p>
                    <h2 className="mt-3 text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] text-text md:text-4xl">
                      {LEAD_STRINGS[locale].sectionHeading}
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-text-muted">{LEAD_STRINGS[locale].sectionBody}</p>
                    <ul className="mt-6 space-y-3">
                      {LEAD_STRINGS[locale].points.map((point) => (
                        <li key={point} className="flex gap-3 text-sm text-text">
                          <span aria-hidden className="mt-0.5 text-text">
                            &#10003;
                          </span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-border bg-bg p-6 md:p-8">
                    <LeadForm locale={locale} />
                  </div>
                </div>
              </Reveal>
            </Container>
          </section>

          <section id="dossiers" className="theme-light scroll-mt-28 border-t border-border bg-bg py-16 md:py-24">
            <Container className="mx-auto max-w-4xl">
              <Reveal>
                <h2 className="text-center text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-text">
                  {t.clarity.heading}
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-center text-base leading-relaxed text-text-muted">
                  {t.clarity.intro}
                </p>
                <div className="mt-10 grid gap-6 md:grid-cols-2">
                  {[t.clarity.quick, t.clarity.dossier].map((block) => (
                    <div key={block.title} className="rounded-2xl border border-border bg-surface p-6 md:p-8">
                      <h3 className="text-xl font-semibold tracking-[-0.02em] text-text">{block.title}</h3>
                      <p className="mt-1 text-sm font-medium text-text">{block.limit}</p>
                      <p className="mt-4 text-sm leading-relaxed text-text-muted">{block.definition}</p>
                      <p className="mt-5 text-xs font-medium uppercase tracking-[0.14em] text-text-muted">
                        {block.examplesLabel}
                      </p>
                      <ul className="mt-2 space-y-2 text-sm text-text">
                        {block.examples.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span aria-hidden className="text-text-muted">&middot;</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  {[
                    { heading: t.clarity.twoHeading, items: t.clarity.two },
                    { heading: t.clarity.freeHeading, items: t.clarity.free },
                  ].map((block) => (
                    <div key={block.heading} className="rounded-2xl border border-border bg-bg p-6 md:p-8">
                      <h3 className="text-base font-semibold text-text">{block.heading}</h3>
                      <ul className="mt-3 space-y-2 text-sm text-text-muted">
                        {block.items.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span aria-hidden>&middot;</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <p className="mx-auto mt-8 max-w-xl text-center text-sm font-medium leading-relaxed text-text">
                  {t.clarity.promise}
                </p>
              </Reveal>
            </Container>
          </section>

          <section className="theme-light bg-surface py-16 md:py-20">
            <Container className="mx-auto max-w-2xl">
              <Reveal>
                <h2 className="text-center text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-text">
                  {t.stepsHeading}
                </h2>
                <StepList steps={t.steps} className="mt-8" />
              </Reveal>
            </Container>
          </section>

          <section className="theme-light bg-bg py-16 md:py-24">
            <Container className="mx-auto max-w-2xl">
              <Reveal>
                <h2 className="text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-text">
                  {t.domainsHeading}
                </h2>
                <div className="mt-6 flex flex-wrap gap-3">
                  {t.domains.map((domain) => (
                    <span
                      key={domain}
                      className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-text-muted"
                    >
                      {domain}
                    </span>
                  ))}
                </div>
              </Reveal>
            </Container>
          </section>

          <section className="theme-light border-t border-border bg-bg py-16 md:py-20">
            <Container className="mx-auto max-w-2xl">
              <Reveal>
                <h2 className="text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-text">
                  {t.guideLabel}
                </h2>
                <div className="mt-6 divide-y divide-border border-t border-border">
                  {GUIDE_ARTICLES.slice(0, 4).map((item) => (
                    <Link
                      key={item.slug}
                      href={`/${locale}/guide/${item.slug}`}
                      className="group flex items-center justify-between gap-6 py-4 text-sm font-medium text-text transition-colors hover:text-text-muted"
                    >
                      {item.shortTitle[locale]}
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-text-muted transition-colors duration-200 group-hover:border-white/25 group-hover:bg-surface">
                        <ArrowIcon />
                      </span>
                    </Link>
                  ))}
                </div>
                <Link
                  href={`/${locale}/guide`}
                  className="mt-6 inline-block text-sm font-medium text-text underline decoration-dotted underline-offset-4 hover:text-text-muted"
                >
                  {t.guideLinkLabel} ↗
                </Link>
              </Reveal>
            </Container>
          </section>

          <section id="contact" className="theme-light scroll-mt-28 bg-surface py-16 md:py-24">
            <Container className="mx-auto max-w-2xl">
              <Reveal>
                <h2 className="text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-text">
                  {t.faqHeading}
                </h2>
                <FaqAccordion items={t.faq} className="mt-8" />
                <div className="mt-12 flex justify-center">
                  <PrimaryButton href={`/${locale}/#offre`} className="px-8 py-3.5 text-base">
                    {t.heroCtaLabel}
                  </PrimaryButton>
                </div>
              </Reveal>
            </Container>
          </section>
        </main>
        <Footer locale={locale} />
      </div>
      <StickyOrderBar locale={locale} t={t} />
    </>
  );
}
