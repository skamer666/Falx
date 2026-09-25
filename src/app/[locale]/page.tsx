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
    metaTitle: "Contester une amende en Suisse, dès 89 CHF | Thrax Legal",
    metaDescription:
      "Vérifiez gratuitement vos chances de contester une amende suisse (stationnement, excès de vitesse, CFF), puis recevez votre lettre de contestation prête à envoyer. 89 CHF, sans avocat, sans rendez-vous, livré sous 48h.",
    heroTitle: "Amende reçue ? Vérifiez si vous pouvez la contester, en 2 minutes.",
    heroSubtitle:
      "Stationnement, excès de vitesse, transports publics : payer une amende vaut acceptation définitive. Avant de payer, vérifiez gratuitement vos chances de contestation — sans avocat, sans rendez-vous.",
    priceBadgeLabel: "Pack complet, paiement unique",
    diagnosticCtaLabel: "Faire mon diagnostic gratuit",
    diagnosticCtaSub: "2 minutes · Sans email requis",
    directBuyLabel: "Je sais déjà ce qu'il me faut, acheter directement — 89 CHF",
    stickyBarLabel: "Pack Contestation",
    trustBar: [
      "Diagnostic gratuit en 2 minutes, avant de payer quoi que ce soit.",
      "Aucun rendez-vous nécessaire : tout se passe en ligne.",
      "Chaque lettre de contestation est vérifiée par une vraie personne avant envoi.",
    ],
    diagnosticHeading: "Diagnostic gratuit en 2 minutes",
    diagnosticSubheading:
      "Répondez à quelques questions pour connaître vos chances de contestation avant de vous engager.",
    stepsHeading: "Comment ça marche",
    steps: [
      { title: "Diagnostic gratuit", description: "Répondez à 4 questions en 2 minutes pour connaître vos chances de contestation." },
      { title: "Commande en ligne", description: "89 CHF, paiement unique. Aucun appel, aucun rendez-vous nécessaire." },
      { title: "Livraison sous 48h", description: "Votre lettre de contestation est rédigée et vérifiée par notre équipe, prête à envoyer." },
    ],
    includedHeading: "Ce qui est inclus dans le Pack Contestation",
    included: [
      { title: "Analyse de vos chances", description: "Basée sur les faits précis de votre dossier, pas une réponse générique." },
      { title: "Lettre de contestation prête à envoyer", description: "Rédigée selon la procédure applicable à votre situation." },
      { title: "Autorité et délai exacts", description: "Les bonnes coordonnées et le bon délai, pour ne rien rater." },
      { title: "Vérifiée par notre équipe", description: "Une vraie personne relit votre dossier avant l'envoi." },
    ],
    guideLabel: "Pour aller plus loin",
    guideLinkLabel: "Voir tout le guide ↗",
    offerBullets: [
      "Analyse de vos chances basée sur les faits de votre dossier",
      "Lettre de contestation rédigée et prête à envoyer, avec la bonne autorité et le bon délai",
      "Vérifiée par notre équipe avant envoi",
    ],
    offerCtaLabel: "Commander mon Pack Contestation",
    offerDeliveryNote: "Livré sous 48h",
    securePaymentLabel: "Paiement sécurisé",
    lawyerHeading: "Le prix d'un avocat, sans l'avocat",
    lawyerLabel: "Avocat traditionnel",
    lawyerRange: "300 à 1'200 CHF",
    lawyerNote: "Pour une lettre de contestation équivalente, soit 1 à 2 heures facturées à 250-600 CHF/h selon la complexité.",
    brandLabel: "Thrax Legal",
    thraxPrice: "89 CHF",
    thraxNote: "Pack complet à prix fixe, livré sous 48h, sans rendez-vous.",
    lawyerDisclaimer:
      "Estimation basée sur un tarif horaire usuel de 250 à 600 CHF pour un avocat en Suisse. Thrax Legal n'est pas un cabinet d'avocats et n'assure pas la représentation devant les tribunaux.",
    faqHeading: "Questions fréquentes",
    faq: [
      {
        q: "Combien de temps ai-je pour contester une amende ?",
        a: "Cela dépend du type de document reçu : 30 jours pour une amende d'ordre (au-delà, elle est considérée comme acceptée si non payée mais transmise en procédure pénale), 10 jours pour faire opposition à une ordonnance pénale. Notre diagnostic gratuit identifie votre situation précise.",
      },
      {
        q: "Ai-je de bonnes chances de gagner ?",
        a: "Ça dépend entièrement de votre dossier. Une contestation sans motif concret (juste ne pas être d'accord) échoue presque toujours. Une erreur d'identification, un défaut de signalisation ou un vice de procédure a de vraies chances. Le diagnostic gratuit vous donne une évaluation honnête avant d'aller plus loin.",
      },
      {
        q: "Thrax Legal est-il un cabinet d'avocats ?",
        a: "Non. Thrax Legal n'est pas un cabinet d'avocats et n'assure pas la représentation devant les tribunaux, réservée aux avocats inscrits à un registre cantonal suisse. Pour les dossiers graves (retrait de permis important, risque de peine privative de liberté), nous vous orientons vers un avocat spécialisé plutôt que de vous vendre un service inadapté.",
      },
      {
        q: "Combien de temps pour recevoir ma lettre de contestation ?",
        a: "48 heures après votre commande. Votre lettre est rédigée à partir de votre dossier, puis vérifiée par notre équipe avant envoi.",
      },
      {
        q: "Que se passe-t-il si j'ai déjà payé l'amende ?",
        a: "Payer une amende vaut acceptation définitive : il n'existe alors plus aucun recours. Notre diagnostic gratuit vous le signale immédiatement si c'est votre cas, pour vous éviter de perdre du temps.",
      },
      {
        q: "Proposez-vous vos services en allemand, anglais et italien ?",
        a: "Oui. Le site et le Pack Contestation sont disponibles en français, en allemand, en anglais et en italien.",
      },
      {
        q: "Et si mon dossier concerne un retrait de permis important ou une infraction grave ?",
        a: "Notre service est pensé pour les amendes et contestations courantes. Pour les cas plus lourds, nous vous orientons vers un avocat spécialisé en droit de la circulation.",
      },
    ],
    productDescription:
      "Analyse de vos chances de contestation et lettre de contestation prête à envoyer, adaptée à votre amende (stationnement, excès de vitesse, transports publics).",
  },
  de: {
    metaTitle: "Busse in der Schweiz anfechten, ab CHF 89 | Thrax Legal",
    metaDescription:
      "Prüfen Sie kostenlos Ihre Chancen, eine Schweizer Busse anzufechten (Parkieren, Geschwindigkeit, SBB), und erhalten Sie Ihr versandbereites Einspracheschreiben. CHF 89, ohne Anwalt, ohne Termin, Lieferung innert 48h.",
    heroTitle: "Busse erhalten? Prüfen Sie in 2 Minuten, ob Sie sie anfechten können.",
    heroSubtitle:
      "Parkieren, Geschwindigkeit, öffentlicher Verkehr: Eine Busse zu bezahlen gilt als endgültige Anerkennung. Prüfen Sie vor der Zahlung kostenlos Ihre Chancen — ohne Anwalt, ohne Termin.",
    priceBadgeLabel: "Komplettpaket, einmalige Zahlung",
    diagnosticCtaLabel: "Gratis-Diagnose starten",
    diagnosticCtaSub: "2 Minuten · Keine E-Mail nötig",
    directBuyLabel: "Ich weiss bereits, was ich brauche — direkt kaufen für CHF 89",
    stickyBarLabel: "Anfechtungspaket",
    trustBar: [
      "Kostenlose Diagnose in 2 Minuten, bevor Sie irgendetwas bezahlen.",
      "Kein Termin nötig: alles läuft online ab.",
      "Jedes Einspracheschreiben wird vor Versand von einer echten Person geprüft.",
    ],
    diagnosticHeading: "Kostenlose Diagnose in 2 Minuten",
    diagnosticSubheading:
      "Beantworten Sie ein paar Fragen, um Ihre Anfechtungschancen zu kennen, bevor Sie sich verpflichten.",
    stepsHeading: "So funktioniert's",
    steps: [
      { title: "Gratis-Diagnose", description: "Beantworten Sie in 2 Minuten 4 Fragen, um Ihre Chancen zu kennen." },
      { title: "Online bestellen", description: "CHF 89, einmalige Zahlung. Kein Anruf, kein Termin nötig." },
      { title: "Lieferung innert 48h", description: "Ihr Einspracheschreiben wird von unserem Team erstellt und geprüft, versandbereit." },
    ],
    includedHeading: "Was im Anfechtungspaket enthalten ist",
    included: [
      { title: "Analyse Ihrer Chancen", description: "Basierend auf den genauen Fakten Ihres Falls, keine generische Antwort." },
      { title: "Versandbereites Einspracheschreiben", description: "Verfasst nach dem für Ihre Situation geltenden Verfahren." },
      { title: "Exakte Behörde und Frist", description: "Die richtigen Kontaktdaten und die richtige Frist, damit nichts verpasst wird." },
      { title: "Von unserem Team geprüft", description: "Eine echte Person prüft Ihren Fall vor dem Versand." },
    ],
    guideLabel: "Mehr erfahren",
    guideLinkLabel: "Zum ganzen Ratgeber ↗",
    offerBullets: [
      "Analyse Ihrer Chancen basierend auf den Fakten Ihres Falls",
      "Versandbereites Einspracheschreiben mit der richtigen Behörde und Frist",
      "Von unserem Team vor Versand geprüft",
    ],
    offerCtaLabel: "Anfechtungspaket bestellen",
    offerDeliveryNote: "Lieferung innert 48h",
    securePaymentLabel: "Sichere Zahlung",
    lawyerHeading: "Der Preis eines Anwalts, ohne den Anwalt",
    lawyerLabel: "Klassische Anwaltskanzlei",
    lawyerRange: "300 bis 1'200 CHF",
    lawyerNote: "Für ein vergleichbares Einspracheschreiben, also 1 bis 2 verrechnete Stunden zu CHF 250-600/h je nach Komplexität.",
    brandLabel: "Thrax Legal",
    thraxPrice: "CHF 89",
    thraxNote: "Komplettpaket zum Fixpreis, Lieferung innert 48h, ohne Termin.",
    lawyerDisclaimer:
      "Schätzung basierend auf einem üblichen Stundensatz von CHF 250 bis 600 für einen Anwalt in der Schweiz. Thrax Legal ist keine Anwaltskanzlei und übernimmt keine Vertretung vor Gericht.",
    faqHeading: "Häufige Fragen",
    faq: [
      {
        q: "Wie viel Zeit habe ich, um eine Busse anzufechten?",
        a: "Das hängt vom erhaltenen Dokument ab: 30 Tage bei einer Ordnungsbusse (danach gilt sie bei Nichtzahlung als ins Strafverfahren übergegangen), 10 Tage für eine Einsprache gegen einen Strafbefehl. Unsere kostenlose Diagnose identifiziert Ihre genaue Situation.",
      },
      {
        q: "Habe ich gute Chancen zu gewinnen?",
        a: "Das hängt ganz von Ihrem Fall ab. Eine Anfechtung ohne konkreten Grund (nur weil Sie nicht einverstanden sind) scheitert fast immer. Ein Identifikationsfehler, ein Signalisationsmangel oder ein Verfahrensfehler hat echte Chancen. Die kostenlose Diagnose gibt Ihnen eine ehrliche Einschätzung, bevor Sie weitergehen.",
      },
      {
        q: "Ist Thrax Legal eine Anwaltskanzlei?",
        a: "Nein. Thrax Legal ist keine Anwaltskanzlei und übernimmt keine Vertretung vor Gericht, die ausschliesslich im kantonalen Anwaltsregister eingetragenen Anwältinnen und Anwälten vorbehalten ist. Bei schweren Fällen (erheblicher Führerausweisentzug, Risiko einer Freiheitsstrafe) verweisen wir Sie an eine spezialisierte Anwältin oder einen Anwalt, statt Ihnen eine unpassende Leistung zu verkaufen.",
      },
      {
        q: "Wie lange dauert es, bis ich mein Einspracheschreiben erhalte?",
        a: "48 Stunden nach Ihrer Bestellung. Ihr Schreiben wird anhand Ihres Falls erstellt und vor Versand von unserem Team geprüft.",
      },
      {
        q: "Was passiert, wenn ich die Busse bereits bezahlt habe?",
        a: "Das Bezahlen einer Busse gilt als endgültige Anerkennung: Danach gibt es keinen Rechtsweg mehr. Unsere kostenlose Diagnose weist Sie sofort darauf hin, falls das bei Ihnen der Fall ist, damit Sie keine Zeit verlieren.",
      },
      {
        q: "Bieten Sie Ihre Leistungen auch auf Französisch, Englisch und Italienisch an?",
        a: "Ja. Die Website und das Anfechtungspaket sind auf Französisch, Deutsch, Englisch und Italienisch verfügbar.",
      },
      {
        q: "Was, wenn es um einen erheblichen Führerausweisentzug oder einen schweren Verstoss geht?",
        a: "Unser Service ist für gängige Bussen und Einsprachen gedacht. Bei schwereren Fällen verweisen wir Sie an eine auf Verkehrsrecht spezialisierte Anwältin oder einen Anwalt.",
      },
    ],
    productDescription:
      "Analyse Ihrer Anfechtungschancen und versandbereites Einspracheschreiben, angepasst an Ihre Busse (Parkieren, Geschwindigkeit, öffentlicher Verkehr).",
  },
  en: {
    metaTitle: "Contest a fine in Switzerland, from CHF 89 | Thrax Legal",
    metaDescription:
      "Check for free your chances of contesting a Swiss fine (parking, speeding, SBB/CFF), then get your ready-to-send objection letter. CHF 89, no lawyer, no appointment, delivered within 48h.",
    heroTitle: "Got a fine? Check in 2 minutes if you can contest it.",
    heroSubtitle:
      "Parking, speeding, public transport: paying a fine counts as final acceptance. Before you pay, check your chances of contesting it for free — no lawyer, no appointment.",
    priceBadgeLabel: "Full pack, one-time payment",
    diagnosticCtaLabel: "Start my free diagnostic",
    diagnosticCtaSub: "2 minutes · No email required",
    directBuyLabel: "I already know what I need, buy directly — CHF 89",
    stickyBarLabel: "Contestation Pack",
    trustBar: [
      "Free 2-minute diagnostic, before you pay anything.",
      "No appointment needed: everything happens online.",
      "Every objection letter is checked by a real person before it's sent.",
    ],
    diagnosticHeading: "Free 2-minute diagnostic",
    diagnosticSubheading:
      "Answer a few questions to find out your chances of contesting before committing to anything.",
    stepsHeading: "How it works",
    steps: [
      { title: "Free diagnostic", description: "Answer 4 questions in 2 minutes to know your chances." },
      { title: "Order online", description: "CHF 89, one-time payment. No call, no appointment needed." },
      { title: "Delivered within 48h", description: "Your objection letter is drafted and checked by our team, ready to send." },
    ],
    includedHeading: "What's included in the Contestation Pack",
    included: [
      { title: "Assessment of your chances", description: "Based on the precise facts of your case, not a generic answer." },
      { title: "Ready-to-send objection letter", description: "Drafted according to the procedure that applies to your situation." },
      { title: "The right authority and deadline", description: "The correct contact details and deadline, so nothing is missed." },
      { title: "Checked by our team", description: "A real person reviews your case before it's sent." },
    ],
    guideLabel: "Go further",
    guideLinkLabel: "See the full guide ↗",
    offerBullets: [
      "Assessment of your chances based on the facts of your case",
      "Objection letter drafted and ready to send, with the right authority and deadline",
      "Checked by our team before delivery",
    ],
    offerCtaLabel: "Order my Contestation Pack",
    offerDeliveryNote: "Delivered within 48h",
    securePaymentLabel: "Secure payment",
    lawyerHeading: "The price of a lawyer, without the lawyer",
    lawyerLabel: "Traditional law firm",
    lawyerRange: "CHF 300 to 1,200",
    lawyerNote: "For an equivalent objection letter, i.e. 1 to 2 hours billed at CHF 250-600/h depending on complexity.",
    brandLabel: "Thrax Legal",
    thraxPrice: "CHF 89",
    thraxNote: "Full pack at a fixed price, delivered within 48h, no appointment.",
    lawyerDisclaimer:
      "Estimate based on a typical hourly rate of CHF 250 to 600 for a lawyer in Switzerland. Thrax Legal is not a law firm and does not represent clients before courts.",
    faqHeading: "Frequently asked questions",
    faq: [
      {
        q: "How much time do I have to contest a fine?",
        a: "It depends on the document you received: 30 days for a fixed penalty notice (if unpaid, it then moves to criminal proceedings), 10 days to object to a penal order. Our free diagnostic identifies your exact situation.",
      },
      {
        q: "Do I have good chances of winning?",
        a: "It entirely depends on your case. An objection with no concrete ground (just disagreeing) almost always fails. An identification error, a signage defect, or a procedural flaw has real chances. The free diagnostic gives you an honest assessment before you go further.",
      },
      {
        q: "Is Thrax Legal a law firm?",
        a: "No. Thrax Legal is not a law firm and does not represent clients before courts, which is reserved to attorneys registered with a Swiss cantonal bar. For serious cases (significant licence suspension, risk of a custodial sentence), we refer you to a specialised lawyer rather than sell you an unsuitable service.",
      },
      {
        q: "How long until I receive my objection letter?",
        a: "48 hours after your order. Your letter is drafted from your case, then checked by our team before delivery.",
      },
      {
        q: "What happens if I've already paid the fine?",
        a: "Paying a fine counts as final acceptance: there is no recourse left afterwards. Our free diagnostic flags this immediately if that's your case, so you don't waste time.",
      },
      {
        q: "Do you offer your services in French, German and Italian too?",
        a: "Yes. The site and the Contestation Pack are available in French, German, English and Italian.",
      },
      {
        q: "What if my case involves a significant licence suspension or a serious offence?",
        a: "Our service is designed for common fines and objections. For heavier cases, we refer you to a lawyer specialised in road traffic law.",
      },
    ],
    productDescription:
      "Assessment of your chances of contesting and a ready-to-send objection letter, tailored to your fine (parking, speeding, public transport).",
  },
  it: {
    metaTitle: "Contestare una multa in Svizzera, da CHF 89 | Thrax Legal",
    metaDescription:
      "Verificate gratuitamente le vostre possibilità di contestare una multa svizzera (parcheggio, velocità, FFS), poi ricevete la vostra lettera di contestazione pronta da inviare. CHF 89, senza avvocato, senza appuntamento, consegnata entro 48h.",
    heroTitle: "Multa ricevuta? Verificate in 2 minuti se potete contestarla.",
    heroSubtitle:
      "Parcheggio, eccesso di velocità, trasporti pubblici: pagare una multa equivale a un'accettazione definitiva. Prima di pagare, verificate gratuitamente le vostre possibilità di contestazione — senza avvocato, senza appuntamento.",
    priceBadgeLabel: "Pack completo, pagamento unico",
    diagnosticCtaLabel: "Fare la mia diagnosi gratuita",
    diagnosticCtaSub: "2 minuti · Nessuna email richiesta",
    directBuyLabel: "So già cosa mi serve, acquistare direttamente — CHF 89",
    stickyBarLabel: "Pack Contestazione",
    trustBar: [
      "Diagnosi gratuita in 2 minuti, prima di pagare qualsiasi cosa.",
      "Nessun appuntamento necessario: tutto avviene online.",
      "Ogni lettera di contestazione è verificata da una persona reale prima dell'invio.",
    ],
    diagnosticHeading: "Diagnosi gratuita in 2 minuti",
    diagnosticSubheading:
      "Rispondete a qualche domanda per conoscere le vostre possibilità di contestazione prima di impegnarvi.",
    stepsHeading: "Come funziona",
    steps: [
      { title: "Diagnosi gratuita", description: "Rispondete a 4 domande in 2 minuti per conoscere le vostre possibilità." },
      { title: "Ordine online", description: "CHF 89, pagamento unico. Nessuna chiamata, nessun appuntamento necessario." },
      { title: "Consegna entro 48h", description: "La vostra lettera di contestazione è redatta e verificata dal nostro team, pronta da inviare." },
    ],
    includedHeading: "Cosa è incluso nel Pack Contestazione",
    included: [
      { title: "Analisi delle vostre possibilità", description: "Basata sui fatti precisi del vostro caso, non una risposta generica." },
      { title: "Lettera di contestazione pronta da inviare", description: "Redatta secondo la procedura applicabile alla vostra situazione." },
      { title: "Autorità e termine esatti", description: "I contatti giusti e il termine giusto, per non perdere nulla." },
      { title: "Verificata dal nostro team", description: "Una persona reale rilegge il vostro caso prima dell'invio." },
    ],
    guideLabel: "Per saperne di più",
    guideLinkLabel: "Vedi tutta la guida ↗",
    offerBullets: [
      "Analisi delle vostre possibilità basata sui fatti del vostro caso",
      "Lettera di contestazione redatta e pronta da inviare, con l'autorità e il termine giusti",
      "Verificata dal nostro team prima dell'invio",
    ],
    offerCtaLabel: "Ordinare il mio Pack Contestazione",
    offerDeliveryNote: "Consegnato entro 48h",
    securePaymentLabel: "Pagamento sicuro",
    lawyerHeading: "Il prezzo di un avvocato, senza l'avvocato",
    lawyerLabel: "Avvocato tradizionale",
    lawyerRange: "da CHF 300 a 1'200",
    lawyerNote: "Per una lettera di contestazione equivalente, ovvero 1-2 ore fatturate a CHF 250-600/h secondo la complessità.",
    brandLabel: "Thrax Legal",
    thraxPrice: "CHF 89",
    thraxNote: "Pack completo a prezzo fisso, consegnato entro 48h, senza appuntamento.",
    lawyerDisclaimer:
      "Stima basata su una tariffa oraria usuale di CHF 250-600 per un avvocato in Svizzera. Thrax Legal non è uno studio legale e non garantisce la rappresentanza davanti ai tribunali.",
    faqHeading: "Domande frequenti",
    faq: [
      {
        q: "Quanto tempo ho per contestare una multa?",
        a: "Dipende dal documento ricevuto: 30 giorni per una multa disciplinare (se non pagata, passa poi alla procedura penale), 10 giorni per opporsi a un decreto penale. La nostra diagnosi gratuita identifica la vostra situazione esatta.",
      },
      {
        q: "Ho buone possibilità di vincere?",
        a: "Dipende interamente dal vostro caso. Una contestazione senza motivo concreto (solo perché non siete d'accordo) fallisce quasi sempre. Un errore di identificazione, un difetto di segnaletica o un vizio di procedura ha reali possibilità. La diagnosi gratuita vi dà una valutazione onesta prima di andare oltre.",
      },
      {
        q: "Thrax Legal è uno studio legale?",
        a: "No. Thrax Legal non è uno studio legale e non garantisce la rappresentanza davanti ai tribunali, riservata agli avvocati iscritti a un albo cantonale svizzero. Per i casi gravi (ritiro importante della licenza, rischio di pena detentiva), vi indirizziamo verso un avvocato specializzato piuttosto che vendervi un servizio inadatto.",
      },
      {
        q: "Quanto tempo ci vuole per ricevere la mia lettera di contestazione?",
        a: "48 ore dopo il vostro ordine. La vostra lettera è redatta a partire dal vostro caso, poi verificata dal nostro team prima dell'invio.",
      },
      {
        q: "Cosa succede se ho già pagato la multa?",
        a: "Pagare una multa equivale a un'accettazione definitiva: non esiste più alcun ricorso possibile. La nostra diagnosi gratuita ve lo segnala immediatamente se è il vostro caso, per evitarvi di perdere tempo.",
      },
      {
        q: "Offrite i vostri servizi anche in francese, tedesco e inglese?",
        a: "Sì. Il sito e il Pack Contestazione sono disponibili in francese, tedesco, inglese e italiano.",
      },
      {
        q: "E se il mio caso riguarda un ritiro importante della licenza o un'infrazione grave?",
        a: "Il nostro servizio è pensato per multe e contestazioni comuni. Per i casi più pesanti, vi indirizziamo verso un avvocato specializzato in diritto della circolazione.",
      },
    ],
    productDescription:
      "Analisi delle vostre possibilità di contestazione e lettera di contestazione pronta da inviare, adattata alla vostra multa (parcheggio, eccesso di velocità, trasporti pubblici).",
  },
};

const CHECKOUT_SLUG = "checkout/pack-contestation-amende";

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
          <p className="text-sm font-semibold leading-tight text-text">89 CHF</p>
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
      price: "89",
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
                <PriceBadge amount="89 CHF" label={t.priceBadgeLabel} className="mt-8" />
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
                  price="89 CHF"
                  checkoutHref={checkoutHref}
                  ctaLabel={t.offerCtaLabel}
                  deliveryNote={t.offerDeliveryNote}
                  guaranteeNote=""
                  securePaymentLabel={t.securePaymentLabel}
                  bullets={t.offerBullets}
                />
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
