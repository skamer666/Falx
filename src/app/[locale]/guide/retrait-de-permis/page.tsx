import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import GuideLayout from "@/components/site/GuideLayout";
import { getGuideArticle } from "@/lib/guide/articles";
import { isLocale, DEFAULT_LOCALE, type Locale } from "@/i18n/config";

const article = getGuideArticle("retrait-de-permis")!;

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
      <h2>Une procédure administrative, pas pénale</h2>
      <p>
        Le retrait de permis est décidé par l&rsquo;office cantonal de la
        circulation routière, indépendamment de l&rsquo;amende ou de
        l&rsquo;ordonnance pénale liée aux mêmes faits (voir notre{" "}
        <Link href={`/${locale}/guide/comment-contester-une-amende-en-suisse`}>
          guide général
        </Link>
        ). Les deux dossiers suivent des calendriers et des autorités
        différentes&nbsp;: être acquitté au pénal n&rsquo;empêche pas
        forcément une mesure administrative, et inversement.
      </p>

      <h2>Ce qui détermine la durée</h2>
      <ul>
        <li>La gravité de l&rsquo;infraction (légère, moyenne, grave)</li>
        <li>Les antécédents des 5 à 10 dernières années</li>
        <li>Le statut du conducteur (permis probatoire ou définitif)</li>
        <li>Le besoin professionnel avéré du permis, dans certaines limites</li>
      </ul>
      <p>
        Une première infraction légère peut se solder par un avertissement
        sans retrait&nbsp;; une récidive ou une infraction grave entraîne
        des durées nettement plus longues, parfois un retrait de sécurité à
        durée indéterminée en cas de doute sur l&rsquo;aptitude à conduire.
      </p>

      <h2>Vos options face à une décision</h2>
      <p>
        Une décision de retrait notifiée peut généralement faire
        l&rsquo;objet d&rsquo;un recours auprès de l&rsquo;instance
        cantonale compétente, dans un délai précisé sur la décision
        elle-même. C&rsquo;est un délai à ne surtout pas laisser filer&nbsp;:
        contrairement à une amende, il n&rsquo;y a pas de
        &laquo;&nbsp;payer pour clore le dossier&nbsp;&raquo; possible
        ici.
      </p>

      <h2>Où nous pouvons vous aider, et où nous nous arrêtons</h2>
      <p>
        Pour un retrait de courte durée suite à une infraction légère,
        notre diagnostic et notre pack de contestation peuvent vous aider à
        structurer un recours. Pour les dossiers plus lourds (récidive,
        infraction grave, enjeu professionnel important), nous vous
        orientons vers un avocat spécialisé en droit de la circulation
        &mdash; Thrax Legal n&rsquo;est pas un cabinet d&rsquo;avocats et
        n&rsquo;assure pas la représentation devant les tribunaux.
      </p>
    </>
  );
}

function De({ locale }: { locale: Locale }) {
  return (
    <>
      <h2>Ein Verwaltungsverfahren, kein Strafverfahren</h2>
      <p>
        Der Führerausweisentzug wird vom kantonalen Strassenverkehrsamt
        verfügt, unabhängig von der Busse oder dem Strafbefehl zum gleichen
        Sachverhalt (siehe unseren{" "}
        <Link href={`/${locale}/guide/comment-contester-une-amende-en-suisse`}>
          allgemeinen Ratgeber
        </Link>
        ). Beide Verfahren folgen unterschiedlichen Fristen und Behörden&nbsp;:
        ein strafrechtlicher Freispruch verhindert nicht zwingend eine
        Administrativmassnahme, und umgekehrt.
      </p>

      <h2>Was die Dauer bestimmt</h2>
      <ul>
        <li>Die Schwere des Verstosses (leicht, mittel, schwer)</li>
        <li>Vorstrafen der letzten 5 bis 10 Jahre</li>
        <li>Der Status der fahrenden Person (Lernfahrausweis, Probezeit oder definitiv)</li>
        <li>Ein nachgewiesener beruflicher Bedarf des Ausweises, innerhalb gewisser Grenzen</li>
      </ul>
      <p>
        Ein erster leichter Verstoss kann mit einer Verwarnung ohne Entzug
        enden; ein Rückfall oder ein schwerer Verstoss führt zu deutlich
        längeren Dauern, im Zweifel an der Fahreignung sogar zu einem
        Sicherungsentzug auf unbestimmte Zeit.
      </p>

      <h2>Ihre Möglichkeiten bei einer Verfügung</h2>
      <p>
        Gegen eine eröffnete Entzugsverfügung kann in der Regel bei der
        zuständigen kantonalen Instanz Beschwerde erhoben werden, innert
        der auf der Verfügung angegebenen Frist. Diese Frist darf
        keinesfalls verstreichen&nbsp;: anders als bei einer Busse gibt es
        hier kein &laquo;&nbsp;bezahlen, um den Fall abzuschliessen&nbsp;
        &raquo;.
      </p>

      <h2>Wo wir helfen können, und wo wir aufhören</h2>
      <p>
        Bei einem kurzen Entzug nach einem leichten Verstoss können unsere
        Diagnose und unser Anfechtungspaket helfen, eine Beschwerde
        strukturiert aufzubauen. Bei schwerwiegenderen Fällen (Rückfall,
        schwerer Verstoss, erhebliche berufliche Betroffenheit) verweisen
        wir Sie an eine auf Verkehrsrecht spezialisierte Anwältin oder
        einen Anwalt &mdash; Thrax Legal ist keine Anwaltskanzlei und
        übernimmt keine Vertretung vor Gericht.
      </p>
    </>
  );
}

function En({ locale }: { locale: Locale }) {
  return (
    <>
      <h2>An administrative procedure, not a criminal one</h2>
      <p>
        Licence suspension is decided by the cantonal road traffic office,
        independently of the fine or penal order relating to the same
        facts (see our{" "}
        <Link href={`/${locale}/guide/comment-contester-une-amende-en-suisse`}>
          general guide
        </Link>
        ). The two cases follow different timelines and authorities:
        being acquitted on the criminal side doesn&rsquo;t necessarily
        prevent an administrative measure, and vice versa.
      </p>

      <h2>What determines the duration</h2>
      <ul>
        <li>The severity of the offence (minor, medium, serious)</li>
        <li>Any record from the past 5 to 10 years</li>
        <li>The driver&rsquo;s status (probationary or full licence)</li>
        <li>A proven professional need for the licence, within certain limits</li>
      </ul>
      <p>
        A first minor offence may end with a warning and no suspension; a
        repeat or serious offence leads to significantly longer periods,
        sometimes an indefinite safety suspension if fitness to drive is in
        doubt.
      </p>

      <h2>Your options once a decision is issued</h2>
      <p>
        A suspension decision can generally be appealed to the competent
        cantonal body, within the deadline stated on the decision itself.
        This is a deadline you cannot afford to miss: unlike a fine, there
        is no &ldquo;pay to close the case&rdquo; option here.
      </p>

      <h2>Where we can help, and where we stop</h2>
      <p>
        For a short suspension following a minor offence, our diagnostic
        and contestation pack can help you structure an appeal. For heavier
        cases (repeat offences, serious violations, significant
        professional impact), we refer you to a lawyer specialised in road
        traffic law &mdash; Thrax Legal is not a law firm and does not
        represent clients before courts.
      </p>
    </>
  );
}

function It({ locale }: { locale: Locale }) {
  return (
    <>
      <h2>Una procedura amministrativa, non penale</h2>
      <p>
        Il ritiro della licenza è deciso dall&rsquo;ufficio cantonale della
        circolazione, indipendentemente dalla multa o dal decreto penale
        legati agli stessi fatti (vedi la nostra{" "}
        <Link href={`/${locale}/guide/comment-contester-une-amende-en-suisse`}>
          guida generale
        </Link>
        ). Le due pratiche seguono calendari e autorità diverse&nbsp;:
        essere assolti in sede penale non impedisce necessariamente una
        misura amministrativa, e viceversa.
      </p>

      <h2>Cosa determina la durata</h2>
      <ul>
        <li>La gravità dell&rsquo;infrazione (lieve, media, grave)</li>
        <li>I precedenti degli ultimi 5-10 anni</li>
        <li>Lo statuto del conducente (licenza in prova o definitiva)</li>
        <li>Un comprovato bisogno professionale della licenza, entro certi limiti</li>
      </ul>
      <p>
        Una prima infrazione lieve può risolversi con un avvertimento senza
        ritiro; una recidiva o un&rsquo;infrazione grave comporta durate
        nettamente più lunghe, talvolta un ritiro precauzionale a tempo
        indeterminato in caso di dubbio sull&rsquo;idoneità alla guida.
      </p>

      <h2>Le vostre opzioni di fronte a una decisione</h2>
      <p>
        Una decisione di ritiro notificata può generalmente essere
        impugnata presso l&rsquo;istanza cantonale competente, entro il
        termine indicato sulla decisione stessa. Un termine da non lasciar
        scadere assolutamente&nbsp;: a differenza di una multa, qui non
        esiste la possibilità di &laquo;&nbsp;pagare per chiudere il
        caso&nbsp;&raquo;.
      </p>

      <h2>Dove possiamo aiutare, e dove ci fermiamo</h2>
      <p>
        Per un ritiro di breve durata dovuto a un&rsquo;infrazione lieve, la
        nostra diagnosi e il nostro pack di contestazione possono aiutarvi
        a strutturare un ricorso. Per i casi più pesanti (recidiva,
        infrazione grave, importante impatto professionale), vi indirizziamo
        verso un avvocato specializzato in diritto della circolazione
        &mdash; Thrax Legal non è uno studio legale e non garantisce la
        rappresentanza davanti ai tribunali.
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
