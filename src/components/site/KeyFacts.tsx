import Reveal from "@/components/Reveal";
import { Container } from "./ui";

const FACTS = [
  {
    value: "4",
    label: "Services productisés",
    description: "Chaque service couvre une démarche juridique précise, à prix fixe.",
  },
  {
    value: "24-48h",
    label: "Délai de livraison",
    description: "Un délai contractuel annoncé à l'avance, pas une estimation.",
  },
  {
    value: "89-229",
    label: "CHF par service",
    description: "Le prix affiché est le prix payé, sans facturation à l'heure.",
  },
  {
    value: "490",
    label: "CHF/mois dès",
    description: "Pour l'abonnement Direction Juridique Externalisée, résiliable chaque mois.",
  },
];

export default function KeyFacts() {
  return (
    <section className="theme-light border-y border-border bg-surface py-20">
      <Container>
        <div className="divide-y divide-border border-t border-border">
          {FACTS.map((fact, index) => (
            <Reveal key={fact.label} delay={index * 60}>
              <div className="grid gap-2 py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.6fr)] md:items-baseline md:gap-10">
                <p className="text-4xl font-semibold tracking-tight text-text">
                  {fact.value}
                </p>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-text-muted">
                  {fact.label}
                </p>
                <p className="max-w-md text-sm leading-relaxed text-text-muted">
                  {fact.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
