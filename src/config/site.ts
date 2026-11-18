/**
 * Configuration unique du site COMENGA.
 * Tout ce qui peut changer d'une édition à l'autre se modifie ici, et seulement ici.
 */
export const site = {
  /** Nom de domaine du site. Ne pas coder en dur ailleurs. */
  url: 'https://comengangte.com',
  nom: "COMENGA'NGTE",
  nomLong: 'Congrès Mondial des Filles et Fils Bangangté',
  nomAnglais: 'World Congress of the Ngangte People',
  nomHistorique: 'Congrès mondial des élites et notables bangangté (COMENGA)',
  signature: "Plus de 4 siècles de patrimoine culturel à partager dans l'unité",
  devise: 'Noblesse – Dignité – Élégance',

  edition: {
    annee: 2026,
    /** Dates ISO (heure locale du Cameroun, UTC+1). */
    debut: '2026-11-25T00:00:00+01:00',
    fin: '2026-12-06T23:59:59+01:00',
    datesTexte: 'Du 25 novembre au 6 décembre 2026',
    datesCourtes: '25 nov. – 6 déc. 2026',
    lieu: 'Esplanade de la chefferie supérieure Bangangté',
    lieuDetail: 'Département du Ndé, région de l’Ouest, Cameroun',
  },

  editionsPassees: [
    { annee: 2017, titre: '1er congrès', dates: '8, 9 et 10 décembre 2017', theme: 'Le réveil du peuple bangangté : solidarité et développement' },
    { annee: 2022, titre: 'Congrès 2022', dates: 'Décembre 2022', theme: null },
    { annee: 2024, titre: '4e congrès', dates: 'Du 8 au 14 décembre 2024', theme: null },
  ],

  personnalites: {
    roi: { nom: 'Sa Majesté NJI MONLUH SEIDOU POKAM', titre: 'Roi des Bangangté', fonction: 'Chef supérieur du groupement Bangangté' },
    marraine: { nom: 'Son Excellence Madame Célestine KETCHA COURTÈS', titre: 'Marraine' },
    coPresidents: ['SAH NZWETOM Théodore', 'Mbeuh NJIKI MENGA Guy'],
  },

  partenaire: {
    nom: 'La Route des Chefferies',
    url: 'https://www.routedeschefferies.com',
    role: 'Partenaire scientifique du musée',
    contact: 'contact@routedeschefferies.com',
  },

  chefferie: {
    nom: 'Chefferie supérieure Bangangté',
    url: 'https://www.chefferie-superieure-bangangte.com',
    historique: 'https://www.chefferie-superieure-bangangte.com/historique',
    royaume: 'https://www.chefferie-superieure-bangangte.com/royaume',
  },

  musee: {
    titre: 'Bangangté : Mémoire, pouvoir, savoirs et héritages',
    objetsInventories: 201,
  },

  /**
   * Formulaires (contact, soutenir, contribuer une histoire), sans serveur.
   * - mode 'netlify' : les formulaires sont captés par Netlify Forms après déploiement sur Netlify.
   * - mode 'endpoint' : envoi POST vers `endpoint` (Formspree, Basin, Web3Forms…).
   * - mode 'mailto' : ouverture du client de messagerie vers `contactEmail`.
   * Si `contactEmail` est renseigné, il sert aussi de repli quand l'envoi échoue.
   */
  formulaires: {
    mode: 'netlify' as 'netlify' | 'endpoint' | 'mailto',
    endpoint: '',
    /** Adresse de contact publique du COMENGA : à fournir par le comité. */
    contactEmail: '',
  },

  /** Éditeur du site (mentions légales) : à compléter par le comité. */
  editeur: {
    nom: 'Comité d’organisation du COMENGA’NGTE',
    adresse: 'Chefferie supérieure Bangangté, Ndé, Ouest-Cameroun',
  },

  /** Langues prévues. Seul le français est rédigé pour l'instant. */
  langues: { defaut: 'fr', disponibles: ['fr', 'en', 'mdm'] as const },
};

export type SiteConfig = typeof site;
