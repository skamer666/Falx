# Google Ads — campagne de recherche Romandie (prête, en pause)

Fichier : `docs/ads/campagne-recherche-romandie.csv` (à importer dans **Google Ads Editor**, gratuit : Fichier → Importer → Depuis un fichier, puis « Publier »). La campagne est créée **en pause** : rien ne se dépense avant de l'activer.

## Réglages
- Réseau de recherche Google uniquement (pas de partenaires de recherche, pas de Display), langue français, lieu Suisse.
- **Budget : 15 €/jour**, 7 jours sur 7 (week-end actif ; à réévaluer après 2-3 semaines avec le rapport par jour).
- Enchères : « Maximiser les clics », CPC max **2,50 €** par groupe (aucune conversion mesurée au départ, donc pas d'enchère automatique sur les conversions).
- 9 groupes d'annonces (« Baisse de loyer » retiré : taux de référence inchangé à 1,25 %), 59 mots-clés en expression et exact, chacun vers la fiche prestation correspondante : licenciement, poursuite, certificat de travail, salaire impayé, baisse de loyer, garantie de loyer, congé de bail, et côté entreprises mise en demeure, recouvrement, mainlevée.
- 34 mots-clés négatifs au niveau campagne (gratuit, modèle, pdf, avocat, France, emploi, etc.).
- Une annonce responsive par groupe, 10 titres (≤30 caractères) et 4 descriptions (≤90). Aucune mention « avocat » ; « Pas un cabinet d'avocats » est écrit dans les titres.

## Avant d'activer
1. Dans le compte Google Ads : **suivi automatique (auto-tagging) activé** (Admin → Paramètres du compte). C'est lui qui ajoute le `gclid` à l'URL ; le site s'en sert pour classer la visite dans le canal « Google Ads » (page Statistiques), mais n'en conserve pas la valeur.
2. Facturation configurée (carte). Belgique : autoliquidation de la TVA sur les frais Google Ads (formulaire de TVA), à voir avec ton comptable.
3. Contrôle d'aperçu dans l'éditeur : chaque annonce affiche le bon prix et la bonne URL.
4. Activer la campagne, puis regarder chaque jour pendant la première semaine : termes de recherche réellement tapés (ajouter des négatifs), clics, coût.

## Mesure sans cookie
La politique de confidentialité dit qu'aucun traceur n'est installé : pas de balise Google sur le site. Les ventes issues des annonces se lisent dans **Admin → Statistiques** (canal « Google Ads », commandes, chiffre d'affaires, coût par commande avec la dépense saisie chaque jour). Google Ads, lui, ne voit pas les conversions : c'est pourquoi la campagne enchérit au clic et non à la conversion.
Importer les conversions dans Google Ads (conversions hors ligne) demanderait de conserver la valeur du `gclid` avec chaque commande : pas fait à ce jour, à ajouter plus tard si on veut des enchères à la conversion.

## Réalisme
Chaque mot-clé a 10 à 100 recherches par mois : le budget de 15 €/jour ne sera sans doute pas dépensé en entier au début. Si les impressions sont très faibles après une semaine, ajouter des variantes (type de contrat, canton, « suisse ») plutôt que d'augmenter le CPC.
