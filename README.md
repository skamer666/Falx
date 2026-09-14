# Falx

Landing page de Falx — legaltech suisse (génération automatisée de statuts de Sàrl, conformité nLPD et contrats PME). Next.js (App Router) + TypeScript + Tailwind CSS.

## Démarrer en local

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Structure

- `src/app` — layout racine, polices (Fraunces / Inter) et page d'accueil
- `src/components/site` — sections de la landing page (Nav, Hero, Sécurité, Tarifs, etc.)
- `src/components/Reveal.tsx` — animation d'apparition au scroll
- `src/app/globals.css` — tokens Tailwind (couleurs papier / encre / sapin, typographies)

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
