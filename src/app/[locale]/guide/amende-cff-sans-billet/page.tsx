import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import GuideLayout from "@/components/site/GuideLayout";
import { getGuideArticle } from "@/lib/guide/articles";
import { isLocale, DEFAULT_LOCALE, type Locale } from "@/i18n/config";

const article = getGuideArticle("amende-cff-sans-billet")!;

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
      <h2>Une amende à part, contractuelle plutôt que pénale</h2>
      <p>
        L&rsquo;amende pour voyage sans titre de transport valable
        n&rsquo;est pas une amende pénale comme celle du Code de la route
        &mdash; c&rsquo;est une <strong>indemnité contractuelle</strong>{" "}
        prévue par les conditions de transport. La logique de contestation
        est donc différente de notre{" "}
        <Link href={`/${locale}/guide/comment-contester-une-amende-en-suisse`}>
          guide général sur les amendes de circulation
        </Link>
        .
      </p>

      <h2>Les cas qui ont une vraie chance</h2>
      <ul>
        <li>
          <strong>Panne avérée de l&rsquo;application ou du distributeur</strong>
          &nbsp;: capture d&rsquo;écran, message d&rsquo;erreur ou témoin
          disponible au moment des faits.
        </li>
        <li>
          <strong>Titre de transport valable mais mal présenté</strong> :
          abonnement sur un autre support, billet acheté juste avant le
          contrôle et visible dans l&rsquo;historique.
        </li>
        <li>
          <strong>Correspondance ratée à cause du réseau</strong> : retard
          documenté d&rsquo;un premier train ayant empêché l&rsquo;achat
          dans les temps.
        </li>
        <li>
          <strong>Erreur d&rsquo;identité ou de contrôle</strong> : montant
          ou trajet ne correspondant pas à la réalité du déplacement.
        </li>
      </ul>

      <h2>Ce qui ne marche presque jamais</h2>
      <p>
        &laquo;&nbsp;Je n&rsquo;ai pas eu le temps d&rsquo;acheter&nbsp;
        &raquo; ou &laquo;&nbsp;le distributeur était loin&nbsp;&raquo; sont
        rejetés dans la quasi-totalité des cas&nbsp;: l&rsquo;obligation
        d&rsquo;être en possession d&rsquo;un titre valable avant le
        départ est stricte et bien connue des entreprises de transport.
      </p>

      <h2>Le bon réflexe : agir vite</h2>
      <p>
        Les entreprises de transport appliquent des délais de réclamation
        souvent plus courts que ceux d&rsquo;une amende pénale classique.
        Rassemblez vos preuves (captures d&rsquo;écran, horodatage,
        justificatif d&rsquo;achat) le jour même si possible.
      </p>
    </>
  );
}

function De({ locale }: { locale: Locale }) {
  return (
    <>
      <h2>Eine Busse für sich, vertraglich statt strafrechtlich</h2>
      <p>
        Die Busse für das Reisen ohne gültigen Fahrausweis ist keine
        Strafbusse wie im Strassenverkehrsrecht &mdash; sie ist eine{" "}
        <strong>vertragliche Entschädigung</strong>, die in den
        Beförderungsbedingungen vorgesehen ist. Die Logik der Anfechtung
        unterscheidet sich daher von unserem{" "}
        <Link href={`/${locale}/guide/comment-contester-une-amende-en-suisse`}>
          allgemeinen Ratgeber zu Verkehrsbussen
        </Link>
        .
      </p>

      <h2>Fälle mit echten Chancen</h2>
      <ul>
        <li>
          <strong>Nachweislicher Ausfall der App oder des Automaten</strong>
          : Screenshot, Fehlermeldung oder verfügbare Zeugenaussage zum
          Zeitpunkt des Vorfalls.
        </li>
        <li>
          <strong>Gültiger, aber falsch vorgezeigter Fahrausweis</strong>:
          Abo auf einem anderen Träger, Billett kurz vor der Kontrolle
          gekauft und im Verlauf sichtbar.
        </li>
        <li>
          <strong>Verpasster Anschluss wegen Netzstörung</strong>: belegte
          Verspätung eines ersten Zuges, die den rechtzeitigen Kauf
          verhinderte.
        </li>
        <li>
          <strong>Identitäts- oder Kontrollfehler</strong>: Betrag oder
          Strecke stimmt nicht mit der tatsächlichen Fahrt überein.
        </li>
      </ul>

      <h2>Was fast nie funktioniert</h2>
      <p>
        &laquo;&nbsp;Ich hatte keine Zeit zu kaufen&nbsp;&raquo; oder
        &laquo;&nbsp;der Automat war weit weg&nbsp;&raquo; werden fast
        immer abgelehnt&nbsp;: Die Pflicht, vor der Abfahrt einen gültigen
        Fahrausweis zu besitzen, ist strikt und den Transportunternehmen
        bestens bekannt.
      </p>

      <h2>Der richtige Reflex: schnell handeln</h2>
      <p>
        Transportunternehmen wenden oft kürzere Reklamationsfristen an als
        bei einer klassischen Strafbusse. Sammeln Sie Ihre Beweise
        (Screenshots, Zeitstempel, Kaufbeleg) wenn möglich noch am selben
        Tag.
      </p>
    </>
  );
}

function En({ locale }: { locale: Locale }) {
  return (
    <>
      <h2>A fine apart: contractual, not criminal</h2>
      <p>
        The fine for travelling without a valid ticket is not a criminal
        fine like a traffic offence &mdash; it is a{" "}
        <strong>contractual penalty</strong> set out in the carrier&rsquo;s
        terms of transport. The logic for contesting it differs from our{" "}
        <Link href={`/${locale}/guide/comment-contester-une-amende-en-suisse`}>
          general guide to traffic fines
        </Link>
        .
      </p>

      <h2>Cases with real chances</h2>
      <ul>
        <li>
          <strong>Proven app or ticket machine failure</strong>: a
          screenshot, error message, or an available witness at the time.
        </li>
        <li>
          <strong>A valid ticket shown incorrectly</strong>: a pass on
          another device, a ticket bought just before the check and
          visible in the purchase history.
        </li>
        <li>
          <strong>Missed connection due to a network disruption</strong>: a
          documented delay of an earlier train that prevented buying in
          time.
        </li>
        <li>
          <strong>Identity or check error</strong>: the amount or route
          doesn&rsquo;t match the actual journey.
        </li>
      </ul>

      <h2>What almost never works</h2>
      <p>
        &ldquo;I didn&rsquo;t have time to buy one&rdquo; or &ldquo;the
        machine was far away&rdquo; are rejected in nearly every case: the
        obligation to hold a valid ticket before departure is strict and
        well known to transport companies.
      </p>

      <h2>The right move: act fast</h2>
      <p>
        Transport companies often apply shorter complaint deadlines than a
        classic criminal fine. Gather your evidence (screenshots,
        timestamps, proof of purchase) the same day if possible.
      </p>
    </>
  );
}

function It({ locale }: { locale: Locale }) {
  return (
    <>
      <h2>Una multa a parte, contrattuale non penale</h2>
      <p>
        La multa per viaggio senza titolo di trasporto valido non è una
        multa penale come quella del codice della strada &mdash; è
        un&rsquo;<strong>indennità contrattuale</strong> prevista dalle
        condizioni di trasporto. La logica di contestazione è quindi
        diversa dalla nostra{" "}
        <Link href={`/${locale}/guide/comment-contester-une-amende-en-suisse`}>
          guida generale sulle multe stradali
        </Link>
        .
      </p>

      <h2>I casi con reali possibilità</h2>
      <ul>
        <li>
          <strong>Guasto comprovato dell&rsquo;app o del distributore</strong>
          : screenshot, messaggio d&rsquo;errore o testimone disponibile al
          momento dei fatti.
        </li>
        <li>
          <strong>Titolo di trasporto valido ma mostrato male</strong>:
          abbonamento su un altro supporto, biglietto acquistato poco prima
          del controllo e visibile nella cronologia.
        </li>
        <li>
          <strong>Coincidenza persa a causa della rete</strong>: ritardo
          documentato di un primo treno che ha impedito
          l&rsquo;acquisto in tempo.
        </li>
        <li>
          <strong>Errore di identità o di controllo</strong>: importo o
          tragitto non corrispondenti alla realtà dello spostamento.
        </li>
      </ul>

      <h2>Ciò che quasi non funziona mai</h2>
      <p>
        &laquo;&nbsp;Non ho avuto tempo di comprare&nbsp;&raquo; o
        &laquo;&nbsp;il distributore era lontano&nbsp;&raquo; vengono
        respinti nella quasi totalità dei casi&nbsp;: l&rsquo;obbligo di
        essere in possesso di un titolo valido prima della partenza è
        rigoroso e ben noto alle aziende di trasporto.
      </p>

      <h2>Il riflesso giusto: agire in fretta</h2>
      <p>
        Le aziende di trasporto applicano spesso termini di reclamo più
        brevi rispetto a una multa penale classica. Raccogliete le vostre
        prove (screenshot, orario, giustificativo d&rsquo;acquisto) lo
        stesso giorno se possibile.
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
