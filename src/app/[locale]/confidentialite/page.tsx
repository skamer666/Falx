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
const LAST_UPDATED = "2026-09-25";

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

      <h2>Quelles données nous traitons aujourd&rsquo;hui</h2>
      <p>
        À ce stade, ce site ne comporte aucun formulaire de collecte de
        données actif (le module de paiement n&rsquo;est pas encore en
        production, voir la page de commande). Les seules données traitées
        sont&nbsp;:
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
          Les réponses que vous donnez dans l&rsquo;<strong>autodiagnostic
          gratuit</strong> : ces réponses restent dans votre navigateur, ne
          sont jamais envoyées à un serveur et disparaissent lorsque vous
          quittez ou rechargez la page.
        </li>
        <li>
          Le contenu d&rsquo;un <strong>email</strong> que vous nous
          envoyez, si vous nous contactez directement.
        </li>
      </ul>
      <p>
        Dès que la commande en ligne sera activée, cette politique sera mise
        à jour pour décrire précisément les données de commande et de
        facturation traitées à ce moment-là (coordonnées, informations de
        paiement via notre futur prestataire de paiement).
      </p>

      <h2>Cookies et traceurs</h2>
      <p>
        Ce site n&rsquo;utilise aucun cookie de mesure d&rsquo;audience, de
        publicité ou de réseau social. Il n&rsquo;installe aucun traceur
        tiers. Si cela change (par exemple avec l&rsquo;ajout d&rsquo;un
        outil de mesure d&rsquo;audience), cette politique sera mise à jour
        en conséquence, avant toute activation.
      </p>

      <h2>Destinataires des données</h2>
      <p>
        Les données de connexion techniques sont traitées par notre
        hébergeur, Cloudflare, Inc., dans le cadre de clauses contractuelles
        types reconnues encadrant les transferts de données hors de Suisse.
        Aucune autre donnée n&rsquo;est partagée avec un tiers à ce jour.
      </p>

      <h2>Durée de conservation</h2>
      <p>
        Les données de connexion techniques sont conservées selon la durée
        standard appliquée par notre hébergeur pour les journaux de sécurité,
        puis supprimées automatiquement. Les emails que vous nous envoyez
        sont conservés le temps nécessaire pour traiter votre demande.
      </p>

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

      <h2>Welche Daten wir heute bearbeiten</h2>
      <p>
        Derzeit enthält diese Website kein aktives Formular zur
        Datenerhebung (das Zahlungsmodul ist noch nicht in Produktion,
        siehe die Bestellseite). Die einzigen bearbeiteten Daten
        sind&nbsp;:
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
          Ihre Antworten in der <strong>kostenlosen
          Gratis-Diagnose</strong>: Diese Antworten verbleiben in Ihrem
          Browser, werden nie an einen Server gesendet und verschwinden,
          wenn Sie die Seite verlassen oder neu laden.
        </li>
        <li>
          Der Inhalt einer <strong>E-Mail</strong>, die Sie uns senden, falls
          Sie uns direkt kontaktieren.
        </li>
      </ul>
      <p>
        Sobald die Online-Bestellung aktiviert wird, wird diese Erklärung
        aktualisiert, um die dann bearbeiteten Bestell- und
        Rechnungsdaten (Kontaktdaten, Zahlungsinformationen über unseren
        künftigen Zahlungsdienstleister) genau zu beschreiben.
      </p>

      <h2>Cookies und Tracking-Tools</h2>
      <p>
        Diese Website verwendet keine Cookies zur Reichweitenmessung, für
        Werbung oder soziale Netzwerke. Es werden keine Tracking-Tools von
        Drittanbietern installiert. Sollte sich dies ändern (z.&nbsp;B.
        durch ein neues Analytics-Tool), wird diese Erklärung vor jeder
        Aktivierung entsprechend aktualisiert.
      </p>

      <h2>Empfänger der Daten</h2>
      <p>
        Die technischen Verbindungsdaten werden von unserem Hosting-Anbieter
        Cloudflare, Inc. bearbeitet, im Rahmen anerkannter
        Standardvertragsklauseln für Datenübermittlungen ausserhalb der
        Schweiz. Keine weiteren Daten werden derzeit an Dritte
        weitergegeben.
      </p>

      <h2>Aufbewahrungsdauer</h2>
      <p>
        Die technischen Verbindungsdaten werden gemäss der üblichen Dauer
        unseres Hosting-Anbieters für Sicherheitsprotokolle aufbewahrt und
        danach automatisch gelöscht. E-Mails, die Sie uns senden, werden so
        lange aufbewahrt, wie es zur Bearbeitung Ihrer Anfrage nötig ist.
      </p>

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

      <h2>What data we process today</h2>
      <p>
        At this stage, this site has no active data-collection form (the
        payment module is not yet live, see the order page). The only data
        processed is:
      </p>
      <ul>
        <li>
          <strong>Technical connection data</strong> generated by your
          browsing (IP address, browser type, pages visited, timestamp),
          collected automatically by our hosting provider Cloudflare for
          security and to keep the site running properly.
        </li>
        <li>
          Your answers in the <strong>free diagnostic</strong>: these
          answers stay in your browser, are never sent to a server, and
          disappear when you leave or reload the page.
        </li>
        <li>
          The content of an <strong>email</strong> you send us, if you
          contact us directly.
        </li>
      </ul>
      <p>
        Once online ordering is activated, this policy will be updated to
        precisely describe the order and billing data processed at that
        point (contact details, payment information via our future payment
        provider).
      </p>

      <h2>Cookies and trackers</h2>
      <p>
        This site does not use any audience-measurement, advertising or
        social media cookies. It does not install any third-party trackers.
        If this changes (for example with the addition of an analytics
        tool), this policy will be updated accordingly before any such tool
        is activated.
      </p>

      <h2>Recipients of the data</h2>
      <p>
        Technical connection data is processed by our hosting provider,
        Cloudflare, Inc., under recognised standard contractual clauses
        governing data transfers outside Switzerland. No other data is
        shared with a third party at this time.
      </p>

      <h2>Retention period</h2>
      <p>
        Technical connection data is retained for the standard period
        applied by our hosting provider for security logs, then
        automatically deleted. Emails you send us are kept for as long as
        needed to handle your request.
      </p>

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

      <h2>Quali dati trattiamo oggi</h2>
      <p>
        Al momento, questo sito non comporta alcun modulo di raccolta dati
        attivo (il modulo di pagamento non è ancora in produzione, vedi la
        pagina d&rsquo;ordine). Gli unici dati trattati sono&nbsp;:
      </p>
      <ul>
        <li>
          I <strong>dati di connessione tecnici</strong> generati dalla
          vostra navigazione (indirizzo IP, tipo di browser, pagine
          visitate, orario), raccolti automaticamente dal nostro fornitore
          di hosting Cloudflare a fini di sicurezza e buon funzionamento
          del sito.
        </li>
        <li>
          Le risposte che fornite nella <strong>diagnosi gratuita</strong>:
          queste risposte restano nel vostro browser, non vengono mai
          inviate a un server e scompaiono quando lasciate o ricaricate la
          pagina.
        </li>
        <li>
          Il contenuto di un&rsquo;<strong>email</strong> che ci inviate, se
          ci contattate direttamente.
        </li>
      </ul>
      <p>
        Non appena l&rsquo;ordine online sarà attivato, questa informativa
        sarà aggiornata per descrivere precisamente i dati d&rsquo;ordine e
        di fatturazione trattati in quel momento (dati di contatto,
        informazioni di pagamento tramite il nostro futuro fornitore di
        pagamenti).
      </p>

      <h2>Cookie e tracciatori</h2>
      <p>
        Questo sito non utilizza alcun cookie di misurazione
        dell&rsquo;audience, pubblicitario o di social network. Non installa
        alcun tracciatore di terze parti. Se ciò dovesse cambiare (ad
        esempio con l&rsquo;aggiunta di uno strumento di analytics), questa
        informativa sarà aggiornata di conseguenza prima di qualsiasi
        attivazione.
      </p>

      <h2>Destinatari dei dati</h2>
      <p>
        I dati di connessione tecnici sono trattati dal nostro fornitore di
        hosting, Cloudflare, Inc., nell&rsquo;ambito di clausole
        contrattuali tipo riconosciute che disciplinano i trasferimenti di
        dati fuori dalla Svizzera. Nessun altro dato è condiviso con terzi
        ad oggi.
      </p>

      <h2>Durata di conservazione</h2>
      <p>
        I dati di connessione tecnici sono conservati secondo la durata
        standard applicata dal nostro fornitore di hosting per i log di
        sicurezza, poi cancellati automaticamente. Le email che ci inviate
        sono conservate per il tempo necessario a trattare la vostra
        richiesta.
      </p>

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
