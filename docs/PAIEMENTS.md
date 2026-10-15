# Paiements et banque — règles du propriétaire

Décisions et contraintes à respecter pour tout ce qui touche à l'encaissement (site, factures, emails, admin).

## ⚠️ Règle n° 1 : jamais de virement en francs suisses (CHF) sur le compte ING

D'après la grille tarifaire pro d'ING (tarif au 1er juillet 2026), un virement en CHF reçu d'une banque suisse coûte :

- 0,12 % de commission, avec un minimum de 12 € ;
- plus une marge de change de 3,25 %.

Sur 290 CHF, il resterait environ 21 € de moins, soit ~7 %.

Conséquences pour le code et les documents :

- **Ne jamais afficher l'IBAN ING** sur une facture, un email ou une page en CHF.
- Les paiements passent par **Stripe** : il encaisse en CHF et verse en **euros par virement SEPA** sur le compte ING (gratuit côté ING).
- Client qui veut payer par virement : lui donner des coordonnées **en euros**, ou plus tard un compte **Wise** avec coordonnées CHF (conversion bien moins chère).
- Les frais carte en devise d'ING (marge 3,22 %) ne concernent que les dépenses du propriétaire en CHF avec sa carte ING, pas les encaissements.

## Cadre (octobre 2026)

- Numéro d’entreprise (BCE) : 1043.879.554 (reçu le 15 oct. 2026), affiché à l’art. 14 des CGV via `BCE_NUMBER`. Le n° de TVA BE 1043.879.554 existe mais l’activité reste en franchise : ne jamais facturer de TVA ni afficher ce n° comme assujetti.
- Statut : étudiant-indépendant en Belgique (personne physique), code NACE-BEL 69100 « Activités juridiques », franchise TVA.
- Banque : Compte à vue Professionnel ING (Starters Package : gratuit 12 mois, puis 8 € HTVA/mois ≈ 8,63 € TVAC). Clôture possible à tout moment sans frais (Règlement général, art. 59).
- Cashback ING : 111,50 € d'inscription BCE remboursés si le compte est utilisé 3 mois de suite avec au moins une opération par mois ; demande manuelle via ing.be/starters-cashback (action jusqu'au 31 décembre 2026).
- Prestataire de paiement prévu : Stripe (Checkout + Billing), TWINT à demander dans Stripe.
- Rappels du propriétaire : à 11 mois, garder ou fermer le compte ING ; avant la fin des études, cesser l'activité ou changer de statut (sinon cotisations d'indépendant ordinaire).

## Paiement en ligne (Stripe Checkout) — implémenté le 15 oct. 2026

Flux « paiement après accord » :

1. Le client commande (formulaire) : il devient un prospect avec la prestation, rien n'est encaissé. L'email lui dit « vous ne payez rien avant notre confirmation ».
2. Dans l'admin → Prospects, la fiche affiche « Paiement en ligne (Stripe, CHF) » : le montant est pré-rempli (prix du catalogue + express), modifiable (devis, prix « dès »). Le bouton « Confirmer et envoyer le lien de paiement » crée une session Stripe Checkout en CHF et envoie le lien au client (4 langues).
3. Le webhook `POST /api/stripe/webhook` est la seule source de vérité : il vérifie la signature, marque `order_payments` « paid » (une seule fois, même si Stripe renvoie l'événement), passe le prospect à « Converti », et envoie la confirmation au client + une notification à l'admin. La page de retour (`/commande/merci?paid=1`) ne confirme rien.

Configuration (secrets du Worker Cloudflare, jamais dans le code ni dans le chat) :

- `STRIPE_SECRET_KEY` : clé restreinte (`rk_…`) avec Checkout Sessions en écriture et PaymentIntents en lecture.
- `STRIPE_WEBHOOK_SECRET` : clé de signature (`whsec_…`) du point d'accès webhook `https://thrax-legal.ch/api/stripe/webhook`, événements `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `checkout.session.expired`.
- Sans `STRIPE_SECRET_KEY`, l'admin affiche « Pas encore activé » et rien d'autre ne change.
- Dans Stripe : ne pas activer Managed Payments, Stripe Tax ni Invoicing (franchise de TVA, frais inutiles). Moyens de paiement (carte, TWINT) réglés dans le tableau de bord, jamais dans le code.
- Montants : toujours fixés côté serveur (admin), en CHF, entre 5 et 5 000. Stripe verse en EUR sur l'IBAN ING (jamais d'IBAN ING affiché au client).
- Le courriel de confirmation sert de preuve de paiement avec la mention de franchise de TVA ; une vraie facture (numérotée) reste à produire pour les entreprises qui en demandent une.
