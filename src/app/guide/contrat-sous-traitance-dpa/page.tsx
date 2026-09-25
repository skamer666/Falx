import type { Metadata } from "next";
import Link from "next/link";
import GuideLayout from "@/components/site/GuideLayout";
import { getGuideArticle } from "@/lib/guide/articles";

const article = getGuideArticle("contrat-sous-traitance-dpa")!;

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
      <h2>Qu&rsquo;est-ce qu&rsquo;un sous-traitant, au sens de la loi ?</h2>
      <p>
        Un sous-traitant est toute entreprise externe qui traite des données
        personnelles <strong>pour votre compte</strong>, selon vos
        instructions. La plupart des PME en ont beaucoup plus qu&rsquo;elles
        ne le pensent&nbsp;: hébergeur web, outil de CRM, logiciel de
        comptabilité en ligne, prestataire d&rsquo;emailing, outil de
        recrutement, service de paie externalisé. Chacun de ces
        prestataires devrait apparaître dans votre{" "}
        <Link href="/guide/registre-des-traitements">
          registre des traitements
        </Link>
        .
      </p>

      <h2>Pourquoi un simple contrat de service ne suffit pas</h2>
      <p>
        Un contrat commercial classique (conditions générales, contrat
        d&rsquo;abonnement à un logiciel) ne couvre généralement pas les
        obligations spécifiques à la protection des données. Le contrat de
        sous-traitance &mdash; souvent appelé DPA (Data Processing
        Agreement) &mdash; est un document distinct, ou un avenant, qui fixe
        précisément&nbsp;:
      </p>
      <ul>
        <li>L&rsquo;objet et la durée du traitement confié au prestataire</li>
        <li>Les instructions que le sous-traitant doit suivre, sans les dépasser</li>
        <li>Les mesures de sécurité que le prestataire s&rsquo;engage à respecter</li>
        <li>Les conditions dans lesquelles il peut lui-même recourir à un sous-traitant ultérieur</li>
        <li>Ce qui se passe en cas de violation de données constatée par le prestataire</li>
        <li>Ce qui advient des données à la fin du contrat (suppression, restitution)</li>
      </ul>

      <h2>Et si le prestataire est à l&rsquo;étranger ?</h2>
      <p>
        De nombreux outils SaaS utilisés par les PME suisses sont hébergés
        aux États-Unis ou ailleurs hors de Suisse. Dans ce cas, le contrat
        de sous-traitance doit aussi couvrir les garanties applicables au
        transfert de données à l&rsquo;étranger (clauses contractuelles
        types reconnues, ou pays disposant d&rsquo;un niveau de protection
        jugé adéquat). C&rsquo;est un point souvent oublié parce que
        l&rsquo;outil paraît &laquo;&nbsp;juste un logiciel&nbsp;&raquo;,
        alors qu&rsquo;il implique un transfert réel de données hors de
        Suisse.
      </p>

      <h2>Qui doit signer quoi, en pratique</h2>
      <p>
        Pour les grands éditeurs (Google, Microsoft, la plupart des CRM
        connus), un DPA standard existe déjà et peut généralement être
        accepté tel quel, parfois directement depuis les paramètres du
        compte. Pour des prestataires plus petits ou locaux (agence,
        freelance, comptable indépendant), c&rsquo;est à vous de fournir le
        contrat &mdash; ce qui suppose d&rsquo;avoir un modèle prêt à
        proposer, adapté au droit suisse.
      </p>

      <h2>Un chantier à ne pas sous-estimer</h2>
      <p>
        Recenser tous les prestataires concernés, vérifier lesquels ont déjà
        un DPA en place et lesquels n&rsquo;en ont pas, puis faire signer
        les contrats manquants, représente souvent la partie la plus longue
        d&rsquo;une mise en conformité &mdash; bien plus que la rédaction
        d&rsquo;une{" "}
        <Link href="/guide/politique-de-confidentialite">
          politique de confidentialité
        </Link>
        . C&rsquo;est aussi la partie la plus souvent négligée, précisément
        parce qu&rsquo;elle implique de coordonner plusieurs tiers plutôt
        que de rédiger un document en interne.
      </p>
    </GuideLayout>
  );
}
