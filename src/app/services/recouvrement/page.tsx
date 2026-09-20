import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import FaqAccordion from "@/components/site/FaqAccordion";
import { Container, PriceBadge, StepList, TrustBar } from "@/components/site/ui";
import DebtCalculator from "./components/DebtCalculator";

export const metadata: Metadata = {
  title: "Recouvrement de créances : poursuite officielle en Suisse | Thrax Legal",
  description:
    "Ouvrez une poursuite officielle sans frais cachés. Forfait d'entrée fixe, commission au succès.",
};

const STEPS = [
  {
    title: "Estimez vos chances",
    description:
      "Le simulateur gratuit évalue vos chances de recouvrement selon le montant et le profil du débiteur.",
  },
  {
    title: "Déposez la réquisition",
    description:
      "Votre réquisition de poursuite est préparée et déposée à l'office des poursuites compétent.",
  },
  {
    title: "Récupérez votre dû",
    description:
      "Vous êtes informé à chaque étape. La commission n'est due qu'en cas de paiement effectif.",
  },
];

const FAQ = [
  {
    q: "Que se passe-t-il si le débiteur ne paie toujours pas ?",
    a: "Vous pouvez requérir la mainlevée ou la continuation de la poursuite jusqu'à la saisie, selon la situation du débiteur.",
  },
  {
    q: "Le forfait de 89 CHF est-il remboursé si la poursuite échoue ?",
    a: "Le forfait couvre le dépôt de la réquisition, qui a lieu quel que soit le résultat final. La commission au succès, elle, n'est due qu'en cas de récupération effective.",
  },
  {
    q: "Une créance ancienne peut-elle encore être recouvrée ?",
    a: "Cela dépend du délai de prescription applicable à votre créance. Plus une créance est ancienne, plus les chances de recouvrement diminuent : mieux vaut agir rapidement.",
  },
];

export default function RecouvrementPage() {
  return (
    <>
      <Nav />
      <main className="bg-bg text-text">
        <section className="relative isolate overflow-hidden border-b border-border">
          <Image
            src="/media/photos/recouvrement.jpg"
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
                Transformez vos factures impayées en liquidités.
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-text-muted">
                Ouvrez une poursuite officielle en Suisse sans frais cachés.
                Forfait d&rsquo;entrée fixe, commission uniquement au succès.
                Plus vous attendez, plus la créance est difficile à
                recouvrer.
              </p>
              <PriceBadge
                amount="89 CHF"
                label="Forfait de dépôt, paiement unique"
                className="mt-8"
              />
              <p className="mt-4 text-sm text-text-muted">
                Simulateur gratuit, sans engagement. Commission due uniquement
                en cas de succès.
              </p>
            </Reveal>
          </Container>
        </section>

        <section className="theme-light bg-bg py-16 md:py-24">
          <Container className="mx-auto max-w-2xl">
            <Reveal>
              <DebtCalculator />
            </Reveal>
          </Container>
        </section>

        <div className="theme-light bg-bg">
          <TrustBar
            items={[
              "L'inscription d'une poursuite est la pression psychologique la plus forte en Suisse pour obtenir un paiement à l'amiable.",
              "Aucune commission si aucun montant n'est récupéré.",
              "Conforme à la loi fédérale sur la poursuite pour dettes et la faillite (LP).",
            ]}
          />
        </div>

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
