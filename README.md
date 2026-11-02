# Madagascar Cheky (PWA, frontend)

React + Vite + Tailwind CSS (compilé en local, sans CDN) + vite-plugin-pwa.

## Lancer
```bash
npm install
npm run dev          # développement
npm run build        # production (génère le service worker)
npm run preview      # tester la PWA hors ligne : build puis preview, ouvrir, couper le réseau
```

## Structure
- `src/store.jsx` : langue, mode sombre, signets, statut en ligne, routage par hash
- `src/i18n.js` : traductions MG / FR / EN
- `src/data/mock.js` : données de démonstration (à remplacer par votre API)
- `src/components/` : Header, BottomNav (mobile), NewsCard, VerifyBox, ui
- `src/pages/` : Actualites, Statistiques, Contacts, Rediger, Signets

Le menu « Dossiers » a été supprimé : les dossiers thématiques sont dans Rédiger.
