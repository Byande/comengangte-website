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

## Déployer sur Hostinger (hébergement du comité, domaine comengangte.com)

Le site est publié selon la filière habituelle **GitHub → Hostinger (Avancé → GIT, déploiement automatique)**, avec une différence : un site Astro doit être **construit** avant d'être servi. La construction est automatisée par GitHub Actions.

- Branche `main` : le code source (ce dossier).
- Branche `hostinger` : le site construit (contenu de `dist/`), produite automatiquement à chaque push sur `main` par `.github/workflows/hostinger.yml`. C'est **cette branche** que Hostinger clone.

**Mise en place, une seule fois (hPanel)**

1. Pousser ce dossier sur un dépôt GitHub public dédié, par exemple `Byande/comengangte-website`, branche `main`. Attendre la fin de l'action GitHub (onglet *Actions*) : la branche `hostinger` apparaît.
2. hpanel.hostinger.com → *Sites web* → le site rattaché à `comengangte.com` → *Avancé → GIT*.
3. *Création d'un nouveau dépôt* : dépôt `https://github.com/Byande/comengangte-website.git`, branche **`hostinger`**, répertoire vide → *Créer*.
4. *Déployer*, puis *Déploiement automatique* (webhook GitHub).
5. *Avancé → SSL* : vérifier que le certificat est actif.
6. Formulaires : copier `formulaire-config.exemple.php` en `formulaire-config.php` (via le gestionnaire de fichiers Hostinger, à la racine du site, ou dans `public/` avant de pousser) et y mettre l'adresse e-mail du comité. Créer chez Hostinger l'adresse expéditrice (par exemple `site@comengangte.com`). Tant que l'adresse n'est pas renseignée, les messages sont consignés dans `formulaires-en-attente.log` sur le serveur.

**Mises à jour ensuite** : modifier, `git commit`, `git push` sur `main`. GitHub construit le site (environ deux minutes) et Hostinger redéploie tout seul. Sans GitHub Actions, `npm run deploy:hostinger` fait la même chose depuis cet ordinateur.

**Autres hébergeurs** (secours) : `netlify.toml` est prêt pour Netlify (`npx netlify deploy --prod --dir=dist`) ; Vercel et Cloudflare Pages acceptent `npm run build` et le dossier `dist`. Dans ces cas, adapter `formulaires` dans `src/config/site.ts` (le script PHP ne fonctionne que sur un hébergement PHP comme Hostinger).

## Brancher le nom de domaine

Le domaine `comengangte.com` est enregistré chez Hostinger et déjà rattaché à l'hébergement. Si le site est un jour hébergé ailleurs : *Domaines → DNS* chez Hostinger, enregistrement A (`@`) vers l'adresse de l'hébergeur et CNAME `www`. Mettre à jour `url` dans `src/config/site.ts` et `Sitemap:` dans `public/robots.txt`, puis redéployer.

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
