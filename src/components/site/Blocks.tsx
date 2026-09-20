import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import { CircleArrowLink, Container } from "./ui";

type Tone = "dark" | "light" | "gray";

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
  light: {
    bg: "bg-papier",
    text: "text-ink",
    sub: "text-ink-muted",
    badge: "bg-ink/5",
    arrow: "dark",
  },
  gray: {
    bg: "bg-sapin-pale",
    text: "text-ink",
    sub: "text-ink-muted",
    badge: "bg-ink/5",
    arrow: "dark",
  },
};

function BriefcaseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <rect
        x="4"
        y="8"
        width="16"
        height="11"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M9 8V6.5C9 5.67157 9.67157 5 10.5 5H13.5C14.3284 5 15 5.67157 15 6.5V8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M4 12.5H20" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <rect
        x="5.5"
        y="10.5"
        width="13"
        height="9"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M8.5 10.5V7.5C8.5 5.567 10.067 4 12 4C13.933 4 15.5 5.567 15.5 7.5V10.5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="12" cy="14.5" r="1.15" fill="currentColor" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path
        d="M7 4H14L18 8V19.5C18 20.0523 17.5523 20.5 17 20.5H7C6.44772 20.5 6 20.0523 6 19.5V4.5C6 3.94772 6.44772 4 7 4Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M14 4V8H18"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M9 12.5H15M9 16H12.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

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

type Block = {
  tone: Tone;
  heading: string;
  description: string;
  href: string;
  icon: ReactNode;
  id?: string;
};

const BLOCKS: Block[] = [
  {
    tone: "dark",
    heading: "Votre société, posée sur des bases solides.",
    description:
      "Statuts, capital social et réquisition au registre du commerce, préparés par des juristes suisses.",
    href: "#demarrer",
    icon: <BriefcaseIcon />,
    id: "produits",
  },
  {
    tone: "light",
    heading: "La confiance de vos clients, protégée durablement.",
    description:
      "Registre des activités de traitement et politique de confidentialité, alignés sur la nLPD.",
    href: "#demarrer",
    icon: <LockIcon />,
  },
  {
    tone: "gray",
    heading: "Vos contrats commerciaux, sécurisés dès la signature.",
    description:
      "Contrats de travail, CGV et baux commerciaux, adaptés à votre secteur et votre canton.",
    href: "#demarrer",
    icon: <DocumentIcon />,
  },
];

const SECOND_BLOCKS: Block[] = [
  {
    tone: "dark",
    heading: "Conçu pour la rigueur du droit suisse.",
    description:
      "Hébergement exclusif en Suisse, chiffrement de bout en bout et revue humaine sur chaque document sensible.",
    href: "#securite",
    icon: <ShieldIcon />,
    id: "securite",
  },
  {
    tone: "gray",
    heading: "Une tarification transparente, sans frais cachés.",
    description:
      "Dès CHF 190 par mois pour un accompagnement juridique complet, sans engagement.",
    href: "#tarifs",
    icon: <TagIcon />,
    id: "tarifs",
  },
];

function FeatureBlock({ tone, heading, description, href, icon, id }: Block) {
  const styles = TONE_STYLES[tone];
  return (
    <section id={id} className={`${styles.bg} py-16 md:py-20`}>
      <Container>
        <Reveal>
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-xl ${styles.badge} ${styles.text}`}
          >
            {icon}
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
