import Reveal from "@/components/Reveal";
import { Container } from "./ui";

export default function About() {
  return (
    <section className="theme-light border-b border-border bg-bg py-20">
      <Container>
        <Reveal>
          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)]">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-text-muted">
              À propos
            </p>
            <div>
              <p className="text-[26px] font-semibold leading-[1.2] tracking-[-0.02em] text-text md:text-[36px]">
                Thrax Legal package les démarches juridiques les plus
                fréquentes des PME et des particuliers suisses en services à
                prix fixe.
              </p>
              <p className="mt-6 text-[26px] font-normal leading-[1.2] tracking-[-0.02em] text-text-muted md:text-[36px]">
                Pas de facturation à l&rsquo;heure, pas de rendez-vous
                physique nécessaire, livré en 24 à 48 heures.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
