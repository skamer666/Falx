import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import GuideLayout from "@/components/site/GuideLayout";
import { getGuideArticle } from "@/lib/guide/articles";
import { isLocale, DEFAULT_LOCALE, type Locale } from "@/i18n/config";

const article = getGuideArticle("defaut-traduction-amende-suisse")!;

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
      <h2>Le principe : une nullité absolue, pas un simple vice réparable</h2>
      <p>
        Le droit suisse garantit à toute personne qui ne comprend pas la
        langue de la procédure le droit de recevoir une traduction des actes
        essentiels (art. 68 du Code de procédure pénale). Pour une
        ordonnance pénale, le Tribunal fédéral a confirmé qu&rsquo;un défaut
        de traduction constitue un <strong>motif de nullité absolue</strong>{" "}
        &mdash; la sanction procédurale la plus forte qui existe, pas un
        simple vice que l&rsquo;on peut corriger après coup.
      </p>

      <h2>Ce qui doit être traduit</h2>
      <p>
        Deux éléments au minimum doivent vous être communiqués dans une
        langue que vous comprenez&nbsp;: le <strong>dispositif</strong> de
        l&rsquo;ordonnance (ce qui est décidé contre vous) et les{" "}
        <strong>voies de droit</strong> (comment et dans quel délai faire
        opposition). Une simple feuille d&rsquo;information générale
        mentionnant qu&rsquo;une traduction existe ne suffit pas si le
        contenu essentiel lui-même n&rsquo;est pas traduit.
      </p>
      <p>
        Attention&nbsp;: ce n&rsquo;est pas un droit à la traduction
        intégrale de tout le dossier &mdash; seuls les actes de procédure
        essentiels sont concernés.
      </p>

      <h2>Qui est concerné en pratique</h2>
      <ul>
        <li>
          Les <strong>frontaliers et résidents étrangers</strong> qui
          reçoivent une ordonnance pénale rédigée dans la langue cantonale
          (souvent l&rsquo;allemand) sans traduction dans leur langue.
        </li>
        <li>
          Les <strong>touristes ou visiteurs de passage</strong> verbalisés
          pendant un séjour en Suisse.
        </li>
        <li>
          Toute personne domiciliée dans un canton dont elle ne maîtrise pas
          la langue officielle (par exemple un francophone installé en
          Suisse allemande).
        </li>
      </ul>

      <h2>Comment le faire valoir</h2>
      <p>
        Si vous n&rsquo;avez reçu qu&rsquo;une version dans une langue que
        vous ne comprenez pas, sans traduction du dispositif et des voies de
        droit, c&rsquo;est un motif à soulever explicitement dans votre
        opposition &mdash; y compris si le délai de 10 jours semble dépassé,
        puisque la question se pose précisément de savoir si ce délai a
        valablement commencé à courir sans notification compréhensible.
      </p>

      <h2>Une précision importante</h2>
      <p>
        Ce guide présente un principe établi par la jurisprudence, pas un
        conseil juridique personnalisé. La portée exacte de ce motif dépend
        des circonstances précises de votre dossier &mdash; c&rsquo;est ce
        que notre équipe vérifie avant de préparer votre opposition.
      </p>

      <p>
        Pour les autres vices de procédure (certificat de radar, preuve
        vidéo, signalisation), consultez notre{" "}
        <Link href={`/${locale}/guide/vices-de-procedure-amende-suisse`}>
          guide sur les vices de procédure
        </Link>
        . Pour la procédure générale, voir notre{" "}
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
      <h2>Der Grundsatz: absolute Nichtigkeit, kein blosser heilbarer Mangel</h2>
      <p>
        Das schweizerische Recht garantiert jeder Person, die die
        Verfahrenssprache nicht versteht, das Recht auf eine Übersetzung der
        wesentlichen Verfahrensakte (Art. 68 StPO). Für einen Strafbefehl
        hat das Bundesgericht bestätigt, dass eine fehlende Übersetzung
        einen <strong>absoluten Nichtigkeitsgrund</strong> darstellt &mdash;
        die stärkste Verfahrenssanktion, die es gibt, kein blosser
        nachträglich heilbarer Mangel.
      </p>

      <h2>Was übersetzt werden muss</h2>
      <p>
        Mindestens zwei Elemente müssen Ihnen in einer Sprache mitgeteilt
        werden, die Sie verstehen: das <strong>Dispositiv</strong> des
        Strafbefehls (was gegen Sie entschieden wird) und die{" "}
        <strong>Rechtsmittelbelehrung</strong> (wie und innerhalb welcher
        Frist Einsprache erhoben werden kann). Ein blosses allgemeines
        Informationsblatt, das erwähnt, dass eine Übersetzung existiert,
        reicht nicht aus, wenn der wesentliche Inhalt selbst nicht übersetzt
        ist.
      </p>
      <p>
        Achtung: Es besteht kein Anspruch auf die vollständige Übersetzung
        der gesamten Akten &mdash; nur die wesentlichen Verfahrensakte sind
        betroffen.
      </p>

      <h2>Wer davon in der Praxis betroffen ist</h2>
      <ul>
        <li>
          <strong>Grenzgängerinnen und -gänger sowie ausländische
          Wohnbevölkerung</strong>, die einen Strafbefehl in der kantonalen
          Sprache (oft Deutsch) ohne Übersetzung in ihre Sprache erhalten.
        </li>
        <li>
          <strong>Touristinnen und Touristen oder Durchreisende</strong>, die
          während eines Aufenthalts in der Schweiz gebüsst werden.
        </li>
        <li>
          Jede Person, die in einem Kanton wohnt, dessen Amtssprache sie
          nicht beherrscht (z.&nbsp;B. eine französischsprachige Person in
          der Deutschschweiz).
        </li>
      </ul>

      <h2>Wie Sie diesen Grund geltend machen</h2>
      <p>
        Wenn Sie nur eine Version in einer Sprache erhalten haben, die Sie
        nicht verstehen, ohne Übersetzung des Dispositivs und der
        Rechtsmittelbelehrung, ist das ein Grund, den Sie ausdrücklich in
        Ihrer Einsprache vorbringen sollten &mdash; auch wenn die
        10-Tage-Frist bereits abgelaufen scheint, denn genau die Frage, ob
        diese Frist ohne verständliche Zustellung gültig zu laufen begann,
        steht dann im Raum.
      </p>

      <h2>Ein wichtiger Hinweis</h2>
      <p>
        Dieser Ratgeber stellt einen von der Rechtsprechung etablierten
        Grundsatz dar, keine individuelle Rechtsberatung. Die genaue
        Tragweite dieses Grundes hängt von den konkreten Umständen Ihres
        Falls ab &mdash; das prüft unser Team, bevor wir Ihre Einsprache
        vorbereiten.
      </p>

      <p>
        Für weitere Verfahrensmängel (Radar-Zertifikat, Videobeweis,
        Signalisation) siehe unseren{" "}
        <Link href={`/${locale}/guide/vices-de-procedure-amende-suisse`}>
          Ratgeber zu Verfahrensmängeln
        </Link>
        . Für das allgemeine Verfahren siehe unseren{" "}
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
      <h2>The principle: absolute nullity, not a mere curable defect</h2>
      <p>
        Swiss law guarantees anyone who doesn&rsquo;t understand the
        language of the proceedings the right to a translation of the
        essential procedural acts (art. 68 CrimPC). For a penal order, the
        Federal Supreme Court has confirmed that a missing translation
        constitutes a ground for <strong>absolute nullity</strong> &mdash;
        the strongest procedural sanction that exists, not a defect that can
        simply be fixed afterwards.
      </p>

      <h2>What must be translated</h2>
      <p>
        At least two elements must be communicated to you in a language you
        understand: the <strong>operative part</strong> of the order (what
        is being decided against you) and the{" "}
        <strong>right-of-appeal information</strong> (how and within what
        deadline to object). A general information sheet merely mentioning
        that a translation exists isn&rsquo;t enough if the essential
        content itself isn&rsquo;t translated.
      </p>
      <p>
        Note: this isn&rsquo;t a right to a full translation of the entire
        file &mdash; only the essential procedural acts are covered.
      </p>

      <h2>Who this affects in practice</h2>
      <ul>
        <li>
          <strong>Cross-border commuters and foreign residents</strong> who
          receive a penal order in the cantonal language (often German)
          with no translation into their language.
        </li>
        <li>
          <strong>Tourists or visitors passing through</strong> fined during
          a stay in Switzerland.
        </li>
        <li>
          Anyone living in a canton whose official language they
          don&rsquo;t master (for example, a French speaker settled in
          German-speaking Switzerland).
        </li>
      </ul>

      <h2>How to raise it</h2>
      <p>
        If you only received a version in a language you don&rsquo;t
        understand, with no translation of the operative part and
        right-of-appeal information, that&rsquo;s a ground to raise
        explicitly in your objection &mdash; even if the 10-day deadline
        seems to have passed, since the very question is whether that
        deadline validly started running without an understandable
        notification.
      </p>

      <h2>An important note</h2>
      <p>
        This guide presents a principle established by case law, not
        individualized legal advice. The exact scope of this ground depends
        on your case&rsquo;s specific circumstances &mdash; which is exactly
        what our team checks before preparing your objection.
      </p>

      <p>
        For other procedural defects (radar certificate, video evidence,
        signage), see our{" "}
        <Link href={`/${locale}/guide/vices-de-procedure-amende-suisse`}>
          guide to procedural defects
        </Link>
        . For the general procedure, see our{" "}
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
      <h2>Il principio: nullità assoluta, non un semplice vizio sanabile</h2>
      <p>
        Il diritto svizzero garantisce a chiunque non comprenda la lingua
        della procedura il diritto di ricevere una traduzione degli atti
        procedurali essenziali (art. 68 CPP). Per un decreto penale, il
        Tribunale federale ha confermato che l&rsquo;assenza di traduzione
        costituisce un motivo di <strong>nullità assoluta</strong> &mdash;
        la sanzione procedurale più forte che esista, non un semplice vizio
        sanabile a posteriori.
      </p>

      <h2>Cosa deve essere tradotto</h2>
      <p>
        Almeno due elementi devono esservi comunicati in una lingua che
        comprendete: il <strong>dispositivo</strong> del decreto (ciò che
        viene deciso contro di voi) e le{" "}
        <strong>indicazioni sui mezzi di ricorso</strong> (come e entro
        quale termine fare opposizione). Un semplice foglio informativo
        generale che menziona l&rsquo;esistenza di una traduzione non basta
        se il contenuto essenziale stesso non è tradotto.
      </p>
      <p>
        Attenzione: non si tratta di un diritto alla traduzione integrale di
        tutto il fascicolo &mdash; sono coinvolti solo gli atti procedurali
        essenziali.
      </p>

      <h2>Chi è interessato in pratica</h2>
      <ul>
        <li>
          <strong>Frontalieri e residenti stranieri</strong> che ricevono un
          decreto penale redatto nella lingua cantonale (spesso il tedesco)
          senza traduzione nella propria lingua.
        </li>
        <li>
          <strong>Turisti o visitatori di passaggio</strong> multati durante
          un soggiorno in Svizzera.
        </li>
        <li>
          Chiunque risieda in un cantone la cui lingua ufficiale non
          padroneggia (ad esempio un francofono stabilito nella Svizzera
          tedesca).
        </li>
      </ul>

      <h2>Come farlo valere</h2>
      <p>
        Se avete ricevuto solo una versione in una lingua che non
        comprendete, senza traduzione del dispositivo e delle indicazioni
        sui mezzi di ricorso, questo è un motivo da far valere
        esplicitamente nella vostra opposizione &mdash; anche se il termine
        di 10 giorni sembra già scaduto, poiché è proprio la questione se
        tale termine sia validamente iniziato a decorrere senza una notifica
        comprensibile.
      </p>

      <h2>Una precisazione importante</h2>
      <p>
        Questa guida presenta un principio stabilito dalla giurisprudenza,
        non una consulenza legale personalizzata. La portata esatta di
        questo motivo dipende dalle circostanze precise del vostro caso
        &mdash; è esattamente ciò che il nostro team verifica prima di
        preparare la vostra opposizione.
      </p>

      <p>
        Per altri vizi di procedura (certificato del radar, prova video,
        segnaletica), consultate la nostra{" "}
        <Link href={`/${locale}/guide/vices-de-procedure-amende-suisse`}>
          guida sui vizi di procedura
        </Link>
        . Per la procedura generale, consultate la nostra{" "}
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
