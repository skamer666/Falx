import Reveal from "@/components/Reveal";
import { CircleArrowLink, Container } from "./ui";

export default function Essential() {
  return (
    <section className="bg-papier pb-20 md:pb-28">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-lg rounded-3xl border border-ligne bg-papier-dim px-8 py-10 text-center">
            <h2 className="font-display text-2xl text-ink">L&rsquo;essentiel</h2>
            <p className="mt-3 text-base leading-relaxed text-ink-muted">
              1 PME suisse sur 3 n&rsquo;a toujours pas de registre de
              traitement conforme à la nLPD. Voici comment y remédier en
              quelques jours, pas en quelques mois.
            </p>
            <CircleArrowLink href="#securite" tone="dark" className="mt-6">
              Lire le guide
            </CircleArrowLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
