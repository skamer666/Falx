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
// juriste si besoin), voir la section correspondante dans chaque langue.
const LAST_UPDATED = "2026-09-29";

const META: Record<Locale, { title: string; description: string }> = {
  fr: {
    title: "Conditions générales de vente | Thrax Legal",
    description:
      "Conditions générales applicables à l'abonnement juridique PME de Thrax Legal.",
  },
  de: {
    title: "Allgemeine Geschäftsbedingungen | Thrax Legal",
    description:
      "Allgemeine Geschäftsbedingungen für das KMU-Rechtsabo von Thrax Legal.",
  },
  en: {
    title: "Terms & Conditions | Thrax Legal",
    description:
      "Terms and conditions applicable to Thrax Legal's SME legal subscription.",
  },
  it: {
    title: "Termini e condizioni | Thrax Legal",
    description:
      "Termini e condizioni applicabili all'abbonamento legale per PMI di Thrax Legal.",
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
        Les présentes conditions générales s&rsquo;appliquent à tout
        abonnement souscrit sur ce site. Ce service est réservé aux{" "}
        <strong>indépendants et personnes morales</strong> (entreprises,
        associations) agissant pour les besoins de leur activité
        professionnelle. Il n&rsquo;est pas destiné aux consommateurs au
        sens du droit de la consommation.
      </p>

      <h2>2. Identification du prestataire</h2>
      <p>
        &laquo;&nbsp;Thrax Legal&nbsp;&raquo; est le nom commercial sous
        lequel <strong>[Prénom NOM]</strong>, indépendant(e) domicilié(e) en
        Belgique (numéro d&rsquo;entreprise BCE&nbsp;: [à compléter]),
        propose les services décrits sur ce site. Contact&nbsp;:{" "}
        <a href="mailto:hey@thrax-legal.ch">hey@thrax-legal.ch</a>.
      </p>

      <h2>3. Description et prix des formules</h2>
      <p>
        <strong>Essentiel</strong> : 149 CHF par mois. Comprend une
        messagerie illimitée pour les questions rapides (clarifications
        ponctuelles ne nécessitant pas de recherche approfondie, dans les
        limites d&rsquo;un usage raisonnable et personnel), 2 dossiers
        complets pris en charge par mois (rédaction ou relecture de
        contrat, résolution de litige, explication de démarche) traités
        sous 72 heures ouvrées, et l&rsquo;accès à la bibliothèque complète
        de modèles de documents.
      </p>
      <p>
        <strong>Croissance</strong> : 349 CHF par mois. Comprend la
        messagerie illimitée pour les questions rapides, 5 dossiers
        complets pris en charge par mois traités sous 48 heures ouvrées (24
        heures pour les urgences signalées comme telles), une révision de
        contrat prioritaire incluse chaque mois, et l&rsquo;accès à la
        bibliothèque complète de modèles.
      </p>
      <p>
        Tout dossier complet au-delà du volume inclus dans la formule
        souscrite est facturé 79 CHF, prix fixe, quelle que soit sa
        complexité. Un usage manifestement déraisonnable de la messagerie
        illimitée (volume ou fréquence incompatible avec un usage normal
        d&rsquo;une PME ou d&rsquo;un indépendant) peut être requalifié en
        dossiers complets par Thrax Legal, qui en informe le client au
        préalable. Les formules couvrent le droit des contrats commerciaux,
        le droit du travail, le droit des sociétés, le recouvrement
        amiable, la conformité nLPD et les baux commerciaux. Les opérations
        exceptionnelles (levée de fonds, contentieux devant un tribunal,
        restructuration, fusion-acquisition) ne sont pas incluses et font
        l&rsquo;objet d&rsquo;une orientation vers un avocat spécialisé.
      </p>
      <p>
        Les prix sont indiqués en francs suisses (CHF). [Régime de TVA à
        confirmer avec un comptable avant mise en production&nbsp;: le
        prestataire est susceptible de bénéficier du régime belge de
        franchise de la taxe, auquel cas la TVA n&rsquo;est pas appliquée.]
      </p>

      <p>
        Chaque dossier complet comprend un appel téléphonique ou une visioconférence de cadrage, sur rendez-vous, de 15 minutes en formule Essentiel et de 30 minutes en formule Croissance, au cours desquels le client expose sa situation de vive voix. La réponse, les conseils et les documents sont ensuite fournis par écrit. Le client peut renoncer à cet échange et décrire sa situation par écrit.
      </p>

      <h2>4. Souscription, paiement et prix bloqué</h2>
      <p>
        L&rsquo;abonnement est confirmé dès réception du premier paiement en
        ligne et se renouvelle automatiquement chaque mois par prélèvement
        du même montant, jusqu&rsquo;à résiliation par le client. Il
        n&rsquo;y a <strong>aucun engagement de durée minimale</strong>.
      </p>
      <p>
        Le prix payé par le client au moment de sa souscription reste
        inchangé tant que son abonnement demeure actif sans interruption,
        même si Thrax Legal augmente ses tarifs pour les nouveaux clients.
        Une résiliation suivie d&rsquo;une nouvelle souscription est
        considérée comme un nouvel abonnement, soumis aux tarifs en vigueur
        à ce moment-là.
      </p>

      <p>
        Le client peut demander la suspension de son abonnement pour une durée maximale de 2 mois par année civile, par simple email. Pendant la suspension, aucun paiement n&rsquo;est dû et aucun nouveau dossier n&rsquo;est pris en charge&nbsp;; le prix bloqué visé au présent article est conservé. La suspension n&rsquo;est pas une résiliation&nbsp;: l&rsquo;abonnement reprend automatiquement à la fin de la période demandée.
      </p>

      <h2>5. Délai de traitement</h2>
      <p>
        Chaque dossier complet est traité dans le délai annoncé pour la
        formule souscrite (72 heures ouvrées pour Essentiel, 48 heures
        ouvrées pour Croissance, 24 heures pour les urgences signalées en
        formule Croissance), à compter de la réception de toutes les
        informations et documents nécessaires à son traitement. Les
        questions rapides reçoivent une réponse dans un délai raisonnable,
        généralement plus court.
      </p>

      <h2>6. Résiliation et remboursement</h2>
      <p>
        Le client peut résilier son abonnement à tout moment, sans motif ni
        frais, par simple email à{" "}
        <a href="mailto:hey@thrax-legal.ch">hey@thrax-legal.ch</a>. La
        résiliation prend effet à la fin de la période mensuelle déjà
        payée&nbsp;; le mois en cours n&rsquo;est pas remboursé au prorata, sous
        réserve de la garantie satisfait ou remboursé ci-dessous.
        Le client peut également changer de formule à tout moment, avec
        effet au prochain cycle de facturation.
      </p>
      <p>
        Si un dossier précis s&rsquo;avère manifestement hors du champ
        décrit à l&rsquo;article 3 (notamment une opération exceptionnelle),
        Thrax Legal en informe le client avant tout traitement et
        l&rsquo;oriente vers un avocat plutôt que de facturer une prestation
        inadaptée.
      </p>

      <p>
        Garantie satisfait ou remboursé&nbsp;: dans les 30 jours suivant son premier paiement, le client qui souscrit un abonnement pour la première fois peut demander, par email et sans avoir à se justifier, le remboursement intégral de ce premier paiement. La demande met fin à l&rsquo;abonnement. Cette garantie ne s&rsquo;applique qu&rsquo;une fois par client et ne couvre pas les dossiers supplémentaires facturés à l&rsquo;unité.
      </p>

      <h2>7. Responsabilité</h2>
      <p>
        Thrax Legal n&rsquo;est pas un cabinet d&rsquo;avocats et
        n&rsquo;assure pas la représentation devant les tribunaux ou les
        autorités administratives, réservée aux avocats inscrits à un
        registre cantonal suisse. Les réponses écrites et les documents
        fournis sont préparés à partir des informations communiquées par le
        client&nbsp;; leur exactitude et leur exhaustivité relèvent de la
        responsabilité du client. Thrax Legal ne garantit pas
        l&rsquo;issue d&rsquo;une situation juridique, qui dépend des faits
        propres à chaque dossier et, le cas échéant, de l&rsquo;appréciation
        d&rsquo;une autorité ou d&rsquo;un tribunal. La responsabilité du
        prestataire, tous préjudices confondus, est limitée au montant
        effectivement payé par le client au cours des douze derniers mois,
        sauf faute intentionnelle ou négligence grave.
      </p>
      <p>
        Les informations générales sur le droit suisse figurant sur ce site
        (guide, foire aux questions, références légales ou
        jurisprudentielles) sont fournies à titre purement informatif, sans
        garantie d&rsquo;exhaustivité, d&rsquo;actualité ou
        d&rsquo;applicabilité à un cas particulier, et ne constituent pas un
        conseil juridique personnalisé. Thrax Legal décline toute
        responsabilité pour une décision prise sur cette seule base, sauf
        faute intentionnelle ou négligence grave de sa part.
      </p>
      <p>
        Lorsqu&rsquo;un dossier présente une gravité ou une complexité
        particulière, Thrax Legal peut recommander au client de consulter un
        avocat inscrit à un barreau suisse plutôt que de répondre dans le
        cadre de l&rsquo;abonnement.
      </p>

      <h2>8. Propriété des documents livrés</h2>
      <p>
        Les réponses écrites et documents livrés dans le cadre de
        l&rsquo;abonnement peuvent être utilisés librement par le client
        pour les besoins de sa propre activité. Ils ne peuvent être revendus
        ou redistribués à des tiers en tant que modèles commerciaux.
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
        à jour figure en haut de cette page. Les abonnements en cours
        restent régis par la version en vigueur au moment de leur
        souscription pour le cycle de facturation en cours.
      </p>
    </>
  );
}

function De() {
  return (
    <>
      <h2>1. Geltungsbereich</h2>
      <p>
        Diese allgemeinen Geschäftsbedingungen gelten für jedes auf dieser
        Website abgeschlossene Abonnement. Dieses Angebot richtet sich an{" "}
        <strong>Selbstständige und juristische Personen</strong>
        (Unternehmen, Vereine), die im Rahmen ihrer geschäftlichen Tätigkeit
        handeln. Es ist nicht für Konsumentinnen und Konsumenten im Sinne
        des Konsumentenschutzrechts bestimmt.
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

      <h2>3. Beschreibung und Preise der Formeln</h2>
      <p>
        <strong>Essentiel</strong>: CHF 149 pro Monat. Umfasst unbegrenzte
        Nachrichten für schnelle Fragen (punktuelle Klärungen ohne
        vertiefte Recherche, im Rahmen einer angemessenen und persönlichen
        Nutzung), 2 vollständige Anliegen pro Monat (Erstellung oder
        Prüfung eines Vertrags, Lösung eines Streitfalls, Erklärung eines
        Verfahrens), bearbeitet innert 72 Arbeitsstunden, sowie Zugang zur
        vollständigen Vorlagenbibliothek.
      </p>
      <p>
        <strong>Croissance</strong>: CHF 349 pro Monat. Umfasst
        unbegrenzte Nachrichten für schnelle Fragen, 5 vollständige
        Anliegen pro Monat, bearbeitet innert 48 Arbeitsstunden (24
        Stunden bei als solche gemeldeten Notfällen), eine im Preis
        inbegriffene prioritäre Vertragsprüfung pro Monat, und Zugang zur
        vollständigen Vorlagenbibliothek.
      </p>
      <p>
        Jedes vollständige Anliegen über das in der gewählten Formel
        enthaltene Volumen hinaus wird zu CHF 79, Fixpreis, unabhängig von
        seiner Komplexität, verrechnet. Eine offensichtlich unangemessene
        Nutzung der unbegrenzten Nachrichtenfunktion (Umfang oder Häufigkeit
        unvereinbar mit der normalen Nutzung durch ein KMU oder eine
        selbstständige Person) kann von Thrax Legal als vollständiges
        Anliegen umqualifiziert werden, wobei der Kunde vorgängig informiert
        wird. Die Formeln decken Handelsvertragsrecht, Arbeitsrecht,
        Gesellschaftsrecht, gütliches Inkasso, DSG-Konformität und
        Geschäftsmietverträge ab. Aussergewöhnliche Vorgänge
        (Kapitalerhöhung, Gerichtsverfahren, Restrukturierung, Fusionen und
        Übernahmen) sind nicht inbegriffen und werden an eine spezialisierte
        Anwältin oder einen Anwalt weitergeleitet.
      </p>
      <p>
        Die Preise verstehen sich in Schweizer Franken (CHF). [MWST-Regime
        vor Inbetriebnahme mit einem Buchhalter zu bestätigen: der Anbieter
        könnte von der belgischen Kleinunternehmerregelung profitieren,
        wonach keine MWST erhoben wird.]
      </p>

      <p>
        Jedes vollständige Anliegen umfasst nach Terminvereinbarung ein Telefon- oder Videogespräch zur Klärung von 15 Minuten in der Formel Essentiel und 30 Minuten in der Formel Croissance, in dem der Kunde seine Situation mündlich schildert. Antwort, Beratung und Dokumente werden anschliessend schriftlich geliefert. Der Kunde kann auf dieses Gespräch verzichten und seine Situation schriftlich schildern.
      </p>

      <h2>4. Abschluss, Zahlung und Preisbindung</h2>
      <p>
        Das Abonnement ist mit Eingang der ersten Online-Zahlung bestätigt
        und verlängert sich automatisch jeden Monat um denselben Betrag, bis
        es vom Kunden gekündigt wird. Es besteht{" "}
        <strong>keine Mindestvertragsdauer</strong>.
      </p>
      <p>
        Der vom Kunden bei Abschluss bezahlte Preis bleibt unverändert,
        solange sein Abonnement ohne Unterbruch aktiv bleibt, auch wenn
        Thrax Legal die Tarife für Neukunden erhöht. Eine Kündigung mit
        anschliessendem Neuabschluss gilt als neues Abonnement und
        unterliegt den zu diesem Zeitpunkt geltenden Tarifen.
      </p>

      <p>
        Der Kunde kann per einfacher E-Mail die Aussetzung seines Abonnements für höchstens 2 Monate pro Kalenderjahr verlangen. Während der Aussetzung ist keine Zahlung geschuldet und es werden keine neuen Anliegen bearbeitet; der in diesem Artikel genannte fixierte Preis bleibt erhalten. Die Aussetzung ist keine Kündigung: Das Abonnement läuft nach Ablauf der verlangten Frist automatisch weiter.
      </p>

      <h2>5. Bearbeitungsfrist</h2>
      <p>
        Jedes vollständige Anliegen wird innert der für die gewählte Formel
        angegebenen Frist bearbeitet (72 Arbeitsstunden bei Essentiel, 48
        Arbeitsstunden bei Croissance, 24 Stunden bei in der Formel
        Croissance gemeldeten Notfällen), ab Eingang aller für die
        Bearbeitung nötigen Angaben und Unterlagen. Schnelle Fragen erhalten
        eine Antwort innert angemessener, in der Regel kürzerer Frist.
      </p>

      <h2>6. Kündigung und Rückerstattung</h2>
      <p>
        Der Kunde kann sein Abonnement jederzeit ohne Angabe von Gründen und
        kostenlos kündigen, per einfacher E-Mail an{" "}
        <a href="mailto:hey@thrax-legal.ch">hey@thrax-legal.ch</a>. Die
        Kündigung wird zum Ende der bereits bezahlten Monatsperiode
        wirksam; der laufende Monat wird nicht anteilig zurückerstattet, vorbehaltlich der
        nachstehenden Geld-zurück-Garantie.
        Der Kunde kann auch jederzeit die Formel wechseln, wirksam ab dem
        nächsten Abrechnungszyklus.
      </p>
      <p>
        Erweist sich ein konkretes Anliegen offensichtlich als ausserhalb
        des in Artikel 3 beschriebenen Rahmens (insbesondere ein
        aussergewöhnlicher Vorgang), informiert Thrax Legal den Kunden vor
        jeder Bearbeitung und verweist ihn an eine Anwältin oder einen
        Anwalt, statt eine unpassende Leistung zu verrechnen.
      </p>

      <p>
        Geld-zurück-Garantie: Ein Kunde, der erstmals ein Abonnement abschliesst, kann innert 30 Tagen nach seiner ersten Zahlung per E-Mail und ohne Begründung die vollständige Rückerstattung dieser ersten Zahlung verlangen. Das Begehren beendet das Abonnement. Diese Garantie gilt nur einmal pro Kunde und deckt keine einzeln verrechneten zusätzlichen Anliegen.
      </p>

      <h2>7. Haftung</h2>
      <p>
        Thrax Legal ist keine Anwaltskanzlei und übernimmt keine Vertretung
        vor Gericht oder Verwaltungsbehörden, die ausschliesslich im
        kantonalen Anwaltsregister eingetragenen Anwältinnen und Anwälten
        vorbehalten ist. Die schriftlichen Antworten und gelieferten
        Dokumente werden anhand der vom Kunden mitgeteilten Angaben
        erstellt; für deren Richtigkeit und Vollständigkeit ist der Kunde
        verantwortlich. Thrax Legal garantiert nicht den Ausgang einer
        Rechtslage, der von den konkreten Umständen jedes Falls und
        gegebenenfalls von der Beurteilung einer Behörde oder eines
        Gerichts abhängt. Die Haftung des Anbieters ist, für sämtliche
        Schäden zusammen, auf den vom Kunden in den letzten zwölf Monaten
        tatsächlich bezahlten Betrag beschränkt, ausser bei Vorsatz oder
        grober Fahrlässigkeit.
      </p>
      <p>
        Die allgemeinen Informationen zum schweizerischen Recht auf dieser
        Website (Ratgeber, FAQ, gesetzliche oder gerichtliche Verweise)
        werden ausschliesslich zu Informationszwecken bereitgestellt, ohne
        Gewähr für Vollständigkeit, Aktualität oder Anwendbarkeit auf einen
        Einzelfall, und stellen keine individuelle Rechtsberatung dar.
        Thrax Legal haftet nicht für eine Entscheidung, die allein auf
        dieser Grundlage getroffen wird, ausser bei Vorsatz oder grober
        Fahrlässigkeit ihrerseits.
      </p>
      <p>
        Bei besonders schwerwiegenden oder komplexen Fällen kann Thrax Legal
        dem Kunden empfehlen, eine im Anwaltsregister eingetragene Anwältin
        oder einen Anwalt zu konsultieren, statt im Rahmen des Abos zu
        antworten.
      </p>

      <h2>8. Eigentum an den gelieferten Dokumenten</h2>
      <p>
        Die im Rahmen des Abos gelieferten schriftlichen Antworten und
        Dokumente dürfen vom Kunden für die Bedürfnisse seiner eigenen
        Tätigkeit frei verwendet werden. Sie dürfen nicht als kommerzielle
        Vorlagen an Dritte weiterverkauft oder weitergegeben werden.
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
        Aktualisierung steht oben auf dieser Seite. Laufende Abonnements
        unterliegen für den aktuellen Abrechnungszyklus weiterhin der bei
        Abschluss geltenden Fassung.
      </p>
    </>
  );
}

function En() {
  return (
    <>
      <h2>1. Scope</h2>
      <p>
        These terms and conditions apply to any subscription taken out on
        this site. This service is reserved for{" "}
        <strong>self-employed individuals and legal entities</strong>
        (businesses, associations) acting for the purposes of their
        professional activity. It is not intended for consumers within the
        meaning of consumer protection law.
      </p>

      <h2>2. Provider identification</h2>
      <p>
        &ldquo;Thrax Legal&rdquo; is the trading name under which{" "}
        <strong>[First name LAST NAME]</strong>, a self-employed individual
        resident in Belgium (business number BCE: [to be added]), provides
        the services described on this site. Contact:{" "}
        <a href="mailto:hey@thrax-legal.ch">hey@thrax-legal.ch</a>.
      </p>

      <h2>3. Description and price of the plans</h2>
      <p>
        <strong>Essential</strong>: CHF 149 per month. Includes unlimited
        messaging for quick questions (one-off clarifications not
        requiring in-depth research, within the limits of reasonable,
        personal use), 2 full matters handled per month (drafting or
        reviewing a contract, resolving a dispute, explaining a
        procedure) handled within 72 business hours, and access to the
        full template library.
      </p>
      <p>
        <strong>Growth</strong>: CHF 349 per month. Includes unlimited
        messaging for quick questions, 5 full matters handled per month
        within 48 business hours (24 hours for matters flagged as
        urgent), a priority contract review included every month, and
        access to the full template library.
      </p>
      <p>
        Any full matter beyond the volume included in the chosen plan is
        billed at CHF 79, fixed price, regardless of complexity. Clearly
        unreasonable use of the unlimited messaging feature (volume or
        frequency inconsistent with normal use by an SME or self-employed
        individual) may be reclassified by Thrax Legal as full matters,
        with prior notice to the customer. The plans cover commercial
        contract law, employment law, corporate law, amicable debt
        collection, FADP compliance and commercial leases. Exceptional
        matters (fundraising, court litigation, restructuring, mergers and
        acquisitions) are not included and are referred to a specialised
        lawyer.
      </p>
      <p>
        Prices are stated in Swiss francs (CHF). [VAT treatment to be
        confirmed with an accountant before going live: the provider may be
        eligible for the Belgian small-business VAT exemption, in which
        case no VAT is charged.]
      </p>

      <p>
        Each full matter includes a call or video briefing by appointment, lasting 15 minutes on the Essentiel plan and 30 minutes on the Croissance plan, during which the customer explains their situation out loud. The answer, advice and documents are then provided in writing. The customer may waive this briefing and describe their situation in writing.
      </p>

      <h2>4. Subscription, payment and price lock</h2>
      <p>
        The subscription is confirmed once the first online payment is
        received and automatically renews each month for the same amount
        until cancelled by the customer. There is{" "}
        <strong>no minimum commitment period</strong>.
      </p>
      <p>
        The price paid by the customer at the time of subscribing remains
        unchanged for as long as their subscription stays active without
        interruption, even if Thrax Legal raises its rates for new
        customers. A cancellation followed by a new subscription is
        treated as a new subscription, subject to the rates in effect at
        that time.
      </p>

      <p>
        The customer may request, by simple email, that their subscription be suspended for up to 2 months per calendar year. During the suspension no payment is due and no new matter is handled; the locked price referred to in this article is kept. A suspension is not a cancellation: the subscription resumes automatically at the end of the requested period.
      </p>

      <h2>5. Handling time</h2>
      <p>
        Every full matter is handled within the timeframe stated for the
        chosen plan (72 business hours for Essential, 48 business hours for
        Growth, 24 hours for matters flagged as urgent under the Growth
        plan), counted from receipt of all the information and documents
        needed to handle it. Quick questions receive an answer within a
        reasonable, generally shorter timeframe.
      </p>

      <h2>6. Cancellation and refunds</h2>
      <p>
        The customer may cancel their subscription at any time, without
        reason or fees, by simply emailing{" "}
        <a href="mailto:hey@thrax-legal.ch">hey@thrax-legal.ch</a>.
        Cancellation takes effect at the end of the monthly period already
        paid for; the current month is not refunded on a pro-rata basis, subject to the
        money-back guarantee below.
        The customer may also switch plans at any time, effective from the
        next billing cycle.
      </p>
      <p>
        If a specific matter is clearly outside the scope described in
        Section 3 (in particular an exceptional matter), Thrax Legal
        informs the customer before any work begins and refers them to a
        lawyer rather than billing for an unsuitable service.
      </p>

      <p>
        Money-back guarantee: a customer subscribing for the first time may, within 30 days of their first payment, request by email and without giving reasons a full refund of that first payment. The request ends the subscription. This guarantee applies once per customer and does not cover extra matters billed individually.
      </p>

      <h2>7. Liability</h2>
      <p>
        Thrax Legal is not a law firm and does not represent clients before
        courts or administrative authorities, which is reserved to
        attorneys registered with a Swiss cantonal bar. Written answers and
        documents provided are prepared based on the information
        communicated by the customer; the accuracy and completeness of
        that information is the customer&rsquo;s responsibility. Thrax
        Legal does not guarantee the outcome of any legal matter, which
        depends on the facts specific to each case and, where applicable,
        the assessment of an authority or a court. The provider&rsquo;s
        liability, for all damages combined, is limited to the amount
        actually paid by the customer over the preceding twelve months,
        except in cases of intent or gross negligence.
      </p>
      <p>
        The general information about Swiss law on this site (guide, FAQ,
        statutory or case-law references) is provided for informational
        purposes only, without any guarantee of completeness, currency, or
        applicability to a particular case, and does not constitute
        individualized legal advice. Thrax Legal disclaims any liability
        for a decision made solely on this basis, except in cases of intent
        or gross negligence on its part.
      </p>
      <p>
        Where a case is particularly serious or complex, Thrax Legal may
        recommend that the customer consult an attorney registered with a
        Swiss bar instead of receiving an answer under the subscription.
      </p>

      <h2>8. Ownership of delivered documents</h2>
      <p>
        Written answers and documents delivered under the subscription may
        be used freely by the customer for the needs of their own
        activity. They may not be resold or redistributed to third parties
        as commercial templates.
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
        the top of this page. Active subscriptions remain governed by the
        version in effect at the time of subscription for the current
        billing cycle.
      </p>
    </>
  );
}

function It() {
  return (
    <>
      <h2>1. Ambito di applicazione</h2>
      <p>
        Le presenti condizioni generali si applicano a qualsiasi
        abbonamento sottoscritto su questo sito. Questo servizio è
        riservato a <strong>indipendenti e persone giuridiche</strong>
        (aziende, associazioni) che agiscono per le esigenze della propria
        attività professionale. Non è destinato ai consumatori ai sensi del
        diritto dei consumatori.
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

      <h2>3. Descrizione e prezzi delle formule</h2>
      <p>
        <strong>Essentiel</strong>: CHF 149 al mese. Comprende una
        messaggistica illimitata per le domande rapide (chiarimenti
        puntuali che non richiedono una ricerca approfondita, nei limiti
        di un uso ragionevole e personale), 2 pratiche complete gestite al
        mese (redazione o revisione di un contratto, risoluzione di una
        controversia, spiegazione di una procedura) gestite entro 72 ore
        lavorative, e l&rsquo;accesso alla libreria completa di modelli.
      </p>
      <p>
        <strong>Croissance</strong>: CHF 349 al mese. Comprende la
        messaggistica illimitata per le domande rapide, 5 pratiche
        complete gestite al mese entro 48 ore lavorative (24 ore per le
        urgenze segnalate come tali), una revisione contrattuale
        prioritaria inclusa ogni mese, e l&rsquo;accesso alla libreria
        completa di modelli.
      </p>
      <p>
        Ogni pratica completa oltre il volume incluso nella formula
        sottoscritta è fatturata CHF 79, prezzo fisso, indipendentemente
        dalla sua complessità. Un uso manifestamente irragionevole della
        messaggistica illimitata (volume o frequenza incompatibili con un
        uso normale da parte di una PMI o di un indipendente) può essere
        riqualificato da Thrax Legal come pratiche complete, previa
        informazione al cliente. Le formule coprono il diritto dei
        contratti commerciali, il diritto del lavoro, il diritto
        societario, il recupero crediti amichevole, la conformità nLPD e
        le locazioni commerciali. Le operazioni eccezionali (raccolta
        fondi, contenzioso giudiziario, ristrutturazione, fusioni e
        acquisizioni) non sono incluse e sono oggetto di un rinvio verso
        un avvocato specializzato.
      </p>
      <p>
        I prezzi sono indicati in franchi svizzeri (CHF). [Regime IVA da
        confermare con un commercialista prima della messa in produzione:
        il fornitore potrebbe beneficiare del regime belga di franchigia
        IVA per le piccole imprese, nel qual caso l&rsquo;IVA non viene
        applicata.]
      </p>

      <p>
        Ogni pratica completa comprende una chiamata o videochiamata di inquadramento su appuntamento, di 15 minuti nella formula Essentiel e di 30 minuti nella formula Croissance, durante la quale il cliente espone a voce la propria situazione. La risposta, i consigli e i documenti sono poi forniti per iscritto. Il cliente può rinunciare a questo colloquio e descrivere la propria situazione per iscritto.
      </p>

      <h2>4. Sottoscrizione, pagamento e blocco del prezzo</h2>
      <p>
        L&rsquo;abbonamento è confermato al ricevimento del primo pagamento
        online e si rinnova automaticamente ogni mese per lo stesso
        importo, fino a disdetta da parte del cliente. Non c&rsquo;è{" "}
        <strong>alcun impegno di durata minima</strong>.
      </p>
      <p>
        Il prezzo pagato dal cliente al momento della sottoscrizione resta
        invariato finché il suo abbonamento rimane attivo senza
        interruzioni, anche se Thrax Legal aumenta le tariffe per i nuovi
        clienti. Una disdetta seguita da una nuova sottoscrizione è
        considerata un nuovo abbonamento, soggetto alle tariffe in vigore
        in quel momento.
      </p>

      <p>
        Il cliente può chiedere, con semplice email, la sospensione del proprio abbonamento per un massimo di 2 mesi per anno civile. Durante la sospensione non è dovuto alcun pagamento e non viene presa in carico alcuna nuova pratica; il prezzo bloccato di cui al presente articolo è mantenuto. La sospensione non è una disdetta: l&rsquo;abbonamento riprende automaticamente al termine del periodo richiesto.
      </p>

      <h2>5. Termine di gestione</h2>
      <p>
        Ogni pratica completa viene gestita entro il termine indicato per
        la formula sottoscritta (72 ore lavorative per Essentiel, 48 ore
        lavorative per Croissance, 24 ore per le urgenze segnalate nella
        formula Croissance), a partire dal ricevimento di tutte le
        informazioni e i documenti necessari alla sua trattazione. Le
        domande rapide ricevono una risposta entro un termine ragionevole,
        generalmente più breve.
      </p>

      <h2>6. Disdetta e rimborso</h2>
      <p>
        Il cliente può disdire il proprio abbonamento in qualsiasi momento,
        senza motivo né costi, tramite semplice email a{" "}
        <a href="mailto:hey@thrax-legal.ch">hey@thrax-legal.ch</a>. La
        disdetta ha effetto alla fine del periodo mensile già pagato; il
        mese in corso non è rimborsato proporzionalmente, fatta salva la
        garanzia soddisfatti o rimborsati qui sotto. Il cliente può
        anche cambiare formula in qualsiasi momento, con effetto dal ciclo
        di fatturazione successivo.
      </p>
      <p>
        Se una pratica precisa risulta manifestamente al di fuori
        dell&rsquo;ambito descritto all&rsquo;articolo 3 (in particolare
        un&rsquo;operazione eccezionale), Thrax Legal ne informa il cliente
        prima di qualsiasi trattazione e lo indirizza verso un avvocato
        invece di fatturare una prestazione inadatta.
      </p>

      <p>
        Garanzia soddisfatti o rimborsati: il cliente che sottoscrive un abbonamento per la prima volta può chiedere, entro 30 giorni dal primo pagamento, con email e senza doversi giustificare, il rimborso integrale di tale primo pagamento. La richiesta pone fine all&rsquo;abbonamento. Questa garanzia si applica una sola volta per cliente e non copre le pratiche supplementari fatturate singolarmente.
      </p>

      <h2>7. Responsabilità</h2>
      <p>
        Thrax Legal non è uno studio legale e non garantisce la
        rappresentanza davanti ai tribunali o alle autorità amministrative,
        riservata agli avvocati iscritti a un albo cantonale svizzero. Le
        risposte scritte e i documenti forniti sono preparati sulla base
        delle informazioni comunicate dal cliente; la loro esattezza e
        completezza sono di responsabilità del cliente. Thrax Legal non
        garantisce l&rsquo;esito di una situazione giuridica, che dipende
        dai fatti propri di ciascun caso e, se del caso, dalla valutazione
        di un&rsquo;autorità o di un tribunale. La responsabilità del
        fornitore, per tutti i danni complessivamente, è limitata
        all&rsquo;importo effettivamente pagato dal cliente negli ultimi
        dodici mesi, salvo dolo o colpa grave.
      </p>
      <p>
        Le informazioni generali sul diritto svizzero presenti su questo
        sito (guida, domande frequenti, riferimenti legali o
        giurisprudenziali) sono fornite a puro titolo informativo, senza
        garanzia di esaustività, attualità o applicabilità a un caso
        particolare, e non costituiscono una consulenza legale
        personalizzata. Thrax Legal declina ogni responsabilità per una
        decisione presa unicamente su questa base, salvo dolo o colpa grave
        da parte sua.
      </p>
      <p>
        Nei casi particolarmente gravi o complessi, Thrax Legal può
        raccomandare al cliente di consultare un avvocato iscritto a un
        albo svizzero invece di ricevere una risposta nell&rsquo;ambito
        dell&rsquo;abbonamento.
      </p>

      <h2>8. Proprietà dei documenti consegnati</h2>
      <p>
        Le risposte scritte e i documenti consegnati nell&rsquo;ambito
        dell&rsquo;abbonamento possono essere utilizzati liberamente dal
        cliente per le esigenze della propria attività. Non possono essere
        rivenduti o ridistribuiti a terzi come modelli commerciali.
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
        controversia relativa alla loro interpretazione o esecuzione
        rientra nella competenza esclusiva dei tribunali del domicilio del
        fornitore. [Questa scelta predefinita può essere rivista con un
        giurista in base all&rsquo;evoluzione dell&rsquo;attività.]
      </p>

      <h2>12. Modifica delle presenti condizioni</h2>
      <p>
        Queste condizioni possono essere aggiornate; la data
        dell&rsquo;ultimo aggiornamento figura in cima a questa pagina. Gli
        abbonamenti in corso restano disciplinati dalla versione in vigore
        al momento della sottoscrizione per il ciclo di fatturazione in
        corso.
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
