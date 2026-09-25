import type { Metadata } from "next";
import Link from "next/link";
import GuideLayout from "@/components/site/GuideLayout";
import { getGuideArticle } from "@/lib/guide/articles";
import { isLocale, DEFAULT_LOCALE, type Locale } from "@/i18n/config";

const article = getGuideArticle("registre-des-traitements")!;

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
      <h2>À quoi sert le registre des traitements ?</h2>
      <p>
        Le registre des traitements est le document qui recense, de façon
        structurée, tous les traitements de données personnelles effectués
        par votre entreprise&nbsp;: quelles données, dans quel but, qui y a
        accès, où elles sont stockées, combien de temps elles sont
        conservées. C&rsquo;est la pièce centrale de toute démarche de
        conformité&nbsp;: sans lui, impossible de savoir précisément ce qui
        doit être couvert par une{" "}
        <Link href={`/${locale}/guide/politique-de-confidentialite`}>
          politique de confidentialité
        </Link>{" "}
        ou par des{" "}
        <Link href={`/${locale}/guide/contrat-sous-traitance-dpa`}>
          contrats de sous-traitance
        </Link>
        .
      </p>

      <h2>Qui doit en tenir un ?</h2>
      <p>
        La nLPD prévoit un allègement pour les entreprises privées de moins
        de 250 employés&nbsp;: elles peuvent être dispensées de
        l&rsquo;obligation formelle de tenir un registre, <strong>sauf</strong>{" "}
        si leur traitement de données présente un risque élevé pour les
        personnes concernées, porte sur des données sensibles à large
        échelle (données de santé, données biométriques, opinions
        religieuses ou politiques, par exemple), ou implique un profilage à
        risque élevé.
      </p>
      <p>
        En pratique, beaucoup de PME pensent être dispensées alors
        qu&rsquo;elles traitent justement des données RH (données de santé
        pour les arrêts maladie, par exemple) ou font du profilage marketing
        plus poussé qu&rsquo;elles ne le pensent. Et même lorsque la
        dispense s&rsquo;applique formellement, tenir un registre reste
        recommandé &mdash; c&rsquo;est le seul moyen de démontrer, en cas de
        contrôle ou de litige, que vous savez exactement ce que vous faites
        de ces données.
      </p>

      <h2>Ce que doit contenir un registre conforme</h2>
      <p>Pour chaque traitement identifié, un registre complet précise généralement&nbsp;:</p>
      <ul>
        <li>La finalité du traitement (pourquoi ces données sont collectées)</li>
        <li>Les catégories de données concernées et de personnes concernées</li>
        <li>Les catégories de destinataires, y compris les sous-traitants externes</li>
        <li>La durée de conservation ou les critères pour la déterminer</li>
        <li>Les mesures de sécurité mises en place</li>
        <li>Si applicable, le transfert de données à l&rsquo;étranger et les garanties associées</li>
      </ul>

      <h2>Les traitements les plus souvent oubliés</h2>
      <p>
        Dans notre pratique, certains traitements passent régulièrement sous
        le radar lors d&rsquo;un premier inventaire&nbsp;:
      </p>
      <ul>
        <li>Les outils SaaS utilisés au quotidien (CRM, comptabilité en ligne, outil de recrutement)</li>
        <li>Les caméras de vidéosurveillance dans les locaux</li>
        <li>Le suivi des candidatures et CV non retenus</li>
        <li>Les newsletters et outils d&rsquo;emailing marketing</li>
        <li>La géolocalisation de véhicules professionnels</li>
      </ul>

      <h2>Un document vivant, pas figé</h2>
      <p>
        Un registre des traitements n&rsquo;est utile que s&rsquo;il est à
        jour. Chaque nouvel outil, chaque nouveau prestataire ou chaque
        changement d&rsquo;activité peut créer un nouveau traitement à
        documenter. C&rsquo;est pour cette raison qu&rsquo;une revue
        périodique &mdash; annuelle au minimum &mdash; est recommandée
        plutôt qu&rsquo;un exercice ponctuel.
      </p>
    </>
  );
}

function De({ locale }: { locale: Locale }) {
  return (
    <>
      <h2>Wozu dient das Verarbeitungsverzeichnis?</h2>
      <p>
        Das Verarbeitungsverzeichnis ist das Dokument, das alle
        Personendatenbearbeitungen Ihres Unternehmens strukturiert
        erfasst&nbsp;: welche Daten, zu welchem Zweck, wer darauf Zugriff
        hat, wo sie gespeichert werden, wie lange sie aufbewahrt werden. Es
        ist das zentrale Element jeder Compliance-Umsetzung &mdash; ohne
        dieses Dokument lässt sich nicht genau bestimmen, was von einer{" "}
        <Link href={`/${locale}/guide/politique-de-confidentialite`}>
          Datenschutzerklärung
        </Link>{" "}
        oder von{" "}
        <Link href={`/${locale}/guide/contrat-sous-traitance-dpa`}>
          Auftragsverarbeitungsverträgen
        </Link>{" "}
        abgedeckt werden muss.
      </p>

      <h2>Wer muss eines führen?</h2>
      <p>
        Das DSG sieht eine Erleichterung für private Unternehmen mit weniger
        als 250 Mitarbeitenden vor&nbsp;: Sie können von der formellen
        Pflicht zur Führung eines Verzeichnisses befreit sein,{" "}
        <strong>ausser</strong> wenn ihre Datenbearbeitung ein hohes Risiko
        für die betroffenen Personen birgt, in grossem Umfang besonders
        schützenswerte Personendaten betrifft (z.&nbsp;B. Gesundheitsdaten,
        biometrische Daten, religiöse oder politische Ansichten), oder ein
        Profiling mit hohem Risiko beinhaltet.
      </p>
      <p>
        In der Praxis glauben viele KMU, befreit zu sein, obwohl sie gerade
        HR-Daten bearbeiten (z.&nbsp;B. Gesundheitsdaten bei Krankschreibungen)
        oder ein intensiveres Marketing-Profiling betreiben, als ihnen
        bewusst ist. Und selbst wenn die Befreiung formell greift, bleibt
        ein Verzeichnis empfehlenswert &mdash; es ist der einzige Weg, im
        Kontroll- oder Streitfall zu belegen, dass Sie genau wissen, was mit
        diesen Daten geschieht.
      </p>

      <h2>Was ein konformes Verzeichnis enthalten muss</h2>
      <p>Für jede erfasste Bearbeitung enthält ein vollständiges Verzeichnis in der Regel&nbsp;:</p>
      <ul>
        <li>Den Zweck der Bearbeitung (warum diese Daten erhoben werden)</li>
        <li>Die Kategorien der betroffenen Daten und Personen</li>
        <li>Die Kategorien der Empfänger, einschliesslich externer Auftragsverarbeiter</li>
        <li>Die Aufbewahrungsdauer oder die Kriterien zu deren Bestimmung</li>
        <li>Die getroffenen Sicherheitsmassnahmen</li>
        <li>Gegebenenfalls die Datenübermittlung ins Ausland und die dazugehörigen Garantien</li>
      </ul>

      <h2>Die am häufigsten vergessenen Bearbeitungen</h2>
      <p>
        In unserer Praxis geraten bei einer ersten Bestandsaufnahme
        regelmässig folgende Bearbeitungen in Vergessenheit&nbsp;:
      </p>
      <ul>
        <li>Täglich genutzte SaaS-Tools (CRM, Online-Buchhaltung, Recruiting-Tool)</li>
        <li>Videoüberwachungskameras in den Geschäftsräumen</li>
        <li>Die Aufbewahrung nicht berücksichtigter Bewerbungen und Lebensläufe</li>
        <li>Newsletter und Marketing-E-Mailing-Tools</li>
        <li>Die Geolokalisierung von Geschäftsfahrzeugen</li>
      </ul>

      <h2>Ein lebendiges Dokument, kein starres</h2>
      <p>
        Ein Verarbeitungsverzeichnis nützt nur, wenn es aktuell ist. Jedes
        neue Tool, jeder neue Dienstleister oder jede Änderung der Tätigkeit
        kann eine neue zu dokumentierende Bearbeitung schaffen. Deshalb
        empfiehlt sich eine periodische &mdash; mindestens jährliche
        &mdash; Überprüfung statt einer einmaligen Übung.
      </p>
    </>
  );
}

function En({ locale }: { locale: Locale }) {
  return (
    <>
      <h2>What is the record of processing activities for?</h2>
      <p>
        The record of processing activities is the document that lists, in
        a structured way, every processing of personal data your company
        carries out: what data, for what purpose, who has access, where it
        is stored, and how long it is kept. It is the central piece of any
        compliance effort: without it, there is no reliable way to know what
        needs to be covered by a{" "}
        <Link href={`/${locale}/guide/politique-de-confidentialite`}>
          privacy policy
        </Link>{" "}
        or by{" "}
        <Link href={`/${locale}/guide/contrat-sous-traitance-dpa`}>
          data processing agreements
        </Link>
        .
      </p>

      <h2>Who needs to keep one?</h2>
      <p>
        The FADP provides relief for private companies with fewer than 250
        employees: they may be exempt from the formal duty to keep a
        record, <strong>unless</strong> their processing presents a high
        risk to data subjects, involves sensitive personal data on a large
        scale (health data, biometric data, religious or political opinions,
        for example), or involves high-risk profiling.
      </p>
      <p>
        In practice, many SMEs assume they are exempt while actually
        processing HR data (health data for sick leave, for example) or
        doing more marketing profiling than they realise. And even where the
        exemption formally applies, keeping a record is still advisable
        &mdash; it is the only way to demonstrate, in the event of a review
        or dispute, that you know exactly what you do with that data.
      </p>

      <h2>What a compliant record must contain</h2>
      <p>For each processing activity identified, a complete record generally specifies:</p>
      <ul>
        <li>The purpose of the processing (why the data is collected)</li>
        <li>The categories of data and data subjects concerned</li>
        <li>The categories of recipients, including external processors</li>
        <li>The retention period, or the criteria used to determine it</li>
        <li>The security measures in place</li>
        <li>Where applicable, any transfer of data abroad and the safeguards involved</li>
      </ul>

      <h2>The processing activities most often overlooked</h2>
      <p>In our experience, some processing activities regularly slip under the radar during a first inventory:</p>
      <ul>
        <li>SaaS tools used daily (CRM, online accounting, recruitment tools)</li>
        <li>CCTV cameras on business premises</li>
        <li>Tracking of applications and CVs that were not retained</li>
        <li>Newsletters and marketing email tools</li>
        <li>Geolocation of company vehicles</li>
      </ul>

      <h2>A living document, not a static one</h2>
      <p>
        A record of processing activities is only useful if it is kept up
        to date. Every new tool, every new vendor, or any change in your
        activity can create a new processing activity to document. That is
        why a periodic review &mdash; at least annually &mdash; is
        recommended rather than a one-off exercise.
      </p>
    </>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

  return (
    <GuideLayout article={article} locale={locale}>
      {locale === "de" ? <De locale={locale} /> : locale === "en" ? <En locale={locale} /> : <Fr locale={locale} />}
    </GuideLayout>
  );
}
