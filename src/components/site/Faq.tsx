import Reveal from "@/components/Reveal";
import { Container, SectionHeading } from "./ui";

const QUESTIONS = [
  {
    q: "Les documents générés par Falx ont-ils une valeur juridique ?",
    a: "Oui. Chaque document s'appuie sur le Code des obligations et les bases légales suisses pertinentes. Pour les actes soumis à authentification (comme les statuts de Sàrl), le document généré est prêt à être présenté devant notaire.",
  },
  {
    q: "Falx remplace-t-il un avocat ?",
    a: "Falx automatise la production documentaire. Pour les situations complexes ou les documents nécessitant une revue approfondie, nos formules incluent l'intervention de juristes partenaires.",
  },
  {
    q: "Où sont hébergées mes données ?",
    a: "Exclusivement en Suisse, sur une infrastructure dédiée, chiffrée et conforme à la nLPD.",
  },
  {
    q: "Puis-je utiliser Falx pour une entreprise déjà existante ?",
    a: "Oui. Au-delà de la création de Sàrl, Falx couvre la mise en conformité continue (nLPD) et la génération de contrats pour des entreprises déjà en activité.",
  },
  {
    q: "Quelles langues sont supportées ?",
    a: "Le français, l'allemand, l'italien et l'anglais, pour s'adapter à la réalité plurilingue des PME suisses.",
  },
];

export default function Faq() {
  return (
    <section className="bg-papier-dim/60 py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading kicker="Questions fréquentes" title="Tout ce qu'il faut savoir avant de commencer." />
        </Reveal>

        <div className="mt-14 divide-y divide-ligne border-t border-b border-ligne">
          {QUESTIONS.map((item, index) => (
            <Reveal key={item.q} delay={index * 60}>
              <details className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left">
                  <span className="text-base font-medium text-ink md:text-lg">
                    {item.q}
                  </span>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ligne text-ink-muted transition-transform duration-300 group-open:rotate-45">
                    <svg viewBox="0 0 12 12" fill="none" className="h-3 w-3">
                      <path
                        d="M6 1V11M1 6H11"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-muted">
                  {item.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
