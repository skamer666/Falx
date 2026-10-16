import type { Locale } from "@/i18n/config";

/** Texte d'accueil sous le choix particulier / entreprise : mots-clés, maillage interne et questions fréquentes. */
export const HOME_SEO: Record<
  Locale,
  { heading: string; intro: string; popular: string; faqHeading: string; all: string; faq: { q: string; a: string }[] }
> = {
  fr: {
    heading: "Un service juridique en ligne à prix fixe, pour la Suisse romande",
    intro:
      "Thrax Legal prépare par écrit vos lettres, requêtes et contrats selon le droit suisse, pour les particuliers et les entreprises de Genève, Vaud, Fribourg, Valais, Neuchâtel et du Jura. Vous choisissez une prestation, vous voyez le prix avant de commander et vous recevez votre document par email.",
    popular: "Les prestations les plus demandées",
    faqHeading: "Questions fréquentes",
    all: "Voir toutes les prestations",
    faq: [
      { q: "Thrax Legal est-il un cabinet d'avocats ?", a: "Non. Thrax Legal est un service juridique en ligne : nous préparons vos lettres, requêtes et contrats selon le droit suisse, mais nous ne vous représentons pas devant un tribunal. Si votre situation l'exige, nous vous orientons vers un avocat avant tout traitement." },
      { q: "Combien coûte une prestation ?", a: "Chaque prestation a un prix fixe, affiché avant de commander : dès 49 CHF pour les particuliers (prix final) et hors TVA pour les entreprises. L'option express (49 CHF) ramène la livraison à 24 heures ouvrées lorsqu'elle est proposée." },
      { q: "En combien de temps reçois-je mon document ?", a: "En général sous 1 à 5 jours ouvrés selon la prestation, indiqué sur chaque fiche. Le délai court dès le paiement et la réception des informations nécessaires." },
      { q: "Comment payer, et que se passe-t-il si vous ne pouvez pas m'aider ?", a: "Vous payez en ligne par carte bancaire (ou TWINT lorsqu'il est proposé). Si nous ne pouvons pas traiter votre demande, vous êtes remboursé intégralement." },
      { q: "Mes documents sont-ils confidentiels ?", a: "Oui : ils ne servent qu'à exécuter votre mission, avec un engagement de confidentialité. Nous faisons appel à des prestataires techniques, dont des outils d'intelligence artificielle établis notamment aux États-Unis, détaillés dans la politique de confidentialité. L'échange n'est toutefois pas couvert par le secret professionnel de l'avocat." },
    ],
  },
  de: {
    heading: "Ein Online-Rechtsservice zum Fixpreis für die Westschweiz",
    intro:
      "Thrax Legal bereitet Ihre Briefe, Eingaben und Verträge nach Schweizer Recht schriftlich vor, für Privatpersonen und Unternehmen in Genf, Waadt, Freiburg, Wallis, Neuenburg und im Jura. Sie wählen eine Leistung, sehen den Preis vor der Bestellung und erhalten Ihr Dokument per E-Mail.",
    popular: "Die gefragtesten Leistungen",
    faqHeading: "Häufige Fragen",
    all: "Alle Leistungen ansehen",
    faq: [
      { q: "Ist Thrax Legal eine Anwaltskanzlei?", a: "Nein. Thrax Legal ist ein Online-Rechtsservice: Wir bereiten Ihre Briefe, Eingaben und Verträge nach Schweizer Recht vor, vertreten Sie aber nicht vor Gericht. Wenn Ihre Situation es erfordert, verweisen wir Sie vor jeder Bearbeitung an eine Anwältin oder einen Anwalt." },
      { q: "Was kostet eine Leistung?", a: "Jede Leistung hat einen Fixpreis, der vor der Bestellung angezeigt wird: ab CHF 49 für Privatpersonen (Endpreis) und exkl. MWST für Unternehmen. Die Express-Option (CHF 49) verkürzt die Lieferung auf 24 Arbeitsstunden, sofern sie angeboten wird." },
      { q: "Wie schnell erhalte ich mein Dokument?", a: "In der Regel innert 1 bis 5 Arbeitstagen je nach Leistung, auf jedem Datenblatt angegeben. Die Frist läuft ab Zahlung und Eingang der nötigen Angaben." },
      { q: "Wie bezahle ich, und was geschieht, wenn Sie mir nicht helfen können?", a: "Sie bezahlen online per Karte (oder TWINT, sofern angeboten). Können wir Ihre Anfrage nicht bearbeiten, erhalten Sie den vollen Betrag zurück." },
      { q: "Sind meine Dokumente vertraulich?", a: "Ja: Sie dienen nur der Ausführung Ihres Auftrags, mit einer Vertraulichkeitsverpflichtung. Wir ziehen technische Dienstleister bei, darunter KI-Tools mit Sitz insbesondere in den USA, die in der Datenschutzerklärung aufgeführt sind. Der Austausch ist jedoch nicht durch das Anwaltsgeheimnis geschützt." },
    ],
  },
  en: {
    heading: "A fixed-price online legal service for French-speaking Switzerland",
    intro:
      "Thrax Legal prepares your letters, filings and contracts in writing under Swiss law, for individuals and businesses in Geneva, Vaud, Fribourg, Valais, Neuchâtel and the Jura. You choose a service, see the price before ordering and receive your document by email.",
    popular: "Most requested services",
    faqHeading: "Frequently asked questions",
    all: "See all services",
    faq: [
      { q: "Is Thrax Legal a law firm?", a: "No. Thrax Legal is an online legal service: we prepare your letters, filings and contracts under Swiss law, but we do not represent you before a court. If your situation requires it, we refer you to a lawyer before any work begins." },
      { q: "How much does a service cost?", a: "Each service has a fixed price shown before you order: from CHF 49 for individuals (final price) and excluding VAT for businesses. The express option (CHF 49) brings delivery down to 24 working hours where offered." },
      { q: "How quickly will I receive my document?", a: "Usually within 1 to 5 working days depending on the service, stated on each service page. The time starts once payment and the necessary information are received." },
      { q: "How do I pay, and what if you cannot help me?", a: "You pay online by bank card (or TWINT where offered). If we cannot handle your request, you are refunded in full." },
      { q: "Are my documents confidential?", a: "Yes: they are used only to carry out your assignment, under a confidentiality undertaking. We use technical providers, including artificial intelligence tools established notably in the United States, listed in the privacy policy. The exchange is, however, not covered by lawyer-client privilege." },
    ],
  },
  it: {
    heading: "Un servizio giuridico online a prezzo fisso per la Svizzera romanda",
    intro:
      "Thrax Legal prepara per iscritto le vostre lettere, istanze e contratti secondo il diritto svizzero, per privati e imprese di Ginevra, Vaud, Friburgo, Vallese, Neuchâtel e Giura. Scegliete una prestazione, vedete il prezzo prima di ordinare e ricevete il documento per email.",
    popular: "Le prestazioni più richieste",
    faqHeading: "Domande frequenti",
    all: "Vedere tutte le prestazioni",
    faq: [
      { q: "Thrax Legal è uno studio legale?", a: "No. Thrax Legal è un servizio giuridico online: prepariamo le vostre lettere, istanze e contratti secondo il diritto svizzero, ma non vi rappresentiamo davanti a un tribunale. Se la vostra situazione lo richiede, vi indirizziamo a un avvocato prima di qualsiasi lavoro." },
      { q: "Quanto costa una prestazione?", a: "Ogni prestazione ha un prezzo fisso indicato prima dell'ordine: da CHF 49 per i privati (prezzo finale) e IVA esclusa per le imprese. L'opzione express (CHF 49) porta la consegna a 24 ore lavorative, quando è proposta." },
      { q: "In quanto tempo ricevo il documento?", a: "Di regola entro 1-5 giorni lavorativi a seconda della prestazione, indicati su ogni scheda. Il termine decorre dal pagamento e dalla ricezione delle informazioni necessarie." },
      { q: "Come si paga, e cosa succede se non potete aiutarmi?", a: "Si paga online con carta bancaria (o TWINT, se proposto). Se non possiamo trattare la vostra richiesta, siete rimborsati integralmente." },
      { q: "I miei documenti sono riservati?", a: "Sì: servono solo a eseguire il vostro incarico, con un impegno di riservatezza. Ci avvaliamo di fornitori tecnici, tra cui strumenti di intelligenza artificiale con sede in particolare negli Stati Uniti, elencati nell'informativa sulla privacy. Lo scambio non è però coperto dal segreto professionale dell'avvocato." },
    ],
  },
};
