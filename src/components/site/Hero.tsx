import { Container, GhostButton, Kicker, PrimaryButton } from "./ui";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-24 pt-20 md:pb-32 md:pt-28">
      <Container>
        <div className="max-w-3xl">
          <Kicker>Legaltech suisse</Kicker>

          <h1 className="font-serif-display mt-6 text-4xl leading-[1.08] tracking-[-0.015em] text-ink sm:text-5xl md:text-6xl">
            L&rsquo;infrastructure juridique de la Suisse qui entreprend.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted md:text-xl">
            Falx génère vos statuts de Sàrl, votre conformité LPD et vos
            contrats PME en quelques minutes, avec la précision du
            droit suisse et la revue de juristes partenaires.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <PrimaryButton href="#demarrer">Démarrer ma Sàrl</PrimaryButton>
            <GhostButton href="#produit">Voir la démonstration</GhostButton>
          </div>

          <p className="mt-6 text-sm text-ink-muted">
            Données hébergées en Suisse &middot; Conforme nLPD &middot;
            Revue par des juristes partenaires
          </p>
        </div>
      </Container>

      <Container className="mt-16 md:mt-20">
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
    </section>
  );
}
