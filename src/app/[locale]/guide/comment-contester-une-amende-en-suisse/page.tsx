import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import GuideLayout from "@/components/site/GuideLayout";
import { getGuideArticle } from "@/lib/guide/articles";
import { isLocale, DEFAULT_LOCALE, type Locale } from "@/i18n/config";

const article = getGuideArticle("comment-contester-une-amende-en-suisse")!;

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
      <h2>Deux procédures bien différentes</h2>
      <p>
        En Suisse, tout ne se &laquo;&nbsp;conteste&nbsp;&raquo; pas de la
        même façon. Il faut d&rsquo;abord identifier ce que vous avez
        reçu&nbsp;:
      </p>
      <ul>
        <li>
          <strong>L&rsquo;amende d&rsquo;ordre</strong> (stationnement,
          léger excès de vitesse, petites infractions) : un montant fixe à
          payer sous <strong>30 jours</strong>. Il n&rsquo;y a pas de
          formulaire de &laquo;&nbsp;contestation&nbsp;&raquo; à
          proprement parler&nbsp;: vous payez (ce qui vaut acceptation
          définitive), ou vous ne payez pas et le dossier passe alors à une
          procédure pénale formelle.
        </li>
        <li>
          <strong>L&rsquo;ordonnance pénale</strong> : reçue après une
          infraction plus grave ou après le refus de payer une amende
          d&rsquo;ordre. Vous disposez alors de{" "}
          <strong>10 jours</strong> pour faire{" "}
          <strong>opposition</strong>, par écrit, auprès de
          l&rsquo;autorité qui l&rsquo;a émise.
        </li>
      </ul>
      <p>
        Confondre les deux, c&rsquo;est le premier piège&nbsp;: agir comme
        si vous aviez 30 jours alors que le délai réel est de 10 vous fait
        perdre votre droit de recours.
      </p>

      <h2>Payer, c&rsquo;est accepter</h2>
      <p>
        C&rsquo;est la règle la plus importante et la plus mal connue&nbsp;:
        régler une amende, même &laquo;&nbsp;pour être tranquille&nbsp;
        &raquo;, ferme définitivement le dossier. Il n&rsquo;existe ensuite
        aucun recours pour revenir dessus. Si vous avez un doute, ne payez
        pas avant d&rsquo;avoir vérifié vos options.
      </p>

      <h2>Les motifs qui ont de vraies chances</h2>
      <ul>
        <li>Erreur d&rsquo;identification (mauvais véhicule, mauvais conducteur)</li>
        <li>Signalisation absente, mal placée ou peu visible</li>
        <li>Défaut technique de l&rsquo;appareil de mesure ou de contrôle</li>
        <li>Circonstance exceptionnelle et documentable (urgence médicale, panne)</li>
      </ul>
      <p>
        À l&rsquo;inverse, &laquo;&nbsp;je ne savais pas&nbsp;&raquo; ou
        &laquo;&nbsp;tout le monde fait pareil&nbsp;&raquo; ne suffisent
        presque jamais&nbsp;: il faut un fait concret et si possible une
        preuve (photo, témoin, document).
      </p>

      <h2>Ce qui se passe après une opposition</h2>
      <p>
        L&rsquo;autorité réexamine le dossier. Selon les cas, elle peut
        annuler l&rsquo;amende, la maintenir, ou convoquer pour des
        explications complémentaires. Un examen sérieux du dossier avant
        d&rsquo;envoyer l&rsquo;opposition évite d&rsquo;engager une
        procédure vouée à l&rsquo;échec &mdash; c&rsquo;est exactement ce
        que fait notre{" "}
        <Link href={`/${locale}/#diagnostic`}>diagnostic gratuit</Link>.
      </p>

      <h2>Cas particuliers</h2>
      <p>
        L&rsquo;<Link href={`/${locale}/guide/exces-de-vitesse-suisse`}>excès
        de vitesse</Link> peut déclencher, en plus de l&rsquo;amende, une
        procédure séparée de{" "}
        <Link href={`/${locale}/guide/retrait-de-permis`}>retrait de
        permis</Link>. Les{" "}
        <Link href={`/${locale}/guide/amende-stationnement`}>amendes de
        stationnement</Link> et les{" "}
        <Link href={`/${locale}/guide/amende-cff-sans-billet`}>amendes
        CFF</Link> suivent des logiques un peu différentes, détaillées dans
        leurs guides dédiés.
      </p>

      <h2>Une précision importante</h2>
      <p>
        Ce guide présente des règles générales, pas un conseil juridique
        personnalisé. Chaque dossier a ses particularités &mdash;
        c&rsquo;est précisément ce que notre équipe vérifie avant de
        préparer votre opposition.
      </p>
    </>
  );
}

function De({ locale }: { locale: Locale }) {
  return (
    <>
      <h2>Zwei ganz unterschiedliche Verfahren</h2>
      <p>
        In der Schweiz lässt sich nicht alles auf die gleiche Weise
        &laquo;&nbsp;anfechten&nbsp;&raquo;. Zuerst müssen Sie erkennen, was
        Sie erhalten haben&nbsp;:
      </p>
      <ul>
        <li>
          <strong>Die Ordnungsbusse</strong> (Parkieren, leichte
          Geschwindigkeitsübertretung, kleinere Verstösse): ein Fixbetrag,
          zahlbar innert <strong>30 Tagen</strong>. Es gibt kein
          eigentliches &laquo;&nbsp;Anfechtungsformular&nbsp;&raquo;&nbsp;:
          Sie zahlen (was einer endgültigen Anerkennung gleichkommt), oder
          Sie zahlen nicht, und der Fall geht dann in ein formelles
          Strafverfahren über.
        </li>
        <li>
          <strong>Der Strafbefehl</strong>: erhalten nach einem schwereren
          Verstoss oder nach Nichtbezahlung einer Ordnungsbusse. Dann haben
          Sie <strong>10 Tage</strong> Zeit, schriftlich{" "}
          <strong>Einsprache</strong> bei der ausstellenden Behörde zu
          erheben.
        </li>
      </ul>
      <p>
        Die beiden zu verwechseln ist die häufigste Falle&nbsp;: Wer von 30
        Tagen ausgeht, obwohl die tatsächliche Frist 10 Tage beträgt,
        verliert sein Einspracherecht.
      </p>

      <h2>Zahlen heisst Anerkennen</h2>
      <p>
        Die wichtigste und am wenigsten bekannte Regel&nbsp;: Eine Busse zu
        begleichen &mdash; auch nur &laquo;&nbsp;um Ruhe zu haben&nbsp;
        &raquo; &mdash; schliesst den Fall endgültig ab. Danach gibt es
        keinen Weg zurück. Im Zweifel: nicht zahlen, bevor Sie Ihre
        Möglichkeiten geprüft haben.
      </p>

      <h2>Gründe mit echten Erfolgschancen</h2>
      <ul>
        <li>Identifikationsfehler (falsches Fahrzeug, falsche Person)</li>
        <li>Fehlende, falsch platzierte oder schlecht sichtbare Signalisation</li>
        <li>Technischer Mangel des Mess- oder Kontrollgeräts</li>
        <li>Aussergewöhnlicher, dokumentierbarer Umstand (medizinischer Notfall, Panne)</li>
      </ul>
      <p>
        Umgekehrt reichen &laquo;&nbsp;ich wusste es nicht&nbsp;&raquo; oder
        &laquo;&nbsp;das machen alle so&nbsp;&raquo; fast nie aus&nbsp;: Es
        braucht einen konkreten Sachverhalt und möglichst einen Beweis
        (Foto, Zeuge, Dokument).
      </p>

      <h2>Was nach einer Einsprache passiert</h2>
      <p>
        Die Behörde prüft den Fall erneut. Je nach Fall kann sie die Busse
        aufheben, bestätigen oder eine ergänzende Erklärung verlangen. Eine
        seriöse Prüfung vor dem Einreichen der Einsprache verhindert eine
        von vornherein aussichtslose Prozedur &mdash; genau das leistet
        unsere{" "}
        <Link href={`/${locale}/#diagnostic`}>kostenlose Diagnose</Link>.
      </p>

      <h2>Sonderfälle</h2>
      <p>
        Eine{" "}
        <Link href={`/${locale}/guide/exces-de-vitesse-suisse`}>
          Geschwindigkeitsübertretung
        </Link>{" "}
        kann zusätzlich zur Busse ein separates Verfahren zum{" "}
        <Link href={`/${locale}/guide/retrait-de-permis`}>
          Führerausweisentzug
        </Link>{" "}
        auslösen.{" "}
        <Link href={`/${locale}/guide/amende-stationnement`}>Parkbussen</Link>{" "}
        und{" "}
        <Link href={`/${locale}/guide/amende-cff-sans-billet`}>
          SBB-Bussen
        </Link>{" "}
        folgen etwas anderen Logiken, die in den jeweiligen Ratgebern
        erklärt werden.
      </p>

      <h2>Ein wichtiger Hinweis</h2>
      <p>
        Dieser Ratgeber stellt allgemeine Regeln dar, keine individuelle
        Rechtsberatung. Jeder Fall hat seine Besonderheiten &mdash; genau
        das prüft unser Team, bevor wir Ihre Einsprache vorbereiten.
      </p>
    </>
  );
}

function En({ locale }: { locale: Locale }) {
  return (
    <>
      <h2>Two very different procedures</h2>
      <p>
        In Switzerland, not everything is &ldquo;contested&rdquo; the same
        way. First identify what you actually received:
      </p>
      <ul>
        <li>
          <strong>The fixed penalty notice</strong> (parking, minor
          speeding, small offences): a fixed amount payable within{" "}
          <strong>30 days</strong>. There is no proper &ldquo;contest
          form&rdquo;: you pay (which counts as final acceptance), or you
          don&rsquo;t pay and the case moves to a formal criminal
          procedure.
        </li>
        <li>
          <strong>The penal order</strong>: issued after a more serious
          offence, or after refusing to pay a fixed penalty notice. You
          then have <strong>10 days</strong> to file a written{" "}
          <strong>objection</strong> with the issuing authority.
        </li>
      </ul>
      <p>
        Confusing the two is the most common trap: assuming you have 30
        days when the real deadline is 10 costs you your right to appeal.
      </p>

      <h2>Paying means accepting</h2>
      <p>
        The most important, least understood rule: paying a fine &mdash;
        even just &ldquo;to be done with it&rdquo; &mdash; closes the case
        for good. There is no way back afterwards. If in doubt, don&rsquo;t
        pay before checking your options.
      </p>

      <h2>Grounds with real chances</h2>
      <ul>
        <li>Identification error (wrong vehicle, wrong driver)</li>
        <li>Missing, poorly placed or barely visible signage</li>
        <li>A technical fault in the measuring or control device</li>
        <li>An exceptional, documentable circumstance (medical emergency, breakdown)</li>
      </ul>
      <p>
        By contrast, &ldquo;I didn&rsquo;t know&rdquo; or &ldquo;everyone
        does it&rdquo; almost never work: you need a concrete fact and,
        ideally, evidence (photo, witness, document).
      </p>

      <h2>What happens after an objection</h2>
      <p>
        The authority reviews the case again. Depending on the situation, it
        may cancel the fine, uphold it, or ask for further explanation. A
        serious review before filing saves you from a doomed procedure
        &mdash; exactly what our{" "}
        <Link href={`/${locale}/#diagnostic`}>free diagnostic</Link> does.
      </p>

      <h2>Special cases</h2>
      <p>
        <Link href={`/${locale}/guide/exces-de-vitesse-suisse`}>Speeding</Link>{" "}
        can trigger a separate{" "}
        <Link href={`/${locale}/guide/retrait-de-permis`}>
          licence suspension
        </Link>{" "}
        procedure on top of the fine.{" "}
        <Link href={`/${locale}/guide/amende-stationnement`}>
          Parking fines
        </Link>{" "}
        and{" "}
        <Link href={`/${locale}/guide/amende-cff-sans-billet`}>
          SBB/CFF fines
        </Link>{" "}
        follow slightly different logic, covered in their own guides.
      </p>

      <h2>An important note</h2>
      <p>
        This guide presents general rules, not individualized legal advice.
        Every case has its own particulars &mdash; which is exactly what
        our team checks before preparing your objection.
      </p>
    </>
  );
}

function It({ locale }: { locale: Locale }) {
  return (
    <>
      <h2>Due procedure molto diverse</h2>
      <p>
        In Svizzera non tutto si &laquo;&nbsp;contesta&nbsp;&raquo; allo
        stesso modo. Bisogna prima identificare cosa avete ricevuto&nbsp;:
      </p>
      <ul>
        <li>
          <strong>La multa disciplinare</strong> (parcheggio, lieve eccesso
          di velocità, piccole infrazioni): un importo fisso da pagare
          entro <strong>30 giorni</strong>. Non esiste un vero e proprio
          modulo di &laquo;&nbsp;contestazione&nbsp;&raquo;&nbsp;: pagate
          (il che equivale ad un&rsquo;accettazione definitiva), oppure non
          pagate e il caso passa a una procedura penale formale.
        </li>
        <li>
          <strong>Il decreto penale</strong>: ricevuto dopo
          un&rsquo;infrazione più grave o dopo il rifiuto di pagare una
          multa disciplinare. Avete allora <strong>10 giorni</strong> per
          presentare <strong>opposizione</strong> scritta
          all&rsquo;autorità che l&rsquo;ha emesso.
        </li>
      </ul>
      <p>
        Confondere i due è la trappola più comune&nbsp;: pensare di avere
        30 giorni quando il termine reale è di 10 vi fa perdere il diritto
        di ricorso.
      </p>

      <h2>Pagare significa accettare</h2>
      <p>
        La regola più importante e meno conosciuta&nbsp;: pagare una multa
        &mdash; anche solo &laquo;&nbsp;per tranquillità&nbsp;&raquo;
        &mdash; chiude definitivamente il caso. Non esiste poi alcun
        ricorso possibile. In caso di dubbio, non pagate prima di aver
        verificato le vostre opzioni.
      </p>

      <h2>I motivi con reali possibilità</h2>
      <ul>
        <li>Errore di identificazione (veicolo o conducente sbagliato)</li>
        <li>Segnaletica assente, mal posizionata o poco visibile</li>
        <li>Difetto tecnico dell&rsquo;apparecchio di misurazione o controllo</li>
        <li>Circostanza eccezionale e documentabile (emergenza medica, guasto)</li>
      </ul>
      <p>
        Al contrario, &laquo;&nbsp;non lo sapevo&nbsp;&raquo; o
        &laquo;&nbsp;lo fanno tutti&nbsp;&raquo; quasi mai bastano&nbsp;:
        serve un fatto concreto e, possibilmente, una prova (foto,
        testimone, documento).
      </p>

      <h2>Cosa succede dopo un&rsquo;opposizione</h2>
      <p>
        L&rsquo;autorità riesamina il caso. A seconda dei casi, può
        annullare la multa, mantenerla, o chiedere spiegazioni
        supplementari. Un esame serio del caso prima di inviare
        l&rsquo;opposizione evita di avviare una procedura destinata al
        fallimento &mdash; è esattamente ciò che fa la nostra{" "}
        <Link href={`/${locale}/#diagnostic`}>diagnosi gratuita</Link>.
      </p>

      <h2>Casi particolari</h2>
      <p>
        L&rsquo;<Link href={`/${locale}/guide/exces-de-vitesse-suisse`}>eccesso
        di velocità</Link> può innescare, oltre alla multa, una procedura
        separata di{" "}
        <Link href={`/${locale}/guide/retrait-de-permis`}>ritiro della
        licenza</Link>. Le{" "}
        <Link href={`/${locale}/guide/amende-stationnement`}>multe per
        parcheggio</Link> e le{" "}
        <Link href={`/${locale}/guide/amende-cff-sans-billet`}>multe
        FFS</Link> seguono logiche leggermente diverse, illustrate nelle
        rispettive guide.
      </p>

      <h2>Una precisazione importante</h2>
      <p>
        Questa guida presenta regole generali, non una consulenza legale
        personalizzata. Ogni caso ha le proprie particolarità &mdash; è
        esattamente ciò che il nostro team verifica prima di preparare la
        vostra opposizione.
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
