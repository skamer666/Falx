import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import GuideLayout from "@/components/site/GuideLayout";
import { getGuideArticle } from "@/lib/guide/articles";
import { isLocale, DEFAULT_LOCALE, type Locale } from "@/i18n/config";

const article = getGuideArticle("vices-de-procedure-amende-suisse")!;

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
      <h2>Pourquoi les vices de procédure sont le motif le plus solide</h2>
      <p>
        Contester le fond d&rsquo;une infraction (« je ne roulais pas si
        vite ») revient à opposer votre parole à celle d&rsquo;un appareil
        homologué &mdash; un combat perdu d&rsquo;avance. Contester un vice
        de procédure revient à demander à l&rsquo;autorité de prouver
        qu&rsquo;elle a respecté ses propres règles. C&rsquo;est elle qui
        doit apporter cette preuve, pas vous. C&rsquo;est ce renversement qui
        rend ces motifs particulièrement efficaces.
      </p>

      <h2>Le certificat de vérification métrologique du radar</h2>
      <p>
        Tout appareil de mesure de vitesse (radar, laser, radar tronçon) doit
        être homologué et vérifié périodiquement par l&rsquo;Institut
        fédéral de métrologie (METAS). Sans ce certificat en cours de
        validité, la fiabilité de la mesure n&rsquo;est pas établie. Le
        Tribunal fédéral a rappelé qu&rsquo;une autorité ne peut pas refuser
        de produire ce certificat lorsque vous le demandez &mdash; le
        refuser constitue une violation de votre droit d&rsquo;être entendu.
      </p>
      <p>
        <strong>Le réflexe à avoir</strong> : avant même de discuter du
        fond, exigez systématiquement le certificat de conformité de
        l&rsquo;appareil et le rapport de mesure attestant de son
        emplacement exact. C&rsquo;est gratuit, l&rsquo;autorité est tenue de
        vous le fournir, et son absence ou son expiration est un motif de
        contestation à part entière.
      </p>

      <h2>La preuve vidéo filmée par un autre usager de la route</h2>
      <p>
        De plus en plus d&rsquo;amendes s&rsquo;appuient sur des vidéos
        transmises par d&rsquo;autres automobilistes ou cyclistes (dashcam,
        GoPro). La jurisprudence fédérale a posé une limite claire&nbsp;:
        un enregistrement filmé par un particulier sans le consentement de
        la personne filmée est en principe <strong>inexploitable</strong>{" "}
        comme preuve, sauf si l&rsquo;infraction est grave (accident,
        lésion corporelle). Pour une infraction simple ou moyenne, ce type de
        preuve tombe.
      </p>
      <p>
        Si l&rsquo;amende que vous avez reçue repose uniquement sur une
        vidéo de ce type, sans accident ni blessure, c&rsquo;est un motif
        concret à faire valoir.
      </p>

      <h2>Signalisation insuffisante pour le stationnement</h2>
      <p>
        Le Tribunal fédéral a annulé une amende de stationnement où seuls
        un marquage au sol et un panneau « visiteurs » existaient, sans le
        panneau officiel réglementaire d&rsquo;interdiction de parquer.
        Principe posé&nbsp;: une simple mention « visiteurs » ne suffit pas
        à fonder une sanction pénale, même si vous saviez que la place était
        réservée &mdash; il faut le bon panneau officiel, pas seulement une
        indication informelle.
      </p>
      <p>
        Photographiez systématiquement la signalisation complète du lieu
        avant de quitter les lieux ou dès que possible après réception de
        l&rsquo;amende.
      </p>

      <h2>Vices liés au contenu et à la notification</h2>
      <ul>
        <li>
          L&rsquo;ordonnance pénale doit mentionner le <strong>lieu exact</strong>{" "}
          et <strong>l&rsquo;appareil de mesure utilisé</strong> &mdash; à
          défaut, elle est insuffisamment motivée.
        </li>
        <li>
          Une notification hors délai ou irrégulière (mauvaise adresse,
          absence d&rsquo;accusé de réception) peut remettre en cause le
          point de départ du délai d&rsquo;opposition.
        </li>
        <li>
          Une photo floue ou illisible qui ne permet pas d&rsquo;identifier
          le conducteur ou la plaque est un vice d&rsquo;identification.
        </li>
      </ul>

      <h2>Ce qui ne fonctionne PAS (idées reçues à écarter)</h2>
      <ul>
        <li>
          L&rsquo;absence de panneau annonçant un contrôle radar :
          contrairement à d&rsquo;autres pays, aucune loi suisse
          n&rsquo;impose de signaler un contrôle à l&rsquo;avance.
        </li>
        <li>
          Un radar installé sur un terrain privé sans l&rsquo;accord du
          propriétaire : le Tribunal fédéral a jugé cette pratique licite.
        </li>
        <li>
          Une « tolérance de 3 minutes » en stationnement : cette règle
          vient d&rsquo;Allemagne et ne s&rsquo;applique pas en Suisse (sauf
          exception locale ponctuelle, par exemple à Genève).
        </li>
      </ul>

      <h2>Une précision importante</h2>
      <p>
        Ce guide présente des principes établis par la jurisprudence, pas un
        conseil juridique personnalisé. Chaque dossier a ses particularités
        &mdash; c&rsquo;est précisément ce que notre équipe vérifie avant de
        préparer votre lettre de contestation.
      </p>

      <p>
        Pour la procédure générale (délais, autorité compétente), consultez
        notre{" "}
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
      <h2>Warum Verfahrensmängel der stärkste Einspruchsgrund sind</h2>
      <p>
        Den Sachverhalt einer Widerhandlung zu bestreiten (« ich fuhr nicht
        so schnell ») bedeutet, Ihr Wort gegen ein geeichtes Messgerät zu
        stellen &mdash; ein von vornherein verlorener Kampf. Einen
        Verfahrensmangel zu rügen bedeutet, die Behörde aufzufordern zu
        beweisen, dass sie ihre eigenen Regeln eingehalten hat. Diesen
        Beweis muss sie erbringen, nicht Sie. Genau diese Umkehr macht diese
        Gründe besonders wirksam.
      </p>

      <h2>Das Eichzertifikat des Radars</h2>
      <p>
        Jedes Geschwindigkeitsmessgerät (Radar, Laser, Abschnittsradar) muss
        vom Eidgenössischen Institut für Metrologie (METAS) zugelassen und
        periodisch geeicht werden. Ohne gültiges Zertifikat ist die
        Zuverlässigkeit der Messung nicht belegt. Das Bundesgericht hat
        klargestellt, dass eine Behörde die Vorlage dieses Zertifikats auf
        Verlangen nicht verweigern darf &mdash; eine Verweigerung verletzt
        Ihr rechtliches Gehör.
      </p>
      <p>
        <strong>Der richtige Reflex</strong>: Fordern Sie noch vor jeder
        inhaltlichen Diskussion systematisch das Konformitätszertifikat des
        Geräts und den Messbericht mit dem genauen Standort ein. Das ist
        kostenlos, die Behörde ist dazu verpflichtet, und dessen Fehlen oder
        Ablauf ist ein eigenständiger Einspruchsgrund.
      </p>

      <h2>Videobeweis eines anderen Verkehrsteilnehmers</h2>
      <p>
        Immer mehr Bussen stützen sich auf Videos, die andere
        Autofahrerinnen oder Velofahrer übermitteln (Dashcam, GoPro). Das
        Bundesgericht hat eine klare Grenze gesetzt: Eine ohne Zustimmung
        der gefilmten Person aufgenommene private Aufnahme ist grundsätzlich{" "}
        <strong>nicht verwertbar</strong>, ausser bei einer schweren
        Widerhandlung (Unfall, Körperverletzung). Bei einer einfachen oder
        mittelschweren Widerhandlung fällt dieser Beweis weg.
      </p>
      <p>
        Falls Ihre Busse ausschliesslich auf einem solchen Video beruht,
        ohne Unfall oder Verletzung, ist das ein konkreter Einspruchsgrund.
      </p>

      <h2>Unzureichende Signalisation beim Parkieren</h2>
      <p>
        Das Bundesgericht hat eine Parkbusse aufgehoben, bei der nur eine
        Bodenmarkierung und ein «Besucher»-Schild vorhanden waren, ohne das
        offizielle Parkverbots-Signal. Grundsatz: Ein blosser Hinweis
        «Besucher» reicht nicht für eine strafrechtliche Sanktion, selbst
        wenn Sie wussten, dass der Platz reserviert war &mdash; es braucht
        das richtige offizielle Signal, nicht nur einen informellen Hinweis.
      </p>
      <p>
        Fotografieren Sie systematisch die gesamte Signalisation vor Ort,
        bevor Sie wegfahren oder so schnell wie möglich nach Erhalt der
        Busse.
      </p>

      <h2>Mängel beim Inhalt und bei der Zustellung</h2>
      <ul>
        <li>
          Der Strafbefehl muss den <strong>genauen Ort</strong> und das{" "}
          <strong>verwendete Messgerät</strong> nennen &mdash; andernfalls
          ist er unzureichend begründet.
        </li>
        <li>
          Eine verspätete oder unregelmässige Zustellung (falsche Adresse,
          fehlende Empfangsbestätigung) kann den Beginn der
          Einsprachefrist infrage stellen.
        </li>
        <li>
          Ein unscharfes oder unleserliches Foto, das die Identifikation von
          Fahrer oder Kennzeichen nicht erlaubt, ist ein
          Identifikationsmangel.
        </li>
      </ul>

      <h2>Was NICHT funktioniert (verbreitete Irrtümer)</h2>
      <ul>
        <li>
          Das Fehlen eines Schildes, das eine Radarkontrolle ankündigt:
          Anders als in anderen Ländern schreibt kein Schweizer Gesetz vor,
          eine Kontrolle vorher anzuzeigen.
        </li>
        <li>
          Ein Radar auf privatem Grund ohne Zustimmung der Eigentümerschaft:
          Das Bundesgericht hat diese Praxis als rechtmässig beurteilt.
        </li>
        <li>
          Eine «3-Minuten-Toleranz» beim Parkieren: Diese Regel stammt aus
          Deutschland und gilt in der Schweiz nicht (ausser einzelne lokale
          Ausnahmen, etwa in Genf).
        </li>
      </ul>

      <h2>Ein wichtiger Hinweis</h2>
      <p>
        Dieser Ratgeber stellt von der Rechtsprechung etablierte Grundsätze
        dar, keine individuelle Rechtsberatung. Jeder Fall hat seine
        Besonderheiten &mdash; genau das prüft unser Team, bevor wir Ihr
        Einspruchsschreiben vorbereiten.
      </p>

      <p>
        Für das allgemeine Verfahren (Fristen, zuständige Behörde) siehe
        unseren{" "}
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
      <h2>Why procedural defects are the strongest ground</h2>
      <p>
        Contesting the substance of an offence (&ldquo;I wasn&rsquo;t
        driving that fast&rdquo;) means pitting your word against a
        certified device &mdash; a fight you lose before it starts.
        Contesting a procedural defect means asking the authority to prove
        it followed its own rules. That burden of proof is theirs, not
        yours. This reversal is exactly what makes these grounds so
        effective.
      </p>

      <h2>The radar&rsquo;s metrological verification certificate</h2>
      <p>
        Every speed-measuring device (radar, laser, section control) must be
        approved and periodically verified by the Federal Institute of
        Metrology (METAS). Without a valid certificate, the reliability of
        the measurement isn&rsquo;t established. The Federal Supreme Court
        has confirmed that an authority cannot refuse to produce this
        certificate when requested &mdash; refusing violates your right to
        be heard.
      </p>
      <p>
        <strong>The reflex to have</strong>: before even discussing the
        substance, systematically demand the device&rsquo;s conformity
        certificate and the measurement report showing its exact location.
        It&rsquo;s free, the authority is required to provide it, and its
        absence or expiry is a standalone ground for contestation.
      </p>

      <h2>Video evidence filmed by another road user</h2>
      <p>
        More and more fines rely on videos submitted by other drivers or
        cyclists (dashcam, GoPro). Federal case law has drawn a clear line:
        a recording made by a private individual without the consent of the
        person filmed is, in principle, <strong>unusable</strong> as
        evidence, unless the offence is serious (accident, bodily injury).
        For a simple or moderate offence, this type of evidence falls away.
      </p>
      <p>
        If the fine you received rests solely on this kind of video, with no
        accident or injury involved, that&rsquo;s a concrete ground worth
        raising.
      </p>

      <h2>Insufficient signage for parking</h2>
      <p>
        The Federal Supreme Court annulled a parking fine where only ground
        markings and a &ldquo;visitors&rdquo; sign existed, without the
        official regulatory no-parking sign. The principle: a mere
        &ldquo;visitors&rdquo; indication isn&rsquo;t enough to found a
        criminal sanction, even if you knew the spot was reserved &mdash;
        the correct official sign is required, not just an informal
        indication.
      </p>
      <p>
        Systematically photograph the full signage on site before leaving,
        or as soon as possible after receiving the fine.
      </p>

      <h2>Defects in content and notification</h2>
      <ul>
        <li>
          The penal order must state the <strong>exact location</strong> and{" "}
          <strong>the measuring device used</strong> &mdash; otherwise it is
          insufficiently reasoned.
        </li>
        <li>
          Late or irregular notification (wrong address, no proof of
          receipt) can call into question when the objection deadline
          actually started.
        </li>
        <li>
          A blurry or illegible photo that doesn&rsquo;t allow the driver or
          plate to be identified is an identification defect.
        </li>
      </ul>

      <h2>What does NOT work (common misconceptions)</h2>
      <ul>
        <li>
          No sign announcing a radar control: unlike other countries, no
          Swiss law requires advance notice of a control.
        </li>
        <li>
          A radar installed on private land without the owner&rsquo;s
          consent: the Federal Supreme Court ruled this practice lawful.
        </li>
        <li>
          A &ldquo;3-minute tolerance&rdquo; for parking: this rule comes
          from Germany and does not apply in Switzerland (except for
          isolated local exceptions, such as in Geneva).
        </li>
      </ul>

      <h2>An important note</h2>
      <p>
        This guide presents principles established by case law, not
        individualized legal advice. Every case has its own particulars
        &mdash; which is exactly what our team checks before preparing your
        contestation letter.
      </p>

      <p>
        For the general procedure (deadlines, competent authority), see our{" "}
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
      <h2>Perché i vizi di procedura sono il motivo più solido</h2>
      <p>
        Contestare il merito di un&rsquo;infrazione (« non andavo così
        veloce ») significa opporre la vostra parola a un apparecchio
        omologato &mdash; una battaglia persa in partenza. Contestare un
        vizio di procedura significa chiedere all&rsquo;autorità di provare
        di aver rispettato le proprie regole. È lei che deve fornire questa
        prova, non voi. È proprio questo ribaltamento che rende questi
        motivi particolarmente efficaci.
      </p>

      <h2>Il certificato di verifica metrologica del radar</h2>
      <p>
        Ogni apparecchio di misurazione della velocità (radar, laser, radar
        di tratta) deve essere omologato e verificato periodicamente
        dall&rsquo;Istituto federale di metrologia (METAS). Senza questo
        certificato in corso di validità, l&rsquo;attendibilità della
        misurazione non è dimostrata. Il Tribunale federale ha ricordato che
        un&rsquo;autorità non può rifiutarsi di produrre questo certificato
        quando lo richiedete &mdash; rifiutarlo costituisce una violazione
        del vostro diritto di essere sentiti.
      </p>
      <p>
        <strong>Il riflesso da avere</strong>: prima ancora di discutere il
        merito, richiedete sistematicamente il certificato di conformità
        dell&rsquo;apparecchio e il rapporto di misurazione che attesta la
        sua posizione esatta. È gratuito, l&rsquo;autorità è obbligata a
        fornirvelo, e la sua assenza o scadenza è un motivo di contestazione
        a sé stante.
      </p>

      <h2>La prova video filmata da un altro utente della strada</h2>
      <p>
        Sempre più multe si basano su video trasmessi da altri automobilisti
        o ciclisti (dashcam, GoPro). La giurisprudenza federale ha posto un
        limite chiaro: una registrazione filmata da un privato senza il
        consenso della persona filmata è in linea di principio{" "}
        <strong>inutilizzabile</strong> come prova, salvo che
        l&rsquo;infrazione sia grave (incidente, lesione corporale). Per
        un&rsquo;infrazione semplice o media, questo tipo di prova cade.
      </p>
      <p>
        Se la multa che avete ricevuto si basa unicamente su un video di
        questo tipo, senza incidente né lesioni, è un motivo concreto da
        far valere.
      </p>

      <h2>Segnaletica insufficiente per il parcheggio</h2>
      <p>
        Il Tribunale federale ha annullato una multa per parcheggio in cui
        esistevano solo una segnaletica orizzontale e un cartello
        «visitatori», senza il cartello ufficiale regolamentare di divieto
        di parcheggio. Principio stabilito: una semplice indicazione
        «visitatori» non basta a fondare una sanzione penale, anche se
        sapevate che il posto era riservato &mdash; serve il cartello
        ufficiale corretto, non solo un&rsquo;indicazione informale.
      </p>
      <p>
        Fotografate sistematicamente l&rsquo;intera segnaletica del luogo
        prima di andarvene, o il prima possibile dopo aver ricevuto la
        multa.
      </p>

      <h2>Vizi legati al contenuto e alla notifica</h2>
      <ul>
        <li>
          Il decreto penale deve menzionare il <strong>luogo esatto</strong>{" "}
          e <strong>l&rsquo;apparecchio di misurazione utilizzato</strong>{" "}
          &mdash; altrimenti è motivato in modo insufficiente.
        </li>
        <li>
          Una notifica tardiva o irregolare (indirizzo errato, assenza di
          avviso di ricevimento) può rimettere in discussione il momento in
          cui inizia il termine di opposizione.
        </li>
        <li>
          Una foto sfocata o illeggibile che non permette di identificare il
          conducente o la targa è un vizio di identificazione.
        </li>
      </ul>

      <h2>Ciò che NON funziona (idee sbagliate da scartare)</h2>
      <ul>
        <li>
          L&rsquo;assenza di un cartello che annuncia un controllo radar: a
          differenza di altri paesi, nessuna legge svizzera impone di
          segnalare un controllo in anticipo.
        </li>
        <li>
          Un radar installato su un terreno privato senza il consenso del
          proprietario: il Tribunale federale ha giudicato lecita questa
          pratica.
        </li>
        <li>
          Una «tolleranza di 3 minuti» per il parcheggio: questa regola
          viene dalla Germania e non si applica in Svizzera (salvo
          eccezioni locali puntuali, ad esempio a Ginevra).
        </li>
      </ul>

      <h2>Una precisazione importante</h2>
      <p>
        Questa guida presenta principi stabiliti dalla giurisprudenza, non
        una consulenza legale personalizzata. Ogni caso ha le proprie
        particolarità &mdash; è esattamente ciò che il nostro team verifica
        prima di preparare la vostra lettera di contestazione.
      </p>

      <p>
        Per la procedura generale (termini, autorità competente), consultate
        la nostra{" "}
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
