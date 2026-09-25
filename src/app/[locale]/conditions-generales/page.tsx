import type { Metadata } from "next";
import type { ReactNode } from "react";
import NextLink from "next/link";
import Reveal from "@/components/Reveal";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import { Container } from "@/components/site/ui";
import { isLocale, DEFAULT_LOCALE, type Locale } from "@/i18n/config";

// À compléter avant mise en production : identité complète (nom, prénom),
// numéro d'entreprise BCE une fois obtenu, adresse. Choix du droit
// applicable et du for juridique (par défaut : Belgique, à revoir avec un
// juriste si besoin) — voir la section correspondante dans chaque langue.
const LAST_UPDATED = "2026-09-25";

const META: Record<Locale, { title: string; description: string }> = {
  fr: {
    title: "Conditions générales de vente | Thrax Legal",
    description:
      "Conditions générales applicables au Pack Conformité nLPD et à l'abonnement Suivi Conformité de Thrax Legal.",
  },
  de: {
    title: "Allgemeine Geschäftsbedingungen | Thrax Legal",
    description:
      "Allgemeine Geschäftsbedingungen für das DSG-Compliance-Paket und das Compliance-Abo von Thrax Legal.",
  },
  en: {
    title: "Terms & Conditions | Thrax Legal",
    description:
      "Terms and conditions applicable to Thrax Legal's FADP Compliance Pack and Ongoing Compliance subscription.",
  },
  it: {
    title: "Termini e condizioni | Thrax Legal",
    description:
      "Termini e condizioni applicabili al Pack Conformità nLPD e all'Abbonamento Conformità di Thrax Legal.",
  },
};

const HEADING: Record<Locale, string> = {
  fr: "Conditions générales de vente",
  de: "Allgemeine Geschäftsbedingungen",
  en: "Terms & Conditions",
  it: "Termini e condizioni",
};

const UPDATED_LABEL: Record<Locale, string> = {
  fr: "Dernière mise à jour",
  de: "Letzte Aktualisierung",
  en: "Last updated",
  it: "Ultimo aggiornamento",
};

const DATE_LOCALE: Record<Locale, string> = {
  fr: "fr-CH",
  de: "de-CH",
  en: "en-CH",
  it: "it-CH",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  return {
    title: META[locale].title,
    description: META[locale].description,
    alternates: { canonical: `/${locale}/conditions-generales` },
  };
}

function Fr() {
  return (
    <>
      <h2>1. Champ d&rsquo;application</h2>
      <p>
        Les présentes conditions générales s&rsquo;appliquent à toute
        commande passée sur ce site pour le Pack Conformité nLPD ou
        l&rsquo;abonnement Suivi Conformité. Ces services sont réservés aux{" "}
        <strong>professionnels</strong> (entreprises, indépendants) agissant
        pour les besoins de leur activité. Ils ne sont pas destinés aux
        consommateurs au sens du droit de la consommation.
      </p>

      <h2>2. Identification du prestataire</h2>
      <p>
        &laquo;&nbsp;Thrax Legal&nbsp;&raquo; est le nom commercial sous
        lequel <strong>[Prénom NOM]</strong>, indépendant(e) domicilié(e) en
        Belgique (numéro d&rsquo;entreprise BCE&nbsp;: [à compléter]),
        propose les services décrits sur ce site. Contact&nbsp;:{" "}
        <a href="mailto:hey@thrax-legal.ch">hey@thrax-legal.ch</a>.
      </p>

      <h2>3. Description et prix des services</h2>
      <ul>
        <li>
          <strong>Pack Conformité nLPD</strong> : 590 CHF, paiement unique.
          Comprend un registre des traitements, une politique de
          confidentialité, un modèle de contrat de sous-traitance (DPA), une
          procédure de gestion des violations de données et une checklist
          de mise en œuvre, adaptés aux réponses fournies par le client.
        </li>
        <li>
          <strong>Suivi Conformité</strong> : 79 CHF par mois, sans durée
          minimale d&rsquo;engagement. Comprend les mises à jour légales,
          une revue annuelle du registre des traitements et des réponses par
          email sous 48 heures ouvrées.
        </li>
      </ul>
      <p>
        Les prix sont indiqués en francs suisses (CHF). [Régime de TVA à
        confirmer avec un comptable avant mise en production&nbsp;: le
        prestataire est susceptible de bénéficier du régime belge de
        franchise de la taxe, auquel cas la TVA n&rsquo;est pas appliquée.]
      </p>

      <h2>4. Commande et paiement</h2>
      <p>
        La commande est confirmée dès réception du paiement en ligne. Le
        paiement est exigible intégralement au moment de la commande pour le
        Pack Conformité, et au début de chaque période mensuelle pour
        l&rsquo;abonnement Suivi Conformité.
      </p>

      <h2>5. Délai de livraison</h2>
      <p>
        Le Pack Conformité nLPD est livré par email sous 3 jours ouvrables à
        compter de la réception de toutes les informations nécessaires à sa
        préparation. L&rsquo;abonnement Suivi Conformité est actif
        immédiatement après la commande.
      </p>

      <h2>6. Annulation et remboursement</h2>
      <p>
        Le client peut demander l&rsquo;annulation et le remboursement
        intégral de sa commande de Pack Conformité tant que la production
        des documents n&rsquo;a pas débuté. Une fois les documents livrés,
        la commande est considérée comme exécutée et n&rsquo;est plus
        remboursable, sauf non-conformité manifeste aux prestations décrites
        à l&rsquo;article 3.
      </p>
      <p>
        L&rsquo;abonnement Suivi Conformité peut être résilié à tout moment,
        avec effet à la fin de la période mensuelle déjà payée. Les mois
        déjà facturés ne sont pas remboursés au prorata.
      </p>

      <h2>7. Responsabilité</h2>
      <p>
        Thrax Legal n&rsquo;est pas un cabinet d&rsquo;avocats et
        n&rsquo;assure pas la représentation devant les tribunaux. Les
        documents fournis sont préparés à partir des informations
        communiquées par le client&nbsp;; leur exactitude et leur
        exhaustivité relèvent de la responsabilité du client. La
        responsabilité du prestataire, tous préjudices confondus, est
        limitée au montant effectivement payé par le client pour le service
        concerné, sauf faute intentionnelle ou négligence grave.
      </p>

      <h2>8. Propriété des documents livrés</h2>
      <p>
        Les documents livrés dans le cadre du Pack Conformité et du Suivi
        Conformité peuvent être utilisés librement par le client pour les
        besoins de son entreprise. Ils ne peuvent être revendus ou
        redistribués à des tiers en tant que modèles commerciaux.
      </p>

      <h2>9. Protection des données</h2>
      <p>
        Le traitement des données personnelles dans le cadre de ces
        services est décrit dans notre{" "}
        <NextLink href="/fr/confidentialite">politique de confidentialité</NextLink>.
      </p>

      <h2>10. Force majeure</h2>
      <p>
        Le prestataire ne peut être tenu responsable d&rsquo;un retard ou
        d&rsquo;une inexécution résultant d&rsquo;un événement échappant à
        son contrôle raisonnable.
      </p>

      <h2>11. Droit applicable et for juridique</h2>
      <p>
        Les présentes conditions sont soumises au droit belge. Tout litige
        relatif à leur interprétation ou leur exécution relève de la
        compétence exclusive des tribunaux du domicile du prestataire.{" "}
        [Ce choix par défaut peut être révisé avec un juriste selon
        l&rsquo;évolution de l&rsquo;activité.]
      </p>

      <h2>12. Modification des présentes conditions</h2>
      <p>
        Ces conditions peuvent être mises à jour ; la date de dernière mise
        à jour figure en haut de cette page. Les commandes déjà passées
        restent régies par la version en vigueur au moment de la commande.
      </p>
    </>
  );
}

function De() {
  return (
    <>
      <h2>1. Geltungsbereich</h2>
      <p>
        Diese allgemeinen Geschäftsbedingungen gelten für jede Bestellung
        des DSG-Compliance-Pakets oder des Compliance-Abos auf dieser
        Website. Diese Leistungen richten sich ausschliesslich an{" "}
        <strong>Unternehmen und Selbstständige</strong>, die im Rahmen ihrer
        geschäftlichen Tätigkeit handeln. Sie sind nicht für Konsumentinnen
        und Konsumenten im Sinne des Konsumentenschutzrechts bestimmt.
      </p>

      <h2>2. Angaben zum Anbieter</h2>
      <p>
        &laquo;&nbsp;Thrax Legal&nbsp;&raquo; ist der Handelsname, unter dem{" "}
        <strong>[Vorname NAME]</strong>, selbstständig erwerbstätig mit
        Wohnsitz in Belgien (Unternehmensnummer BCE&nbsp;: [noch zu
        ergänzen]), die auf dieser Website beschriebenen Leistungen
        anbietet. Kontakt&nbsp;:{" "}
        <a href="mailto:hey@thrax-legal.ch">hey@thrax-legal.ch</a>.
      </p>

      <h2>3. Beschreibung und Preise der Leistungen</h2>
      <ul>
        <li>
          <strong>DSG-Compliance-Paket</strong>: CHF 590, einmalige Zahlung.
          Umfasst ein Verarbeitungsverzeichnis, eine Datenschutzerklärung,
          eine Vorlage für einen Auftragsverarbeitungsvertrag (AVV), ein
          Verfahren für Datenschutzverletzungen sowie eine
          Umsetzungs-Checkliste, angepasst an die vom Kunden gemachten
          Angaben.
        </li>
        <li>
          <strong>Compliance-Abo</strong>: CHF 79 pro Monat, ohne
          Mindestvertragsdauer. Umfasst gesetzliche Updates, eine jährliche
          Überprüfung des Verarbeitungsverzeichnisses und Antworten per
          E-Mail innert 48 Arbeitsstunden.
        </li>
      </ul>
      <p>
        Die Preise verstehen sich in Schweizer Franken (CHF). [MWST-Regime
        vor Inbetriebnahme mit einem Buchhalter zu bestätigen: der Anbieter
        könnte von der belgischen Kleinunternehmerregelung profitieren,
        wonach keine MWST erhoben wird.]
      </p>

      <h2>4. Bestellung und Zahlung</h2>
      <p>
        Die Bestellung ist mit Eingang der Online-Zahlung bestätigt. Die
        Zahlung ist beim DSG-Compliance-Paket vollständig bei der Bestellung
        fällig, beim Compliance-Abo zu Beginn jeder Monatsperiode.
      </p>

      <h2>5. Lieferfrist</h2>
      <p>
        Das DSG-Compliance-Paket wird innert 3 Arbeitstagen nach Eingang
        aller für die Erstellung nötigen Angaben per E-Mail geliefert. Das
        Compliance-Abo ist sofort nach der Bestellung aktiv.
      </p>

      <h2>6. Stornierung und Rückerstattung</h2>
      <p>
        Der Kunde kann die vollständige Stornierung und Rückerstattung
        seiner Bestellung des Compliance-Pakets verlangen, solange die
        Erstellung der Dokumente noch nicht begonnen hat. Nach Lieferung der
        Dokumente gilt die Bestellung als erfüllt und ist nicht mehr
        rückerstattungsfähig, ausser bei offensichtlicher Nichteinhaltung
        der in Artikel 3 beschriebenen Leistungen.
      </p>
      <p>
        Das Compliance-Abo kann jederzeit gekündigt werden, mit Wirkung zum
        Ende der bereits bezahlten Monatsperiode. Bereits verrechnete Monate
        werden nicht anteilig zurückerstattet.
      </p>

      <h2>7. Haftung</h2>
      <p>
        Thrax Legal ist keine Anwaltskanzlei und übernimmt keine Vertretung
        vor Gericht. Die gelieferten Dokumente werden anhand der vom Kunden
        mitgeteilten Angaben erstellt; für deren Richtigkeit und
        Vollständigkeit ist der Kunde verantwortlich. Die Haftung des
        Anbieters ist, für sämtliche Schäden zusammen, auf den vom Kunden
        tatsächlich bezahlten Betrag für die betreffende Leistung
        beschränkt, ausser bei Vorsatz oder grober Fahrlässigkeit.
      </p>

      <h2>8. Eigentum an den gelieferten Dokumenten</h2>
      <p>
        Die im Rahmen des Compliance-Pakets und des Compliance-Abos
        gelieferten Dokumente dürfen vom Kunden für die Bedürfnisse seines
        Unternehmens frei verwendet werden. Sie dürfen nicht als
        kommerzielle Vorlagen an Dritte weiterverkauft oder weitergegeben
        werden.
      </p>

      <h2>9. Datenschutz</h2>
      <p>
        Die Bearbeitung der Personendaten im Rahmen dieser Leistungen ist in
        unserer <NextLink href="/de/confidentialite">Datenschutzerklärung</NextLink>{" "}
        beschrieben.
      </p>

      <h2>10. Höhere Gewalt</h2>
      <p>
        Der Anbieter haftet nicht für eine Verzögerung oder Nichterfüllung,
        die auf ein Ereignis ausserhalb seiner zumutbaren Kontrolle
        zurückzuführen ist.
      </p>

      <h2>11. Anwendbares Recht und Gerichtsstand</h2>
      <p>
        Diese Bedingungen unterstehen belgischem Recht. Für Streitigkeiten
        über deren Auslegung oder Erfüllung sind ausschliesslich die
        Gerichte am Wohnsitz des Anbieters zuständig. [Diese
        Standardwahl kann bei Bedarf mit einer Juristin oder einem Juristen
        überprüft werden, je nach Entwicklung der Tätigkeit.]
      </p>

      <h2>12. Änderung dieser Bedingungen</h2>
      <p>
        Diese Bedingungen können aktualisiert werden; das Datum der letzten
        Aktualisierung steht oben auf dieser Seite. Bereits erfolgte
        Bestellungen unterliegen weiterhin der zum Bestellzeitpunkt
        geltenden Fassung.
      </p>
    </>
  );
}

function En() {
  return (
    <>
      <h2>1. Scope</h2>
      <p>
        These terms and conditions apply to any order placed on this site
        for the FADP Compliance Pack or the Ongoing Compliance subscription.
        These services are reserved for <strong>businesses and
        self-employed professionals</strong> acting for the purposes of
        their business activity. They are not intended for consumers within
        the meaning of consumer protection law.
      </p>

      <h2>2. Provider identification</h2>
      <p>
        &ldquo;Thrax Legal&rdquo; is the trading name under which{" "}
        <strong>[First name LAST NAME]</strong>, a self-employed individual
        resident in Belgium (business number BCE: [to be added]), provides
        the services described on this site. Contact:{" "}
        <a href="mailto:hey@thrax-legal.ch">hey@thrax-legal.ch</a>.
      </p>

      <h2>3. Description and price of services</h2>
      <ul>
        <li>
          <strong>FADP Compliance Pack</strong>: CHF 590, one-time payment.
          Includes a record of processing activities, a privacy policy, a
          data processing agreement (DPA) template, a data breach procedure
          and an implementation checklist, tailored to the answers provided
          by the customer.
        </li>
        <li>
          <strong>Ongoing Compliance</strong>: CHF 79 per month, no minimum
          commitment. Includes legal updates, an annual review of the record
          of processing activities and answers by email within 48 business
          hours.
        </li>
      </ul>
      <p>
        Prices are stated in Swiss francs (CHF). [VAT treatment to be
        confirmed with an accountant before going live: the provider may be
        eligible for the Belgian small-business VAT exemption, in which case
        no VAT is charged.]
      </p>

      <h2>4. Order and payment</h2>
      <p>
        The order is confirmed once online payment is received. Payment is
        due in full at the time of order for the Compliance Pack, and at
        the start of each monthly period for the Ongoing Compliance
        subscription.
      </p>

      <h2>5. Delivery time</h2>
      <p>
        The FADP Compliance Pack is delivered by email within 3 business
        days of receiving all the information needed to prepare it. The
        Ongoing Compliance subscription is active immediately after
        ordering.
      </p>

      <h2>6. Cancellation and refunds</h2>
      <p>
        The customer may request cancellation and a full refund of a
        Compliance Pack order as long as document production has not yet
        started. Once the documents have been delivered, the order is
        considered fulfilled and is no longer refundable, except in case of
        a clear failure to meet the services described in Section 3.
      </p>
      <p>
        The Ongoing Compliance subscription can be cancelled at any time,
        effective at the end of the monthly period already paid for. Months
        already billed are not refunded on a pro-rata basis.
      </p>

      <h2>7. Liability</h2>
      <p>
        Thrax Legal is not a law firm and does not represent clients before
        courts. Documents are prepared based on the information provided by
        the customer; the accuracy and completeness of that information is
        the customer&rsquo;s responsibility. The provider&rsquo;s liability,
        for all damages combined, is limited to the amount actually paid by
        the customer for the relevant service, except in cases of intent or
        gross negligence.
      </p>

      <h2>8. Ownership of delivered documents</h2>
      <p>
        Documents delivered as part of the Compliance Pack and Ongoing
        Compliance may be used freely by the customer for the needs of
        their own business. They may not be resold or redistributed to
        third parties as commercial templates.
      </p>

      <h2>9. Data protection</h2>
      <p>
        The processing of personal data in connection with these services
        is described in our{" "}
        <NextLink href="/en/confidentialite">privacy policy</NextLink>.
      </p>

      <h2>10. Force majeure</h2>
      <p>
        The provider cannot be held liable for a delay or failure to
        perform resulting from an event beyond its reasonable control.
      </p>

      <h2>11. Governing law and jurisdiction</h2>
      <p>
        These terms are governed by Belgian law. Any dispute regarding
        their interpretation or performance falls under the exclusive
        jurisdiction of the courts of the provider&rsquo;s place of
        residence. [This default choice can be revisited with a lawyer as
        the business grows.]
      </p>

      <h2>12. Changes to these terms</h2>
      <p>
        These terms may be updated; the date of the last update appears at
        the top of this page. Orders already placed remain governed by the
        version in effect at the time of the order.
      </p>
    </>
  );
}

function It() {
  return (
    <>
      <h2>1. Ambito di applicazione</h2>
      <p>
        Le presenti condizioni generali si applicano a qualsiasi ordine
        effettuato su questo sito per il Pack Conformità nLPD o
        l&rsquo;Abbonamento Conformità. Questi servizi sono riservati ai{" "}
        <strong>professionisti</strong> (aziende, lavoratori autonomi) che
        agiscono per le esigenze della propria attività. Non sono destinati
        ai consumatori ai sensi del diritto dei consumatori.
      </p>

      <h2>2. Identificazione del fornitore</h2>
      <p>
        &laquo;&nbsp;Thrax Legal&nbsp;&raquo; è il nome commerciale sotto il
        quale <strong>[Nome COGNOME]</strong>, lavoratore/lavoratrice
        autonomo/a domiciliato/a in Belgio (numero d&rsquo;impresa
        BCE&nbsp;: [da completare]), offre i servizi descritti su questo
        sito. Contatto&nbsp;:{" "}
        <a href="mailto:hey@thrax-legal.ch">hey@thrax-legal.ch</a>.
      </p>

      <h2>3. Descrizione e prezzi dei servizi</h2>
      <ul>
        <li>
          <strong>Pack Conformità nLPD</strong>: CHF 590, pagamento unico.
          Comprende un registro dei trattamenti, un&rsquo;informativa sulla
          privacy, un modello di contratto di sub-trattamento (DPA), una
          procedura di gestione delle violazioni dei dati e una checklist
          di attuazione, adattati alle risposte fornite dal cliente.
        </li>
        <li>
          <strong>Abbonamento Conformità</strong>: CHF 79 al mese, senza
          durata minima di impegno. Comprende gli aggiornamenti legali, una
          revisione annuale del registro dei trattamenti e risposte via
          email entro 48 ore lavorative.
        </li>
      </ul>
      <p>
        I prezzi sono indicati in franchi svizzeri (CHF). [Regime IVA da
        confermare con un commercialista prima della messa in produzione:
        il fornitore potrebbe beneficiare del regime belga di franchigia
        IVA per le piccole imprese, nel qual caso l&rsquo;IVA non viene
        applicata.]
      </p>

      <h2>4. Ordine e pagamento</h2>
      <p>
        L&rsquo;ordine è confermato al ricevimento del pagamento online. Il
        pagamento è dovuto integralmente al momento dell&rsquo;ordine per il
        Pack Conformità, e all&rsquo;inizio di ogni periodo mensile per
        l&rsquo;Abbonamento Conformità.
      </p>

      <h2>5. Tempi di consegna</h2>
      <p>
        Il Pack Conformità nLPD viene consegnato via email entro 3 giorni
        lavorativi dal ricevimento di tutte le informazioni necessarie alla
        sua preparazione. L&rsquo;Abbonamento Conformità è attivo
        immediatamente dopo l&rsquo;ordine.
      </p>

      <h2>6. Annullamento e rimborso</h2>
      <p>
        Il cliente può richiedere l&rsquo;annullamento e il rimborso
        integrale del proprio ordine del Pack Conformità finché la
        produzione dei documenti non è ancora iniziata. Una volta consegnati
        i documenti, l&rsquo;ordine è considerato eseguito e non è più
        rimborsabile, salvo evidente non conformità alle prestazioni
        descritte all&rsquo;articolo 3.
      </p>
      <p>
        L&rsquo;Abbonamento Conformità può essere disdetto in qualsiasi
        momento, con effetto alla fine del periodo mensile già pagato. I
        mesi già fatturati non sono rimborsati proporzionalmente.
      </p>

      <h2>7. Responsabilità</h2>
      <p>
        Thrax Legal non è uno studio legale e non garantisce la
        rappresentanza davanti ai tribunali. I documenti forniti sono
        preparati sulla base delle informazioni comunicate dal cliente; la
        loro esattezza e completezza sono di responsabilità del cliente. La
        responsabilità del fornitore, per tutti i danni complessivamente, è
        limitata all&rsquo;importo effettivamente pagato dal cliente per il
        servizio interessato, salvo dolo o colpa grave.
      </p>

      <h2>8. Proprietà dei documenti consegnati</h2>
      <p>
        I documenti consegnati nell&rsquo;ambito del Pack Conformità e
        dell&rsquo;Abbonamento Conformità possono essere utilizzati
        liberamente dal cliente per le esigenze della propria attività. Non
        possono essere rivenduti o ridistribuiti a terzi come modelli
        commerciali.
      </p>

      <h2>9. Protezione dei dati</h2>
      <p>
        Il trattamento dei dati personali nell&rsquo;ambito di questi
        servizi è descritto nella nostra{" "}
        <NextLink href="/it/confidentialite">informativa sulla privacy</NextLink>.
      </p>

      <h2>10. Forza maggiore</h2>
      <p>
        Il fornitore non può essere ritenuto responsabile di un ritardo o
        di un&rsquo;inadempienza derivante da un evento al di fuori del suo
        ragionevole controllo.
      </p>

      <h2>11. Legge applicabile e foro competente</h2>
      <p>
        Le presenti condizioni sono soggette al diritto belga. Qualsiasi
        controversia relativa alla loro interpretazione o esecuzione rientra
        nella competenza esclusiva dei tribunali del domicilio del
        fornitore. [Questa scelta predefinita può essere rivista con un
        giurista in base all&rsquo;evoluzione dell&rsquo;attività.]
      </p>

      <h2>12. Modifica delle presenti condizioni</h2>
      <p>
        Queste condizioni possono essere aggiornate; la data
        dell&rsquo;ultimo aggiornamento figura in cima a questa pagina. Gli
        ordini già effettuati restano disciplinati dalla versione in vigore
        al momento dell&rsquo;ordine.
      </p>
    </>
  );
}

const COMPONENTS: Record<Locale, () => ReactNode> = { fr: Fr, de: De, en: En, it: It };

export default async function ConditionsGeneralesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const Body = COMPONENTS[locale];

  return (
    <>
      <Nav />
      <main className="bg-bg text-text">
        <section className="theme-light border-b border-border bg-bg pb-16 pt-32 md:pt-40">
          <Container className="mx-auto max-w-2xl">
            <Reveal>
              <h1 className="text-[2rem] font-semibold leading-[1.15] tracking-[-0.02em] text-text sm:text-[2.5rem]">
                {HEADING[locale]}
              </h1>
              <p className="mt-4 text-xs text-text-muted">
                {UPDATED_LABEL[locale]}{" "}
                {new Date(LAST_UPDATED).toLocaleDateString(DATE_LOCALE[locale], {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </Reveal>
          </Container>
        </section>

        <section className="theme-light bg-bg py-12 md:py-16">
          <Container className="mx-auto max-w-2xl">
            <Reveal>
              <div className="article-body">
                <Body />
              </div>
            </Reveal>
          </Container>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
