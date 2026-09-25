import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import GuideLayout from "@/components/site/GuideLayout";
import { getGuideArticle } from "@/lib/guide/articles";
import { isLocale, DEFAULT_LOCALE, type Locale } from "@/i18n/config";

const article = getGuideArticle("quest-ce-que-la-nlpd")!;

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
      <h2>La nLPD en bref</h2>
      <p>
        La nLPD (nouvelle loi fédérale sur la protection des données, aussi
        appelée LPD révisée) est en vigueur en Suisse depuis le{" "}
        <strong>1er septembre 2023</strong>. Elle remplace l&rsquo;ancienne
        loi de 1992, jugée dépassée face à l&rsquo;évolution du numérique, et
        renforce les droits des personnes dont les données sont traitées
        ainsi que les obligations des entreprises qui les traitent.
      </p>
      <p>
        Contrairement à une idée répandue, la nLPD n&rsquo;est pas une
        &laquo;&nbsp;copie suisse du RGPD&nbsp;&raquo;. Elle en partage
        l&rsquo;esprit (transparence, minimisation, sécurité), mais reste un
        texte distinct, avec ses propres définitions, exceptions et
        mécanismes de sanction.
      </p>

      <h2>Qui est concerné ?</h2>
      <p>
        La loi s&rsquo;applique à toute entité, publique ou privée, qui
        traite des données personnelles de personnes physiques en Suisse ou
        dont le traitement produit des effets en Suisse. Concrètement, pour
        une PME&nbsp;:
      </p>
      <ul>
        <li>Les données de vos clients et prospects (nom, email, historique d&rsquo;achat, etc.)</li>
        <li>Les données de vos employés (dossiers RH, salaires, données de santé le cas échéant)</li>
        <li>Les données collectées via votre site web (formulaires, cookies, newsletter)</li>
      </ul>
      <p>
        La taille de l&rsquo;entreprise n&rsquo;exclut personne du champ
        d&rsquo;application de la loi. Elle influe en revanche sur certaines
        obligations précises, comme celle de tenir un{" "}
        <Link href={`/${locale}/guide/registre-des-traitements`}>
          registre des traitements
        </Link>
        , qui prévoit des allègements pour les petites structures sous
        conditions.
      </p>

      <h2>Ce qui change concrètement avec la révision</h2>
      <ul>
        <li>
          <strong>Devoir d&rsquo;information renforcé</strong> : les
          personnes concernées doivent être informées de façon claire sur la
          collecte de leurs données, avant ou au moment de la collecte.
        </li>
        <li>
          <strong>Sécurité des données</strong> : mise en place de mesures
          techniques et organisationnelles proportionnées au risque
          (chiffrement, contrôle d&rsquo;accès, sauvegardes).
        </li>
        <li>
          <strong>Notification des violations</strong> : obligation
          d&rsquo;annoncer certaines violations de sécurité au Préposé
          fédéral à la protection des données et à la transparence (PFPDT).
        </li>
        <li>
          <strong>Sanctions pénales personnelles</strong> : contrairement à
          l&rsquo;ancienne loi, ce sont les personnes physiques responsables
          qui peuvent être sanctionnées, pas seulement l&rsquo;entreprise.
          Détails dans notre guide sur{" "}
          <Link href={`/${locale}/guide/sanctions-nlpd`}>les sanctions nLPD</Link>.
        </li>
      </ul>

      <h2>Les obligations principales pour une PME</h2>
      <p>
        En pratique, une mise en conformité couvre généralement cinq
        éléments&nbsp;: un inventaire des traitements de données effectués,
        une{" "}
        <Link href={`/${locale}/guide/politique-de-confidentialite`}>
          politique de confidentialité
        </Link>{" "}
        informant clairement les personnes concernées, des{" "}
        <Link href={`/${locale}/guide/contrat-sous-traitance-dpa`}>
          contrats de sous-traitance
        </Link>{" "}
        avec les prestataires qui traitent des données pour votre compte
        (hébergeur, CRM, comptabilité en ligne), une procédure définie en cas
        de violation de données, et une désignation claire de qui, en
        interne, répond aux questions de protection des données.
      </p>

      <h2>nLPD et RGPD : faut-il s&rsquo;occuper des deux ?</h2>
      <p>
        Si votre PME traite des données de résidents de l&rsquo;Union
        européenne (clients, employés à distance, prospects via un site
        accessible depuis l&rsquo;UE dans certains cas), le RGPD peut
        s&rsquo;appliquer en parallèle de la nLPD. Les deux textes se
        recoupent largement, mais ne sont pas identiques&nbsp;: une
        conformité RGPD ne garantit pas automatiquement une conformité nLPD,
        et inversement.
      </p>

      <h2>Par où commencer ?</h2>
      <p>
        La méthode la plus efficace consiste à partir d&rsquo;un état des
        lieux précis de vos traitements de données actuels, puis à combler
        les écarts un par un plutôt que de tout reprendre à zéro. C&rsquo;est
        exactement ce que fait notre diagnostic gratuit ci-dessous.
      </p>
    </>
  );
}

function De({ locale }: { locale: Locale }) {
  return (
    <>
      <h2>Das DSG in Kürze</h2>
      <p>
        Das revidierte Bundesgesetz über den Datenschutz (DSG, oft auch
        revDSG genannt) ist in der Schweiz seit dem{" "}
        <strong>1. September 2023</strong> in Kraft. Es ersetzt das alte
        Gesetz von 1992, das der digitalen Entwicklung nicht mehr gerecht
        wurde, und stärkt sowohl die Rechte der betroffenen Personen als
        auch die Pflichten der Unternehmen, die ihre Daten bearbeiten.
      </p>
      <p>
        Entgegen einer verbreiteten Annahme ist das DSG keine
        &laquo;&nbsp;Schweizer Kopie der DSGVO&nbsp;&raquo;. Es teilt deren
        Grundgedanken (Transparenz, Datenminimierung, Sicherheit), bleibt
        aber ein eigenständiger Erlass mit eigenen Definitionen, Ausnahmen
        und Sanktionsmechanismen.
      </p>

      <h2>Wer ist betroffen?</h2>
      <p>
        Das Gesetz gilt für jede öffentliche oder private Stelle, die
        Personendaten natürlicher Personen in der Schweiz bearbeitet oder
        deren Bearbeitung Auswirkungen in der Schweiz entfaltet. Konkret für
        ein KMU&nbsp;:
      </p>
      <ul>
        <li>Die Daten Ihrer Kundschaft und Interessenten (Name, E-Mail, Kaufhistorie usw.)</li>
        <li>Die Daten Ihrer Mitarbeitenden (Personaldossiers, Löhne, ggf. Gesundheitsdaten)</li>
        <li>Über Ihre Website erhobene Daten (Formulare, Cookies, Newsletter)</li>
      </ul>
      <p>
        Die Unternehmensgrösse schliesst niemanden vom Geltungsbereich des
        Gesetzes aus. Sie wirkt sich jedoch auf einzelne konkrete Pflichten
        aus, etwa auf die Pflicht, ein{" "}
        <Link href={`/${locale}/guide/registre-des-traitements`}>
          Verarbeitungsverzeichnis
        </Link>{" "}
        zu führen, für das unter bestimmten Bedingungen Erleichterungen für
        kleine Unternehmen gelten.
      </p>

      <h2>Was sich mit der Revision konkret ändert</h2>
      <ul>
        <li>
          <strong>Erweiterte Informationspflicht</strong>: Betroffene Personen
          müssen klar über die Erhebung ihrer Daten informiert werden, vor
          oder spätestens bei der Erhebung.
        </li>
        <li>
          <strong>Datensicherheit</strong>: technische und organisatorische
          Massnahmen im Verhältnis zum Risiko (Verschlüsselung,
          Zugriffskontrolle, Backups).
        </li>
        <li>
          <strong>Meldung von Verletzungen</strong>: Pflicht, bestimmte
          Datensicherheitsverletzungen dem Eidgenössischen Datenschutz- und
          Öffentlichkeitsbeauftragten (EDÖB) zu melden.
        </li>
        <li>
          <strong>Persönliche Strafsanktionen</strong>: Anders als unter dem
          alten Gesetz können die verantwortlichen natürlichen Personen
          sanktioniert werden, nicht nur das Unternehmen. Mehr dazu in
          unserem Ratgeber zu{" "}
          <Link href={`/${locale}/guide/sanctions-nlpd`}>den DSG-Sanktionen</Link>.
        </li>
      </ul>

      <h2>Die wichtigsten Pflichten für ein KMU</h2>
      <p>
        In der Praxis umfasst eine Compliance-Umsetzung meist fünf
        Elemente&nbsp;: eine Bestandsaufnahme der durchgeführten
        Datenbearbeitungen, eine{" "}
        <Link href={`/${locale}/guide/politique-de-confidentialite`}>
          Datenschutzerklärung
        </Link>
        , die betroffene Personen klar informiert,{" "}
        <Link href={`/${locale}/guide/contrat-sous-traitance-dpa`}>
          Auftragsverarbeitungsverträge
        </Link>{" "}
        mit Dienstleistern, die für Sie Daten bearbeiten (Hosting, CRM,
        Online-Buchhaltung), ein festgelegtes Verfahren im Falle einer
        Datenschutzverletzung sowie eine klare interne Zuständigkeit für
        Datenschutzfragen.
      </p>

      <h2>DSG und DSGVO: muss man sich um beide kümmern?</h2>
      <p>
        Bearbeitet Ihr KMU Daten von Personen mit Wohnsitz in der EU (Kunden,
        Remote-Mitarbeitende, Interessenten über eine aus der EU erreichbare
        Website in gewissen Fällen), kann die DSGVO parallel zum DSG
        anwendbar sein. Beide Erlasse überschneiden sich stark, sind aber
        nicht identisch&nbsp;: DSGVO-Konformität garantiert nicht automatisch
        DSG-Konformität, und umgekehrt.
      </p>

      <h2>Wo anfangen?</h2>
      <p>
        Am effizientesten ist eine genaue Bestandsaufnahme Ihrer aktuellen
        Datenbearbeitungen, gefolgt vom gezielten Schliessen der Lücken
        &mdash; statt bei null anzufangen. Genau das leistet unsere
        kostenlose Diagnose weiter unten.
      </p>
    </>
  );
}

function En({ locale }: { locale: Locale }) {
  return (
    <>
      <h2>The Swiss FADP in brief</h2>
      <p>
        The revised Federal Act on Data Protection (FADP, also referred to as
        the nFADP or revFADP) has been in force in Switzerland since{" "}
        <strong>September 1, 2023</strong>. It replaces the 1992 law, which
        had become outdated given how digital business has evolved, and
        strengthens both the rights of the people whose data is processed
        and the obligations of the companies that process it.
      </p>
      <p>
        Contrary to a common assumption, the FADP is not a
        &ldquo;Swiss copy of the GDPR&rdquo;. It shares the same spirit
        (transparency, data minimisation, security), but remains a distinct
        piece of legislation, with its own definitions, exceptions and
        penalty mechanisms.
      </p>

      <h2>Who does it apply to?</h2>
      <p>
        The law applies to any public or private entity that processes the
        personal data of natural persons in Switzerland, or whose processing
        has effects in Switzerland. In practice, for an SME, this covers:
      </p>
      <ul>
        <li>Your customers&rsquo; and prospects&rsquo; data (name, email, purchase history, etc.)</li>
        <li>Your employees&rsquo; data (HR files, salaries, health data where relevant)</li>
        <li>Data collected through your website (forms, cookies, newsletter)</li>
      </ul>
      <p>
        Company size does not exempt anyone from the law&rsquo;s scope. It
        does, however, affect certain specific obligations, such as keeping
        a{" "}
        <Link href={`/${locale}/guide/registre-des-traitements`}>
          record of processing activities
        </Link>
        , which provides conditional relief for smaller structures.
      </p>

      <h2>What actually changes with the revision</h2>
      <ul>
        <li>
          <strong>Stronger duty to inform</strong>: data subjects must be
          clearly informed about the collection of their data, before or at
          the time of collection.
        </li>
        <li>
          <strong>Data security</strong>: technical and organisational
          measures proportionate to the risk (encryption, access control,
          backups).
        </li>
        <li>
          <strong>Breach notification</strong>: an obligation to report
          certain security breaches to the Federal Data Protection and
          Information Commissioner (FDPIC).
        </li>
        <li>
          <strong>Personal criminal liability</strong>: unlike under the old
          law, it is the responsible natural persons who can be fined, not
          just the company. More detail in our guide to{" "}
          <Link href={`/${locale}/guide/sanctions-nlpd`}>FADP penalties</Link>.
        </li>
      </ul>

      <h2>The main obligations for an SME</h2>
      <p>
        In practice, becoming compliant generally covers five elements: an
        inventory of the data processing you actually carry out, a{" "}
        <Link href={`/${locale}/guide/politique-de-confidentialite`}>
          privacy policy
        </Link>{" "}
        that clearly informs data subjects,{" "}
        <Link href={`/${locale}/guide/contrat-sous-traitance-dpa`}>
          data processing agreements
        </Link>{" "}
        with vendors who process data on your behalf (hosting, CRM, online
        accounting), a defined procedure in the event of a data breach, and
        a clear internal owner for data protection questions.
      </p>

      <h2>FADP and GDPR: do you need to handle both?</h2>
      <p>
        If your SME processes data belonging to EU residents (customers,
        remote employees, prospects via a website accessible from the EU in
        some cases), the GDPR may apply alongside the FADP. The two texts
        overlap substantially but are not identical: GDPR compliance does
        not automatically guarantee FADP compliance, and vice versa.
      </p>

      <h2>Where to start</h2>
      <p>
        The most efficient approach is to start from a precise inventory of
        your current data processing, then close the gaps one by one rather
        than starting from scratch. That is exactly what our free
        diagnostic below does.
      </p>
    </>
  );
}

function It({ locale }: { locale: Locale }) {
  return (
    <>
      <h2>La nLPD in breve</h2>
      <p>
        La nuova legge federale sulla protezione dei dati (nLPD, chiamata
        anche LPD revisionata) è in vigore in Svizzera dal{" "}
        <strong>1° settembre 2023</strong>. Sostituisce la vecchia legge del
        1992, ormai superata di fronte all&rsquo;evoluzione digitale, e
        rafforza sia i diritti delle persone i cui dati sono trattati sia
        gli obblighi delle aziende che li trattano.
      </p>
      <p>
        Contrariamente a un&rsquo;idea diffusa, la nLPD non è una
        &laquo;&nbsp;copia svizzera del GDPR&nbsp;&raquo;. Ne condivide lo
        spirito (trasparenza, minimizzazione, sicurezza), ma resta un testo
        distinto, con proprie definizioni, eccezioni e meccanismi
        sanzionatori.
      </p>

      <h2>Chi è interessato?</h2>
      <p>
        La legge si applica a qualsiasi entità, pubblica o privata, che
        tratta dati personali di persone fisiche in Svizzera o il cui
        trattamento produce effetti in Svizzera. Concretamente, per una
        PMI&nbsp;:
      </p>
      <ul>
        <li>I dati dei vostri clienti e prospect (nome, email, storico acquisti, ecc.)</li>
        <li>I dati dei vostri dipendenti (dossier HR, salari, dati sanitari se applicabile)</li>
        <li>I dati raccolti tramite il vostro sito web (moduli, cookie, newsletter)</li>
      </ul>
      <p>
        La dimensione dell&rsquo;azienda non esclude nessuno dal campo di
        applicazione della legge. Influisce invece su alcuni obblighi
        precisi, come quello di tenere un{" "}
        <Link href={`/${locale}/guide/registre-des-traitements`}>
          registro dei trattamenti
        </Link>
        , che prevede agevolazioni per le piccole strutture a determinate
        condizioni.
      </p>

      <h2>Cosa cambia concretamente con la revisione</h2>
      <ul>
        <li>
          <strong>Obbligo d&rsquo;informazione rafforzato</strong>: le
          persone interessate devono essere informate chiaramente sulla
          raccolta dei loro dati, prima o al momento della raccolta.
        </li>
        <li>
          <strong>Sicurezza dei dati</strong>: adozione di misure tecniche e
          organizzative proporzionate al rischio (crittografia, controllo
          degli accessi, backup).
        </li>
        <li>
          <strong>Notifica delle violazioni</strong>: obbligo di segnalare
          determinate violazioni di sicurezza all&rsquo;Incaricato federale
          della protezione dei dati e della trasparenza (IFPDT).
        </li>
        <li>
          <strong>Sanzioni penali personali</strong>: a differenza della
          vecchia legge, sono le persone fisiche responsabili a poter essere
          sanzionate, non solo l&rsquo;azienda. Dettagli nella nostra guida
          sulle{" "}
          <Link href={`/${locale}/guide/sanctions-nlpd`}>sanzioni nLPD</Link>.
        </li>
      </ul>

      <h2>Gli obblighi principali per una PMI</h2>
      <p>
        In pratica, una messa in conformità copre generalmente cinque
        elementi&nbsp;: un inventario dei trattamenti di dati effettuati,
        un&rsquo;{" "}
        <Link href={`/${locale}/guide/politique-de-confidentialite`}>
          informativa sulla privacy
        </Link>{" "}
        che informa chiaramente gli interessati,{" "}
        <Link href={`/${locale}/guide/contrat-sous-traitance-dpa`}>
          contratti di sub-trattamento
        </Link>{" "}
        con i fornitori che trattano dati per vostro conto (hosting, CRM,
        contabilità online), una procedura definita in caso di violazione
        dei dati, e una designazione chiara di chi, internamente, risponde
        alle domande sulla protezione dei dati.
      </p>

      <h2>nLPD e GDPR: bisogna occuparsi di entrambi?</h2>
      <p>
        Se la vostra PMI tratta dati di residenti dell&rsquo;Unione Europea
        (clienti, dipendenti da remoto, prospect tramite un sito accessibile
        dall&rsquo;UE in certi casi), il GDPR può applicarsi parallelamente
        alla nLPD. I due testi si sovrappongono in gran parte, ma non sono
        identici&nbsp;: una conformità GDPR non garantisce automaticamente
        una conformità nLPD, e viceversa.
      </p>

      <h2>Da dove iniziare?</h2>
      <p>
        Il metodo più efficace consiste nel partire da uno stato dei luoghi
        preciso dei vostri trattamenti di dati attuali, per poi colmare le
        lacune una per una piuttosto che ripartire da zero. È esattamente
        ciò che fa la nostra diagnosi gratuita qui sotto.
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
