# Site du COMENGA'NGTE et musée numérique

Site 100 % statique construit avec [Astro](https://astro.build) et Tailwind CSS. Aucune base de données, aucun serveur à maintenir.

## Lancer en local

```bash
npm install
npm run dev
```

Le site s'ouvre sur `http://localhost:4321`.

Pour produire la version publiable (dossier `dist/`) et la vérifier :

```bash
npm run build
npm run preview
```

## Déployer

Le site se déploie sur n'importe quel hébergeur statique. Le fichier `netlify.toml` est prêt pour Netlify.

**Netlify, en ligne de commande** (une seule fois : `npm install -g netlify-cli` puis `netlify login`) :

```bash
npm run build
netlify deploy --prod --dir=dist
```

**Netlify, depuis GitHub** : pousser le dossier `site/` dans un dépôt, puis « Add new site → Import an existing project ». Commande de build `npm run build`, dossier de publication `dist`. Les formulaires (contact, soutenir, contribuer) sont alors captés automatiquement par Netlify Forms : activer les notifications par e-mail dans *Site settings → Forms → Form notifications*.

**Vercel** : `npx vercel --prod` (framework détecté : Astro). **Cloudflare Pages** : commande de build `npm run build`, dossier `dist`. Dans ces deux cas, passer `formulaires.mode` à `'endpoint'` (Formspree, Basin, Web3Forms…) ou `'mailto'` dans `src/config/site.ts`.

## Brancher le nom de domaine

1. Le domaine `comengangte.com` est enregistré chez Hostinger.
2. Chez l'hébergeur : *Domain management → Add a domain*, puis suivre les enregistrements DNS indiqués (CNAME ou A).
3. Mettre à jour `url` dans `src/config/site.ts` et `Sitemap:` dans `public/robots.txt`, puis redéployer. Le certificat HTTPS est fourni automatiquement.

## Ajouter un objet en 3 étapes

1. Déposer la photo dans `src/assets/objets/` sous le nom `<slug>.jpg` (par exemple `masque-ancien.jpg`). Garder la photo telle quelle, sans recadrage.
2. Ajouter une entrée à la fin de `src/data/objets.json`, en copiant un bloc existant : `id`, `slug` (identique au nom du fichier), `titre`, `categorie`, `description`, `acces`, `credit_photo`. Laisser `histoire` à `null` tant que le récit n'est pas validé : l'encadré « Récit en cours de recueil » s'affiche automatiquement. Mettre `"vedette": true` pour l'afficher à l'accueil (quatre objets vedettes au plus).
3. `npm run build` puis déployer. La page `/musee/objets/<slug>` existe, l'objet apparaît dans la collection, dans les filtres et, selon sa catégorie, dans sa salle.

Pour renseigner un parrain : remplir `"parrain": "Nom du parrain"` dans l'entrée de l'objet.

## Modifier dates, noms et textes

- **Dates de l'édition, lieu, noms et titres, adresse de contact, domaine** : un seul fichier, `src/config/site.ts`.
- **Dynastie** : `src/data/dynastie.json` (ajouter les rois suivants à la suite).
- **Textes des pages** : `src/pages/*.astro` (le texte est écrit en clair dans chaque page).
- **Salles du musée et rattachement des catégories** : `src/lib/objets.ts`, tableau `salles`.
- **Packs de mécénat** : `src/pages/soutenir.astro`, tableau `packs`.
- **Libellés d'interface** (menu, boutons) : `src/i18n/ui.ts`. La structure est prête pour l'anglais (`en`) et le Medumba (`mdm`) : il suffit de remplir les dictionnaires et d'activer les langues dans `astro.config.mjs`.
- **Vidéos** : déposer le fichier dans `public/videos/` et son image d'aperçu dans `src/assets/posters/<même-nom>.jpg`.

## Activer plus tard les accès réservés (Supabase Auth)

1. Les quatre niveaux (`public`, `communaute`, `notables`, `reserve`) sont déjà dans le schéma de `src/content.config.ts` et dans chaque objet (`acces`).
2. Aujourd'hui, `objetsPublics()` dans `src/lib/objets.ts` ne retient que les objets `public` : rien d'autre ne sort du build, ni page ni image.
3. Pour ouvrir les niveaux `communaute` et `notables`, passer les pages du musée en rendu à la demande (`export const prerender = false` et un adaptateur Astro, par exemple `@astrojs/netlify`).
4. Créer un projet Supabase, activer Auth (e-mail ou lien magique) et une table `profils` portant le rôle de chaque personne (`communaute` ou `notables`).
5. Dans un `src/middleware.ts`, lire la session Supabase et placer le rôle dans `Astro.locals`.
6. Faire accepter ce rôle par `objetsPublics(role)` : retourner les objets dont le niveau est inférieur ou égal au rôle.
7. Servir les photos des objets non publics depuis un bucket Supabase Storage privé (URL signées), pas depuis `src/assets`.
8. Les objets `reserve` restent exclus quoi qu'il arrive.
9. Les pages existantes (collection, fiche, salles) n'ont pas à changer : elles consomment déjà la liste retournée par `objetsPublics()`.
10. La « Charte d'accès » (`/charte-acces`) explique déjà ces niveaux au public.

## Structure

```
src/config/site.ts      configuration unique (dates, noms, contact, domaine, formulaires)
src/data/               objets.json, dynastie.json
src/assets/             photos (objets, fresques, lieux, inventaire, congrès, logo, aperçus vidéo)
src/components/         en-tête, pied de page, bande ndop, panthère, cartes, formulaire, vidéo
src/layouts/Base.astro  gabarit commun (SEO, Open Graph, lang="fr")
src/pages/              une page par fichier ; musee/ pour le musée numérique
src/i18n/ui.ts          libellés d'interface, prêts pour en et mdm
public/videos/          vidéos (chargées à la demande)
```
