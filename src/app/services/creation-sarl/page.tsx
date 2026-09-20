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
  PrimaryButton,
  StepList,
  TrustBar,
} from "@/components/site/ui";

export const metadata: Metadata = {
  title: "Création de Sàrl clé en main dès 590 CHF | Thrax Legal",
  description:
    "Constitution de Sàrl à prix fixe dès 590 CHF, avec pack de conformité nLPD inclus.",
};

const STEPS = [
  {
    title: "Devis gratuit",
    description:
      "Vous décrivez votre projet, le forfait fixe est communiqué avant tout engagement.",
  },
  {
    title: "Constitution du dossier",
    description:
      "Statuts, capital social et réquisition au registre du commerce sont préparés pour vous.",
  },
  {
    title: "Inscription et conformité",
    description:
      "Une fois inscrite, votre Sàrl reçoit son pack de conformité nLPD, prêt à l'emploi.",
  },
];

const FAQ = [
  {
    q: "Pourquoi le prix est-il « dès 590 CHF » et non un montant fixe unique ?",
    a: "590 CHF couvre une constitution standard à associé unique. Le devis gratuit confirme le prix exact selon votre situation (nombre d'associés, apports en nature), fixé avant tout paiement et ne variant plus ensuite.",
  },
  {
    q: "Combien de temps prend la constitution d'une Sàrl ?",
    a: "Le délai dépend principalement du registre du commerce cantonal. Le dossier est préparé et déposé dans les meilleurs délais dès réception des documents nécessaires.",
  },
  {
    q: "Qu'est-ce que le pack de conformité nLPD inclus ?",
    a: "Un registre de traitement des données et une politique de confidentialité type, adaptés à votre activité, prêts dès l'inscription de votre société.",
  },
];

export default function CreationSarlPage() {
  return (
    <>
      <Nav />
      <main className="bg-bg text-text">
        <section className="relative isolate overflow-hidden border-b border-border">
          <Image
            src="/media/photos/creation-sarl.jpg"
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
                Créez votre Sàrl sans mauvaise surprise sur le prix.
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-text-muted">
                Statuts, capital social et réquisition au registre du
                commerce, avec un pack de conformité nLPD inclus dès le
                lancement. Le forfait est fixé avant que vous ne payiez quoi
                que ce soit.
              </p>
              <PriceBadge
                amount="Dès 590 CHF"
                label="Forfait fixe, hors frais de registre"
                className="mt-8"
              />
              <div className="mt-8">
                <PrimaryButton href="/#contact">
                  Demander mon devis gratuit
                </PrimaryButton>
              </div>
              <p className="mt-4 text-sm text-text-muted">
                Devis gratuit et sans engagement, prix fixé avant démarrage.
              </p>
            </Reveal>
          </Container>
        </section>

        <div className="theme-light bg-bg">
          <TrustBar
            items={[
              "Constitution conforme au droit suisse des sociétés (CO).",
              "Pack de conformité nLPD inclus : registre de traitement et politique de confidentialité.",
              "Un interlocuteur unique du premier statut à l'inscription au registre du commerce.",
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
                lawyerRange="750 à 3000 CHF"
                lawyerNote="Pour l'accompagnement juridique de la constitution, soit environ 3 à 5 heures facturées (hors frais de notaire et de registre)."
                thraxPrice="Dès 590 CHF"
                thraxNote="Forfait de service fixe, hors frais de registre, communiqué avant tout paiement."
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
