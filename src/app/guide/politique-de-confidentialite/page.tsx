import type { Metadata } from "next";
import Link from "next/link";
import GuideLayout from "@/components/site/GuideLayout";
import { getGuideArticle } from "@/lib/guide/articles";

const article = getGuideArticle("politique-de-confidentialite")!;

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
      <h2>Pourquoi un simple copier-coller ne suffit pas</h2>
      <p>
        Une politique de confidentialité copiée sur le site d&rsquo;un
        concurrent, ou générée automatiquement sans adaptation, décrit
        rarement les traitements réels de votre entreprise. Or la nLPD exige
        une information exacte sur ce que vous faites concrètement des
        données&nbsp;: les incohérences entre ce qui est annoncé et ce qui
        est réellement fait sont précisément ce qu&rsquo;un contrôle ou une
        plainte met en évidence.
      </p>
      <p>
        La base d&rsquo;une politique de confidentialité fiable est votre{" "}
        <Link href="/guide/registre-des-traitements">
          registre des traitements
        </Link>
        &nbsp;: on ne peut informer correctement que sur ce qu&rsquo;on a
        d&rsquo;abord recensé.
      </p>

      <h2>Les mentions attendues</h2>
      <p>
        Pour un site web comme pour un document destiné aux employés, une
        politique de confidentialité conforme précise généralement&nbsp;:
      </p>
      <ul>
        <li>L&rsquo;identité et les coordonnées du responsable du traitement</li>
        <li>Les finalités précises de chaque traitement de données (pas une formule générique)</li>
        <li>La base sur laquelle repose le traitement</li>
        <li>Les catégories de destinataires des données, y compris les sous-traitants</li>
        <li>Les transferts de données à l&rsquo;étranger, le cas échéant, et les garanties associées</li>
        <li>La durée de conservation des données ou les critères pour la déterminer</li>
        <li>Les droits des personnes concernées (accès, rectification, effacement, opposition) et comment les exercer</li>
      </ul>

      <h2>Site web et gestion RH : deux documents, deux publics</h2>
      <p>
        Une erreur fréquente consiste à publier une seule politique de
        confidentialité générique pour tous les publics. En pratique, les
        visiteurs de votre site, vos clients et vos employés n&rsquo;ont pas
        les mêmes données traitées ni les mêmes droits à connaître en
        priorité&nbsp;: un document RH doit couvrir les données du dossier
        de collaborateur (salaire, évaluations, données de santé
        éventuelles) tandis que la version publiée sur le site couvre les
        cookies, les formulaires de contact et les données de navigation.
      </p>

      <h2>Cookies et traceurs</h2>
      <p>
        Si votre site utilise des cookies de mesure d&rsquo;audience, de
        publicité ou de réseaux sociaux, ceux-ci doivent être décrits
        explicitement, avec la possibilité pour le visiteur de comprendre
        quels traceurs sont utilisés et dans quel but. Une politique de
        confidentialité qui ne mentionne pas les outils tiers réellement
        installés sur le site (pixels publicitaires, outils d&rsquo;
        analytics) reste incomplète, même si le texte général est correct.
      </p>

      <h2>Un document à revoir, pas à publier une fois pour toutes</h2>
      <p>
        Un nouvel outil marketing, un nouveau prestataire d&rsquo;hébergement
        ou un changement de finalité (par exemple, commencer à revendre des
        données agrégées) doit se refléter dans la politique de
        confidentialité. C&rsquo;est un document qui suit l&rsquo;évolution
        réelle de votre activité, pas un texte statique rédigé une fois au
        lancement du site.
      </p>
    </GuideLayout>
  );
}
