import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import GuideLayout from "@/components/site/GuideLayout";
import { getGuideArticle } from "@/lib/guide/articles";
import { isLocale, DEFAULT_LOCALE, type Locale } from "@/i18n/config";

const article = getGuideArticle("mise-en-demeure-recouvrement-suisse")!;

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
      <h2>Rappel amical, puis mise en demeure : ne pas sauter d&rsquo;étape</h2>
      <p>
        Un premier rappel courtois suffit souvent. S&rsquo;il reste sans
        effet, la mise en demeure formelle est l&rsquo;étape qui fait
        courir les intérêts moratoires (5% l&rsquo;an en l&rsquo;absence
        d&rsquo;accord contraire) et prépare le dossier pour une poursuite
        (LP) si le paiement ne suit toujours pas.
      </p>

      <h2>Ce qui donne du poids à une mise en demeure</h2>
      <p>
        Un montant exact et justifié (référence à la facture, au contrat),
        un délai de paiement clair et raisonnable (10 à 15 jours est
        courant), et l&rsquo;annonce explicite des conséquences en cas de
        non-paiement (intérêts, poursuite). Un ton menaçant sans ces
        éléments concrets n&rsquo;a généralement aucun effet supplémentaire.
      </p>

      <h2>Quand passer à la poursuite (LP)</h2>
      <p>
        Une réquisition de poursuite auprès de l&rsquo;office des
        poursuites ne nécessite pas d&rsquo;avoir gagné un procès au
        préalable. C&rsquo;est souvent l&rsquo;étape suivante après
        une mise en demeure restée sans effet, et son coût est
        généralement mis à la charge du débiteur si la créance est fondée.
      </p>

      <h2>Une précision importante</h2>
      <p>
        Ce guide présente des règles générales, pas un conseil juridique
        personnalisé. Chaque créance a ses particularités (preuve, délai de
        prescription, contestation possible du débiteur).
      </p>

      <p>
        Pour la rédaction d&rsquo;une mise en demeure adaptée à votre
        dossier, voir{" "}
        <Link href={`/${locale}/#offre`}>nos formules d&rsquo;abonnement</Link>
        .
      </p>
    </>
  );
}

function De({ locale }: { locale: Locale }) {
  return (
    <>
      <h2>Freundliche Erinnerung, dann Mahnung: keine Stufe überspringen</h2>
      <p>
        Eine erste, höfliche Erinnerung genügt oft. Bleibt sie wirkungslos,
        ist die förmliche Mahnung (Inverzugsetzung) der Schritt, der
        Verzugszinsen auslöst (5% pro Jahr, sofern nichts anderes vereinbart
        wurde) und das Dossier für eine Betreibung vorbereitet, falls die
        Zahlung weiterhin ausbleibt.
      </p>

      <h2>Was einer Mahnung Gewicht verleiht</h2>
      <p>
        Ein genauer, begründeter Betrag (Verweis auf Rechnung, Vertrag),
        eine klare und angemessene Zahlungsfrist (10 bis 15 Tage sind
        üblich) und die ausdrückliche Ankündigung der Folgen bei
        Nichtzahlung (Zinsen, Betreibung). Ein drohender Ton ohne diese
        konkreten Elemente hat in der Regel keine zusätzliche Wirkung.
      </p>

      <h2>Wann zur Betreibung übergehen</h2>
      <p>
        Ein Betreibungsbegehren beim Betreibungsamt setzt keinen
        vorgängigen Gerichtsprozess voraus. Es ist oft der nächste
        Schritt nach einer wirkungslos gebliebenen Mahnung, und die Kosten
        gehen in der Regel zulasten der schuldnerischen Partei, sofern die
        Forderung begründet ist.
      </p>

      <h2>Ein wichtiger Hinweis</h2>
      <p>
        Dieser Ratgeber stellt allgemeine Regeln dar, keine individuelle
        Rechtsberatung. Jede Forderung hat ihre Besonderheiten (Beweis,
        Verjährungsfrist, mögliche Bestreitung durch die Schuldnerin oder
        den Schuldner).
      </p>

      <p>
        Für die Erstellung einer auf Ihren Fall zugeschnittenen Mahnung
        siehe <Link href={`/${locale}/#offre`}>unsere Abo-Formeln</Link>.
      </p>
    </>
  );
}

function En({ locale }: { locale: Locale }) {
  return (
    <>
      <h2>Friendly reminder, then formal notice: don&rsquo;t skip a step</h2>
      <p>
        A first, courteous reminder is often enough. If it has no effect,
        the formal notice (mise en demeure) is the step that triggers
        default interest (5% per year absent a different agreement) and
        prepares the file for formal debt collection if payment still
        doesn&rsquo;t follow.
      </p>

      <h2>What gives a formal notice real weight</h2>
      <p>
        An exact, justified amount (referencing the invoice, the contract),
        a clear and reasonable payment deadline (10 to 15 days is common),
        and an explicit statement of the consequences of non-payment
        (interest, debt collection). A threatening tone without these
        concrete elements usually has no additional effect.
      </p>

      <h2>When to move to formal debt collection</h2>
      <p>
        A debt collection request to the collection office doesn&rsquo;t
        require having won a lawsuit beforehand. It&rsquo;s often
        the next step after a formal notice that had no effect, and its
        cost is generally charged to the debtor if the claim is well
        founded.
      </p>

      <h2>An important note</h2>
      <p>
        This guide presents general rules, not individualized legal advice.
        Every claim has its own particulars (evidence, limitation period,
        possible dispute by the debtor).
      </p>

      <p>
        For drafting a formal notice tailored to your case, see{" "}
        <Link href={`/${locale}/#offre`}>our subscription plans</Link>.
      </p>
    </>
  );
}

function It({ locale }: { locale: Locale }) {
  return (
    <>
      <h2>Sollecito amichevole, poi diffida: non saltare una tappa</h2>
      <p>
        Un primo sollecito cortese spesso basta. Se resta senza effetto, la
        diffida formale è la tappa che fa decorrere gli interessi di mora
        (5% all&rsquo;anno in assenza di accordo contrario) e prepara il
        fascicolo per un&rsquo;esecuzione se il pagamento continua a
        mancare.
      </p>

      <h2>Cosa dà peso a una diffida</h2>
      <p>
        Un importo esatto e giustificato (riferimento alla fattura, al
        contratto), un termine di pagamento chiaro e ragionevole (10-15
        giorni è comune), e l&rsquo;annuncio esplicito delle conseguenze in
        caso di mancato pagamento (interessi, esecuzione). Un tono
        minaccioso senza questi elementi concreti generalmente non ha
        alcun effetto supplementare.
      </p>

      <h2>Quando passare all&rsquo;esecuzione</h2>
      <p>
        Una domanda di esecuzione presso l&rsquo;ufficio esecuzioni non
        richiede di aver prima vinto una causa. È spesso la tappa
        successiva dopo una diffida rimasta senza effetto, e il suo costo
        è generalmente a carico del debitore se il credito è fondato.
      </p>

      <h2>Una precisazione importante</h2>
      <p>
        Questa guida presenta regole generali, non una consulenza legale
        personalizzata. Ogni credito ha le proprie particolarità (prova,
        termine di prescrizione, possibile contestazione del debitore).
      </p>

      <p>
        Per la redazione di una diffida adattata al vostro caso, vedere{" "}
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
