import Reveal from "@/components/Reveal";
import { Container } from "./ui";

export default function About() {
  return (
    <section className="border-b border-border py-20">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-[30px] font-semibold leading-[1.1] tracking-[-0.02em] text-text md:text-[48px]">
              Une infrastructure juridique, pas un cabinet de plus.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-text-muted">
              Thrax Legal package les démarches juridiques les plus
              fréquentes des PME et des particuliers suisses en services à
              prix fixe, livrés en 24 à 48 heures. Pas de facturation à
              l&rsquo;heure, pas de rendez-vous physique nécessaire.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
