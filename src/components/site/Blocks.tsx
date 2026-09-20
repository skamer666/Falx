import Image from "next/image";
import Reveal from "@/components/Reveal";
import { CircleArrowLink, Container } from "./ui";

type Tone = "dark" | "green" | "light" | "mint" | "navy";

const TONE_STYLES: Record<
  Tone,
  { bg: string; text: string; sub: string; badge: string; arrow: "light" | "dark" }
> = {
  dark: {
    bg: "bg-encre",
    text: "text-papier",
    sub: "text-ivory-muted",
    badge: "bg-white/10",
    arrow: "light",
  },
  green: {
    bg: "bg-sapin",
    text: "text-papier",
    sub: "text-ivory-muted",
    badge: "bg-white/10",
    arrow: "light",
  },
  navy: {
    bg: "bg-encre-soft",
    text: "text-papier",
    sub: "text-ivory-muted",
    badge: "bg-white/10",
    arrow: "light",
  },
  light: {
    bg: "bg-papier-dim",
    text: "text-ink",
    sub: "text-ink-muted",
    badge: "bg-papier",
    arrow: "dark",
  },
  mint: {
    bg: "bg-sapin-pale",
    text: "text-ink",
    sub: "text-ink-muted",
    badge: "bg-papier",
    arrow: "dark",
  },
};

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path
        d="M12 3.5L19 6.5V11.5C19 16 16 19 12 20.5C8 19 5 16 5 11.5V6.5L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M9 12L11 14L15.5 9.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path
        d="M12.5 4H19C19.5523 4 20 4.44772 20 5V11.5C20 11.7652 19.8946 12.0196 19.7071 12.2071L12.2071 19.7071C11.8166 20.0976 11.1834 20.0976 10.7929 19.7071L4.29289 13.2071C3.90237 12.8166 3.90237 12.1834 4.29289 11.7929L11.7929 4.29289C11.9804 4.10536 12.2348 4 12.5 4Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="15.5" cy="8.5" r="1.25" fill="currentColor" />
    </svg>
  );
}

const BLOCKS: {
  tone: Tone;
  heading: string;
  description: string;
  href: string;
  icon: { kind: "image"; src: string } | { kind: "svg"; node: React.ReactNode };
  id?: string;
}[] = [
  {
    tone: "dark",
    heading: "Votre société, posée sur des bases solides.",
    description:
      "Statuts, capital social et réquisition au registre du commerce, préparés par des juristes suisses.",
    href: "#demarrer",
    icon: { kind: "image", src: "/media/vivid/icons/wallet-cash.jpg" },
    id: "produits",
  },
  {
    tone: "light",
    heading: "La confiance de vos clients, protégée durablement.",
    description:
      "Registre des activités de traitement et politique de confidentialité, alignés sur la nLPD.",
    href: "#demarrer",
    icon: { kind: "image", src: "/media/vivid/icons/scroll-coins.jpg" },
  },
  {
    tone: "green",
    heading: "Vos contrats commerciaux, sécurisés dès la signature.",
    description:
      "Contrats de travail, CGV et baux commerciaux, adaptés à votre secteur et votre canton.",
    href: "#demarrer",
    icon: { kind: "image", src: "/media/vivid/icons/card-scroll-coins.jpg" },
  },
];

const SECOND_BLOCKS: {
  tone: Tone;
  heading: string;
  description: string;
  href: string;
  icon: { kind: "image"; src: string } | { kind: "svg"; node: React.ReactNode };
  id?: string;
}[] = [
  {
    tone: "mint",
    heading: "Conçu pour la rigueur du droit suisse.",
    description:
      "Hébergement exclusif en Suisse, chiffrement de bout en bout et revue humaine sur chaque document sensible.",
    href: "#securite",
    icon: { kind: "svg", node: <ShieldIcon /> },
    id: "securite",
  },
  {
    tone: "navy",
    heading: "Une tarification transparente, sans frais cachés.",
    description:
      "Dès CHF 190 par mois pour un accompagnement juridique complet, sans engagement.",
    href: "#tarifs",
    icon: { kind: "svg", node: <TagIcon /> },
    id: "tarifs",
  },
];

function FeatureBlock({
  tone,
  heading,
  description,
  href,
  icon,
  id,
}: {
  tone: Tone;
  heading: string;
  description: string;
  href: string;
  icon: { kind: "image"; src: string } | { kind: "svg"; node: React.ReactNode };
  id?: string;
}) {
  const styles = TONE_STYLES[tone];
  return (
    <section id={id} className={`${styles.bg} py-16 md:py-20`}>
      <Container>
        <Reveal>
          <div
            className={`flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl ${styles.badge}`}
          >
            {icon.kind === "image" ? (
              <Image
                src={icon.src}
                alt=""
                width={36}
                height={36}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className={styles.text}>{icon.node}</span>
            )}
          </div>
          <h2
            className={`font-display mt-6 max-w-md text-2xl leading-[1.15] md:text-3xl ${styles.text}`}
          >
            {heading}
          </h2>
          <p className={`mt-3 max-w-sm text-base leading-relaxed ${styles.sub}`}>
            {description}
          </p>
          <CircleArrowLink href={href} tone={styles.arrow} className="mt-7" />
        </Reveal>
      </Container>
    </section>
  );
}

export default function Blocks() {
  return (
    <>
      {BLOCKS.map((block) => (
        <FeatureBlock key={block.heading} {...block} />
      ))}

      <section className="bg-papier py-20 text-center md:py-28">
        <Reveal>
          <Container>
            <h2 className="font-display mx-auto max-w-lg text-2xl leading-[1.2] text-ink md:text-3xl">
              Le droit suisse, sans la friction habituelle.
            </h2>
            <p className="mx-auto mt-3 max-w-sm text-base leading-relaxed text-ink-muted">
              Des juristes suisses vous accompagnent à chaque étape, sans
              jargon inutile.
            </p>
          </Container>
        </Reveal>
      </section>

      {SECOND_BLOCKS.map((block) => (
        <FeatureBlock key={block.heading} {...block} />
      ))}
    </>
  );
}
