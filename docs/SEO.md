# SEO — état et règles (16-17 oct. 2026)

Audit des 264 pages (4 langues) : aucun titre ou description dupliqué, canonical et hreflang corrects partout, un seul H1 par page, données structurées valides, aucun lien interne cassé ni page orpheline, pages légères (240 à 320 Ko au total).

## Fait lors de cet audit
- **Titres des fiches prestation** : sujet + « en Suisse » + prix, avec la marque quand ça tient en 60 caractères (`serviceSeoTitle` dans `src/lib/services/route.ts`). Titres d'accueil EN/IT ramenés à ≤ 60 caractères, titres de contact plus descriptifs.
- **Accueil et contact** : l'accueil passait de ~210 à ~800 mots (texte, 12 prestations populaires avec liens, FAQ de 5 questions + FAQPage JSON-LD) sans toucher au choix particulier/entreprise en haut de page. Contact : coordonnées et identité de l'exploitant.
- **FAQ** : les réponses sont maintenant toujours dans le HTML (masquées par l'attribut `hidden` tant que la question est fermée) : elles sont indexables.
- **Données structurées** : identifiants stables (`ORG_ID`, `WEBSITE_ID` dans `src/lib/site.ts`), entité WebSite, sameAs (chaîne YouTube), `VideoObject` sur les fiches prestation, les guides et la vidéo de présentation (titres et dates dans `src/lib/videos-meta.ts`).
- **Images** : texte alternatif sur les affiches vidéo.
- **Sitemap** : `lastmod` = vraies dates de modification (constante `CONTENT_UPDATED`, version des CGV, dates des guides) au lieu de « maintenant ».
- **Cache** : `public/_headers` (JS/CSS hachés : 1 an, immutable ; images : 30 jours) et en-têtes de sécurité de base.

## À faire à la main quand le contenu change
- Mettre à jour `CONTENT_UPDATED` (`src/lib/site.ts`) quand une fiche ou une page change réellement (sinon `lastmod` ment).
- `src/lib/videos-meta.ts` : ajouter le titre et la date d'une nouvelle vidéo YouTube (sinon valeurs par défaut).
- Soumettre le sitemap dans la Search Console après chaque ajout important de pages.

## Non fait (volontairement)
- Pas de nouveaux guides (prévu plus tard).
- Pas de balises « AggregateRating » ni d'avis : aucun avis réel pour l'instant.
- Pas d'adresse postale dans `LegalService` (l'exploitant est en Belgique, le service vise la Suisse romande).
