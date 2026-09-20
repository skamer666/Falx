import Reveal from "@/components/Reveal";
import { Container, PriceBadge, PrimaryButton } from "./ui";

const INCLUDED = [
  "Contrats illimités",
  "Mises en demeure incluses",
  "Conformité continue (nLPD, CO)",
  "Un interlocuteur dédié",
];

export default function B2BOffer() {
  return (
    <section id="contact" className="theme-light border-t border-border bg-surface py-20">
      <Container>
        <Reveal>
          <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-text-muted">
                Abonnement PME
              </p>
              <h2 className="mt-4 text-[30px] font-semibold leading-[1.1] tracking-[-0.02em] text-text md:text-[48px]">
                Direction Juridique Externalisée
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-text-muted">
                Un interlocuteur juridique unique pour votre PME, sans les
                coûts d&rsquo;un poste interne.
              </p>
              <ul className="mt-8 space-y-3">
                {INCLUDED.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-text"
                  >
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-bg p-10">
              <PriceBadge amount="Dès 290 CHF" label="par mois" />
              <p className="mt-6 text-sm leading-relaxed text-text-muted">
                Résiliable chaque mois. Un appel de cadrage de 20 minutes
                suffit pour définir le périmètre adapté à votre activité.
              </p>
              <PrimaryButton href="/abonnement-pme" className="mt-8 w-full">
                Réserver un appel de cadrage
              </PrimaryButton>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
