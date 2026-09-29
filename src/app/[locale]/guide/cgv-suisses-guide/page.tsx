import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import GuideLayout from "@/components/site/GuideLayout";
import { getGuideArticle } from "@/lib/guide/articles";
import { isLocale, DEFAULT_LOCALE, type Locale } from "@/i18n/config";

const article = getGuideArticle("cgv-suisses-guide")!;

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
      <h2>Pourquoi des CGV génériques copiées en ligne posent problème</h2>
      <p>
        Des CGV trouvées sur un modèle générique protègent rarement votre
        activité réelle : elles omettent souvent votre mode de livraison, vos
        délais de paiement, ou contiennent des clauses inapplicables en
        Suisse (référence au droit d&rsquo;un autre pays, délais de
        rétractation qui ne s&rsquo;appliquent pas à votre cas). En cas de
        litige, des CGV mal adaptées ne vous protègent pas plus qu&rsquo;une
        absence de CGV.
      </p>

      <h2>Les clauses qui doivent obligatoirement être claires</h2>
      <ul>
        <li>
          <strong>Objet et prix</strong> : ce qui est vendu, à quel prix,
          en francs suisses, TVA incluse ou non.
        </li>
        <li>
          <strong>Modalités de paiement</strong> : délai, moyens acceptés,
          conséquences d&rsquo;un retard (intérêts moratoires, frais de
          rappel).
        </li>
        <li>
          <strong>Livraison ou exécution</strong> : délai indicatif, ce qui
          se passe en cas de retard.
        </li>
        <li>
          <strong>Responsabilité</strong> : une limitation raisonnable, qui
          reste valable en cas de faute grave ou intentionnelle (une clause
          qui l&rsquo;exclurait totalement serait nulle).
        </li>
        <li>
          <strong>Droit applicable et for</strong> : le droit suisse et le
          tribunal compétent en cas de litige.
        </li>
      </ul>

      <h2>Les clauses souvent oubliées</h2>
      <p>
        La propriété intellectuelle sur ce que vous livrez (qui reste
        propriétaire du travail avant paiement complet), la confidentialité
        des informations échangées, et une clause de résiliation claire
        (qui peut mettre fin au contrat, et à quelles conditions) sont
        rarement présentes dans les modèles génériques, alors qu&rsquo;elles
        évitent la majorité des litiges commerciaux courants.
      </p>

      <h2>CGV B2B et CGV B2C : ne pas confondre</h2>
      <p>
        Si vous vendez à des particuliers, des règles de protection du
        consommateur peuvent s&rsquo;appliquer différemment qu&rsquo;entre
        professionnels. Des CGV rédigées pour du B2B et utilisées telles
        quelles en B2C (ou l&rsquo;inverse) contiennent souvent des clauses
        inadaptées, voire inopposables, au type de client réellement visé.
      </p>

      <h2>Une précision importante</h2>
      <p>
        Ce guide présente des principes généraux, pas un conseil juridique
        personnalisé. Des CGV efficaces doivent refléter votre activité
        précise : c&rsquo;est exactement ce que couvre l&rsquo;abonnement
        Thrax Legal.
      </p>

      <p>
        Pour une révision de vos CGV actuelles ou une rédaction sur mesure,
        voir{" "}
        <Link href={`/${locale}/#offre`}>nos formules d&rsquo;abonnement</Link>
        .
      </p>
    </>
  );
}

function De({ locale }: { locale: Locale }) {
  return (
    <>
      <h2>Warum kopierte Standard-AGB problematisch sind</h2>
      <p>
        AGB aus einer generischen Vorlage schützen Ihre tatsächliche
        Tätigkeit selten: Sie berücksichtigen oft weder Ihre Lieferart noch
        Ihre Zahlungsfristen, oder enthalten Klauseln, die in der Schweiz
        nicht anwendbar sind (Verweis auf ausländisches Recht,
        Widerrufsfristen, die auf Ihren Fall nicht zutreffen). Im Streitfall
        schützen schlecht angepasste AGB nicht besser als fehlende AGB.
      </p>

      <h2>Klauseln, die unbedingt klar sein müssen</h2>
      <ul>
        <li>
          <strong>Gegenstand und Preis</strong>: was verkauft wird, zu
          welchem Preis, in Schweizer Franken, mit oder ohne MWST.
        </li>
        <li>
          <strong>Zahlungsbedingungen</strong>: Frist, akzeptierte
          Zahlungsmittel, Folgen eines Zahlungsverzugs (Verzugszinsen,
          Mahngebühren).
        </li>
        <li>
          <strong>Lieferung oder Ausführung</strong>: indikative Frist, was
          bei Verspätung geschieht.
        </li>
        <li>
          <strong>Haftung</strong>: eine angemessene Beschränkung, die bei
          grober oder vorsätzlicher Pflichtverletzung wirksam bleibt (eine
          Klausel, die sie vollständig ausschliessen würde, wäre nichtig).
        </li>
        <li>
          <strong>Anwendbares Recht und Gerichtsstand</strong>: schweizerisches
          Recht und das zuständige Gericht im Streitfall.
        </li>
      </ul>

      <h2>Häufig vergessene Klauseln</h2>
      <p>
        Das geistige Eigentum an dem, was Sie liefern (wer bis zur
        vollständigen Zahlung Eigentümer der Arbeit bleibt), die
        Vertraulichkeit ausgetauschter Informationen und eine klare
        Kündigungsklausel (wer den Vertrag unter welchen Bedingungen beenden
        kann) fehlen in generischen Vorlagen oft, obwohl sie die meisten
        gängigen Geschäftsstreitigkeiten vermeiden.
      </p>

      <h2>B2B- und B2C-AGB nicht verwechseln</h2>
      <p>
        Wenn Sie an Privatpersonen verkaufen, können
        Konsumentenschutzregeln anders gelten als zwischen Unternehmen. Für
        B2B verfasste AGB, die unverändert im B2C-Bereich verwendet werden
        (oder umgekehrt), enthalten oft Klauseln, die für die tatsächliche
        Kundschaft ungeeignet oder sogar unwirksam sind.
      </p>

      <h2>Ein wichtiger Hinweis</h2>
      <p>
        Dieser Ratgeber stellt allgemeine Grundsätze dar, keine individuelle
        Rechtsberatung. Wirksame AGB müssen Ihre konkrete Tätigkeit
        widerspiegeln: genau das deckt das Thrax-Legal-Abo ab.
      </p>

      <p>
        Für eine Prüfung Ihrer bestehenden AGB oder eine massgeschneiderte
        Erstellung siehe{" "}
        <Link href={`/${locale}/#offre`}>unsere Abo-Formeln</Link>.
      </p>
    </>
  );
}

function En({ locale }: { locale: Locale }) {
  return (
    <>
      <h2>Why copied generic T&Cs are a problem</h2>
      <p>
        T&amp;Cs pulled from a generic template rarely protect your actual
        business: they often leave out your delivery method or payment
        terms, or contain clauses that don&rsquo;t apply in Switzerland
        (reference to another country&rsquo;s law, withdrawal periods that
        don&rsquo;t apply to your case). In a dispute, poorly adapted T&amp;Cs
        protect you no better than having none.
      </p>

      <h2>Clauses that must be unambiguous</h2>
      <ul>
        <li>
          <strong>Subject and price</strong>: what is sold, at what price, in
          Swiss francs, VAT included or not.
        </li>
        <li>
          <strong>Payment terms</strong>: deadline, accepted methods,
          consequences of late payment (default interest, reminder fees).
        </li>
        <li>
          <strong>Delivery or performance</strong>: an indicative timeframe,
          what happens if it&rsquo;s delayed.
        </li>
        <li>
          <strong>Liability</strong>: a reasonable limitation that remains
          valid in cases of gross or intentional fault (a clause excluding
          it entirely would be void).
        </li>
        <li>
          <strong>Governing law and jurisdiction</strong>: Swiss law and the
          competent court in case of a dispute.
        </li>
      </ul>

      <h2>Commonly forgotten clauses</h2>
      <p>
        Intellectual property over what you deliver (who owns the work
        until full payment), confidentiality of exchanged information, and
        a clear termination clause (who can end the contract, and under
        what conditions) are often missing from generic templates, even
        though they prevent most common commercial disputes.
      </p>

      <h2>Don&rsquo;t confuse B2B and B2C T&amp;Cs</h2>
      <p>
        If you sell to consumers, consumer-protection rules may apply
        differently than between businesses. T&amp;Cs drafted for B2B and
        used as-is for B2C (or the reverse) often contain clauses that are
        unsuited, or even unenforceable, for the actual customer type.
      </p>

      <h2>An important note</h2>
      <p>
        This guide presents general principles, not individualized legal
        advice. Effective T&amp;Cs must reflect your specific business.
        That is exactly what the Thrax Legal subscription covers.
      </p>

      <p>
        For a review of your current T&amp;Cs or a tailored draft, see{" "}
        <Link href={`/${locale}/#offre`}>our subscription plans</Link>.
      </p>
    </>
  );
}

function It({ locale }: { locale: Locale }) {
  return (
    <>
      <h2>Perché delle condizioni generali generiche copiate sono un problema</h2>
      <p>
        Delle condizioni generali tratte da un modello generico proteggono
        raramente la vostra attività reale: spesso omettono le modalità di
        consegna o i termini di pagamento, oppure contengono clausole non
        applicabili in Svizzera (riferimento al diritto di un altro paese,
        termini di recesso che non si applicano al vostro caso). In caso di
        controversia, condizioni generali mal adattate non vi proteggono
        più della loro assenza.
      </p>

      <h2>Le clausole che devono essere assolutamente chiare</h2>
      <ul>
        <li>
          <strong>Oggetto e prezzo</strong>: cosa viene venduto, a quale
          prezzo, in franchi svizzeri, IVA inclusa o meno.
        </li>
        <li>
          <strong>Modalità di pagamento</strong>: termine, mezzi accettati,
          conseguenze di un ritardo (interessi di mora, spese di sollecito).
        </li>
        <li>
          <strong>Consegna o esecuzione</strong>: termine indicativo, cosa
          succede in caso di ritardo.
        </li>
        <li>
          <strong>Responsabilità</strong>: una limitazione ragionevole, che
          resta valida in caso di colpa grave o intenzionale (una clausola
          che la escludesse totalmente sarebbe nulla).
        </li>
        <li>
          <strong>Diritto applicabile e foro competente</strong>: il diritto
          svizzero e il tribunale competente in caso di controversia.
        </li>
      </ul>

      <h2>Le clausole spesso dimenticate</h2>
      <p>
        La proprietà intellettuale su ciò che consegnate (chi resta
        proprietario del lavoro prima del pagamento integrale), la
        riservatezza delle informazioni scambiate e una chiara clausola di
        risoluzione (chi può porre fine al contratto e a quali condizioni)
        mancano spesso nei modelli generici, pur evitando la maggior parte
        delle controversie commerciali comuni.
      </p>

      <h2>Non confondere condizioni generali B2B e B2C</h2>
      <p>
        Se vendete a privati, le regole di protezione dei consumatori
        possono applicarsi diversamente rispetto ai rapporti tra
        professionisti. Condizioni generali redatte per il B2B e usate
        tali quali per il B2C (o viceversa) contengono spesso clausole
        inadatte, se non inopponibili, al tipo di cliente realmente
        interessato.
      </p>

      <h2>Una precisazione importante</h2>
      <p>
        Questa guida presenta principi generali, non una consulenza legale
        personalizzata. Delle condizioni generali efficaci devono
        riflettere la vostra attività precisa: è esattamente ciò che
        copre l&rsquo;abbonamento Thrax Legal.
      </p>

      <p>
        Per una revisione delle vostre condizioni generali attuali o una
        redazione su misura, vedere{" "}
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
