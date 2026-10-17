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

## Suivi des conversions (balise Google, avec consentement)
Décision du propriétaire (17 oct.) : on utilise la balise Google Ads.
- Le site la charge **seulement si le visiteur accepte** le bandeau (aucun appel à Google sinon). Mode « mesure des ventes » : personnalisation des annonces et analyse désactivées.
- La conversion « achat » part depuis la page de retour de paiement (`/commande/merci`), avec le **montant réel lu en base** (jamais dans l'adresse) et l'identifiant de la commande (pas de doublon).
- Réglage : `src/lib/ads.ts` (`GOOGLE_ADS_ID` = `AW-18486615417`, `GOOGLE_ADS_PURCHASE_LABEL` = étiquette de l'action « Achat »). Actif depuis le 17 oct. 2026 ; si l'une des valeurs est vide, il n'y a ni balise ni bandeau.
- Dans Google Ads : Objectifs → Conversions → Nouvelle action → Site web → configuration manuelle → catégorie « Achat », valeurs différentes pour chaque conversion, valeur par défaut 140 CHF. Récupérer l'ID `AW-…` et l'étiquette dans « Balise Google ».
- Seuls les visiteurs qui acceptent sont comptés par Google Ads : il sous-estime les ventes. La page Admin → Statistiques compte tout.
- Stratégie d'enchères : garder « Clics » (CPC max 2,50 €) tant qu'il y a moins de 15 à 30 conversions ; ensuite passer à « Maximiser les conversions » ou à un coût par action cible.

## Réalisme
Chaque mot-clé a 10 à 100 recherches par mois : le budget de 15 €/jour ne sera sans doute pas dépensé en entier au début. Si les impressions sont très faibles après une semaine, ajouter des variantes (type de contrat, canton, « suisse ») plutôt que d'augmenter le CPC.
