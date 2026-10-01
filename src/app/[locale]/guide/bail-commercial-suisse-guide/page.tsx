import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import GuideLayout from "@/components/site/GuideLayout";
import { getGuideArticle } from "@/lib/guide/articles";
import { isLocale, DEFAULT_LOCALE, type Locale } from "@/i18n/config";
import { pageMetadata, seoTitle } from "@/lib/seo";

const article = getGuideArticle("bail-commercial-suisse-guide")!;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  return pageMetadata({
    locale,
    path: `/guide/${article.slug}`,
    title: seoTitle(article.title[locale]),
    description: article.description[locale],
  });
}

function Fr({ locale }: { locale: Locale }) {
  return (
    <>
      <h2>Durée fixe ou reconductible : une vraie différence</h2>
      <p>
        Un bail commercial à durée fixe ne peut généralement pas être
        résilié avant son terme, sauf clause contraire. Contrairement
        à un bail d&rsquo;habitation, la protection contre les congés y est
        plus limitée. Vérifier la durée exacte et les conditions de
        reconduction avant de signer évite de se retrouver engagé plus
        longtemps que prévu.
      </p>

      <h2>Travaux et aménagements : qui paie, qui décide</h2>
      <p>
        Un bail commercial flou sur les travaux d&rsquo;aménagement
        (qui les finance, qui les autorise, ce qu&rsquo;il advient en fin de
        bail) génère des litiges fréquents à la sortie des locaux,
        notamment sur la remise en état exigée par le bailleur.
      </p>

      <h2>Sous-location et cession : des clauses à ne pas négliger</h2>
      <p>
        Si votre activité peut évoluer (déménagement partiel, association
        avec un tiers), la possibilité de sous-louer ou de céder le bail
        doit être prévue explicitement. À défaut, elle dépend de
        l&rsquo;accord du bailleur, qui peut la refuser sans motif
        particulier dans certains cas.
      </p>

      <h2>Une précision importante</h2>
      <p>
        Ce guide présente des règles générales, pas un conseil juridique
        personnalisé. Le droit du bail varie sur des points importants
        selon le canton et le type de local.
      </p>

      <p>
        Pour la relecture d&rsquo;un bail avant signature, voir{" "}
        <Link href={`/${locale}/#offre`}>nos formules d&rsquo;abonnement</Link>
        .
      </p>
    </>
  );
}

function De({ locale }: { locale: Locale }) {
  return (
    <>
      <h2>Feste oder verlängerbare Dauer: ein echter Unterschied</h2>
      <p>
        Ein Geschäftsmietvertrag mit fester Dauer kann in der Regel nicht
        vor Ablauf gekündigt werden, sofern nichts anderes vereinbart wurde.
        Anders als bei einer Wohnungsmiete ist der Kündigungsschutz
        hier eingeschränkter. Die genaue Dauer und die
        Verlängerungsbedingungen vor der Unterschrift zu prüfen verhindert
        eine längere Bindung als geplant.
      </p>

      <h2>Umbauten und Einrichtungen: wer zahlt, wer entscheidet</h2>
      <p>
        Ein Geschäftsmietvertrag, der bei Umbauarbeiten unklar bleibt (wer
        sie finanziert, wer sie bewilligt, was bei Vertragsende damit
        geschieht), erzeugt häufig Streitigkeiten beim Auszug,
        insbesondere bezüglich der vom Vermieter verlangten Rückbaupflicht.
      </p>

      <h2>Untermiete und Abtretung: nicht zu vernachlässigende Klauseln</h2>
      <p>
        Falls sich Ihre Tätigkeit weiterentwickeln kann (Teilumzug,
        Zusammenarbeit mit Dritten), muss die Möglichkeit der Untermiete
        oder Abtretung ausdrücklich vorgesehen werden. Andernfalls
        hängt sie von der Zustimmung der Vermieterschaft ab, die diese in
        gewissen Fällen ohne besonderen Grund verweigern kann.
      </p>

      <h2>Ein wichtiger Hinweis</h2>
      <p>
        Dieser Ratgeber stellt allgemeine Regeln dar, keine individuelle
        Rechtsberatung. Das Mietrecht variiert in wichtigen Punkten je nach
        Kanton und Art der Räumlichkeiten.
      </p>

      <p>
        Für die Prüfung eines Mietvertrags vor der Unterschrift siehe{" "}
        <Link href={`/${locale}/#offre`}>unsere Abo-Formeln</Link>.
      </p>
    </>
  );
}

function En({ locale }: { locale: Locale }) {
  return (
    <>
      <h2>Fixed or renewable term: a real difference</h2>
      <p>
        A fixed-term commercial lease generally cannot be terminated before
        it ends, unless otherwise agreed. Unlike residential leases,
        protection against termination is more limited here. Checking the
        exact duration and renewal conditions before signing prevents being
        committed longer than planned.
      </p>

      <h2>Fit-out works: who pays, who decides</h2>
      <p>
        A commercial lease that&rsquo;s vague on fit-out works (who funds
        them, who approves them, what happens to them at the end of the
        lease) generates frequent disputes when leaving the premises,
        particularly over the reinstatement required by the landlord.
      </p>

      <h2>Subletting and assignment: clauses not to overlook</h2>
      <p>
        If your business may evolve (partial move, partnering with a
        third party), the ability to sublet or assign the lease must be
        explicitly provided for. Otherwise it depends on the
        landlord&rsquo;s consent, which can be refused without particular
        grounds in some cases.
      </p>

      <h2>An important note</h2>
      <p>
        This guide presents general rules, not individualized legal advice.
        Lease law varies on important points depending on the canton and
        the type of premises.
      </p>

      <p>
        For a lease review before signing, see{" "}
        <Link href={`/${locale}/#offre`}>our subscription plans</Link>.
      </p>
    </>
  );
}

function It({ locale }: { locale: Locale }) {
  return (
    <>
      <h2>Durata fissa o rinnovabile: una vera differenza</h2>
      <p>
        Una locazione commerciale a durata fissa generalmente non può
        essere disdetta prima della scadenza, salvo clausola contraria.
        A differenza di una locazione abitativa, la protezione
        contro la disdetta è qui più limitata. Verificare la durata esatta
        e le condizioni di rinnovo prima di firmare evita di ritrovarsi
        vincolati più a lungo del previsto.
      </p>

      <h2>Lavori e allestimenti: chi paga, chi decide</h2>
      <p>
        Una locazione commerciale poco chiara sui lavori di allestimento
        (chi li finanzia, chi li autorizza, cosa succede alla fine della
        locazione) genera frequenti controversie all&rsquo;uscita dai
        locali, in particolare sul ripristino richiesto dal
        locatore.
      </p>

      <h2>Sublocazione e cessione: clausole da non trascurare</h2>
      <p>
        Se la vostra attività può evolversi (trasloco parziale,
        associazione con terzi), la possibilità di sublocare o cedere il
        contratto deve essere prevista esplicitamente. Altrimenti
        dipende dal consenso del locatore, che può rifiutarlo senza motivo
        particolare in alcuni casi.
      </p>

      <h2>Una precisazione importante</h2>
      <p>
        Questa guida presenta regole generali, non una consulenza legale
        personalizzata. Il diritto di locazione varia su punti importanti
        secondo il cantone e il tipo di locale.
      </p>

      <p>
        Per la revisione di un contratto di locazione prima della firma,
        vedere{" "}
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
