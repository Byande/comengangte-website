import { getCollection, type CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';

export type Objet = CollectionEntry<'objets'>;

/** Photos d'objets : le nom de fichier correspond au `slug` de l'objet. */
const photos = import.meta.glob<ImageMetadata>('/src/assets/objets/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
});

export function photoObjet(slug: string): ImageMetadata | undefined {
  const entry = Object.entries(photos).find(([path]) => path.split('/').pop()?.replace(/\.[^.]+$/, '') === slug);
  return entry?.[1];
}

/**
 * Règle de confidentialité du build statique : seuls les objets `public` sortent du build.
 * Un objet d'un autre niveau ne produit ni page, ni image.
 * Quand l'authentification sera branchée, cette fonction prendra le rôle de l'utilisateur en paramètre.
 */
export async function objetsPublics(): Promise<Objet[]> {
  const tous = await getCollection('objets', ({ data }) => data.acces === 'public');
  return tous.filter((o) => photoObjet(o.data.slug)).sort((a, b) => a.data.id.localeCompare(b.data.id));
}

export async function objetsVedettes(): Promise<Objet[]> {
  return (await objetsPublics()).filter((o) => o.data.vedette);
}

export function categories(objets: Objet[]): string[] {
  return [...new Set(objets.map((o) => o.data.categorie))].sort((a, b) => a.localeCompare(b, 'fr'));
}

/** Rattachement des catégories aux quatre salles thématiques, quand il est évident. */
export const salles = [
  {
    slug: 'histoire-civilisation-migration',
    numero: 1,
    titre: 'Histoire, civilisation et migration',
    propos:
      'Les origines communes des peuples Bangangté et Bamoun, et la proximité entre la langue Medumba et le Bamoun.',
    categories: [] as string[],
  },
  {
    slug: 'royaute-noblesse-pouvoir',
    numero: 2,
    titre: 'Royauté, noblesse et pouvoir',
    propos:
      'Les regalia, les sculptures et les objets vivants mobilisés lors des cérémonies. La place des Reines mères.',
    categories: ['Regalia', 'Sculptures', 'Objets cérémoniels', 'Vie de cour'],
  },
  {
    slug: 'patrimoine-vivant-identite',
    numero: 3,
    titre: 'Patrimoine vivant et identité',
    propos: 'Les danses Mangan Mbeu et Bensikin, les costumes, la langue Medumba.',
    categories: ['Instruments'],
  },
  {
    slug: 'architecture-du-temps',
    numero: 4,
    titre: 'Architecture du temps : mémoire coloniale',
    propos:
      'L’ancien palais royal, de construction coloniale allemande : une hybridation des traditions locales et des apports européens.',
    categories: ['Architecture'],
  },
] as const;

export type Salle = (typeof salles)[number];

export function objetsDeSalle(salle: Salle, objets: Objet[]): Objet[] {
  return objets.filter((o) => (salle.categories as readonly string[]).includes(o.data.categorie));
}
