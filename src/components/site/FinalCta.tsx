import Reveal from "@/components/Reveal";
import { Container, GhostButtonLight, PrimaryButton } from "./ui";

export default function FinalCta() {
  return (
    <section id="demarrer" className="relative isolate overflow-hidden bg-encre py-28 md:py-40">
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      >
        <source src="/media/transitions/degrade.mp4" type="video/mp4" />
      </video>
      <div aria-hidden className="absolute inset-0 bg-encre/40" />
      <Container className="relative text-center">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-sapin-pale/80">
            Falx
          </p>
          <h2 className="font-display mx-auto mt-6 max-w-2xl text-3xl leading-[1.2] text-papier md:text-4xl">
            L&rsquo;entrepreneuriat suisse mérite une infrastructure juridique
            à la hauteur de son ambition.
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <PrimaryButton href="#">Démarrer ma Sàrl</PrimaryButton>
            <GhostButtonLight href="#">Parler à l&rsquo;équipe</GhostButtonLight>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
