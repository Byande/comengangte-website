// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { site } from './src/config/site.ts';

// https://astro.build/config
export default defineConfig({
  site: site.url,
  output: 'static',
  trailingSlash: 'never',
  // Pages en fichiers plats (musee.html) : Netlify sert /musee sans ajouter de barre oblique.
  build: { format: 'file' },
  integrations: [
    sitemap({
      serialize: (item) => ({ ...item, url: item.url.replace(/\.html$/, '').replace(/\/index$/, '/') }),
    }),
  ],
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en', 'mdm'],
    routing: { prefixDefaultLocale: false },
  },
  image: {
    // Les photos d'objets ne sont jamais recadrées : on garde les proportions d'origine.
    responsiveStyles: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
