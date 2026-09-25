import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import FaqAccordion from "@/components/site/FaqAccordion";
import PaywallCard from "@/components/site/PaywallCard";
import Autodiagnostic from "@/components/site/Autodiagnostic";
import {
  Container,
  LawyerComparison,
  PrimaryButton,
  PriceBadge,
  StepList,
  TrustBar,
} from "@/components/site/ui";

export const metadata: Metadata = {
  title: "Conformité nLPD pour PME suisses, dès 590 CHF | Thrax Legal",
  description:
    "Mettez votre PME en conformité avec la nLPD révisée : registre des traitements, politique de confidentialité, contrats de sous-traitance. Prix fixe 590 CHF, sans avocat, sans rendez-vous, livré en 3 jours ouvrables.",
};

const CHECKOUT_HREF = "/checkout/pack-conformite-nlpd";

const STEPS = [
  {
    title: "Diagnostic gratuit",
    description:
      "Répondez à 6 questions en 2 minutes pour identifier vos points de non-conformité.",
  },
  {
    title: "Commande en ligne",
    description:
      "590 CHF, paiement unique. Aucun appel, aucun rendez-vous nécessaire.",
  },
  {
    title: "Livraison sous 3 jours",
    description:
      "Vos documents sont rédigés et vérifiés par notre équipe, prêts à l'emploi.",
  },
];

const INCLUDED = [
  {
    title: "Registre des traitements",
    description: "Recense les données que vous traitez et pourquoi, adapté à votre activité.",
  },
  {
    title: "Politique de confidentialité",
    description: "Pour votre site web et vos relations RH, conforme à la nLPD.",
  },
  {
    title: "Contrat de sous-traitance (DPA)",
    description: "Modèle prêt à l'emploi pour vos prestataires (hébergeur, CRM, comptabilité).",
  },
  {
    title: "Procédure violation de données",
    description: "La marche à suivre en cas de fuite ou de piratage, étape par étape.",
  },
  {
    title: "Checklist de mise en œuvre",
    description: "Pour vérifier et maintenir votre conformité dans le temps.",
  },
];

const FAQ = [
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
    q: "Proposez-vous vos services en allemand ?",
    a: "Le Pack est aujourd'hui disponible en français. Une version en allemand est en préparation : contactez-nous si votre entreprise en a besoin dès maintenant.",
  },
  {
    q: "Puis-je aussi m'abonner pour un suivi continu ?",
    a: "Oui. Le Suivi Conformité (79 CHF/mois, résiliable à tout moment) inclut les mises à jour légales, une revue annuelle de votre registre et un accès illimité à nos questions par email.",
  },
  {
    q: "Que se passe-t-il si mon entreprise est déjà partiellement conforme ?",
    a: "Le diagnostic gratuit identifie précisément ce qui manque. Vos documents sont adaptés à votre situation, sans repartir de zéro.",
  },
];

function DiagnosticCta({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center gap-3 text-center ${className}`}>
      <PrimaryButton href="#diagnostic" className="px-8 py-3.5 text-base">
        Faire mon diagnostic gratuit
      </PrimaryButton>
      <p className="text-sm text-text-muted">2 minutes &middot; Sans email requis</p>
      <Link
        href={CHECKOUT_HREF}
        className="mt-1 text-sm text-text-muted underline decoration-dotted underline-offset-4 hover:text-text"
      >
        Je sais déjà ce qu&rsquo;il me faut, acheter directement — 590 CHF
      </Link>
    </div>
  );
}

function StickyOrderBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/95 backdrop-blur">
      <Container className="flex items-center justify-between gap-4 py-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold leading-tight text-text">590 CHF</p>
          <p className="truncate text-xs text-text-muted">Pack Conformité nLPD</p>
        </div>
        <PrimaryButton href="#diagnostic" className="shrink-0 px-5 py-2.5 text-sm">
          Faire mon diagnostic gratuit
        </PrimaryButton>
      </Container>
    </div>
  );
}

export default function Home() {
  return (
    <>
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
                  Votre PME est-elle exposée aux sanctions de la nLPD ?
                </h1>
                <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-text-muted">
                  La loi révisée sur la protection des données expose les PME
                  et leurs dirigeants à des sanctions pouvant atteindre
                  250&rsquo;000 CHF en cas de manquement grave. Mettez votre
                  entreprise en conformité, sans avocat, sans rendez-vous.
                </p>
                <PriceBadge
                  amount="590 CHF"
                  label="Pack complet, paiement unique"
                  className="mt-8"
                />
                <DiagnosticCta className="mt-6" />
              </Reveal>
            </Container>
          </section>

          <div className="theme-light bg-bg">
            <TrustBar
              items={[
                "Conforme à la nLPD révisée, en vigueur depuis septembre 2023.",
                "Aucun rendez-vous nécessaire : tout se passe en ligne, du diagnostic à la livraison.",
                "Chaque document est vérifié par une vraie personne avant envoi.",
              ]}
            />
          </div>

          <section id="diagnostic" className="theme-light bg-bg py-16 md:py-24">
            <Container className="mx-auto max-w-2xl">
              <Reveal>
                <h2 className="text-center text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-text">
                  Diagnostic gratuit en 2 minutes
                </h2>
                <p className="mx-auto mt-3 max-w-lg text-center text-base leading-relaxed text-text-muted">
                  Répondez à 6 questions pour connaître votre niveau de
                  conformité nLPD et les points précis à corriger.
                </p>
                <Autodiagnostic checkoutHref={CHECKOUT_HREF} className="mt-8" />
              </Reveal>
            </Container>
          </section>

          <section className="theme-light bg-surface py-16 md:py-20">
            <Container className="mx-auto max-w-2xl">
              <Reveal>
                <h2 className="text-center text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-text">
                  Comment ça marche
                </h2>
                <StepList steps={STEPS} className="mt-8" />
              </Reveal>
            </Container>
          </section>

          <section className="theme-light bg-bg py-16 md:py-24">
            <Container className="mx-auto max-w-2xl">
              <Reveal>
                <h2 className="text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-text">
                  Ce qui est inclus dans le Pack Conformité
                </h2>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {INCLUDED.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-border bg-surface p-6"
                    >
                      <h3 className="text-base font-semibold text-text">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-muted">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </Container>
          </section>

          <section id="offre" className="theme-light bg-surface py-16 md:py-24">
            <Container className="mx-auto max-w-2xl">
              <Reveal>
                <PaywallCard
                  price="590 CHF"
                  checkoutHref={CHECKOUT_HREF}
                  ctaLabel="Commander mon Pack Conformité"
                  deliveryNote="Livré sous 3 jours ouvrables"
                  bullets={[
                    "Registre des traitements et politique de confidentialité adaptés à votre activité",
                    "Modèle de contrat de sous-traitance (DPA) et procédure violation de données",
                    "Vérifié par notre équipe avant envoi",
                  ]}
                />
                <div className="mt-3 rounded-2xl border border-dashed border-border p-5">
                  <p className="text-base font-semibold text-text">
                    En option : Suivi Conformité, 79 CHF/mois
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-text-muted">
                    Mises à jour légales, revue annuelle de votre registre et
                    questions illimitées par email. Résiliable à tout moment.{" "}
                    <Link
                      href="/suivi-conformite"
                      className="text-text underline decoration-dotted underline-offset-4 hover:text-text-muted"
                    >
                      En savoir plus
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
                  Le prix d&rsquo;un avocat, sans l&rsquo;avocat
                </h2>
                <LawyerComparison
                  className="mt-8"
                  lawyerRange="750 à 3'000 CHF"
                  lawyerNote="Pour un dossier équivalent (5 documents adaptés à votre activité), soit 3 à 5 heures facturées à 250-600 CHF/h selon la complexité."
                  thraxPrice="590 CHF"
                  thraxNote="Pack complet à prix fixe, livré sous 3 jours ouvrables, sans rendez-vous."
                />
                <DiagnosticCta className="mt-10" />
              </Reveal>
            </Container>
          </section>

          <section id="contact" className="theme-light bg-surface py-16 md:py-24">
            <Container className="mx-auto max-w-2xl">
              <Reveal>
                <h2 className="text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-text">
                  Questions fréquentes
                </h2>
                <FaqAccordion items={FAQ} className="mt-8" />
                <DiagnosticCta className="mt-12" />
              </Reveal>
            </Container>
          </section>
        </main>
        <Footer />
      </div>
      <StickyOrderBar />
    </>
  );
}
