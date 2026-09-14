import Reveal from "@/components/Reveal";
import { Container, SectionHeading } from "./ui";

const STEPS = [
  {
    step: "01",
    title: "Répondez à un questionnaire guidé",
    text: "Quelques questions ciblées sur votre activité, votre canton et vos besoins — pas de jargon juridique.",
  },
  {
    step: "02",
    title: "Le moteur structure votre document",
    text: "Falx applique les articles du Code des obligations et de la nLPD pertinents à votre situation.",
  },
  {
    step: "03",
    title: "Revue par un juriste partenaire",
    text: "Selon votre formule, un juriste vérifie et valide le document avant finalisation.",
  },
  {
    step: "04",
    title: "Signature et archivage",
    text: "Signature électronique qualifiée et archivage sécurisé, prêts pour authentification ou dépôt.",
  },
];

export default function HowItWorks() {
  return (
    <section id="comment-ca-marche" className="bg-papier-dim/60 py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            kicker="Le processus"
            title="De l'idée au document signé, en quatre étapes."
          />
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-4 md:gap-6">
          {STEPS.map((item, index) => (
            <Reveal key={item.step} delay={index * 100}>
              <div className="relative pl-0">
                <span className="font-serif-display text-3xl text-sapin">
                  {item.step}
                </span>
                <h3 className="mt-4 text-base font-medium text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {item.text}
                </p>
                {index < STEPS.length - 1 ? (
                  <div className="mt-6 hidden h-px w-full bg-ligne md:block" />
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
