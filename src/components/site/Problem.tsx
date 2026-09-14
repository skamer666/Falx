import Reveal from "@/components/Reveal";
import { Container, SectionHeading } from "./ui";

const POINTS = [
  {
    figure: "CHF 300–500",
    label: "de l'heure",
    text: "Le tarif moyen d'un avocat traditionnel pour rédiger un contrat type ou constituer une société.",
  },
  {
    figure: "2–4",
    label: "semaines",
    text: "Le délai habituel pour obtenir un simple contrat de travail ou des conditions générales sur mesure.",
  },
  {
    figure: "1 sur 3",
    label: "PME suisses",
    text: "N'a toujours pas de registre de traitement conforme à la nouvelle Loi sur la protection des données.",
  },
];

export default function Problem() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            kicker="Le constat"
            title="Le droit suisse ne devrait pas être un frein à l'entrepreneuriat."
            description="Entre les honoraires horaires, les délais d'attente et la complexité du Code des obligations, la conformité juridique reste le premier obstacle des fondateurs et des PME."
          />
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-ligne bg-ligne md:grid-cols-3">
          {POINTS.map((point, index) => (
            <Reveal key={point.figure} delay={index * 100}>
              <div className="h-full bg-papier p-8">
                <p className="font-serif-display text-4xl text-sapin">
                  {point.figure}
                </p>
                <p className="mt-1 text-sm font-medium uppercase tracking-[0.12em] text-ink-muted">
                  {point.label}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                  {point.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
