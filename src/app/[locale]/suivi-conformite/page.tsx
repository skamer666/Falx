import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import FaqAccordion from "@/components/site/FaqAccordion";
import PaywallCard from "@/components/site/PaywallCard";
import JsonLd from "@/components/site/JsonLd";
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

type Content = {
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  priceBadgeLabel: string;
  ctaLabel: string;
  trustBar: [string, string, string];
  stepsHeading: string;
  steps: StepItem[];
  offerPrice: string;
  offerDeliveryNote: string;
  offerGuaranteeNote: string;
  securePaymentLabel: string;
  offerBullets: [string, string, string];
  noPackYet: string;
  noPackLinkLabel: string;
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
  productName: string;
  productDescription: string;
};

const CONTENT: Record<Locale, Content> = {
  fr: {
    metaTitle: "Suivi Conformité nLPD, 79 CHF/mois | Thrax Legal",
    metaDescription:
      "Gardez votre PME en conformité avec la nLPD dans le temps : mises à jour légales, revue annuelle du registre, questions illimitées. 79 CHF/mois, résiliable à tout moment.",
    heroTitle: "Restez conforme à la nLPD, dans le temps",
    heroSubtitle:
      "La loi évolue, votre activité aussi. Le Suivi Conformité garde vos documents à jour, sans rendez-vous, résiliable à tout moment.",
    priceBadgeLabel: "par mois, résiliable à tout moment",
    ctaLabel: "Démarrer le Suivi Conformité",
    trustBar: [
      "Aucun appel nécessaire : tout se passe en ligne.",
      "Résiliable à tout moment, sans justification.",
      "Chaque mise à jour est vérifiée par une vraie personne.",
    ],
    stepsHeading: "Comment ça marche",
    steps: [
      { title: "Vous démarrez", description: "79 CHF/mois, à partir de votre Pack Conformité existant ou en complément d'une conformité déjà en place." },
      { title: "Vous nous écrivez", description: "Une question, un nouveau prestataire, un changement d'activité : décrivez votre besoin par email." },
      { title: "Nous mettons à jour", description: "Vos documents sont ajustés et vérifiés par notre équipe, sous 48h ouvrées." },
    ],
    offerPrice: "79 CHF/mois",
    offerDeliveryNote: "Sans appel, actif immédiatement",
    offerGuaranteeNote: "Résiliable à tout moment",
    securePaymentLabel: "Paiement sécurisé",
    offerBullets: [
      "Mises à jour légales dès que la nLPD ou votre activité change",
      "Revue annuelle complète de votre registre des traitements",
      "Questions illimitées par email, réponse sous 48h ouvrées",
    ],
    noPackYet: "Vous n'avez pas encore le Pack de base ?",
    noPackLinkLabel: "Commencer par le Pack Conformité nLPD, 590 CHF",
    lawyerHeading: "Le prix d'un avocat, sans l'avocat",
    lawyerLabel: "Avocat traditionnel",
    lawyerRange: "750 à 3'000 CHF / mois",
    lawyerNote: "Pour un usage ponctuel équivalent, environ 3 à 5 heures facturées par mois selon les besoins.",
    brandLabel: "Thrax Legal",
    thraxPrice: "79 CHF / mois",
    thraxNote: "Mises à jour et revue annuelle incluses, sans rendez-vous, résiliable à tout moment.",
    lawyerDisclaimer:
      "Estimation basée sur un tarif horaire usuel de 250 à 600 CHF pour un avocat en Suisse. Thrax Legal n'est pas un cabinet d'avocats et n'assure pas la représentation devant les tribunaux.",
    faqHeading: "Questions fréquentes",
    faq: [
      { q: "Qu'est-ce qui est inclus exactement ?", a: "Les mises à jour de vos documents nLPD dès que la loi ou votre activité change, une revue annuelle complète de votre registre des traitements, et un accès illimité à nos réponses par email sous 48h ouvrées." },
      { q: "Dois-je déjà avoir le Pack Conformité nLPD pour m'abonner ?", a: "C'est recommandé, mais pas obligatoire. Si votre conformité a été mise en place par ailleurs, nous reprenons vos documents existants lors de la première revue." },
      { q: "Dois-je passer un appel avant de démarrer ?", a: "Non. Vous vous abonnez en ligne, et c'est actif immédiatement." },
      { q: "Puis-je résilier à tout moment ?", a: "Oui, sans justification. Vous restez abonné mois par mois, jamais engagé sur une durée." },
      { q: "Mes documents sont-ils vérifiés par une vraie personne ?", a: "Oui. Chaque mise à jour est vérifiée par notre équipe avant de vous être envoyée." },
    ],
    productName: "Suivi Conformité nLPD",
    productDescription: "Abonnement mensuel de suivi de conformité nLPD : mises à jour légales, revue annuelle du registre des traitements, questions illimitées par email.",
  },
  de: {
    metaTitle: "DSG-Compliance-Abo, CHF 79/Monat | Thrax Legal",
    metaDescription:
      "Halten Sie Ihr KMU dauerhaft DSG-konform: gesetzliche Updates, jährliche Verzeichnisprüfung, unbegrenzte Fragen. CHF 79/Monat, jederzeit kündbar.",
    heroTitle: "Bleiben Sie DSG-konform, dauerhaft",
    heroSubtitle:
      "Das Gesetz entwickelt sich weiter, Ihr Unternehmen auch. Das Compliance-Abo hält Ihre Dokumente aktuell, ohne Termin, jederzeit kündbar.",
    priceBadgeLabel: "pro Monat, jederzeit kündbar",
    ctaLabel: "Compliance-Abo starten",
    trustBar: [
      "Kein Anruf nötig: alles läuft online ab.",
      "Jederzeit kündbar, ohne Begründung.",
      "Jedes Update wird von einer echten Person geprüft.",
    ],
    stepsHeading: "So funktioniert's",
    steps: [
      { title: "Sie starten", description: "CHF 79/Monat, aufbauend auf Ihrem bestehenden Compliance-Paket oder ergänzend zu einer bereits vorhandenen Konformität." },
      { title: "Sie schreiben uns", description: "Eine Frage, ein neuer Dienstleister, eine Tätigkeitsänderung: beschreiben Sie Ihr Anliegen per E-Mail." },
      { title: "Wir aktualisieren", description: "Ihre Dokumente werden von unserem Team angepasst und innert 48 Arbeitsstunden geprüft." },
    ],
    offerPrice: "CHF 79/Monat",
    offerDeliveryNote: "Ohne Anruf, sofort aktiv",
    offerGuaranteeNote: "Jederzeit kündbar",
    securePaymentLabel: "Sichere Zahlung",
    offerBullets: [
      "Gesetzliche Updates, sobald sich das DSG oder Ihre Tätigkeit ändert",
      "Vollständige jährliche Überprüfung Ihres Verarbeitungsverzeichnisses",
      "Unbegrenzte Fragen per E-Mail, Antwort innert 48 Arbeitsstunden",
    ],
    noPackYet: "Sie haben das Basispaket noch nicht?",
    noPackLinkLabel: "Mit dem DSG-Compliance-Paket starten, CHF 590",
    lawyerHeading: "Der Preis eines Anwalts, ohne den Anwalt",
    lawyerLabel: "Klassische Anwaltskanzlei",
    lawyerRange: "750 bis 3'000 CHF / Monat",
    lawyerNote: "Für eine vergleichbare punktuelle Nutzung, etwa 3 bis 5 monatlich verrechnete Stunden je nach Bedarf.",
    brandLabel: "Thrax Legal",
    thraxPrice: "CHF 79 / Monat",
    thraxNote: "Updates und Jahresüberprüfung inklusive, ohne Termin, jederzeit kündbar.",
    lawyerDisclaimer:
      "Schätzung basierend auf einem üblichen Stundensatz von CHF 250 bis 600 für einen Anwalt in der Schweiz. Thrax Legal ist keine Anwaltskanzlei und übernimmt keine Vertretung vor Gericht.",
    faqHeading: "Häufige Fragen",
    faq: [
      { q: "Was ist genau enthalten?", a: "Die Aktualisierung Ihrer DSG-Dokumente, sobald sich das Gesetz oder Ihre Tätigkeit ändert, eine vollständige jährliche Überprüfung Ihres Verarbeitungsverzeichnisses und unbegrenzten Zugang zu unseren Antworten per E-Mail innert 48 Arbeitsstunden." },
      { q: "Muss ich bereits das DSG-Compliance-Paket haben, um zu abonnieren?", a: "Das ist empfehlenswert, aber nicht zwingend. Wurde Ihre Konformität anderweitig umgesetzt, übernehmen wir Ihre bestehenden Dokumente bei der ersten Überprüfung." },
      { q: "Muss ich vor dem Start ein Telefonat führen?", a: "Nein. Sie abonnieren online, und das Abo ist sofort aktiv." },
      { q: "Kann ich jederzeit kündigen?", a: "Ja, ohne Begründung. Sie bleiben monatlich abonniert, nie über eine Mindestdauer gebunden." },
      { q: "Werden meine Dokumente von einer echten Person geprüft?", a: "Ja. Jedes Update wird von unserem Team geprüft, bevor es Ihnen zugestellt wird." },
    ],
    productName: "DSG-Compliance-Abo",
    productDescription: "Monatliches Abo zur laufenden DSG-Compliance: gesetzliche Updates, jährliche Überprüfung des Verarbeitungsverzeichnisses, unbegrenzte Fragen per E-Mail.",
  },
  en: {
    metaTitle: "Ongoing FADP compliance, CHF 79/month | Thrax Legal",
    metaDescription:
      "Keep your SME FADP-compliant over time: legal updates, annual record review, unlimited questions. CHF 79/month, cancel anytime.",
    heroTitle: "Stay FADP-compliant, over time",
    heroSubtitle:
      "The law evolves, so does your business. Ongoing Compliance keeps your documents up to date, no appointment, cancel anytime.",
    priceBadgeLabel: "per month, cancel anytime",
    ctaLabel: "Start Ongoing Compliance",
    trustBar: [
      "No call needed: everything happens online.",
      "Cancel anytime, no justification needed.",
      "Every update is checked by a real person.",
    ],
    stepsHeading: "How it works",
    steps: [
      { title: "You get started", description: "CHF 79/month, building on your existing Compliance Pack or complementing compliance already in place." },
      { title: "You write to us", description: "A question, a new vendor, a change in your business: describe what you need by email." },
      { title: "We update", description: "Your documents are adjusted and checked by our team within 48 business hours." },
    ],
    offerPrice: "CHF 79/month",
    offerDeliveryNote: "No call, active immediately",
    offerGuaranteeNote: "Cancel anytime",
    securePaymentLabel: "Secure payment",
    offerBullets: [
      "Legal updates as soon as the FADP or your business changes",
      "Full annual review of your record of processing activities",
      "Unlimited questions by email, answered within 48 business hours",
    ],
    noPackYet: "Don't have the base Pack yet?",
    noPackLinkLabel: "Start with the FADP Compliance Pack, CHF 590",
    lawyerHeading: "The price of a lawyer, without the lawyer",
    lawyerLabel: "Traditional law firm",
    lawyerRange: "CHF 750 to 3,000 / month",
    lawyerNote: "For an equivalent occasional use, roughly 3 to 5 hours billed per month depending on needs.",
    brandLabel: "Thrax Legal",
    thraxPrice: "CHF 79 / month",
    thraxNote: "Updates and annual review included, no appointment, cancel anytime.",
    lawyerDisclaimer:
      "Estimate based on a typical hourly rate of CHF 250 to 600 for a lawyer in Switzerland. Thrax Legal is not a law firm and does not represent clients before courts.",
    faqHeading: "Frequently asked questions",
    faq: [
      { q: "What's included exactly?", a: "Updates to your FADP documents as soon as the law or your business changes, a full annual review of your record of processing activities, and unlimited access to our answers by email within 48 business hours." },
      { q: "Do I need the FADP Compliance Pack already to subscribe?", a: "It's recommended, but not required. If your compliance was set up elsewhere, we pick up your existing documents at the first review." },
      { q: "Do I need to get on a call before starting?", a: "No. You subscribe online, and it's active immediately." },
      { q: "Can I cancel anytime?", a: "Yes, no justification needed. You stay subscribed month to month, never locked into a term." },
      { q: "Are my documents checked by a real person?", a: "Yes. Every update is checked by our team before it's sent to you." },
    ],
    productName: "Ongoing FADP Compliance",
    productDescription: "Monthly subscription for ongoing FADP compliance: legal updates, annual review of the record of processing activities, unlimited email questions.",
  },
};

const CHECKOUT_SLUG = "checkout/suivi-conformite";

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
    alternates: { canonical: `/${locale}/suivi-conformite` },
  };
}

export default async function SuiviConformitePage({
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
    name: t.productName,
    description: t.productDescription,
    brand: { "@type": "Brand", name: "Thrax Legal" },
    offers: {
      "@type": "Offer",
      price: "79",
      priceCurrency: "CHF",
      availability: "https://schema.org/InStock",
      url: checkoutHref,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "79",
        priceCurrency: "CHF",
        billingIncrement: 1,
        unitCode: "MON",
      },
    },
  };

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <JsonLd data={productJsonLd} />
      <Nav />
      <main className="bg-bg text-text">
        <section className="relative isolate overflow-hidden border-b border-border">
          <Image
            src="/media/photos/hero-building.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-30 grayscale"
          />
          <div aria-hidden className="absolute inset-0 bg-bg/80" />
          <Container className="relative mx-auto max-w-3xl py-24 text-center md:py-32">
            <Reveal>
              <h1 className="text-[2.25rem] font-semibold leading-[1.1] tracking-[-0.02em] text-text sm:text-5xl md:text-6xl">
                {t.heroTitle}
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-text-muted">
                {t.heroSubtitle}
              </p>
              <PriceBadge amount="79 CHF" label={t.priceBadgeLabel} className="mt-8" />
              <div className="mt-8">
                <PrimaryButton href={checkoutHref} className="px-8 py-3.5 text-base">
                  {t.ctaLabel}
                </PrimaryButton>
              </div>
            </Reveal>
          </Container>
        </section>

        <div className="theme-light bg-bg">
          <TrustBar items={t.trustBar} />
        </div>

        <section className="theme-light bg-bg py-16 md:py-20">
          <Container className="mx-auto max-w-2xl">
            <Reveal>
              <h2 className="text-center text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-text">
                {t.stepsHeading}
              </h2>
              <StepList steps={t.steps} className="mt-8" />
            </Reveal>
          </Container>
        </section>

        <section className="theme-light bg-surface py-16 md:py-24">
          <Container className="mx-auto max-w-2xl">
            <Reveal>
              <PaywallCard
                price={t.offerPrice}
                checkoutHref={checkoutHref}
                ctaLabel={t.ctaLabel}
                deliveryNote={t.offerDeliveryNote}
                guaranteeNote={t.offerGuaranteeNote}
                securePaymentLabel={t.securePaymentLabel}
                bullets={t.offerBullets}
              />
              <p className="mt-6 text-center text-sm text-text-muted">
                {t.noPackYet}{" "}
                <Link
                  href={`/${locale}/#offre`}
                  className="text-text underline decoration-dotted underline-offset-4 hover:text-text-muted"
                >
                  {t.noPackLinkLabel}
                </Link>
                .
              </p>
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
            </Reveal>
          </Container>
        </section>

        <section className="theme-light bg-surface py-16 md:py-24">
          <Container className="mx-auto max-w-2xl">
            <Reveal>
              <h2 className="text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-text">
                {t.faqHeading}
              </h2>
              <FaqAccordion items={t.faq} className="mt-8" />
            </Reveal>
          </Container>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
