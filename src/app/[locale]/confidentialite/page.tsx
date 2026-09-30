import type { Metadata } from "next";
import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import { Container } from "@/components/site/ui";
import { isLocale, DEFAULT_LOCALE, type Locale } from "@/i18n/config";

// À compléter avant mise en production : dénomination sociale exacte,
// siège social et, le cas échéant, numéro IDE de l'entité exploitant
// Thrax Legal. Le contenu ci-dessous ne mentionne que ce qui est déjà
// public sur le site (marque, email) pour ne rien inventer.
const LAST_UPDATED = "2026-10-01";

const META: Record<Locale, { title: string; description: string }> = {
  fr: {
    title: "Politique de confidentialité | Thrax Legal",
    description:
      "Comment Thrax Legal traite les données personnelles des visiteurs et clients de ce site, conformément à la nLPD.",
  },
  de: {
    title: "Datenschutzerklärung | Thrax Legal",
    description:
      "Wie Thrax Legal die Personendaten der Besuchenden und Kundschaft dieser Website gemäss DSG bearbeitet.",
  },
  en: {
    title: "Privacy Policy | Thrax Legal",
    description:
      "How Thrax Legal processes the personal data of this site's visitors and customers, in accordance with the Swiss FADP.",
  },
  it: {
    title: "Informativa sulla privacy | Thrax Legal",
    description:
      "Come Thrax Legal tratta i dati personali dei visitatori e clienti di questo sito, conformemente alla nLPD.",
  },
};

const HEADING: Record<Locale, string> = {
  fr: "Politique de confidentialité",
  de: "Datenschutzerklärung",
  en: "Privacy Policy",
  it: "Informativa sulla privacy",
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
    alternates: { canonical: `/${locale}/confidentialite` },
  };
}

function Fr() {
  return (
    <>
      <h2>Qui est responsable du traitement</h2>
      <p>
        &laquo;&nbsp;Thrax Legal&nbsp;&raquo; est le nom commercial sous
        lequel <strong>[Prénom NOM]</strong>, indépendant(e) domicilié(e) en
        Belgique (numéro d&rsquo;entreprise BCE&nbsp;: [à compléter]),
        propose les services décrits sur ce site. Il ne s&rsquo;agit pas
        d&rsquo;une société distincte. Pour toute question relative à la
        présente politique ou à vos données, contactez-nous à{" "}
        <a href="mailto:hey@thrax-legal.ch">hey@thrax-legal.ch</a>.
      </p>

      <h2>Quelles données nous traitons</h2>
      <p>
        Selon l’usage que vous faites du site, nous traitons les données
        suivantes&nbsp;:
      </p>
      <ul>
        <li>
          Les <strong>données de connexion techniques</strong> générées par
          votre navigation (adresse IP, type de navigateur, pages visitées,
          horodatage), collectées automatiquement par notre hébergeur
          Cloudflare à des fins de sécurité et de bon fonctionnement du
          site.
        </li>
        <li>
          Les réponses que vous donnez dans l’<strong>autodiagnostic
          gratuit</strong>&nbsp;: ces réponses restent dans votre navigateur,
          ne sont jamais envoyées à un serveur et disparaissent lorsque vous
          quittez ou rechargez la page.
        </li>
        <li>
          Si vous <strong>créez un compte client</strong>&nbsp;: votre nom, votre
          adresse email, votre entreprise et votre numéro de téléphone
          (facultatif), la formule choisie, la date d’acceptation des
          conditions générales, la date de votre dernière connexion, ainsi
          que votre mot de passe, que nous ne conservons que sous forme
          chiffrée irréversible (nous ne pouvons pas le lire).
        </li>
        <li>
          Si vous <strong>nous envoyez une demande</strong> depuis votre
          espace&nbsp;: le texte de votre demande, vos échanges avec nous et les
          documents que vous joignez (contrats, courriers, etc.). Ces
          documents peuvent contenir des données personnelles de tiers&nbsp;:
          ne joignez que ce qui est nécessaire.
        </li>
        <li>
          Les <strong>informations de paiement</strong> que nous enregistrons
          pour gérer votre abonnement&nbsp;: montant, date, période couverte,
          mode de paiement et référence. Nous ne traitons aucune donnée de
          carte bancaire&nbsp;: le module de paiement en ligne n’est pas encore
          en production, le règlement se fait pour l’instant par virement ou
          autre moyen convenu avec vous. Cette politique sera complétée à
          l’activation d’un prestataire de paiement.
        </li>
        <li>
          Des <strong>notes internes</strong> que nous prenons sur votre dossier
          pour assurer le suivi, et un <strong>journal technique</strong> des
          actions effectuées sur les comptes (paiement enregistré, réponse
          envoyée, etc.).
        </li>
        <li>
          Les <strong>tentatives de connexion</strong> (adresse email saisie,
          adresse IP, date), conservées sept jours pour bloquer les tentatives
          d’intrusion.
        </li>
        <li>
          Le contenu d’un <strong>email</strong> que vous nous envoyez, si vous
          nous contactez directement.
        </li>
      </ul>

      <h2>Cookies et traceurs</h2>
      <p>
        Ce site n’utilise aucun cookie de mesure d’audience, de publicité ou
        de réseau social. Il n’installe aucun traceur tiers. Si cela change
        (par exemple avec l’ajout d’un outil de mesure d’audience), cette
        politique sera mise à jour en conséquence, avant toute activation.
      </p>
      <p>
        Lorsque vous vous connectez à votre espace client, nous déposons un
        seul cookie, <strong>strictement nécessaire</strong> au fonctionnement
        du service (cookie de session «&nbsp;thrax_session&nbsp;»)&nbsp;: il vous
        garde connecté, n’est lisible que par notre serveur, n’est jamais
        utilisé à des fins de suivi ou de publicité et expire au bout de 30
        jours ou à votre déconnexion.
      </p>
      <p>
        Seule autre exception&nbsp;: la page d’accueil propose une vidéo de
        présentation hébergée sur YouTube. Tant que vous ne cliquez pas sur
        le lecteur, rien n’est transmis à YouTube&nbsp;: l’image affichée est
        hébergée sur notre site. Si vous lancez la vidéo, elle est chargée
        en mode de confidentialité renforcée (youtube-nocookie.com)&nbsp;;
        YouTube reçoit alors votre adresse IP et des informations techniques
        sur votre navigateur, et peut utiliser des cookies ou technologies
        similaires selon sa propre politique de confidentialité.
      </p>

      <h2>Destinataires des données</h2>
      <p>Nous ne vendons ni ne louons vos données. Elles sont traitées par les prestataires techniques suivants&nbsp;:</p>
      <ul>
        <li>
          <strong>Cloudflare, Inc.</strong> (hébergement du site, base de
          données de comptes et stockage des documents joints), dans le cadre
          de clauses contractuelles types reconnues encadrant les transferts de
          données hors de Suisse.
        </li>
        <li>
          <strong>Resend, Inc.</strong> (envoi des emails du service&nbsp;:
          confirmations, liens de mot de passe, notifications de réponse), qui
          reçoit votre adresse email et le contenu de ces messages, dans le
          cadre de clauses contractuelles types.
        </li>
        <li>
          <strong>Anthropic, PBC</strong> (États-Unis), éditeur de l’assistant
          d’intelligence artificielle Claude, auquel Thrax Legal a recours pour
          analyser les informations et documents que vous lui confiez et
          préparer les réponses, que Thrax Legal relit et dont il reste
          responsable. Vous y consentez expressément en cochant la case dédiée à
          la création de votre compte&nbsp;; ce traitement est nécessaire au
          service. Thrax Legal n’utilise que des offres professionnelles
          d’Anthropic, dont les conditions prévoient que vos données ne servent
          pas à entraîner ses modèles&nbsp;; Anthropic les conserve pour une durée
          limitée (en principe 30 jours) à des fins de sécurité et de
          conformité, puis les supprime. Le transfert vers les États-Unis est
          encadré par les clauses contractuelles types de l’addendum de
          traitement des données d’Anthropic. Évitez de transmettre des données
          inutiles, en particulier des données sensibles (santé, opinions,
          procédures pénales ou administratives), sauf si votre demande
          l’exige.
        </li>
        <li>
          Si vous lancez la vidéo de présentation, <strong>Google Ireland
          Limited</strong>, qui exploite YouTube pour les utilisateurs de
          Suisse et de l’Espace économique européen, reçoit les données
          décrites ci-dessus, qui peuvent être transférées aux États-Unis.
        </li>
      </ul>
      <p>
        L’accès à votre espace et à vos documents est réservé à vous-même et
        à Thrax Legal. Un autre client ne peut jamais les consulter.
      </p>

      <h2>Durée de conservation</h2>
      <ul>
        <li>
          Les données de connexion techniques sont conservées selon la durée
          standard appliquée par notre hébergeur pour les journaux de
          sécurité, puis supprimées automatiquement.
        </li>
        <li>
          Les tentatives de connexion sont conservées sept jours&nbsp;; les liens
          de réinitialisation de mot de passe expirent après une heure&nbsp;; une
          session de connexion expire après 30 jours.
        </li>
        <li>
          Les données de votre compte, vos demandes et vos documents sont
          conservés pendant la durée de votre abonnement, puis pendant le
          temps nécessaire à nos obligations légales et à la défense de nos
          droits. Vous pouvez demander leur effacement, sous réserve de ces
          obligations.
        </li>
        <li>
          Les justificatifs de paiement sont conservés pendant la durée
          légale applicable aux pièces comptables.
        </li>
        <li>
          Les emails que vous nous envoyez sont conservés le temps nécessaire
          pour traiter votre demande.
        </li>
      </ul>

      <h2>Vos droits</h2>
      <p>
        Conformément à la nLPD, vous disposez d&rsquo;un droit d&rsquo;accès,
        de rectification, d&rsquo;effacement et d&rsquo;opposition concernant
        vos données. Pour exercer ces droits, contactez-nous à{" "}
        <a href="mailto:hey@thrax-legal.ch">hey@thrax-legal.ch</a>. Vous
        pouvez aussi déposer une réclamation auprès du{" "}
        <a
          href="https://www.edoeb.admin.ch"
          target="_blank"
          rel="noopener noreferrer"
        >
          Préposé fédéral à la protection des données et à la transparence
          (PFPDT)
        </a>
        .
      </p>

      <h2>Modifications</h2>
      <p>
        Cette politique peut être mise à jour, notamment lors de
        l&rsquo;activation du module de paiement ou de l&rsquo;ajout de
        nouveaux outils sur le site. La date de dernière mise à jour figure
        en haut de cette page.
      </p>
    </>
  );
}

function De() {
  return (
    <>
      <h2>Wer für die Bearbeitung verantwortlich ist</h2>
      <p>
        &laquo;&nbsp;Thrax Legal&nbsp;&raquo; ist der Handelsname, unter dem{" "}
        <strong>[Vorname NAME]</strong>, selbstständig erwerbstätig mit
        Wohnsitz in Belgien (Unternehmensnummer BCE&nbsp;: [noch zu
        ergänzen]), die auf dieser Website beschriebenen Leistungen
        anbietet. Es handelt sich nicht um eine eigenständige Gesellschaft.
        Bei Fragen zu dieser Erklärung oder zu Ihren Daten kontaktieren Sie
        uns unter <a href="mailto:hey@thrax-legal.ch">hey@thrax-legal.ch</a>.
      </p>

      <h2>Welche Daten wir bearbeiten</h2>
      <p>
        Je nachdem, wie Sie die Website nutzen, bearbeiten wir die folgenden
        Daten:
      </p>
      <ul>
        <li>
          <strong>Technische Verbindungsdaten</strong>, die durch Ihre
          Navigation entstehen (IP-Adresse, Browsertyp, besuchte Seiten,
          Zeitstempel), automatisch erfasst von unserem Hosting-Anbieter
          Cloudflare zur Sicherheit und zum ordnungsgemässen Betrieb der
          Website.
        </li>
        <li>
          Ihre Antworten in der <strong>kostenlosen Gratis-Diagnose</strong>:
          Diese Antworten verbleiben in Ihrem Browser, werden nie an einen
          Server gesendet und verschwinden, wenn Sie die Seite verlassen oder
          neu laden.
        </li>
        <li>
          Wenn Sie ein <strong>Kundenkonto erstellen</strong>: Ihr Name, Ihre
          E-Mail-Adresse, Ihr Unternehmen und Ihre Telefonnummer (freiwillig),
          die gewählte Formel, das Datum der Annahme der Allgemeinen
          Geschäftsbedingungen, das Datum Ihrer letzten Anmeldung sowie Ihr
          Passwort, das wir nur in unumkehrbar verschlüsselter Form speichern
          (wir können es nicht lesen).
        </li>
        <li>
          Wenn Sie uns aus Ihrem Bereich eine <strong>Anfrage senden</strong>:
          den Text Ihrer Anfrage, Ihren Austausch mit uns und die Dokumente,
          die Sie anhängen (Verträge, Schreiben usw.). Diese Dokumente können
          personenbezogene Daten Dritter enthalten: Hängen Sie nur an, was
          nötig ist.
        </li>
        <li>
          Die <strong>Zahlungsangaben</strong>, die wir zur Verwaltung Ihres
          Abonnements erfassen: Betrag, Datum, abgedeckte Periode,
          Zahlungsart und Referenz. Wir bearbeiten keine Kreditkartendaten:
          Das Online-Zahlungsmodul ist noch nicht in Betrieb, die Zahlung
          erfolgt derzeit per Überweisung oder auf anderem mit Ihnen
          vereinbarten Weg. Diese Erklärung wird bei Aktivierung eines
          Zahlungsdienstleisters ergänzt.
        </li>
        <li>
          <strong>Interne Notizen</strong>, die wir zu Ihrem Anliegen für die
          Nachverfolgung machen, und ein <strong>technisches Protokoll</strong>
          der Aktionen auf den Konten (erfasste Zahlung, gesendete Antwort
          usw.).
        </li>
        <li>
          <strong>Anmeldeversuche</strong> (eingegebene E-Mail-Adresse,
          IP-Adresse, Datum), die sieben Tage lang aufbewahrt werden, um
          Einbruchsversuche zu blockieren.
        </li>
        <li>
          Der Inhalt einer <strong>E-Mail</strong>, die Sie uns senden, falls
          Sie uns direkt kontaktieren.
        </li>
      </ul>

      <h2>Cookies und Tracking-Tools</h2>
      <p>
        Diese Website verwendet keine Cookies zur Reichweitenmessung, für
        Werbung oder soziale Netzwerke. Es werden keine Tracking-Tools von
        Drittanbietern installiert. Sollte sich dies ändern (z. B. durch ein
        neues Analytics-Tool), wird diese Erklärung vor jeder Aktivierung
        entsprechend aktualisiert.
      </p>
      <p>
        Wenn Sie sich in Ihrem Kundenbereich anmelden, setzen wir genau ein
        Cookie, das für den Betrieb des Dienstes <strong>unbedingt
        erforderlich</strong> ist (Sitzungs-Cookie «thrax_session»): Es hält
        Sie angemeldet, ist nur für unseren Server lesbar, wird nie für
        Tracking oder Werbung verwendet und läuft nach 30 Tagen oder bei Ihrer
        Abmeldung ab.
      </p>
      <p>
        Einzige weitere Ausnahme: Die Startseite enthält ein
        Präsentationsvideo, das auf YouTube gehostet wird. Solange Sie nicht
        auf den Player klicken, wird nichts an YouTube übermittelt: Das
        angezeigte Bild wird auf unserer Website gehostet. Wenn Sie das Video
        starten, wird es im erweiterten Datenschutzmodus
        (youtube-nocookie.com) geladen; YouTube erhält dann Ihre IP-Adresse
        und technische Angaben zu Ihrem Browser und kann gemäss seiner eigenen
        Datenschutzerklärung Cookies oder ähnliche Technologien verwenden.
      </p>

      <h2>Empfänger der Daten</h2>
      <p>Wir verkaufen oder vermieten Ihre Daten nicht. Sie werden von folgenden technischen Dienstleistern bearbeitet:</p>
      <ul>
        <li>
          <strong>Cloudflare, Inc.</strong> (Hosting der Website,
          Konten-Datenbank und Speicherung der angehängten Dokumente), im
          Rahmen anerkannter Standardvertragsklauseln für
          Datenübermittlungen ausserhalb der Schweiz.
        </li>
        <li>
          <strong>Resend, Inc.</strong> (Versand der E-Mails des Dienstes:
          Bestätigungen, Passwort-Links, Antwortbenachrichtigungen), das Ihre
          E-Mail-Adresse und den Inhalt dieser Nachrichten erhält, im Rahmen
          von Standardvertragsklauseln.
        </li>
        <li>
          <strong>Anthropic, PBC</strong> (USA), Herausgeberin des
          KI-Assistenten Claude, auf den Thrax Legal zurückgreift, um die
          Angaben und Dokumente, die Sie anvertrauen, zu analysieren und die
          Antworten vorzubereiten, die Thrax Legal überprüft und für die es
          verantwortlich bleibt. Sie willigen ausdrücklich ein, indem Sie bei
          der Kontoerstellung das dafür vorgesehene Feld anklicken; diese
          Verarbeitung ist für den Dienst erforderlich. Thrax Legal nutzt nur
          professionelle Angebote von Anthropic, deren Bedingungen vorsehen,
          dass Ihre Daten nicht zum Training der Modelle verwendet werden;
          Anthropic bewahrt sie für begrenzte Zeit (in der Regel 30 Tage) zu
          Sicherheits- und Compliance-Zwecken auf und löscht sie danach. Die
          Übermittlung in die USA ist durch die Standardvertragsklauseln des
          Datenverarbeitungszusatzes von Anthropic abgesichert. Vermeiden Sie
          die Übermittlung unnötiger Daten, insbesondere sensibler Daten
          (Gesundheit, Meinungen, Straf- oder Verwaltungsverfahren), ausser
          wenn Ihre Anfrage dies erfordert.
        </li>
        <li>
          Wenn Sie das Präsentationsvideo starten, erhält <strong>Google
          Ireland Limited</strong>, die YouTube für Nutzer in der Schweiz und
          im Europäischen Wirtschaftsraum betreibt, die oben beschriebenen
          Daten; sie können in die USA übertragen werden.
        </li>
      </ul>
      <p>
        Der Zugriff auf Ihren Bereich und Ihre Dokumente ist Ihnen selbst und
        Thrax Legal vorbehalten. Ein anderer Kunde kann sie nie einsehen.
      </p>

      <h2>Aufbewahrungsdauer</h2>
      <ul>
        <li>
          Die technischen Verbindungsdaten werden gemäss der üblichen Dauer
          unseres Hosting-Anbieters für Sicherheitsprotokolle aufbewahrt und
          danach automatisch gelöscht.
        </li>
        <li>
          Anmeldeversuche werden sieben Tage aufbewahrt; Links zum
          Zurücksetzen des Passworts laufen nach einer Stunde ab; eine
          Anmeldesitzung läuft nach 30 Tagen ab.
        </li>
        <li>
          Ihre Kontodaten, Anfragen und Dokumente werden während der Dauer
          Ihres Abonnements aufbewahrt, danach so lange, wie es unsere
          gesetzlichen Pflichten und die Wahrung unserer Rechte erfordern. Sie
          können ihre Löschung verlangen, vorbehaltlich dieser Pflichten.
        </li>
        <li>
          Zahlungsbelege werden während der für Buchhaltungsunterlagen
          geltenden gesetzlichen Dauer aufbewahrt.
        </li>
        <li>
          E-Mails, die Sie uns senden, werden so lange aufbewahrt, wie es zur
          Bearbeitung Ihrer Anfrage nötig ist.
        </li>
      </ul>

      <h2>Ihre Rechte</h2>
      <p>
        Gemäss DSG haben Sie ein Recht auf Auskunft, Berichtigung, Löschung
        und Widerspruch bezüglich Ihrer Daten. Um diese Rechte auszuüben,
        kontaktieren Sie uns unter{" "}
        <a href="mailto:hey@thrax-legal.ch">hey@thrax-legal.ch</a>. Sie
        können auch eine Beschwerde beim{" "}
        <a
          href="https://www.edoeb.admin.ch"
          target="_blank"
          rel="noopener noreferrer"
        >
          Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB)
        </a>{" "}
        einreichen.
      </p>

      <h2>Änderungen</h2>
      <p>
        Diese Erklärung kann aktualisiert werden, insbesondere bei
        Aktivierung des Zahlungsmoduls oder bei neuen Tools auf der
        Website. Das Datum der letzten Aktualisierung finden Sie oben auf
        dieser Seite.
      </p>
    </>
  );
}

function En() {
  return (
    <>
      <h2>Who is responsible for processing</h2>
      <p>
        &ldquo;Thrax Legal&rdquo; is the trading name under which{" "}
        <strong>[First name LAST NAME]</strong>, a self-employed individual
        resident in Belgium (business number BCE: [to be added]), provides
        the services described on this site. It is not a separate legal
        entity. For any question about this policy or your data, contact us
        at <a href="mailto:hey@thrax-legal.ch">hey@thrax-legal.ch</a>.
      </p>

      <h2>What data we process</h2>
      <p>Depending on how you use the site, we process the following data:</p>
      <ul>
        <li>
          <strong>Technical connection data</strong> generated by your
          browsing (IP address, browser type, pages visited, timestamp),
          collected automatically by our hosting provider Cloudflare for
          security and the proper functioning of the site.
        </li>
        <li>
          Your answers in the <strong>free self-assessment</strong>: these
          answers stay in your browser, are never sent to a server and
          disappear when you leave or reload the page.
        </li>
        <li>
          If you <strong>create a client account</strong>: your name, email
          address, company and phone number (optional), the plan you chose,
          the date you accepted the terms and conditions, the date of your
          last sign-in, and your password, which we only store in an
          irreversibly encrypted form (we cannot read it).
        </li>
        <li>
          If you <strong>send us a request</strong> from your account: the
          text of your request, your exchanges with us and the documents you
          attach (contracts, letters, etc.). These documents may contain
          third parties&rsquo; personal data: only attach what is necessary.
        </li>
        <li>
          The <strong>payment information</strong> we record to manage your
          subscription: amount, date, period covered, payment method and
          reference. We do not process any bank card data: the online payment
          module is not yet live, and payment is currently made by bank
          transfer or another means agreed with you. This policy will be
          updated when a payment provider is activated.
        </li>
        <li>
          <strong>Internal notes</strong> we take on your matter for
          follow-up, and a <strong>technical log</strong> of actions performed
          on accounts (payment recorded, reply sent, etc.).
        </li>
        <li>
          <strong>Sign-in attempts</strong> (email address entered, IP
          address, date), kept for seven days to block intrusion attempts.
        </li>
        <li>
          The content of any <strong>email</strong> you send us if you contact
          us directly.
        </li>
      </ul>

      <h2>Cookies and trackers</h2>
      <p>
        This site does not use any audience-measurement, advertising or
        social media cookies. It does not install any third-party trackers.
        If this changes (for example by adding an analytics tool), this policy
        will be updated accordingly before activation.
      </p>
      <p>
        When you sign in to your client account, we set a single cookie that
        is <strong>strictly necessary</strong> for the service to work (the
        &ldquo;thrax_session&rdquo; session cookie): it keeps you signed in,
        can only be read by our server, is never used for tracking or
        advertising, and expires after 30 days or when you sign out.
      </p>
      <p>
        The only other exception: the home page features a presentation video
        hosted on YouTube. As long as you don&rsquo;t click the player,
        nothing is sent to YouTube: the image shown is hosted on our site. If
        you start the video, it is loaded in privacy-enhanced mode
        (youtube-nocookie.com); YouTube then receives your IP address and
        technical information about your browser, and may use cookies or
        similar technologies under its own privacy policy.
      </p>

      <h2>Recipients of the data</h2>
      <p>We do not sell or rent your data. It is processed by the following technical providers:</p>
      <ul>
        <li>
          <strong>Cloudflare, Inc.</strong> (site hosting, accounts database
          and storage of attached documents), under recognised standard
          contractual clauses for transfers outside Switzerland.
        </li>
        <li>
          <strong>Resend, Inc.</strong> (sending the service&rsquo;s emails:
          confirmations, password links, reply notifications), which receives
          your email address and the content of these messages, under standard
          contractual clauses.
        </li>
        <li>
          <strong>Anthropic, PBC</strong> (United States), publisher of the
          Claude AI assistant, which Thrax Legal uses to analyse the
          information and documents you entrust to it and to prepare answers,
          which Thrax Legal reviews and remains responsible for. You expressly
          consent by ticking the dedicated box when creating your account; this
          processing is necessary for the service. Thrax Legal only uses
          Anthropic&rsquo;s professional offerings, whose terms provide that your
          data is not used to train its models; Anthropic keeps it for a limited
          period (in principle 30 days) for security and compliance purposes,
          then deletes it. The transfer to the United States is covered by the
          standard contractual clauses in Anthropic&rsquo;s data processing
          addendum. Avoid sending unnecessary data, in particular sensitive data
          (health, opinions, criminal or administrative proceedings), unless
          your request requires it.
        </li>
        <li>
          If you start the presentation video, <strong>Google Ireland
          Limited</strong>, which operates YouTube for users in Switzerland and
          the European Economic Area, receives the data described above, which
          may be transferred to the United States.
        </li>
      </ul>
      <p>
        Access to your account and documents is reserved to you and to Thrax
        Legal. No other client can ever view them.
      </p>

      <h2>Retention period</h2>
      <ul>
        <li>
          Technical connection data is kept for the standard period applied
          by our hosting provider for security logs, then deleted
          automatically.
        </li>
        <li>
          Sign-in attempts are kept for seven days; password reset links
          expire after one hour; a sign-in session expires after 30 days.
        </li>
        <li>
          Your account data, requests and documents are kept for the duration
          of your subscription, then for as long as needed for our legal
          obligations and the defence of our rights. You may ask for their
          erasure, subject to those obligations.
        </li>
        <li>
          Payment records are kept for the legal period applicable to
          accounting records.
        </li>
        <li>
          Emails you send us are kept for as long as needed to handle your
          request.
        </li>
      </ul>

      <h2>Your rights</h2>
      <p>
        Under the Swiss FADP, you have the right to access, rectify, erase
        and object regarding your data. To exercise these rights, contact
        us at <a href="mailto:hey@thrax-legal.ch">hey@thrax-legal.ch</a>.
        You may also file a complaint with the{" "}
        <a
          href="https://www.edoeb.admin.ch"
          target="_blank"
          rel="noopener noreferrer"
        >
          Federal Data Protection and Information Commissioner (FDPIC)
        </a>
        .
      </p>

      <h2>Changes</h2>
      <p>
        This policy may be updated, in particular when the payment module
        is activated or new tools are added to the site. The date of the
        last update appears at the top of this page.
      </p>
    </>
  );
}

function It() {
  return (
    <>
      <h2>Chi è responsabile del trattamento</h2>
      <p>
        &laquo;&nbsp;Thrax Legal&nbsp;&raquo; è il nome commerciale sotto il
        quale <strong>[Nome COGNOME]</strong>, lavoratore/lavoratrice
        autonomo/a domiciliato/a in Belgio (numero d&rsquo;impresa
        BCE&nbsp;: [da completare]), offre i servizi descritti su questo
        sito. Non si tratta di una società distinta. Per qualsiasi domanda
        relativa alla presente informativa o ai vostri dati, contattateci a{" "}
        <a href="mailto:hey@thrax-legal.ch">hey@thrax-legal.ch</a>.
      </p>

      <h2>Quali dati trattiamo</h2>
      <p>A seconda dell’uso che fate del sito, trattiamo i seguenti dati:</p>
      <ul>
        <li>
          I <strong>dati tecnici di connessione</strong> generati dalla
          vostra navigazione (indirizzo IP, tipo di browser, pagine visitate,
          data e ora), raccolti automaticamente dal nostro fornitore di
          hosting Cloudflare a fini di sicurezza e di buon funzionamento del
          sito.
        </li>
        <li>
          Le risposte che date nell’<strong>autodiagnosi gratuita</strong>:
          queste risposte restano nel vostro browser, non vengono mai inviate
          a un server e scompaiono quando lasciate o ricaricate la pagina.
        </li>
        <li>
          Se <strong>create un account cliente</strong>: il vostro nome, il
          vostro indirizzo email, la vostra azienda e il vostro numero di
          telefono (facoltativo), la formula scelta, la data di accettazione
          delle condizioni generali, la data dell’ultimo accesso e la vostra
          password, che conserviamo solo in forma cifrata irreversibile (non
          possiamo leggerla).
        </li>
        <li>
          Se <strong>ci inviate una richiesta</strong> dal vostro spazio: il
          testo della richiesta, i vostri scambi con noi e i documenti che
          allegate (contratti, lettere, ecc.). Questi documenti possono
          contenere dati personali di terzi: allegate solo ciò che è
          necessario.
        </li>
        <li>
          Le <strong>informazioni di pagamento</strong> che registriamo per
          gestire il vostro abbonamento: importo, data, periodo coperto,
          modalità di pagamento e riferimento. Non trattiamo alcun dato di
          carta bancaria: il modulo di pagamento online non è ancora in
          produzione e il pagamento avviene per ora tramite bonifico o altro
          mezzo concordato con voi. Questa informativa sarà completata con
          l’attivazione di un fornitore di pagamento.
        </li>
        <li>
          Le <strong>note interne</strong> che prendiamo sulla vostra pratica
          per il seguito e un <strong>registro tecnico</strong> delle azioni
          effettuate sugli account (pagamento registrato, risposta inviata,
          ecc.).
        </li>
        <li>
          I <strong>tentativi di accesso</strong> (indirizzo email inserito,
          indirizzo IP, data), conservati sette giorni per bloccare i
          tentativi di intrusione.
        </li>
        <li>
          Il contenuto di un’<strong>email</strong> che ci inviate, se ci
          contattate direttamente.
        </li>
      </ul>

      <h2>Cookie e tracciatori</h2>
      <p>
        Questo sito non utilizza alcun cookie di misurazione dell’audience,
        pubblicitario o di social network. Non installa alcun tracciatore di
        terzi. Se ciò dovesse cambiare (ad esempio con l’aggiunta di uno
        strumento di misurazione dell’audience), questa informativa sarà
        aggiornata di conseguenza, prima di qualsiasi attivazione.
      </p>
      <p>
        Quando accedete al vostro spazio cliente, depositiamo un solo cookie,
        <strong> strettamente necessario</strong> al funzionamento del
        servizio (cookie di sessione «thrax_session»): vi mantiene connessi,
        è leggibile solo dal nostro server, non è mai usato a fini di
        tracciamento o pubblicità e scade dopo 30 giorni o alla
        disconnessione.
      </p>
      <p>
        Unica altra eccezione: la pagina iniziale propone un video di
        presentazione ospitato su YouTube. Finché non cliccate sul lettore,
        nulla viene trasmesso a YouTube: l’immagine mostrata è ospitata sul
        nostro sito. Se avviate il video, viene caricato in modalità privacy
        avanzata (youtube-nocookie.com); YouTube riceve allora il vostro
        indirizzo IP e informazioni tecniche sul vostro browser e può
        utilizzare cookie o tecnologie simili secondo la propria informativa
        sulla privacy.
      </p>

      <h2>Destinatari dei dati</h2>
      <p>Non vendiamo né affittiamo i vostri dati. Sono trattati dai seguenti fornitori tecnici:</p>
      <ul>
        <li>
          <strong>Cloudflare, Inc.</strong> (hosting del sito, database degli
          account e archiviazione dei documenti allegati), nell’ambito di
          clausole contrattuali tipo riconosciute per i trasferimenti di dati
          fuori dalla Svizzera.
        </li>
        <li>
          <strong>Resend, Inc.</strong> (invio delle email del servizio:
          conferme, link per la password, notifiche di risposta), che riceve il
          vostro indirizzo email e il contenuto di questi messaggi,
          nell’ambito di clausole contrattuali tipo.
        </li>
        <li>
          <strong>Anthropic, PBC</strong> (Stati Uniti), editore dell’assistente
          di intelligenza artificiale Claude, al quale Thrax Legal ricorre per
          analizzare le informazioni e i documenti che gli affidate e preparare
          le risposte, che Thrax Legal rivede e di cui resta responsabile.
          Acconsentite espressamente spuntando la casella dedicata alla
          creazione del vostro account; questo trattamento è necessario al
          servizio. Thrax Legal utilizza solo offerte professionali di
          Anthropic, le cui condizioni prevedono che i vostri dati non servano
          ad addestrare i suoi modelli; Anthropic li conserva per una durata
          limitata (in linea di principio 30 giorni) a fini di sicurezza e
          conformità, poi li elimina. Il trasferimento verso gli Stati Uniti è
          coperto dalle clausole contrattuali tipo dell’addendum sul
          trattamento dei dati di Anthropic. Evitate di trasmettere dati non
          necessari, in particolare dati sensibili (salute, opinioni,
          procedimenti penali o amministrativi), salvo che la vostra richiesta
          lo richieda.
        </li>
        <li>
          Se avviate il video di presentazione, <strong>Google Ireland
          Limited</strong>, che gestisce YouTube per gli utenti della Svizzera
          e dello Spazio economico europeo, riceve i dati descritti sopra, che
          possono essere trasferiti negli Stati Uniti.
        </li>
      </ul>
      <p>
        L’accesso al vostro spazio e ai vostri documenti è riservato a voi e a
        Thrax Legal. Nessun altro cliente può mai consultarli.
      </p>

      <h2>Durata di conservazione</h2>
      <ul>
        <li>
          I dati tecnici di connessione sono conservati secondo la durata
          standard applicata dal nostro fornitore di hosting per i registri di
          sicurezza, poi eliminati automaticamente.
        </li>
        <li>
          I tentativi di accesso sono conservati sette giorni; i link di
          reimpostazione della password scadono dopo un’ora; una sessione di
          accesso scade dopo 30 giorni.
        </li>
        <li>
          I dati del vostro account, le richieste e i documenti sono conservati
          per la durata del vostro abbonamento, poi per il tempo necessario ai
          nostri obblighi legali e alla difesa dei nostri diritti. Potete
          chiederne la cancellazione, fatti salvi tali obblighi.
        </li>
        <li>
          Le prove di pagamento sono conservate per la durata legale
          applicabile ai documenti contabili.
        </li>
        <li>
          Le email che ci inviate sono conservate per il tempo necessario a
          trattare la vostra richiesta.
        </li>
      </ul>

      <h2>I vostri diritti</h2>
      <p>
        Conformemente alla nLPD, avete un diritto di accesso, rettifica,
        cancellazione e opposizione riguardo ai vostri dati. Per esercitare
        questi diritti, contattateci a{" "}
        <a href="mailto:hey@thrax-legal.ch">hey@thrax-legal.ch</a>. Potete
        anche presentare un reclamo presso l&rsquo;{" "}
        <a
          href="https://www.edoeb.admin.ch"
          target="_blank"
          rel="noopener noreferrer"
        >
          Incaricato federale della protezione dei dati e della trasparenza
          (IFPDT)
        </a>
        .
      </p>

      <h2>Modifiche</h2>
      <p>
        Questa informativa può essere aggiornata, in particolare
        all&rsquo;attivazione del modulo di pagamento o all&rsquo;aggiunta
        di nuovi strumenti sul sito. La data dell&rsquo;ultimo aggiornamento
        figura in cima a questa pagina.
      </p>
    </>
  );
}

const COMPONENTS: Record<Locale, () => ReactNode> = { fr: Fr, de: De, en: En, it: It };

export default async function ConfidentialitePage({
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
