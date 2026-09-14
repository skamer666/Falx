import Reveal from "@/components/Reveal";
import { Container, SectionHeading } from "./ui";

/**
 * Témoignages d'exemple — à remplacer par de véritables retours clients
 * (avec autorisation explicite) avant la mise en ligne.
 */
const QUOTES = [
  {
    quote:
      "Falx m'a fait gagner trois semaines et plusieurs milliers de francs sur la création de ma Sàrl, sans sacrifier la rigueur juridique.",
    name: "Fondateur",
    role: "Sàrl technologique, Vaud",
  },
  {
    quote:
      "Notre registre de traitement nLPD était notre angle mort. Falx nous a permis de le mettre en conformité en une après-midi.",
    name: "Direction administrative",
    role: "PME industrielle, Zurich",
  },
  {
    quote:
      "Les contrats générés sont d'une précision que je n'attendais pas d'un outil automatisé. La revue juridique fait toute la différence.",
    name: "Associé fondateur",
    role: "Agence de conseil, Genève",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            kicker="Ils utilisent Falx"
            title="La confiance de fondateurs et de PME suisses."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {QUOTES.map((item, index) => (
            <Reveal key={item.name + item.role} delay={index * 100}>
              <figure className="flex h-full flex-col justify-between rounded-2xl border border-ligne bg-papier-dim/50 p-8">
                <blockquote className="font-serif-display text-lg italic leading-snug text-ink">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8 border-t border-ligne pt-4">
                  <p className="text-sm font-medium text-ink">{item.name}</p>
                  <p className="text-sm text-ink-muted">{item.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
