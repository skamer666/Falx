import Link from "next/link";
import Reveal from "@/components/Reveal";
import { Container } from "./ui";

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
    <section className="theme-light bg-bg py-20">
      <Container>
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-text-muted">
            Comment ça marche
          </p>
          <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-xl text-[30px] font-semibold leading-[1.1] tracking-[-0.02em] text-text md:text-[48px]">
              Une autre manière de travailler avec un juriste.
            </h2>
            <Link
              href="/abonnement-pme"
              className="inline-block shrink-0 border-b border-border pb-1 text-sm font-medium text-text transition-colors hover:border-white/40"
            >
              Réserver un appel ↗
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 divide-y divide-border border-t border-border">
          {STEPS.map((step, index) => (
            <Reveal key={step.title} delay={index * 60}>
              <div className="grid gap-2 py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-10">
                <h3 className="text-lg font-semibold tracking-[-0.01em] text-text">
                  {step.title}
                </h3>
                <p className="max-w-md text-sm leading-relaxed text-text-muted">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
