import Reveal from "@/components/Reveal";
import { Container, SectionHeading } from "./ui";

const STEPS = [
  {
    step: "01",
    title: "Répondez à un questionnaire guidé",
    text: "Quelques questions ciblées sur votre activité, votre canton et vos besoins, sans jargon juridique.",
    video: "/media/icones/document.mp4",
  },
  {
    step: "02",
    title: "Le moteur structure votre document",
    text: "Falx applique les articles du Code des obligations et de la nLPD pertinents à votre situation.",
    video: "/media/icones/dossier.mp4",
  },
  {
    step: "03",
    title: "Revue par un juriste partenaire",
    text: "Selon votre formule, un juriste vérifie et valide le document avant finalisation.",
    video: "/media/icones/sceau-1.mp4",
  },
  {
    step: "04",
    title: "Signature et archivage",
    text: "Signature électronique qualifiée et archivage sécurisé, prêts pour authentification ou dépôt.",
    video: "/media/vie-pro/signature.mp4",
  },
];

export default function HowItWorks() {
  return (
    <section id="comment-ca-marche" className="bg-papier-dim/60 py-28 md:py-40">
      <Container>
        <Reveal>
          <SectionHeading
            kicker="Le processus"
            title="De l'idée au document signé, en quatre étapes."
          />
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-4 md:gap-6">
          {STEPS.map((item, index) => (
            <Reveal key={item.step} delay={index * 100}>
              <div className="relative pl-0">
                <div className="h-14 w-14 overflow-hidden rounded-xl bg-encre">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    aria-hidden="true"
                    className="h-full w-full object-cover"
                  >
                    <source src={item.video} type="video/mp4" />
                  </video>
                </div>
                <span className="font-serif-display mt-4 block text-3xl text-sapin">
                  {item.step}
                </span>
                <h3 className="mt-4 text-base font-medium text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {item.text}
                </p>
                {index < STEPS.length - 1 ? (
                  <div className="mt-6 hidden h-px w-full bg-ligne md:block" />
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
