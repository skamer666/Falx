import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import FaqAccordion from "@/components/site/FaqAccordion";
import PaywallCard from "@/components/site/PaywallCard";
import {
  Container,
  LawyerComparison,
  PrimaryButton,
  PriceBadge,
  StepList,
  TrustBar,
} from "@/components/site/ui";

export const metadata: Metadata = {
  title: "Abonnement juridique PME, sans appel | Thrax Legal",
  description:
    "Mises en demeure, contrats et documents juridiques pour votre PME. Abonnement mensuel à prix fixe, sans appel, résiliable à tout moment. Dès 149 CHF/mois.",
};

const STEPS = [
  {
    title: "Choisissez votre formule",
    description:
      "149 ou 299 CHF/mois, premier mois à 49 CHF. Paiement en ligne, aucun appel nécessaire.",
  },
  {
    title: "Envoyez vos demandes",
    description:
      "Mise en demeure, contrat, courrier officiel : décrivez votre besoin en ligne.",
  },
  {
    title: "Recevez vos documents",
    description:
      "Rédigés et vérifiés par notre équipe, livrés sous 2 à 3 jours ouvrables.",
  },
];

const FAQ = [
  {
    q: "Qu'est-ce qui est inclus exactement ?",
    a: "Selon votre formule, 2 ou 5 documents par mois (mise en demeure, contrat de travail, CGV, courrier officiel), plus l'accès à notre bibliothèque de modèles.",
  },
  {
    q: "Que se passe-t-il si j'ai besoin de plus de documents un mois ?",
    a: "Vous pouvez commander un document supplémentaire à l'unité, ou passer à la formule supérieure à tout moment, toujours sans appel.",
  },
  {
    q: "Dois-je passer un appel avant de démarrer ?",
    a: "Non. Vous choisissez votre formule, vous payez en ligne, et c'est actif immédiatement.",
  },
  {
    q: "Puis-je résilier à tout moment ?",
    a: "Oui, sans justification. Vous restez abonné mois par mois, jamais engagé sur une durée.",
  },
  {
    q: "Mes documents sont-ils vérifiés par une vraie personne ?",
    a: "Oui. Chaque document est vérifié par notre équipe avant de vous être envoyé, avec les sources du droit suisse applicable.",
  },
];

export default function AbonnementPmePage() {
  return (
    <>
      <Nav />
      <main className="bg-bg text-text">
        <section className="relative isolate overflow-hidden border-b border-border">
          <Image
            src="/media/photos/hero-building.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40"
          />
          <div aria-hidden className="absolute inset-0 bg-bg/70" />
          <Container className="relative mx-auto max-w-3xl py-24 text-center md:py-32">
            <Reveal>
              <h1 className="text-[2.25rem] font-semibold leading-[1.1] tracking-[-0.02em] text-text sm:text-5xl md:text-6xl">
                Un appui juridique pour votre PME, sans rendez-vous
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-text-muted">
                Mises en demeure, contrats, courriers officiels. Abonnement
                mensuel à prix fixe, sans appel préalable, résiliable à tout
                moment.
              </p>
              <PriceBadge
                amount="Dès 149 CHF"
                label="par mois, 1er mois à 49 CHF"
                className="mt-8"
              />
              <div className="mt-8">
                <PrimaryButton
                  href="/checkout/abonnement-essentiel"
                  className="px-8 py-3.5 text-base"
                >
                  Démarrer maintenant, dès 49 CHF
                </PrimaryButton>
              </div>
            </Reveal>
          </Container>
        </section>

        <div className="theme-light bg-bg">
          <TrustBar
            items={[
              "Aucun appel nécessaire : tout se passe en ligne, du choix de la formule à la réception de vos documents.",
              "Résiliable à tout moment, sans justification.",
              "Chaque document est vérifié par une vraie personne avant envoi.",
            ]}
          />
        </div>

        <section className="theme-light bg-bg py-16 md:py-20">
          <Container className="mx-auto max-w-2xl">
            <Reveal>
              <h2 className="text-center text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-text">
                Comment ça marche
              </h2>
              <StepList steps={STEPS} className="mt-8" />
            </Reveal>
          </Container>
        </section>

        <section className="theme-light bg-surface py-16 md:py-24">
          <Container className="mx-auto max-w-2xl">
            <Reveal>
              <h2 className="text-center text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-text">
                Choisissez votre formule
              </h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <PaywallCard
                  price="149 CHF/mois"
                  checkoutHref="/checkout/abonnement-essentiel"
                  ctaLabel="Démarrer avec Essentiel"
                  deliveryNote="Sans appel, actif immédiatement"
                  guaranteeNote="Résiliable à tout moment"
                  bullets={[
                    "Premier mois à 49 CHF, puis 149 CHF/mois",
                    "2 documents inclus par mois (mise en demeure, contrat, courrier)",
                    "Accès à notre bibliothèque de modèles",
                  ]}
                />
                <PaywallCard
                  price="299 CHF/mois"
                  checkoutHref="/checkout/abonnement-croissance"
                  ctaLabel="Démarrer avec Croissance"
                  deliveryNote="Sans appel, actif immédiatement"
                  guaranteeNote="Résiliable à tout moment"
                  bullets={[
                    "5 documents inclus par mois",
                    "Suivi de conformité nLPD de base",
                    "Accès à notre bibliothèque de modèles",
                  ]}
                />
              </div>
              <p className="mt-6 text-center text-sm text-text-muted">
                Besoin de plus ?{" "}
                <Link
                  href="/#contact"
                  className="text-text underline decoration-dotted underline-offset-4 hover:text-text-muted"
                >
                  Parlons-en
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
                Le prix d&rsquo;un avocat, sans l&rsquo;avocat
              </h2>
              <LawyerComparison
                className="mt-8"
                lawyerRange="750 à 3000 CHF / mois"
                lawyerNote="Pour un usage ponctuel équivalent, environ 3 à 5 heures facturées par mois selon les besoins."
                thraxPrice="Dès 149 CHF / mois"
                thraxNote="2 à 5 documents inclus selon la formule, sans appel, résiliable à tout moment."
              />
            </Reveal>
          </Container>
        </section>

        <section className="theme-light bg-surface py-16 md:py-24">
          <Container className="mx-auto max-w-2xl">
            <Reveal>
              <h2 className="text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-text">
                Questions fréquentes
              </h2>
              <FaqAccordion items={FAQ} className="mt-8" />
            </Reveal>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
