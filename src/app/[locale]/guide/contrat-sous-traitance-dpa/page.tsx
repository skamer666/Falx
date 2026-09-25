import type { Metadata } from "next";
import Link from "next/link";
import GuideLayout from "@/components/site/GuideLayout";
import { getGuideArticle } from "@/lib/guide/articles";
import { isLocale, DEFAULT_LOCALE, type Locale } from "@/i18n/config";

const article = getGuideArticle("contrat-sous-traitance-dpa")!;

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
      <h2>Qu&rsquo;est-ce qu&rsquo;un sous-traitant, au sens de la loi ?</h2>
      <p>
        Un sous-traitant est toute entreprise externe qui traite des données
        personnelles <strong>pour votre compte</strong>, selon vos
        instructions. La plupart des PME en ont beaucoup plus qu&rsquo;elles
        ne le pensent&nbsp;: hébergeur web, outil de CRM, logiciel de
        comptabilité en ligne, prestataire d&rsquo;emailing, outil de
        recrutement, service de paie externalisé. Chacun de ces
        prestataires devrait apparaître dans votre{" "}
        <Link href={`/${locale}/guide/registre-des-traitements`}>
          registre des traitements
        </Link>
        .
      </p>

      <h2>Pourquoi un simple contrat de service ne suffit pas</h2>
      <p>
        Un contrat commercial classique (conditions générales, contrat
        d&rsquo;abonnement à un logiciel) ne couvre généralement pas les
        obligations spécifiques à la protection des données. Le contrat de
        sous-traitance &mdash; souvent appelé DPA (Data Processing
        Agreement) &mdash; est un document distinct, ou un avenant, qui fixe
        précisément&nbsp;:
      </p>
      <ul>
        <li>L&rsquo;objet et la durée du traitement confié au prestataire</li>
        <li>Les instructions que le sous-traitant doit suivre, sans les dépasser</li>
        <li>Les mesures de sécurité que le prestataire s&rsquo;engage à respecter</li>
        <li>Les conditions dans lesquelles il peut lui-même recourir à un sous-traitant ultérieur</li>
        <li>Ce qui se passe en cas de violation de données constatée par le prestataire</li>
        <li>Ce qui advient des données à la fin du contrat (suppression, restitution)</li>
      </ul>

      <h2>Et si le prestataire est à l&rsquo;étranger ?</h2>
      <p>
        De nombreux outils SaaS utilisés par les PME suisses sont hébergés
        aux États-Unis ou ailleurs hors de Suisse. Dans ce cas, le contrat
        de sous-traitance doit aussi couvrir les garanties applicables au
        transfert de données à l&rsquo;étranger (clauses contractuelles
        types reconnues, ou pays disposant d&rsquo;un niveau de protection
        jugé adéquat). C&rsquo;est un point souvent oublié parce que
        l&rsquo;outil paraît &laquo;&nbsp;juste un logiciel&nbsp;&raquo;,
        alors qu&rsquo;il implique un transfert réel de données hors de
        Suisse.
      </p>

      <h2>Qui doit signer quoi, en pratique</h2>
      <p>
        Pour les grands éditeurs (Google, Microsoft, la plupart des CRM
        connus), un DPA standard existe déjà et peut généralement être
        accepté tel quel, parfois directement depuis les paramètres du
        compte. Pour des prestataires plus petits ou locaux (agence,
        freelance, comptable indépendant), c&rsquo;est à vous de fournir le
        contrat &mdash; ce qui suppose d&rsquo;avoir un modèle prêt à
        proposer, adapté au droit suisse.
      </p>

      <h2>Un chantier à ne pas sous-estimer</h2>
      <p>
        Recenser tous les prestataires concernés, vérifier lesquels ont déjà
        un DPA en place et lesquels n&rsquo;en ont pas, puis faire signer
        les contrats manquants, représente souvent la partie la plus longue
        d&rsquo;une mise en conformité &mdash; bien plus que la rédaction
        d&rsquo;une{" "}
        <Link href={`/${locale}/guide/politique-de-confidentialite`}>
          politique de confidentialité
        </Link>
        . C&rsquo;est aussi la partie la plus souvent négligée, précisément
        parce qu&rsquo;elle implique de coordonner plusieurs tiers plutôt
        que de rédiger un document en interne.
      </p>
    </>
  );
}

function De({ locale }: { locale: Locale }) {
  return (
    <>
      <h2>Was ist ein Auftragsverarbeiter im Sinne des Gesetzes?</h2>
      <p>
        Ein Auftragsverarbeiter ist jedes externe Unternehmen, das
        Personendaten <strong>in Ihrem Auftrag</strong> gemäss Ihren
        Weisungen bearbeitet. Die meisten KMU haben deutlich mehr davon, als
        ihnen bewusst ist&nbsp;: Webhosting, CRM-Tool, Online-Buchhaltungssoftware,
        E-Mail-Marketing-Dienstleister, Recruiting-Tool, ausgelagerte
        Lohnadministration. Jeder dieser Dienstleister sollte in Ihrem{" "}
        <Link href={`/${locale}/guide/registre-des-traitements`}>
          Verarbeitungsverzeichnis
        </Link>{" "}
        auftauchen.
      </p>

      <h2>Warum ein einfacher Servicevertrag nicht reicht</h2>
      <p>
        Ein klassischer Geschäftsvertrag (AGB, Software-Abonnementvertrag)
        deckt in der Regel die spezifischen Datenschutzpflichten nicht ab.
        Der Auftragsverarbeitungsvertrag &mdash; oft AVV oder DPA (Data
        Processing Agreement) genannt &mdash; ist ein eigenständiges
        Dokument oder ein Nachtrag, der Folgendes genau regelt&nbsp;:
      </p>
      <ul>
        <li>Gegenstand und Dauer der dem Dienstleister übertragenen Bearbeitung</li>
        <li>Die Weisungen, an die sich der Auftragsverarbeiter halten muss, ohne darüber hinauszugehen</li>
        <li>Die Sicherheitsmassnahmen, zu denen sich der Dienstleister verpflichtet</li>
        <li>Die Bedingungen, unter denen er selbst einen weiteren Unterauftragsverarbeiter beiziehen darf</li>
        <li>Das Vorgehen bei einer vom Dienstleister festgestellten Datenschutzverletzung</li>
        <li>Was mit den Daten nach Vertragsende geschieht (Löschung, Rückgabe)</li>
      </ul>

      <h2>Und wenn der Dienstleister im Ausland sitzt?</h2>
      <p>
        Viele von Schweizer KMU genutzte SaaS-Tools werden in den USA oder
        anderswo ausserhalb der Schweiz gehostet. In diesem Fall muss der
        Auftragsverarbeitungsvertrag auch die für die Datenübermittlung ins
        Ausland geltenden Garantien abdecken (anerkannte
        Standardvertragsklauseln, oder ein Land mit als angemessen
        erachtetem Schutzniveau). Dieser Punkt wird oft übersehen, weil das
        Tool &laquo;&nbsp;nur eine Software&nbsp;&raquo; zu sein scheint,
        obwohl es eine echte Datenübermittlung aus der Schweiz heraus
        bedeutet.
      </p>

      <h2>Wer in der Praxis was unterschreiben muss</h2>
      <p>
        Bei den grossen Anbietern (Google, Microsoft, die meisten bekannten
        CRM-Systeme) existiert bereits ein Standard-AVV, der in der Regel
        unverändert akzeptiert werden kann, teilweise direkt in den
        Kontoeinstellungen. Bei kleineren oder lokalen Dienstleistern
        (Agentur, Freelancer, unabhängige Buchhaltung) müssen Sie selbst den
        Vertrag bereitstellen &mdash; dafür braucht es eine einsatzbereite,
        an das Schweizer Recht angepasste Vorlage.
      </p>

      <h2>Ein Aufwand, der nicht unterschätzt werden sollte</h2>
      <p>
        Alle betroffenen Dienstleister zu erfassen, zu prüfen, wer bereits
        einen AVV hat und wer nicht, und dann die fehlenden Verträge
        unterschreiben zu lassen, ist oft der aufwendigste Teil einer
        Compliance-Umsetzung &mdash; deutlich mehr als das Verfassen einer{" "}
        <Link href={`/${locale}/guide/politique-de-confidentialite`}>
          Datenschutzerklärung
        </Link>
        . Es ist auch der am häufigsten vernachlässigte Teil, gerade weil er
        die Koordination mehrerer Dritter statt das interne Verfassen eines
        Dokuments erfordert.
      </p>
    </>
  );
}

function En({ locale }: { locale: Locale }) {
  return (
    <>
      <h2>What counts as a processor under the law?</h2>
      <p>
        A processor is any external company that processes personal data{" "}
        <strong>on your behalf</strong>, following your instructions. Most
        SMEs have far more of these than they realise: web hosting, CRM
        tools, online accounting software, email marketing vendors,
        recruitment tools, outsourced payroll. Each of these vendors should
        appear in your{" "}
        <Link href={`/${locale}/guide/registre-des-traitements`}>
          record of processing activities
        </Link>
        .
      </p>

      <h2>Why a plain service agreement is not enough</h2>
      <p>
        A standard commercial contract (terms of service, a software
        subscription agreement) generally does not cover data-protection-
        specific obligations. The data processing agreement &mdash; often
        called a DPA &mdash; is a distinct document, or an addendum, that
        precisely sets out:
      </p>
      <ul>
        <li>The subject matter and duration of the processing entrusted to the vendor</li>
        <li>The instructions the processor must follow, without going beyond them</li>
        <li>The security measures the vendor commits to</li>
        <li>The conditions under which it may itself engage a sub-processor</li>
        <li>What happens if the vendor detects a data breach</li>
        <li>What happens to the data at the end of the contract (deletion, return)</li>
      </ul>

      <h2>What if the vendor is based abroad?</h2>
      <p>
        Many SaaS tools used by Swiss SMEs are hosted in the United States or
        elsewhere outside Switzerland. In that case, the data processing
        agreement must also cover the safeguards applicable to transferring
        data abroad (recognised standard contractual clauses, or a country
        deemed to offer an adequate level of protection). This point is
        often missed because the tool seems like &ldquo;just software&rdquo;,
        even though it involves a real transfer of data outside Switzerland.
      </p>

      <h2>Who needs to sign what, in practice</h2>
      <p>
        For major providers (Google, Microsoft, most well-known CRMs), a
        standard DPA already exists and can generally be accepted as is,
        sometimes directly from the account settings. For smaller or local
        vendors (an agency, a freelancer, an independent bookkeeper), it is
        up to you to provide the contract &mdash; which means having a
        ready-to-use template adapted to Swiss law.
      </p>

      <h2>A task not to be underestimated</h2>
      <p>
        Mapping every relevant vendor, checking which ones already have a
        DPA in place and which do not, then getting the missing contracts
        signed, is often the longest part of becoming compliant &mdash; far
        more so than drafting a{" "}
        <Link href={`/${locale}/guide/politique-de-confidentialite`}>
          privacy policy
        </Link>
        . It is also the most commonly neglected part, precisely because it
        involves coordinating several third parties rather than drafting a
        document in-house.
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
