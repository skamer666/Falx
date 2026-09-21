import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import FaqAccordion from "@/components/site/FaqAccordion";
import {
  Container,
  LawyerComparison,
  PriceBadge,
  StepList,
  TrustBar,
} from "@/components/site/ui";
import CertificateAnalyzer from "./components/CertificateAnalyzer";

export const metadata: Metadata = {
  title: "Certificat de travail : décryptage des formulations codées | Thrax Legal",
  description:
    "Auditez votre certificat de travail en quelques secondes et obtenez votre mise en demeure prête à envoyer.",
};

const STEPS = [
  {
    title: "Collez le texte",
    description:
      "Copiez le paragraphe d'évaluation de votre certificat dans l'outil d'analyse, gratuitement.",
  },
  {
    title: "Recevez l'analyse",
    description:
      "Les formulations à risque sont identifiées, sourcées et expliquées une par une.",
  },
  {
    title: "Agissez",
    description:
      "Téléchargez votre mise en demeure prête à envoyer, rédigée selon l'art. 330a CO.",
  },
];

const FAQ = [
  {
    q: "Pourquoi les certificats de travail utilisent-ils un langage codé ?",
    a: "Une pratique répandue en ressources humaines consiste à formuler des évaluations en apparence neutres, voire positives, mais en réalité défavorables. Le droit suisse interdit les formulations ambiguës ou les sous-entendus dans un certificat de travail, mais la jurisprudence refuse de généraliser un « dictionnaire de codes » : chaque formulation s'apprécie dans le contexte de l'ensemble du document (art. 330a CO).",
  },
  {
    q: "Que se passe-t-il si mon employeur refuse de corriger le certificat ?",
    a: "La procédure devant le Tribunal des prud'hommes est gratuite pour ce type de litige en Suisse.",
  },
  {
    q: "Combien de temps faut-il pour recevoir mon rapport ?",
    a: "Le rapport détaillé est généré immédiatement après le paiement, directement dans votre navigateur.",
  },
  {
    q: "Et si mon certificat ne contient finalement rien d'anormal ?",
    a: "L'analyse gratuite vous le signale avant tout paiement. Vous ne payez que si vous décidez de commander le rapport détaillé et la mise en demeure.",
  },
  {
    q: "Thrax Legal est-il un cabinet d'avocats ?",
    a: "Non. Thrax Legal n'est pas un cabinet d'avocats et n'assure pas la représentation devant les tribunaux, réservée aux avocats inscrits à un registre cantonal suisse. Si votre employeur refuse de corriger le certificat malgré la mise en demeure, un avocat pourra vous représenter devant le Tribunal des prud'hommes.",
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
        <section className="relative isolate overflow-hidden border-b border-border">
          <Image
            src="/media/photos/certificat-travail.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-30 grayscale"
          />
          <div aria-hidden className="absolute inset-0 bg-bg/80" />
          <Container className="relative mx-auto max-w-3xl py-24 text-center md:py-32">
            <Reveal>
              <h1 className="text-[2.25rem] font-semibold leading-[1.1] tracking-[-0.02em] text-text sm:text-5xl md:text-6xl">
                Votre employeur a-t-il ruiné votre CV en cachette ?
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-text-muted">
                Une formulation en apparence anodine dans un certificat de
                travail a déjà fait l&rsquo;objet de dizaines de décisions de
                justice en Suisse. Auditez gratuitement le vôtre en quelques
                secondes, avant votre prochaine candidature.
              </p>
              <PriceBadge
                amount="99 CHF"
                label="Rapport complet, paiement unique"
                className="mt-8"
              />
              <p className="mt-4 text-sm text-text-muted">
                Analyse gratuite, sans engagement. Remboursé sous 14 jours si
                besoin.
              </p>
            </Reveal>
          </Container>
        </section>

        <section className="theme-light bg-bg py-16 md:py-24">
          <Container className="mx-auto max-w-2xl">
            <Reveal>
              <CertificateAnalyzer />
            </Reveal>
          </Container>
        </section>

        <div className="theme-light bg-bg">
          <TrustBar
            items={[
              "Le droit suisse interdit les sous-entendus et les formulations ambiguës dans un certificat de travail (art. 330a CO).",
              "Procédure aux Prud'hommes gratuite en cas de refus de correction par l'employeur.",
              "Conforme nLPD, aucune donnée conservée après l'analyse.",
            ]}
          />
        </div>

        <section className="theme-light bg-surface py-16 md:py-24">
          <Container className="mx-auto max-w-2xl">
            <Reveal>
              <h2 className="text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-text">
                Le prix d&rsquo;un avocat, sans l&rsquo;avocat
              </h2>
              <LawyerComparison
                className="mt-8"
                lawyerRange="300 à 1200 CHF"
                lawyerNote="Pour une consultation et la rédaction d'une mise en demeure, soit environ 1 à 2 heures facturées."
                thraxPrice="99 CHF"
                thraxNote="Rapport détaillé et mise en demeure inclus, livrés immédiatement après paiement."
              />
            </Reveal>
          </Container>
        </section>

        <section className="theme-light bg-bg py-16 md:py-24">
          <Container className="mx-auto max-w-2xl">
            <Reveal>
              <h2 className="text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-text">
                Comment ça marche
              </h2>
              <StepList steps={STEPS} className="mt-8" />
            </Reveal>
          </Container>
        </section>

        <section className="theme-light bg-surface py-16 md:py-24">
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
