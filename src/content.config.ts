import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

/**
 * Niveaux d'accès décidés par le comité.
 * Seuls les objets `public` sont générés dans le site statique.
 * Les autres niveaux sont prévus pour une authentification ultérieure (voir README).
 */
export const niveauxAcces = ['public', 'communaute', 'notables', 'reserve'] as const;

const objets = defineCollection({
  loader: file('./src/data/objets.json'),
  schema: z.object({
    id: z.string(),
    slug: z.string(),
    titre: z.string(),
    nom_medumba: z.string().nullable(),
    categorie: z.string(),
    vedette: z.boolean().default(false),
    image: z.string(),
    description: z.string(),
    histoire: z.string().nullable(),
    histoire_statut: z.string().nullable(),
    matieres: z.string().nullable(),
    dimensions: z.string().nullable(),
    epoque: z.string().nullable(),
    acces: z.enum(niveauxAcces).default('public'),
    credit_photo: z.string().nullable(),
    parrain: z.string().nullable().optional(),
    salle: z.string().nullable().optional(),
    a_valider: z.array(z.string()).optional(),
  }),
});

export const collections = { objets };
