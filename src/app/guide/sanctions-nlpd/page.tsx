import type { Metadata } from "next";
import Link from "next/link";
import GuideLayout from "@/components/site/GuideLayout";
import { getGuideArticle } from "@/lib/guide/articles";

const article = getGuideArticle("sanctions-nlpd")!;

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
      <h2>Une différence importante avec l&rsquo;ancienne loi</h2>
      <p>
        Sous l&rsquo;ancienne loi de 1992, les sanctions visaient rarement
        les entreprises dans la pratique. La nLPD change cette logique&nbsp;:
        elle prévoit des <strong>amendes pénales visant les personnes
        physiques responsables</strong> &mdash; en général les personnes qui
        dirigent l&rsquo;entreprise ou qui ont pris la décision fautive
        &mdash; et non l&rsquo;entreprise elle-même en tant que personne
        morale, sauf identification impossible de la personne responsable,
        auquel cas l&rsquo;amende peut être mise à la charge de
        l&rsquo;entreprise dans une limite plus faible.
      </p>

      <h2>Jusqu&rsquo;à combien ?</h2>
      <p>
        Le montant maximal prévu par la loi est de <strong>250&rsquo;000
        CHF</strong>, réservé aux violations intentionnelles et aux cas les
        plus graves&nbsp;: manquement au devoir d&rsquo;information,
        violation des obligations minimales de sécurité des données,
        violation des obligations liées à la sous-traitance, ou
        transmission de données à l&rsquo;étranger en violation des
        garanties exigées. Une négligence isolée, corrigée rapidement,
        n&rsquo;expose pas au même niveau de risque qu&rsquo;un manquement
        délibéré et répété.
      </p>

      <h2>Ce qui déclenche concrètement un contrôle</h2>
      <p>
        Dans la pratique, les procédures démarrent le plus souvent
        après&nbsp;:
      </p>
      <ul>
        <li>Une plainte d&rsquo;un client, d&rsquo;un employé ou d&rsquo;un ancien employé</li>
        <li>Une violation de données rendue publique (fuite, piratage) ayant fait l&rsquo;objet d&rsquo;une notification</li>
        <li>Un contrôle sectoriel ciblé par le Préposé fédéral à la protection des données et à la transparence (PFPDT)</li>
      </ul>
      <p>
        Autrement dit, le risque n&rsquo;est pas tant un contrôle
        administratif aléatoire qu&rsquo;un déclencheur concret &mdash;
        souvent une personne mécontente qui sait qu&rsquo;elle a des droits.
      </p>

      <h2>Le risque réputationnel, souvent sous-estimé</h2>
      <p>
        Au-delà de l&rsquo;amende elle-même, une violation de données rendue
        publique ou un litige avec un client sur l&rsquo;usage de ses
        données a un coût en confiance, particulièrement pour une PME dont
        la réputation locale compte. C&rsquo;est un argument qui pèse
        souvent plus lourd, dans la décision de se mettre en conformité,
        que le montant théorique de l&rsquo;amende.
      </p>

      <h2>Réduire le risque, concrètement</h2>
      <p>
        Un{" "}
        <Link href="/guide/registre-des-traitements">
          registre des traitements
        </Link>{" "}
        à jour, une{" "}
        <Link href="/guide/politique-de-confidentialite">
          politique de confidentialité
        </Link>{" "}
        exacte et une procédure définie en cas de violation de données sont
        les trois éléments qui, en cas de contrôle ou de plainte,
        démontrent une démarche de conformité sérieuse plutôt qu&rsquo;une
        négligence caractérisée &mdash; une différence qui compte
        directement dans l&rsquo;appréciation de la gravité d&rsquo;un
        manquement.
      </p>
    </GuideLayout>
  );
}
