import Reveal from "@/components/Reveal";
import { Container, GhostButton, PrimaryButton } from "./ui";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-10%,rgba(91,91,246,0.28),transparent)]"
      />
      <Container className="relative pb-20 pt-28 text-center md:pb-28 md:pt-36">
        <Reveal>
          <h1 className="mx-auto max-w-3xl text-[2.5rem] font-semibold leading-[1.08] tracking-tight text-text sm:text-6xl md:text-7xl">
            Vos droits, exécutés en 24h.{" "}
            <span className="text-accent">Prix fixes</span>, sans surprise.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-text-muted">
            Thrax Legal remplace les cabinets traditionnels, lents et
            opaques, par une infrastructure juridique structurée pour les
            PME et les particuliers suisses.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <PrimaryButton href="/abonnement-pme">
              Découvrir l&rsquo;abonnement PME
            </PrimaryButton>
            <GhostButton href="/services">
              Voir nos services ponctuels
            </GhostButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
