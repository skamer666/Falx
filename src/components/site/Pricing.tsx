import Reveal from "@/components/Reveal";
import { Container, GhostButton, PrimaryButton, SectionHeading } from "./ui";

const PLANS = [
  {
    name: "Essentiel",
    price: "CHF 490",
    unit: "par document",
    description: "Pour un besoin ponctuel : un contrat, une constitution de Sàrl, un registre nLPD.",
    features: [
      "Génération guidée illimitée",
      "Un document finalisé",
      "Export PDF prêt à authentifier",
    ],
    cta: "Commencer",
    featured: false,
  },
  {
    name: "Business",
    price: "CHF 190",
    unit: "par mois",
    description: "Pour les PME avec des besoins juridiques réguliers et une équipe qui grandit.",
    features: [
      "Documents illimités",
      "Revue par un juriste partenaire",
      "Bibliothèque de modèles sectoriels",
      "Support prioritaire",
    ],
    cta: "Démarrer l'essai",
    featured: true,
  },
  {
    name: "Sur-mesure",
    price: "Sur devis",
    unit: "",
    description: "Pour les groupes, fiduciaires et cabinets qui souhaitent intégrer Falx à leur pratique.",
    features: [
      "Accès API",
      "Modèles personnalisés",
      "Juriste dédié",
      "SLA et facturation entreprise",
    ],
    cta: "Parler à l'équipe",
    featured: false,
  },
];

export default function Pricing() {
  return (
    <section id="tarifs" className="py-28 md:py-40">
      <Container>
        <Reveal>
          <SectionHeading
            kicker="Tarifs"
            title="Une tarification transparente, sans frais cachés."
            description="Pas d'engagement, pas de surprise. Vous savez exactement ce que vous payez, avant de commencer."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PLANS.map((plan, index) => (
            <Reveal key={plan.name} delay={index * 100}>
              <div
                className={`flex h-full flex-col rounded-2xl border p-8 ${
                  plan.featured
                    ? "border-sapin bg-encre text-papier shadow-[0_30px_60px_-30px_rgba(15,61,46,0.5)]"
                    : "border-ligne bg-papier"
                }`}
              >
                <h3
                  className={`text-lg font-medium ${
                    plan.featured ? "text-papier" : "text-ink"
                  }`}
                >
                  {plan.name}
                </h3>
                <p className="mt-4">
                  <span className="font-serif-display text-3xl">
                    {plan.price}
                  </span>
                  {plan.unit ? (
                    <span
                      className={`ml-2 text-sm ${
                        plan.featured ? "text-ivory-muted" : "text-ink-muted"
                      }`}
                    >
                      {plan.unit}
                    </span>
                  ) : null}
                </p>
                <p
                  className={`mt-3 text-sm leading-relaxed ${
                    plan.featured ? "text-ivory-muted" : "text-ink-muted"
                  }`}
                >
                  {plan.description}
                </p>

                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className={`flex items-start gap-2.5 text-sm ${
                        plan.featured ? "text-papier" : "text-ink"
                      }`}
                    >
                      <span
                        className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                          plan.featured ? "bg-sapin-pale" : "bg-sapin"
                        }`}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  {plan.featured ? (
                    <PrimaryButton href="#demarrer" className="w-full">
                      {plan.cta}
                    </PrimaryButton>
                  ) : (
                    <GhostButton
                      href="#demarrer"
                      className="w-full border border-ligne no-underline hover:border-ink/40"
                    >
                      {plan.cta}
                    </GhostButton>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
