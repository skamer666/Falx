import Image from "next/image";
import Reveal from "@/components/Reveal";
import { Container, SectionHeading } from "./ui";

const PILLARS = [
  {
    number: "01",
    title: "Création de Sàrl",
    text: "Statuts, capital social, procès-verbal de fondation et réquisition au registre du commerce, générés et prêts à authentifier.",
    tags: ["Statuts", "Registre du commerce", "Capital social"],
    image: "/media/vivid/icons/wallet-cash.jpg",
  },
  {
    number: "02",
    title: "Conformité LPD",
    text: "Registre des activités de traitement, politique de confidentialité et contrats de sous-traitance, alignés sur la nLPD.",
    tags: ["Registre de traitement", "Politique de confidentialité", "DPA"],
    image: "/media/vivid/icons/scroll-coins.jpg",
  },
  {
    number: "03",
    title: "Contrats PME",
    text: "Contrats de travail, CGV, accords de confidentialité et baux commerciaux, adaptés à votre secteur et votre canton.",
    tags: ["Contrats de travail", "CGV", "NDA"],
    image: "/media/vivid/icons/card-scroll-coins.jpg",
  },
];

export default function Pillars() {
  return (
    <section id="produits" className="pb-28 pt-16 md:pb-40 md:pt-20">
      <Container>
        <Reveal>
          <SectionHeading
            kicker="Nos domaines d'expertise"
            title="Des juristes suisses, pas un simple outil automatisé."
            description="Trois domaines d'expertise couverts par notre équipe de juristes, avec la même exigence de précision à chaque dossier."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PILLARS.map((pillar, index) => (
            <Reveal key={pillar.number} delay={index * 100}>
              <div className="flex h-full flex-col rounded-2xl border border-ligne bg-papier p-8">
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg text-ink-muted">
                    {pillar.number}
                  </span>
                  <div className="relative h-14 w-14 overflow-hidden rounded-xl">
                    <Image
                      src={pillar.image}
                      alt=""
                      fill
                      quality={90}
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                </div>
                <h3 className="font-display mt-6 text-2xl text-ink">
                  {pillar.title}
                </h3>
                <p className="mt-3 flex-1 text-base leading-relaxed text-ink-muted">
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
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
