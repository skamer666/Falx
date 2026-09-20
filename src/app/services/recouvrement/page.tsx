import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import { Container, PriceBadge, TrustBar } from "@/components/site/ui";
import DebtCalculator from "./components/DebtCalculator";

export const metadata: Metadata = {
  title: "Recouvrement de créances : poursuite officielle en Suisse | Thrax Legal",
  description:
    "Ouvrez une poursuite officielle sans frais cachés. Forfait d'entrée fixe, commission au succès.",
};

export default function RecouvrementPage() {
  return (
    <>
      <Nav />
      <main className="bg-bg text-text">
        <section className="border-b border-border">
          <Container className="mx-auto max-w-3xl py-24 text-center md:py-32">
            <Reveal>
              <h1 className="text-[2.25rem] font-semibold leading-[1.1] tracking-tight text-text sm:text-5xl md:text-6xl">
                Transformez vos factures impayées en liquidités.
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-text-muted">
                Ouvrez une poursuite officielle en Suisse sans frais cachés.
                Forfait d&rsquo;entrée fixe, commission uniquement au
                succès.
              </p>
              <PriceBadge
                amount="89 CHF"
                label="Forfait de dépôt, paiement unique"
                className="mt-8"
              />
            </Reveal>
          </Container>
        </section>

        <section className="py-16 md:py-24">
          <Container className="mx-auto max-w-2xl">
            <Reveal>
              <DebtCalculator />
            </Reveal>
          </Container>
        </section>

        <TrustBar
          items={[
            "L'inscription d'une poursuite est la pression psychologique la plus forte en Suisse pour obtenir un paiement à l'amiable.",
            "Aucune commission si aucun montant n'est récupéré.",
            "Conforme à la loi fédérale sur la poursuite pour dettes et la faillite (LP).",
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
