import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import FaqAccordion from "@/components/site/FaqAccordion";
import {
  Container,
  LawyerComparison,
  PriceBadge,
  StepList,
  TrustBar,
} from "@/components/site/ui";
import RentCalculator from "./components/RentCalculator";

export const metadata: Metadata = {
  title: "Contestation de hausse de loyer en Suisse | Thrax Legal",
  description:
    "Calculez si la hausse de votre loyer est légale et générez votre contestation officielle.",
};

const STEPS = [
  {
    title: "Vérifiez la légalité",
    description:
      "Renseignez l'ancien et le nouveau loyer : le calculateur détecte immédiatement une hausse potentiellement abusive.",
  },
  {
    title: "Générez le kit",
    description:
      "Le dossier de contestation complet est généré, prêt à déposer auprès de la commission de conciliation.",
  },
  {
    title: "Déposez dans les délais",
    description:
      "Le compte à rebours affiché dans l'outil vous indique le temps restant avant l'expiration du délai légal de 30 jours.",
  },
];

const FAQ = [
  {
    q: "Comment savoir si ma hausse de loyer est abusive ?",
    a: "Une hausse est examinée à la lumière de l'évolution du taux hypothécaire de référence et du renchérissement. Le calculateur applique ces critères à votre situation.",
  },
  {
    q: "Que se passe-t-il si je dépasse le délai de 30 jours ?",
    a: "Passé ce délai, la hausse est considérée comme acceptée. C'est pourquoi le compte à rebours est affiché dès que vous renseignez la date de réception de l'avis.",
  },
  {
    q: "La régie peut-elle résilier mon bail parce que je conteste ?",
    a: "Non. Le droit suisse du bail protège le locataire contre une résiliation liée à l'exercice de bonne foi de ses droits.",
  },
  {
    q: "Thrax Legal est-il un cabinet d'avocats ?",
    a: "Non. Thrax Legal n'est pas un cabinet d'avocats et n'assure pas la représentation devant les tribunaux, réservée aux avocats inscrits à un registre cantonal suisse. Si le litige dépasse la commission de conciliation, un avocat pourra vous représenter au tribunal des baux.",
  },
];

export default function HausseLoyerPage() {
  return (
    <>
      <Nav />
      <main className="bg-bg text-text">
        <section className="relative isolate overflow-hidden border-b border-border">
          <Image
            src="/media/photos/hausse-loyer.jpg"
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
                Votre régie vous demande trop. Ne payez pas l&rsquo;inflation.
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-text-muted">
                Calculez si la hausse de votre loyer est légale et générez
                votre contestation officielle.
              </p>
              <PriceBadge
                amount="129 CHF"
                label="Kit de contestation, paiement unique"
                className="mt-8"
              />
              <p className="mt-4 text-sm text-text-muted">
                Calculateur gratuit, sans engagement. Délai légal de 30 jours,
                agissez vite.
              </p>
            </Reveal>
          </Container>
        </section>

        <section className="theme-light bg-bg py-16 md:py-24">
          <Container className="mx-auto max-w-2xl">
            <Reveal>
              <RentCalculator />
            </Reveal>
          </Container>
        </section>

        <div className="theme-light bg-bg">
          <TrustBar
            items={[
              "Le délai pour contester une hausse de loyer devant la Commission de conciliation est de 30 jours dès réception de l'avis.",
              "La contestation ne peut pas entraîner de résiliation du bail par la régie.",
              "Conforme au droit suisse du bail (art. 269 ss CO).",
            ]}
          />
        </div>

        <section className="theme-light bg-surface py-16 md:py-24">
          <Container className="mx-auto max-w-2xl">
            <Reveal>
              <h2 className="text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-text">
                Le prix d&rsquo;un avocat, sans l&rsquo;avocat
              </h2>
              <LawyerComparison
                className="mt-8"
                lawyerRange="500 à 2400 CHF"
                lawyerNote="Pour l'analyse du bail et la rédaction de la contestation, soit environ 2 à 4 heures facturées."
                thraxPrice="129 CHF"
                thraxNote="Kit de contestation complet, prêt à déposer, généré immédiatement."
              />
            </Reveal>
          </Container>
        </section>

        <section className="theme-light bg-bg py-16 md:py-24">
          <Container className="mx-auto max-w-2xl">
            <Reveal>
              <h2 className="text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-text">
                Comment ça marche
              </h2>
              <StepList steps={STEPS} className="mt-8" />
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
