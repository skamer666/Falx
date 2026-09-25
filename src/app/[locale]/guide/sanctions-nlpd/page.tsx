import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import GuideLayout from "@/components/site/GuideLayout";
import { getGuideArticle } from "@/lib/guide/articles";
import { isLocale, DEFAULT_LOCALE, type Locale } from "@/i18n/config";

const article = getGuideArticle("sanctions-nlpd")!;

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
      <h2>Une différence importante avec l&rsquo;ancienne loi</h2>
      <p>
        Sous l&rsquo;ancienne loi de 1992, les sanctions visaient rarement
        les entreprises dans la pratique. La nLPD change cette
        logique&nbsp;: elle prévoit des <strong>amendes pénales visant les
        personnes physiques responsables</strong> &mdash; en général les
        personnes qui dirigent l&rsquo;entreprise ou qui ont pris la
        décision fautive &mdash; et non l&rsquo;entreprise elle-même en tant
        que personne morale, sauf identification impossible de la personne
        responsable, auquel cas l&rsquo;amende peut être mise à la charge de
        l&rsquo;entreprise dans une limite plus faible.
      </p>

      <h2>Jusqu&rsquo;à combien ?</h2>
      <p>
        Le montant maximal prévu par la loi est de <strong>250&rsquo;000
        CHF</strong>, réservé aux violations intentionnelles et aux cas les
        plus graves&nbsp;: manquement au devoir d&rsquo;information,
        violation des obligations minimales de sécurité des données,
        violation des obligations liées à la sous-traitance, ou
        transmission de données à l&rsquo;étranger en violation des
        garanties exigées. Une négligence isolée, corrigée rapidement,
        n&rsquo;expose pas au même niveau de risque qu&rsquo;un manquement
        délibéré et répété.
      </p>

      <h2>Ce qui déclenche concrètement un contrôle</h2>
      <p>Dans la pratique, les procédures démarrent le plus souvent après&nbsp;:</p>
      <ul>
        <li>Une plainte d&rsquo;un client, d&rsquo;un employé ou d&rsquo;un ancien employé</li>
        <li>Une violation de données rendue publique (fuite, piratage) ayant fait l&rsquo;objet d&rsquo;une notification</li>
        <li>Un contrôle sectoriel ciblé par le Préposé fédéral à la protection des données et à la transparence (PFPDT)</li>
      </ul>
      <p>
        Autrement dit, le risque n&rsquo;est pas tant un contrôle
        administratif aléatoire qu&rsquo;un déclencheur concret &mdash;
        souvent une personne mécontente qui sait qu&rsquo;elle a des droits.
      </p>

      <h2>Le risque réputationnel, souvent sous-estimé</h2>
      <p>
        Au-delà de l&rsquo;amende elle-même, une violation de données rendue
        publique ou un litige avec un client sur l&rsquo;usage de ses
        données a un coût en confiance, particulièrement pour une PME dont
        la réputation locale compte. C&rsquo;est un argument qui pèse
        souvent plus lourd, dans la décision de se mettre en conformité,
        que le montant théorique de l&rsquo;amende.
      </p>

      <h2>Réduire le risque, concrètement</h2>
      <p>
        Un{" "}
        <Link href={`/${locale}/guide/registre-des-traitements`}>
          registre des traitements
        </Link>{" "}
        à jour, une{" "}
        <Link href={`/${locale}/guide/politique-de-confidentialite`}>
          politique de confidentialité
        </Link>{" "}
        exacte et une procédure définie en cas de violation de données sont
        les trois éléments qui, en cas de contrôle ou de plainte,
        démontrent une démarche de conformité sérieuse plutôt qu&rsquo;une
        négligence caractérisée &mdash; une différence qui compte
        directement dans l&rsquo;appréciation de la gravité d&rsquo;un
        manquement.
      </p>
    </>
  );
}

function De({ locale }: { locale: Locale }) {
  return (
    <>
      <h2>Ein wichtiger Unterschied zum alten Gesetz</h2>
      <p>
        Unter dem alten Gesetz von 1992 richteten sich Sanktionen in der
        Praxis selten gegen Unternehmen. Das DSG ändert diese
        Logik&nbsp;: Es sieht{" "}
        <strong>Strafbussen gegen die verantwortlichen natürlichen
        Personen</strong> vor &mdash; in der Regel die Personen, die das
        Unternehmen leiten oder den fehlerhaften Entscheid getroffen haben
        &mdash; und nicht gegen das Unternehmen als juristische Person,
        ausser wenn die verantwortliche Person nicht identifiziert werden
        kann; dann kann die Busse dem Unternehmen auferlegt werden, jedoch
        mit einem tieferen Höchstbetrag.
      </p>

      <h2>Bis zu welcher Höhe?</h2>
      <p>
        Der vom Gesetz vorgesehene Höchstbetrag liegt bei{" "}
        <strong>CHF 250&rsquo;000</strong> und ist vorsätzlichen
        Verletzungen sowie den schwersten Fällen vorbehalten&nbsp;: Verstoss
        gegen die Informationspflicht, Verletzung der
        Mindest-Sicherheitspflichten, Verletzung der Pflichten im
        Zusammenhang mit der Auftragsbearbeitung, oder Datenübermittlung ins
        Ausland unter Verletzung der geforderten Garantien. Eine
        vereinzelte, rasch behobene Nachlässigkeit birgt nicht das gleiche
        Risiko wie ein vorsätzlicher und wiederholter Verstoss.
      </p>

      <h2>Was konkret eine Kontrolle auslöst</h2>
      <p>In der Praxis beginnen Verfahren meist nach&nbsp;:</p>
      <ul>
        <li>Einer Beschwerde eines Kunden, einer Mitarbeiterin oder eines ehemaligen Mitarbeiters</li>
        <li>Einer öffentlich bekannt gewordenen Datenschutzverletzung (Leck, Hackerangriff), die gemeldet wurde</li>
        <li>Einer gezielten Sektorkontrolle durch den Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB)</li>
      </ul>
      <p>
        Das Risiko liegt also weniger in einer zufälligen behördlichen
        Kontrolle als in einem konkreten Auslöser &mdash; oft eine
        unzufriedene Person, die um ihre Rechte weiss.
      </p>

      <h2>Das oft unterschätzte Reputationsrisiko</h2>
      <p>
        Über die Busse selbst hinaus hat eine öffentlich gewordene
        Datenschutzverletzung oder ein Streit mit einer Kundin über die
        Nutzung ihrer Daten einen Vertrauenskosten, besonders für ein KMU,
        dessen lokaler Ruf zählt. Dieses Argument wiegt bei der Entscheidung
        für Compliance oft schwerer als der theoretische Bussenbetrag.
      </p>

      <h2>Das Risiko konkret senken</h2>
      <p>
        Ein aktuelles{" "}
        <Link href={`/${locale}/guide/registre-des-traitements`}>
          Verarbeitungsverzeichnis
        </Link>
        , eine präzise{" "}
        <Link href={`/${locale}/guide/politique-de-confidentialite`}>
          Datenschutzerklärung
        </Link>{" "}
        und ein festgelegtes Verfahren im Falle einer Datenschutzverletzung
        sind die drei Elemente, die im Kontroll- oder Beschwerdefall eine
        ernsthafte Compliance-Bemühung statt einer eigentlichen
        Nachlässigkeit belegen &mdash; ein Unterschied, der bei der
        Beurteilung der Schwere eines Verstosses direkt ins Gewicht fällt.
      </p>
    </>
  );
}

function En({ locale }: { locale: Locale }) {
  return (
    <>
      <h2>An important shift from the old law</h2>
      <p>
        Under the 1992 law, penalties rarely targeted companies in practice.
        The FADP changes that logic: it provides for{" "}
        <strong>criminal fines against the responsible natural
        persons</strong> &mdash; generally those running the company or who
        made the faulty decision &mdash; rather than against the company
        itself as a legal entity, unless the responsible individual cannot
        be identified, in which case the fine may be imposed on the company,
        within a lower cap.
      </p>

      <h2>Up to how much?</h2>
      <p>
        The maximum amount set by law is <strong>CHF 250,000</strong>,
        reserved for intentional violations and the most serious cases:
        failure to fulfil the duty to inform, violation of minimum data
        security obligations, violation of data processing agreement
        obligations, or transferring data abroad in violation of the
        required safeguards. An isolated, quickly corrected lapse does not
        carry the same level of risk as a deliberate, repeated breach.
      </p>

      <h2>What actually triggers a review</h2>
      <p>In practice, proceedings most often start after:</p>
      <ul>
        <li>A complaint from a customer, an employee or a former employee</li>
        <li>A publicly known data breach (leak, hack) that was reported</li>
        <li>A targeted sector review by the Federal Data Protection and Information Commissioner (FDPIC)</li>
      </ul>
      <p>
        In other words, the risk is less about a random administrative
        check than a concrete trigger &mdash; often an unhappy person who
        knows their rights.
      </p>

      <h2>The often underestimated reputational risk</h2>
      <p>
        Beyond the fine itself, a publicised data breach or a dispute with a
        customer over the use of their data carries a cost in trust,
        particularly for an SME whose local reputation matters. This is
        often a heavier argument, in the decision to become compliant, than
        the theoretical amount of the fine.
      </p>

      <h2>Reducing the risk, concretely</h2>
      <p>
        An up-to-date{" "}
        <Link href={`/${locale}/guide/registre-des-traitements`}>
          record of processing activities
        </Link>
        , an accurate{" "}
        <Link href={`/${locale}/guide/politique-de-confidentialite`}>
          privacy policy
        </Link>
        , and a defined procedure for data breaches are the three elements
        that, in the event of a review or complaint, demonstrate a serious
        compliance effort rather than outright negligence &mdash; a
        difference that directly affects how the severity of a breach is
        assessed.
      </p>
    </>
  );
}

function It({ locale }: { locale: Locale }) {
  return (
    <>
      <h2>Una differenza importante con la vecchia legge</h2>
      <p>
        Sotto la vecchia legge del 1992, le sanzioni raramente colpivano le
        aziende nella pratica. La nLPD cambia questa logica&nbsp;: prevede{" "}
        <strong>multe penali a carico delle persone fisiche
        responsabili</strong> &mdash; generalmente le persone che dirigono
        l&rsquo;azienda o che hanno preso la decisione colposa &mdash; e non
        l&rsquo;azienda stessa come persona giuridica, salvo impossibilità
        di identificare la persona responsabile, nel qual caso la multa può
        essere posta a carico dell&rsquo;azienda entro un limite inferiore.
      </p>

      <h2>Fino a quanto?</h2>
      <p>
        L&rsquo;importo massimo previsto dalla legge è di{" "}
        <strong>CHF 250&rsquo;000</strong>, riservato alle violazioni
        intenzionali e ai casi più gravi&nbsp;: mancata osservanza
        dell&rsquo;obbligo d&rsquo;informazione, violazione degli obblighi
        minimi di sicurezza dei dati, violazione degli obblighi legati al
        sub-trattamento, o trasmissione di dati all&rsquo;estero in
        violazione delle garanzie richieste. Una negligenza isolata,
        corretta rapidamente, non espone allo stesso livello di rischio di
        una violazione deliberata e ripetuta.
      </p>

      <h2>Cosa innesca concretamente un controllo</h2>
      <p>In pratica, le procedure iniziano più spesso dopo&nbsp;:</p>
      <ul>
        <li>Un reclamo di un cliente, un dipendente o un ex dipendente</li>
        <li>Una violazione di dati resa pubblica (fuga, attacco informatico) oggetto di notifica</li>
        <li>Un controllo settoriale mirato dell&rsquo;Incaricato federale della protezione dei dati e della trasparenza (IFPDT)</li>
      </ul>
      <p>
        In altre parole, il rischio non è tanto un controllo amministrativo
        casuale quanto un fattore scatenante concreto &mdash; spesso una
        persona insoddisfatta che conosce i propri diritti.
      </p>

      <h2>Il rischio reputazionale, spesso sottovalutato</h2>
      <p>
        Al di là della multa stessa, una violazione di dati resa pubblica o
        un contenzioso con un cliente sull&rsquo;uso dei suoi dati ha un
        costo in termini di fiducia, particolarmente per una PMI la cui
        reputazione locale conta. Questo è un argomento che spesso pesa più
        dell&rsquo;importo teorico della multa, nella decisione di mettersi
        in conformità.
      </p>

      <h2>Ridurre il rischio, concretamente</h2>
      <p>
        Un{" "}
        <Link href={`/${locale}/guide/registre-des-traitements`}>
          registro dei trattamenti
        </Link>{" "}
        aggiornato, un&rsquo;{" "}
        <Link href={`/${locale}/guide/politique-de-confidentialite`}>
          informativa sulla privacy
        </Link>{" "}
        esatta e una procedura definita in caso di violazione dei dati sono
        i tre elementi che, in caso di controllo o reclamo, dimostrano un
        percorso di conformità serio piuttosto che una negligenza
        caratterizzata &mdash; una differenza che conta direttamente nella
        valutazione della gravità di una violazione.
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
