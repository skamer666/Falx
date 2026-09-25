import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import FaqAccordion from "@/components/site/FaqAccordion";
import PaywallCard from "@/components/site/PaywallCard";
import Autodiagnostic from "@/components/site/Autodiagnostic";
import JsonLd from "@/components/site/JsonLd";
import { GUIDE_ARTICLES } from "@/lib/guide/articles";
import { isLocale, DEFAULT_LOCALE, type Locale } from "@/i18n/config";
import {
  Container,
  LawyerComparison,
  PrimaryButton,
  PriceBadge,
  StepList,
  TrustBar,
} from "@/components/site/ui";

type FaqItem = { q: string; a: string };
type StepItem = { title: string; description: string };
type IncludedItem = { title: string; description: string };

type HomeContent = {
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  priceBadgeLabel: string;
  diagnosticCtaLabel: string;
  diagnosticCtaSub: string;
  directBuyLabel: string;
  stickyBarLabel: string;
  trustBar: [string, string, string];
  diagnosticHeading: string;
  diagnosticSubheading: string;
  stepsHeading: string;
  steps: StepItem[];
  includedHeading: string;
  included: IncludedItem[];
  guideLabel: string;
  guideLinkLabel: string;
  offerBullets: [string, string, string];
  offerCtaLabel: string;
  offerDeliveryNote: string;
  securePaymentLabel: string;
  upsellTitle: string;
  upsellText: string;
  upsellLinkLabel: string;
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
  productDescription: string;
};

const CONTENT: Record<Locale, HomeContent> = {
  fr: {
    metaTitle: "Conformité nLPD pour PME suisses, dès 590 CHF | Thrax Legal",
    metaDescription:
      "Mettez votre PME en conformité avec la nLPD révisée : registre des traitements, politique de confidentialité, contrats de sous-traitance. Prix fixe 590 CHF, sans avocat, sans rendez-vous, livré en 3 jours ouvrables.",
    heroTitle: "Votre PME est-elle exposée aux sanctions de la nLPD ?",
    heroSubtitle:
      "La loi révisée sur la protection des données expose les PME et leurs dirigeants à des sanctions pouvant atteindre 250'000 CHF en cas de manquement grave. Mettez votre entreprise en conformité, sans avocat, sans rendez-vous.",
    priceBadgeLabel: "Pack complet, paiement unique",
    diagnosticCtaLabel: "Faire mon diagnostic gratuit",
    diagnosticCtaSub: "2 minutes · Sans email requis",
    directBuyLabel: "Je sais déjà ce qu'il me faut, acheter directement — 590 CHF",
    stickyBarLabel: "Pack Conformité nLPD",
    trustBar: [
      "Conforme à la nLPD révisée, en vigueur depuis septembre 2023.",
      "Aucun rendez-vous nécessaire : tout se passe en ligne, du diagnostic à la livraison.",
      "Chaque document est vérifié par une vraie personne avant envoi.",
    ],
    diagnosticHeading: "Diagnostic gratuit en 2 minutes",
    diagnosticSubheading:
      "Répondez à 6 questions pour connaître votre niveau de conformité nLPD et les points précis à corriger.",
    stepsHeading: "Comment ça marche",
    steps: [
      {
        title: "Diagnostic gratuit",
        description: "Répondez à 6 questions en 2 minutes pour identifier vos points de non-conformité.",
      },
      {
        title: "Commande en ligne",
        description: "590 CHF, paiement unique. Aucun appel, aucun rendez-vous nécessaire.",
      },
      {
        title: "Livraison sous 3 jours",
        description: "Vos documents sont rédigés et vérifiés par notre équipe, prêts à l'emploi.",
      },
    ],
    includedHeading: "Ce qui est inclus dans le Pack Conformité",
    included: [
      { title: "Registre des traitements", description: "Recense les données que vous traitez et pourquoi, adapté à votre activité." },
      { title: "Politique de confidentialité", description: "Pour votre site web et vos relations RH, conforme à la nLPD." },
      { title: "Contrat de sous-traitance (DPA)", description: "Modèle prêt à l'emploi pour vos prestataires (hébergeur, CRM, comptabilité)." },
      { title: "Procédure violation de données", description: "La marche à suivre en cas de fuite ou de piratage, étape par étape." },
      { title: "Checklist de mise en œuvre", description: "Pour vérifier et maintenir votre conformité dans le temps." },
    ],
    guideLabel: "Pour aller plus loin",
    guideLinkLabel: "Voir tout le guide nLPD ↗",
    offerBullets: [
      "Registre des traitements et politique de confidentialité adaptés à votre activité",
      "Modèle de contrat de sous-traitance (DPA) et procédure violation de données",
      "Vérifié par notre équipe avant envoi",
    ],
    offerCtaLabel: "Commander mon Pack Conformité",
    offerDeliveryNote: "Livré sous 3 jours ouvrables",
    securePaymentLabel: "Paiement sécurisé",
    upsellTitle: "En option : Suivi Conformité, 79 CHF/mois",
    upsellText:
      "Mises à jour légales, revue annuelle de votre registre et questions illimitées par email. Résiliable à tout moment.",
    upsellLinkLabel: "En savoir plus",
    lawyerHeading: "Le prix d'un avocat, sans l'avocat",
    lawyerLabel: "Avocat traditionnel",
    lawyerRange: "750 à 3'000 CHF",
    lawyerNote: "Pour un dossier équivalent (5 documents adaptés à votre activité), soit 3 à 5 heures facturées à 250-600 CHF/h selon la complexité.",
    brandLabel: "Thrax Legal",
    thraxPrice: "590 CHF",
    thraxNote: "Pack complet à prix fixe, livré sous 3 jours ouvrables, sans rendez-vous.",
    lawyerDisclaimer:
      "Estimation basée sur un tarif horaire usuel de 250 à 600 CHF pour un avocat en Suisse. Thrax Legal n'est pas un cabinet d'avocats et n'assure pas la représentation devant les tribunaux.",
    faqHeading: "Questions fréquentes",
    faq: [
      {
        q: "Qu'est-ce que la nLPD et pourquoi ma PME doit-elle s'y conformer ?",
        a: "La nLPD (loi révisée sur la protection des données) est en vigueur depuis le 1er septembre 2023. Elle s'applique à toute entreprise suisse qui traite des données personnelles : clients, employés, prospects. La taille de l'entreprise ne dispense pas des obligations de base (registre des traitements, information des personnes concernées, sécurité des données).",
      },
      {
        q: "Quelles sont les sanctions en cas de non-conformité ?",
        a: "La loi prévoit des amendes pouvant atteindre 250'000 CHF à l'encontre des personnes responsables, en cas de manquement grave et intentionnel (défaut d'information, violation des obligations de sous-traitance). Le diagnostic gratuit vous indique où se situent vos risques.",
      },
      {
        q: "Thrax Legal est-il un cabinet d'avocats ?",
        a: "Non. Thrax Legal n'est pas un cabinet d'avocats et n'assure pas la représentation devant les tribunaux, réservée aux avocats inscrits à un registre cantonal suisse. Nous vous fournissons des documents de mise en conformité vérifiés par notre équipe. Pour un contentieux, nous vous orientons vers un avocat.",
      },
      {
        q: "Combien de temps pour recevoir mes documents ?",
        a: "3 jours ouvrables après votre commande. Vos documents sont rédigés à partir de vos réponses, puis vérifiés par notre équipe avant envoi.",
      },
      {
        q: "Proposez-vous vos services en allemand, en anglais et en italien ?",
        a: "Oui. Le site et le Pack Conformité sont disponibles en français, en allemand, en anglais et en italien.",
      },
      {
        q: "Puis-je aussi m'abonner pour un suivi continu ?",
        a: "Oui. Le Suivi Conformité (79 CHF/mois, résiliable à tout moment) inclut les mises à jour légales, une revue annuelle de votre registre et un accès illimité à nos questions par email.",
      },
      {
        q: "Que se passe-t-il si mon entreprise est déjà partiellement conforme ?",
        a: "Le diagnostic gratuit identifie précisément ce qui manque. Vos documents sont adaptés à votre situation, sans repartir de zéro.",
      },
    ],
    productDescription:
      "Registre des traitements, politique de confidentialité, contrat de sous-traitance (DPA), procédure violation de données et checklist de mise en œuvre, pour la mise en conformité nLPD d'une PME suisse.",
  },
  de: {
    metaTitle: "DSG-Konformität für Schweizer KMU, ab 590 CHF | Thrax Legal",
    metaDescription:
      "Bringen Sie Ihr KMU in Einklang mit dem revidierten Datenschutzgesetz (DSG): Verarbeitungsverzeichnis, Datenschutzerklärung, Auftragsverarbeitungsverträge. Fixpreis 590 CHF, ohne Anwalt, ohne Termin, in 3 Arbeitstagen geliefert.",
    heroTitle: "Ist Ihr KMU den DSG-Sanktionen ausgesetzt?",
    heroSubtitle:
      "Das revidierte Datenschutzgesetz setzt KMU und ihre Verantwortlichen bei schweren Verstössen Bussen von bis zu CHF 250'000 aus. Bringen Sie Ihr Unternehmen in Einklang &mdash; ohne Anwalt, ohne Termin.",
    priceBadgeLabel: "Komplettpaket, einmalige Zahlung",
    diagnosticCtaLabel: "Gratis-Diagnose starten",
    diagnosticCtaSub: "2 Minuten · Keine E-Mail nötig",
    directBuyLabel: "Ich weiss bereits, was ich brauche — direkt kaufen für CHF 590",
    stickyBarLabel: "DSG-Compliance-Paket",
    trustBar: [
      "Konform mit dem revidierten DSG, in Kraft seit September 2023.",
      "Kein Termin nötig: alles läuft online ab, von der Diagnose bis zur Lieferung.",
      "Jedes Dokument wird vor Versand von einer echten Person geprüft.",
    ],
    diagnosticHeading: "Kostenlose Diagnose in 2 Minuten",
    diagnosticSubheading:
      "Beantworten Sie 6 Fragen, um Ihren DSG-Konformitätsgrad und die konkreten Lücken zu erfahren.",
    stepsHeading: "So funktioniert's",
    steps: [
      {
        title: "Gratis-Diagnose",
        description: "Beantworten Sie in 2 Minuten 6 Fragen, um Ihre Compliance-Lücken zu identifizieren.",
      },
      {
        title: "Online bestellen",
        description: "CHF 590, einmalige Zahlung. Kein Anruf, kein Termin nötig.",
      },
      {
        title: "Lieferung in 3 Tagen",
        description: "Ihre Dokumente werden von unserem Team erstellt, geprüft und sind sofort einsatzbereit.",
      },
    ],
    includedHeading: "Was im Compliance-Paket enthalten ist",
    included: [
      { title: "Verarbeitungsverzeichnis", description: "Erfasst die von Ihnen bearbeiteten Daten und deren Zweck, angepasst an Ihre Tätigkeit." },
      { title: "Datenschutzerklärung", description: "Für Ihre Website und Ihre HR-Prozesse, DSG-konform." },
      { title: "Auftragsverarbeitungsvertrag (AVV)", description: "Einsatzbereite Vorlage für Ihre Dienstleister (Hosting, CRM, Buchhaltung)." },
      { title: "Verfahren bei Datenschutzverletzung", description: "Schritt-für-Schritt-Anleitung bei Leck oder Hackerangriff." },
      { title: "Umsetzungs-Checkliste", description: "Zur Überprüfung und langfristigen Aufrechterhaltung Ihrer Konformität." },
    ],
    guideLabel: "Mehr erfahren",
    guideLinkLabel: "Zum ganzen DSG-Ratgeber ↗",
    offerBullets: [
      "Verarbeitungsverzeichnis und Datenschutzerklärung, angepasst an Ihre Tätigkeit",
      "Vorlage für Auftragsverarbeitungsvertrag (AVV) und Verfahren bei Datenschutzverletzung",
      "Von unserem Team vor Versand geprüft",
    ],
    offerCtaLabel: "Compliance-Paket bestellen",
    offerDeliveryNote: "Lieferung in 3 Arbeitstagen",
    securePaymentLabel: "Sichere Zahlung",
    upsellTitle: "Optional: Compliance-Abo, CHF 79/Monat",
    upsellText:
      "Gesetzliche Updates, jährliche Überprüfung Ihres Verzeichnisses und unbegrenzte Fragen per E-Mail. Jederzeit kündbar.",
    upsellLinkLabel: "Mehr erfahren",
    lawyerHeading: "Der Preis eines Anwalts, ohne den Anwalt",
    lawyerLabel: "Klassische Anwaltskanzlei",
    lawyerRange: "750 bis 3'000 CHF",
    lawyerNote: "Für ein vergleichbares Dossier (5 auf Ihre Tätigkeit angepasste Dokumente), also 3 bis 5 verrechnete Stunden zu CHF 250-600/h je nach Komplexität.",
    brandLabel: "Thrax Legal",
    thraxPrice: "CHF 590",
    thraxNote: "Komplettpaket zum Fixpreis, Lieferung in 3 Arbeitstagen, ohne Termin.",
    lawyerDisclaimer:
      "Schätzung basierend auf einem üblichen Stundensatz von CHF 250 bis 600 für einen Anwalt in der Schweiz. Thrax Legal ist keine Anwaltskanzlei und übernimmt keine Vertretung vor Gericht.",
    faqHeading: "Häufige Fragen",
    faq: [
      {
        q: "Was ist das DSG und warum muss mein KMU es einhalten?",
        a: "Das revidierte Datenschutzgesetz (DSG) ist seit dem 1. September 2023 in Kraft. Es gilt für jedes Schweizer Unternehmen, das Personendaten bearbeitet: Kunden, Mitarbeitende, Interessenten. Die Unternehmensgrösse befreit nicht von den Grundpflichten (Verarbeitungsverzeichnis, Information der betroffenen Personen, Datensicherheit).",
      },
      {
        q: "Welche Sanktionen drohen bei Nichteinhaltung?",
        a: "Das Gesetz sieht Bussen von bis zu CHF 250'000 gegen die verantwortlichen Personen vor, bei schweren und vorsätzlichen Verstössen (fehlende Information, Verletzung der Pflichten zur Auftragsbearbeitung). Die kostenlose Diagnose zeigt Ihnen, wo Ihre Risiken liegen.",
      },
      {
        q: "Ist Thrax Legal eine Anwaltskanzlei?",
        a: "Nein. Thrax Legal ist keine Anwaltskanzlei und übernimmt keine Vertretung vor Gericht, die ausschliesslich im kantonalen Anwaltsregister eingetragenen Anwältinnen und Anwälten vorbehalten ist. Wir liefern Ihnen von unserem Team geprüfte Compliance-Dokumente. Bei einem Rechtsstreit verweisen wir Sie an eine Anwältin oder einen Anwalt.",
      },
      {
        q: "Wie lange dauert es, bis ich meine Dokumente erhalte?",
        a: "3 Arbeitstage nach Ihrer Bestellung. Ihre Dokumente werden anhand Ihrer Antworten erstellt und vor Versand von unserem Team geprüft.",
      },
      {
        q: "Bieten Sie Ihre Leistungen auch auf Französisch, Englisch und Italienisch an?",
        a: "Ja. Die Website und das Compliance-Paket sind auf Französisch, Deutsch, Englisch und Italienisch verfügbar.",
      },
      {
        q: "Kann ich mich auch für eine laufende Betreuung abonnieren?",
        a: "Ja. Das Compliance-Abo (CHF 79/Monat, jederzeit kündbar) umfasst gesetzliche Updates, eine jährliche Überprüfung Ihres Verzeichnisses und unbegrenzten Zugang zu unseren Antworten per E-Mail.",
      },
      {
        q: "Was passiert, wenn mein Unternehmen bereits teilweise konform ist?",
        a: "Die kostenlose Diagnose identifiziert genau, was fehlt. Ihre Dokumente werden an Ihre Situation angepasst, ohne bei null zu beginnen.",
      },
    ],
    productDescription:
      "Verarbeitungsverzeichnis, Datenschutzerklärung, Auftragsverarbeitungsvertrag (AVV), Verfahren bei Datenschutzverletzung und Umsetzungs-Checkliste, für die DSG-Konformität eines Schweizer KMU.",
  },
  en: {
    metaTitle: "Swiss FADP compliance for SMEs, from CHF 590 | Thrax Legal",
    metaDescription:
      "Bring your SME into compliance with the revised Swiss FADP: records of processing, privacy policy, data processing agreements. Fixed price CHF 590, no lawyer, no appointment, delivered in 3 business days.",
    heroTitle: "Is your SME exposed to FADP penalties?",
    heroSubtitle:
      "The revised Swiss data protection law exposes SMEs and their leaders to fines of up to CHF 250,000 for serious breaches. Bring your company into compliance, no lawyer, no appointment.",
    priceBadgeLabel: "Full pack, one-time payment",
    diagnosticCtaLabel: "Start my free diagnostic",
    diagnosticCtaSub: "2 minutes · No email required",
    directBuyLabel: "I already know what I need, buy directly — CHF 590",
    stickyBarLabel: "FADP Compliance Pack",
    trustBar: [
      "Compliant with the revised FADP, in force since September 2023.",
      "No appointment needed: everything happens online, from diagnostic to delivery.",
      "Every document is checked by a real person before it's sent.",
    ],
    diagnosticHeading: "Free 2-minute diagnostic",
    diagnosticSubheading:
      "Answer 6 questions to find out your FADP compliance level and the exact points to fix.",
    stepsHeading: "How it works",
    steps: [
      {
        title: "Free diagnostic",
        description: "Answer 6 questions in 2 minutes to identify your compliance gaps.",
      },
      {
        title: "Order online",
        description: "CHF 590, one-time payment. No call, no appointment needed.",
      },
      {
        title: "Delivered in 3 days",
        description: "Your documents are drafted and checked by our team, ready to use.",
      },
    ],
    includedHeading: "What's included in the Compliance Pack",
    included: [
      { title: "Record of processing activities", description: "Lists the data you process and why, tailored to your business." },
      { title: "Privacy policy", description: "For your website and your HR practices, FADP-compliant." },
      { title: "Data processing agreement (DPA)", description: "Ready-to-use template for your vendors (hosting, CRM, accounting)." },
      { title: "Data breach procedure", description: "The step-by-step process to follow in case of a leak or hack." },
      { title: "Implementation checklist", description: "To check and maintain your compliance over time." },
    ],
    guideLabel: "Go further",
    guideLinkLabel: "See the full FADP guide ↗",
    offerBullets: [
      "Record of processing activities and privacy policy tailored to your business",
      "Data processing agreement (DPA) template and data breach procedure",
      "Checked by our team before delivery",
    ],
    offerCtaLabel: "Order my Compliance Pack",
    offerDeliveryNote: "Delivered in 3 business days",
    securePaymentLabel: "Secure payment",
    upsellTitle: "Optional: Ongoing Compliance, CHF 79/month",
    upsellText:
      "Legal updates, an annual review of your record, and unlimited questions by email. Cancel anytime.",
    upsellLinkLabel: "Learn more",
    lawyerHeading: "The price of a lawyer, without the lawyer",
    lawyerLabel: "Traditional law firm",
    lawyerRange: "CHF 750 to 3,000",
    lawyerNote: "For an equivalent file (5 documents tailored to your business), i.e. 3 to 5 hours billed at CHF 250-600/h depending on complexity.",
    brandLabel: "Thrax Legal",
    thraxPrice: "CHF 590",
    thraxNote: "Full pack at a fixed price, delivered in 3 business days, no appointment.",
    lawyerDisclaimer:
      "Estimate based on a typical hourly rate of CHF 250 to 600 for a lawyer in Switzerland. Thrax Legal is not a law firm and does not represent clients before courts.",
    faqHeading: "Frequently asked questions",
    faq: [
      {
        q: "What is the Swiss FADP and why does my SME need to comply?",
        a: "The revised Federal Act on Data Protection (FADP) has been in force since September 1, 2023. It applies to any Swiss company that processes personal data: customers, employees, prospects. Company size does not exempt you from the basic obligations (record of processing, informing data subjects, data security).",
      },
      {
        q: "What are the penalties for non-compliance?",
        a: "The law provides for fines of up to CHF 250,000 against responsible individuals, for serious and intentional breaches (failure to inform, violation of data processing agreement obligations). The free diagnostic shows you where your risks lie.",
      },
      {
        q: "Is Thrax Legal a law firm?",
        a: "No. Thrax Legal is not a law firm and does not represent clients before courts, which is reserved to attorneys registered with a Swiss cantonal bar. We provide compliance documents checked by our team. For contentious matters, we refer you to an attorney.",
      },
      {
        q: "How long until I receive my documents?",
        a: "3 business days after your order. Your documents are drafted from your answers, then checked by our team before delivery.",
      },
      {
        q: "Do you offer your services in French, German and Italian too?",
        a: "Yes. The site and the Compliance Pack are available in French, German, English and Italian.",
      },
      {
        q: "Can I also subscribe for ongoing monitoring?",
        a: "Yes. Ongoing Compliance (CHF 79/month, cancel anytime) includes legal updates, an annual review of your record, and unlimited email questions.",
      },
      {
        q: "What if my company is already partly compliant?",
        a: "The free diagnostic identifies exactly what's missing. Your documents are tailored to your situation, without starting from scratch.",
      },
    ],
    productDescription:
      "Record of processing activities, privacy policy, data processing agreement (DPA), data breach procedure and implementation checklist, for Swiss FADP compliance of an SME.",
  },
  it: {
    metaTitle: "Conformità nLPD per PMI svizzere, da CHF 590 | Thrax Legal",
    metaDescription:
      "Mettete la vostra PMI in conformità con la nLPD revisionata: registro dei trattamenti, informativa sulla privacy, contratti di sub-trattamento. Prezzo fisso CHF 590, senza avvocato, senza appuntamento, consegnato in 3 giorni lavorativi.",
    heroTitle: "La vostra PMI è esposta alle sanzioni della nLPD?",
    heroSubtitle:
      "La legge revisionata sulla protezione dei dati espone le PMI e i loro dirigenti a sanzioni fino a CHF 250'000 in caso di violazione grave. Mettete la vostra azienda in conformità, senza avvocato, senza appuntamento.",
    priceBadgeLabel: "Pack completo, pagamento unico",
    diagnosticCtaLabel: "Fare la mia diagnosi gratuita",
    diagnosticCtaSub: "2 minuti · Nessuna email richiesta",
    directBuyLabel: "So già cosa mi serve, acquistare direttamente — CHF 590",
    stickyBarLabel: "Pack Conformità nLPD",
    trustBar: [
      "Conforme alla nLPD revisionata, in vigore da settembre 2023.",
      "Nessun appuntamento necessario: tutto avviene online, dalla diagnosi alla consegna.",
      "Ogni documento è verificato da una persona reale prima dell'invio.",
    ],
    diagnosticHeading: "Diagnosi gratuita in 2 minuti",
    diagnosticSubheading:
      "Rispondete a 6 domande per conoscere il vostro livello di conformità nLPD e i punti precisi da correggere.",
    stepsHeading: "Come funziona",
    steps: [
      {
        title: "Diagnosi gratuita",
        description: "Rispondete a 6 domande in 2 minuti per identificare i vostri punti di non conformità.",
      },
      {
        title: "Ordine online",
        description: "CHF 590, pagamento unico. Nessuna chiamata, nessun appuntamento necessario.",
      },
      {
        title: "Consegna in 3 giorni",
        description: "I vostri documenti sono redatti e verificati dal nostro team, pronti all'uso.",
      },
    ],
    includedHeading: "Cosa è incluso nel Pack Conformità",
    included: [
      { title: "Registro dei trattamenti", description: "Elenca i dati che trattate e perché, adattato alla vostra attività." },
      { title: "Informativa sulla privacy", description: "Per il vostro sito web e la gestione HR, conforme alla nLPD." },
      { title: "Contratto di sub-trattamento (DPA)", description: "Modello pronto all'uso per i vostri fornitori (hosting, CRM, contabilità)." },
      { title: "Procedura violazione dei dati", description: "La procedura da seguire in caso di fuga o attacco informatico, passo dopo passo." },
      { title: "Checklist di attuazione", description: "Per verificare e mantenere la vostra conformità nel tempo." },
    ],
    guideLabel: "Per saperne di più",
    guideLinkLabel: "Vedi tutta la guida nLPD ↗",
    offerBullets: [
      "Registro dei trattamenti e informativa sulla privacy adattati alla vostra attività",
      "Modello di contratto di sub-trattamento (DPA) e procedura violazione dei dati",
      "Verificato dal nostro team prima dell'invio",
    ],
    offerCtaLabel: "Ordinare il mio Pack Conformità",
    offerDeliveryNote: "Consegnato in 3 giorni lavorativi",
    securePaymentLabel: "Pagamento sicuro",
    upsellTitle: "In opzione: Abbonamento Conformità, CHF 79/mese",
    upsellText:
      "Aggiornamenti legali, revisione annuale del vostro registro e domande illimitate via email. Disdicibile in qualsiasi momento.",
    upsellLinkLabel: "Saperne di più",
    lawyerHeading: "Il prezzo di un avvocato, senza l'avvocato",
    lawyerLabel: "Avvocato tradizionale",
    lawyerRange: "da CHF 750 a 3'000",
    lawyerNote: "Per un dossier equivalente (5 documenti adattati alla vostra attività), ovvero 3-5 ore fatturate a CHF 250-600/h secondo la complessità.",
    brandLabel: "Thrax Legal",
    thraxPrice: "CHF 590",
    thraxNote: "Pack completo a prezzo fisso, consegnato in 3 giorni lavorativi, senza appuntamento.",
    lawyerDisclaimer:
      "Stima basata su una tariffa oraria usuale di CHF 250-600 per un avvocato in Svizzera. Thrax Legal non è uno studio legale e non garantisce la rappresentanza davanti ai tribunali.",
    faqHeading: "Domande frequenti",
    faq: [
      {
        q: "Cos'è la nLPD e perché la mia PMI deve conformarsi?",
        a: "La nLPD (legge revisionata sulla protezione dei dati) è in vigore dal 1° settembre 2023. Si applica a qualsiasi azienda svizzera che tratta dati personali: clienti, dipendenti, prospect. La dimensione dell'azienda non esonera dagli obblighi di base (registro dei trattamenti, informazione degli interessati, sicurezza dei dati).",
      },
      {
        q: "Quali sono le sanzioni in caso di non conformità?",
        a: "La legge prevede multe fino a CHF 250'000 a carico delle persone responsabili, in caso di violazione grave e intenzionale (mancata informazione, violazione degli obblighi di sub-trattamento). La diagnosi gratuita vi indica dove si situano i vostri rischi.",
      },
      {
        q: "Thrax Legal è uno studio legale?",
        a: "No. Thrax Legal non è uno studio legale e non garantisce la rappresentanza davanti ai tribunali, riservata agli avvocati iscritti a un albo cantonale svizzero. Vi forniamo documenti di conformità verificati dal nostro team. Per un contenzioso, vi indirizziamo verso un avvocato.",
      },
      {
        q: "Quanto tempo ci vuole per ricevere i miei documenti?",
        a: "3 giorni lavorativi dopo il vostro ordine. I vostri documenti sono redatti a partire dalle vostre risposte, poi verificati dal nostro team prima dell'invio.",
      },
      {
        q: "Offrite i vostri servizi anche in francese, tedesco e inglese?",
        a: "Sì. Il sito e il Pack Conformità sono disponibili in francese, tedesco, inglese e italiano.",
      },
      {
        q: "Posso anche abbonarmi per un monitoraggio continuo?",
        a: "Sì. L'Abbonamento Conformità (CHF 79/mese, disdicibile in qualsiasi momento) include gli aggiornamenti legali, una revisione annuale del vostro registro e un accesso illimitato alle nostre risposte via email.",
      },
      {
        q: "Cosa succede se la mia azienda è già parzialmente conforme?",
        a: "La diagnosi gratuita identifica precisamente cosa manca. I vostri documenti sono adattati alla vostra situazione, senza ripartire da zero.",
      },
    ],
    productDescription:
      "Registro dei trattamenti, informativa sulla privacy, contratto di sub-trattamento (DPA), procedura violazione dei dati e checklist di attuazione, per la conformità nLPD di una PMI svizzera.",
  },
};

const CHECKOUT_SLUG = "checkout/pack-conformite-nlpd";

function DiagnosticCta({
  locale,
  t,
  className = "",
}: {
  locale: Locale;
  t: HomeContent;
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center gap-3 text-center ${className}`}>
      <PrimaryButton href={`/${locale}/#diagnostic`} className="px-8 py-3.5 text-base">
        {t.diagnosticCtaLabel}
      </PrimaryButton>
      <p className="text-sm text-text-muted">{t.diagnosticCtaSub}</p>
      <Link
        href={`/${locale}/${CHECKOUT_SLUG}`}
        className="mt-1 text-sm text-text-muted underline decoration-dotted underline-offset-4 hover:text-text"
      >
        {t.directBuyLabel}
      </Link>
    </div>
  );
}

function StickyOrderBar({ locale, t }: { locale: Locale; t: HomeContent }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/95 backdrop-blur">
      <Container className="flex items-center justify-between gap-4 py-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold leading-tight text-text">590 CHF</p>
          <p className="truncate text-xs text-text-muted">{t.stickyBarLabel}</p>
        </div>
        <PrimaryButton href={`/${locale}/#diagnostic`} className="shrink-0 px-5 py-2.5 text-sm">
          {t.diagnosticCtaLabel}
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
  const checkoutHref = `/${locale}/${CHECKOUT_SLUG}`;

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
    name: t.stickyBarLabel,
    description: t.productDescription,
    brand: { "@type": "Brand", name: "Thrax Legal" },
    offers: {
      "@type": "Offer",
      price: "590",
      priceCurrency: "CHF",
      availability: "https://schema.org/InStock",
      url: checkoutHref,
    },
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
                <PriceBadge amount="590 CHF" label={t.priceBadgeLabel} className="mt-8" />
                <DiagnosticCta locale={locale} t={t} className="mt-6" />
              </Reveal>
            </Container>
          </section>

          <div className="theme-light bg-bg">
            <TrustBar items={t.trustBar} />
          </div>

          <section id="diagnostic" className="theme-light bg-bg py-16 md:py-24">
            <Container className="mx-auto max-w-2xl">
              <Reveal>
                <h2 className="text-center text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-text">
                  {t.diagnosticHeading}
                </h2>
                <p className="mx-auto mt-3 max-w-lg text-center text-base leading-relaxed text-text-muted">
                  {t.diagnosticSubheading}
                </p>
                <Autodiagnostic checkoutHref={checkoutHref} locale={locale} className="mt-8" />
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
                  {t.includedHeading}
                </h2>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {t.included.map((item) => (
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

          <section id="offre" className="theme-light bg-surface py-16 md:py-24">
            <Container className="mx-auto max-w-2xl">
              <Reveal>
                <PaywallCard
                  price="590 CHF"
                  checkoutHref={checkoutHref}
                  ctaLabel={t.offerCtaLabel}
                  deliveryNote={t.offerDeliveryNote}
                  guaranteeNote=""
                  securePaymentLabel={t.securePaymentLabel}
                  bullets={t.offerBullets}
                />
                <div className="mt-3 rounded-2xl border border-dashed border-border p-5">
                  <p className="text-base font-semibold text-text">{t.upsellTitle}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-text-muted">
                    {t.upsellText}{" "}
                    <Link
                      href={`/${locale}/suivi-conformite`}
                      className="text-text underline decoration-dotted underline-offset-4 hover:text-text-muted"
                    >
                      {t.upsellLinkLabel}
                    </Link>
                    .
                  </p>
                </div>
              </Reveal>
            </Container>
          </section>

          <section className="theme-light bg-bg py-16 md:py-24">
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
                <DiagnosticCta locale={locale} t={t} className="mt-10" />
              </Reveal>
            </Container>
          </section>

          <section id="contact" className="theme-light bg-surface py-16 md:py-24">
            <Container className="mx-auto max-w-2xl">
              <Reveal>
                <h2 className="text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-text">
                  {t.faqHeading}
                </h2>
                <FaqAccordion items={t.faq} className="mt-8" />
                <DiagnosticCta locale={locale} t={t} className="mt-12" />
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
