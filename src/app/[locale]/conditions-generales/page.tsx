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
      "Conditions générales applicables au Pack Contestation d'amende de Thrax Legal.",
  },
  de: {
    title: "Allgemeine Geschäftsbedingungen | Thrax Legal",
    description:
      "Allgemeine Geschäftsbedingungen für das Bussen-Einspruchspaket von Thrax Legal.",
  },
  en: {
    title: "Terms & Conditions | Thrax Legal",
    description:
      "Terms and conditions applicable to Thrax Legal's Fine Contestation Pack.",
  },
  it: {
    title: "Termini e condizioni | Thrax Legal",
    description:
      "Termini e condizioni applicabili al Pack Contestazione Multa di Thrax Legal.",
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
        commande passée sur ce site pour le Pack Contestation d&rsquo;amende.
        Ce service est ouvert aux particuliers comme aux professionnels
        résidant ou immatriculés en Suisse ou concernés par une amende
        émise en Suisse.
      </p>

      <h2>2. Identification du prestataire</h2>
      <p>
        &laquo;&nbsp;Thrax Legal&nbsp;&raquo; est le nom commercial sous
        lequel <strong>[Prénom NOM]</strong>, indépendant(e) domicilié(e) en
        Belgique (numéro d&rsquo;entreprise BCE&nbsp;: [à compléter]),
        propose les services décrits sur ce site. Contact&nbsp;:{" "}
        <a href="mailto:hey@thrax-legal.ch">hey@thrax-legal.ch</a>.
      </p>

      <h2>3. Description et prix du service</h2>
      <p>
        <strong>Pack Contestation</strong> : 89 CHF, paiement unique.
        Comprend une analyse de vos chances de contester l&rsquo;amende
        décrite dans le diagnostic, une lettre de contestation ou
        d&rsquo;opposition prête à envoyer, l&rsquo;autorité compétente et le
        délai exact à respecter, ainsi qu&rsquo;une vérification par notre
        équipe avant livraison. Le service est fondé sur les informations et
        documents fournis par le client&nbsp;; il ne constitue ni un conseil
        juridique personnalisé, ni une garantie de succès de la contestation.
      </p>
      <p>
        Les prix sont indiqués en francs suisses (CHF). [Régime de TVA à
        confirmer avec un comptable avant mise en production&nbsp;: le
        prestataire est susceptible de bénéficier du régime belge de
        franchise de la taxe, auquel cas la TVA n&rsquo;est pas appliquée.]
      </p>

      <h2>4. Commande et paiement</h2>
      <p>
        La commande est confirmée dès réception du paiement en ligne. Le
        paiement est exigible intégralement au moment de la commande.
      </p>

      <h2>5. Délai de livraison</h2>
      <p>
        Le Pack Contestation est livré par email sous 48 heures à compter de
        la réception de toutes les informations et documents nécessaires à
        sa préparation (avis d&rsquo;amende, éléments de preuve éventuels).
        Compte tenu des délais légaux souvent courts pour contester une
        amende, le client est invité à passer commande le plus rapidement
        possible après réception de l&rsquo;amende.
      </p>

      <h2>6. Annulation et remboursement</h2>
      <p>
        Le client peut demander l&rsquo;annulation et le remboursement
        intégral de sa commande tant que la préparation de la lettre de
        contestation n&rsquo;a pas débuté. Une fois le document livré, la
        commande est considérée comme exécutée et n&rsquo;est plus
        remboursable, sauf non-conformité manifeste à la prestation décrite
        à l&rsquo;article 3.
      </p>
      <p>
        Si le diagnostic préalable indique que l&rsquo;amende n&rsquo;est
        manifestement pas contestable (notamment en cas de paiement déjà
        effectué), la commande n&rsquo;est pas acceptée et aucun paiement
        n&rsquo;est prélevé.
      </p>

      <h2>7. Responsabilité</h2>
      <p>
        Thrax Legal n&rsquo;est pas un cabinet d&rsquo;avocats et
        n&rsquo;assure pas la représentation devant les tribunaux ou les
        autorités administratives, réservée aux avocats inscrits à un
        registre cantonal suisse. La lettre de contestation est préparée à
        partir des informations et documents communiqués par le
        client&nbsp;; leur exactitude et leur exhaustivité relèvent de la
        responsabilité du client. Thrax Legal ne garantit pas l&rsquo;issue
        de la contestation, qui dépend de l&rsquo;appréciation de
        l&rsquo;autorité compétente. La responsabilité du prestataire, tous
        préjudices confondus, est limitée au montant effectivement payé par
        le client, sauf faute intentionnelle ou négligence grave.
      </p>
      <p>
        Lorsque le dossier présente une gravité ou une complexité
        particulière (notamment risque de retrait de permis de longue durée
        ou procédure pénale), Thrax Legal peut recommander au client de
        consulter un avocat inscrit à un barreau suisse plutôt que de
        poursuivre avec le Pack Contestation.
      </p>

      <h2>8. Propriété du document livré</h2>
      <p>
        Le document livré dans le cadre du Pack Contestation peut être
        utilisé librement par le client pour les besoins de sa propre
        contestation. Il ne peut être revendu ou redistribué à des tiers en
        tant que modèle commercial.
      </p>

      <h2>9. Protection des données</h2>
      <p>
        Le traitement des données personnelles dans le cadre de ce service
        est décrit dans notre{" "}
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
        des Einspruchspakets auf dieser Website. Dieses Angebot richtet
        sich an Privatpersonen und Unternehmen, die in der Schweiz wohnhaft
        bzw. eingetragen sind oder von einer in der Schweiz ausgestellten
        Busse betroffen sind.
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

      <h2>3. Beschreibung und Preis der Leistung</h2>
      <p>
        <strong>Einspruchspaket</strong>: CHF 89, einmalige Zahlung. Umfasst
        eine Beurteilung Ihrer Chancen, die im Diagnosetool beschriebene
        Busse anzufechten, ein versandfertiges Einspruchs- bzw.
        Beschwerdeschreiben, die zuständige Behörde und die genaue
        einzuhaltende Frist sowie eine Prüfung durch unser Team vor
        Lieferung. Die Leistung basiert auf den vom Kunden bereitgestellten
        Angaben und Unterlagen; sie stellt keine individuelle
        Rechtsberatung dar und ist keine Erfolgsgarantie für den Einspruch.
      </p>
      <p>
        Die Preise verstehen sich in Schweizer Franken (CHF). [MWST-Regime
        vor Inbetriebnahme mit einem Buchhalter zu bestätigen: der Anbieter
        könnte von der belgischen Kleinunternehmerregelung profitieren,
        wonach keine MWST erhoben wird.]
      </p>

      <h2>4. Bestellung und Zahlung</h2>
      <p>
        Die Bestellung ist mit Eingang der Online-Zahlung bestätigt. Die
        Zahlung ist vollständig bei der Bestellung fällig.
      </p>

      <h2>5. Lieferfrist</h2>
      <p>
        Das Einspruchspaket wird innert 48 Stunden nach Eingang aller für die
        Erstellung nötigen Angaben und Unterlagen (Bussenverfügung,
        allfällige Beweismittel) per E-Mail geliefert. Angesichts der oft
        kurzen gesetzlichen Frist für einen Einspruch wird der Kunde
        gebeten, so rasch wie möglich nach Erhalt der Busse zu bestellen.
      </p>

      <h2>6. Stornierung und Rückerstattung</h2>
      <p>
        Der Kunde kann die vollständige Stornierung und Rückerstattung
        seiner Bestellung verlangen, solange die Erstellung des
        Einspruchsschreibens noch nicht begonnen hat. Nach Lieferung des
        Dokuments gilt die Bestellung als erfüllt und ist nicht mehr
        rückerstattungsfähig, ausser bei offensichtlicher Nichteinhaltung
        der in Artikel 3 beschriebenen Leistung.
      </p>
      <p>
        Ergibt die vorgängige Diagnose, dass die Busse offensichtlich nicht
        anfechtbar ist (insbesondere wenn sie bereits bezahlt wurde), wird
        die Bestellung nicht angenommen und keine Zahlung erhoben.
      </p>

      <h2>7. Haftung</h2>
      <p>
        Thrax Legal ist keine Anwaltskanzlei und übernimmt keine Vertretung
        vor Gericht oder Verwaltungsbehörden, die ausschliesslich im
        kantonalen Anwaltsregister eingetragenen Anwältinnen und Anwälten
        vorbehalten ist. Das Einspruchsschreiben wird anhand der vom Kunden
        mitgeteilten Angaben und Unterlagen erstellt; für deren Richtigkeit
        und Vollständigkeit ist der Kunde verantwortlich. Thrax Legal
        garantiert nicht den Ausgang des Einspruchs, der von der Beurteilung
        der zuständigen Behörde abhängt. Die Haftung des Anbieters ist, für
        sämtliche Schäden zusammen, auf den vom Kunden tatsächlich bezahlten
        Betrag beschränkt, ausser bei Vorsatz oder grober Fahrlässigkeit.
      </p>
      <p>
        Bei besonders schwerwiegenden oder komplexen Fällen (insbesondere
        bei Risiko eines längeren Führerausweisentzugs oder eines
        Strafverfahrens) kann Thrax Legal dem Kunden empfehlen, eine im
        Anwaltsregister eingetragene Anwältin oder einen Anwalt zu
        konsultieren, statt das Einspruchspaket fortzusetzen.
      </p>

      <h2>8. Eigentum am gelieferten Dokument</h2>
      <p>
        Das im Rahmen des Einspruchspakets gelieferte Dokument darf vom
        Kunden für die Zwecke seines eigenen Einspruchs frei verwendet
        werden. Es darf nicht als kommerzielle Vorlage an Dritte
        weiterverkauft oder weitergegeben werden.
      </p>

      <h2>9. Datenschutz</h2>
      <p>
        Die Bearbeitung der Personendaten im Rahmen dieser Leistung ist in
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
        for the Fine Contestation Pack. This service is open to individuals
        and businesses residing or registered in Switzerland, or otherwise
        affected by a fine issued in Switzerland.
      </p>

      <h2>2. Provider identification</h2>
      <p>
        &ldquo;Thrax Legal&rdquo; is the trading name under which{" "}
        <strong>[First name LAST NAME]</strong>, a self-employed individual
        resident in Belgium (business number BCE: [to be added]), provides
        the services described on this site. Contact:{" "}
        <a href="mailto:hey@thrax-legal.ch">hey@thrax-legal.ch</a>.
      </p>

      <h2>3. Description and price of the service</h2>
      <p>
        <strong>Contestation Pack</strong>: CHF 89, one-time payment.
        Includes an assessment of your chances of contesting the fine
        described in the diagnostic tool, a ready-to-send objection or
        appeal letter, the competent authority and the exact deadline to
        respect, and a review by our team before delivery. The service is
        based on the information and documents provided by the customer; it
        does not constitute individualized legal advice and is not a
        guarantee of a successful contestation.
      </p>
      <p>
        Prices are stated in Swiss francs (CHF). [VAT treatment to be
        confirmed with an accountant before going live: the provider may be
        eligible for the Belgian small-business VAT exemption, in which case
        no VAT is charged.]
      </p>

      <h2>4. Order and payment</h2>
      <p>
        The order is confirmed once online payment is received. Payment is
        due in full at the time of order.
      </p>

      <h2>5. Delivery time</h2>
      <p>
        The Contestation Pack is delivered by email within 48 hours of
        receiving all the information and documents needed to prepare it
        (fine notice, any supporting evidence). Given how short the legal
        deadline to contest a fine often is, customers are encouraged to
        order as soon as possible after receiving the fine.
      </p>

      <h2>6. Cancellation and refunds</h2>
      <p>
        The customer may request cancellation and a full refund of an order
        as long as preparation of the contestation letter has not yet
        started. Once the document has been delivered, the order is
        considered fulfilled and is no longer refundable, except in case of
        a clear failure to meet the service described in Section 3.
      </p>
      <p>
        If the prior diagnostic shows that the fine is clearly not
        contestable (in particular where it has already been paid), the
        order is not accepted and no payment is charged.
      </p>

      <h2>7. Liability</h2>
      <p>
        Thrax Legal is not a law firm and does not represent clients before
        courts or administrative authorities, which is reserved to
        attorneys registered with a Swiss cantonal bar. The contestation
        letter is prepared based on the information and documents provided
        by the customer; the accuracy and completeness of that information
        is the customer&rsquo;s responsibility. Thrax Legal does not
        guarantee the outcome of the contestation, which depends on the
        assessment of the competent authority. The provider&rsquo;s
        liability, for all damages combined, is limited to the amount
        actually paid by the customer, except in cases of intent or gross
        negligence.
      </p>
      <p>
        Where a case is particularly serious or complex (in particular a
        risk of a long-term licence withdrawal or criminal proceedings),
        Thrax Legal may recommend that the customer consult an attorney
        registered with a Swiss bar instead of proceeding with the
        Contestation Pack.
      </p>

      <h2>8. Ownership of the delivered document</h2>
      <p>
        The document delivered as part of the Contestation Pack may be used
        freely by the customer for the needs of their own contestation. It
        may not be resold or redistributed to third parties as a commercial
        template.
      </p>

      <h2>9. Data protection</h2>
      <p>
        The processing of personal data in connection with this service is
        described in our{" "}
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
        effettuato su questo sito per il Pack Contestazione Multa. Questo
        servizio è aperto a privati e professionisti residenti o registrati
        in Svizzera, o comunque interessati da una multa emessa in Svizzera.
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

      <h2>3. Descrizione e prezzo del servizio</h2>
      <p>
        <strong>Pack Contestazione</strong>: CHF 89, pagamento unico.
        Comprende una valutazione delle vostre possibilità di contestare la
        multa descritta nello strumento di diagnosi, una lettera di
        contestazione o opposizione pronta per l&rsquo;invio,
        l&rsquo;autorità competente e il termine esatto da rispettare,
        nonché una verifica da parte del nostro team prima della consegna.
        Il servizio si basa sulle informazioni e sui documenti forniti dal
        cliente; non costituisce una consulenza legale personalizzata né una
        garanzia di successo della contestazione.
      </p>
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
        pagamento è dovuto integralmente al momento dell&rsquo;ordine.
      </p>

      <h2>5. Tempi di consegna</h2>
      <p>
        Il Pack Contestazione viene consegnato via email entro 48 ore dal
        ricevimento di tutte le informazioni e dei documenti necessari alla
        sua preparazione (avviso di multa, eventuali prove). Considerati i
        termini legali spesso brevi per contestare una multa, il cliente è
        invitato a ordinare il più rapidamente possibile dopo il
        ricevimento della multa.
      </p>

      <h2>6. Annullamento e rimborso</h2>
      <p>
        Il cliente può richiedere l&rsquo;annullamento e il rimborso
        integrale del proprio ordine finché la preparazione della lettera
        di contestazione non è ancora iniziata. Una volta consegnato il
        documento, l&rsquo;ordine è considerato eseguito e non è più
        rimborsabile, salvo evidente non conformità alla prestazione
        descritta all&rsquo;articolo 3.
      </p>
      <p>
        Se la diagnosi preliminare indica che la multa non è manifestamente
        contestabile (in particolare in caso di pagamento già effettuato),
        l&rsquo;ordine non viene accettato e non viene effettuato alcun
        pagamento.
      </p>

      <h2>7. Responsabilità</h2>
      <p>
        Thrax Legal non è uno studio legale e non garantisce la
        rappresentanza davanti ai tribunali o alle autorità amministrative,
        riservata agli avvocati iscritti a un albo cantonale svizzero. La
        lettera di contestazione è preparata sulla base delle informazioni
        e dei documenti comunicati dal cliente; la loro esattezza e
        completezza sono di responsabilità del cliente. Thrax Legal non
        garantisce l&rsquo;esito della contestazione, che dipende dalla
        valutazione dell&rsquo;autorità competente. La responsabilità del
        fornitore, per tutti i danni complessivamente, è limitata
        all&rsquo;importo effettivamente pagato dal cliente, salvo dolo o
        colpa grave.
      </p>
      <p>
        Nei casi particolarmente gravi o complessi (in particolare rischio
        di un ritiro prolungato della licenza di condurre o di un
        procedimento penale), Thrax Legal può raccomandare al cliente di
        consultare un avvocato iscritto a un albo svizzero invece di
        proseguire con il Pack Contestazione.
      </p>

      <h2>8. Proprietà del documento consegnato</h2>
      <p>
        Il documento consegnato nell&rsquo;ambito del Pack Contestazione
        può essere utilizzato liberamente dal cliente per le esigenze della
        propria contestazione. Non può essere rivenduto o ridistribuito a
        terzi come modello commerciale.
      </p>

      <h2>9. Protezione dei dati</h2>
      <p>
        Il trattamento dei dati personali nell&rsquo;ambito di questo
        servizio è descritto nella nostra{" "}
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
