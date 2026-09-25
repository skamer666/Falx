import type { Metadata } from "next";
import Link from "next/link";
import GuideLayout from "@/components/site/GuideLayout";
import { getGuideArticle } from "@/lib/guide/articles";

const article = getGuideArticle("registre-des-traitements")!;

export const metadata: Metadata = {
  title: `${article.title} | Thrax Legal`,
  description: article.description,
  alternates: {
    canonical: `/guide/${article.slug}`,
  },
};

export default function Page() {
  return (
    <GuideLayout article={article}>
      <h2>À quoi sert le registre des traitements ?</h2>
      <p>
        Le registre des traitements est le document qui recense, de façon
        structurée, tous les traitements de données personnelles effectués
        par votre entreprise&nbsp;: quelles données, dans quel but, qui y a
        accès, où elles sont stockées, combien de temps elles sont
        conservées. C&rsquo;est la pièce centrale de toute démarche de
        conformité&nbsp;: sans lui, impossible de savoir précisément ce qui
        doit être couvert par une{" "}
        <Link href="/guide/politique-de-confidentialite">
          politique de confidentialité
        </Link>{" "}
        ou par des{" "}
        <Link href="/guide/contrat-sous-traitance-dpa">
          contrats de sous-traitance
        </Link>
        .
      </p>

      <h2>Qui doit en tenir un ?</h2>
      <p>
        La nLPD prévoit un allègement pour les entreprises privées de moins
        de 250 employés&nbsp;: elles peuvent être dispensées de l&rsquo;
        obligation formelle de tenir un registre, <strong>sauf</strong> si
        leur traitement de données présente un risque élevé pour les
        personnes concernées, porte sur des données sensibles à large
        échelle (données de santé, données biométriques, opinions
        religieuses ou politiques, par exemple), ou implique un profilage à
        risque élevé.
      </p>
      <p>
        En pratique, beaucoup de PME pensent être dispensées alors qu&rsquo;
        elles traitent justement des données RH (données de santé pour les
        arrêts maladie, par exemple) ou font du profilage marketing plus
        poussé qu&rsquo;elles ne le pensent. Et même lorsque la dispense
        s&rsquo;applique formellement, tenir un registre reste recommandé
        &mdash; c&rsquo;est le seul moyen de démontrer, en cas de contrôle
        ou de litige, que vous savez exactement ce que vous faites de ces
        données.
      </p>

      <h2>Ce que doit contenir un registre conforme</h2>
      <p>Pour chaque traitement identifié, un registre complet précise généralement&nbsp;:</p>
      <ul>
        <li>La finalité du traitement (pourquoi ces données sont collectées)</li>
        <li>Les catégories de données concernées et de personnes concernées</li>
        <li>Les catégories de destinataires, y compris les sous-traitants externes</li>
        <li>La durée de conservation ou les critères pour la déterminer</li>
        <li>Les mesures de sécurité mises en place</li>
        <li>Si applicable, le transfert de données à l&rsquo;étranger et les garanties associées</li>
      </ul>

      <h2>Les traitements les plus souvent oubliés</h2>
      <p>
        Dans notre pratique, certains traitements passent régulièrement sous
        le radar lors d&rsquo;un premier inventaire&nbsp;:
      </p>
      <ul>
        <li>Les outils SaaS utilisés au quotidien (CRM, comptabilité en ligne, outil de recrutement)</li>
        <li>Les caméras de vidéosurveillance dans les locaux</li>
        <li>Le suivi des candidatures et CV non retenus</li>
        <li>Les newsletters et outils d&rsquo;emailing marketing</li>
        <li>La géolocalisation de véhicules professionnels</li>
      </ul>

      <h2>Un document vivant, pas figé</h2>
      <p>
        Un registre des traitements n&rsquo;est utile que s&rsquo;il est à
        jour. Chaque nouvel outil, chaque nouveau prestataire ou chaque
        changement d&rsquo;activité peut créer un nouveau traitement à
        documenter. C&rsquo;est pour cette raison qu&rsquo;une revue
        périodique &mdash; annuelle au minimum &mdash; est recommandée plutôt
        qu&rsquo;un exercice ponctuel.
      </p>
    </GuideLayout>
  );
}
