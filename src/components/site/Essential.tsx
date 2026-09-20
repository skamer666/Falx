import Reveal from "@/components/Reveal";
import { CircleArrowLink, Container } from "./ui";

export default function Essential() {
  return (
    <section className="bg-encre py-20 md:py-24">
      <Container>
        <Reveal>
          <div className="md:flex md:items-end md:justify-between md:gap-16">
            <p className="font-display max-w-xl text-2xl leading-[1.3] text-papier md:text-3xl">
              1 PME suisse sur 3 n&rsquo;a toujours pas de registre de
              traitement conforme à la nLPD.
            </p>
            <div className="mt-6 md:mt-0 md:max-w-xs md:shrink-0 md:text-right">
              <p className="text-base leading-relaxed text-ivory-muted">
                Voici comment y remédier en quelques jours, pas en quelques
                mois.
              </p>
              <CircleArrowLink
                href="#securite"
                tone="light"
                className="mt-5 md:ml-auto"
              >
                Lire le guide
              </CircleArrowLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
