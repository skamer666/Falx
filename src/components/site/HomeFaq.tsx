import Reveal from "@/components/Reveal";
import FaqAccordion from "./FaqAccordion";
import { Container } from "./ui";

const FAQ = [
  {
    q: "Thrax Legal est-il un cabinet d'avocats ?",
    a: "Non. Thrax Legal n'est pas un cabinet d'avocats : nous ne portons pas le titre d'avocat et n'assurons pas la représentation devant les tribunaux, réservée aux avocats inscrits à un registre cantonal suisse. Nous vous fournissons en revanche des conseils et documents juridiques concrets pour agir vous-même. Pour une procédure nécessitant une représentation, nous vous orientons vers un avocat.",
  },
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
    <section className="theme-light bg-bg py-20">
      <Container>
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-text-muted">
              Questions fréquentes
            </p>
            <h2 className="mt-4 text-[30px] font-semibold leading-[1.1] tracking-[-0.02em] text-text md:text-[40px]">
              Tout savoir sur Thrax Legal.
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <FaqAccordion items={FAQ} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
