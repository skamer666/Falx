import Reveal from "@/components/Reveal";
import { Container, SectionHeading } from "./ui";

const PILLARS = [
  {
    number: "01",
    title: "Création de Sàrl",
    text: "Statuts, capital social, procès-verbal de fondation et réquisition au registre du commerce — générés et prêts à authentifier.",
    tags: ["Statuts", "Registre du commerce", "Capital social"],
  },
  {
    number: "02",
    title: "Conformité LPD",
    text: "Registre des activités de traitement, politique de confidentialité et contrats de sous-traitance, alignés sur la nLPD.",
    tags: ["Registre de traitement", "Politique de confidentialité", "DPA"],
  },
  {
    number: "03",
    title: "Contrats PME",
    text: "Contrats de travail, CGV, accords de confidentialité et baux commerciaux, adaptés à votre secteur et votre canton.",
    tags: ["Contrats de travail", "CGV", "NDA"],
  },
];

export default function Pillars() {
  return (
    <section id="produits" className="py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            kicker="Nos modules"
            title="Un moteur juridique, pas un simple générateur de PDF."
            description="Trois modules, une même exigence : la précision du droit suisse, automatisée de bout en bout."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PILLARS.map((pillar, index) => (
            <Reveal key={pillar.number} delay={index * 100}>
              <div className="group h-full rounded-2xl border border-ligne bg-papier p-8 transition-all duration-300 hover:-translate-y-1 hover:border-sapin/30 hover:shadow-[0_24px_50px_-30px_rgba(15,61,46,0.35)]">
                <span className="font-serif-display text-sm text-ink-muted">
                  {pillar.number}
                </span>
                <h3 className="font-serif-display mt-4 text-2xl text-ink">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {pillar.text}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {pillar.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-sapin-pale px-3 py-1 text-xs font-medium text-sapin"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
