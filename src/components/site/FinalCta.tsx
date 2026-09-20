import Reveal from "@/components/Reveal";
import { Container, PrimaryButton } from "./ui";

export default function FinalCta() {
  return (
    <section id="demarrer" className="bg-papier py-16 md:py-20">
      <Container className="flex flex-col items-center gap-6 text-center">
        <Reveal>
          <p className="text-sm font-medium text-ink-muted">
            Approuvé par des dizaines de PME suisses.
          </p>
          <PrimaryButton href="#" className="mt-5">
            Commencer
          </PrimaryButton>
        </Reveal>
      </Container>
    </section>
  );
}
