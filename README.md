# Falx

Landing page de Falx (Thrax Legal) — legaltech suisse, service unique de mise en conformité nLPD pour PME (diagnostic gratuit, Pack Conformité à prix fixe, Suivi Conformité en abonnement). Next.js (App Router) + TypeScript + Tailwind CSS.

## Démarrer en local

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Structure

- `src/app/page.tsx` — page unique nLPD (diagnostic, offre, comparatif, FAQ)
- `src/app/suivi-conformite` — page de l'abonnement Suivi Conformité
- `src/components/site` — Nav, Footer, Autodiagnostic et composants UI partagés
- `src/components/Reveal.tsx` — animation d'apparition au scroll
- `src/app/globals.css` — tokens Tailwind (couleurs, typographies)

## Notes

- Les logos, chiffres et témoignages sont des exemples à remplacer par des données réelles avant la mise en ligne.
- Palette : papier (fond clair), encre (modules produit/sécurité), sapin (accent).

## Scripts

```bash
npm run dev     # serveur de développement
npm run build   # build de production
npm run start   # démarrage du build de production
npm run lint    # ESLint
```
