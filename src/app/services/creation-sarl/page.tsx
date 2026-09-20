import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import { Container, PriceBadge, PrimaryButton, TrustBar } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "Création de Sàrl clé en main | Thrax Legal",
  description:
    "Constitution de Sàrl clé en main avec pack de conformité nLPD inclus.",
};

export default function CreationSarlPage() {
  return (
    <>
      <Nav />
      <main className="bg-bg text-text">
        <section className="border-b border-border">
          <Container className="mx-auto max-w-3xl py-24 text-center md:py-32">
            <Reveal>
              <h1 className="text-[2.25rem] font-semibold leading-[1.1] tracking-[-0.02em] text-text sm:text-5xl md:text-6xl">
                Votre Sàrl, constituée sans détour.
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-text-muted">
                Statuts, capital social et réquisition au registre du
                commerce, avec un pack de conformité nLPD inclus dès le
                lancement.
              </p>
              <PriceBadge
                amount="Sur devis"
                label="Forfait fixe communiqué avant démarrage"
                className="mt-8"
              />
              <div className="mt-8">
                <PrimaryButton href="/#contact">
                  Demander un devis
                </PrimaryButton>
              </div>
            </Reveal>
          </Container>
        </section>

        <TrustBar
          items={[
            "Constitution conforme au droit suisse des sociétés (CO).",
            "Pack de conformité nLPD inclus : registre de traitement et politique de confidentialité.",
            "Un interlocuteur unique du premier statut à l'inscription au registre du commerce.",
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
