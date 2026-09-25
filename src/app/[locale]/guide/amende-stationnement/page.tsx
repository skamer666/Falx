import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import GuideLayout from "@/components/site/GuideLayout";
import { getGuideArticle } from "@/lib/guide/articles";
import { isLocale, DEFAULT_LOCALE, type Locale } from "@/i18n/config";

const article = getGuideArticle("amende-stationnement")!;

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
      <h2>La grande majorité des cas ne se contestent pas</h2>
      <p>
        Soyons honnêtes tout de suite&nbsp;: une amende de stationnement
        pour un simple oubli (disque non mis, parcmètre expiré de quelques
        minutes) est presque toujours confirmée en cas de contestation.
        Notre diagnostic gratuit sert justement à vous éviter de perdre du
        temps &mdash; et le prix du service &mdash; sur un dossier sans
        chance.
      </p>

      <h2>Les cas où ça vaut vraiment la peine</h2>
      <ul>
        <li>
          <strong>Signalisation manquante ou ambiguë</strong> : zone payante
          non indiquée clairement, panneau caché par de la végétation ou un
          autre véhicule.
        </li>
        <li>
          <strong>Véhicule prêté ou loué</strong> : vous n&rsquo;étiez pas
          le conducteur au moment des faits.
        </li>
        <li>
          <strong>Place spécifique mal définie</strong> : marquage au sol
          effacé ou zones limitrophes contradictoires.
        </li>
        <li>
          <strong>Erreur matérielle</strong> : mauvaise plaque
          d&rsquo;immatriculation relevée, horaire de contrôle incohérent
          avec les faits.
        </li>
      </ul>

      <h2>Ce que vous risquez en contestant à tort</h2>
      <p>
        Rien de pire qu&rsquo;une amende non payée&nbsp;: en cas de rejet de
        la contestation, vous devez de toute façon régler le montant
        initial, parfois avec des frais de rappel en plus si le délai a
        entretemps été dépassé. C&rsquo;est pour ça qu&rsquo;un avis
        honnête avant d&rsquo;agir a de la valeur.
      </p>

      <h2>Zones bleues, macarons et exceptions locales</h2>
      <p>
        Chaque commune a ses propres règles de zone bleue, macarons
        résidents et horaires de contrôle. Une contestation efficace doit
        s&rsquo;appuyer sur le règlement communal exact applicable à
        l&rsquo;endroit concerné, pas sur une règle générale.
      </p>

      <p>
        Pour la procédure générale (délais, autorité compétente), consultez
        notre{" "}
        <Link href={`/${locale}/guide/comment-contester-une-amende-en-suisse`}>
          guide sur la contestation d&rsquo;amende en Suisse
        </Link>
        .
      </p>
    </>
  );
}

function De({ locale }: { locale: Locale }) {
  return (
    <>
      <h2>Die meisten Fälle lassen sich nicht anfechten</h2>
      <p>
        Seien wir gleich ehrlich&nbsp;: Eine Parkbusse wegen einer einfachen
        Nachlässigkeit (Parkscheibe nicht gestellt, Parkuhr um wenige
        Minuten überzogen) wird bei einer Anfechtung fast immer bestätigt.
        Genau dafür dient unsere kostenlose Diagnose &mdash; damit Sie
        keine Zeit und kein Geld für ein aussichtsloses Verfahren
        aufwenden.
      </p>

      <h2>Wann es sich wirklich lohnt</h2>
      <ul>
        <li>
          <strong>Fehlende oder mehrdeutige Signalisation</strong>: nicht
          klar gekennzeichnete gebührenpflichtige Zone, durch Vegetation
          oder ein anderes Fahrzeug verdecktes Schild.
        </li>
        <li>
          <strong>Geliehenes oder gemietetes Fahrzeug</strong>: Sie waren
          zum Tatzeitpunkt nicht die fahrende Person.
        </li>
        <li>
          <strong>Unklar definierter Parkplatz</strong>: verblasste
          Bodenmarkierung oder widersprüchliche angrenzende Zonen.
        </li>
        <li>
          <strong>Sachfehler</strong>: falsches Kontrollschild notiert,
          Kontrollzeit unstimmig mit dem Sachverhalt.
        </li>
      </ul>

      <h2>Das Risiko einer unbegründeten Anfechtung</h2>
      <p>
        Nichts ist schlimmer als eine unbezahlte Busse&nbsp;: Wird die
        Einsprache abgewiesen, müssen Sie den ursprünglichen Betrag ohnehin
        begleichen, mitunter mit zusätzlichen Mahngebühren, falls die Frist
        inzwischen verstrichen ist. Deshalb lohnt sich eine ehrliche
        Einschätzung vor dem Handeln.
      </p>

      <h2>Blaue Zonen, Parkkarten und lokale Ausnahmen</h2>
      <p>
        Jede Gemeinde hat ihre eigenen Regeln für blaue Zonen,
        Anwohnerparkkarten und Kontrollzeiten. Eine wirksame Einsprache muss
        sich auf das genaue kommunale Reglement des betreffenden Ortes
        stützen, nicht auf eine allgemeine Regel.
      </p>

      <p>
        Für das allgemeine Verfahren (Fristen, zuständige Behörde) siehe
        unseren{" "}
        <Link href={`/${locale}/guide/comment-contester-une-amende-en-suisse`}>
          Ratgeber zur Anfechtung von Bussen in der Schweiz
        </Link>
        .
      </p>
    </>
  );
}

function En({ locale }: { locale: Locale }) {
  return (
    <>
      <h2>Most cases cannot be contested</h2>
      <p>
        Let&rsquo;s be honest upfront: a parking fine for a simple oversight
        (no parking disc, meter expired by a few minutes) is almost always
        upheld if contested. That&rsquo;s exactly what our free diagnostic
        is for &mdash; so you don&rsquo;t waste time or money on a hopeless
        case.
      </p>

      <h2>When it&rsquo;s genuinely worth it</h2>
      <ul>
        <li>
          <strong>Missing or ambiguous signage</strong>: a paid zone not
          clearly indicated, a sign hidden by vegetation or another
          vehicle.
        </li>
        <li>
          <strong>Borrowed or rented car</strong>: you were not the driver
          at the time.
        </li>
        <li>
          <strong>Poorly defined parking spot</strong>: faded ground
          markings or conflicting adjacent zones.
        </li>
        <li>
          <strong>Clerical error</strong>: wrong licence plate recorded, a
          check time inconsistent with the facts.
        </li>
      </ul>

      <h2>The risk of contesting without grounds</h2>
      <p>
        Nothing is worse than an unpaid fine: if the objection is rejected,
        you still owe the original amount, sometimes with reminder fees on
        top if the deadline has since passed. That&rsquo;s why an honest
        assessment before acting has real value.
      </p>

      <h2>Blue zones, resident permits and local exceptions</h2>
      <p>
        Every municipality has its own rules for blue zones, resident
        permits and enforcement hours. An effective objection needs to rely
        on the exact local regulation for that specific location, not a
        general rule.
      </p>

      <p>
        For the general procedure (deadlines, competent authority), see our{" "}
        <Link href={`/${locale}/guide/comment-contester-une-amende-en-suisse`}>
          guide to contesting a fine in Switzerland
        </Link>
        .
      </p>
    </>
  );
}

function It({ locale }: { locale: Locale }) {
  return (
    <>
      <h2>La maggior parte dei casi non si contesta</h2>
      <p>
        Siamo onesti subito&nbsp;: una multa per parcheggio dovuta a una
        semplice dimenticanza (disco orario non esposto, parchimetro
        scaduto di pochi minuti) viene quasi sempre confermata in caso di
        contestazione. La nostra diagnosi gratuita serve proprio a evitarvi
        di perdere tempo &mdash; e il prezzo del servizio &mdash; su un
        caso senza possibilità.
      </p>

      <h2>Quando vale davvero la pena</h2>
      <ul>
        <li>
          <strong>Segnaletica mancante o ambigua</strong>: zona a pagamento
          non chiaramente indicata, cartello nascosto da vegetazione o da
          un altro veicolo.
        </li>
        <li>
          <strong>Veicolo prestato o noleggiato</strong>: non eravate voi
          alla guida al momento dei fatti.
        </li>
        <li>
          <strong>Posto mal definito</strong>: segnaletica orizzontale
          cancellata o zone limitrofe contraddittorie.
        </li>
        <li>
          <strong>Errore materiale</strong>: targa errata rilevata, orario
          di controllo incoerente con i fatti.
        </li>
      </ul>

      <h2>Il rischio di contestare senza motivo</h2>
      <p>
        Niente di peggio di una multa non pagata&nbsp;: in caso di rigetto
        della contestazione, dovrete comunque pagare l&rsquo;importo
        iniziale, a volte con spese di sollecito aggiuntive se il termine
        nel frattempo è scaduto. Per questo una valutazione onesta prima di
        agire ha valore.
      </p>

      <h2>Zone blu, contrassegni e eccezioni locali</h2>
      <p>
        Ogni comune ha le proprie regole per zone blu, contrassegni
        residenti e orari di controllo. Un&rsquo;opposizione efficace deve
        basarsi sul regolamento comunale esatto applicabile al luogo in
        questione, non su una regola generale.
      </p>

      <p>
        Per la procedura generale (termini, autorità competente),
        consultate la nostra{" "}
        <Link href={`/${locale}/guide/comment-contester-une-amende-en-suisse`}>
          guida su come contestare una multa in Svizzera
        </Link>
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
