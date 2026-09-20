import Reveal from "@/components/Reveal";
import { Container, StepList } from "./ui";

const STEPS = [
  {
    title: "Tarifs forfaitaires",
    description:
      "Le prix annoncé est le prix payé. Jamais de facturation à l'heure, jamais de surprise.",
  },
  {
    title: "Tout en ligne",
    description:
      "Aucun rendez-vous physique nécessaire. Chaque dossier se traite depuis votre espace client.",
  },
  {
    title: "Livraison garantie 24-48h",
    description:
      "Un délai contractuel, pas une estimation. Vous savez exactement quand votre document arrive.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20">
      <Container>
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-center text-[30px] font-semibold leading-[1.1] tracking-[-0.02em] text-text md:text-[48px]">
            Une autre manière de travailler avec un juriste.
          </h2>
          <StepList steps={STEPS} className="mt-14" />
        </Reveal>
      </Container>
    </section>
  );
}
