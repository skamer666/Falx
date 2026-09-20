import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { Container, PrimaryButton, GhostButton } from "./ui";

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-screen flex-col overflow-hidden border-b border-border">
      <Image
        src="/media/photos/hero-building.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-40"
      />
      <div aria-hidden className="absolute inset-0 bg-bg/70" />
      <Container className="relative flex grow flex-col justify-between pb-12 pt-32 md:pt-40">
        <Reveal className="ml-auto max-w-sm text-left">
          <p className="text-base leading-relaxed text-text-muted">
            Thrax Legal remplace les cabinets traditionnels, lents et
            opaques, par une infrastructure juridique structurée pour les
            PME et les particuliers suisses.
          </p>
          <Link
            href="/services"
            className="mt-6 inline-block border-b border-border pb-1 text-sm font-medium text-text transition-colors hover:border-white/40"
          >
            Voir nos services ↗
          </Link>
        </Reveal>

        <Reveal delay={80} className="mt-16 md:mt-0">
          <h1 className="max-w-4xl text-[40px] font-semibold leading-[0.95] tracking-[-0.02em] text-text sm:text-[56px] md:text-[88px] lg:text-[104px]">
            Vos droits, exécutés en 24h.{" "}
            <span className="underline decoration-2 underline-offset-8">
              Prix fixes
            </span>
            , sans surprise.
          </h1>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <PrimaryButton href="/abonnement-pme">
              Découvrir l&rsquo;abonnement PME
            </PrimaryButton>
            <GhostButton href="/services">
              Voir nos services ponctuels
            </GhostButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
