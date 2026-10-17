# Tutoriel : programmer la campagne Google Ads pour lundi 19 octobre 2026

Durée : 1 h 30 environ. Fais-le **samedi ou dimanche** : Google contrôle les annonces avant de les diffuser (quelques heures, parfois un jour ouvré). Si tu les envoies lundi matin, elles risquent de ne démarrer que mardi.

## 0. Avant de commencer
- Fichier de campagne : `docs/ads/campagne-recherche-romandie.csv` (dans le dépôt GitHub, branche du site).
- Une carte bancaire pour la facturation Google Ads.
- La campagne est conçue pour **15 €/jour**, 7 jours sur 7, en Suisse, en français.

## 1. Créer le compte Google Ads (si ce n'est pas déjà fait)
1. Va sur ads.google.com, connecte-toi avec ton compte Google.
2. Clique sur « Passer en mode Expert » (en bas) puis « Créer un compte sans campagne ». Ne crée pas de campagne dans l'assistant : on importe la nôtre.
3. **Pays de facturation** : Belgique. **Fuseau horaire** : Europe/Bruxelles (même heure qu'à Zurich). **Devise** : **EUR**.
   Attention : la devise et le fuseau horaire **ne se changent plus ensuite**.
4. Dans **Facturation → Moyens de paiement**, ajoute ta carte. Sans moyen de paiement valide, les annonces ne diffusent pas.
5. Dans **Admin → Paramètres du compte**, active **Suivi automatique** (« Ajouter automatiquement le paramètre gclid »).
6. Il peut te demander une **validation de l'annonceur** (identité, justificatif). Fais-la dès maintenant, elle peut prendre quelques jours.

## 2. Installer Google Ads Editor (gratuit)
1. Télécharge « Google Ads Editor » sur ads.google.com/home/tools/ads-editor.
2. Ouvre-le, connecte-toi, ajoute ton compte, clique sur « Télécharger ».

## 3. Importer la campagne
1. Télécharge le fichier `campagne-recherche-romandie.csv` depuis GitHub (bouton « Raw » → enregistrer sous).
2. Dans Editor : **Compte → Importer → Depuis un fichier**, choisis le CSV, clique « Traiter ».
3. Un résumé s'affiche (1 campagne, 9 groupes d'annonces, 54 mots-clés en 2 types, 9 annonces, mots-clés exclus). Clique sur « Conserver les modifications ».
4. Si Editor signale des erreurs, note-les et envoie-les-moi : en général c'est un nom de colonne à adapter.

## 4. Vérifier les réglages de la campagne (clique sur la campagne → Paramètres)
| Réglage | Valeur attendue |
|---|---|
| Type | Réseau de recherche |
| Réseaux | **Décocher** « Partenaires de recherche Google » et « Réseau Display » |
| Zone géographique | Suisse. Option : « **Présence** » (personnes se trouvant dans la zone) |
| Langue | Français |
| Budget | 15,00 € par jour |
| Stratégie d'enchères | Maximiser les clics, avec **CPC max 2,50 €** |
| Programmation | Tous les jours (week-end inclus), toute la journée |
| Date de début | **19/10/2026** |
| Statut | Activée |

Avec une date de début au 19 octobre, la campagne apparaît comme « Programmée » et démarre toute seule lundi à 00 h.

## 5. Vérifier les annonces
Ouvre chaque groupe : l'annonce doit afficher le bon prix et la bonne page. Contrôle l'aperçu (« Aperçu de l'annonce »). Il n'y a aucune mention « avocat » ; « Pas un cabinet d'avocats » est écrit dans les titres.

## 6. Ajouter les extensions (recommandé, +10 à 15 % de clics)
Dans Editor : **Composants → Liens annexes / Accroches**, au niveau de la campagne.
- **Accroches (25 caractères max)** : `Prix fixe annoncé` · `Paiement sécurisé` · `Livraison par email` · `Remboursé si impossible` · `Droit suisse`
- **Liens annexes** (titre 25 max, description 35 max) :
  - Particuliers → `https://thrax-legal.ch/fr/particuliers` — « Lettres et démarches » / « Dès 49 CHF, prix fixe »
  - Entreprises → `https://thrax-legal.ch/fr/entreprises` — « Pour PME et indépendants » / « Prix fixe, hors TVA »
  - Nous contacter → `https://thrax-legal.ch/fr/contact` — « Être rappelé » / « Réponse sous 1 jour ouvré »

## 7. Publier
1. Clique sur « Publier » (bouton en haut). Google envoie tout pour contrôle.
2. Dans Google Ads (navigateur), ouvre la campagne : l'état des annonces passe de « En cours d'examen » à « Éligible » en quelques heures.
3. Si une annonce est « Refusée », clique sur « Motif » et dis-le-moi : on la corrige.

## 8. Lundi, premier jour
- Vérifie à 9 h dans Google Ads que la campagne est « Active » et que les impressions augmentent.
- Teste toi-même : cherche « opposition commandement de payer » depuis ton téléphone. N'oublie pas : **ne clique pas sur tes propres annonces** (tu paierais le clic). Pour les voir sans cliquer, utilise l'outil « Aperçu et diagnostic des annonces » dans Google Ads.
- Dans Admin → Statistiques, saisis chaque soir la dépense du jour (Google Ads → colonne « Coût »).

## 9. La première semaine
- **Chaque jour** : onglet « Mots clés de recherche » (Mots clés → Termes de recherche). Les recherches hors sujet : « Ajouter en tant que mot clé exclu ».
- **Ne change pas les enchères** pendant les 3 premiers jours : Google apprend.
- **Règle de sortie** : si tu as dépensé 150 € sans commande, mets la campagne en pause et on regarde ensemble.
- **Ne juge** rien avant 100 à 150 clics.
- Dans Admin → Statistiques, regarde : visites « Google Ads », coût par visite, coût par commande, page d'arrivée la plus performante, carte de chaleur des heures.

## En cas de souci
- « Aucune diffusion » : vérifie la facturation et que la date de début est passée.
- « Très peu d'impressions » : normal au départ (10 à 100 recherches par mois par mot-clé). Ajoute des variantes de mots-clés plutôt que d'augmenter le prix du clic.
- Pour tout blocage, copie le message exact de Google Ads et envoie-le-moi.
