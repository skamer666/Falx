import Reveal from "@/components/Reveal";
import { Container, GhostButtonLight, PrimaryButton } from "./ui";

export default function FinalCta() {
  return (
    <section id="demarrer" className="relative overflow-hidden bg-encre py-28 md:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-[520px] -translate-x-1/2 rounded-full bg-sapin-light/20 blur-[120px]"
      />
      <Container className="relative text-center">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-sapin-pale/80">
            Falx
          </p>
          <h2 className="font-serif-display mx-auto mt-6 max-w-2xl text-3xl leading-[1.2] text-papier md:text-4xl">
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
