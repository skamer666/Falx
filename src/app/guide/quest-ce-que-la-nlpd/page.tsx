import type { Metadata } from "next";
import Link from "next/link";
import GuideLayout from "@/components/site/GuideLayout";
import { getGuideArticle } from "@/lib/guide/articles";

const article = getGuideArticle("quest-ce-que-la-nlpd")!;

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
      <h2>La nLPD en bref</h2>
      <p>
        La nLPD (nouvelle loi fédérale sur la protection des données, aussi
        appelée LPD révisée) est en vigueur en Suisse depuis le{" "}
        <strong>1er septembre 2023</strong>. Elle remplace l&rsquo;ancienne
        loi de 1992, jugée dépassée face à l&rsquo;évolution du numérique, et
        renforce les droits des personnes dont les données sont traitées
        ainsi que les obligations des entreprises qui les traitent.
      </p>
      <p>
        Contrairement à une idée répandue, la nLPD n&rsquo;est pas une
        &laquo;&nbsp;copie suisse du RGPD&nbsp;&raquo;. Elle en partage
        l&rsquo;esprit (transparence, minimisation, sécurité), mais reste un
        texte distinct, avec ses propres définitions, exceptions et
        mécanismes de sanction.
      </p>

      <h2>Qui est concerné ?</h2>
      <p>
        La loi s&rsquo;applique à toute entité, publique ou privée, qui
        traite des données personnelles de personnes physiques en Suisse ou
        dont le traitement produit des effets en Suisse. Concrètement, pour
        une PME&nbsp;:
      </p>
      <ul>
        <li>Les données de vos clients et prospects (nom, email, historique d&rsquo;achat, etc.)</li>
        <li>Les données de vos employés (dossiers RH, salaires, données de santé le cas échéant)</li>
        <li>Les données collectées via votre site web (formulaires, cookies, newsletter)</li>
      </ul>
      <p>
        La taille de l&rsquo;entreprise n&rsquo;exclut personne du champ
        d&rsquo;application de la loi. Elle influe en revanche sur certaines
        obligations précises, comme celle de tenir un{" "}
        <Link href="/guide/registre-des-traitements">
          registre des traitements
        </Link>
        , qui prévoit des allègements pour les petites structures sous
        conditions.
      </p>

      <h2>Ce qui change concrètement avec la révision</h2>
      <ul>
        <li>
          <strong>Devoir d&rsquo;information renforcé</strong> : les
          personnes concernées doivent être informées de façon claire sur la
          collecte de leurs données, avant ou au moment de la collecte.
        </li>
        <li>
          <strong>Sécurité des données</strong> : mise en place de mesures
          techniques et organisationnelles proportionnées au risque
          (chiffrement, contrôle d&rsquo;accès, sauvegardes).
        </li>
        <li>
          <strong>Notification des violations</strong> : obligation
          d&rsquo;annoncer certaines violations de sécurité au Préposé
          fédéral à la protection des données et à la transparence (PFPDT).
        </li>
        <li>
          <strong>Sanctions pénales personnelles</strong> : contrairement à
          l&rsquo;ancienne loi, ce sont les personnes physiques responsables
          qui peuvent être sanctionnées, pas seulement l&rsquo;entreprise.
          Détails dans notre guide sur{" "}
          <Link href="/guide/sanctions-nlpd">les sanctions nLPD</Link>.
        </li>
      </ul>

      <h2>Les obligations principales pour une PME</h2>
      <p>
        En pratique, une mise en conformité couvre généralement cinq
        éléments&nbsp;: un inventaire des traitements de données effectués,
        une{" "}
        <Link href="/guide/politique-de-confidentialite">
          politique de confidentialité
        </Link>{" "}
        informant clairement les personnes concernées, des{" "}
        <Link href="/guide/contrat-sous-traitance-dpa">
          contrats de sous-traitance
        </Link>{" "}
        avec les prestataires qui traitent des données pour votre compte
        (hébergeur, CRM, comptabilité en ligne), une procédure définie en cas
        de violation de données, et une désignation claire de qui, en
        interne, répond aux questions de protection des données.
      </p>

      <h2>nLPD et RGPD : faut-il s&rsquo;occuper des deux ?</h2>
      <p>
        Si votre PME traite des données de résidents de l&rsquo;Union
        européenne (clients, employés à distance, prospects via un site
        accessible depuis l&rsquo;UE dans certains cas), le RGPD peut
        s&rsquo;appliquer en parallèle de la nLPD. Les deux textes se
        recoupent largement, mais ne sont pas identiques&nbsp;: une
        conformité RGPD ne garantit pas automatiquement une conformité nLPD,
        et inversement.
      </p>

      <h2>Par où commencer ?</h2>
      <p>
        La méthode la plus efficace consiste à partir d&rsquo;un état des
        lieux précis de vos traitements de données actuels, puis à combler
        les écarts un par un plutôt que de tout reprendre à zéro. C&rsquo;est
        exactement ce que fait notre diagnostic gratuit ci-dessous.
      </p>
    </GuideLayout>
  );
}
