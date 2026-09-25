import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import GuideLayout from "@/components/site/GuideLayout";
import { getGuideArticle } from "@/lib/guide/articles";
import { isLocale, DEFAULT_LOCALE, type Locale } from "@/i18n/config";

const article = getGuideArticle("politique-de-confidentialite")!;

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
      <h2>Pourquoi un simple copier-coller ne suffit pas</h2>
      <p>
        Une politique de confidentialité copiée sur le site d&rsquo;un
        concurrent, ou générée automatiquement sans adaptation, décrit
        rarement les traitements réels de votre entreprise. Or la nLPD
        exige une information exacte sur ce que vous faites concrètement des
        données&nbsp;: les incohérences entre ce qui est annoncé et ce qui
        est réellement fait sont précisément ce qu&rsquo;un contrôle ou une
        plainte met en évidence.
      </p>
      <p>
        La base d&rsquo;une politique de confidentialité fiable est votre{" "}
        <Link href={`/${locale}/guide/registre-des-traitements`}>
          registre des traitements
        </Link>
        &nbsp;: on ne peut informer correctement que sur ce qu&rsquo;on a
        d&rsquo;abord recensé.
      </p>

      <h2>Les mentions attendues</h2>
      <p>
        Pour un site web comme pour un document destiné aux employés, une
        politique de confidentialité conforme précise généralement&nbsp;:
      </p>
      <ul>
        <li>L&rsquo;identité et les coordonnées du responsable du traitement</li>
        <li>Les finalités précises de chaque traitement de données (pas une formule générique)</li>
        <li>La base sur laquelle repose le traitement</li>
        <li>Les catégories de destinataires des données, y compris les sous-traitants</li>
        <li>Les transferts de données à l&rsquo;étranger, le cas échéant, et les garanties associées</li>
        <li>La durée de conservation des données ou les critères pour la déterminer</li>
        <li>Les droits des personnes concernées (accès, rectification, effacement, opposition) et comment les exercer</li>
      </ul>

      <h2>Site web et gestion RH : deux documents, deux publics</h2>
      <p>
        Une erreur fréquente consiste à publier une seule politique de
        confidentialité générique pour tous les publics. En pratique, les
        visiteurs de votre site, vos clients et vos employés n&rsquo;ont pas
        les mêmes données traitées ni les mêmes droits à connaître en
        priorité&nbsp;: un document RH doit couvrir les données du dossier
        de collaborateur (salaire, évaluations, données de santé
        éventuelles) tandis que la version publiée sur le site couvre les
        cookies, les formulaires de contact et les données de navigation.
      </p>

      <h2>Cookies et traceurs</h2>
      <p>
        Si votre site utilise des cookies de mesure d&rsquo;audience, de
        publicité ou de réseaux sociaux, ceux-ci doivent être décrits
        explicitement, avec la possibilité pour le visiteur de comprendre
        quels traceurs sont utilisés et dans quel but. Une politique de
        confidentialité qui ne mentionne pas les outils tiers réellement
        installés sur le site (pixels publicitaires, outils d&rsquo;
        analytics) reste incomplète, même si le texte général est correct.
      </p>

      <h2>Un document à revoir, pas à publier une fois pour toutes</h2>
      <p>
        Un nouvel outil marketing, un nouveau prestataire d&rsquo;hébergement
        ou un changement de finalité (par exemple, commencer à revendre des
        données agrégées) doit se refléter dans la politique de
        confidentialité. C&rsquo;est un document qui suit l&rsquo;évolution
        réelle de votre activité, pas un texte statique rédigé une fois au
        lancement du site.
      </p>
    </>
  );
}

function De({ locale }: { locale: Locale }) {
  return (
    <>
      <h2>Warum Copy-Paste nicht reicht</h2>
      <p>
        Eine von der Konkurrenz-Website kopierte oder automatisch generierte
        Datenschutzerklärung beschreibt selten die tatsächlichen
        Bearbeitungen Ihres Unternehmens. Das DSG verlangt aber eine exakte
        Information darüber, was Sie konkret mit den Daten tun &mdash;
        Widersprüche zwischen dem, was erklärt wird, und dem, was
        tatsächlich geschieht, sind genau das, was eine Kontrolle oder
        Beschwerde aufdeckt.
      </p>
      <p>
        Grundlage einer verlässlichen Datenschutzerklärung ist Ihr{" "}
        <Link href={`/${locale}/guide/registre-des-traitements`}>
          Verarbeitungsverzeichnis
        </Link>
        &nbsp;: Man kann nur über das korrekt informieren, was man zuvor
        erfasst hat.
      </p>

      <h2>Die erwarteten Angaben</h2>
      <p>
        Sowohl für eine Website als auch für ein Dokument für Mitarbeitende
        enthält eine konforme Datenschutzerklärung in der Regel&nbsp;:
      </p>
      <ul>
        <li>Die Identität und Kontaktdaten des Verantwortlichen</li>
        <li>Die genauen Zwecke jeder Datenbearbeitung (keine allgemeine Floskel)</li>
        <li>Die Grundlage, auf der die Bearbeitung beruht</li>
        <li>Die Kategorien der Datenempfänger, einschliesslich Auftragsverarbeiter</li>
        <li>Gegebenenfalls Datenübermittlungen ins Ausland und die dazugehörigen Garantien</li>
        <li>Die Aufbewahrungsdauer der Daten oder die Kriterien zu deren Bestimmung</li>
        <li>Die Rechte der betroffenen Personen (Auskunft, Berichtigung, Löschung, Widerspruch) und wie sie diese ausüben können</li>
      </ul>

      <h2>Website und HR: zwei Dokumente, zwei Zielgruppen</h2>
      <p>
        Ein häufiger Fehler ist die Veröffentlichung einer einzigen,
        generischen Datenschutzerklärung für alle Zielgruppen. In der Praxis
        haben Website-Besuchende, Kundschaft und Mitarbeitende nicht die
        gleichen Daten und nicht die gleichen vorrangigen Rechte&nbsp;: Ein
        HR-Dokument muss die Daten des Personaldossiers abdecken (Lohn,
        Beurteilungen, allfällige Gesundheitsdaten), während die auf der
        Website veröffentlichte Version Cookies, Kontaktformulare und
        Navigationsdaten abdeckt.
      </p>

      <h2>Cookies und Tracking-Tools</h2>
      <p>
        Verwendet Ihre Website Cookies für Reichweitenmessung, Werbung oder
        soziale Netzwerke, müssen diese explizit beschrieben werden, sodass
        Besuchende nachvollziehen können, welche Tracking-Tools zu welchem
        Zweck eingesetzt werden. Eine Datenschutzerklärung, die die
        tatsächlich auf der Website installierten Drittanbieter-Tools
        (Werbe-Pixel, Analytics-Tools) nicht erwähnt, bleibt unvollständig
        &mdash; auch wenn der allgemeine Text korrekt ist.
      </p>

      <h2>Ein Dokument zum Überprüfen, nicht zum einmaligen Veröffentlichen</h2>
      <p>
        Ein neues Marketing-Tool, ein neuer Hosting-Anbieter oder eine
        Zweckänderung (z.&nbsp;B. der Beginn des Verkaufs aggregierter
        Daten) müssen sich in der Datenschutzerklärung niederschlagen. Es
        ist ein Dokument, das der tatsächlichen Entwicklung Ihres
        Unternehmens folgt &mdash; kein statischer Text, der einmal beim
        Website-Launch verfasst wird.
      </p>
    </>
  );
}

function En({ locale }: { locale: Locale }) {
  return (
    <>
      <h2>Why a simple copy-paste is not enough</h2>
      <p>
        A privacy policy copied from a competitor&rsquo;s website, or
        auto-generated without customisation, rarely describes what your
        company actually does with data. The FADP requires accurate
        information about your real practices: mismatches between what is
        stated and what actually happens are exactly what a review or
        complaint brings to light.
      </p>
      <p>
        The foundation of a reliable privacy policy is your{" "}
        <Link href={`/${locale}/guide/registre-des-traitements`}>
          record of processing activities
        </Link>
        : you can only inform people accurately about what you have first
        mapped out.
      </p>

      <h2>What it should contain</h2>
      <p>
        For a website as well as for an employee-facing document, a
        compliant privacy policy generally specifies:
      </p>
      <ul>
        <li>The identity and contact details of the data controller</li>
        <li>The precise purposes of each processing activity (not a generic statement)</li>
        <li>The basis on which the processing relies</li>
        <li>The categories of recipients of the data, including processors</li>
        <li>Any transfers of data abroad and the safeguards involved</li>
        <li>The data retention period, or the criteria used to determine it</li>
        <li>The rights of data subjects (access, rectification, erasure, objection) and how to exercise them</li>
      </ul>

      <h2>Website and HR: two documents, two audiences</h2>
      <p>
        A common mistake is publishing a single, generic privacy policy for
        every audience. In practice, your website visitors, your customers
        and your employees do not have the same data processed nor the same
        priority rights to be informed of: an HR document needs to cover
        personnel file data (salary, performance reviews, health data where
        relevant), while the version published on the website covers
        cookies, contact forms and browsing data.
      </p>

      <h2>Cookies and trackers</h2>
      <p>
        If your site uses audience-measurement, advertising or social media
        cookies, these need to be explicitly described, so visitors can
        understand which trackers are used and for what purpose. A privacy
        policy that does not mention the third-party tools actually
        installed on the site (ad pixels, analytics tools) remains
        incomplete, even if the general wording is otherwise correct.
      </p>

      <h2>A document to revisit, not to publish once and forget</h2>
      <p>
        A new marketing tool, a new hosting provider, or a change of
        purpose (for example, starting to sell aggregated data) all need to
        be reflected in the privacy policy. It is a document that tracks
        the real evolution of your business, not a static text written once
        at launch.
      </p>
    </>
  );
}

function It({ locale }: { locale: Locale }) {
  return (
    <>
      <h2>Perché un semplice copia-incolla non basta</h2>
      <p>
        Un&rsquo;informativa sulla privacy copiata dal sito di un
        concorrente, o generata automaticamente senza adattamento, raramente
        descrive i trattamenti reali della vostra azienda. Eppure la nLPD
        richiede un&rsquo;informazione esatta su cosa fate concretamente con
        i dati&nbsp;: le incongruenze tra ciò che è dichiarato e ciò che è
        realmente fatto sono esattamente ciò che un controllo o un reclamo
        mette in luce.
      </p>
      <p>
        La base di un&rsquo;informativa sulla privacy affidabile è il vostro{" "}
        <Link href={`/${locale}/guide/registre-des-traitements`}>
          registro dei trattamenti
        </Link>
        &nbsp;: si può informare correttamente solo su ciò che è stato
        prima censito.
      </p>

      <h2>Le indicazioni attese</h2>
      <p>
        Sia per un sito web che per un documento destinato ai dipendenti,
        un&rsquo;informativa sulla privacy conforme precisa generalmente&nbsp;:
      </p>
      <ul>
        <li>L&rsquo;identità e i contatti del titolare del trattamento</li>
        <li>Le finalità precise di ogni trattamento di dati (non una formula generica)</li>
        <li>La base su cui si fonda il trattamento</li>
        <li>Le categorie di destinatari dei dati, inclusi i sub-responsabili</li>
        <li>I trasferimenti di dati all&rsquo;estero, se applicabile, e le relative garanzie</li>
        <li>La durata di conservazione dei dati o i criteri per determinarla</li>
        <li>I diritti degli interessati (accesso, rettifica, cancellazione, opposizione) e come esercitarli</li>
      </ul>

      <h2>Sito web e gestione HR: due documenti, due pubblici</h2>
      <p>
        Un errore frequente consiste nel pubblicare un&rsquo;unica
        informativa sulla privacy generica per tutti i pubblici. In pratica,
        i visitatori del vostro sito, i vostri clienti e i vostri
        dipendenti non hanno gli stessi dati trattati né gli stessi diritti
        prioritari da conoscere&nbsp;: un documento HR deve coprire i dati
        del dossier del collaboratore (salario, valutazioni, eventuali dati
        sanitari) mentre la versione pubblicata sul sito copre i cookie, i
        moduli di contatto e i dati di navigazione.
      </p>

      <h2>Cookie e tracciatori</h2>
      <p>
        Se il vostro sito utilizza cookie di misurazione dell&rsquo;audience,
        pubblicitari o di social network, questi devono essere descritti
        esplicitamente, con la possibilità per il visitatore di capire quali
        tracciatori sono usati e per quale scopo. Un&rsquo;informativa sulla
        privacy che non menziona gli strumenti di terze parti realmente
        installati sul sito (pixel pubblicitari, strumenti di analytics)
        resta incompleta, anche se il testo generale è corretto.
      </p>

      <h2>Un documento da rivedere, non da pubblicare una volta per tutte</h2>
      <p>
        Un nuovo strumento di marketing, un nuovo fornitore di hosting o un
        cambiamento di finalità (ad esempio, iniziare a rivendere dati
        aggregati) devono riflettersi nell&rsquo;informativa sulla privacy.
        È un documento che segue l&rsquo;evoluzione reale della vostra
        attività, non un testo statico redatto una volta al lancio del
        sito.
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
