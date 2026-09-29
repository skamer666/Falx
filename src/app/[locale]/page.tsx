import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import FaqAccordion from "@/components/site/FaqAccordion";
import JsonLd from "@/components/site/JsonLd";
import { GUIDE_ARTICLES } from "@/lib/guide/articles";
import { isLocale, DEFAULT_LOCALE, type Locale } from "@/i18n/config";
import {
  Container,
  LawyerComparison,
  PrimaryButton,
  StepList,
  TrustBar,
} from "@/components/site/ui";

type FaqItem = { q: string; a: string };
type StepItem = { title: string; description: string };
type DomainItem = { title: string; description: string };
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
  heroCtaSub: string;
  trustBar: [string, string, string];
  aboutHeading: string;
  aboutBody1: string;
  aboutBody2: string;
  pricingHeading: string;
  pricingSubheading: string;
  founderBadge: string;
  tiers: [Tier, Tier];
  extraQuestionNote: string;
  guaranteeNote: string;
  stepsHeading: string;
  steps: StepItem[];
  domainsHeading: string;
  domains: DomainItem[];
  guideLabel: string;
  guideLinkLabel: string;
  lawyerHeading: string;
  lawyerLabel: string;
  lawyerRange: string;
  lawyerNote: string;
  brandLabel: string;
  thraxPrice: string;
  thraxNote: string;
  lawyerDisclaimer: string;
  faqHeading: string;
  faq: FaqItem[];
  stickyLabel: string;
  stickyCta: string;
};

const CONTENT: Record<Locale, HomeContent> = {
  fr: {
    metaTitle: "Abonnement juridique PME en Suisse romande | Thrax Legal",
    metaDescription:
      "Votre juriste externalisé pour indépendants et PME de Suisse romande : rédaction de contrats, résolution de litiges, conformité nLPD. Traité sous 48-72h, prix fixe mensuel, sans engagement, sans avocat à l'heure.",
    heroTitle: "Votre juriste externalisé, pour votre PME, à prix fixe.",
    heroSubtitle:
      "Rédaction de contrats, résolution de vos litiges, explication de vos démarches : un juriste externalisé qui s'occupe de vos besoins juridiques au quotidien. Prix fixe mensuel, pas d'avocat à l'heure, pas de rendez-vous, sans engagement.",
    heroCtaLabel: "Voir les formules",
    heroCtaSub: "Résiliable à tout moment · Prix fixe garanti",
    trustBar: [
      "Rédaction de contrats, résolution de litiges, explication de vos démarches : on s'occupe de vos besoins juridiques.",
      "Prix fixe mensuel : jamais de facturation à l'heure ni de surprise.",
      "Sans engagement : résiliez à tout moment, aucun frais caché.",
    ],
    aboutHeading: "Un juriste fractionné, pas un cabinet d'avocats",
    aboutBody1:
      "Je suis étudiant en droit, avec plusieurs années d'expérience en cabinet d'avocat en recherche juridique et en rédaction. Je ne prétends pas tout connaître par cœur — et c'est précisément pour ça que chaque dossier fait l'objet d'une vraie recherche avant que je m'en occupe, jamais d'une improvisation en direct au téléphone.",
    aboutBody2:
      "C'est le principe du juriste fractionné : un accès sérieux et abordable au droit pour votre PME, sans les coûts d'un cabinet à temps plein. Pour les dossiers contentieux ou les décisions à très haut risque, je vous oriente vers un avocat inscrit à un barreau suisse plutôt que de répondre à l'aveugle.",
    pricingHeading: "Deux formules, un seul principe : bien plus que ce que vous payez",
    pricingSubheading:
      "Choisissez le volume qui correspond à votre activité. Changez de formule ou résiliez à tout moment.",
    founderBadge:
      "🎯 Offre de lancement : les 20 premiers abonnés gardent ce prix à vie, même quand les tarifs augmenteront.",
    tiers: [
      {
        slug: "abonnement-essentiel",
        name: "Essentiel",
        price: "49 CHF",
        priceNote: "/ mois",
        tagline: "Pour les indépendants et micro-entreprises",
        features: [
          "Messagerie illimitée pour vos questions rapides (usage raisonnable)",
          "2 dossiers complets pris en charge par mois (contrat, litige, procédure)",
          "Traité sous 72h ouvrées",
          "Bibliothèque complète de modèles — valeur 500 CHF, incluse",
          "Garantie remboursé si non satisfait le premier mois",
          "Prix bloqué à vie tant que vous restez abonné",
          "Sans engagement, résiliable à tout moment",
        ],
        valueNote: "Valeur estimée si acheté séparément chez un avocat : plus de 900 CHF",
        ctaLabel: "Choisir Essentiel",
        highlight: false,
      },
      {
        slug: "abonnement-croissance",
        name: "Croissance",
        price: "119 CHF",
        priceNote: "/ mois",
        tagline: "Pour les PME avec des besoins réguliers",
        badge: "Le plus choisi",
        features: [
          "Messagerie illimitée pour vos questions rapides (usage raisonnable)",
          "5 dossiers complets pris en charge par mois",
          "Traité sous 48h ouvrées (24h pour les urgences signalées)",
          "Révision de contrat prioritaire incluse chaque mois",
          "Bibliothèque complète de modèles — valeur 500 CHF, incluse",
          "Garantie remboursé si non satisfait le premier mois",
          "Prix bloqué à vie tant que vous restez abonné",
          "Sans engagement, résiliable à tout moment",
        ],
        valueNote: "Valeur estimée si acheté séparément chez un avocat : plus de 2'000 CHF",
        ctaLabel: "Choisir Croissance",
        highlight: true,
      },
    ],
    extraQuestionNote:
      "Dossier supplémentaire au-delà de votre forfait : 39 CHF, prix fixe — jamais d'horaire.",
    guaranteeNote:
      "Pas convaincu ? Si votre premier mois ne vous satisfait pas, vous êtes intégralement remboursé, sans justification à fournir.",
    stepsHeading: "Comment ça marche",
    steps: [
      { title: "Choisissez votre formule", description: "Essentiel ou Croissance, sans engagement. Paiement mensuel, résiliable à tout moment." },
      { title: "Décrivez votre besoin", description: "Contrat à rédiger, litige à régler, procédure à comprendre : expliquez votre situation via le formulaire dédié." },
      { title: "On s'en occupe", description: "Contrat rédigé, solution expliquée, procédure clarifiée sous 48 à 72h selon votre formule, avec les documents nécessaires." },
    ],
    domainsHeading: "Ce que couvre l'abonnement",
    domains: [
      { title: "Contrats commerciaux & CGV", description: "Rédaction et relecture de vos contrats et conditions générales." },
      { title: "Droit du travail", description: "Contrats de travail, licenciements, questions RH courantes." },
      { title: "Droit des sociétés", description: "Questions de structure, gouvernance et formalités courantes." },
      { title: "Recouvrement amiable", description: "Mises en demeure et démarches avant procédure judiciaire." },
      { title: "Conformité nLPD", description: "Mise en conformité de vos traitements de données personnelles." },
      { title: "Baux commerciaux", description: "Relecture et questions sur vos contrats de bail professionnel." },
    ],
    guideLabel: "Pour aller plus loin",
    guideLinkLabel: "Voir tout le guide ↗",
    lawyerHeading: "Le prix d'un avocat, sans la facture horaire",
    lawyerLabel: "Avocat traditionnel",
    lawyerRange: "200 à 600 CHF / heure",
    lawyerNote: "Facturation horaire classique, souvent difficile à prévoir sur la durée pour une PME.",
    brandLabel: "Thrax Legal",
    thraxPrice: "dès 49 CHF / mois",
    thraxNote: "Prix fixe et prévisible, sans engagement, prise en charge de vos besoins incluse.",
    lawyerDisclaimer:
      "Estimation basée sur les tarifs horaires usuels des avocats en Suisse (200 à 600 CHF/h selon expérience et canton). Thrax Legal n'est pas un cabinet d'avocats et n'assure pas la représentation devant les tribunaux.",
    faqHeading: "Questions fréquentes",
    faq: [
      {
        q: "Que couvre exactement l'abonnement ?",
        a: "La prise en charge de vos besoins juridiques courants : rédaction et relecture de contrats, résolution de litiges, explication de vos démarches (droit du travail, CGV, nLPD, recouvrement amiable, baux commerciaux), une messagerie illimitée pour vos questions rapides, et l'accès à une bibliothèque complète de modèles. Les opérations exceptionnelles (levée de fonds, contentieux devant un tribunal, restructuration) ne sont pas incluses — nous vous orientons alors vers un avocat spécialisé.",
      },
      {
        q: "C'est quoi la différence entre une « question rapide » et un « dossier » ?",
        a: "Une question rapide est une clarification ponctuelle, répondue sans recherche approfondie (illimité, usage raisonnable). Un dossier, c'est un vrai travail : rédiger un contrat, régler un litige, structurer une démarche — c'est ce volume-là qui est compté dans votre forfait mensuel (2 pour Essentiel, 5 pour Croissance).",
      },
      {
        q: "Que se passe-t-il si je ne suis pas satisfait ?",
        a: "Vous êtes intégralement remboursé si votre premier mois ne vous convainc pas, sans justification à fournir. Ensuite, aucun engagement : vous résiliez quand vous voulez, effectif à la fin du mois déjà payé — et votre prix reste bloqué tant que vous restez abonné, même si nos tarifs augmentent pour les nouveaux clients.",
      },
      {
        q: "Que se passe-t-il si j'ai plus de dossiers que mon forfait ?",
        a: "Chaque dossier supplémentaire est facturé 39 CHF, prix fixe — jamais à l'heure. Vous pouvez aussi changer de formule à tout moment.",
      },
      {
        q: "Sous quel délai mon dossier est-il traité ?",
        a: "72h ouvrées pour la formule Essentiel, 48h ouvrées pour la formule Croissance. Chaque dossier est traité personnellement à partir de votre situation, jamais un simple renvoi vers un article générique.",
      },
      {
        q: "Thrax Legal est-il un cabinet d'avocats ? Qui s'occupe de mon dossier ?",
        a: "Non, ce n'est pas un cabinet d'avocats. Je suis étudiant en droit, avec plusieurs années d'expérience en cabinet d'avocat en recherche juridique et en rédaction — c'est le principe du juriste fractionné. Chaque dossier fait l'objet d'une vraie recherche avant que je m'en occupe, jamais d'une improvisation en direct. Pour les dossiers contentieux ou les opérations complexes, je vous oriente vers un avocat inscrit à un registre cantonal suisse plutôt que de répondre à l'aveugle.",
      },
      {
        q: "Proposez-vous ce service dans toute la Suisse ?",
        a: "Le service est pensé et positionné pour les indépendants et PME de Suisse romande, mais le site est disponible en français, allemand, anglais et italien.",
      },
      {
        q: "Comment se déroule le suivi de mon dossier ?",
        a: "Vous décrivez votre besoin via le formulaire dédié, je m'en occupe personnellement, et vous recevez le résultat (contrat rédigé, solution expliquée, procédure clarifiée) dans le délai de votre formule — avec, en prime, une trace écrite que vous pouvez ressortir en cas de litige ou de contrôle.",
      },
    ],
    stickyLabel: "Dès 49 CHF/mois",
    stickyCta: "Voir les formules",
  },
  de: {
    metaTitle: "KMU-Rechtsabo in der Westschweiz | Thrax Legal",
    metaDescription:
      "Ihr externer Rechtsberater für Selbstständige und KMU in der Westschweiz: Vertragserstellung, Streitfalllösung, DSG-Konformität. Bearbeitet innert 48-72h, fixer Monatspreis, ohne Vertragsbindung, kein Anwalt nach Stundensatz.",
    heroTitle: "Ihr externer Rechtsberater, für Ihr KMU, zum Fixpreis.",
    heroSubtitle:
      "Verträge erstellen, Streitfälle lösen, Verfahren erklären: ein externer Rechtsberater, der sich um Ihre rechtlichen Bedürfnisse kümmert. Fixer Monatspreis, kein Anwalt nach Stundensatz, kein Termin, ohne Vertragsbindung.",
    heroCtaLabel: "Formeln ansehen",
    heroCtaSub: "Jederzeit kündbar · Fixpreis garantiert",
    trustBar: [
      "Verträge erstellen, Streitfälle lösen, Verfahren erklären: wir kümmern uns um Ihre rechtlichen Bedürfnisse.",
      "Fixer Monatspreis: nie eine Stundenabrechnung oder Überraschung.",
      "Ohne Vertragsbindung: jederzeit kündbar, keine versteckten Kosten.",
    ],
    aboutHeading: "Ein fraktionierter Jurist, keine Anwaltskanzlei",
    aboutBody1:
      "Ich bin Jurastudent, mit mehrjähriger Erfahrung in einer Anwaltskanzlei in juristischer Recherche und im Verfassen von Schriftstücken. Ich behaupte nicht, alles auswendig zu kennen — genau deshalb wird jeder Fall richtig recherchiert, bevor ich mich darum kümmere, nie am Telefon improvisiert.",
    aboutBody2:
      "Das ist das Prinzip des fraktionierten Juristen: ein seriöser, erschwinglicher Zugang zum Recht für Ihr KMU, ohne die Kosten einer Kanzlei in Vollzeit. Bei streitigen Fällen oder Entscheidungen mit sehr hohem Risiko verweise ich Sie an eine im kantonalen Anwaltsregister eingetragene Anwältin oder einen Anwalt, statt aufs Geratewohl zu antworten.",
    pricingHeading: "Zwei Formeln, ein Grundsatz: weit mehr, als Sie bezahlen",
    pricingSubheading:
      "Wählen Sie das Volumen, das zu Ihrer Tätigkeit passt. Formel wechseln oder jederzeit kündigen.",
    founderBadge:
      "🎯 Lancierungsangebot: Die ersten 20 Abonnentinnen und Abonnenten behalten diesen Preis auf Lebenszeit, auch wenn die Tarife später steigen.",
    tiers: [
      {
        slug: "abonnement-essentiel",
        name: "Essentiel",
        price: "CHF 49",
        priceNote: "/ Monat",
        tagline: "Für Selbstständige und Kleinstunternehmen",
        features: [
          "Unbegrenzte Nachrichten für schnelle Fragen (angemessene Nutzung)",
          "2 vollständige Anliegen pro Monat (Vertrag, Streitfall, Verfahren)",
          "Bearbeitet innert 72 Arbeitsstunden",
          "Vollständige Vorlagenbibliothek — Wert CHF 500, inklusive",
          "Geld-zurück-Garantie, falls Sie im ersten Monat nicht zufrieden sind",
          "Preis lebenslang fixiert, solange Sie abonniert bleiben",
          "Ohne Vertragsbindung, jederzeit kündbar",
        ],
        valueNote: "Geschätzter Wert bei separatem Kauf bei einem Anwalt: über CHF 900",
        ctaLabel: "Essentiel wählen",
        highlight: false,
      },
      {
        slug: "abonnement-croissance",
        name: "Croissance",
        price: "CHF 119",
        priceNote: "/ Monat",
        tagline: "Für KMU mit regelmässigem Bedarf",
        badge: "Am häufigsten gewählt",
        features: [
          "Unbegrenzte Nachrichten für schnelle Fragen (angemessene Nutzung)",
          "5 vollständige Anliegen pro Monat",
          "Bearbeitet innert 48 Arbeitsstunden (24h bei gemeldeten Notfällen)",
          "Prioritäre Vertragsprüfung jeden Monat inklusive",
          "Vollständige Vorlagenbibliothek — Wert CHF 500, inklusive",
          "Geld-zurück-Garantie, falls Sie im ersten Monat nicht zufrieden sind",
          "Preis lebenslang fixiert, solange Sie abonniert bleiben",
          "Ohne Vertragsbindung, jederzeit kündbar",
        ],
        valueNote: "Geschätzter Wert bei separatem Kauf bei einem Anwalt: über CHF 2'000",
        ctaLabel: "Croissance wählen",
        highlight: true,
      },
    ],
    extraQuestionNote:
      "Zusätzliches Anliegen über Ihr Kontingent hinaus: CHF 39, Fixpreis — nie nach Stundensatz.",
    guaranteeNote:
      "Nicht überzeugt? Wenn Sie im ersten Monat nicht zufrieden sind, erhalten Sie Ihr Geld vollständig zurück, ohne Begründung.",
    stepsHeading: "So funktioniert's",
    steps: [
      { title: "Formel wählen", description: "Essentiel oder Croissance, ohne Vertragsbindung. Monatliche Zahlung, jederzeit kündbar." },
      { title: "Ihr Anliegen schildern", description: "Vertrag zu erstellen, Streitfall zu lösen, Verfahren zu verstehen: schildern Sie Ihre Situation über das dafür vorgesehene Formular." },
      { title: "Wir kümmern uns darum", description: "Vertrag erstellt, Lösung erklärt, Verfahren geklärt innert 48 bis 72h je nach Formel, mit den nötigen Dokumenten." },
    ],
    domainsHeading: "Was das Abo abdeckt",
    domains: [
      { title: "Handelsverträge & AGB", description: "Erstellung und Prüfung Ihrer Verträge und allgemeinen Geschäftsbedingungen." },
      { title: "Arbeitsrecht", description: "Arbeitsverträge, Kündigungen, gängige HR-Fragen." },
      { title: "Gesellschaftsrecht", description: "Fragen zu Struktur, Governance und gängigen Formalitäten." },
      { title: "Gütliches Inkasso", description: "Mahnschreiben und Schritte vor einem Gerichtsverfahren." },
      { title: "DSG-Konformität", description: "Konformität Ihrer Personendatenbearbeitung." },
      { title: "Geschäftsmietverträge", description: "Prüfung und Fragen zu Ihren gewerblichen Mietverträgen." },
    ],
    guideLabel: "Mehr erfahren",
    guideLinkLabel: "Zum ganzen Ratgeber ↗",
    lawyerHeading: "Der Preis eines Anwalts, ohne Stundenabrechnung",
    lawyerLabel: "Klassischer Anwalt",
    lawyerRange: "CHF 200 bis 600 / Stunde",
    lawyerNote: "Klassische Stundenabrechnung, für ein KMU auf Dauer oft schwer planbar.",
    brandLabel: "Thrax Legal",
    thraxPrice: "ab CHF 49 / Monat",
    thraxNote: "Fixer, planbarer Preis, ohne Vertragsbindung, Bearbeitung Ihrer Anliegen inklusive.",
    lawyerDisclaimer:
      "Schätzung basierend auf üblichen Stundensätzen von Anwälten in der Schweiz (CHF 200 bis 600/h je nach Erfahrung und Kanton). Thrax Legal ist keine Anwaltskanzlei und übernimmt keine Vertretung vor Gericht.",
    faqHeading: "Häufige Fragen",
    faq: [
      {
        q: "Was deckt das Abo genau ab?",
        a: "Die Bearbeitung Ihrer gängigen rechtlichen Anliegen: Erstellung und Prüfung von Verträgen, Lösung von Streitfällen, Erklärung Ihrer Verfahren (Arbeitsrecht, AGB, DSG, gütliches Inkasso, Geschäftsmietverträge), unbegrenzte Nachrichten für schnelle Fragen und Zugang zu einer vollständigen Vorlagenbibliothek. Aussergewöhnliche Vorgänge (Kapitalerhöhung, Gerichtsverfahren, Restrukturierung) sind nicht inbegriffen — dafür verweisen wir Sie an eine spezialisierte Anwältin oder einen Anwalt.",
      },
      {
        q: "Was ist der Unterschied zwischen einer «schnellen Frage» und einem «Anliegen»?",
        a: "Eine schnelle Frage ist eine punktuelle Klärung, ohne vertiefte Recherche beantwortet (unbegrenzt, angemessene Nutzung). Ein Anliegen ist echte Arbeit: einen Vertrag erstellen, einen Streitfall lösen, ein Verfahren strukturieren — genau dieses Volumen wird in Ihrem monatlichen Kontingent gezählt (2 bei Essentiel, 5 bei Croissance).",
      },
      {
        q: "Was passiert, wenn ich nicht zufrieden bin?",
        a: "Sie erhalten Ihr Geld vollständig zurück, wenn Sie im ersten Monat nicht überzeugt sind, ohne Begründung. Danach keine Vertragsbindung: Sie kündigen, wann Sie wollen, wirksam am Ende des bereits bezahlten Monats — und Ihr Preis bleibt fixiert, solange Sie abonniert bleiben, auch wenn unsere Tarife für Neukunden steigen.",
      },
      {
        q: "Was passiert, wenn ich mehr Anliegen habe als mein Kontingent?",
        a: "Jedes zusätzliche Anliegen kostet CHF 39, Fixpreis — nie nach Stundensatz. Sie können auch jederzeit die Formel wechseln.",
      },
      {
        q: "Innert welcher Frist wird mein Anliegen bearbeitet?",
        a: "72 Arbeitsstunden bei der Formel Essentiel, 48 Arbeitsstunden bei Croissance. Jeder Fall wird persönlich anhand Ihrer Situation bearbeitet, kein blosser Verweis auf einen generischen Artikel.",
      },
      {
        q: "Ist Thrax Legal eine Anwaltskanzlei? Wer kümmert sich um meinen Fall?",
        a: "Nein, keine Anwaltskanzlei. Ich bin Jurastudent, mit mehrjähriger Erfahrung in einer Anwaltskanzlei in juristischer Recherche und im Verfassen von Schriftstücken — das Prinzip des fraktionierten Juristen. Jeder Fall wird richtig recherchiert, bevor ich mich darum kümmere, nie am Telefon improvisiert. Bei streitigen Fällen oder komplexen Vorgängen verweise ich Sie an eine im kantonalen Anwaltsregister eingetragene Anwältin oder einen Anwalt, statt aufs Geratewohl zu antworten.",
      },
      {
        q: "Bieten Sie diesen Dienst in der ganzen Schweiz an?",
        a: "Der Dienst ist für Selbstständige und KMU in der Westschweiz konzipiert und positioniert, die Website ist aber auf Französisch, Deutsch, Englisch und Italienisch verfügbar.",
      },
      {
        q: "Wie läuft die Bearbeitung meines Falls ab?",
        a: "Sie schildern Ihr Anliegen über das dafür vorgesehene Formular, ich kümmere mich persönlich darum, und Sie erhalten das Ergebnis (erstellter Vertrag, erklärte Lösung, geklärtes Verfahren) innerhalb der Frist Ihrer Formel — inklusive eines schriftlichen Nachweises, den Sie bei einem Streitfall oder einer Kontrolle vorlegen können.",
      },
    ],
    stickyLabel: "Ab CHF 49/Monat",
    stickyCta: "Formeln ansehen",
  },
  en: {
    metaTitle: "SME legal subscription in French-speaking Switzerland | Thrax Legal",
    metaDescription:
      "Your outsourced legal counsel for independents and SMEs in French-speaking Switzerland: contract drafting, dispute resolution, FADP compliance. Handled within 48-72h, fixed monthly price, no commitment, no hourly lawyer.",
    heroTitle: "Your outsourced legal counsel, for your SME, at a fixed price.",
    heroSubtitle:
      "Drafting contracts, resolving disputes, explaining procedures: an outsourced legal counsel who handles your legal needs. Fixed monthly price, no hourly lawyer, no appointment, no commitment.",
    heroCtaLabel: "See the plans",
    heroCtaSub: "Cancel anytime · Fixed price guaranteed",
    trustBar: [
      "Drafting contracts, resolving disputes, explaining procedures: we handle your legal needs.",
      "Fixed monthly price: never an hourly bill or a surprise.",
      "No commitment: cancel anytime, no hidden fees.",
    ],
    aboutHeading: "A fractional jurist, not a law firm",
    aboutBody1:
      "I'm a law student, with several years of law firm experience in legal research and drafting. I don't claim to know everything by heart — that's exactly why every case gets real research before I handle it, never live improvisation on a call.",
    aboutBody2:
      "That's the fractional-jurist model: serious, affordable access to legal support for your SME, without the cost of a full-time firm. For contentious matters or very high-stakes decisions, I refer you to a lawyer registered with a Swiss cantonal bar rather than guess.",
    pricingHeading: "Two plans, one principle: far more than you pay for",
    pricingSubheading:
      "Choose the volume that fits your business. Switch plans or cancel anytime.",
    founderBadge:
      "🎯 Launch offer: the first 20 subscribers keep this price for life, even after rates go up.",
    tiers: [
      {
        slug: "abonnement-essentiel",
        name: "Essential",
        price: "CHF 49",
        priceNote: "/ month",
        tagline: "For freelancers and micro-businesses",
        features: [
          "Unlimited messaging for quick questions (fair use)",
          "2 full matters handled per month (contract, dispute, procedure)",
          "Handled within 72 business hours",
          "Full template library — CHF 500 value, included",
          "Money-back guarantee if you're not satisfied in the first month",
          "Price locked for life as long as you stay subscribed",
          "No commitment, cancel anytime",
        ],
        valueNote: "Estimated value if purchased separately from a lawyer: over CHF 900",
        ctaLabel: "Choose Essential",
        highlight: false,
      },
      {
        slug: "abonnement-croissance",
        name: "Growth",
        price: "CHF 119",
        priceNote: "/ month",
        tagline: "For SMEs with regular needs",
        badge: "Most chosen",
        features: [
          "Unlimited messaging for quick questions (fair use)",
          "5 full matters handled per month",
          "Handled within 48 business hours (24h for flagged urgent cases)",
          "Priority contract review included every month",
          "Full template library — CHF 500 value, included",
          "Money-back guarantee if you're not satisfied in the first month",
          "Price locked for life as long as you stay subscribed",
          "No commitment, cancel anytime",
        ],
        valueNote: "Estimated value if purchased separately from a lawyer: over CHF 2,000",
        ctaLabel: "Choose Growth",
        highlight: true,
      },
    ],
    extraQuestionNote:
      "Extra matter beyond your plan: CHF 39, fixed price — never hourly.",
    guaranteeNote:
      "Not convinced? If your first month doesn't win you over, you get a full refund, no questions asked.",
    stepsHeading: "How it works",
    steps: [
      { title: "Choose your plan", description: "Essential or Growth, no commitment. Monthly payment, cancel anytime." },
      { title: "Describe your need", description: "A contract to draft, a dispute to resolve, a procedure to understand: describe your situation via the dedicated form." },
      { title: "We handle it", description: "Contract drafted, solution explained, procedure clarified within 48 to 72h depending on your plan, with the necessary documents." },
    ],
    domainsHeading: "What the subscription covers",
    domains: [
      { title: "Commercial contracts & T&Cs", description: "Drafting and review of your contracts and terms and conditions." },
      { title: "Employment law", description: "Employment contracts, terminations, common HR questions." },
      { title: "Corporate law", description: "Structure, governance and common formalities questions." },
      { title: "Amicable debt collection", description: "Formal notices and steps before legal proceedings." },
      { title: "FADP compliance", description: "Bringing your personal data processing into compliance." },
      { title: "Commercial leases", description: "Review and questions about your business lease agreements." },
    ],
    guideLabel: "Go further",
    guideLinkLabel: "See the full guide ↗",
    lawyerHeading: "The price of a lawyer, without the hourly bill",
    lawyerLabel: "Traditional lawyer",
    lawyerRange: "CHF 200 to 600 / hour",
    lawyerNote: "Classic hourly billing, often hard to predict over time for an SME.",
    brandLabel: "Thrax Legal",
    thraxPrice: "from CHF 49 / month",
    thraxNote: "Fixed, predictable price, no commitment, your needs handled end to end.",
    lawyerDisclaimer:
      "Estimate based on typical lawyer hourly rates in Switzerland (CHF 200 to 600/h depending on experience and canton). Thrax Legal is not a law firm and does not represent clients before courts.",
    faqHeading: "Frequently asked questions",
    faq: [
      {
        q: "What exactly does the subscription cover?",
        a: "Handling your common legal needs: drafting and reviewing contracts, resolving disputes, explaining your procedures (employment law, T&Cs, FADP, amicable debt collection, commercial leases), unlimited messaging for quick questions, and access to a full template library. Exceptional matters (fundraising, court litigation, restructuring) are not included — we then refer you to a specialised lawyer.",
      },
      {
        q: "What's the difference between a \"quick question\" and a \"matter\"?",
        a: "A quick question is a one-off clarification, answered without in-depth research (unlimited, fair use). A matter is real work: drafting a contract, resolving a dispute, structuring a procedure — that's the volume counted against your monthly plan (2 for Essential, 5 for Growth).",
      },
      {
        q: "What happens if I'm not satisfied?",
        a: "You get a full refund if your first month doesn't convince you, no questions asked. After that, no commitment: cancel whenever you want, effective at the end of the month already paid — and your price stays locked as long as you stay subscribed, even if our rates rise for new customers.",
      },
      {
        q: "What happens if I have more matters than my plan allows?",
        a: "Each extra matter is billed at CHF 39, fixed price — never hourly. You can also switch plans at any time.",
      },
      {
        q: "How long until my matter is handled?",
        a: "72 business hours on the Essential plan, 48 business hours on Growth. Every case is handled personally based on your situation, not a generic article link.",
      },
      {
        q: "Is Thrax Legal a law firm? Who handles my case?",
        a: "No, it's not a law firm. I'm a law student, with several years of law firm experience in legal research and drafting — that's the fractional-jurist model. Every case gets real research before I handle it, never live improvisation. For contentious matters or complex transactions, I refer you to a lawyer registered with a Swiss cantonal bar rather than guess.",
      },
      {
        q: "Do you offer this service across all of Switzerland?",
        a: "The service is designed and positioned for freelancers and SMEs in French-speaking Switzerland, but the site is available in French, German, English and Italian.",
      },
      {
        q: "How is my case actually handled?",
        a: "You describe your need via the dedicated form, I handle it personally, and you receive the result (a drafted contract, an explained solution, a clarified procedure) within your plan's timeframe — plus a written record you can produce in case of a dispute or an audit.",
      },
    ],
    stickyLabel: "From CHF 49/month",
    stickyCta: "See the plans",
  },
  it: {
    metaTitle: "Abbonamento legale per PME nella Svizzera romanda | Thrax Legal",
    metaDescription:
      "Il vostro giurista esternalizzato per indipendenti e PMI della Svizzera romanda: redazione di contratti, risoluzione di controversie, conformità nLPD. Gestito entro 48-72h, prezzo fisso mensile, senza impegno.",
    heroTitle: "Il vostro giurista esternalizzato, per la vostra PMI, a prezzo fisso.",
    heroSubtitle:
      "Redazione di contratti, risoluzione di controversie, spiegazione delle procedure: un giurista esternalizzato che si occupa delle vostre esigenze legali. Prezzo fisso mensile, niente avvocato a ore, niente appuntamento, senza impegno.",
    heroCtaLabel: "Vedere le formule",
    heroCtaSub: "Disdicibile in qualsiasi momento · Prezzo fisso garantito",
    trustBar: [
      "Redazione di contratti, risoluzione di controversie, spiegazione delle procedure: ci occupiamo delle vostre esigenze legali.",
      "Prezzo fisso mensile: mai una fatturazione oraria o una sorpresa.",
      "Senza impegno: disdite in qualsiasi momento, nessun costo nascosto.",
    ],
    aboutHeading: "Un giurista frazionato, non uno studio legale",
    aboutBody1:
      "Sono uno studente di giurisprudenza, con diversi anni di esperienza in uno studio legale nella ricerca giuridica e nella redazione. Non pretendo di sapere tutto a memoria — è esattamente per questo che ogni caso è oggetto di una vera ricerca prima che me ne occupi, mai di un'improvvisazione dal vivo al telefono.",
    aboutBody2:
      "È il principio del giurista frazionato: un accesso serio e accessibile al diritto per la vostra PMI, senza i costi di uno studio a tempo pieno. Per i casi contenziosi o le decisioni ad altissimo rischio, vi indirizzo verso un avvocato iscritto a un albo cantonale svizzero invece di rispondere alla cieca.",
    pricingHeading: "Due formule, un solo principio: molto più di quanto pagate",
    pricingSubheading:
      "Scegliete il volume adatto alla vostra attività. Cambiate formula o disdite in qualsiasi momento.",
    founderBadge:
      "🎯 Offerta di lancio: i primi 20 abbonati mantengono questo prezzo a vita, anche quando le tariffe aumenteranno.",
    tiers: [
      {
        slug: "abonnement-essentiel",
        name: "Essentiel",
        price: "CHF 49",
        priceNote: "/ mese",
        tagline: "Per indipendenti e micro-imprese",
        features: [
          "Messaggistica illimitata per le vostre domande rapide (uso ragionevole)",
          "2 pratiche complete gestite al mese (contratto, controversia, procedura)",
          "Gestite entro 72 ore lavorative",
          "Libreria completa di modelli — valore CHF 500, inclusa",
          "Garanzia rimborso se non soddisfatti il primo mese",
          "Prezzo bloccato a vita finché restate abbonati",
          "Senza impegno, disdicibile in qualsiasi momento",
        ],
        valueNote: "Valore stimato se acquistato separatamente da un avvocato: oltre CHF 900",
        ctaLabel: "Scegliere Essentiel",
        highlight: false,
      },
      {
        slug: "abonnement-croissance",
        name: "Croissance",
        price: "CHF 119",
        priceNote: "/ mese",
        tagline: "Per PMI con esigenze regolari",
        badge: "Il più scelto",
        features: [
          "Messaggistica illimitata per le vostre domande rapide (uso ragionevole)",
          "5 pratiche complete gestite al mese",
          "Gestite entro 48 ore lavorative (24h per le urgenze segnalate)",
          "Revisione contrattuale prioritaria inclusa ogni mese",
          "Libreria completa di modelli — valore CHF 500, inclusa",
          "Garanzia rimborso se non soddisfatti il primo mese",
          "Prezzo bloccato a vita finché restate abbonati",
          "Senza impegno, disdicibile in qualsiasi momento",
        ],
        valueNote: "Valore stimato se acquistato separatamente da un avvocato: oltre CHF 2'000",
        ctaLabel: "Scegliere Croissance",
        highlight: true,
      },
    ],
    extraQuestionNote:
      "Pratica supplementare oltre il vostro pacchetto: CHF 39, prezzo fisso — mai a ore.",
    guaranteeNote:
      "Non convinti? Se il primo mese non vi soddisfa, siete rimborsati integralmente, senza dover fornire motivazioni.",
    stepsHeading: "Come funziona",
    steps: [
      { title: "Scegliete la vostra formula", description: "Essentiel o Croissance, senza impegno. Pagamento mensile, disdicibile in qualsiasi momento." },
      { title: "Descrivete la vostra esigenza", description: "Un contratto da redigere, una controversia da risolvere, una procedura da capire: descrivete la vostra situazione tramite il modulo dedicato." },
      { title: "Ce ne occupiamo noi", description: "Contratto redatto, soluzione spiegata, procedura chiarita entro 48-72h a seconda della formula, con i documenti necessari." },
    ],
    domainsHeading: "Cosa copre l'abbonamento",
    domains: [
      { title: "Contratti commerciali e condizioni generali", description: "Redazione e revisione dei vostri contratti e condizioni generali." },
      { title: "Diritto del lavoro", description: "Contratti di lavoro, licenziamenti, domande HR comuni." },
      { title: "Diritto societario", description: "Domande su struttura, governance e formalità comuni." },
      { title: "Recupero crediti amichevole", description: "Diffide e passi prima di un procedimento giudiziario." },
      { title: "Conformità nLPD", description: "Messa in conformità dei vostri trattamenti di dati personali." },
      { title: "Locazioni commerciali", description: "Revisione e domande sui vostri contratti di locazione professionale." },
    ],
    guideLabel: "Per saperne di più",
    guideLinkLabel: "Vedi tutta la guida ↗",
    lawyerHeading: "Il prezzo di un avvocato, senza fatturazione oraria",
    lawyerLabel: "Avvocato tradizionale",
    lawyerRange: "CHF 200-600 / ora",
    lawyerNote: "Fatturazione oraria classica, spesso difficile da prevedere nel tempo per una PMI.",
    brandLabel: "Thrax Legal",
    thraxPrice: "da CHF 49 / mese",
    thraxNote: "Prezzo fisso e prevedibile, senza impegno, gestione delle vostre esigenze inclusa.",
    lawyerDisclaimer:
      "Stima basata sulle tariffe orarie usuali degli avvocati in Svizzera (CHF 200-600/h secondo esperienza e cantone). Thrax Legal non è uno studio legale e non garantisce la rappresentanza davanti ai tribunali.",
    faqHeading: "Domande frequenti",
    faq: [
      {
        q: "Cosa copre esattamente l'abbonamento?",
        a: "La gestione delle vostre esigenze legali comuni: redazione e revisione di contratti, risoluzione di controversie, spiegazione delle vostre procedure (diritto del lavoro, condizioni generali, nLPD, recupero crediti amichevole, locazioni commerciali), una messaggistica illimitata per le vostre domande rapide, e l'accesso a una libreria completa di modelli. Le operazioni eccezionali (raccolta fondi, contenzioso giudiziario, ristrutturazione) non sono incluse — vi indirizziamo allora verso un avvocato specializzato.",
      },
      {
        q: "Qual è la differenza tra una «domanda rapida» e una «pratica»?",
        a: "Una domanda rapida è un chiarimento puntuale, a cui si risponde senza ricerca approfondita (illimitato, uso ragionevole). Una pratica è un vero lavoro: redigere un contratto, risolvere una controversia, strutturare una procedura — è questo volume ad essere conteggiato nel vostro pacchetto mensile (2 per Essentiel, 5 per Croissance).",
      },
      {
        q: "Cosa succede se non sono soddisfatto?",
        a: "Siete rimborsati integralmente se il primo mese non vi convince, senza dover fornire motivazioni. In seguito, nessun impegno: disdite quando volete, effettivo alla fine del mese già pagato — e il vostro prezzo resta bloccato finché restate abbonati, anche se le nostre tariffe aumentano per i nuovi clienti.",
      },
      {
        q: "Cosa succede se ho più pratiche di quelle previste dal mio pacchetto?",
        a: "Ogni pratica supplementare è fatturata CHF 39, prezzo fisso — mai a ore. Potete anche cambiare formula in qualsiasi momento.",
      },
      {
        q: "Entro quanto tempo viene gestita la mia pratica?",
        a: "72 ore lavorative per la formula Essentiel, 48 ore lavorative per Croissance. Ogni pratica è gestita personalmente a partire dalla vostra situazione, non un semplice rimando a un articolo generico.",
      },
      {
        q: "Thrax Legal è uno studio legale? Chi si occupa della mia pratica?",
        a: "No, non è uno studio legale. Sono uno studente di giurisprudenza, con diversi anni di esperienza in uno studio legale nella ricerca giuridica e nella redazione — il principio del giurista frazionato. Ogni pratica è oggetto di una vera ricerca prima che me ne occupi, mai di un'improvvisazione dal vivo. Per i casi contenziosi o le operazioni complesse, vi indirizzo verso un avvocato iscritto a un albo cantonale svizzero invece di rispondere alla cieca.",
      },
      {
        q: "Offrite questo servizio in tutta la Svizzera?",
        a: "Il servizio è pensato e posizionato per indipendenti e PMI della Svizzera romanda, ma il sito è disponibile in francese, tedesco, inglese e italiano.",
      },
      {
        q: "Come viene gestita concretamente la mia pratica?",
        a: "Descrivete la vostra esigenza tramite il modulo dedicato, me ne occupo personalmente, e ricevete il risultato (contratto redatto, soluzione spiegata, procedura chiarita) entro il termine della vostra formula — con in più una prova scritta che potete esibire in caso di controversia o di controllo.",
      },
    ],
    stickyLabel: "Da CHF 49/mese",
    stickyCta: "Vedere le formule",
  },
};

function TierCard({ tier, locale }: { tier: Tier; locale: Locale }) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-6 md:p-8 ${
        tier.highlight ? "border-accent bg-surface" : "border-border bg-surface"
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
      <PrimaryButton href={`/${locale}/checkout/${tier.slug}`} className="mt-8 w-full px-6 py-3">
        {tier.ctaLabel}
      </PrimaryButton>
    </div>
  );
}

function StickyOrderBar({ locale, t }: { locale: Locale; t: HomeContent }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/95 backdrop-blur">
      <Container className="flex items-center justify-between gap-4 py-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold leading-tight text-text">{t.stickyLabel}</p>
        </div>
        <PrimaryButton href={`/${locale}/#offre`} className="shrink-0 px-5 py-2.5 text-sm">
          {t.stickyCta}
        </PrimaryButton>
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
      url: `/${locale}/checkout/${tier.slug}`,
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
                <div className="mt-8 flex flex-col items-center gap-3">
                  <PrimaryButton href={`/${locale}/#offre`} className="px-8 py-3.5 text-base">
                    {t.heroCtaLabel}
                  </PrimaryButton>
                  <p className="text-sm text-text-muted">{t.heroCtaSub}</p>
                </div>
              </Reveal>
            </Container>
          </section>

          <div className="theme-light bg-bg">
            <TrustBar items={t.trustBar} />
          </div>

          <section className="theme-light border-y border-border bg-surface py-16 md:py-20">
            <Container className="mx-auto max-w-2xl">
              <Reveal>
                <h2 className="text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-text">
                  {t.aboutHeading}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-text-muted">{t.aboutBody1}</p>
                <p className="mt-4 text-base leading-relaxed text-text-muted">{t.aboutBody2}</p>
              </Reveal>
            </Container>
          </section>

          <section id="offre" className="theme-light bg-bg py-16 md:py-24">
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
                <p className="mt-6 text-center text-sm text-text-muted">{t.extraQuestionNote}</p>
                <p className="mx-auto mt-3 max-w-lg text-center text-sm font-medium text-text">
                  {t.guaranteeNote}
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
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {t.domains.map((item) => (
                    <div key={item.title} className="rounded-2xl border border-border bg-surface p-6">
                      <h3 className="text-base font-semibold text-text">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.description}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </Container>
          </section>

          <section className="theme-light border-t border-border bg-bg py-16 md:py-20">
            <Container className="mx-auto max-w-2xl">
              <Reveal>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-text-muted">
                  {t.guideLabel}
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {GUIDE_ARTICLES.slice(0, 4).map((item) => (
                    <Link
                      key={item.slug}
                      href={`/${locale}/guide/${item.slug}`}
                      className="group rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-white/20"
                    >
                      <p className="text-sm font-semibold leading-snug text-text">
                        {item.shortTitle[locale]}
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-text-muted">
                        {item.description[locale]}
                      </p>
                    </Link>
                  ))}
                </div>
                <Link
                  href={`/${locale}/guide`}
                  className="mt-6 inline-block text-sm font-medium text-text underline decoration-dotted underline-offset-4 hover:text-text-muted"
                >
                  {t.guideLinkLabel}
                </Link>
              </Reveal>
            </Container>
          </section>

          <section className="theme-light bg-surface py-16 md:py-24">
            <Container className="mx-auto max-w-2xl">
              <Reveal>
                <h2 className="text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-text">
                  {t.lawyerHeading}
                </h2>
                <LawyerComparison
                  className="mt-8"
                  lawyerLabel={t.lawyerLabel}
                  lawyerRange={t.lawyerRange}
                  lawyerNote={t.lawyerNote}
                  brandLabel={t.brandLabel}
                  thraxPrice={t.thraxPrice}
                  thraxNote={t.thraxNote}
                  disclaimer={t.lawyerDisclaimer}
                />
                <div className="mt-10 flex justify-center">
                  <PrimaryButton href={`/${locale}/#offre`} className="px-8 py-3.5 text-base">
                    {t.heroCtaLabel}
                  </PrimaryButton>
                </div>
              </Reveal>
            </Container>
          </section>

          <section id="contact" className="theme-light bg-bg py-16 md:py-24">
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
