import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import FaqAccordion from "@/components/site/FaqAccordion";
import PaywallCard from "@/components/site/PaywallCard";
import {
  Container,
  LawyerComparison,
  PrimaryButton,
  PriceBadge,
  StepList,
  TrustBar,
} from "@/components/site/ui";

export const metadata: Metadata = {
  title: "Certificat de travail : analyse professionnelle | Thrax Legal",
  description:
    "Faites vérifier votre certificat de travail par notre équipe juridique. Réponse claire sous 2 jours ouvrables.",
};

const CHECKOUT_HREF = "/checkout/certificat-travail";

const STEPS = [
  {
    title: "Commandez",
    description:
      "99 CHF, un seul paiement. Lettre à votre employeur disponible en option.",
  },
  {
    title: "Envoyez votre certificat",
    description:
      "Après votre commande, envoyez-nous votre certificat en toute sécurité.",
  },
  {
    title: "Recevez votre rapport",
    description:
      "Notre équipe juridique lit tout le document et vous répond sous 2 jours ouvrables.",
  },
];

const EXAMPLES = [
  {
    phrase: "« … a entretenu des relations conformes à nos attentes … »",
    translation: "Ça posait problème avec les collègues.",
  },
  {
    phrase: "« … a fait preuve de bonne volonté … »",
    translation: "Il a essayé, mais le résultat n'était pas là.",
  },
];

const FAQ = [
  {
    q: "Pourquoi les certificats de travail utilisent-ils un langage codé ?",
    a: "Beaucoup d'employeurs utilisent des phrases qui semblent positives, mais qui critiquent en réalité. La loi suisse interdit ça. Mais il n'existe pas de « dictionnaire » universel des codes : chaque phrase doit être lue avec le reste du certificat pour comprendre son vrai sens (art. 330a CO).",
  },
  {
    q: "Combien de temps faut-il pour recevoir mon rapport ?",
    a: "2 jours ouvrables après votre commande. Ce n'est pas un résultat automatique : une vraie personne lit tout votre certificat.",
  },
  {
    q: "Le paiement est-il sécurisé ?",
    a: "Oui, le paiement est traité par un prestataire sécurisé. Si quelque chose ne va pas avec votre commande, contactez-nous : nous trouvons toujours une solution.",
  },
  {
    q: "Et si mon certificat ne contient finalement rien d'anormal ?",
    a: "Tant mieux ! Vous recevez quand même un document écrit qui confirme que tout est en ordre, à garder pour vos candidatures. Ce n'est pas un échec de notre service, c'est le résultat de l'analyse.",
  },
  {
    q: "Que se passe-t-il si mon employeur refuse de corriger le certificat ?",
    a: "Vous pouvez aller au Tribunal des prud'hommes. C'est gratuit pour ce type de litige en Suisse.",
  },
  {
    q: "Thrax Legal est-il un cabinet d'avocats ?",
    a: "Non. Nous ne sommes pas un cabinet d'avocats et nous n'allons pas au tribunal à votre place : seul un avocat inscrit dans un canton suisse peut le faire. Si besoin, nous vous orientons vers un avocat pour vous représenter.",
  },
  {
    q: "Mes données sont-elles conservées ?",
    a: "Non, pas après l'analyse. Votre certificat est envoyé, avec votre accord, à un prestataire basé aux États-Unis, encadré par des clauses de protection reconnues, uniquement pour préparer votre rapport. Jamais pour entraîner leurs modèles.",
  },
];

function OrderCta({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center gap-3 text-center ${className}`}>
      <PrimaryButton href={CHECKOUT_HREF} className="px-8 py-3.5 text-base">
        Commander mon analyse
      </PrimaryButton>
      <p className="text-sm text-text-muted">
        99 CHF &middot; Livré sous 2 jours ouvrables
      </p>
    </div>
  );
}

function StickyOrderBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/95 backdrop-blur">
      <Container className="flex items-center justify-between gap-4 py-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold leading-tight text-text">
            99 CHF
          </p>
          <p className="truncate text-xs text-text-muted">
            Livré sous 2 jours ouvrables
          </p>
        </div>
        <PrimaryButton href={CHECKOUT_HREF} className="shrink-0 px-5 py-2.5 text-sm">
          Commander mon analyse
        </PrimaryButton>
      </Container>
    </div>
  );
}

export default function CertificatTravailPage() {
  return (
    <>
      <div className="pb-24">
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
                  Une seule phrase peut suffire à ruiner votre certificat de
                  travail. Des tribunaux suisses l&rsquo;ont confirmé des
                  dizaines de fois. Faites vérifier le vôtre avant de
                  postuler.
                </p>
                <PriceBadge
                  amount="99 CHF"
                  label="Rapport complet, paiement unique"
                  className="mt-8"
                />
                <OrderCta className="mt-6" />
              </Reveal>
            </Container>
          </section>

          <div className="theme-light bg-bg">
            <TrustBar
              items={[
                "La loi suisse interdit les certificats à double sens (art. 330a CO).",
                "Si votre employeur refuse de corriger : la procédure au tribunal est gratuite.",
                "Vos données sont protégées. Rien n'est envoyé sans votre accord.",
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
                <OrderCta className="mt-10" />
              </Reveal>
            </Container>
          </section>

          <section className="theme-light bg-bg py-16 md:py-24">
            <Container className="mx-auto max-w-2xl">
              <Reveal>
                <h2 className="text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-text">
                  Ce que ces phrases veulent vraiment dire
                </h2>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-text-muted">
                  Certaines phrases ont l&rsquo;air normales. En réalité,
                  elles veulent dire autre chose. Deux exemples :
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {EXAMPLES.map((example) => (
                    <div
                      key={example.phrase}
                      className="rounded-2xl border border-border bg-surface p-6 md:p-7"
                    >
                      <p className="text-xs font-medium uppercase tracking-[0.14em] text-text-muted">
                        Ce qui est écrit
                      </p>
                      <p className="mt-2 text-lg font-medium leading-snug text-text">
                        {example.phrase}
                      </p>
                      <p className="mt-5 text-xs font-medium uppercase tracking-[0.14em] text-text-muted">
                        Ce que ça veut dire
                      </p>
                      <p className="mt-2 text-2xl font-semibold leading-snug tracking-[-0.01em] text-text">
                        {example.translation}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-2xl border border-border bg-bg p-6">
                  <p className="text-lg font-semibold leading-snug text-text">
                    Une seule phrase ne suffit jamais.
                  </p>
                  <p className="mt-2 text-base leading-relaxed text-text-muted">
                    Le Tribunal fédéral est clair : un certificat de travail
                    s&rsquo;analyse dans son ensemble, jamais phrase par
                    phrase. C&rsquo;est pour ça qu&rsquo;une lecture complète
                    change tout, et c&rsquo;est exactement ce que fait notre
                    équipe juridique.
                  </p>
                </div>
              </Reveal>
            </Container>
          </section>

          <section className="theme-light bg-surface py-16 md:py-24">
            <Container className="mx-auto max-w-2xl">
              <Reveal>
                <PaywallCard
                  price="99 CHF"
                  checkoutHref={CHECKOUT_HREF}
                  ctaLabel="Commander mon analyse"
                  deliveryNote="Livré sous 2 jours ouvrables"
                  guaranteeNote=""
                  bullets={[
                    "Notre équipe juridique lit tout votre certificat, phrase par phrase",
                    "On vérifie chaque formulation, du début à la fin",
                    "Pour chaque problème trouvé, on vous dit quoi écrire à la place",
                  ]}
                />
                <div className="mt-3 rounded-2xl border border-dashed border-border p-5">
                  <p className="text-base font-semibold text-text">
                    En option : une lettre prête à envoyer à votre
                    employeur, 39 CHF
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-text-muted">
                    On rédige la lettre pour vous, vous n&rsquo;avez
                    qu&rsquo;à l&rsquo;envoyer. Ajoutable maintenant, ou
                    plus tard une fois votre rapport reçu.
                  </p>
                </div>
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
                  lawyerNote="Pour un rendez-vous et une lettre à votre employeur, environ 1 à 2 heures facturées."
                  thraxPrice="Dès 99 CHF"
                  thraxNote="Toute votre analyse en 2 jours ouvrables. Lettre à votre employeur en option, 39 CHF."
                />
                <OrderCta className="mt-10" />
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
                <OrderCta className="mt-12" />
              </Reveal>
            </Container>
          </section>
        </main>
        <Footer />
      </div>
      <StickyOrderBar />
    </>
  );
}
