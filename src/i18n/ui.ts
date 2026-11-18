/**
 * Chaînes d'interface, prêtes pour l'anglais (en) et le Medumba (mdm).
 * Seul le français est rédigé. Les autres langues retombent sur le français.
 */
export const langues = { fr: 'Français', en: 'English', mdm: 'Medumba' } as const;
export type Langue = keyof typeof langues;
export const langueParDefaut: Langue = 'fr';

export const ui = {
  fr: {
    'nav.accueil': 'Accueil',
    'nav.congres': 'Le Congrès',
    'nav.chefferie': 'La Chefferie',
    'nav.musee': 'Musée numérique',
    'nav.soutenir': 'Soutenir',
    'nav.medias': 'Médias',
    'nav.contact': 'Contact',
    'nav.menu': 'Menu',
    'nav.fermer': 'Fermer',
    'nav.skip': 'Aller au contenu',
    'footer.mentions': 'Mentions légales',
    'footer.charte': 'Charte d’accès',
    'footer.partenaire': 'Partenaire scientifique du musée',
    'footer.chefferie': 'Site de la chefferie',
    'musee.collection': 'La collection',
    'musee.salles': 'Les salles',
    'musee.coulisses': 'Les coulisses',
    'musee.futur': 'Le futur musée',
    'objet.parrainer': 'Parrainer cet objet',
    'objet.contribuer': 'Vous connaissez l’histoire de cet objet ? Contribuez',
    'objet.recit': 'Récit en cours de recueil',
    'objet.voisins': 'Objets voisins',
    'objet.zoom': 'Agrandir la photo',
    'objet.credit': 'Crédit photo',
    'collection.recherche': 'Rechercher un objet',
    'collection.toutes': 'Toutes',
    'collection.aucun': 'Aucun objet ne correspond à votre recherche.',
    'compte.jours': 'jours',
    'compte.heures': 'heures',
    'compte.encours': 'Le congrès a lieu en ce moment',
    'compte.termine': 'Cette édition est terminée',
    'form.nom': 'Votre nom',
    'form.email': 'Votre adresse e-mail',
    'form.message': 'Votre message',
    'form.envoyer': 'Envoyer',
  },
  en: {},
  mdm: {},
} as const;

export type Cle = keyof (typeof ui)['fr'];

export function t(cle: Cle, langue: Langue = langueParDefaut): string {
  const dict = ui[langue] as Partial<Record<Cle, string>>;
  return dict[cle] ?? ui.fr[cle];
}
