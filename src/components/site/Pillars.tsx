import Reveal from "@/components/Reveal";
import { Container, SectionHeading } from "./ui";

const PILLARS = [
  {
    number: "01",
    title: "Création de Sàrl",
    text: "Statuts, capital social, procès-verbal de fondation et réquisition au registre du commerce, générés et prêts à authentifier.",
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
    <section id="produits" className="py-28 md:py-40">
      <Container>
        <Reveal>
          <SectionHeading
            kicker="Nos domaines d'expertise"
            title="Des juristes suisses, pas un simple outil automatisé."
            description="Trois domaines d'expertise couverts par notre équipe de juristes, avec la même exigence de précision à chaque dossier."
          />
        </Reveal>

        <div className="mt-20 divide-y divide-ligne">
          {PILLARS.map((pillar, index) => (
            <Reveal key={pillar.number} delay={index * 100}>
              <div className="grid gap-4 py-10 first:pt-0 last:pb-0 md:grid-cols-[80px_1fr_1.1fr] md:gap-10">
                <span className="font-serif-display text-lg text-ink-muted">
                  {pillar.number}
                </span>
                <h3 className="font-serif-display text-2xl text-ink md:text-3xl">
                  {pillar.title}
                </h3>
                <div>
                  <p className="max-w-md text-base leading-relaxed text-ink-muted">
                    {pillar.text}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
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
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
