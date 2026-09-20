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
    value: "89-190",
    label: "CHF par service",
    description: "Le prix affiché est le prix payé, sans facturation à l'heure.",
  },
  {
    value: "290",
    label: "CHF/mois dès",
    description: "Pour l'abonnement Direction Juridique Externalisée, résiliable chaque mois.",
  },
];

export default function KeyFacts() {
  return (
    <section className="border-y border-border bg-surface/30 py-20">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          {FACTS.map((fact, index) => (
            <Reveal key={fact.label} delay={index * 60}>
              <p className="text-4xl font-semibold tracking-tight text-text">
                {fact.value}
              </p>
              <p className="mt-2 text-sm font-medium text-text-muted">
                {fact.label}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                {fact.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
