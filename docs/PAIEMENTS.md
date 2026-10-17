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

Flux (décision du propriétaire du 16 oct. : payer tout de suite, pas après confirmation) :

1. Prestation à **prix fixe** : le client remplit le formulaire, puis est redirigé directement vers Stripe Checkout (CHF, montant calculé côté serveur : prix du catalogue + express). Rien n'est « confirmé » tant que le webhook n'a pas reçu le paiement. Remboursement intégral si Thrax Legal décline la commande (CGV art. 5 et 12).
2. **Devis** et prix « dès » (`from: true`), ou Stripe non configuré/en panne : parcours manuel. Le client reçoit l'accusé de réception ; dans l'admin → Prospects, « Confirmer et envoyer le lien de paiement » (montant modifiable) crée la session et envoie le lien par email (4 langues).
3. Le webhook `POST /api/stripe/webhook` est la seule source de vérité : il vérifie la signature, marque `order_payments` « paid » (une seule fois, même si Stripe renvoie l'événement), passe le prospect à « Converti », envoie la confirmation au client et une notification à l'admin. La page de retour (`/commande/merci?paid=1`) ne confirme rien.
4. Une commande abandonnée avant paiement reste « En attente » dans Prospects (la session expire après 24 h) : l'admin peut renvoyer un lien.

Configuration (secrets du Worker Cloudflare, jamais dans le code ni dans le chat) :

- `STRIPE_SECRET_KEY` : clé restreinte (`rk_…`) avec Checkout Sessions en écriture et PaymentIntents en lecture.
- `STRIPE_WEBHOOK_SECRET` : clé de signature (`whsec_…`) du point d'accès webhook `https://thrax-legal.ch/api/stripe/webhook`, événements `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `checkout.session.expired`.
- Sans `STRIPE_SECRET_KEY`, l'admin affiche « Pas encore activé » et rien d'autre ne change.
- Dans Stripe : ne pas activer Managed Payments (le code envoie `managed_payments[enabled]=false` à chaque session ; réglage du compte : dashboard.stripe.com/settings/managed-payments), Stripe Tax ni Invoicing (franchise de TVA, frais inutiles). Moyens de paiement (carte, TWINT) réglés dans le tableau de bord, jamais dans le code.
- Montants : toujours fixés côté serveur (admin), en CHF, entre 5 et 5 000. Stripe verse en EUR sur l'IBAN ING (jamais d'IBAN ING affiché au client).
- Le courriel de confirmation sert de preuve de paiement avec la mention de franchise de TVA ; une vraie facture (numérotée) reste à produire pour les entreprises qui en demandent une.

## État (16 oct. 2026)

- Stripe en **production** : paiement direct à la commande (prix fixe), carte + TWINT, webhook de production, Radar Lite, Managed Payments et Stripe Tax désactivés, versements en EUR sur l'IBAN ING. Test réel de bout en bout validé par le propriétaire (confirmation client, notification admin, « Payé » dans l'admin, webhook 200).
- Secrets Cloudflare : `STRIPE_SECRET_KEY` (clé restreinte `rk_live_…`), `STRIPE_WEBHOOK_SECRET` (signature du webhook de production). Diagnostic : Admin → Paramètres → « Tester Stripe ».
- Reste à faire : facture numérotée pour les entreprises (franchise de TVA), relecture des CGV par un juriste suisse, suppression des commandes « TEST » dans Prospects.


## Rappel automatique des paiements non finalisés
- Le lien Stripe d'une commande directe reste valable **1 heure**. À l'expiration, Stripe envoie `checkout.session.expired` (l'événement doit être coché dans la destination webhook) et le site envoie **un seul email de rappel** avec un nouveau lien valable 24 h.
- Message purement transactionnel : aucune offre, aucune réduction, aucune publicité. Mentionné dans la politique de confidentialité.
- Jamais de rappel : si une session de la commande a été payée, si un rappel a déjà été envoyé (colonne `order_payments.reminder_sent_at`), ni pour un lien créé à la main depuis l'admin (devis).
- Code : `sendAbandonedOrderReminder` (`src/lib/payments/checkout.ts`), appelé depuis le webhook. Les actions `order_reminder_sent` et `order_reminder_failed` sont dans le journal.
