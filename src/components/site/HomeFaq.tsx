import Reveal from "@/components/Reveal";
import FaqAccordion from "./FaqAccordion";
import { Container } from "./ui";

const FAQ = [
  {
    q: "Comment se déroule un service ponctuel ?",
    a: "Vous choisissez un service, complétez les informations demandées en ligne, puis réglez le forfait annoncé. Le document ou la démarche est livré dans le délai contractuel indiqué sur la page du service.",
  },
  {
    q: "L'abonnement PME est-il engageant ?",
    a: "Non. La Direction Juridique Externalisée est résiliable chaque mois, sans durée minimale.",
  },
  {
    q: "Mes données sont-elles protégées ?",
    a: "Oui, chaque service est conçu pour respecter la nLPD. Les modalités précises sont détaillées sur chaque page de service.",
  },
];

export default function HomeFaq() {
  return (
    <section className="py-24 md:py-32">
      <Container className="mx-auto max-w-2xl">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight text-text md:text-4xl">
            Questions fréquentes
          </h2>
          <FaqAccordion items={FAQ} className="mt-10" />
        </Reveal>
      </Container>
    </section>
  );
}
