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
  title: "Suivi Conformité nLPD, 79 CHF/mois | Thrax Legal",
  description:
    "Gardez votre PME en conformité avec la nLPD dans le temps : mises à jour légales, revue annuelle du registre, questions illimitées. 79 CHF/mois, résiliable à tout moment.",
};

const CHECKOUT_HREF = "/checkout/suivi-conformite";

const STEPS = [
  {
    title: "Vous démarrez",
    description:
      "79 CHF/mois, à partir de votre Pack Conformité existant ou en complément d'une conformité déjà en place.",
  },
  {
    title: "Vous nous écrivez",
    description:
      "Une question, un nouveau prestataire, un changement d'activité : décrivez votre besoin par email.",
  },
  {
    title: "Nous mettons à jour",
    description:
      "Vos documents sont ajustés et vérifiés par notre équipe, sous 48h ouvrées.",
  },
];

const FAQ = [
  {
    q: "Qu'est-ce qui est inclus exactement ?",
    a: "Les mises à jour de vos documents nLPD dès que la loi ou votre activité change, une revue annuelle complète de votre registre des traitements, et un accès illimité à nos réponses par email sous 48h ouvrées.",
  },
  {
    q: "Dois-je déjà avoir le Pack Conformité nLPD pour m'abonner ?",
    a: "C'est recommandé, mais pas obligatoire. Si votre conformité a été mise en place par ailleurs, nous reprenons vos documents existants lors de la première revue.",
  },
  {
    q: "Dois-je passer un appel avant de démarrer ?",
    a: "Non. Vous vous abonnez en ligne, et c'est actif immédiatement.",
  },
  {
    q: "Puis-je résilier à tout moment ?",
    a: "Oui, sans justification. Vous restez abonné mois par mois, jamais engagé sur une durée.",
  },
  {
    q: "Mes documents sont-ils vérifiés par une vraie personne ?",
    a: "Oui. Chaque mise à jour est vérifiée par notre équipe avant de vous être envoyée.",
  },
];

export default function SuiviConformitePage() {
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
            className="object-cover opacity-30 grayscale"
          />
          <div aria-hidden className="absolute inset-0 bg-bg/80" />
          <Container className="relative mx-auto max-w-3xl py-24 text-center md:py-32">
            <Reveal>
              <h1 className="text-[2.25rem] font-semibold leading-[1.1] tracking-[-0.02em] text-text sm:text-5xl md:text-6xl">
                Restez conforme à la nLPD, dans le temps
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-text-muted">
                La loi évolue, votre activité aussi. Le Suivi Conformité
                garde vos documents à jour, sans rendez-vous, résiliable à
                tout moment.
              </p>
              <PriceBadge
                amount="79 CHF"
                label="par mois, résiliable à tout moment"
                className="mt-8"
              />
              <div className="mt-8">
                <PrimaryButton href={CHECKOUT_HREF} className="px-8 py-3.5 text-base">
                  Démarrer le Suivi Conformité
                </PrimaryButton>
              </div>
            </Reveal>
          </Container>
        </section>

        <div className="theme-light bg-bg">
          <TrustBar
            items={[
              "Aucun appel nécessaire : tout se passe en ligne.",
              "Résiliable à tout moment, sans justification.",
              "Chaque mise à jour est vérifiée par une vraie personne.",
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
              <PaywallCard
                price="79 CHF/mois"
                checkoutHref={CHECKOUT_HREF}
                ctaLabel="Démarrer le Suivi Conformité"
                deliveryNote="Sans appel, actif immédiatement"
                guaranteeNote="Résiliable à tout moment"
                bullets={[
                  "Mises à jour légales dès que la nLPD ou votre activité change",
                  "Revue annuelle complète de votre registre des traitements",
                  "Questions illimitées par email, réponse sous 48h ouvrées",
                ]}
              />
              <p className="mt-6 text-center text-sm text-text-muted">
                Vous n&rsquo;avez pas encore le Pack de base ?{" "}
                <Link
                  href="/#offre"
                  className="text-text underline decoration-dotted underline-offset-4 hover:text-text-muted"
                >
                  Commencer par le Pack Conformité nLPD, 590 CHF
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
                lawyerRange="750 à 3'000 CHF / mois"
                lawyerNote="Pour un usage ponctuel équivalent, environ 3 à 5 heures facturées par mois selon les besoins."
                thraxPrice="79 CHF / mois"
                thraxNote="Mises à jour et revue annuelle incluses, sans rendez-vous, résiliable à tout moment."
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
