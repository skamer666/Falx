import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import GuideLayout from "@/components/site/GuideLayout";
import { getGuideArticle } from "@/lib/guide/articles";
import { isLocale, DEFAULT_LOCALE, type Locale } from "@/i18n/config";

const article = getGuideArticle("contrat-de-travail-suisse-pme")!;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  return {
    title: `${article.title[locale]} | Thrax Legal`,
    description: article.description[locale],
    alternates: { canonical: `/${locale}/guide/${article.slug}` },
  };
}

function Fr({ locale }: { locale: Locale }) {
  return (
    <>
      <h2>La période d&rsquo;essai n&rsquo;est pas automatique</h2>
      <p>
        Sans clause explicite, la période d&rsquo;essai légale par défaut est
        d&rsquo;un mois, avec un délai de congé de 7 jours. Beaucoup de PME
        pensent bénéficier d&rsquo;une période de 3 mois &laquo;&nbsp;comme
        tout le monde&nbsp;&raquo; alors que ce n&rsquo;est vrai que si le
        contrat le prévoit expressément &mdash; jusqu&rsquo;à 3 mois maximum.
      </p>

      <h2>Délais de congé : ce qui est négociable, ce qui ne l&rsquo;est pas</h2>
      <p>
        Le Code des obligations fixe des délais minimaux selon
        l&rsquo;ancienneté (généralement 1 mois la première année, 2 mois
        de la 2e à la 9e année, 3 mois ensuite). Un contrat peut prévoir des
        délais plus longs, mais pas plus courts que ce minimum légal &mdash;
        une clause qui tenterait de le faire serait simplement nulle.
      </p>

      <h2>Clause de non-concurrence : des conditions strictes</h2>
      <p>
        Pour être valable, une clause de non-concurrence doit être limitée
        dans le temps, le lieu et le genre d&rsquo;affaires, et
        l&rsquo;employé doit avoir eu connaissance de la clientèle ou de
        secrets d&rsquo;affaires susceptibles de causer un préjudice sensible
        à l&rsquo;employeur. Une clause trop large ou appliquée à un poste
        sans réel accès à ces informations risque d&rsquo;être réduite ou
        annulée par un juge.
      </p>

      <h2>Heures supplémentaires et vacances : les points de friction fréquents</h2>
      <p>
        Un contrat qui ne précise pas le régime des heures supplémentaires
        (compensation en temps ou paiement, majoration éventuelle) ou qui
        reste vague sur le report des jours de vacances non pris génère la
        majorité des litiges à la fin d&rsquo;un rapport de travail &mdash;
        des clauses claires évitent la plupart de ces désaccords.
      </p>

      <h2>Une précision importante</h2>
      <p>
        Ce guide présente des règles générales, pas un conseil juridique
        personnalisé. Chaque situation (secteur, canton, convention
        collective applicable) a ses particularités.
      </p>

      <p>
        Pour la rédaction ou la relecture d&rsquo;un contrat de travail, voir{" "}
        <Link href={`/${locale}/#offre`}>nos formules d&rsquo;abonnement</Link>
        .
      </p>
    </>
  );
}

function De({ locale }: { locale: Locale }) {
  return (
    <>
      <h2>Die Probezeit ist nicht automatisch</h2>
      <p>
        Ohne ausdrückliche Klausel beträgt die gesetzliche Probezeit einen
        Monat, mit einer Kündigungsfrist von 7 Tagen. Viele KMU glauben, sie
        hätten &laquo;&nbsp;wie üblich&nbsp;&raquo; eine 3-monatige
        Probezeit, obwohl das nur gilt, wenn der Vertrag dies ausdrücklich
        vorsieht &mdash; bis maximal 3 Monate.
      </p>

      <h2>Kündigungsfristen: was verhandelbar ist, was nicht</h2>
      <p>
        Das Obligationenrecht legt Mindestfristen je nach Dienstjahren fest
        (in der Regel 1 Monat im ersten Jahr, 2 Monate vom 2. bis zum 9.
        Jahr, danach 3 Monate). Ein Vertrag kann längere, aber keine
        kürzeren Fristen vorsehen als dieses gesetzliche Minimum &mdash;
        eine Klausel, die das versuchen würde, wäre schlicht nichtig.
      </p>

      <h2>Konkurrenzverbot: strenge Voraussetzungen</h2>
      <p>
        Um gültig zu sein, muss ein Konkurrenzverbot zeitlich, örtlich und
        sachlich begrenzt sein, und die angestellte Person muss Einblick in
        Kundschaft oder Geschäftsgeheimnisse gehabt haben, die dem
        Arbeitgeber erheblich schaden könnten. Eine zu weit gefasste Klausel
        oder eine, die auf eine Stelle ohne echten Zugang zu solchen
        Informationen angewendet wird, riskiert eine gerichtliche
        Einschränkung oder Aufhebung.
      </p>

      <h2>Überstunden und Ferien: häufige Reibungspunkte</h2>
      <p>
        Ein Vertrag, der die Regelung von Überstunden (Zeitausgleich oder
        Auszahlung, allfälliger Zuschlag) nicht präzisiert oder beim
        Übertrag nicht bezogener Ferientage vage bleibt, erzeugt die meisten
        Streitigkeiten am Ende eines Arbeitsverhältnisses &mdash; klare
        Klauseln vermeiden die meisten dieser Meinungsverschiedenheiten.
      </p>

      <h2>Ein wichtiger Hinweis</h2>
      <p>
        Dieser Ratgeber stellt allgemeine Regeln dar, keine individuelle
        Rechtsberatung. Jede Situation (Branche, Kanton, anwendbarer
        Gesamtarbeitsvertrag) hat ihre Besonderheiten.
      </p>

      <p>
        Für die Erstellung oder Prüfung eines Arbeitsvertrags siehe{" "}
        <Link href={`/${locale}/#offre`}>unsere Abo-Formeln</Link>.
      </p>
    </>
  );
}

function En({ locale }: { locale: Locale }) {
  return (
    <>
      <h2>The probation period isn&rsquo;t automatic</h2>
      <p>
        Without an explicit clause, the default statutory probation period
        is one month, with a 7-day notice period. Many SMEs assume they get
        a 3-month period &ldquo;like everyone else&rdquo;, when that&rsquo;s
        only true if the contract expressly provides for it &mdash; up to 3
        months maximum.
      </p>

      <h2>Notice periods: what&rsquo;s negotiable, what isn&rsquo;t</h2>
      <p>
        The Code of Obligations sets minimum periods based on seniority
        (generally 1 month in the first year, 2 months from year 2 to 9, 3
        months after that). A contract can provide for longer periods, but
        never shorter than this legal minimum &mdash; a clause attempting
        to do so would simply be void.
      </p>

      <h2>Non-compete clauses: strict conditions</h2>
      <p>
        To be valid, a non-compete clause must be limited in time, place and
        scope of business, and the employee must have had access to
        clientele or business secrets capable of causing significant harm
        to the employer. An overly broad clause, or one applied to a
        position with no real access to such information, risks being
        reduced or struck down by a court.
      </p>

      <h2>Overtime and vacation: frequent friction points</h2>
      <p>
        A contract that doesn&rsquo;t specify the overtime regime (time off
        or payment, any premium) or stays vague on carrying over unused
        vacation days generates most disputes at the end of an employment
        relationship &mdash; clear clauses prevent most of these
        disagreements.
      </p>

      <h2>An important note</h2>
      <p>
        This guide presents general rules, not individualized legal advice.
        Every situation (industry, canton, applicable collective agreement)
        has its own particulars.
      </p>

      <p>
        For drafting or reviewing an employment contract, see{" "}
        <Link href={`/${locale}/#offre`}>our subscription plans</Link>.
      </p>
    </>
  );
}

function It({ locale }: { locale: Locale }) {
  return (
    <>
      <h2>Il periodo di prova non è automatico</h2>
      <p>
        Senza una clausola esplicita, il periodo di prova legale di default
        è di un mese, con un termine di disdetta di 7 giorni. Molte PMI
        pensano di beneficiare di un periodo di 3 mesi &laquo;&nbsp;come
        tutti&nbsp;&raquo;, mentre ciò è vero solo se il contratto lo prevede
        espressamente &mdash; fino a un massimo di 3 mesi.
      </p>

      <h2>Termini di disdetta: cosa è negoziabile, cosa no</h2>
      <p>
        Il Codice delle obbligazioni fissa termini minimi secondo
        l&rsquo;anzianità (generalmente 1 mese nel primo anno, 2 mesi dal
        2° al 9° anno, 3 mesi in seguito). Un contratto può prevedere
        termini più lunghi, ma non più brevi di questo minimo legale &mdash;
        una clausola che tentasse di farlo sarebbe semplicemente nulla.
      </p>

      <h2>Clausola di non concorrenza: condizioni rigorose</h2>
      <p>
        Per essere valida, una clausola di non concorrenza deve essere
        limitata nel tempo, nel luogo e nel genere di affari, e il
        dipendente deve aver avuto conoscenza della clientela o di segreti
        aziendali suscettibili di causare un pregiudizio sensibile
        al datore di lavoro. Una clausola troppo ampia o applicata a una
        posizione senza reale accesso a tali informazioni rischia di essere
        ridotta o annullata da un giudice.
      </p>

      <h2>Straordinari e ferie: i punti di frizione frequenti</h2>
      <p>
        Un contratto che non precisa il regime degli straordinari
        (compensazione in tempo o pagamento, eventuale maggiorazione) o
        resta vago sul riporto dei giorni di ferie non goduti genera la
        maggior parte delle controversie alla fine di un rapporto di
        lavoro &mdash; clausole chiare evitano la maggior parte di questi
        disaccordi.
      </p>

      <h2>Una precisazione importante</h2>
      <p>
        Questa guida presenta regole generali, non una consulenza legale
        personalizzata. Ogni situazione (settore, cantone, contratto
        collettivo applicabile) ha le proprie particolarità.
      </p>

      <p>
        Per la redazione o la revisione di un contratto di lavoro, vedere{" "}
        <Link href={`/${locale}/#offre`}>le nostre formule di abbonamento</Link>
        .
      </p>
    </>
  );
}

const COMPONENTS: Record<Locale, (props: { locale: Locale }) => ReactNode> = {
  fr: Fr,
  de: De,
  en: En,
  it: It,
};

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const Body = COMPONENTS[locale];

  return (
    <GuideLayout article={article} locale={locale}>
      <Body locale={locale} />
    </GuideLayout>
  );
}
