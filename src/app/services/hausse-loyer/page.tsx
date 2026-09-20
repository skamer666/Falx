import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import { Container, PriceBadge, TrustBar } from "@/components/site/ui";
import RentCalculator from "./components/RentCalculator";

export const metadata: Metadata = {
  title: "Contestation de hausse de loyer en Suisse | Thrax Legal",
  description:
    "Calculez si la hausse de votre loyer est légale et générez votre contestation officielle.",
};

export default function HausseLoyerPage() {
  return (
    <>
      <Nav />
      <main className="bg-bg text-text">
        <section className="border-b border-border">
          <Container className="mx-auto max-w-3xl py-24 text-center md:py-32">
            <Reveal>
              <h1 className="text-[2.25rem] font-semibold leading-[1.1] tracking-[-0.02em] text-text sm:text-5xl md:text-6xl">
                Votre régie vous demande trop. Ne payez pas l&rsquo;inflation.
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-text-muted">
                Calculez si la hausse de votre loyer est légale et générez
                votre contestation officielle.
              </p>
              <PriceBadge
                amount="190 CHF"
                label="Kit de contestation, paiement unique"
                className="mt-8"
              />
            </Reveal>
          </Container>
        </section>

        <section className="py-16 md:py-24">
          <Container className="mx-auto max-w-2xl">
            <Reveal>
              <RentCalculator />
            </Reveal>
          </Container>
        </section>

        <TrustBar
          items={[
            "Le délai pour contester une hausse de loyer devant la Commission de conciliation est de 30 jours dès réception de l'avis.",
            "La contestation ne peut pas entraîner de résiliation du bail par la régie.",
            "Conforme au droit suisse du bail (art. 269 ss CO).",
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
