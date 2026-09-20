import Reveal from "@/components/Reveal";
import { CircleArrowLink, Container } from "./ui";

const PANELS = [
  {
    eyebrow: "Falx · Conformité LPD",
    title: "La confiance de vos clients, protégée durablement.",
    video: "/media/nouvelles/clip-03.mp4",
    href: "#produits",
    objectPosition: "left center",
  },
  {
    eyebrow: "Falx · Création de Sàrl",
    title: "Votre société, posée sur des bases solides.",
    video: "/media/nouvelles/clip-02.mp4",
    href: "#produits",
    objectPosition: "left center",
    mirror: true,
  },
  {
    eyebrow: "Falx · Contrats PME",
    title: "Vos baux et contrats commerciaux, sécurisés dès la signature.",
    video: "/media/nouvelles/clip-04.mp4",
    href: "#produits",
    objectPosition: "left center",
  },
];

export default function Showcase() {
  return (
    <section className="bg-papier">
      {PANELS.map((panel) => (
        <Reveal key={panel.eyebrow}>
          <div className="relative isolate flex min-h-[560px] items-end overflow-hidden md:min-h-[640px]">
            <video
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
              style={{
                objectPosition: panel.objectPosition,
                transform: panel.mirror ? "scaleX(-1)" : undefined,
              }}
            >
              <source src={panel.video} type="video/mp4" />
            </video>
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-encre/85 via-encre/25 to-transparent"
            />

            <Container className="relative pb-14 pt-24 md:pb-20">
              <p className="text-sm font-medium text-ivory-muted">
                {panel.eyebrow}
              </p>
              <h3 className="font-display mt-3 max-w-xl text-3xl leading-[1.1] text-papier md:text-5xl">
                {panel.title}
              </h3>
              <CircleArrowLink href={panel.href} tone="light" className="mt-8" />
            </Container>
          </div>
        </Reveal>
      ))}
    </section>
  );
}
