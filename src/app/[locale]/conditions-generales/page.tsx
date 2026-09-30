import type { Metadata } from "next";
import type { ReactNode } from "react";
import NextLink from "next/link";
import Reveal from "@/components/Reveal";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import { Container } from "@/components/site/ui";
import { isLocale, DEFAULT_LOCALE, type Locale } from "@/i18n/config";

// À compléter avant le premier client : numéro d'entreprise BCE (art. 2) une
// fois l'inscription comme indépendant faite (identité et adresse de contact
// exigées par l'art. 3 al. 1 let. s LCD : renseignées), puis faire relire l'ensemble par un avocat suisse. Droit suisse
// et for à Lausanne choisis par défaut (art. 18) : à confirmer.
const LAST_UPDATED = "2026-09-30";

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
      <h2>1. Champ d’application et acceptation</h2>
      <p>
        Les présentes conditions générales (les «&nbsp;CGV&nbsp;») régissent tout
        abonnement souscrit sur ce site et toute prestation fournie par
        Thrax Legal. Ce service est réservé aux{" "}
        <strong>indépendants et personnes morales</strong> (entreprises,
        associations) qui agissent pour les besoins de leur activité
        professionnelle. Il n’est pas destiné aux consommateurs. En créant un
        compte et en cochant la case d’acceptation, le client confirme avoir
        lu et accepté les CGV et agir à des fins professionnelles. Des
        conditions différentes du client ne s’appliquent pas, sauf acceptation
        écrite de Thrax Legal.
      </p>

      <h2>2. Identification du prestataire</h2>
      <p>
        «&nbsp;Thrax Legal&nbsp;» est le nom commercial sous lequel{" "}
        <strong>Grégoire Giuliano</strong>, personne physique
        domiciliée en Belgique (numéro d’entreprise BCE&nbsp;: en cours
        d’attribution, adresse de contact&nbsp;: Avenue Floréal 20, 1410
        Waterloo, Belgique), propose les services
        décrits sur ce site. Il ne s’agit pas d’une société distincte.
        Contact&nbsp;: <a href="mailto:hey@thrax-legal.ch">hey@thrax-legal.ch</a>.
      </p>

      <h2>3. Nature du service et limites</h2>
      <p>
        Thrax Legal fournit à ses clients, par écrit et par oral, des
        informations et une assistance juridiques sur des questions courantes
        de la vie d’une entreprise en droit suisse (voir l’article 4). Les
        relations entre les parties sont soumises aux règles du{" "}
        <strong>mandat</strong> (art. 394 ss du Code des obligations, «&nbsp;CO&nbsp;»)&nbsp;:
        Thrax Legal s’engage à exécuter sa mission avec diligence et
        fidélité (art. 398 CO), mais <strong>ne garantit aucun résultat</strong>,
        notamment l’issue d’une négociation, d’un litige ou d’une décision
        d’autorité.
      </p>
      <p>
        <strong>Thrax Legal n’est pas un cabinet d’avocats.</strong> Le
        prestataire n’est pas inscrit à un registre cantonal des avocats et
        n’utilise pas le titre d’avocat. Il n’assure pas la représentation
        professionnelle devant les tribunaux et les autorités, réservée aux
        avocats, et ne rédige pas d’actes réservés à d’autres professions
        (par exemple des actes authentiques). Les opérations exceptionnelles
        (levée de fonds, contentieux devant un tribunal, restructuration,
        fusion-acquisition), le droit étranger et le conseil fiscal ne sont
        pas inclus&nbsp;: le cas échéant, Thrax Legal oriente le client vers un
        avocat ou un autre spécialiste, avant tout traitement.
      </p>
      <p>
        <strong>Pas de secret professionnel de l’avocat.</strong> Le secret
        professionnel pénalement protégé (art. 321 du Code pénal) et les
        droits de refuser de témoigner ou de collaborer qui en découlent
        bénéficient aux avocats inscrits et à leurs auxiliaires&nbsp;; ils ne
        s’appliquent pas aux échanges avec Thrax Legal. Ces échanges sont
        protégés par l’engagement de confidentialité de l’article 9, qui ne
        peut pas être opposé à une obligation légale ou à un ordre d’une
        autorité compétente. Le client en tient compte avant de transmettre
        des informations particulièrement sensibles.
      </p>
      <p>
        <strong>Recours à l’intelligence artificielle.</strong> Thrax Legal utilise
        des outils d’intelligence artificielle, actuellement l’assistant Claude
        de la société Anthropic, PBC (États-Unis), pour analyser les
        informations et documents du client et préparer les réponses et
        livrables, que Thrax Legal relit et dont il reste seul responsable
        envers le client. En acceptant les CGV et en cochant la case dédiée à la
        création de son compte, le client <strong>consent expressément</strong> à
        ce que ses informations et documents (y compris les données
        personnelles de tiers qu’ils contiennent) soient transmis à ce
        prestataire dans ce but. Ce traitement est nécessaire au service&nbsp;: le
        client qui n’y consent pas ne peut pas souscrire, et celui qui retire
        son consentement en cours de contrat met fin à l’abonnement, selon
        l’article 10. Thrax Legal configure ses outils pour que les données du client ne servent pas à entraîner les modèles et ne soient conservées par le fournisseur que pour une durée limitée&nbsp;; le transfert vers les États-Unis repose sur le consentement exprès du client et, selon l’offre utilisée, sur les clauses contractuelles types du fournisseur. Le client évite de transmettre des
        données inutiles, en particulier des données sensibles (santé,
        opinions, procédures pénales ou administratives), sauf si sa demande
        l’exige. Les détails figurent dans la politique de confidentialité.
      </p>
      <p>
        Les informations générales sur le droit suisse figurant sur ce site
        (guide, foire aux questions, références légales ou
        jurisprudentielles) sont fournies à titre informatif, sans garantie
        d’exhaustivité, d’actualité ou d’applicabilité à un cas particulier,
        et ne constituent pas un conseil juridique personnalisé.
      </p>

      <h2>4. Formules, volumes et prix</h2>
      <p>
        <strong>Essentiel</strong>&nbsp;: 149&nbsp;CHF par mois. Comprend 10 questions
        rapides par mois, 5 dossiers complets par mois traités sous 72 heures
        ouvrées et un appel ou une visioconférence de cadrage pour chaque
        dossier.
      </p>
      <p>
        <strong>Croissance</strong>&nbsp;: 349&nbsp;CHF par mois. Comprend 30 questions
        rapides par mois, 12 dossiers complets par mois traités sous 48
        heures ouvrées (24 heures pour les urgences signalées comme telles),
        un appel ou une visioconférence de cadrage pour chaque dossier et une
        révision de contrat prioritaire incluse chaque mois.
      </p>
      <p>
        <strong>Question rapide.</strong> Une question rapide est une question
        précise sur une situation, à laquelle Thrax Legal répond par écrit en
        quelques lignes, sans lecture ni rédaction de document et sans
        recherche approfondie (environ 15 minutes de travail au maximum). Si
        la réponse exige la lecture d’un document, une recherche approfondie
        ou une rédaction, la demande est un dossier&nbsp;; le client en est
        informé avant tout traitement. Les questions de suivi portant sur un
        dossier livré, posées dans les 14 jours suivant sa livraison, ne sont
        pas décomptées. Au-delà du nombre de questions rapides inclus dans la
        formule, la question est traitée le mois suivant ou, au choix du
        client, décomptée comme un dossier.
      </p>
      <p>
        <strong>Dossier.</strong> Un dossier est un travail complet donnant
        lieu à un livrable écrit (par exemple&nbsp;: rédaction ou relecture d’un
        contrat, mise en demeure, règlement d’un litige avec une partie,
        rédaction de conditions générales ou d’une politique de
        confidentialité, analyse d’un bail commercial). Il comprend le
        cadrage, le livrable et un tour de corrections demandé dans les 14
        jours suivant la livraison.
      </p>
      <p>
        <strong>Décompte des dossiers.</strong> Une demande compte pour deux
        dossiers ou plus lorsqu’elle porte sur plusieurs livrables distincts
        (par exemple un contrat de travail et un règlement du personnel), sur
        plusieurs parties distinctes (par exemple deux employés ou deux
        débiteurs) ou sur un document de plus de 20 pages (un dossier
        supplémentaire par tranche de 20 pages entamée). Une nouvelle demande
        portant sur un autre sujet, formulée après la livraison d’un dossier,
        est un nouveau dossier. Avant de commencer, Thrax Legal confirme par
        écrit au client le nombre de dossiers que compte sa demande&nbsp;; le
        client peut alors la préciser, la réduire ou y renoncer avant tout
        décompte.
      </p>
      <p>
        <strong>Volumes mensuels.</strong> Les volumes inclus se comptent par
        mois d’abonnement et ne sont pas reportés sur le mois suivant. Tout
        dossier complet au-delà du volume inclus dans la formule souscrite
        est facturé 79&nbsp;CHF, prix fixe, quelle que soit sa complexité, après
        accord du client.
      </p>
      <p>
        <strong>Appel de cadrage.</strong> Chaque dossier complet comprend un
        appel téléphonique ou une visioconférence de cadrage, sur
        rendez-vous, de 15 minutes en formule Essentiel et de 30 minutes en
        formule Croissance, au cours desquels le client expose sa situation
        de vive voix. La réponse, les conseils et les documents sont ensuite
        fournis par écrit. Le client peut renoncer à cet échange et décrire
        sa situation par écrit.
      </p>
      <p>
        <strong>Prix.</strong> Les prix sont indiqués en francs suisses (CHF) et
        s’entendent <strong>hors taxe sur la valeur ajoutée</strong>. Aucune
        TVA suisse n’est facturée tant que le prestataire n’y est pas
        assujetti&nbsp;; s’il le devient, la TVA légale est ajoutée aux prix à
        compter de son assujettissement, avec information préalable du
        client. Les éventuelles taxes dues du côté du client sur des
        prestations fournies depuis l’étranger (notamment l’impôt sur les
        acquisitions) restent à sa charge.
      </p>

      <h2>5. Conclusion du contrat en ligne</h2>
      <p>
        Le contrat se conclut par étapes&nbsp;: (1) le client choisit une formule
        et remplit le formulaire de création de compte&nbsp;; (2) il lit et
        accepte les CGV en cochant la case prévue, puis envoie le formulaire&nbsp;;
        (3) Thrax Legal lui confirme sans délai la réception de sa demande
        par email&nbsp;; (4) le contrat est conclu et l’espace client est activé
        à la réception du premier paiement, dont Thrax Legal informe le
        client par email. Avant l’envoi du formulaire, le client peut
        corriger ses données en modifiant les champs concernés&nbsp;; après
        l’envoi, il peut demander une correction à{" "}
        <a href="mailto:hey@thrax-legal.ch">hey@thrax-legal.ch</a>. Thrax
        Legal peut refuser une demande d’abonnement avant son activation, sans
        indemnité de part ni d’autre. Les CGV applicables au moment de la
        souscription peuvent être consultées et imprimées sur cette page&nbsp;;
        le client est invité à les conserver.
      </p>

      <h2>6. Durée, paiement et prix bloqué</h2>
      <p>
        L’abonnement se compose de périodes mensuelles payées d’avance. Il
        n’y a <strong>aucun engagement de durée minimale</strong>. Le paiement
        s’effectue pour l’instant par virement bancaire ou par un autre moyen
        convenu avec le client&nbsp;; Thrax Legal informera le client avant
        l’introduction d’un paiement en ligne ou d’un prélèvement
        automatique. La période payée ouvre l’accès à l’espace client et aux
        volumes de la formule. L’abonnement est renouvelé pour une nouvelle
        période mensuelle à réception du paiement de celle-ci&nbsp;; à défaut de
        paiement à l’échéance, il prend fin à l’expiration de la période
        payée et l’accès à l’espace client est suspendu. Les dossiers et
        échanges déjà enregistrés sont conservés et redeviennent accessibles
        dès le renouvellement.
      </p>
      <p>
        Les montants facturés en dehors de la période payée (par exemple un
        dossier supplémentaire à 79&nbsp;CHF) sont payables dans les 30 jours
        suivant la facture&nbsp;; à l’échéance, le client est en demeure sans
        rappel et doit un intérêt moratoire de 5&nbsp;% par an (art. 102 al. 2 et
        104 CO).
      </p>
      <p>
        Le prix payé par le client au moment de sa souscription reste
        inchangé tant que son abonnement demeure actif sans interruption,
        même si Thrax Legal augmente ses tarifs pour les nouveaux clients.
        Une résiliation suivie d’une nouvelle souscription, ou une période
        non renouvelée, est considérée comme un nouvel abonnement, soumis aux
        tarifs en vigueur à ce moment-là.
      </p>
      <p>
        Le client peut demander la suspension de son abonnement pour une
        durée maximale de 2 mois par année civile, par simple email. Pendant
        la suspension, aucun paiement n’est dû et aucun nouveau dossier n’est
        pris en charge&nbsp;; le prix bloqué visé au présent article est
        conservé. La suspension n’est pas une résiliation&nbsp;: l’abonnement
        reprend à la fin de la période demandée, sur paiement de la période
        suivante.
      </p>

      <h2>7. Délais de traitement</h2>
      <p>
        Chaque dossier complet est traité dans le délai annoncé pour la
        formule souscrite (72 heures ouvrées pour Essentiel, 48 heures
        ouvrées pour Croissance, 24 heures pour les urgences signalées en
        formule Croissance), à compter de la réception de toutes les
        informations et documents nécessaires à son traitement. Les
        questions rapides reçoivent une réponse écrite dans un délai de 48
        heures ouvrées (24 heures ouvrées en formule Croissance). Les heures
        ouvrées s’entendent du lundi au vendredi, à l’exclusion des samedis,
        dimanches et jours fériés en Suisse romande. Ces délais sont des
        objectifs de service&nbsp;; un dépassement ne donne droit qu’à un
        traitement prioritaire, sans préjudice de l’article 11 en cas de
        faute.
      </p>

      <h2>8. Obligations du client</h2>
      <p>
        Le client fournit des informations et des documents complets, exacts
        et à jour, et les transmet à temps. Il est seul responsable de
        l’exactitude des faits communiqués et de l’usage qu’il fait des
        réponses et documents reçus. <strong>Il indique dès le dépôt de sa
        demande tout délai légal, contractuel ou judiciaire en cours</strong>{" "}
        (par exemple un délai de recours, d’opposition, de résiliation ou de
        prescription) et choisit, en formule Croissance, l’option
        d’urgence lorsqu’elle s’impose&nbsp;; Thrax Legal n’est pas responsable
        d’un délai échu parce qu’il ne lui a pas été signalé en temps utile.
      </p>
      <p>
        Le client garantit être en droit de transmettre les documents et
        données personnelles de tiers qu’il soumet, et informe ces tiers
        conformément à la législation sur la protection des données. Il ne
        soumet aucune demande contraire à la loi ou destinée à nuire à un
        tiers. Il garde son mot de passe confidentiel, n’utilise qu’un compte
        par abonnement, répond des actions effectuées avec son compte et
        informe sans délai Thrax Legal de tout accès non autorisé.
      </p>
      <p>
        Thrax Legal peut décliner ou interrompre une demande qui serait
        contraire à la loi ou à ses principes, qui exposerait le prestataire à
        un conflit d’intérêts (notamment lorsque la partie adverse est déjà
        cliente) ou qui relèverait d’un usage manifestement abusif du
        service. La demande n’est alors pas décomptée et le client en est
        informé par écrit.
      </p>

      <h2>9. Confidentialité</h2>
      <p>
        Thrax Legal traite de façon confidentielle tous les faits, documents
        et informations que le client lui confie, les utilise uniquement pour
        exécuter la mission et ne les communique qu’aux personnes ou
        prestataires techniques qui en ont besoin pour la fournir et qui sont
        tenus à une confidentialité équivalente. Cet engagement ne s’applique
        pas aux informations déjà publiques, ni à une communication imposée
        par la loi ou par une autorité compétente (voir l’article 3). La
        transmission au fournisseur d’intelligence artificielle visé à l’article 3
        est permise et ne viole pas cet engagement. Il
        subsiste après la fin du contrat.
      </p>

      <h2>10. Résiliation, refus et remboursement</h2>
      <p>
        Conformément à l’article 404 CO, chaque partie peut mettre fin au
        contrat en tout temps, sans motif ni pénalité. Le client résilie par
        simple email à <a href="mailto:hey@thrax-legal.ch">hey@thrax-legal.ch</a>
        {" "}ou en ne renouvelant pas la période suivante&nbsp;; la résiliation
        prend effet à la fin de la période mensuelle déjà payée, et le client
        conserve ses droits jusqu’à cette date. Le mois en cours n’est pas
        remboursé au prorata. Le client peut également changer de formule à
        tout moment, avec effet au prochain renouvellement.
      </p>
      <p>
        Thrax Legal peut résilier l’abonnement avec un préavis de 14 jours
        pour la fin d’une période, ou immédiatement pour de justes motifs
        (notamment violation grave des CGV, usage abusif ou illicite, défaut
        de paiement d’un montant facturé après mise en demeure). Si Thrax
        Legal résilie sans faute du client, le prix de la période payée et
        non utilisée est remboursé au prorata.
      </p>
      <p>
        Si un dossier précis s’avère manifestement hors du champ décrit à
        l’article 3 ou à l’article 4, Thrax Legal en informe le client avant
        tout traitement et l’oriente vers un avocat plutôt que de facturer
        une prestation inadaptée.
      </p>

      <h2>11. Responsabilité</h2>
      <p>
        Thrax Legal répond de l’exécution diligente et fidèle de sa mission
        (art. 398 CO). Les réponses écrites et les documents fournis sont
        préparés à partir des informations communiquées par le client&nbsp;; leur
        exactitude et leur exhaustivité relèvent de la responsabilité du
        client. Thrax Legal ne garantit pas l’issue d’une situation
        juridique, qui dépend des faits propres à chaque dossier et, le cas
        échéant, de l’appréciation d’une autorité, d’un tribunal ou d’un tiers.
      </p>
      <p>
        Dans la mesure permise par la loi, la responsabilité du prestataire,
        tous préjudices confondus, est limitée au montant effectivement payé
        par le client au cours des douze mois précédant l’événement
        dommageable, et les dommages indirects ou consécutifs (notamment le
        manque à gagner, la perte d’une chance ou d’un contrat) sont exclus.
        Cette limitation ne s’applique pas en cas de faute intentionnelle ou
        de négligence grave (art. 100 al. 1 CO), ni pour les dommages
        corporels ou dans les autres cas où la loi ne permet pas de limiter
        la responsabilité. Thrax Legal décline toute responsabilité pour une
        décision prise sur la seule base des informations générales du site.
      </p>
      <p>
        Lorsqu’un dossier présente une gravité ou une complexité
        particulière, Thrax Legal peut recommander au client de consulter un
        avocat inscrit à un barreau suisse plutôt que de répondre dans le
        cadre de l’abonnement.
      </p>

      <h2>12. Propriété des documents livrés</h2>
      <p>
        Les réponses écrites et documents livrés dans le cadre de
        l’abonnement, une fois la période correspondante payée, peuvent être
        utilisés librement par le client pour les besoins de sa propre
        activité. Ils ne peuvent être revendus ou redistribués à des tiers en
        tant que modèles commerciaux. Thrax Legal conserve ses droits sur
        ses méthodes, modèles, trames et savoir-faire généraux, sans jamais
        réutiliser le contenu confidentiel propre à un client.
      </p>

      <h2>13. Protection des données</h2>
      <p>
        Le traitement des données personnelles dans le cadre de ce service,
        y compris l’hébergement des données et les prestataires techniques
        auxquels Thrax Legal recourt, est décrit dans notre{" "}
        <NextLink href="/fr/confidentialite">politique de confidentialité</NextLink>.
        Thrax Legal prend les mesures techniques et organisationnelles
        appropriées pour protéger les données qui lui sont confiées et
        informe le client dans les meilleurs délais d’une violation de la
        sécurité des données le concernant qui présenterait un risque pour
        lui. Le client dispose des droits d’accès, de rectification et
        d’effacement décrits dans cette politique.
      </p>

      <h2>14. Communications électroniques</h2>
      <p>
        Les communications entre les parties, y compris les confirmations,
        factures, avis et modifications des CGV, se font valablement par
        email à l’adresse indiquée par le client dans son compte ou à{" "}
        <a href="mailto:hey@thrax-legal.ch">hey@thrax-legal.ch</a>. Le client
        tient son adresse à jour.
      </p>

      <h2>15. Force majeure</h2>
      <p>
        Le prestataire ne peut être tenu responsable d’un retard ou d’une
        inexécution résultant d’un événement échappant à son contrôle
        raisonnable (notamment maladie grave, panne d’un service technique
        tiers, cyberattaque, décision d’une autorité). Les délais sont
        prolongés d’autant et, si l’empêchement dépasse 30 jours, chaque
        partie peut résilier le contrat avec remboursement de la période
        payée et non utilisée.
      </p>

      <h2>16. Modification des présentes conditions</h2>
      <p>
        Thrax Legal peut modifier les CGV. Les modifications importantes sont
        annoncées au client par email au moins 30 jours avant leur entrée en
        vigueur&nbsp;; elles s’appliquent alors à la période suivante, et le
        client qui ne les accepte pas peut résilier l’abonnement avant cette
        date. Les abonnements en cours restent régis par la version acceptée
        pour la période déjà payée. La date de dernière mise à jour figure en
        haut de cette page.
      </p>

      <h2>17. Dispositions finales</h2>
      <p>
        Les CGV et les éléments de l’offre acceptée forment l’ensemble de
        l’accord des parties sur l’abonnement. Si une disposition est
        invalide ou inapplicable, les autres restent valables et les parties
        la remplacent par une disposition valable de portée économique
        équivalente. Thrax Legal peut transférer le contrat à un successeur
        ou à une société qu’il constituerait pour poursuivre l’activité, avec
        information du client, qui conserve son droit de résiliation. Les CGV
        sont disponibles en français, en allemand, en anglais et en italien&nbsp;;
        en cas de divergence, la version française fait foi.
      </p>

      <h2>18. Droit applicable et for juridique</h2>
      <p>
        Les présentes conditions et le contrat sont soumis au{" "}
        <strong>droit suisse</strong>, à l’exclusion de ses règles de conflit de
        lois. Tout litige relatif à leur conclusion, leur interprétation ou
        leur exécution relève de la compétence exclusive des tribunaux
        ordinaires du canton de <strong>Vaud</strong>, à Lausanne.
      </p>
    </>
  );
}

function De() {
  return (
    <>
      <h2>1. Geltungsbereich und Annahme</h2>
      <p>
        Diese Allgemeinen Geschäftsbedingungen (die «&nbsp;AGB&nbsp;») regeln jedes
        auf dieser Website abgeschlossene Abonnement und jede von Thrax Legal
        erbrachte Leistung. Dieses Angebot richtet sich an{" "}
        <strong>Selbstständige und juristische Personen</strong> (Unternehmen,
        Vereine), die zu beruflichen Zwecken handeln. Es ist nicht für
        Konsumentinnen und Konsumenten bestimmt. Mit der Erstellung eines
        Kontos und dem Anklicken des Annahmefelds bestätigt der Kunde, die
        AGB gelesen und akzeptiert zu haben und zu beruflichen Zwecken zu
        handeln. Abweichende Bedingungen des Kunden gelten nur bei
        schriftlicher Zustimmung von Thrax Legal.
      </p>

      <h2>2. Angaben zum Anbieter</h2>
      <p>
        «&nbsp;Thrax Legal&nbsp;» ist der Handelsname, unter dem{" "}
        <strong>Grégoire Giuliano</strong>, natürliche Person mit
        Wohnsitz in Belgien (Unternehmensnummer BCE&nbsp;: wird zugeteilt,
        Kontaktadresse&nbsp;: Avenue Floréal 20, 1410 Waterloo, Belgien), die auf dieser
        Website beschriebenen Leistungen anbietet. Es handelt sich nicht um
        eine eigenständige Gesellschaft. Kontakt&nbsp;:{" "}
        <a href="mailto:hey@thrax-legal.ch">hey@thrax-legal.ch</a>.
      </p>

      <h2>3. Art der Leistung und Grenzen</h2>
      <p>
        Thrax Legal erbringt für seine Kunden schriftlich und mündlich
        rechtliche Informationen und Unterstützung zu alltäglichen Fragen
        eines Unternehmens nach Schweizer Recht (siehe Artikel 4). Das
        Verhältnis der Parteien untersteht den Regeln des{" "}
        <strong>Auftrags</strong> (Art. 394 ff. des Obligationenrechts,
        «&nbsp;OR&nbsp;»): Thrax Legal verpflichtet sich, den Auftrag sorgfältig
        und getreu auszuführen (Art. 398 OR), <strong>garantiert aber kein
        Ergebnis</strong>, insbesondere nicht den Ausgang einer Verhandlung,
        eines Streits oder eines behördlichen Entscheids.
      </p>
      <p>
        <strong>Thrax Legal ist keine Anwaltskanzlei.</strong> Der Anbieter
        ist in keinem kantonalen Anwaltsregister eingetragen und führt den
        Titel «Anwalt» nicht. Er übernimmt keine berufsmässige Vertretung vor
        Gerichten und Behörden, die den Anwältinnen und Anwälten vorbehalten
        ist, und erstellt keine anderen Berufen vorbehaltenen Akte (zum
        Beispiel öffentliche Urkunden). Aussergewöhnliche Vorgänge
        (Kapitalerhöhung, Gerichtsverfahren, Restrukturierung, Fusionen und
        Übernahmen), ausländisches Recht und Steuerberatung sind nicht
        inbegriffen: Gegebenenfalls verweist Thrax Legal den Kunden vor jeder
        Bearbeitung an eine Anwältin, einen Anwalt oder einen anderen
        Spezialisten.
      </p>
      <p>
        <strong>Kein Anwaltsgeheimnis.</strong> Das strafrechtlich geschützte
        Berufsgeheimnis (Art. 321 des Strafgesetzbuchs) und die daraus
        folgenden Zeugnis- und Editionsverweigerungsrechte stehen den
        eingetragenen Anwältinnen und Anwälten und ihren Hilfspersonen zu;
        sie gelten nicht für den Austausch mit Thrax Legal. Dieser Austausch
        ist durch die Vertraulichkeitsverpflichtung in Artikel 9 geschützt,
        die einer gesetzlichen Pflicht oder der Anordnung einer zuständigen
        Behörde nicht entgegengehalten werden kann. Der Kunde berücksichtigt
        dies, bevor er besonders sensible Informationen übermittelt.
      </p>
      <p>
        <strong>Einsatz künstlicher Intelligenz.</strong> Thrax Legal verwendet
        Tools der künstlichen Intelligenz, derzeit den Assistenten Claude der
        Anthropic, PBC (USA), um die Angaben und Dokumente des Kunden zu
        analysieren und die Antworten und Ergebnisse vorzubereiten, die Thrax
        Legal überprüft und für die es dem Kunden allein verantwortlich
        bleibt. Mit der Annahme der AGB und dem Anklicken des dafür
        vorgesehenen Felds bei der Kontoerstellung <strong>willigt der Kunde
        ausdrücklich ein</strong>, dass seine Angaben und Dokumente (einschliesslich
        der darin enthaltenen Personendaten Dritter) zu diesem Zweck an diesen
        Dienstleister übermittelt werden. Diese Verarbeitung ist für den
        Dienst erforderlich: Wer nicht einwilligt, kann nicht abschliessen, und
        wer seine Einwilligung während des Vertrags widerruft, beendet das
        Abonnement gemäss Artikel 10. Thrax Legal konfiguriert seine Tools so, dass die Daten des Kunden nicht zum Training der Modelle verwendet und vom Anbieter nur für begrenzte Zeit aufbewahrt werden; die Übermittlung in die USA beruht auf der ausdrücklichen Einwilligung des Kunden und, je nach genutztem Angebot, auf den Standardvertragsklauseln des Anbieters. Der Kunde vermeidet die
        Übermittlung unnötiger Daten, insbesondere sensibler Daten
        (Gesundheit, Meinungen, Straf- oder Verwaltungsverfahren), ausser wenn
        seine Anfrage dies erfordert. Einzelheiten stehen in der
        Datenschutzerklärung.
      </p>
      <p>
        Die allgemeinen Informationen zum Schweizer Recht auf dieser Website
        (Ratgeber, häufige Fragen, Hinweise auf Gesetze oder Rechtsprechung)
        dienen nur der Information, ohne Gewähr für Vollständigkeit,
        Aktualität oder Anwendbarkeit auf einen Einzelfall, und stellen keine
        persönliche Rechtsberatung dar.
      </p>

      <h2>4. Formeln, Volumen und Preise</h2>
      <p>
        <strong>Essentiel</strong>: CHF 149 pro Monat. Umfasst 10 schnelle Fragen pro Monat, 5 vollständige Anliegen pro Monat, bearbeitet innert 72 Arbeitsstunden sowie ein Telefon- oder Videogespräch zur Klärung jedes Anliegens.
      </p>
      <p>
        <strong>Croissance</strong>: CHF 349 pro Monat. Umfasst 30 schnelle Fragen pro Monat, 12 vollständige Anliegen pro Monat, bearbeitet innert 48 Arbeitsstunden (24 Stunden bei als solche gemeldeten Notfällen), ein Telefon- oder Videogespräch zur Klärung jedes Anliegens und eine im Preis inbegriffene prioritäre Vertragsprüfung pro Monat.
      </p>
      <p>
        <strong>Schnelle Frage.</strong> Eine schnelle Frage ist eine präzise Frage zu einer Situation, die Thrax Legal in wenigen Zeilen schriftlich beantwortet, ohne Lesen oder Verfassen eines Dokuments und ohne vertiefte Recherche (höchstens rund 15 Minuten Arbeit). Erfordert die Antwort das Lesen eines Dokuments, eine vertiefte Recherche oder ein Verfassen, ist die Anfrage ein Anliegen; der Kunde wird vor jeder Bearbeitung informiert. Folgefragen zu einem gelieferten Anliegen, die innert 14 Tagen nach Lieferung gestellt werden, werden nicht angerechnet. Über die in der Formel enthaltene Anzahl schneller Fragen hinaus wird die Frage im Folgemonat bearbeitet oder, nach Wahl des Kunden, als Anliegen angerechnet.
      </p>
      <p>
        <strong>Anliegen.</strong> Ein Anliegen ist eine vollständige Arbeit mit schriftlichem Ergebnis (zum Beispiel: Erstellung oder Prüfung eines Vertrags, Mahnung, Lösung eines Streitfalls mit einer Partei, Erstellung von Allgemeinen Geschäftsbedingungen oder einer Datenschutzerklärung, Analyse eines Geschäftsmietvertrags). Es umfasst die Klärung, das Ergebnis und eine Korrekturrunde, die innert 14 Tagen nach Lieferung verlangt wird.
      </p>
      <p>
        <strong>Zählung der Anliegen.</strong> Eine Anfrage zählt als zwei oder mehr Anliegen, wenn sie mehrere getrennte Ergebnisse betrifft (zum Beispiel einen Arbeitsvertrag und ein Personalreglement), mehrere getrennte Parteien (zum Beispiel zwei Angestellte oder zwei Schuldner) oder ein Dokument von mehr als 20 Seiten (ein zusätzliches Anliegen pro angefangene 20 Seiten). Eine neue Anfrage zu einem anderen Thema nach der Lieferung eines Anliegens ist ein neues Anliegen. Vor Beginn bestätigt Thrax Legal dem Kunden schriftlich, wie viele Anliegen seine Anfrage zählt; der Kunde kann sie dann präzisieren, verkleinern oder darauf verzichten, bevor etwas angerechnet wird.
      </p>
      <p>
        <strong>Monatliche Volumen.</strong> Die enthaltenen Volumen gelten pro
        Abonnementsmonat und werden nicht auf den Folgemonat übertragen.
        Jedes vollständige Anliegen über das in der gewählten Formel
        enthaltene Volumen hinaus wird nach Zustimmung des Kunden zu CHF 79,
        Fixpreis, unabhängig von seiner Komplexität, verrechnet.
      </p>
      <p>
        <strong>Klärungsgespräch.</strong> Jedes vollständige Anliegen umfasst
        nach Terminvereinbarung ein Telefon- oder Videogespräch zur Klärung
        von 15 Minuten in der Formel Essentiel und 30 Minuten in der Formel
        Croissance, in dem der Kunde seine Situation mündlich schildert.
        Antwort, Beratung und Dokumente werden anschliessend schriftlich
        geliefert. Der Kunde kann auf dieses Gespräch verzichten und seine
        Situation schriftlich schildern.
      </p>
      <p>
        <strong>Preise.</strong> Die Preise verstehen sich in Schweizer Franken
        (CHF) und <strong>ohne Mehrwertsteuer</strong>. Solange der Anbieter der
        Schweizer Mehrwertsteuer nicht unterstellt ist, wird keine
        Schweizer Mehrwertsteuer verrechnet; wird er ihr unterstellt, wird
        die gesetzliche Mehrwertsteuer ab der Unterstellung zu den Preisen
        hinzugerechnet, nach vorheriger Information des Kunden. Allfällige
        beim Kunden geschuldete Abgaben auf aus dem Ausland erbrachte
        Leistungen (insbesondere die Bezugsteuer) gehen zu seinen Lasten.
      </p>

      <h2>5. Online-Vertragsabschluss</h2>
      <p>
        Der Vertrag kommt in Schritten zustande: (1) Der Kunde wählt eine
        Formel und füllt das Formular zur Kontoerstellung aus; (2) er liest
        die AGB, akzeptiert sie durch Anklicken des vorgesehenen Felds und
        sendet das Formular ab; (3) Thrax Legal bestätigt ihm den Eingang
        seiner Anfrage unverzüglich per E-Mail; (4) der Vertrag kommt zustande
        und der Kundenbereich wird mit Eingang der ersten Zahlung
        freigeschaltet, worüber Thrax Legal den Kunden per E-Mail
        informiert. Vor dem Absenden des Formulars kann der Kunde seine
        Angaben durch Ändern der betreffenden Felder korrigieren; nach dem
        Absenden kann er eine Korrektur unter{" "}
        <a href="mailto:hey@thrax-legal.ch">hey@thrax-legal.ch</a> verlangen.
        Thrax Legal kann eine Abonnementsanfrage vor ihrer Aktivierung ohne
        Entschädigung für beide Seiten ablehnen. Die bei Abschluss geltenden
        AGB können auf dieser Seite eingesehen und ausgedruckt werden; dem
        Kunden wird empfohlen, sie aufzubewahren.
      </p>

      <h2>6. Dauer, Zahlung und Preisbindung</h2>
      <p>
        Das Abonnement besteht aus im Voraus bezahlten Monatsperioden. Es
        besteht <strong>keine Mindestvertragsdauer</strong>. Die Zahlung
        erfolgt derzeit per Banküberweisung oder auf anderem mit dem Kunden
        vereinbarten Weg; Thrax Legal informiert den Kunden vor der
        Einführung einer Online-Zahlung oder einer automatischen Abbuchung.
        Die bezahlte Periode öffnet den Zugang zum Kundenbereich und zu den
        Volumen der Formel. Das Abonnement wird mit Eingang der Zahlung für
        eine weitere Monatsperiode verlängert; bleibt die Zahlung bei
        Fälligkeit aus, endet es mit Ablauf der bezahlten Periode und der
        Zugang zum Kundenbereich wird ausgesetzt. Bereits gespeicherte
        Anliegen und Nachrichten bleiben erhalten und sind mit der
        Verlängerung wieder zugänglich.
      </p>
      <p>
        Ausserhalb der bezahlten Periode verrechnete Beträge (zum Beispiel ein
        zusätzliches Anliegen zu CHF 79) sind innert 30 Tagen nach
        Rechnungsstellung zahlbar; bei Fälligkeit ist der Kunde ohne Mahnung
        im Verzug und schuldet Verzugszins von 5&nbsp;% pro Jahr (Art. 102 Abs. 2
        und 104 OR).
      </p>
      <p>
        Der vom Kunden bei Abschluss bezahlte Preis bleibt unverändert,
        solange sein Abonnement ohne Unterbruch aktiv bleibt, auch wenn
        Thrax Legal die Tarife für Neukunden erhöht. Eine Kündigung mit
        anschliessendem Neuabschluss oder eine nicht verlängerte Periode
        gilt als neues Abonnement und unterliegt den zu diesem Zeitpunkt
        geltenden Tarifen.
      </p>
      <p>
        Der Kunde kann per einfacher E-Mail die Aussetzung seines Abonnements
        für höchstens 2 Monate pro Kalenderjahr verlangen. Während der
        Aussetzung ist keine Zahlung geschuldet und es werden keine neuen
        Anliegen bearbeitet; der in diesem Artikel genannte fixierte Preis
        bleibt erhalten. Die Aussetzung ist keine Kündigung: Das Abonnement
        läuft nach Ablauf der verlangten Frist gegen Zahlung der folgenden
        Periode weiter.
      </p>

      <h2>7. Bearbeitungsfristen</h2>
      <p>
        Jedes vollständige Anliegen wird innert der für die gewählte Formel
        angegebenen Frist bearbeitet (72 Arbeitsstunden bei Essentiel, 48
        Arbeitsstunden bei Croissance, 24 Stunden bei in der Formel
        Croissance gemeldeten Notfällen), ab Eingang aller für die
        Bearbeitung nötigen Angaben und Unterlagen. Schnelle Fragen erhalten
        innert 48 Arbeitsstunden eine schriftliche Antwort (24 Arbeitsstunden
        in der Formel Croissance). Arbeitsstunden verstehen sich von Montag
        bis Freitag, ausser Samstagen, Sonntagen und Feiertagen in der
        Westschweiz. Diese Fristen sind Serviceziele; eine Überschreitung
        begründet nur Anspruch auf bevorzugte Bearbeitung, unbeschadet von
        Artikel 11 bei Verschulden.
      </p>

      <h2>8. Pflichten des Kunden</h2>
      <p>
        Der Kunde liefert vollständige, richtige und aktuelle Angaben und
        Unterlagen und übermittelt sie rechtzeitig. Er allein ist für die
        Richtigkeit der mitgeteilten Tatsachen und für die Verwendung der
        erhaltenen Antworten und Dokumente verantwortlich.{" "}
        <strong>Er gibt bei der Einreichung seiner Anfrage jede laufende
        gesetzliche, vertragliche oder gerichtliche Frist an</strong> (zum
        Beispiel eine Rechtsmittel-, Einsprache-, Kündigungs- oder
        Verjährungsfrist) und wählt in der Formel Croissance die
        Dringlichkeitsoption, wenn sie sich aufdrängt; Thrax Legal haftet nicht
        für eine abgelaufene Frist, die ihm nicht rechtzeitig gemeldet wurde.
      </p>
      <p>
        Der Kunde garantiert, berechtigt zu sein, die von ihm eingereichten
        Dokumente und Personendaten Dritter zu übermitteln, und informiert
        diese Dritten gemäss den Datenschutzvorschriften. Er reicht keine
        gesetzeswidrige oder auf Schädigung eines Dritten gerichtete Anfrage
        ein. Er hält sein Passwort geheim, verwendet nur ein Konto pro
        Abonnement, haftet für die mit seinem Konto vorgenommenen Handlungen
        und informiert Thrax Legal unverzüglich über jeden unbefugten Zugriff.
      </p>
      <p>
        Thrax Legal kann eine Anfrage ablehnen oder abbrechen, die gegen das
        Gesetz oder seine Grundsätze verstösst, den Anbieter einem
        Interessenkonflikt aussetzen würde (insbesondere wenn die Gegenpartei
        bereits Kundin ist) oder eine offensichtlich missbräuchliche Nutzung
        des Dienstes darstellt. Die Anfrage wird dann nicht angerechnet und
        der Kunde wird schriftlich informiert.
      </p>

      <h2>9. Vertraulichkeit</h2>
      <p>
        Thrax Legal behandelt alle Tatsachen, Dokumente und Informationen, die
        der Kunde ihm anvertraut, vertraulich, verwendet sie nur zur
        Ausführung des Auftrags und gibt sie nur an Personen oder technische
        Dienstleister weiter, die sie zur Leistungserbringung benötigen und
        zu gleichwertiger Vertraulichkeit verpflichtet sind. Diese
        Verpflichtung gilt nicht für bereits öffentliche Informationen und
        nicht für eine gesetzlich oder durch eine zuständige Behörde
        verlangte Bekanntgabe (siehe Artikel 3). Die Übermittlung an den in Artikel 3 genannten KI-Anbieter ist zulässig und verletzt diese Verpflichtung nicht. Sie besteht nach
        Vertragsende fort.
      </p>

      <h2>10. Kündigung, Ablehnung und Rückerstattung</h2>
      <p>
        Gemäss Artikel 404 OR kann jede Partei den Vertrag jederzeit ohne
        Angabe von Gründen und ohne Strafe beenden. Der Kunde kündigt per
        einfacher E-Mail an{" "}
        <a href="mailto:hey@thrax-legal.ch">hey@thrax-legal.ch</a> oder indem
        er die folgende Periode nicht verlängert; die Kündigung wird zum Ende
        der bereits bezahlten Monatsperiode wirksam, und der Kunde behält
        seine Rechte bis zu diesem Datum. Der laufende Monat wird nicht
        anteilig zurückerstattet. Der Kunde kann ausserdem jederzeit die
        Formel wechseln, mit Wirkung ab der nächsten Verlängerung.
      </p>
      <p>
        Thrax Legal kann das Abonnement mit einer Frist von 14 Tagen auf das
        Ende einer Periode oder aus wichtigem Grund fristlos kündigen
        (insbesondere bei schwerer Verletzung der AGB, missbräuchlicher oder
        rechtswidriger Nutzung oder Nichtzahlung eines verrechneten Betrags
        nach Mahnung). Kündigt Thrax Legal ohne Verschulden des Kunden, wird
        der Preis der bezahlten, aber nicht genutzten Periode anteilig
        zurückerstattet.
      </p>
      <p>
        Fällt ein bestimmtes Anliegen offensichtlich nicht in den in Artikel
        3 oder Artikel 4 beschriebenen Bereich, informiert Thrax Legal den
        Kunden vor jeder Bearbeitung und verweist ihn an eine Anwältin oder
        einen Anwalt, statt eine ungeeignete Leistung zu verrechnen.
      </p>

      <h2>11. Haftung</h2>
      <p>
        Thrax Legal haftet für die sorgfältige und getreue Ausführung seines
        Auftrags (Art. 398 OR). Die gelieferten schriftlichen Antworten und
        Dokumente werden anhand der vom Kunden mitgeteilten Informationen
        erstellt; deren Richtigkeit und Vollständigkeit liegt in der
        Verantwortung des Kunden. Thrax Legal garantiert den Ausgang einer
        rechtlichen Situation nicht, der von den Tatsachen des Einzelfalls
        und gegebenenfalls von der Beurteilung einer Behörde, eines Gerichts
        oder eines Dritten abhängt.
      </p>
      <p>
        Soweit gesetzlich zulässig, ist die Haftung des Anbieters, für alle
        Schäden zusammen, auf den Betrag beschränkt, den der Kunde in den
        zwölf Monaten vor dem schädigenden Ereignis tatsächlich bezahlt hat,
        und indirekte oder Folgeschäden (insbesondere entgangener Gewinn,
        verlorene Chancen oder Verträge) sind ausgeschlossen. Diese
        Beschränkung gilt nicht bei Absicht oder grober Fahrlässigkeit (Art.
        100 Abs. 1 OR), nicht für Personenschäden und nicht in den übrigen
        Fällen, in denen das Gesetz keine Haftungsbeschränkung zulässt. Thrax
        Legal lehnt jede Haftung für einen Entscheid ab, der allein auf den
        allgemeinen Informationen der Website beruht.
      </p>
      <p>
        Weist ein Anliegen besondere Schwere oder Komplexität auf, kann Thrax
        Legal dem Kunden empfehlen, eine in einem Schweizer Anwaltsregister
        eingetragene Anwältin oder einen solchen Anwalt zu konsultieren,
        anstatt im Rahmen des Abonnements zu antworten.
      </p>

      <h2>12. Eigentum an den gelieferten Dokumenten</h2>
      <p>
        Die im Rahmen des Abonnements gelieferten schriftlichen Antworten und
        Dokumente dürfen vom Kunden, sobald die entsprechende Periode bezahlt
        ist, frei für die Bedürfnisse seiner eigenen Tätigkeit verwendet
        werden. Sie dürfen nicht als kommerzielle Vorlagen an Dritte
        weiterverkauft oder weitergegeben werden. Thrax Legal behält seine
        Rechte an seinen Methoden, Mustern, Vorlagen und seinem allgemeinen
        Know-how, ohne je den vertraulichen Inhalt eines Kunden
        wiederzuverwenden.
      </p>

      <h2>13. Datenschutz</h2>
      <p>
        Die Bearbeitung von Personendaten im Rahmen dieses Dienstes,
        einschliesslich der Datenspeicherung und der technischen Dienstleister,
        auf die Thrax Legal zurückgreift, ist in unserer{" "}
        <NextLink href="/de/confidentialite">Datenschutzerklärung</NextLink>{" "}
        beschrieben. Thrax Legal trifft angemessene technische und
        organisatorische Massnahmen zum Schutz der ihm anvertrauten Daten und
        informiert den Kunden so rasch wie möglich über eine ihn betreffende
        Verletzung der Datensicherheit, die ein Risiko für ihn darstellt.
        Der Kunde hat die in dieser Erklärung beschriebenen Rechte auf
        Auskunft, Berichtigung und Löschung.
      </p>

      <h2>14. Elektronische Kommunikation</h2>
      <p>
        Die Kommunikation zwischen den Parteien, einschliesslich
        Bestätigungen, Rechnungen, Mitteilungen und Änderungen der AGB,
        erfolgt gültig per E-Mail an die vom Kunden in seinem Konto
        angegebene Adresse oder an{" "}
        <a href="mailto:hey@thrax-legal.ch">hey@thrax-legal.ch</a>. Der Kunde
        hält seine Adresse aktuell.
      </p>

      <h2>15. Höhere Gewalt</h2>
      <p>
        Der Anbieter haftet nicht für Verzug oder Nichterfüllung infolge
        eines Ereignisses ausserhalb seiner vernünftigen Kontrolle
        (insbesondere schwere Krankheit, Ausfall eines technischen
        Drittdienstes, Cyberangriff, behördlicher Entscheid). Die Fristen
        verlängern sich entsprechend, und dauert das Hindernis länger als 30
        Tage, kann jede Partei den Vertrag unter Rückerstattung der bezahlten,
        nicht genutzten Periode kündigen.
      </p>

      <h2>16. Änderung dieser Bedingungen</h2>
      <p>
        Thrax Legal kann die AGB ändern. Wesentliche Änderungen werden dem
        Kunden mindestens 30 Tage vor ihrem Inkrafttreten per E-Mail
        mitgeteilt; sie gelten dann für die folgende Periode, und ein Kunde,
        der sie nicht akzeptiert, kann das Abonnement vor diesem Datum
        kündigen. Laufende Abonnements bleiben für die bereits bezahlte
        Periode der akzeptierten Fassung unterstellt. Das Datum der letzten
        Aktualisierung steht oben auf dieser Seite.
      </p>

      <h2>17. Schlussbestimmungen</h2>
      <p>
        Die AGB und die Elemente des angenommenen Angebots bilden die
        gesamte Vereinbarung der Parteien über das Abonnement. Ist eine
        Bestimmung ungültig oder undurchführbar, bleiben die übrigen gültig,
        und die Parteien ersetzen sie durch eine gültige Bestimmung von
        gleichwertiger wirtschaftlicher Tragweite. Thrax Legal kann den Vertrag
        auf einen Nachfolger oder auf eine zur Fortführung der Tätigkeit
        gegründete Gesellschaft übertragen, unter Information des Kunden, der
        sein Kündigungsrecht behält. Die AGB sind auf Französisch, Deutsch,
        Englisch und Italienisch verfügbar; bei Abweichungen ist die
        französische Fassung massgebend.
      </p>

      <h2>18. Anwendbares Recht und Gerichtsstand</h2>
      <p>
        Diese Bedingungen und der Vertrag unterstehen dem{" "}
        <strong>schweizerischen Recht</strong> unter Ausschluss seiner
        Kollisionsnormen. Jeder Streit über ihren Abschluss, ihre Auslegung
        oder ihre Erfüllung fällt in die ausschliessliche Zuständigkeit der
        ordentlichen Gerichte des Kantons <strong>Waadt</strong> in Lausanne.
      </p>
    </>
  );
}

function En() {
  return (
    <>
      <h2>1. Scope and acceptance</h2>
      <p>
        These terms and conditions (the &ldquo;Terms&rdquo;) govern every
        subscription taken out on this site and every service provided by Thrax
        Legal. The service is reserved for{" "}
        <strong>self-employed individuals and legal entities</strong>{" "}
        (companies, associations) acting for the purposes of their professional
        activity. It is not intended for consumers. By creating an account and
        ticking the acceptance box, the customer confirms that they have read
        and accepted the Terms and that they act for professional purposes. The
        customer&rsquo;s own terms do not apply unless Thrax Legal accepts them
        in writing.
      </p>

      <h2>2. Identity of the provider</h2>
      <p>
        &ldquo;Thrax Legal&rdquo; is the trade name under which{" "}
        <strong>Grégoire Giuliano</strong>, an individual resident in
        Belgium (business number BCE: being assigned, contact address: Avenue
        Floréal 20, 1410 Waterloo, Belgium), provides the services described
        on this site. It is not a separate company. Contact:{" "}
        <a href="mailto:hey@thrax-legal.ch">hey@thrax-legal.ch</a>.
      </p>

      <h2>3. Nature of the service and limits</h2>
      <p>
        Thrax Legal provides its customers, in writing and orally, with legal
        information and assistance on everyday business questions under Swiss
        law (see section 4). The relationship between the parties is governed
        by the rules on the <strong>mandate</strong> (Art. 394 et seq. of the
        Swiss Code of Obligations, &ldquo;CO&rdquo;): Thrax Legal undertakes to
        carry out its assignment with diligence and loyalty (Art. 398 CO) but{" "}
        <strong>does not guarantee any result</strong>, in particular the outcome
        of a negotiation, a dispute or an authority&rsquo;s decision.
      </p>
      <p>
        <strong>Thrax Legal is not a law firm.</strong> The provider is not
        registered in any cantonal register of lawyers and does not use the
        title of lawyer. It does not provide professional representation before
        courts and authorities, which is reserved to lawyers, and does not draw
        up acts reserved to other professions (for example notarial deeds).
        Exceptional matters (fundraising, court litigation, restructuring,
        mergers and acquisitions), foreign law and tax advice are not included:
        where relevant, Thrax Legal refers the customer to a lawyer or another
        specialist before any work starts.
      </p>
      <p>
        <strong>No lawyer&rsquo;s professional secrecy.</strong> Professional
        secrecy protected by criminal law (Art. 321 of the Swiss Criminal Code)
        and the resulting rights to refuse to testify or to cooperate benefit
        registered lawyers and their auxiliaries; they do not apply to
        exchanges with Thrax Legal. Those exchanges are protected by the
        confidentiality undertaking in section 9, which cannot be raised
        against a legal obligation or an order of a competent authority. The
        customer takes this into account before sending particularly sensitive
        information.
      </p>
      <p>
        <strong>Use of artificial intelligence.</strong> Thrax Legal uses
        artificial intelligence tools, currently the Claude assistant from
        Anthropic, PBC (United States), to analyse the customer&rsquo;s
        information and documents and to prepare answers and deliverables,
        which Thrax Legal reviews and for which it remains solely responsible
        towards the customer. By accepting the Terms and ticking the dedicated
        box when creating their account, the customer{" "}
        <strong>expressly consents</strong> to their information and documents
        (including any third-party personal data they contain) being sent to
        this provider for that purpose. This processing is necessary for the
        service: a customer who does not consent cannot subscribe, and one who
        withdraws consent during the contract ends the subscription under
        section 10. Thrax Legal configures its tools so that customer data is not used to train the models and is kept by the provider only for a limited period; the transfer to the United States relies on the customer&rsquo;s express consent and, depending on the plan used, on the provider&rsquo;s standard contractual clauses. The customer avoids sending
        unnecessary data, in particular sensitive data (health, opinions,
        criminal or administrative proceedings), unless their request requires
        it. Details are in the privacy policy.
      </p>
      <p>
        The general information on Swiss law on this site (guide, frequently
        asked questions, legal or case-law references) is provided for
        information only, without any guarantee of completeness, currency or
        applicability to a particular case, and does not constitute
        personalised legal advice.
      </p>

      <h2>4. Plans, volumes and prices</h2>
      <p>
        <strong>Essential</strong>: CHF 149 per month. Includes 10 quick questions per month, 5 full matters per month handled within 72 business hours and a call or video briefing for each matter.
      </p>
      <p>
        <strong>Growth</strong>: CHF 349 per month. Includes 30 quick questions per month, 12 full matters per month handled within 48 business hours (24 hours for urgent cases flagged as such), a call or video briefing for each matter and one priority contract review included each month.
      </p>
      <p>
        <strong>Quick question.</strong> A quick question is a precise question about a situation, which Thrax Legal answers in writing in a few lines, without reading or drafting a document and without in-depth research (about 15 minutes of work at most). If the answer requires reading a document, in-depth research or drafting, the request is a matter; the customer is informed before any work starts. Follow-up questions on a delivered matter, asked within 14 days of delivery, are not counted. Beyond the number of quick questions included in the plan, the question is handled the following month or, at the customer&rsquo;s choice, counted as a matter.
      </p>
      <p>
        <strong>Matter.</strong> A matter is a complete piece of work resulting in a written deliverable (for example: drafting or reviewing a contract, a formal demand, settling a dispute with one party, drafting general terms and conditions or a privacy policy, analysing a commercial lease). It includes the briefing, the deliverable and one round of corrections requested within 14 days of delivery.
      </p>
      <p>
        <strong>Counting matters.</strong> A request counts as two or more matters when it covers several separate deliverables (for example an employment contract and a staff policy), several separate parties (for example two employees or two debtors) or a document of more than 20 pages (one extra matter per 20 pages started). A new request on a different subject made after a matter has been delivered is a new matter. Before starting, Thrax Legal confirms to the customer in writing how many matters the request counts as; the customer may then clarify, reduce or withdraw it before anything is counted.
      </p>
      <p>
        <strong>Monthly volumes.</strong> The included volumes are counted per
        subscription month and are not carried over to the following month.
        Any full matter beyond the volume included in the chosen plan is billed
        at CHF 79, fixed price, regardless of complexity, after the
        customer&rsquo;s agreement.
      </p>
      <p>
        <strong>Briefing call.</strong> Each full matter includes a briefing call
        or video call, by appointment, of 15 minutes on the Essential plan and
        30 minutes on the Growth plan, during which the customer explains their
        situation orally. The answer, advice and documents are then provided in
        writing. The customer may waive this call and describe their situation
        in writing.
      </p>
      <p>
        <strong>Prices.</strong> Prices are stated in Swiss francs (CHF) and are{" "}
        <strong>exclusive of value added tax</strong>. No Swiss VAT is charged
        as long as the provider is not subject to it; if the provider becomes
        subject to it, statutory VAT is added to the prices from that date,
        with prior notice to the customer. Any taxes due on the customer&rsquo;s
        side on services supplied from abroad (in particular acquisition tax)
        remain for the customer&rsquo;s account.
      </p>

      <h2>5. Concluding the contract online</h2>
      <p>
        The contract is concluded in steps: (1) the customer chooses a plan and
        fills in the account creation form; (2) they read and accept the Terms
        by ticking the box provided, then submit the form; (3) Thrax Legal
        promptly confirms receipt of the request by email; (4) the contract is
        concluded and the client area is activated when the first payment is
        received, which Thrax Legal confirms to the customer by email. Before
        submitting the form, the customer can correct their details by editing
        the relevant fields; after submission, they can request a correction at{" "}
        <a href="mailto:hey@thrax-legal.ch">hey@thrax-legal.ch</a>. Thrax Legal
        may refuse a subscription request before activation, without
        compensation on either side. The Terms applicable when the subscription
        is taken out can be viewed and printed on this page; the customer is
        invited to keep a copy.
      </p>

      <h2>6. Term, payment and locked price</h2>
      <p>
        The subscription consists of monthly periods paid in advance. There is{" "}
        <strong>no minimum commitment</strong>. Payment is currently made by bank
        transfer or by another means agreed with the customer; Thrax Legal will
        inform the customer before introducing online payment or automatic
        debit. The paid period gives access to the client area and to the
        volumes of the plan. The subscription is renewed for a further monthly
        period when payment for it is received; if payment is not received by
        the due date, it ends when the paid period expires and access to the
        client area is suspended. Matters and exchanges already recorded are
        kept and become accessible again upon renewal.
      </p>
      <p>
        Amounts invoiced outside the paid period (for example an additional
        matter at CHF 79) are payable within 30 days of the invoice; on the due
        date the customer is in default without a reminder and owes default
        interest of 5% per year (Art. 102 para. 2 and 104 CO).
      </p>
      <p>
        The price paid by the customer when subscribing remains unchanged as
        long as the subscription stays active without interruption, even if
        Thrax Legal raises its prices for new customers. A cancellation followed
        by a new subscription, or a period that is not renewed, is treated as a
        new subscription, subject to the prices in force at that time.
      </p>
      <p>
        The customer may ask, by simple email, to suspend their subscription for
        a maximum of 2 months per calendar year. During the suspension no
        payment is due and no new matter is taken on; the locked price referred
        to in this section is kept. Suspension is not a cancellation: the
        subscription resumes at the end of the requested period, on payment of
        the following period.
      </p>

      <h2>7. Turnaround times</h2>
      <p>
        Each full matter is handled within the time stated for the chosen plan
        (72 business hours for Essential, 48 business hours for Growth, 24 hours
        for urgent cases flagged on the Growth plan), counted from receipt of
        all the information and documents needed to handle it. Quick questions
        receive a written answer within 48 business hours (24 business hours on
        the Growth plan). Business hours run from Monday to Friday, excluding
        Saturdays, Sundays and public holidays in French-speaking Switzerland.
        These times are service targets; missing one only entitles the customer
        to priority handling, without prejudice to section 11 in case of fault.
      </p>

      <h2>8. Customer obligations</h2>
      <p>
        The customer provides complete, accurate and up-to-date information and
        documents and sends them in good time. They alone are responsible for
        the accuracy of the facts communicated and for how they use the answers
        and documents received.{" "}
        <strong>When submitting a request, they state any legal, contractual or
        court deadline that is running</strong> (for example a deadline to
        appeal, object, terminate or a limitation period) and, on the Growth
        plan, select the urgent option when it is needed; Thrax Legal is not
        liable for a deadline that has expired because it was not reported in
        good time.
      </p>
      <p>
        The customer warrants that they are entitled to send the documents and
        the third parties&rsquo; personal data they submit, and informs those
        third parties as required by data protection law. They do not submit
        any request that is unlawful or intended to harm a third party. They
        keep their password confidential, use only one account per subscription,
        are responsible for actions taken with their account and inform Thrax
        Legal without delay of any unauthorised access.
      </p>
      <p>
        Thrax Legal may decline or stop a request that would be unlawful or
        contrary to its principles, that would expose the provider to a
        conflict of interest (in particular where the opposing party is already
        a customer) or that would be a manifestly abusive use of the service.
        The request is then not counted and the customer is informed in
        writing.
      </p>

      <h2>9. Confidentiality</h2>
      <p>
        Thrax Legal treats all facts, documents and information the customer
        entrusts to it as confidential, uses them only to carry out the
        assignment and discloses them only to persons or technical providers who
        need them to deliver the service and are bound by equivalent
        confidentiality. This undertaking does not apply to information that is
        already public, nor to a disclosure required by law or by a competent
        authority (see section 3). Transmission to the artificial intelligence provider referred to in section 3 is permitted and does not breach this undertaking. It continues after the contract ends.
      </p>

      <h2>10. Termination, refusal and refunds</h2>
      <p>
        In accordance with Article 404 CO, each party may end the contract at any
        time, without giving reasons and without penalty. The customer
        terminates by simple email to{" "}
        <a href="mailto:hey@thrax-legal.ch">hey@thrax-legal.ch</a> or by not
        renewing the next period; termination takes effect at the end of the
        monthly period already paid, and the customer keeps their rights until
        that date. The current month is not refunded pro rata. The customer may
        also change plan at any time, effective from the next renewal.
      </p>
      <p>
        Thrax Legal may terminate the subscription on 14 days&rsquo; notice for
        the end of a period, or immediately for good cause (in particular
        serious breach of the Terms, abusive or unlawful use, or non-payment of
        an invoiced amount after a reminder). If Thrax Legal terminates without
        fault on the customer&rsquo;s part, the price of the paid but unused
        period is refunded pro rata.
      </p>
      <p>
        If a specific matter proves manifestly outside the scope described in
        section 3 or section 4, Thrax Legal informs the customer before any work
        starts and refers them to a lawyer rather than billing an unsuitable
        service.
      </p>

      <h2>11. Liability</h2>
      <p>
        Thrax Legal is liable for the diligent and faithful performance of its
        assignment (Art. 398 CO). The written answers and documents provided are
        prepared from the information supplied by the customer; its accuracy and
        completeness are the customer&rsquo;s responsibility. Thrax Legal does
        not guarantee the outcome of a legal situation, which depends on the
        facts of each case and, where relevant, on the assessment of an
        authority, a court or a third party.
      </p>
      <p>
        To the extent permitted by law, the provider&rsquo;s liability, all
        damages combined, is limited to the amount actually paid by the customer
        during the twelve months preceding the damaging event, and indirect or
        consequential damages (in particular loss of profit, loss of a chance or
        of a contract) are excluded. This limitation does not apply in case of
        intent or gross negligence (Art. 100 para. 1 CO), nor to personal injury
        or in the other cases where the law does not allow liability to be
        limited. Thrax Legal disclaims all liability for a decision taken solely
        on the basis of the general information on the site.
      </p>
      <p>
        Where a matter is particularly serious or complex, Thrax Legal may
        recommend that the customer consult a lawyer registered with a Swiss bar
        rather than answering within the subscription.
      </p>

      <h2>12. Ownership of delivered documents</h2>
      <p>
        The written answers and documents delivered under the subscription, once
        the corresponding period has been paid, may be freely used by the
        customer for the needs of their own business. They may not be resold or
        redistributed to third parties as commercial templates. Thrax Legal
        keeps its rights in its methods, models, templates and general
        know-how, without ever reusing a customer&rsquo;s confidential content.
      </p>

      <h2>13. Data protection</h2>
      <p>
        The processing of personal data under this service, including data
        hosting and the technical providers Thrax Legal uses, is described in our{" "}
        <NextLink href="/en/confidentialite">privacy policy</NextLink>. Thrax
        Legal takes appropriate technical and organisational measures to protect
        the data entrusted to it and informs the customer as soon as possible of
        any data security breach concerning them that poses a risk to them. The
        customer has the rights of access, rectification and erasure described
        in that policy.
      </p>

      <h2>14. Electronic communications</h2>
      <p>
        Communications between the parties, including confirmations, invoices,
        notices and changes to the Terms, are validly made by email to the
        address the customer gave in their account or to{" "}
        <a href="mailto:hey@thrax-legal.ch">hey@thrax-legal.ch</a>. The customer
        keeps their address up to date.
      </p>

      <h2>15. Force majeure</h2>
      <p>
        The provider cannot be held liable for a delay or non-performance
        resulting from an event beyond its reasonable control (in particular
        serious illness, failure of a third-party technical service, cyberattack
        or a decision of an authority). Deadlines are extended accordingly and,
        if the impediment lasts more than 30 days, either party may terminate the
        contract with a refund of the paid but unused period.
      </p>

      <h2>16. Changes to these terms</h2>
      <p>
        Thrax Legal may amend the Terms. Significant changes are notified to the
        customer by email at least 30 days before they take effect; they then
        apply to the following period, and a customer who does not accept them
        may terminate the subscription before that date. Current subscriptions
        remain governed by the version accepted for the period already paid. The
        date of the last update appears at the top of this page.
      </p>

      <h2>17. Final provisions</h2>
      <p>
        The Terms and the elements of the accepted offer form the parties&rsquo;
        entire agreement on the subscription. If a provision is invalid or
        unenforceable, the others remain valid and the parties replace it with a
        valid provision of equivalent economic effect. Thrax Legal may transfer
        the contract to a successor or to a company it sets up to continue the
        business, with notice to the customer, who keeps their right to
        terminate. The Terms are available in French, German, English and
        Italian; in case of discrepancy, the French version prevails.
      </p>

      <h2>18. Governing law and jurisdiction</h2>
      <p>
        These Terms and the contract are governed by <strong>Swiss law</strong>,
        excluding its conflict-of-law rules. Any dispute relating to their
        conclusion, interpretation or performance falls within the exclusive
        jurisdiction of the ordinary courts of the canton of{" "}
        <strong>Vaud</strong>, in Lausanne.
      </p>
    </>
  );
}

function It() {
  return (
    <>
      <h2>1. Campo di applicazione e accettazione</h2>
      <p>
        Le presenti condizioni generali (le «&nbsp;CG&nbsp;») disciplinano ogni
        abbonamento sottoscritto su questo sito e ogni prestazione fornita da
        Thrax Legal. Il servizio è riservato a{" "}
        <strong>indipendenti e persone giuridiche</strong> (aziende,
        associazioni) che agiscono per le esigenze della propria attività
        professionale. Non è destinato ai consumatori. Creando un account e
        spuntando la casella di accettazione, il cliente conferma di aver letto
        e accettato le CG e di agire per fini professionali. Condizioni
        differenti del cliente non si applicano, salvo accettazione scritta di
        Thrax Legal.
      </p>

      <h2>2. Identificazione del prestatore</h2>
      <p>
        «&nbsp;Thrax Legal&nbsp;» è il nome commerciale con cui{" "}
        <strong>Grégoire Giuliano</strong>, persona fisica domiciliata
        in Belgio (numero d&rsquo;impresa BCE&nbsp;: in corso di attribuzione,
        indirizzo di contatto&nbsp;: Avenue Floréal 20, 1410 Waterloo, Belgio),
        offre i servizi descritti su questo sito. Non si tratta di
        una società distinta. Contatto&nbsp;:{" "}
        <a href="mailto:hey@thrax-legal.ch">hey@thrax-legal.ch</a>.
      </p>

      <h2>3. Natura del servizio e limiti</h2>
      <p>
        Thrax Legal fornisce ai propri clienti, per iscritto e oralmente,
        informazioni e assistenza giuridiche su questioni correnti della vita di
        un&rsquo;impresa secondo il diritto svizzero (vedi articolo 4). I rapporti
        tra le parti sono soggetti alle regole del <strong>mandato</strong>{" "}
        (art. 394 segg. del Codice delle obbligazioni, «&nbsp;CO&nbsp;»): Thrax Legal si
        impegna a eseguire l&rsquo;incarico con diligenza e fedeltà (art. 398 CO),
        ma <strong>non garantisce alcun risultato</strong>, in particolare
        l&rsquo;esito di una trattativa, di una controversia o di una decisione di
        un&rsquo;autorità.
      </p>
      <p>
        <strong>Thrax Legal non è uno studio legale.</strong> Il prestatore non
        è iscritto in alcun registro cantonale degli avvocati e non usa il
        titolo di avvocato. Non assicura la rappresentanza professionale davanti
        ai tribunali e alle autorità, riservata agli avvocati, e non redige atti
        riservati ad altre professioni (ad esempio atti pubblici). Le operazioni
        eccezionali (raccolta fondi, contenzioso giudiziario, ristrutturazione,
        fusioni e acquisizioni), il diritto estero e la consulenza fiscale non
        sono inclusi: se del caso, Thrax Legal orienta il cliente verso un
        avvocato o un altro specialista, prima di ogni trattamento.
      </p>
      <p>
        <strong>Nessun segreto professionale dell&rsquo;avvocato.</strong> Il segreto
        professionale tutelato penalmente (art. 321 del Codice penale) e i
        diritti di non testimoniare o di non collaborare che ne derivano
        spettano agli avvocati iscritti e ai loro ausiliari; non si applicano
        agli scambi con Thrax Legal. Tali scambi sono protetti dall&rsquo;impegno
        di riservatezza dell&rsquo;articolo 9, che non può essere opposto a un obbligo
        legale o all&rsquo;ordine di un&rsquo;autorità competente. Il cliente ne tiene
        conto prima di trasmettere informazioni particolarmente sensibili.
      </p>
      <p>
        <strong>Ricorso all&rsquo;intelligenza artificiale.</strong> Thrax Legal
        utilizza strumenti di intelligenza artificiale, attualmente
        l&rsquo;assistente Claude della società Anthropic, PBC (Stati Uniti), per
        analizzare le informazioni e i documenti del cliente e preparare le
        risposte e i risultati, che Thrax Legal rivede e di cui resta
        l&rsquo;unico responsabile nei confronti del cliente. Accettando le CG e
        spuntando la casella dedicata alla creazione dell&rsquo;account, il cliente{" "}
        <strong>acconsente espressamente</strong> a che le sue informazioni e i
        suoi documenti (compresi i dati personali di terzi in essi contenuti)
        siano trasmessi a questo fornitore a tale scopo. Questo trattamento è
        necessario al servizio: il cliente che non acconsente non può
        sottoscrivere, e chi ritira il consenso nel corso del contratto pone
        fine all&rsquo;abbonamento, secondo l&rsquo;articolo 10. Thrax Legal configura i propri strumenti in modo che i dati del cliente non servano ad addestrare i modelli e siano conservati dal fornitore solo per una durata limitata; il trasferimento verso gli Stati Uniti si basa sul consenso espresso del cliente e, a seconda dell&rsquo;offerta utilizzata, sulle clausole contrattuali tipo del fornitore. Il cliente evita di trasmettere
        dati non necessari, in particolare dati sensibili (salute, opinioni,
        procedimenti penali o amministrativi), salvo che la sua richiesta lo
        richieda. I dettagli figurano nell&rsquo;informativa sulla privacy.
      </p>
      <p>
        Le informazioni generali sul diritto svizzero presenti su questo sito
        (guida, domande frequenti, riferimenti legali o giurisprudenziali) sono
        fornite a titolo meramente informativo, senza garanzia di completezza,
        attualità o applicabilità a un caso particolare, e non costituiscono una
        consulenza giuridica personalizzata.
      </p>

      <h2>4. Formule, volumi e prezzi</h2>
      <p>
        <strong>Essentiel</strong>: CHF 149 al mese. Comprende 10 domande rapide al mese, 5 pratiche complete al mese gestite entro 72 ore lavorative e una chiamata o videochiamata di inquadramento per ogni pratica.
      </p>
      <p>
        <strong>Croissance</strong>: CHF 349 al mese. Comprende 30 domande rapide al mese, 12 pratiche complete al mese gestite entro 48 ore lavorative (24 ore per le urgenze segnalate come tali), una chiamata o videochiamata di inquadramento per ogni pratica e una revisione contrattuale prioritaria inclusa ogni mese.
      </p>
      <p>
        <strong>Domanda rapida.</strong> Una domanda rapida è una domanda precisa su una situazione, alla quale Thrax Legal risponde per iscritto in poche righe, senza leggere né redigere un documento e senza ricerca approfondita (al massimo circa 15 minuti di lavoro). Se la risposta richiede la lettura di un documento, una ricerca approfondita o una redazione, la richiesta è una pratica; il cliente ne è informato prima di ogni trattamento. Le domande di seguito su una pratica consegnata, poste entro 14 giorni dalla consegna, non sono conteggiate. Oltre il numero di domande rapide incluso nella formula, la domanda è trattata il mese successivo o, a scelta del cliente, conteggiata come pratica.
      </p>
      <p>
        <strong>Pratica.</strong> Una pratica è un lavoro completo che dà luogo a un risultato scritto (ad esempio: redazione o revisione di un contratto, diffida, risoluzione di una controversia con una controparte, redazione di condizioni generali o di un&rsquo;informativa sulla privacy, analisi di un contratto di locazione commerciale). Comprende l&rsquo;inquadramento, il risultato e un giro di correzioni richiesto entro 14 giorni dalla consegna.
      </p>
      <p>
        <strong>Conteggio delle pratiche.</strong> Una richiesta conta come due o più pratiche quando riguarda più risultati distinti (ad esempio un contratto di lavoro e un regolamento del personale), più controparti distinte (ad esempio due dipendenti o due debitori) o un documento di oltre 20 pagine (una pratica in più per ogni blocco di 20 pagine iniziato). Una nuova richiesta su un altro argomento, formulata dopo la consegna di una pratica, è una nuova pratica. Prima di iniziare, Thrax Legal conferma per iscritto al cliente quante pratiche conta la richiesta; il cliente può quindi precisarla, ridurla o rinunciarvi prima di qualsiasi conteggio.
      </p>
      <p>
        <strong>Volumi mensili.</strong> I volumi inclusi si contano per mese di
        abbonamento e non sono riportati al mese successivo. Ogni pratica
        completa oltre il volume incluso nella formula sottoscritta è
        fatturata CHF 79, prezzo fisso, indipendentemente dalla sua
        complessità, previo accordo del cliente.
      </p>
      <p>
        <strong>Chiamata di inquadramento.</strong> Ogni pratica completa
        comprende una chiamata telefonica o videochiamata di inquadramento, su
        appuntamento, di 15 minuti nella formula Essentiel e di 30 minuti nella
        formula Croissance, durante la quale il cliente espone a voce la
        propria situazione. La risposta, i consigli e i documenti sono poi
        forniti per iscritto. Il cliente può rinunciare a questo scambio e
        descrivere la propria situazione per iscritto.
      </p>
      <p>
        <strong>Prezzi.</strong> I prezzi sono indicati in franchi svizzeri (CHF)
        e si intendono <strong>al netto dell&rsquo;imposta sul valore aggiunto</strong>.
        Nessuna IVA svizzera è fatturata finché il prestatore non vi è
        assoggettato; se lo diventa, l&rsquo;IVA legale è aggiunta ai prezzi dalla
        data dell&rsquo;assoggettamento, con informazione preventiva del cliente.
        Le eventuali imposte dovute dal cliente su prestazioni fornite
        dall&rsquo;estero (in particolare l&rsquo;imposta sull&rsquo;acquisto) restano a suo
        carico.
      </p>

      <h2>5. Conclusione del contratto online</h2>
      <p>
        Il contratto si conclude per fasi: (1) il cliente sceglie una formula e
        compila il modulo di creazione dell&rsquo;account; (2) legge e accetta le
        CG spuntando la casella prevista, poi invia il modulo; (3) Thrax Legal
        gli conferma senza indugio la ricezione della richiesta via email; (4)
        il contratto è concluso e l&rsquo;area clienti è attivata alla ricezione del
        primo pagamento, di cui Thrax Legal informa il cliente via email. Prima
        dell&rsquo;invio del modulo, il cliente può correggere i propri dati
        modificando i campi interessati; dopo l&rsquo;invio, può chiedere una
        correzione a <a href="mailto:hey@thrax-legal.ch">hey@thrax-legal.ch</a>.
        Thrax Legal può rifiutare una richiesta di abbonamento prima della sua
        attivazione, senza indennità da nessuna delle parti. Le CG applicabili
        al momento della sottoscrizione possono essere consultate e stampate su
        questa pagina; il cliente è invitato a conservarle.
      </p>

      <h2>6. Durata, pagamento e prezzo bloccato</h2>
      <p>
        L&rsquo;abbonamento si compone di periodi mensili pagati in anticipo. Non
        esiste <strong>alcun impegno di durata minima</strong>. Il pagamento
        avviene per ora tramite bonifico bancario o altro mezzo concordato con il
        cliente; Thrax Legal informerà il cliente prima di introdurre un
        pagamento online o un addebito automatico. Il periodo pagato apre
        l&rsquo;accesso all&rsquo;area clienti e ai volumi della formula. L&rsquo;abbonamento è
        rinnovato per un nuovo periodo mensile alla ricezione del relativo
        pagamento; in mancanza di pagamento alla scadenza, termina allo
        scadere del periodo pagato e l&rsquo;accesso all&rsquo;area clienti è sospeso. Le
        pratiche e gli scambi già registrati sono conservati e tornano
        accessibili al rinnovo.
      </p>
      <p>
        Gli importi fatturati al di fuori del periodo pagato (ad esempio una
        pratica supplementare a CHF 79) sono pagabili entro 30 giorni dalla
        fattura; alla scadenza il cliente è in mora senza sollecito e deve un
        interesse di mora del 5&nbsp;% annuo (art. 102 cpv. 2 e 104 CO).
      </p>
      <p>
        Il prezzo pagato dal cliente al momento della sottoscrizione resta
        invariato finché l&rsquo;abbonamento rimane attivo senza interruzione, anche
        se Thrax Legal aumenta le tariffe per i nuovi clienti. Una disdetta
        seguita da una nuova sottoscrizione, o un periodo non rinnovato, è
        considerata un nuovo abbonamento, soggetto alle tariffe in vigore in quel
        momento.
      </p>
      <p>
        Il cliente può chiedere, con semplice email, la sospensione del proprio
        abbonamento per un massimo di 2 mesi per anno civile. Durante la
        sospensione non è dovuto alcun pagamento e nessuna nuova pratica è
        presa in carico; il prezzo bloccato di cui al presente articolo è
        conservato. La sospensione non è una disdetta: l&rsquo;abbonamento riprende
        alla fine del periodo richiesto, con il pagamento del periodo successivo.
      </p>

      <h2>7. Termini di trattamento</h2>
      <p>
        Ogni pratica completa è trattata entro il termine annunciato per la
        formula sottoscritta (72 ore lavorative per Essentiel, 48 ore lavorative
        per Croissance, 24 ore per le urgenze segnalate nella formula
        Croissance), a partire dalla ricezione di tutte le informazioni e i
        documenti necessari. Le domande rapide ricevono una risposta scritta
        entro 48 ore lavorative (24 ore lavorative nella formula Croissance).
        Le ore lavorative si intendono dal lunedì al venerdì, esclusi sabati,
        domeniche e festivi nella Svizzera romanda. Questi termini sono
        obiettivi di servizio; un superamento dà diritto soltanto a un
        trattamento prioritario, fatto salvo l&rsquo;articolo 11 in caso di colpa.
      </p>

      <h2>8. Obblighi del cliente</h2>
      <p>
        Il cliente fornisce informazioni e documenti completi, esatti e
        aggiornati e li trasmette in tempo utile. È l&rsquo;unico responsabile
        dell&rsquo;esattezza dei fatti comunicati e dell&rsquo;uso che fa delle risposte e
        dei documenti ricevuti.{" "}
        <strong>Indica fin dall&rsquo;inoltro della richiesta ogni termine legale,
        contrattuale o giudiziario in corso</strong> (ad esempio un termine di
        ricorso, opposizione, disdetta o prescrizione) e sceglie, nella formula
        Croissance, l&rsquo;opzione urgenza quando è necessaria; Thrax Legal non è
        responsabile di un termine scaduto perché non gli è stato segnalato in
        tempo utile.
      </p>
      <p>
        Il cliente garantisce di avere il diritto di trasmettere i documenti e i
        dati personali di terzi che sottopone e informa tali terzi conformemente
        alla normativa sulla protezione dei dati. Non sottopone alcuna richiesta
        contraria alla legge o volta a nuocere a un terzo. Mantiene riservata la
        propria password, utilizza un solo account per abbonamento, risponde
        delle azioni effettuate con il proprio account e informa senza indugio
        Thrax Legal di ogni accesso non autorizzato.
      </p>
      <p>
        Thrax Legal può declinare o interrompere una richiesta contraria alla
        legge o ai suoi principi, che esporrebbe il prestatore a un conflitto
        d&rsquo;interessi (in particolare quando la controparte è già cliente) o che
        costituirebbe un uso manifestamente abusivo del servizio. La richiesta
        non è allora conteggiata e il cliente ne è informato per iscritto.
      </p>

      <h2>9. Riservatezza</h2>
      <p>
        Thrax Legal tratta in modo riservato tutti i fatti, i documenti e le
        informazioni che il cliente gli affida, li utilizza solo per eseguire
        l&rsquo;incarico e li comunica soltanto alle persone o ai fornitori tecnici che
        ne hanno bisogno per fornire il servizio e sono tenuti a una
        riservatezza equivalente. Questo impegno non si applica alle
        informazioni già pubbliche né a una comunicazione imposta dalla legge o
        da un&rsquo;autorità competente (vedi articolo 3). La trasmissione al fornitore di intelligenza artificiale di cui all&rsquo;articolo 3 è consentita e non viola questo impegno. Sussiste dopo la fine del
        contratto.
      </p>

      <h2>10. Disdetta, rifiuto e rimborso</h2>
      <p>
        Conformemente all&rsquo;articolo 404 CO, ciascuna parte può porre fine al
        contratto in ogni momento, senza motivo né penale. Il cliente disdice
        con semplice email a{" "}
        <a href="mailto:hey@thrax-legal.ch">hey@thrax-legal.ch</a> o non
        rinnovando il periodo successivo; la disdetta ha effetto alla fine del
        periodo mensile già pagato e il cliente conserva i propri diritti fino a
        tale data. Il mese in corso non è rimborsato pro rata. Il cliente può
        inoltre cambiare formula in ogni momento, con effetto dal rinnovo
        successivo.
      </p>
      <p>
        Thrax Legal può disdire l&rsquo;abbonamento con un preavviso di 14 giorni per
        la fine di un periodo, o immediatamente per gravi motivi (in particolare
        grave violazione delle CG, uso abusivo o illecito, mancato pagamento di
        un importo fatturato dopo sollecito). Se Thrax Legal disdice senza colpa
        del cliente, il prezzo del periodo pagato e non utilizzato è rimborsato
        pro rata.
      </p>
      <p>
        Se una pratica specifica risulta manifestamente al di fuori
        dell&rsquo;ambito descritto all&rsquo;articolo 3 o all&rsquo;articolo 4, Thrax Legal ne
        informa il cliente prima di ogni trattamento e lo orienta verso un
        avvocato anziché fatturare una prestazione inadatta.
      </p>

      <h2>11. Responsabilità</h2>
      <p>
        Thrax Legal risponde dell&rsquo;esecuzione diligente e fedele del proprio
        incarico (art. 398 CO). Le risposte scritte e i documenti forniti sono
        preparati a partire dalle informazioni comunicate dal cliente; la loro
        esattezza e completezza sono di responsabilità del cliente. Thrax Legal
        non garantisce l&rsquo;esito di una situazione giuridica, che dipende dai fatti
        propri di ogni pratica e, se del caso, dalla valutazione di
        un&rsquo;autorità, di un tribunale o di un terzo.
      </p>
      <p>
        Nella misura consentita dalla legge, la responsabilità del prestatore,
        per tutti i danni complessivamente, è limitata all&rsquo;importo
        effettivamente pagato dal cliente nei dodici mesi precedenti
        l&rsquo;evento dannoso, e i danni indiretti o consequenziali (in particolare
        il mancato guadagno, la perdita di un&rsquo;opportunità o di un contratto)
        sono esclusi. Questa limitazione non si applica in caso di intenzione o
        di negligenza grave (art. 100 cpv. 1 CO), né per i danni alle persone o
        negli altri casi in cui la legge non consente di limitare la
        responsabilità. Thrax Legal declina ogni responsabilità per una
        decisione presa sulla sola base delle informazioni generali del sito.
      </p>
      <p>
        Quando una pratica presenta una gravità o una complessità particolare,
        Thrax Legal può raccomandare al cliente di consultare un avvocato
        iscritto a un ordine svizzero anziché rispondere nell&rsquo;ambito
        dell&rsquo;abbonamento.
      </p>

      <h2>12. Proprietà dei documenti consegnati</h2>
      <p>
        Le risposte scritte e i documenti consegnati nell&rsquo;ambito
        dell&rsquo;abbonamento, una volta pagato il periodo corrispondente, possono
        essere utilizzati liberamente dal cliente per le esigenze della propria
        attività. Non possono essere rivenduti o ridistribuiti a terzi come
        modelli commerciali. Thrax Legal conserva i propri diritti sui suoi
        metodi, modelli, schemi e know-how generale, senza mai riutilizzare il
        contenuto riservato proprio di un cliente.
      </p>

      <h2>13. Protezione dei dati</h2>
      <p>
        Il trattamento dei dati personali nell&rsquo;ambito di questo servizio,
        compresi l&rsquo;hosting dei dati e i fornitori tecnici di cui Thrax Legal si
        avvale, è descritto nella nostra{" "}
        <NextLink href="/it/confidentialite">informativa sulla privacy</NextLink>.
        Thrax Legal adotta misure tecniche e organizzative adeguate per
        proteggere i dati che gli sono affidati e informa il cliente quanto
        prima di una violazione della sicurezza dei dati che lo riguarda e che
        presenti un rischio per lui. Il cliente dispone dei diritti di accesso,
        rettifica e cancellazione descritti in tale informativa.
      </p>

      <h2>14. Comunicazioni elettroniche</h2>
      <p>
        Le comunicazioni tra le parti, comprese conferme, fatture, avvisi e
        modifiche delle CG, avvengono validamente via email all&rsquo;indirizzo
        indicato dal cliente nel proprio account o a{" "}
        <a href="mailto:hey@thrax-legal.ch">hey@thrax-legal.ch</a>. Il cliente
        mantiene aggiornato il proprio indirizzo.
      </p>

      <h2>15. Forza maggiore</h2>
      <p>
        Il prestatore non può essere ritenuto responsabile di un ritardo o di
        un inadempimento derivante da un evento che sfugge al suo ragionevole
        controllo (in particolare grave malattia, guasto di un servizio tecnico
        di terzi, attacco informatico, decisione di un&rsquo;autorità). I termini sono
        prorogati in misura corrispondente e, se l&rsquo;impedimento supera i 30
        giorni, ciascuna parte può disdire il contratto con rimborso del periodo
        pagato e non utilizzato.
      </p>

      <h2>16. Modifica delle presenti condizioni</h2>
      <p>
        Thrax Legal può modificare le CG. Le modifiche importanti sono comunicate
        al cliente via email almeno 30 giorni prima della loro entrata in
        vigore; si applicano allora al periodo successivo, e il cliente che non
        le accetta può disdire l&rsquo;abbonamento prima di tale data. Gli abbonamenti
        in corso restano regolati dalla versione accettata per il periodo già
        pagato. La data dell&rsquo;ultimo aggiornamento figura in alto in questa
        pagina.
      </p>

      <h2>17. Disposizioni finali</h2>
      <p>
        Le CG e gli elementi dell&rsquo;offerta accettata costituiscono l&rsquo;intero
        accordo delle parti sull&rsquo;abbonamento. Se una disposizione è invalida o
        inapplicabile, le altre restano valide e le parti la sostituiscono con
        una disposizione valida di portata economica equivalente. Thrax Legal può
        trasferire il contratto a un successore o a una società che costituisse
        per proseguire l&rsquo;attività, con informazione del cliente, che conserva il
        proprio diritto di disdetta. Le CG sono disponibili in francese, tedesco,
        inglese e italiano; in caso di divergenza fa fede la versione francese.
      </p>

      <h2>18. Diritto applicabile e foro</h2>
      <p>
        Le presenti condizioni e il contratto sono soggetti al{" "}
        <strong>diritto svizzero</strong>, ad esclusione delle sue norme sul
        conflitto di leggi. Ogni controversia relativa alla loro conclusione,
        interpretazione o esecuzione è di competenza esclusiva dei tribunali
        ordinari del cantone di <strong>Vaud</strong>, a Losanna.
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
