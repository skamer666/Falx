# Audit de sécurité (17 oct. 2026)

Audit du code et du site en ligne, fait par relecture + essais locaux. Ce n'est pas un test d'intrusion.

## Ce qui est solide
- **Injection SQL** : toutes les requêtes D1 sont préparées avec `?` et `.bind()`. Les rares `${…}` dans du SQL ne contiennent que des constantes du code (noms de colonnes, listes de `?`), jamais une saisie utilisateur.
- **Authentification** : mots de passe hachés (PBKDF2-SHA256, 100 000 itérations, plafond de Cloudflare Workers, sel aléatoire), jetons de réinitialisation hachés, à usage unique et expirants, limitation des tentatives par email et par IP, cookie de session `HttpOnly`, `Secure`, `SameSite=Lax`.
- **Autorisations** : chaque action d'administration vérifie l'admin ; `/api/admin/export` et `/api/files` aussi. Un client ne télécharge que `dossiers/<son id>/…` (pas de `..`), les fichiers sont servis en téléchargement (`octet-stream`, `nosniff`).
- **Export CSV** : neutralisation des formules Excel.
- **Webhook Stripe** : signature HMAC vérifiée, tolérance 5 min, traitement idempotent.
- **Secrets** : aucun secret dans le code ni dans git ; clés dans les secrets Cloudflare (clé Stripe restreinte).
- **Statistiques anonymes** : plafond de visites par visiteur et par jour, longueurs bornées.
- **Formulaires publics** : champ piège anti-robot, limitation de débit, validation côté serveur.

## Corrigé le 17 oct.
- Les pages n'envoyaient que HSTS : ajout de `X-Frame-Options: DENY`, `Content-Security-Policy: frame-ancestors 'none'; base-uri 'self'; object-src 'none'`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` (dans `src/proxy.ts`).
- JSON-LD : `<` échappé dans le script (aucun risque aujourd'hui, car le contenu est statique, mais ça évite `</script>`).

## Reste à surveiller
- **Dépendances** (`npm audit`) : `next` 16.3.5 signalé critique (exécution de code dans `next/og` ImageResponse, fuite de contenu `use cache`). Le site n'utilise ni l'un ni l'autre, donc non exploitable ici ; à mettre à jour (next ≥ 16.4.2) après le lancement, avec test complet car vinext est en bêta. Les autres alertes (braces, micromatch, source-map-js, sharp) touchent l'outillage de build, pas le site en ligne.
- **CSP complète** (`script-src`) : non activée volontairement, elle casserait les scripts en ligne de Next, YouTube et Google Ads. À étudier avec des nonces plus tard.
- **PBKDF2 à 100 000 itérations** : sous la recommandation OWASP (600 000) mais c'est le maximum permis sur Workers.
- **Cloudflare** : activer « Bot Fight Mode » et une règle de limitation de débit sur `/api/*` et les formulaires (réglage dans le tableau de bord, hors code) ; activer l'authentification à deux facteurs sur Cloudflare, Stripe, Resend, Google, GitHub et la boîte `hey@thrax-legal.ch`.
- **Sauvegardes D1** : prévoir un export régulier (Admin → export CSV existe ; sauvegarde D1 « Time Travel » disponible côté Cloudflare).
