import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import LeadForm from "@/components/site/LeadForm";
import { Container, PrimaryButton } from "@/components/site/ui";
import { isLocale, DEFAULT_LOCALE, type Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";

// Page d'arrivée pour les annonces « embaucher un juriste » : comparaison chiffrée et honnête
// entre un juriste salarié et l'abonnement. Les montants salariaux sont des ordres de grandeur
// (art. 3 al. 1 let. e LCD : une comparaison doit rester exacte et non trompeuse).

type Row = { label: string; hire: string; thrax: string };
type Offer = { name: string; price: string; detail: string; href: string };

type Content = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heading: string;
  intro: string;
  primaryCta: string;
  secondaryCta: string;
  tableHeading: string;
  colCriterion: string;
  colHire: string;
  colThrax: string;
  rows: Row[];
  costNote: string;
  bridgeHeading: string;
  bridgeBody: string;
  hireHeading: string;
  hireIntro: string;
  hireCases: string[];
  offersHeading: string;
  offers: Offer[];
  formHeading: string;
  formBody: string;
};

const CONTENT: Record<Locale, Content> = {
  fr: {
    metaTitle: "Embaucher un juriste en PME ou externaliser ? | Thrax Legal",
    metaDescription:
      "Juriste salarié ou service juridique externalisé : coût, délai, engagement. Comparatif pour les PME romandes, dès 290 CHF/mois sans engagement.",
    eyebrow: "Vous cherchez un juriste ?",
    heading: "Avant d'embaucher, comparez avec un service juridique externalisé.",
    intro:
      "Un juriste salarié coûte cher et met des mois à arriver. Si votre besoin ne justifie pas un temps plein, un abonnement couvre vos contrats, litiges et démarches dès cette semaine, à prix fixe.",
    primaryCta: "Être rappelé",
    secondaryCta: "Voir les formules",
    tableHeading: "Juriste salarié ou abonnement : la comparaison",
    colCriterion: "Critère",
    colHire: "Juriste salarié",
    colThrax: "Thrax Legal",
    rows: [
      {
        label: "Coût mensuel",
        hire: "≈ 9'000 à 11'000 CHF (salaire et charges patronales)",
        thrax: "290 ou 690 CHF hors TVA, sur mesure dès 1'490 CHF",
      },
      { label: "Démarrage", hire: "1 à 3 mois de recrutement, puis le délai de congé du candidat", thrax: "Quelques jours après votre inscription" },
      { label: "Engagement", hire: "Contrat de travail et délai de congé", thrax: "Résiliable à tout moment" },
      {
        label: "Volume de travail",
        hire: "Temps plein, dans vos locaux",
        thrax: "Volume défini chaque mois (5 ou 12 dossiers, plus des questions rapides), à distance",
      },
      { label: "Absences", hire: "Vacances, maladie et formation à prévoir", thrax: "Délais de traitement fixés dans les conditions générales" },
      { label: "Ajustement", hire: "Difficile à réduire si l'activité baisse", thrax: "Changement de formule ou pause possible" },
    ],
    costNote:
      "Ordre de grandeur indicatif : salaire annuel brut de 95'000 à 115'000 CHF pour un juriste en Suisse romande selon les portails de salaires suisses, plus 12 à 20 % de charges patronales (AVS/AI/APG/AC, LPP, LAA, allocations familiales). Hors poste de travail, recrutement et formation.",
    bridgeHeading: "Le temps de recruter, couvrez déjà vos besoins",
    bridgeBody:
      "Vous avez déjà publié une offre d'emploi ? L'abonnement prend en charge vos dossiers pendant le recrutement, puis vous le résiliez quand votre juriste arrive. Aucun dossier n'attend.",
    hireHeading: "Quand embaucher reste le meilleur choix",
    hireIntro: "Nous préférons vous le dire franchement : un abonnement ne remplace pas un juriste interne dans tous les cas.",
    hireCases: [
      "Vous avez besoin d'un juriste à plein temps, chaque jour.",
      "Le poste exige une présence dans vos locaux ou l'encadrement d'une équipe.",
      "Votre activité implique des procès fréquents ou des opérations complexes : un avocat sera de toute façon nécessaire.",
    ],
    offersHeading: "Trois façons de commencer",
    offers: [
      { name: "Essentiel", price: "290 CHF / mois", detail: "5 dossiers et 10 questions rapides par mois", href: "/compte/inscription?plan=essentiel" },
      { name: "Croissance", price: "690 CHF / mois", detail: "12 dossiers et 30 questions rapides par mois", href: "/compte/inscription?plan=croissance" },
      { name: "Sur mesure", price: "dès 1'490 CHF / mois", detail: "Volumes dédiés, délais convenus et reporting mensuel", href: "#rappel" },
    ],
    formHeading: "Parlons de votre besoin",
    formBody: "Laissez vos coordonnées : nous vous rappelons pour voir si un abonnement suffit ou si une embauche est plus adaptée. Gratuit et sans engagement.",
  },
  de: {
    metaTitle: "Juristen anstellen oder auslagern? KMU-Vergleich | Thrax Legal",
    metaDescription:
      "Angestellter Jurist oder externer Rechtsdienst: Kosten, Vorlaufzeit, Bindung. Vergleich für KMU in der Westschweiz, ab CHF 290/Monat ohne Bindung.",
    eyebrow: "Sie suchen einen Juristen?",
    heading: "Vergleichen Sie vor der Anstellung mit einem externen Rechtsdienst.",
    intro:
      "Ein angestellter Jurist ist teuer und braucht Monate, bis er startet. Wenn Ihr Bedarf keine Vollzeitstelle rechtfertigt, deckt ein Abo Ihre Verträge, Streitfälle und Verfahren ab dieser Woche ab, zum Fixpreis.",
    primaryCta: "Rückruf anfordern",
    secondaryCta: "Formeln ansehen",
    tableHeading: "Angestellter Jurist oder Abo: der Vergleich",
    colCriterion: "Kriterium",
    colHire: "Angestellter Jurist",
    colThrax: "Thrax Legal",
    rows: [
      {
        label: "Monatliche Kosten",
        hire: "≈ CHF 9'000 bis 11'000 (Lohn und Arbeitgeberbeiträge)",
        thrax: "CHF 290 oder 690 zzgl. MWST, massgeschneidert ab CHF 1'490",
      },
      { label: "Start", hire: "1 bis 3 Monate Rekrutierung, dann die Kündigungsfrist der Person", thrax: "Wenige Tage nach Ihrer Anmeldung" },
      { label: "Bindung", hire: "Arbeitsvertrag und Kündigungsfrist", thrax: "Jederzeit kündbar" },
      {
        label: "Arbeitsvolumen",
        hire: "Vollzeit, in Ihren Räumen",
        thrax: "Festes Monatsvolumen (5 oder 12 Anliegen plus schnelle Fragen), aus der Ferne",
      },
      { label: "Abwesenheiten", hire: "Ferien, Krankheit und Weiterbildung einplanen", thrax: "Bearbeitungsfristen in den AGB festgelegt" },
      { label: "Anpassung", hire: "Schwer zu reduzieren, wenn die Tätigkeit sinkt", thrax: "Formelwechsel oder Pause möglich" },
    ],
    costNote:
      "Richtwert: Bruttojahreslohn von CHF 95'000 bis 115'000 für einen Juristen in der Westschweiz gemäss Schweizer Lohnportalen, zuzüglich 12 bis 20 % Arbeitgeberbeiträge (AHV/IV/EO/ALV, BVG, UVG, Familienzulagen). Ohne Arbeitsplatz, Rekrutierung und Weiterbildung.",
    bridgeHeading: "Während der Rekrutierung schon abgedeckt",
    bridgeBody:
      "Sie haben bereits eine Stelle ausgeschrieben? Das Abo übernimmt Ihre Anliegen während der Rekrutierung, und Sie kündigen es, sobald Ihr Jurist startet. Kein Anliegen bleibt liegen.",
    hireHeading: "Wann eine Anstellung die bessere Wahl bleibt",
    hireIntro: "Wir sagen es lieber offen: Ein Abo ersetzt nicht in jedem Fall einen internen Juristen.",
    hireCases: [
      "Sie brauchen jeden Tag einen Juristen in Vollzeit.",
      "Die Stelle erfordert Präsenz vor Ort oder die Führung eines Teams.",
      "Ihre Tätigkeit bringt häufige Prozesse oder komplexe Transaktionen mit sich: Ein Anwalt wird ohnehin nötig sein.",
    ],
    offersHeading: "Drei Möglichkeiten zu starten",
    offers: [
      { name: "Essentiel", price: "CHF 290 / Monat", detail: "5 Anliegen und 10 schnelle Fragen pro Monat", href: "/compte/inscription?plan=essentiel" },
      { name: "Croissance", price: "CHF 690 / Monat", detail: "12 Anliegen und 30 schnelle Fragen pro Monat", href: "/compte/inscription?plan=croissance" },
      { name: "Massgeschneidert", price: "ab CHF 1'490 / Monat", detail: "Eigene Volumen, vereinbarte Fristen und monatliches Reporting", href: "#rappel" },
    ],
    formHeading: "Sprechen wir über Ihren Bedarf",
    formBody: "Hinterlassen Sie Ihre Kontaktdaten: Wir rufen Sie zurück und prüfen, ob ein Abo genügt oder eine Anstellung besser passt. Kostenlos und unverbindlich.",
  },
  en: {
    metaTitle: "Hire an in-house lawyer or outsource? SME comparison | Thrax Legal",
    metaDescription:
      "Salaried counsel or an outsourced legal service: cost, lead time, commitment. For SMEs in French-speaking Switzerland, from CHF 290/month.",
    eyebrow: "Looking for legal counsel?",
    heading: "Before you hire, compare with an outsourced legal service.",
    intro:
      "A salaried legal counsel is expensive and takes months to start. If your needs don't justify a full-time role, a subscription covers your contracts, disputes and procedures from this week, at a fixed price.",
    primaryCta: "Request a call back",
    secondaryCta: "See the plans",
    tableHeading: "Salaried counsel or subscription: the comparison",
    colCriterion: "Criterion",
    colHire: "Salaried counsel",
    colThrax: "Thrax Legal",
    rows: [
      {
        label: "Monthly cost",
        hire: "≈ CHF 9,000 to 11,000 (salary and employer contributions)",
        thrax: "CHF 290 or 690 excl. VAT, tailor-made from CHF 1,490",
      },
      { label: "Start", hire: "1 to 3 months of recruiting, then the candidate's notice period", thrax: "A few days after you sign up" },
      { label: "Commitment", hire: "Employment contract and notice period", thrax: "Cancel anytime" },
      {
        label: "Workload",
        hire: "Full time, on your premises",
        thrax: "Set monthly volume (5 or 12 matters, plus quick questions), remote",
      },
      { label: "Absences", hire: "Holidays, sick leave and training to plan for", thrax: "Turnaround times set in the terms and conditions" },
      { label: "Flexibility", hire: "Hard to scale down if activity drops", thrax: "Switch plans or pause" },
    ],
    costNote:
      "Indicative order of magnitude: gross annual salary of CHF 95,000 to 115,000 for legal counsel in French-speaking Switzerland according to Swiss salary portals, plus 12 to 20% employer contributions (AHV/IV/EO/ALV, BVG, UVG, family allowances). Excluding workspace, recruiting and training.",
    bridgeHeading: "Covered while you recruit",
    bridgeBody:
      "Already posted a job ad? The subscription handles your matters during recruitment, and you cancel it when your new counsel starts. Nothing waits.",
    hireHeading: "When hiring is still the better choice",
    hireIntro: "We'd rather be upfront: a subscription doesn't replace in-house counsel in every case.",
    hireCases: [
      "You need full-time legal counsel every day.",
      "The role requires being on site or managing a team.",
      "Your business involves frequent litigation or complex transactions: you will need a lawyer anyway.",
    ],
    offersHeading: "Three ways to start",
    offers: [
      { name: "Essential", price: "CHF 290 / month", detail: "5 matters and 10 quick questions per month", href: "/compte/inscription?plan=essentiel" },
      { name: "Growth", price: "CHF 690 / month", detail: "12 matters and 30 quick questions per month", href: "/compte/inscription?plan=croissance" },
      { name: "Tailor-made", price: "from CHF 1,490 / month", detail: "Dedicated volumes, agreed turnaround times and monthly reporting", href: "#rappel" },
    ],
    formHeading: "Let's talk about your needs",
    formBody: "Leave your details: we'll call you back to see whether a subscription is enough or hiring makes more sense. Free, no commitment.",
  },
  it: {
    metaTitle: "Assumere un giurista o esternalizzare? Confronto PMI | Thrax Legal",
    metaDescription:
      "Giurista dipendente o servizio giuridico esternalizzato: costo, tempi, impegno. Per le PMI romande, da CHF 290/mese senza impegno.",
    eyebrow: "Cercate un giurista?",
    heading: "Prima di assumere, confrontate con un servizio giuridico esternalizzato.",
    intro:
      "Un giurista dipendente costa caro e impiega mesi ad arrivare. Se il vostro bisogno non giustifica un tempo pieno, un abbonamento copre contratti, controversie e procedure da questa settimana, a prezzo fisso.",
    primaryCta: "Essere richiamati",
    secondaryCta: "Vedere le formule",
    tableHeading: "Giurista dipendente o abbonamento: il confronto",
    colCriterion: "Criterio",
    colHire: "Giurista dipendente",
    colThrax: "Thrax Legal",
    rows: [
      {
        label: "Costo mensile",
        hire: "≈ CHF 9'000 – 11'000 (salario e oneri del datore di lavoro)",
        thrax: "CHF 290 o 690 IVA esclusa, su misura da CHF 1'490",
      },
      { label: "Avvio", hire: "Da 1 a 3 mesi di selezione, poi il preavviso del candidato", thrax: "Pochi giorni dopo l'iscrizione" },
      { label: "Impegno", hire: "Contratto di lavoro e termine di disdetta", thrax: "Disdicibile in qualsiasi momento" },
      {
        label: "Volume di lavoro",
        hire: "Tempo pieno, nei vostri locali",
        thrax: "Volume definito ogni mese (5 o 12 pratiche, più domande rapide), a distanza",
      },
      { label: "Assenze", hire: "Vacanze, malattia e formazione da prevedere", thrax: "Tempi di trattamento fissati nelle condizioni generali" },
      { label: "Flessibilità", hire: "Difficile da ridurre se l'attività cala", thrax: "Cambio di formula o pausa possibili" },
    ],
    costNote:
      "Ordine di grandezza indicativo: salario annuo lordo da CHF 95'000 a 115'000 per un giurista nella Svizzera romanda secondo i portali salariali svizzeri, più il 12–20 % di oneri del datore di lavoro (AVS/AI/IPG/AD, LPP, LAINF, assegni familiari). Esclusi postazione, selezione e formazione.",
    bridgeHeading: "Coperti già durante la selezione",
    bridgeBody:
      "Avete già pubblicato un annuncio? L'abbonamento si occupa delle vostre pratiche durante la selezione, poi lo disdite quando arriva il vostro giurista. Nessuna pratica resta in attesa.",
    hireHeading: "Quando assumere resta la scelta migliore",
    hireIntro: "Preferiamo dirlo chiaramente: un abbonamento non sostituisce in ogni caso un giurista interno.",
    hireCases: [
      "Avete bisogno di un giurista a tempo pieno, ogni giorno.",
      "Il ruolo richiede presenza in sede o la gestione di un team.",
      "La vostra attività comporta cause frequenti o operazioni complesse: servirà comunque un avvocato.",
    ],
    offersHeading: "Tre modi per iniziare",
    offers: [
      { name: "Essentiel", price: "CHF 290 / mese", detail: "5 pratiche e 10 domande rapide al mese", href: "/compte/inscription?plan=essentiel" },
      { name: "Croissance", price: "CHF 690 / mese", detail: "12 pratiche e 30 domande rapide al mese", href: "/compte/inscription?plan=croissance" },
      { name: "Su misura", price: "da CHF 1'490 / mese", detail: "Volumi dedicati, tempi concordati e report mensile", href: "#rappel" },
    ],
    formHeading: "Parliamo del vostro bisogno",
    formBody: "Lasciate i vostri recapiti: vi richiamiamo per capire se basta un abbonamento o se conviene assumere. Gratuito e senza impegno.",
  },
};

const PATH = "/alternative-embauche-juriste";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const t = CONTENT[locale];
  return pageMetadata({ locale, path: PATH, title: t.metaTitle, description: t.metaDescription });
}

export default async function HiringAlternativePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const t = CONTENT[locale];

  return (
    <>
      <Nav />
      <main className="bg-bg text-text">
        <section className="theme-light border-b border-border bg-bg pb-16 pt-32 md:pb-20 md:pt-40">
          <Container className="mx-auto max-w-3xl!">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-text-muted">{t.eyebrow}</p>
              <h1 className="mt-3 text-[2rem] font-semibold leading-[1.15] tracking-[-0.02em] text-text md:text-[2.75rem]">
                {t.heading}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-muted md:text-lg">{t.intro}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <PrimaryButton href="#rappel" className="px-6 py-3">
                  {t.primaryCta}
                </PrimaryButton>
                <a
                  href={`/${locale}/entreprises#abonnement`}
                  className="inline-flex items-center justify-center rounded-full border border-text/50 px-6 py-3 text-sm font-semibold text-text transition-colors duration-200 hover:bg-text hover:text-bg"
                >
                  {t.secondaryCta}
                </a>
              </div>
            </Reveal>
          </Container>
        </section>

        <section className="theme-light bg-surface py-16 md:py-20">
          <Container className="mx-auto max-w-4xl!">
            <Reveal>
              <h2 className="text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-text">{t.tableHeading}</h2>
              <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-bg">
                <div className="hidden grid-cols-[1fr_1.4fr_1.4fr] gap-4 border-b border-border px-6 py-3 text-xs font-medium uppercase tracking-[0.14em] text-text-muted md:grid">
                  <span>{t.colCriterion}</span>
                  <span>{t.colHire}</span>
                  <span className="text-text">{t.colThrax}</span>
                </div>
                <dl className="divide-y divide-border">
                  {t.rows.map((row) => (
                    <div key={row.label} className="grid gap-2 px-6 py-4 md:grid-cols-[1fr_1.4fr_1.4fr] md:gap-4">
                      <dt className="text-sm font-semibold text-text">{row.label}</dt>
                      <dd className="text-sm leading-relaxed text-text-muted">
                        <span className="mr-1 font-medium text-text md:hidden">{t.colHire} :</span>
                        {row.hire}
                      </dd>
                      <dd className="text-sm font-medium leading-relaxed text-text">
                        <span className="mr-1 md:hidden">{t.colThrax} :</span>
                        {row.thrax}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-text-muted/80">{t.costNote}</p>
            </Reveal>
          </Container>
        </section>

        <section className="theme-light bg-bg py-16 md:py-20">
          <Container className="mx-auto max-w-4xl!">
            <Reveal>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-accent/40 bg-accent/10 p-6 md:p-8">
                  <h2 className="text-xl font-semibold tracking-[-0.01em] text-text">{t.bridgeHeading}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">{t.bridgeBody}</p>
                </div>
                <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
                  <h2 className="text-xl font-semibold tracking-[-0.01em] text-text">{t.hireHeading}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">{t.hireIntro}</p>
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-text-muted">
                    {t.hireCases.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span aria-hidden className="text-text">
                          &middot;
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <h2 className="mt-14 text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-text">{t.offersHeading}</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {t.offers.map((offer) => (
                  <a
                    key={offer.name}
                    href={offer.href.startsWith("#") ? offer.href : `/${locale}${offer.href}`}
                    className="group flex flex-col rounded-2xl border border-border bg-surface p-6 transition-colors duration-200 hover:border-text/40"
                  >
                    <span className="text-sm font-medium uppercase tracking-[0.14em] text-text-muted">{offer.name}</span>
                    <span className="mt-2 text-xl font-semibold tracking-[-0.01em] text-text">{offer.price}</span>
                    <span className="mt-2 text-sm leading-relaxed text-text-muted">{offer.detail}</span>
                    <span aria-hidden className="mt-4 text-sm font-medium text-text transition-transform duration-200 group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </a>
                ))}
              </div>
            </Reveal>
          </Container>
        </section>

        <section id="rappel" className="theme-light scroll-mt-28 border-t border-border bg-surface py-16 md:py-24">
          <Container className="mx-auto max-w-xl!">
            <Reveal>
              <h2 className="text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-text">{t.formHeading}</h2>
              <p className="mt-3 text-base leading-relaxed text-text-muted">{t.formBody}</p>
              <LeadForm locale={locale} className="mt-8" />
            </Reveal>
          </Container>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
