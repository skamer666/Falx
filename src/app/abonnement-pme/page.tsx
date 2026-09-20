import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import { Container, PriceBadge, PrimaryButton, StepList, TrustBar } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "Direction Juridique Externalisée : abonnement PME | Thrax Legal",
  description:
    "Un interlocuteur juridique unique pour votre PME suisse, dès 290 CHF par mois.",
};

const INCLUDED_STEPS = [
  {
    title: "Contrats illimités",
    description:
      "Rédaction et revue de vos contrats de travail, CGV et accords commerciaux, sans limite de volume.",
  },
  {
    title: "Mises en demeure incluses",
    description:
      "Chaque mise en demeure nécessaire à la protection de vos intérêts est rédigée et envoyée sans coût additionnel.",
  },
  {
    title: "Conformité continue",
    description:
      "Suivi de votre conformité nLPD et de vos obligations issues du Code des obligations, mois après mois.",
  },
];

export default function AbonnementPmePage() {
  return (
    <>
      <Nav />
      <main className="bg-bg text-text">
        <section className="relative isolate overflow-hidden border-b border-border">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-10%,rgba(91,91,246,0.28),transparent)]"
          />
          <Container className="relative mx-auto max-w-3xl py-24 text-center md:py-32">
            <Reveal>
              <h1 className="text-[2.25rem] font-semibold leading-[1.1] tracking-tight text-text sm:text-5xl md:text-6xl">
                Direction Juridique Externalisée
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-text-muted">
                Un interlocuteur juridique unique pour votre PME, sans les
                coûts d&rsquo;un poste interne.
              </p>
              <PriceBadge amount="Dès 290 CHF" label="par mois" className="mt-8" />
              <div className="mt-8">
                <PrimaryButton href="/#contact">
                  Réserver un appel de cadrage
                </PrimaryButton>
              </div>
            </Reveal>
          </Container>
        </section>

        <section className="py-24 md:py-32">
          <Container>
            <Reveal>
              <StepList steps={INCLUDED_STEPS} />
            </Reveal>
          </Container>
        </section>

        <TrustBar
          items={[
            "Résiliable chaque mois, sans engagement de durée.",
            "Un même interlocuteur suit votre dossier d'un mois à l'autre.",
            "Conforme nLPD et Code des obligations suisse.",
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
