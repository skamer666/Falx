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
  title: "Certificat de travail : analyse professionnelle | Thrax Legal",
  description:
    "Faites analyser votre certificat de travail par notre équipe juridique et recevez un rapport complet et sourcé sous 2 jours ouvrables.",
};

const STEPS = [
  {
    title: "Collez ou importez",
    description:
      "Copiez le texte de votre certificat, ou glissez directement le PDF : le texte est extrait dans votre navigateur.",
  },
  {
    title: "Commandez",
    description:
      "99 CHF, paiement unique. Mise en demeure prête à envoyer disponible en option (art. 330a CO).",
  },
  {
    title: "Recevez votre rapport",
    description:
      "Analyse complète du document par notre équipe juridique, avec sources, livrée sous 2 jours ouvrables.",
  },
];

const EXAMPLES = [
  {
    tier: "Confirmé par la jurisprudence",
    phrase: "« … a entretenu des relations conformes à nos attentes … »",
    explanation:
      "Cette tournure a été jugée porteuse d'un sous-entendu défavorable et contraire au principe de bienveillance. La jurisprudence lui préfère « a entretenu de bonnes relations » ou « d'excellentes relations » si la qualité du travailleur le justifie.",
    source: "Cour d'appel civile du Tribunal cantonal vaudois, HC/2014/8, consid. 5c",
  },
  {
    tier: "Signalé par la doctrine",
    phrase: "« … a fait preuve de bonne volonté … »",
    explanation:
      "Formulation répertoriée par la doctrine comme mettant l'accent sur l'intention plutôt que sur le résultat obtenu, ce qui peut sous-entendre un rendement jugé insuffisant.",
    source:
      "GEISER/MÜLLER, Arbeitsrecht in der Schweiz, 3e éd. 2015, N 700 s., cités in Martin Antipas, Certificats de travail, Neuchâtel 2018",
  },
];

const FAQ = [
  {
    q: "Pourquoi les certificats de travail utilisent-ils un langage codé ?",
    a: "Une pratique répandue en ressources humaines consiste à formuler des évaluations en apparence neutres, voire positives, mais en réalité défavorables. Le droit suisse interdit les formulations ambiguës ou les sous-entendus dans un certificat de travail, mais la jurisprudence refuse de généraliser un « dictionnaire de codes » : chaque formulation s'apprécie dans le contexte de l'ensemble du document (art. 330a CO).",
  },
  {
    q: "Combien de temps faut-il pour recevoir mon rapport ?",
    a: "Votre rapport est préparé par notre équipe juridique et livré sous 2 jours ouvrables après votre commande : ce délai correspond à une vraie relecture complète du document, pas à une génération automatique instantanée.",
  },
  {
    q: "Le paiement est-il sécurisé, et puis-je être remboursé ?",
    a: "Le paiement est traité par un prestataire de paiement sécurisé. Si l'analyse reçue ne vous convient pas, vous êtes remboursé sur simple demande dans les 14 jours suivant la livraison, sans justification à apporter.",
  },
  {
    q: "Et si mon certificat ne contient finalement rien d'anormal ?",
    a: "Vous recevez tout de même une relecture intégrale du document et une confirmation écrite et sourcée que celui-ci est conforme, à conserver pour votre dossier de candidature : ce n'est pas un échec de notre service, c'est le résultat de l'analyse.",
  },
  {
    q: "Que se passe-t-il si mon employeur refuse de corriger le certificat ?",
    a: "La procédure devant le Tribunal des prud'hommes est gratuite pour ce type de litige en Suisse.",
  },
  {
    q: "Thrax Legal est-il un cabinet d'avocats ?",
    a: "Non. Thrax Legal n'est pas un cabinet d'avocats et n'assure pas la représentation devant les tribunaux, réservée aux avocats inscrits à un registre cantonal suisse. Si votre employeur refuse de corriger le certificat malgré la mise en demeure, un avocat pourra vous représenter devant le Tribunal des prud'hommes.",
  },
  {
    q: "Mes données sont-elles conservées ?",
    a: "Thrax Legal ne stocke pas le texte de votre certificat après l'analyse. Il est transmis, avec votre consentement explicite, à notre prestataire d'analyse basé aux États-Unis dans le cadre de clauses contractuelles types reconnues, uniquement pour générer votre résultat, sans utilisation pour l'entraînement de leurs modèles.",
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
                justice en Suisse. Faites analyser le vôtre par notre équipe
                juridique avant votre prochaine candidature.
              </p>
              <PriceBadge
                amount="99 CHF"
                label="Rapport complet, paiement unique"
                className="mt-8"
              />
              <p className="mt-4 text-sm text-text-muted">
                Livré sous 2 jours ouvrables. Remboursé sous 14 jours si
                besoin.
              </p>
            </Reveal>
          </Container>
        </section>

        <div className="theme-light bg-bg">
          <TrustBar
            items={[
              "Le droit suisse interdit les sous-entendus et les formulations ambiguës dans un certificat de travail (art. 330a CO).",
              "Procédure aux Prud'hommes gratuite en cas de refus de correction par l'employeur.",
              "Traitement conforme nLPD, avec votre consentement explicite avant tout envoi du texte.",
            ]}
          />
        </div>

        <section className="theme-light bg-bg py-16 md:py-20">
          <Container className="mx-auto max-w-2xl">
            <Reveal>
              <h2 className="text-center text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-text">
                Comment ça marche
              </h2>
              <StepList steps={STEPS} className="mt-8" />
            </Reveal>
          </Container>
        </section>

        <section className="theme-light bg-bg py-16 md:py-24">
          <Container className="mx-auto max-w-2xl">
            <Reveal>
              <h2 className="text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-text">
                Deux exemples que nous recherchons
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-text-muted">
                Deux formulations réellement vérifiées par notre méthode,
                avec leur source. Nous distinguons ce qui est confirmé par
                la jurisprudence de ce qui est signalé par la doctrine :
                nous ne survendons pas un problème qui n&rsquo;existe pas.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {EXAMPLES.map((example) => (
                  <div
                    key={example.phrase}
                    className="rounded-2xl border border-border bg-surface p-6"
                  >
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-text-muted">
                      {example.tier}
                    </p>
                    <p className="mt-3 text-base font-medium leading-snug text-text">
                      {example.phrase}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-text-muted">
                      {example.explanation}
                    </p>
                    <p className="mt-3 text-xs text-text-muted/70">
                      {example.source}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm text-text-muted">
                Ce ne sont que deux exemples parmi ceux que nous vérifions
                systématiquement. Votre rapport détaille chacune des
                formulations identifiées dans votre certificat, avec sa
                source.
              </p>
            </Reveal>
          </Container>
        </section>

        <section className="theme-light bg-surface py-16 md:py-24">
          <Container className="mx-auto max-w-2xl">
            <Reveal>
              <CertificateAnalyzer />
            </Reveal>
          </Container>
        </section>

        <section className="theme-light bg-bg py-16 md:py-24">
          <Container className="mx-auto max-w-2xl">
            <Reveal>
              <h2 className="text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-text">
                Le prix d&rsquo;un avocat, sans l&rsquo;avocat
              </h2>
              <LawyerComparison
                className="mt-8"
                lawyerRange="300 à 1200 CHF"
                lawyerNote="Pour une consultation et la rédaction d'une mise en demeure, soit environ 1 à 2 heures facturées."
                thraxPrice="Dès 99 CHF"
                thraxNote="Analyse complète par notre équipe juridique, livrée sous 2 jours ouvrables. Mise en demeure prête à envoyer disponible en option, 39 CHF."
              />
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
