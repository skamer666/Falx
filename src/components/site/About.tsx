import Reveal from "@/components/Reveal";
import { Container } from "./ui";

export default function About() {
  return (
    <section className="border-b border-border py-24 md:py-32">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-text md:text-4xl">
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
