import Image from "next/image";
import Link from "next/link";
import { Container, Kicker, PrimaryButton } from "./ui";

export default function Hero() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-encre">
        <Image
          src="/images/hero-alps.jpg"
          alt="Sommets des Alpes suisses au lever du jour, au-dessus d'une mer de nuages"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_70%]"
        />
        <div aria-hidden className="absolute inset-0 bg-sapin/45 mix-blend-multiply" />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-encre via-encre/75 to-encre/25"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-encre via-encre/10 to-transparent"
        />

        <Container className="relative pb-28 pt-36 md:pb-40 md:pt-44">
          <div className="max-w-3xl">
            <Kicker tone="light">Legaltech suisse</Kicker>

            <h1 className="font-serif-display mt-7 text-[2.75rem] leading-[1.04] tracking-[-0.02em] text-papier sm:text-6xl md:text-[5.25rem]">
              L&rsquo;infrastructure juridique de la Suisse qui{" "}
              <em className="italic">entreprend</em>.
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ivory-muted md:text-xl">
              Falx génère vos statuts de Sàrl, votre conformité LPD et vos
              contrats PME en quelques minutes, avec la précision du droit
              suisse et la revue de juristes partenaires.
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

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
              <Link
                href="#produit"
                className="text-sm font-medium text-papier underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white/70"
              >
                Voir la démonstration
              </Link>
              <p className="text-sm text-ivory-muted">
                Données hébergées en Suisse &middot; Conforme nLPD
              </p>
            </div>
          </div>
        </Container>
      </section>

      <div className="relative bg-papier">
        <Container className="relative -mt-16 pb-20 md:-mt-24 md:pb-28">
          <div className="relative overflow-hidden rounded-[28px] border border-encre-line bg-encre p-2 shadow-[0_40px_90px_-40px_rgba(11,15,20,0.55)] md:p-3">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-32 right-[-10%] h-72 w-72 rounded-full bg-sapin-light/25 blur-[110px]"
            />
            <div className="relative rounded-[20px] border border-encre-line bg-encre-soft">
              <div className="flex items-center justify-between border-b border-encre-line px-5 py-3.5">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                </div>
                <span className="text-xs font-medium text-ivory-muted">
                  Génération &middot; Statuts de Sàrl
                </span>
                <span className="rounded-full bg-sapin/25 px-2.5 py-1 text-[11px] font-medium text-sapin-pale">
                  Conforme CO
                </span>
              </div>

              <div className="grid gap-px bg-encre-line md:grid-cols-[280px_1fr]">
                <div className="space-y-5 bg-encre-soft p-6">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-ivory-muted">
                      Raison sociale
                    </p>
                    <p className="mt-2 rounded-lg border border-encre-line bg-white/[0.03] px-3 py-2.5 text-sm text-papier">
                      Atelier Numérique Sàrl
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-ivory-muted">
                      Capital social
                    </p>
                    <p className="mt-2 rounded-lg border border-encre-line bg-white/[0.03] px-3 py-2.5 text-sm text-papier">
                      CHF 20&rsquo;000
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-ivory-muted">
                      Siège
                    </p>
                    <p className="mt-2 rounded-lg border border-encre-line bg-white/[0.03] px-3 py-2.5 text-sm text-papier">
                      Lausanne, VD
                    </p>
                  </div>
                  <div className="flex items-center gap-2 pt-2 text-xs text-ivory-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-sapin-pale" />
                    Champs validés en temps réel
                  </div>
                </div>

                <div className="bg-encre p-6 md:p-8">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-ivory-muted">
                    Aperçu du document
                  </p>
                  <div className="mt-4 space-y-3 rounded-xl border border-encre-line bg-white/[0.02] p-6">
                    <div className="h-2.5 w-1/3 rounded-full bg-papier/85" />
                    <div className="h-2 w-full rounded-full bg-white/10" />
                    <div className="h-2 w-11/12 rounded-full bg-white/10" />
                    <div className="h-2 w-4/5 rounded-full bg-white/10" />
                    <div className="mt-5 h-2 w-1/4 rounded-full bg-papier/70" />
                    <div className="h-2 w-full rounded-full bg-white/10" />
                    <div className="h-2 w-3/4 rounded-full bg-white/10" />
                  </div>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-xs text-ivory-muted">
                      Statuts &middot; art. 772&ndash;827 CO
                    </span>
                    <span className="rounded-full bg-sapin px-4 py-2 text-xs font-medium text-papier">
                      Générer le PDF
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
