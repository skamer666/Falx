import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import FaqAccordion from "@/components/site/FaqAccordion";
import { Container, PriceBadge, TrustBar } from "@/components/site/ui";
import CertificateAnalyzer from "./components/CertificateAnalyzer";

export const metadata: Metadata = {
  title: "Certificat de travail : décryptage des formulations codées | Thrax Legal",
  description:
    "Auditez votre certificat de travail en quelques secondes et obtenez votre mise en demeure prête à envoyer.",
};

const FAQ = [
  {
    q: "Pourquoi les certificats de travail utilisent-ils un langage codé ?",
    a: "Une pratique répandue en ressources humaines consiste à formuler des évaluations en apparence neutres, voire positives, mais légalement défavorables. Le Tribunal fédéral interdit ces formulations ambiguës.",
  },
  {
    q: "Que se passe-t-il si mon employeur refuse de corriger le certificat ?",
    a: "La procédure devant le Tribunal des prud'hommes est gratuite pour ce type de litige en Suisse.",
  },
  {
    q: "Mes données sont-elles conservées ?",
    a: "Non. Le texte analysé n'est pas stocké après génération de votre rapport, conformément à la nLPD.",
  },
];

export default function CertificatTravailPage() {
  return (
    <>
      <Nav />
      <main className="bg-bg text-text">
        <section className="border-b border-border">
          <Container className="mx-auto max-w-3xl py-24 text-center md:py-32">
            <Reveal>
              <h1 className="text-[2.25rem] font-semibold leading-[1.1] tracking-[-0.02em] text-text sm:text-5xl md:text-6xl">
                Votre employeur a-t-il ruiné votre CV en cachette ?
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-text-muted">
                7 employeurs suisses sur 10 utilisent un langage RH
                illégalement codé. Auditez votre certificat de travail en
                quelques secondes.
              </p>
              <PriceBadge
                amount="149 CHF"
                label="Rapport complet, paiement unique"
                className="mt-8"
              />
            </Reveal>
          </Container>
        </section>

        <section className="py-16 md:py-24">
          <Container className="mx-auto max-w-2xl">
            <Reveal>
              <CertificateAnalyzer />
            </Reveal>
          </Container>
        </section>

        <TrustBar
          items={[
            "Le Tribunal fédéral interdit l'usage de formulations codées dans les certificats de travail.",
            "Procédure aux Prud'hommes gratuite en cas de refus de correction par l'employeur.",
            "Conforme nLPD — aucune donnée conservée après l'analyse.",
          ]}
        />

        <section className="py-16 md:py-24">
          <Container className="mx-auto max-w-2xl">
            <Reveal>
              <h2 className="text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-text">
                Questions fréquentes
              </h2>
              <FaqAccordion items={FAQ} className="mt-8" />
            </Reveal>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
