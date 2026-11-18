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
  integrations: [sitemap()],
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
