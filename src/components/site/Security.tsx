import Reveal from "@/components/Reveal";
import { Container, SectionHeading } from "./ui";

const GUARANTEES = [
  {
    title: "Hébergement exclusif en Suisse",
    text: "Vos données ne quittent jamais le territoire suisse, sur une infrastructure dédiée.",
  },
  {
    title: "Conçu pour la nLPD",
    text: "Chaque module est bâti pour répondre aux exigences de la nouvelle Loi sur la protection des données.",
  },
  {
    title: "Chiffrement de bout en bout",
    text: "Vos documents et données personnelles sont chiffrés au repos et en transit.",
  },
  {
    title: "Revue par des juristes partenaires",
    text: "Un cadre de contrôle humain vient valider la conformité de chaque document sensible.",
  },
];

export default function Security() {
  return (
    <section id="securite" className="relative isolate overflow-hidden bg-encre py-28 md:py-40">
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-40"
      >
        <source src="/media/nouvelles/clip-05.mp4" type="video/mp4" />
      </video>
      <div aria-hidden className="absolute inset-0 bg-encre/55" />

      <Container className="relative">
        <Reveal>
          <SectionHeading
            tone="light"
            kicker="Sécurité &amp; conformité"
            title="Conçu pour la rigueur du droit suisse."
            description="La confiance ne se décrète pas : elle se construit dans l'architecture. Voici les principes qui gouvernent chaque document généré par Falx."
          />
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-encre-line bg-encre-line md:grid-cols-2">
          {GUARANTEES.map((item, index) => (
            <Reveal key={item.title} delay={index * 80}>
              <div className="h-full bg-encre-soft p-8">
                <div className="mb-4 h-px w-8 bg-sapin-pale/60" />
                <h3 className="text-lg font-medium text-papier">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ivory-muted">
                  {item.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
