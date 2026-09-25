import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import GuideLayout from "@/components/site/GuideLayout";
import { getGuideArticle } from "@/lib/guide/articles";
import { isLocale, DEFAULT_LOCALE, type Locale } from "@/i18n/config";

const article = getGuideArticle("exces-de-vitesse-suisse")!;

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
      <h2>Deux dossiers séparés, deux logiques</h2>
      <p>
        Un excès de vitesse peut déclencher <strong>deux procédures
        indépendantes</strong> qui se contestent chacune de leur côté&nbsp;:
        l&rsquo;amende ou l&rsquo;ordonnance pénale d&rsquo;un côté (voir
        notre{" "}
        <Link href={`/${locale}/guide/comment-contester-une-amende-en-suisse`}>
          guide général
        </Link>
        ), et un éventuel{" "}
        <Link href={`/${locale}/guide/retrait-de-permis`}>retrait de
        permis</Link> de l&rsquo;autre, décidé séparément par
        l&rsquo;office cantonal de la circulation routière.
      </p>

      <h2>Ce qui détermine la gravité</h2>
      <p>
        Le seuil qui déclenche des conséquences sérieuses dépend du type de
        route&nbsp;: la marge tolérée avant sanction lourde est plus
        étroite en localité que sur autoroute. Au-delà d&rsquo;un certain
        dépassement, on entre dans le champ des délits graves de la
        circulation routière, avec des conséquences pénales et
        administratives nettement plus importantes qu&rsquo;une simple
        amende.
      </p>

      <h2>Ce qu&rsquo;il faut vérifier avant de contester</h2>
      <ul>
        <li>Le véhicule et le conducteur identifiés correspondent-ils bien à la réalité ?</li>
        <li>La zone de mesure était-elle clairement signalée si la loi l&rsquo;exige ?</li>
        <li>L&rsquo;appareil de mesure a-t-il fait l&rsquo;objet d&rsquo;un contrôle métrologique valide ?</li>
        <li>La marge de tolérance technique a-t-elle bien été déduite du résultat affiché ?</li>
      </ul>
      <p>
        Ce sont des vérifications précises, souvent techniques &mdash;
        c&rsquo;est exactement ce que couvre notre diagnostic avant de vous
        proposer un pack de contestation.
      </p>

      <h2>Jeunes conducteurs et récidive</h2>
      <p>
        Les personnes en période probatoire ou déjà sanctionnées récemment
        sont traitées plus sévèrement, avec des marges de manœuvre
        réduites. Ce facteur compte dans l&rsquo;évaluation réaliste de vos
        chances.
      </p>

      <h2>Notre recommandation</h2>
      <p>
        Face à un dépassement mineur avec un doute sur la mesure ou la
        signalisation, une contestation bien argumentée vaut la peine. Face
        à un dépassement important pouvant mener à une peine privative de
        liberté, un accompagnement par un avocat spécialisé en droit de la
        circulation est plus indiqué qu&rsquo;un simple modèle de lettre
        &mdash; nous vous orientons dans ce cas plutôt que de vous vendre
        un service inadapté.
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
      <h2>Zwei getrennte Verfahren, zwei Logiken</h2>
      <p>
        Eine Geschwindigkeitsübertretung kann{" "}
        <strong>zwei unabhängige Verfahren</strong> auslösen, die jeweils
        separat angefochten werden&nbsp;: die Busse bzw. der Strafbefehl auf
        der einen Seite (siehe unseren{" "}
        <Link href={`/${locale}/guide/comment-contester-une-amende-en-suisse`}>
          allgemeinen Ratgeber
        </Link>
        ), und ein allfälliger{" "}
        <Link href={`/${locale}/guide/retrait-de-permis`}>
          Führerausweisentzug
        </Link>{" "}
        auf der anderen, separat vom kantonalen Strassenverkehrsamt
        entschieden.
      </p>

      <h2>Was den Schweregrad bestimmt</h2>
      <p>
        Die Schwelle für ernsthafte Konsequenzen hängt von der Strassenart
        ab&nbsp;: der tolerierte Spielraum vor einer schweren Sanktion ist
        innerorts enger als auf der Autobahn. Ab einer gewissen
        Überschreitung fällt man in den Bereich der schweren
        Strassenverkehrsdelikte, mit deutlich weitreichenderen straf- und
        administrativrechtlichen Folgen als bei einer einfachen Busse.
      </p>

      <h2>Was vor einer Anfechtung zu prüfen ist</h2>
      <ul>
        <li>Entsprechen Fahrzeug und identifizierte Person tatsächlich den Tatsachen?</li>
        <li>War die Messzone klar signalisiert, sofern gesetzlich vorgeschrieben?</li>
        <li>Verfügte das Messgerät über eine gültige messtechnische Kontrolle?</li>
        <li>Wurde die technische Toleranzmarge korrekt vom angezeigten Wert abgezogen?</li>
      </ul>
      <p>
        Das sind präzise, oft technische Prüfungen &mdash; genau das deckt
        unsere Diagnose ab, bevor wir Ihnen ein Anfechtungspaket
        vorschlagen.
      </p>

      <h2>Neulenker und Rückfall</h2>
      <p>
        Personen in der Probezeit oder bereits kürzlich sanktionierte
        Personen werden strenger behandelt, mit geringerem Handlungsspielraum.
        Dieser Faktor zählt bei der realistischen Einschätzung Ihrer
        Chancen.
      </p>

      <h2>Unsere Empfehlung</h2>
      <p>
        Bei einer geringfügigen Überschreitung mit Zweifeln an Messung oder
        Signalisation lohnt sich eine gut begründete Einsprache. Bei einer
        erheblichen Überschreitung, die zu einer Freiheitsstrafe führen
        kann, ist die Begleitung durch eine auf Verkehrsrecht spezialisierte
        Anwältin oder einen Anwalt angebrachter als eine einfache
        Vorlage &mdash; in diesem Fall verweisen wir Sie weiter, statt Ihnen
        eine unpassende Leistung zu verkaufen.
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
      <h2>Two separate cases, two different logics</h2>
      <p>
        Speeding can trigger <strong>two independent procedures</strong>,
        each contested separately: the fine or penal order on one hand (see
        our{" "}
        <Link href={`/${locale}/guide/comment-contester-une-amende-en-suisse`}>
          general guide
        </Link>
        ), and a possible{" "}
        <Link href={`/${locale}/guide/retrait-de-permis`}>
          licence suspension
        </Link>{" "}
        on the other, decided separately by the cantonal road traffic
        office.
      </p>

      <h2>What determines severity</h2>
      <p>
        The threshold that triggers serious consequences depends on the
        type of road: the tolerance before a heavy sanction is narrower
        within built-up areas than on motorways. Beyond a certain excess,
        you enter the territory of serious road traffic offences, with
        criminal and administrative consequences well beyond a simple fine.
      </p>

      <h2>What to check before contesting</h2>
      <ul>
        <li>Do the identified vehicle and driver actually match reality?</li>
        <li>Was the measurement zone clearly signposted where the law requires it?</li>
        <li>Did the measuring device have a valid metrological check?</li>
        <li>Was the technical tolerance margin correctly deducted from the displayed result?</li>
      </ul>
      <p>
        These are precise, often technical checks &mdash; exactly what our
        diagnostic covers before we offer you a contestation pack.
      </p>

      <h2>New drivers and repeat offences</h2>
      <p>
        People on probationary licences, or already sanctioned recently,
        are treated more severely, with less room to manoeuvre. This
        factor matters in a realistic assessment of your chances.
      </p>

      <h2>Our recommendation</h2>
      <p>
        For a minor excess with doubt about the measurement or signage, a
        well-argued objection is worth it. For a major excess that could
        lead to a custodial sentence, support from a lawyer specialised in
        road traffic law is more appropriate than a simple letter template
        &mdash; in that case we refer you elsewhere rather than sell you a
        service that doesn&rsquo;t fit.
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
      <h2>Due pratiche separate, due logiche</h2>
      <p>
        Un eccesso di velocità può innescare{" "}
        <strong>due procedure indipendenti</strong>, ciascuna contestata a
        sé&nbsp;: la multa o il decreto penale da un lato (vedi la nostra{" "}
        <Link href={`/${locale}/guide/comment-contester-une-amende-en-suisse`}>
          guida generale
        </Link>
        ), e un eventuale{" "}
        <Link href={`/${locale}/guide/retrait-de-permis`}>ritiro della
        licenza</Link> dall&rsquo;altro, deciso separatamente
        dall&rsquo;ufficio cantonale della circolazione.
      </p>

      <h2>Cosa determina la gravità</h2>
      <p>
        La soglia che innesca conseguenze serie dipende dal tipo di
        strada&nbsp;: il margine tollerato prima di una sanzione pesante è
        più stretto in località rispetto all&rsquo;autostrada. Oltre un
        certo superamento, si entra nel campo dei reati gravi della
        circolazione stradale, con conseguenze penali e amministrative
        nettamente più importanti di una semplice multa.
      </p>

      <h2>Cosa verificare prima di contestare</h2>
      <ul>
        <li>Il veicolo e il conducente identificati corrispondono davvero alla realtà?</li>
        <li>La zona di misurazione era chiaramente segnalata, dove la legge lo richiede?</li>
        <li>L&rsquo;apparecchio di misurazione aveva un controllo metrologico valido?</li>
        <li>Il margine di tolleranza tecnico è stato correttamente dedotto dal risultato mostrato?</li>
      </ul>
      <p>
        Sono verifiche precise, spesso tecniche &mdash; è esattamente ciò
        che copre la nostra diagnosi prima di proporvi un pack di
        contestazione.
      </p>

      <h2>Neopatentati e recidiva</h2>
      <p>
        Le persone in periodo di prova, o già sanzionate di recente,
        vengono trattate più severamente, con un margine di manovra
        ridotto. Questo fattore conta nella valutazione realistica delle
        vostre possibilità.
      </p>

      <h2>La nostra raccomandazione</h2>
      <p>
        Di fronte a un superamento minore con dubbi sulla misurazione o
        sulla segnaletica, un&rsquo;opposizione ben argomentata vale la
        pena. Di fronte a un superamento importante che può portare a una
        pena detentiva, l&rsquo;accompagnamento di un avvocato specializzato
        in diritto della circolazione è più indicato di un semplice modello
        di lettera &mdash; in questo caso vi indirizziamo altrove piuttosto
        che vendervi un servizio inadatto.
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
