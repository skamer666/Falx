import Image from "next/image";
import { Container, PrimaryButton } from "./ui";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-encre">
      <Image
        src="/media/textures/volute.jpg"
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-encre/85 via-encre/50 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-encre/60 via-transparent to-transparent"
      />

      <Container className="relative pb-28 pt-36 md:pb-40 md:pt-44">
        <div className="max-w-3xl">
          <h1 className="font-display text-[2.75rem] font-semibold leading-[1.04] tracking-[-0.02em] text-papier sm:text-6xl md:text-[5.25rem]">
            L&rsquo;infrastructure juridique de la Suisse qui{" "}
            <span className="text-sapin-pale">entreprend</span>.
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-ivory-muted md:text-xl">
            Falx met des juristes suisses au service de vos statuts de
            Sàrl, de votre conformité LPD et de vos contrats PME, avec la
            rigueur du droit suisse à chaque étape.
          </p>

          <form className="mt-10 flex max-w-lg flex-col gap-3 sm:flex-row sm:items-center">
            <label htmlFor="hero-email" className="sr-only">
              Adresse e-mail professionnelle
            </label>
            <input
              id="hero-email"
              type="email"
              placeholder="Adresse e-mail professionnelle"
              className="h-14 w-full rounded-full border border-white/15 bg-white/[0.04] px-6 text-sm text-papier placeholder:text-ivory-muted focus:border-sapin-light focus:outline-none"
            />
            <PrimaryButton
              href="#demarrer"
              className="h-14 shrink-0 px-7 text-sm"
            >
              Démarrer ma Sàrl
            </PrimaryButton>
          </form>

          <p className="mt-6 text-sm text-ivory-muted">
            Données hébergées en Suisse &middot; Conforme nLPD
          </p>
        </div>
      </Container>
    </section>
  );
}
