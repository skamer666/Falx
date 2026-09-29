import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import GuideLayout from "@/components/site/GuideLayout";
import { getGuideArticle } from "@/lib/guide/articles";
import { isLocale, DEFAULT_LOCALE, type Locale } from "@/i18n/config";

const article = getGuideArticle("conformite-nlpd-pme")!;

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
      <h2>Ce qui est vraiment obligatoire pour une PME</h2>
      <p>
        Deux éléments concernent la quasi-totalité des PME&nbsp;: une{" "}
        <strong>politique de confidentialité</strong> publiée sur votre
        site (dès que vous collectez des données, même juste un formulaire
        de contact), et un <strong>registre des activités de
        traitement</strong> décrivant quelles données vous traitez et
        pourquoi &mdash; une petite entreprise en est dispensée seulement
        si le traitement présente un risque faible pour les personnes
        concernées, ce qui reste rarement le cas dès qu&rsquo;il y a des
        données RH ou des clients.
      </p>

      <h2>Les sous-traitants (hébergeur, CRM, outils RH) doivent être encadrés</h2>
      <p>
        Dès qu&rsquo;un prestataire externe traite des données pour votre
        compte (hébergement, envoi d&rsquo;emails, paie), un contrat de
        sous-traitance des données doit encadrer cette relation. Beaucoup
        de PME découvrent cette obligation seulement lors d&rsquo;un
        contrôle ou d&rsquo;une plainte.
      </p>

      <h2>Que faire en cas de violation de données</h2>
      <p>
        Une fuite ou un accès non autorisé à des données personnelles peut
        déclencher une obligation d&rsquo;annonce au Préposé fédéral à la
        protection des données (PFPDT) si elle engendre un risque élevé
        pour les personnes concernées. Avoir une procédure définie à
        l&rsquo;avance (qui fait quoi, sous quel délai) évite d&rsquo;improviser
        dans l&rsquo;urgence.
      </p>

      <h2>Une précision importante</h2>
      <p>
        Ce guide présente des règles générales, pas un conseil juridique
        personnalisé. Le niveau d&rsquo;exigence dépend du volume et de la
        sensibilité des données que vous traitez réellement.
      </p>

      <p>
        Pour une mise en conformité adaptée à votre activité, voir{" "}
        <Link href={`/${locale}/#offre`}>nos formules d&rsquo;abonnement</Link>
        .
      </p>
    </>
  );
}

function De({ locale }: { locale: Locale }) {
  return (
    <>
      <h2>Was für ein KMU wirklich obligatorisch ist</h2>
      <p>
        Zwei Elemente betreffen praktisch alle KMU: eine auf Ihrer Website
        veröffentlichte <strong>Datenschutzerklärung</strong> (sobald Sie
        Daten erheben, auch nur über ein Kontaktformular), und ein{" "}
        <strong>Verzeichnis der Bearbeitungstätigkeiten</strong>, das
        beschreibt, welche Daten Sie bearbeiten und warum &mdash; ein
        Kleinunternehmen ist davon nur befreit, wenn die Bearbeitung ein
        geringes Risiko für die betroffenen Personen darstellt, was bei
        Personal- oder Kundendaten selten zutrifft.
      </p>

      <h2>Auftragsverarbeiter (Hosting, CRM, HR-Tools) müssen vertraglich geregelt sein</h2>
      <p>
        Sobald ein externer Dienstleister Daten in Ihrem Auftrag bearbeitet
        (Hosting, E-Mail-Versand, Lohnbuchhaltung), muss ein
        Auftragsverarbeitungsvertrag diese Beziehung regeln. Viele KMU
        entdecken diese Pflicht erst bei einer Kontrolle oder einer
        Beschwerde.
      </p>

      <h2>Was bei einer Datenschutzverletzung zu tun ist</h2>
      <p>
        Ein Datenleck oder unbefugter Zugriff auf Personendaten kann eine
        Meldepflicht gegenüber dem Eidgenössischen Datenschutz- und
        Öffentlichkeitsbeauftragten (EDÖB) auslösen, wenn ein hohes Risiko
        für die betroffenen Personen besteht. Ein im Voraus festgelegtes
        Verfahren (wer macht was, innert welcher Frist) verhindert
        Improvisation im Ernstfall.
      </p>

      <h2>Ein wichtiger Hinweis</h2>
      <p>
        Dieser Ratgeber stellt allgemeine Regeln dar, keine individuelle
        Rechtsberatung. Das erforderliche Niveau hängt vom Umfang und der
        Sensibilität der tatsächlich bearbeiteten Daten ab.
      </p>

      <p>
        Für eine auf Ihre Tätigkeit zugeschnittene Konformität siehe{" "}
        <Link href={`/${locale}/#offre`}>unsere Abo-Formeln</Link>.
      </p>
    </>
  );
}

function En({ locale }: { locale: Locale }) {
  return (
    <>
      <h2>What&rsquo;s actually mandatory for an SME</h2>
      <p>
        Two elements apply to nearly every SME: a{" "}
        <strong>privacy policy</strong> published on your site (as soon as
        you collect data, even just via a contact form), and a{" "}
        <strong>record of processing activities</strong> describing what
        data you process and why &mdash; a small business is only exempt if
        the processing presents a low risk to the people concerned, which
        rarely holds once HR or customer data is involved.
      </p>

      <h2>Processors (hosting, CRM, HR tools) need a contract</h2>
      <p>
        As soon as an external provider processes data on your behalf
        (hosting, email sending, payroll), a data processing agreement must
        govern that relationship. Many SMEs discover this obligation only
        during an audit or a complaint.
      </p>

      <h2>What to do in case of a data breach</h2>
      <p>
        A leak or unauthorised access to personal data can trigger a duty
        to notify the Federal Data Protection and Information Commissioner
        (FDPIC) if it poses a high risk to the people concerned. Having a
        procedure defined in advance (who does what, within what timeframe)
        avoids improvising under pressure.
      </p>

      <h2>An important note</h2>
      <p>
        This guide presents general rules, not individualized legal advice.
        The required level of compliance depends on the volume and
        sensitivity of the data you actually process.
      </p>

      <p>
        For compliance work tailored to your business, see{" "}
        <Link href={`/${locale}/#offre`}>our subscription plans</Link>.
      </p>
    </>
  );
}

function It({ locale }: { locale: Locale }) {
  return (
    <>
      <h2>Cosa è davvero obbligatorio per una PMI</h2>
      <p>
        Due elementi riguardano quasi tutte le PMI: un&rsquo;
        <strong>informativa sulla privacy</strong> pubblicata sul vostro
        sito (non appena raccogliete dati, anche solo tramite un modulo di
        contatto), e un <strong>registro delle attività di
        trattamento</strong> che descrive quali dati trattate e perché
        &mdash; una piccola impresa ne è dispensata solo se il trattamento
        presenta un rischio basso per le persone interessate, cosa che
        raramente vale non appena ci sono dati HR o dei clienti.
      </p>

      <h2>I sub-responsabili (hosting, CRM, strumenti HR) devono essere regolati</h2>
      <p>
        Non appena un fornitore esterno tratta dati per vostro conto
        (hosting, invio email, paghe), un contratto di sub-trattamento deve
        regolare questa relazione. Molte PMI scoprono questo obbligo solo
        in occasione di un controllo o di un reclamo.
      </p>

      <h2>Cosa fare in caso di violazione dei dati</h2>
      <p>
        Una fuga o un accesso non autorizzato a dati personali può
        innescare un obbligo di notifica all&rsquo;Incaricato federale
        della protezione dei dati e della trasparenza (IFPDT) se comporta
        un rischio elevato per le persone interessate. Avere una procedura
        definita in anticipo (chi fa cosa, entro quale termine) evita di
        improvvisare nell&rsquo;urgenza.
      </p>

      <h2>Una precisazione importante</h2>
      <p>
        Questa guida presenta regole generali, non una consulenza legale
        personalizzata. Il livello di esigenza dipende dal volume e dalla
        sensibilità dei dati che trattate realmente.
      </p>

      <p>
        Per una messa in conformità adattata alla vostra attività, vedere{" "}
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
