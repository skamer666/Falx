import Reveal from "@/components/Reveal";
import { CircleArrowLink, Container } from "./ui";

type Item = {
  title: string;
  description: string;
  href: string;
  id?: string;
};

const PRACTICE: Item[] = [
  {
    title: "Création de Sàrl",
    description:
      "Statuts, capital social et réquisition au registre du commerce, préparés par des juristes suisses.",
    href: "#demarrer",
  },
  {
    title: "Conformité LPD",
    description:
      "Registre des activités de traitement et politique de confidentialité, alignés sur la nLPD.",
    href: "#demarrer",
  },
  {
    title: "Contrats PME",
    description:
      "Contrats de travail, CGV et baux commerciaux, adaptés à votre secteur et votre canton.",
    href: "#demarrer",
  },
];

const GUARANTEES: Item[] = [
  {
    title: "Sécurité",
    description:
      "Hébergement exclusif en Suisse, chiffrement de bout en bout et revue humaine sur chaque document sensible.",
    href: "#securite",
  },
  {
    title: "Tarifs",
    description:
      "Dès CHF 190 par mois pour un accompagnement juridique complet, sans engagement.",
    href: "#demarrer",
    id: "tarifs",
  },
];

function ItemRow({ title, description, href, id }: Item) {
  return (
    <Reveal>
      <div
        id={id}
        className="grid scroll-mt-28 gap-3 py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:items-baseline md:gap-16 md:py-14"
      >
        <h3 className="font-display text-[1.75rem] leading-[1.1] tracking-[-0.01em] text-ink md:text-[2.25rem]">
          {title}
        </h3>
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-10">
          <p className="max-w-md text-base leading-relaxed text-ink-muted md:text-lg">
            {description}
          </p>
          <CircleArrowLink href={href} tone="dark" className="shrink-0" />
        </div>
      </div>
    </Reveal>
  );
}

export default function Blocks() {
  return (
    <>
      <section id="produits" className="scroll-mt-24 bg-papier py-4 md:py-8">
        <Container>
          <div className="divide-y divide-ligne border-t border-ligne">
            {PRACTICE.map((item) => (
              <ItemRow key={item.title} {...item} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-encre py-24 text-center md:py-32">
        <Container>
          <Reveal>
            <p className="font-display mx-auto max-w-2xl text-2xl leading-[1.3] text-papier md:text-4xl">
              Le droit suisse, sans la friction habituelle.
            </p>
            <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-ivory-muted md:text-lg">
              Des juristes suisses vous accompagnent à chaque étape, sans
              jargon inutile.
            </p>
          </Reveal>
        </Container>
      </section>

      <section id="securite" className="scroll-mt-24 bg-papier-dim py-4 md:py-8">
        <Container>
          <div className="divide-y divide-ligne border-t border-ligne">
            {GUARANTEES.map((item) => (
              <ItemRow key={item.title} {...item} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
