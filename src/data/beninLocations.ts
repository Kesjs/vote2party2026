export interface Location {
  id: string;
  name: string;
}

export interface Commune extends Location {
  departementId: string;
  circonscriptions?: Circonscription[];
}

export interface Circonscription extends Location {
  communeId: string;
  arrondissements?: Arrondissement[];
}

export interface Arrondissement extends Location {
  circonscriptionId: string;
}

export interface Departement extends Location {
  communes?: Commune[];
}

export interface CirconscriptionElectorale extends Location {
  numero: number;
  sieges: number;
  siegesFemmes: number;
  departementIds: string[];
  communeIds: string[];
  arrondissements?: string[]; // Pour les arrondissements de Cotonou
}

// Données des circonscriptions électorales du Bénin
export const circonscriptionsElectorales: CirconscriptionElectorale[] = [
  {
    id: 'circo-1',
    name: 'Première circonscription électorale',
    numero: 1,
    sieges: 3,
    siegesFemmes: 1,
    departementIds: ['ali'],
    communeIds: ['kandi', 'malanville', 'karimama']
  },
  {
    id: 'circo-2',
    name: 'Deuxième circonscription électorale',
    numero: 2,
    sieges: 3,
    siegesFemmes: 1,
    departementIds: ['ali'],
    communeIds: ['gogounou', 'banikoara', 'segbanan']
  },
  {
    id: 'circo-3',
    name: 'Troisième circonscription électorale',
    numero: 3,
    sieges: 3,
    siegesFemmes: 1,
    departementIds: ['ata'],
    communeIds: ['boukoumbe', 'cobly', 'mat_et_ou', 'tanguieta']
  },
  {
    id: 'circo-4',
    name: 'Quatrième circonscription électorale',
    numero: 4,
    sieges: 4,
    siegesFemmes: 1,
    departementIds: ['ata'],
    communeIds: ['kerou', 'kouande', 'natitingou', 'pehonco', 'toucountouna']
  },
  {
    id: 'circo-5',
    name: 'Cinquième circonscription électorale',
    numero: 5,
    sieges: 5,
    siegesFemmes: 1,
    departementIds: ['atl'],
    communeIds: ['allada', 'kpodaha', 'Kpomassè', 'ouidah', 'toffo', 'tori_bossito']
  },
  {
    id: 'circo-6',
    name: 'Sixième circonscription électorale',
    numero: 6,
    sieges: 4,
    siegesFemmes: 1,
    departementIds: ['atl'],
    communeIds: ['abomey_calavi', 'so_ava', 'ze']
  },
  {
    id: 'circo-7',
    name: 'Septième circonscription électorale',
    numero: 7,
    sieges: 4,
    siegesFemmes: 1,
    departementIds: ['bor'],
    communeIds: ['nikki', 'bembereke', 'sinende', 'kalale']
  },
  {
    id: 'circo-8',
    name: 'Huitième circonscription électorale',
    numero: 8,
    sieges: 4,
    siegesFemmes: 1,
    departementIds: ['bor'],
    communeIds: ['perere', 'parakou', 'tchaourou', 'n_dali']
  },
  {
    id: 'circo-9',
    name: 'Neuvième circonscription électorale',
    numero: 9,
    sieges: 3,
    siegesFemmes: 1,
    departementIds: ['col', 'bor'],
    communeIds: ['bante', 'dassa_zoume', 'savalou']
  },
  {
    id: 'circo-10',
    name: 'Dixième circonscription électorale',
    numero: 10,
    sieges: 3,
    siegesFemmes: 1,
    departementIds: ['col'],
    communeIds: ['ouesse', 'glazoue', 'savalou_agbado']
  },
  {
    id: 'circo-11',
    name: 'Onzième circonscription électorale',
    numero: 11,
    sieges: 3,
    siegesFemmes: 1,
    departementIds: ['kou'],
    communeIds: ['aplahoue', 'djakotomey', 'klouekanme']
  },
  {
    id: 'circo-12',
    name: 'Douzième circonscription électorale',
    numero: 12,
    sieges: 3,
    siegesFemmes: 1,
    departementIds: ['kou'],
    communeIds: ['dogbo', 'lalo', 'toviklin']
  },
  {
    id: 'circo-13',
    name: 'Treizième circonscription électorale',
    numero: 13,
    sieges: 2,
    siegesFemmes: 1,
    departementIds: ['don'],
    communeIds: ['djougou']
  },
  {
    id: 'circo-14',
    name: 'Quatorzième circonscription électorale',
    numero: 14,
    sieges: 2,
    siegesFemmes: 1,
    departementIds: ['don'],
    communeIds: ['bassila', 'copargo', 'ouake']
  },
  {
    id: 'circo-15',
    name: 'Quinzième circonscription électorale',
    numero: 15,
    sieges: 4,
    siegesFemmes: 1,
    departementIds: ['lit'],
    communeIds: ['cotonou'],
    arrondissements: ['1er arrondissement', '2e arrondissement', '3e arrondissement', '4e arrondissement', '5e arrondissement', '6e arrondissement']
  },
  {
    id: 'circo-16',
    name: 'Seizième circonscription électorale',
    numero: 16,
    sieges: 5,
    siegesFemmes: 1,
    departementIds: ['lit'],
    communeIds: ['cotonou'],
    arrondissements: ['7e arrondissement', '8e arrondissement', '9e arrondissement', '10e arrondissement', '11e arrondissement', '12e arrondissement', '13e arrondissement']
  },
  {
    id: 'circo-17',
    name: 'Dix-septième circonscription électorale',
    numero: 17,
    sieges: 3,
    siegesFemmes: 1,
    departementIds: ['mon'],
    communeIds: ['athieme', 'come', 'grand_popoo']
  },
  {
    id: 'circo-18',
    name: 'Dix-huitième circonscription électorale',
    numero: 18,
    sieges: 4,
    siegesFemmes: 1,
    departementIds: ['mon'],
    communeIds: ['bopa', 'lokossa', 'houeyogbe']
  },
  {
    id: 'circo-19',
    name: 'Dix-neuvième circonscription électorale',
    numero: 19,
    sieges: 6,
    siegesFemmes: 1,
    departementIds: ['oue'],
    communeIds: ['adjarra', 'porto_novo', 'seme_kpodji']
  },
  {
    id: 'circo-20',
    name: 'Vingtième circonscription électorale',
    numero: 20,
    sieges: 6,
    siegesFemmes: 1,
    departementIds: ['oue'],
    communeIds: ['adjohoun', 'akpro_misserete', 'avrankou', 'bonou', 'dangbo']
  },
  {
    id: 'circo-21',
    name: 'Vingt-et-unième circonscription électorale',
    numero: 21,
    sieges: 4,
    siegesFemmes: 1,
    departementIds: ['pla'],
    communeIds: ['adja_ouere', 'ifangni', 'sakete']
  },
  {
    id: 'circo-22',
    name: 'Vingt-deuxième circonscription électorale',
    numero: 22,
    sieges: 3,
    siegesFemmes: 1,
    departementIds: ['pla'],
    communeIds: ['ketou', 'pobe']
  },
  {
    id: 'circo-23',
    name: 'Vingt-troisième circonscription électorale',
    numero: 23,
    sieges: 5,
    siegesFemmes: 1,
    departementIds: ['zou'],
    communeIds: ['abomey', 'agbangnizoun', 'bohicon', 'djidja']
  },
  {
    id: 'circo-24',
    name: 'Vingt-quatrième circonscription électorale',
    numero: 24,
    sieges: 5,
    siegesFemmes: 1,
    departementIds: ['zou'],
    communeIds: ['cove', 'ouinhi', 'zagnanado', 'za_kpota', 'zogbodomey']
  }
];

// Données des départements du Bénin
export const departements: Location[] = [
  { id: 'ali', name: 'Alibori' },
  { id: 'ata', name: 'Atacora' },
  { id: 'atl', name: 'Atlantique' },
  { id: 'bor', name: 'Borgou' },
  { id: 'col', name: 'Collines' },
  { id: 'kou', name: 'Couffo' },
  { id: 'don', name: 'Donga' },
  { id: 'lit', name: 'Littoral' },
  { id: 'mon', name: 'Mono' },
  { id: 'oue', name: 'Ouémé' },
  { id: 'pla', name: 'Plateau' },
  { id: 'zou', name: 'Zou' }
];

// Données des communes par département
const communesData: {[key: string]: Omit<Commune, 'circonscriptions'>[]} = {
  // Alibori
  'ali': [
    { id: 'karimama', name: 'Karimama', departementId: 'ali' },
    { id: 'malanville', name: 'Malanville', departementId: 'ali' },
    { id: 'gogounou', name: 'Gogounou', departementId: 'ali' },
    { id: 'kandi', name: 'Kandi', departementId: 'ali' },
    { id: 'segban', name: 'Ségbana', departementId: 'ali' },
    { id: 'banikoara', name: 'Banikoara', departementId: 'ali' }
  ],
  
  // Atacora
  'ata': [
    { id: 'boukoumbe', name: 'Boukoumbé', departementId: 'ata' },
    { id: 'cobly', name: 'Cobly', departementId: 'ata' },
    { id: 'kerou', name: 'Kérou', departementId: 'ata' },
    { id: 'kouande', name: 'Kouandé', departementId: 'ata' },
    { id: 'materi', name: 'Matéri', departementId: 'ata' },
    { id: 'natitingou', name: 'Natitingou', departementId: 'ata' },
    { id: 'pehunco', name: 'Péhunco', departementId: 'ata' },
    { id: 'tanguieta', name: 'Tanguiéta', departementId: 'ata' },
    { id: 'toucountouna', name: 'Toucountouna', departementId: 'ata' }
  ],
  
  // Atlantique
  'atl': [
    { id: 'abomey_calavi', name: 'Abomey-Calavi', departementId: 'atl' },
    { id: 'allada', name: 'Allada', departementId: 'atl' },
    { id: 'kpomasse', name: 'Kpomassè', departementId: 'atl' },
    { id: 'ouidah', name: 'Ouidah', departementId: 'atl' },
    { id: 'so_ava', name: 'Sô-Ava', departementId: 'atl' },
    { id: 'toffo', name: 'Toffo', departementId: 'atl' },
    { id: 'tori_bossito', name: 'Tori-Bossito', departementId: 'atl' },
    { id: 'ze', name: 'Zè', departementId: 'atl' }
  ],
  
  // Borgou
  'bor': [
    { id: 'bembereke', name: 'Bembèrèkè', departementId: 'bor' },
    { id: 'dassa_zoume', name: 'Dassa-Zoumè', departementId: 'bor' },
    { id: 'kalale', name: 'Kalalé', departementId: 'bor' },
    { id: 'n_dali', name: 'N\'Dali', departementId: 'bor' },
    { id: 'nikki', name: 'Nikki', departementId: 'bor' },
    { id: 'parakou', name: 'Parakou', departementId: 'bor' },
    { id: 'perere', name: 'Pèrèrè', departementId: 'bor' },
    { id: 'sinende', name: 'Sinendé', departementId: 'bor' },
    { id: 'tchaourou', name: 'Tchaourou', departementId: 'bor' }
  ],
  
  // Collines
  'col': [
    { id: 'bante', name: 'Bantè', departementId: 'col' },
    { id: 'dassa_zoume2', name: 'Dassa-Zoumè', departementId: 'col' },
    { id: 'glazoue', name: 'Glazoué', departementId: 'col' },
    { id: 'ouesse', name: 'Ouèssè', departementId: 'col' },
    { id: 'savalou', name: 'Savalou', departementId: 'col' },
    { id: 'savalou_ahouan', name: 'Savalou-Ahouan', departementId: 'col' },
    { id: 'savalou_agbado', name: 'Savalou-Agbado', departementId: 'col' }
  ],
  
  // Couffo
  'kou': [
    { id: 'aplahoue', name: 'Aplahoué', departementId: 'kou' },
    { id: 'djakotomey', name: 'Djakotomey', departementId: 'kou' },
    { id: 'klouekanme', name: 'Klouékanmè', departementId: 'kou' },
    { id: 'lalo', name: 'Lalo', departementId: 'kou' },
    { id: 'toviklin', name: 'Toviklin', departementId: 'kou' },
    { id: 'dogo', name: 'Dogbo', departementId: 'kou' }
  ],
  
  // Donga
  'don': [
    { id: 'bassila', name: 'Bassila', departementId: 'don' },
    { id: 'copargo', name: 'Copargo', departementId: 'don' },
    { id: 'djougou', name: 'Djougou', departementId: 'don' },
    { id: 'ouake', name: 'Ouaké', departementId: 'don' }
  ],
  
  // Littoral
  'lit': [
    { id: 'cotonou', name: 'Cotonou', departementId: 'lit' }
  ],
  
  // Mono
  'mon': [
    { id: 'athieme', name: 'Athiémè', departementId: 'mon' },
    { id: 'bopa', name: 'Bopa', departementId: 'mon' },
    { id: 'come', name: 'Comè', departementId: 'mon' },
    { id: 'grand_popoo', name: 'Grand-Popo', departementId: 'mon' },
    { id: 'houeyogbe', name: 'Houéyogbé', departementId: 'mon' },
    { id: 'lokossa', name: 'Lokossa', departementId: 'mon' }
  ],
  
  // Ouémé
  'oue': [
    { id: 'adjohoun', name: 'Adjohoun', departementId: 'oue' },
    { id: 'adjarra', name: 'Adjarra', departementId: 'oue' },
    { id: 'porto_novo', name: 'Porto-Novo', departementId: 'oue' },
    { id: 'avrankou', name: 'Avrankou', departementId: 'oue' },
    { id: 'bonou', name: 'Bonou', departementId: 'oue' },
    { id: 'dangbo', name: 'Dangbo', departementId: 'oue' },
    { id: 'ketou', name: 'Kétou', departementId: 'oue' },
    { id: 'seme_podji', name: 'Sèmè-Podji', departementId: 'oue' }
  ],
  
  // Plateau
  'pla': [
    { id: 'adja_ouere', name: 'Adja-Ouèrè', departementId: 'pla' },
    { id: 'ifangni', name: 'Ifangni', departementId: 'pla' },
    { id: 'ketou2', name: 'Kétou', departementId: 'pla' },
    { id: 'pobe', name: 'Pobè', departementId: 'pla' },
    { id: 'sakete', name: 'Sakété', departementId: 'pla' }
  ],
  
  // Zou
  'zou': [
    { id: 'abomey', name: 'Abomey', departementId: 'zou' },
    { id: 'agbangnizoun', name: 'Agbangnizoun', departementId: 'zou' },
    { id: 'bohicon', name: 'Bohicon', departementId: 'zou' },
    { id: 'cove', name: 'Cové', departementId: 'zou' },
    { id: 'djidja', name: 'Djidja', departementId: 'zou' },
    { id: 'ouihni', name: 'Ouinhi', departementId: 'zou' },
    { id: 'zagnanado', name: 'Zagnanado', departementId: 'zou' },
    { id: 'za_kpota', name: 'Za-Kpota', departementId: 'zou' },
    { id: 'zogbodomey', name: 'Zogbodomey', departementId: 'zou' }
  ]
};

// Données des circonscriptions électorales par commune
const circonscriptionsData: {[key: string]: Omit<Circonscription, 'arrondissements'>[]} = {
  // 1ère circonscription (Alibori)
  'kandi': [{ id: 'circo-1', name: '1ère Circonscription', communeId: 'kandi' }],
  'malanville': [{ id: 'circo-1', name: '1ère Circonscription', communeId: 'malanville' }],
  'karimama': [{ id: 'circo-1', name: '1ère Circonscription', communeId: 'karimama' }],
  
  // 2ème circonscription (Alibori)
  'gogounou': [{ id: 'circo-2', name: '2ème Circonscription', communeId: 'gogounou' }],
  'banikoara': [{ id: 'circo-2', name: '2ème Circonscription', communeId: 'banikoara' }],
  'segban': [{ id: 'circo-2', name: '2ème Circonscription', communeId: 'segban' }],
  'segbanan': [{ id: 'circo-2', name: '2ème Circonscription', communeId: 'segban' }], // Alias pour compatibilité
  
  // 3ème circonscription (Atacora)
  'boukoumbe': [{ id: 'circo-3', name: '3ème Circonscription', communeId: 'boukoumbe' }],
  'cobly': [{ id: 'circo-3', name: '3ème Circonscription', communeId: 'cobly' }],
  'materi': [{ id: 'circo-3', name: '3ème Circonscription', communeId: 'materi' }],
  'mat_et_ou': [{ id: 'circo-3', name: '3ème Circonscription', communeId: 'materi' }], // Alias pour compatibilité
  'tanguieta': [{ id: 'circo-3', name: '3ème Circonscription', communeId: 'tanguieta' }],
  
  // 4ème circonscription (Atacora)
  'kérou': [{ id: 'circo-4', name: '4ème Circonscription', communeId: 'kérou' }],
  'kouandé': [{ id: 'circo-4', name: '4ème Circonscription', communeId: 'kouandé' }],
  'natitingou': [{ id: 'circo-4', name: '4ème Circonscription', communeId: 'natitingou' }],
  'péhunco': [{ id: 'circo-4', name: '4ème Circonscription', communeId: 'péhunco' }],
  'toucountouna': [{ id: 'circo-4', name: '4ème Circonscription', communeId: 'toucountouna' }],
  
  // 5ème circonscription (Atlantique)
  'allada': [{ id: 'circo-5', name: '5ème Circonscription', communeId: 'allada' }],
  'kpomasse': [{ id: 'circo-5', name: '5ème Circonscription', communeId: 'kpomasse' }],
  'kpodaha': [{ id: 'circo-5', name: '5ème Circonscription', communeId: 'kpomasse' }], // Alias pour compatibilité
  'kpomassè': [{ id: 'circo-5', name: '5ème Circonscription', communeId: 'kpomasse' }], // Alias pour compatibilité
  'ouidah': [{ id: 'circo-5', name: '5ème Circonscription', communeId: 'ouidah' }],
  'toffo': [{ id: 'circo-5', name: '5ème Circonscription', communeId: 'toffo' }],
  'tori_bossito': [{ id: 'circo-5', name: '5ème Circonscription', communeId: 'tori_bossito' }],
  
  // 6ème circonscription (Atlantique)
  'abomey_calavi': [{ id: 'circo-6', name: '6ème Circonscription', communeId: 'abomey_calavi' }],
  'so_ava': [{ id: 'circo-6', name: '6ème Circonscription', communeId: 'so_ava' }],
  'zè': [{ id: 'circo-6', name: '6ème Circonscription', communeId: 'zè' }],
  
  // 7ème circonscription (Borgou)
  'nikki': [{ id: 'circo-7', name: '7ème Circonscription', communeId: 'nikki' }],
  'bembéréké': [{ id: 'circo-7', name: '7ème Circonscription', communeId: 'bembéréké' }],
  'sinendé': [{ id: 'circo-7', name: '7ème Circonscription', communeId: 'sinendé' }],
  'kalalé': [{ id: 'circo-7', name: '7ème Circonscription', communeId: 'kalalé' }],
  
  // 8ème circonscription (Borgou/Atacora)
  'pèrèrè': [{ id: 'circo-8', name: '8ème Circonscription', communeId: 'pèrèrè' }],
  'parakou': [{ id: 'circo-8', name: '8ème Circonscription', communeId: 'parakou' }],
  'tchaourou': [{ id: 'circo-8', name: '8ème Circonscription', communeId: 'tchaourou' }],
  'n_dali': [{ id: 'circo-8', name: '8ème Circonscription', communeId: 'n_dali' }],
  
  // 9ème circonscription (Collines)
  'bantè': [{ id: 'circo-9', name: '9ème Circonscription', communeId: 'bantè' }],
  'dassa': [{ id: 'circo-9', name: '9ème Circonscription', communeId: 'dassa' }],
  'savalou': [{ id: 'circo-9', name: '9ème Circonscription', communeId: 'savalou' }],
  
  // 10ème circonscription (Collines)
  'ouessè': [{ id: 'circo-10', name: '10ème Circonscription', communeId: 'ouessè' }],
  'glazoué': [{ id: 'circo-10', name: '10ème Circonscription', communeId: 'glazoué' }],
  'savè': [{ id: 'circo-10', name: '10ème Circonscription', communeId: 'savè' }],
  
  // 11ème circonscription (Couffo)
  'aplahoué': [{ id: 'circo-11', name: '11ème Circonscription', communeId: 'aplahoué' }],
  'djakotomey': [{ id: 'circo-11', name: '11ème Circonscription', communeId: 'djakotomey' }],
  'klouékanmè': [{ id: 'circo-11', name: '11ème Circonscription', communeId: 'klouékanmè' }],
  
  // 12ème circonscription (Couffo)
  'dogbo': [{ id: 'circo-12', name: '12ème Circonscription', communeId: 'dogbo' }],
  'lalo': [{ id: 'circo-12', name: '12ème Circonscription', communeId: 'lalo' }],
  'toviklin': [{ id: 'circo-12', name: '12ème Circonscription', communeId: 'toviklin' }],
  
  // 13ème circonscription (Donga)
  'djougou': [{ id: 'circo-13', name: '13ème Circonscription', communeId: 'djougou' }],
  
  // 14ème circonscription (Donga/Atacora)
  
  // 15ème et 16ème circonscriptions (Littoral - Cotonou)
  'cotonou': [
    { id: 'circo-15', name: '15ème et 16ème Circonscriptions', communeId: 'cotonou' }
  ],
  
  // ...
};

// Données des arrondissements par circonscription
const arrondissementsData: {[key: string]: Arrondissement[]} = {
  // ...
  
  // Arrondissements de Cotonou - 15ème et 16ème circonscriptions
  'circo-15': [
    { id: 'ctn-1', name: '1er Arrondissement (Centre-ville)', circonscriptionId: 'circo-15' },
    { id: 'ctn-2', name: '2e Arrondissement (Ganhi)', circonscriptionId: 'circo-15' },
    { id: 'ctn-3', name: '3e Arrondissement (Gbegamey)', circonscriptionId: 'circo-15' },
    { id: 'ctn-4', name: '4e Arrondissement (Houéyiho)', circonscriptionId: 'circo-15' },
    { id: 'ctn-5', name: '5e Arrondissement (Fidjrossè)', circonscriptionId: 'circo-15' },
    { id: 'ctn-6', name: '6e Arrondissement (Zogbohouè)', circonscriptionId: 'circo-15' },
    { id: 'ctn-7', name: '7e Arrondissement (Dantokpa)', circonscriptionId: 'circo-15' },
    { id: 'ctn-8', name: '8e Arrondissement (Hêvié)', circonscriptionId: 'circo-15' },
    { id: 'ctn-9', name: '9e Arrondissement (Akpakpa)', circonscriptionId: 'circo-15' },
    { id: 'ctn-10', name: '10e Arrondissement (Cadjehoun)', circonscriptionId: 'circo-15' },
    { id: 'ctn-11', name: '11e Arrondissement (Agla)', circonscriptionId: 'circo-15' },
    { id: 'ctn-12', name: '12e Arrondissement (Godomey)', circonscriptionId: 'circo-15' },
    { id: 'ctn-13', name: '13e Arrondissement (Togoudo)', circonscriptionId: 'circo-15' }
  ],
  
  // Arrondissements pour Kandi (1ère circonscription)
  'circo-1': [
    { id: 'knd_1', name: 'Kandi-Centre', circonscriptionId: 'circo-1' },
    { id: 'knd_2', name: 'Kandi-Gah', circonscriptionId: 'circo-1' },
    { id: 'knd_3', name: 'Kandi-Kouara', circonscriptionId: 'circo-1' },
    { id: 'knd_4', name: 'Kandi-Maïga', circonscriptionId: 'circo-1' },
    { id: 'knd_5', name: 'Kandi-Sonon', circonscriptionId: 'circo-1' }
  ],
  
  // Arrondissements pour Porto-Novo (19ème circonscription)
  'circo-19-ptn': [
    { id: 'ptn_1', name: '1er Arrondissement (Centre-ville)', circonscriptionId: 'circo-19-ptn' },
    { id: 'ptn_2', name: '2e Arrondissement (Ouando)', circonscriptionId: 'circo-19-ptn' },
    { id: 'ptn_3', name: '3e Arrondissement (Aguégués)', circonscriptionId: 'circo-19-ptn' },
    { id: 'ptn_4', name: '4e Arrondissement (Akron)', circonscriptionId: 'circo-19-ptn' },
    { id: 'ptn_5', name: '5e Arrondissement (Avakpa)', circonscriptionId: 'circo-19-ptn' },
    { id: 'ptn_6', name: '6e Arrondissement (Dokpamé)', circonscriptionId: 'circo-19-ptn' },
    { id: 'ptn_7', name: '7e Arrondissement (Ganhi)', circonscriptionId: 'circo-19-ptn' },
    { id: 'ptn_8', name: '8e Arrondissement (Hêvié)', circonscriptionId: 'circo-19-ptn' },
    { id: 'ptn_9', name: '9e Arrondissement (Houédo-Aguékon)', circonscriptionId: 'circo-19-ptn' },
    { id: 'ptn_10', name: '10e Arrondissement (Sèmè-Kpodji)', circonscriptionId: 'circo-19-ptn' }
  ],
  
  // Arrondissements pour Parakou (8ème circonscription)
  'circo-8-pk': [
    { id: 'pk_1', name: 'Parakou I (Centre-ville)', circonscriptionId: 'circo-8-pk' },
    { id: 'pk_2', name: 'Parakou II (Boké)', circonscriptionId: 'circo-8-pk' },
    { id: 'pk_3', name: 'Parakou III (Tchatchou)', circonscriptionId: 'circo-8-pk' },
    { id: 'pk_4', name: 'Parakou IV (Kpébié)', circonscriptionId: 'circo-8-pk' },
    { id: 'pk_5', name: 'Parakou V (Guinagourou)', circonscriptionId: 'circo-8-pk' }
  ],
  
  // Arrondissements pour Malanville (1ère circonscription)
  'circo-1-mal': [
    { id: 'mal_1', name: 'Malanville-Centre', circonscriptionId: 'circo-1-mal' },
    { id: 'mal_2', name: 'Malanville-Garou', circonscriptionId: 'circo-1-mal' },
    { id: 'mal_3', name: 'Malanville-Goumandérou', circonscriptionId: 'circo-1-mal' },
    { id: 'mal_4', name: 'Malanville-Karimama', circonscriptionId: 'circo-1-mal' },
    { id: 'mal_5', name: 'Malanville-Madécali', circonscriptionId: 'circo-1-mal' }
  ],
  
  // Arrondissements pour Abomey-Calavi (6ème circonscription)
  'circo-6-ac': [
    { id: 'ac_1', name: 'Abomey-Calavi Centre', circonscriptionId: 'circo-6-ac' },
    { id: 'ac_2', name: 'Godomey', circonscriptionId: 'circo-6-ac' },
    { id: 'ac_3', name: 'Togoudo', circonscriptionId: 'circo-6-ac' },
    { id: 'ac_4', name: 'Hêvié', circonscriptionId: 'circo-6-ac' },
    { id: 'ac_5', name: 'Hêvié-Sud', circonscriptionId: 'circo-6-ac' },
    { id: 'ac_6', name: 'Akassato', circonscriptionId: 'circo-6-ac' },
    { id: 'ac_7', name: 'Kpankou', circonscriptionId: 'circo-6-ac' },
    { id: 'ac_8', name: 'Togba', circonscriptionId: 'circo-6-ac' },
    { id: 'ac_9', name: 'Zinvié', circonscriptionId: 'circo-6-ac' }
  ],
  
  // Arrondissements pour Bohicon (23ème circonscription)
  'circo-23-boh': [
    { id: 'boh_1', name: 'Bohicon-Centre', circonscriptionId: 'circo-23-boh' },
    { id: 'boh_2', name: 'Bohicon-Gbècon', circonscriptionId: 'circo-23-boh' },
    { id: 'boh_3', name: 'Bohicon-Houawé', circonscriptionId: 'circo-23-boh' },
    { id: 'boh_4', name: 'Bohicon-Zounzonmè', circonscriptionId: 'circo-23-boh' }
  ],
  
  // Arrondissements pour Ouidah (5ème circonscription)
  'circo-5-oui': [
    { id: 'oui_1', name: 'Ouidah I (Centre-ville)', circonscriptionId: 'circo-5-oui' },
    { id: 'oui_2', name: 'Ouidah II (Tovègan)', circonscriptionId: 'circo-5-oui' },
    { id: 'oui_3', name: 'Ouidah III (Djègbadji)', circonscriptionId: 'circo-5-oui' },
    { id: 'oui_4', name: 'Ouidah IV (Ahouandjigo)', circonscriptionId: 'circo-5-oui' }
  ],
  
  // Arrondissements pour Djougou (13ème circonscription)
  'circo-13-djo': [
    { id: 'djo_1', name: 'Djougou-Centre', circonscriptionId: 'circo-13-djo' },
    { id: 'djo_2', name: 'Djougou-Gah', circonscriptionId: 'circo-13-djo' },
    { id: 'djo_3', name: 'Djougou-Péporga', circonscriptionId: 'circo-13-djo' },
    { id: 'djo_4', name: 'Djougou-Sèmèrè', circonscriptionId: 'circo-13-djo' }
  ],
  
  // Arrondissements pour Lokossa (18ème circonscription)
  'circo-18-lok': [
    { id: 'lok_1', name: 'Lokossa-Centre', circonscriptionId: 'circo-18-lok' },
    { id: 'lok_2', name: 'Lokossa-Gbèdègbé', circonscriptionId: 'circo-18-lok' },
    { id: 'lok_3', name: 'Lokossa-Houédogli', circonscriptionId: 'circo-18-lok' }
  ],
  
  // Arrondissements pour Abomey (21ème circonscription)
  'circo-21-abo': [
    { id: 'abo_1', name: 'Abomey-Centre', circonscriptionId: 'circo-21-abo' },
    { id: 'abo_2', name: 'Abomey-Houégbo', circonscriptionId: 'circo-21-abo' },
    { id: 'abo_3', name: 'Abomey-Houégbozounmè', circonscriptionId: 'circo-21-abo' },
    { id: 'abo_4', name: 'Abomey-Zounzounmè', circonscriptionId: 'circo-21-abo' }
  ],
  
  // Arrondissements pour Natitingou (4ème circonscription)
  'circo-4-nat': [
    { id: 'nat_1', name: 'Natitingou-Centre', circonscriptionId: 'circo-4-nat' },
    { id: 'nat_2', name: 'Natitingou-Kotapounga', circonscriptionId: 'circo-4-nat' },
    { id: 'nat_3', name: 'Natitingou-Péporiyakou', circonscriptionId: 'circo-4-nat' },
    { id: 'nat_4', name: 'Natitingou-Tanongou', circonscriptionId: 'circo-4-nat' }
  ],
  
  // Arrondissements pour Nikki (10ème circonscription)
  'circo-10-nik': [
    { id: 'nik_1', name: 'Nikki-Centre', circonscriptionId: 'circo-10-nik' },
    { id: 'nik_2', name: 'Nikki-Bembèrèkè', circonscriptionId: 'circo-10-nik' },
    { id: 'nik_3', name: 'Nikki-Kalalé', circonscriptionId: 'circo-10-nik' },
    { id: 'nik_4', name: 'Nikki-Ségbana', circonscriptionId: 'circo-10-nik' }
  ],
  
  // Arrondissements pour Dassa-Zoumè (20ème circonscription)
  'circo-20-das': [
    { id: 'das_1', name: 'Dassa I (Centre-ville)', circonscriptionId: 'circo-20-das' },
    { id: 'das_2', name: 'Dassa II (Gouka)', circonscriptionId: 'circo-20-das' },
    { id: 'das_3', name: 'Dassa III (Passagou)', circonscriptionId: 'circo-20-das' },
    { id: 'das_4', name: 'Dassa IV (Savalou)', circonscriptionId: 'circo-20-das' }
  ],
  
  // Arrondissements pour Kétou (22ème circonscription)
  'circo-22-ket': [
    { id: 'ket_1', name: 'Kétou-Centre', circonscriptionId: 'circo-22-ket' },
    { id: 'ket_2', name: 'Kétou-Adjohoun', circonscriptionId: 'circo-22-ket' },
    { id: 'ket_3', name: 'Kétou-Ifangni', circonscriptionId: 'circo-22-ket' },
    { id: 'ket_4', name: 'Kétou-Pobè', circonscriptionId: 'circo-22-ket' }
  ],
  
  // Arrondissements pour Sèmè-Podji (17ème circonscription)
  'circo-17-sem': [
    { id: 'sem_1', name: 'Sèmè I (Aguégués)', circonscriptionId: 'circo-17-sem' },
    { id: 'sem_2', name: 'Sèmè II (Akpro-Missérété)', circonscriptionId: 'circo-17-sem' },
    { id: 'sem_3', name: 'Sèmè III (Avrankou)', circonscriptionId: 'circo-17-sem' },
    { id: 'sem_4', name: 'Sèmè IV (Bonou)', circonscriptionId: 'circo-17-sem' },
    { id: 'sem_5', name: 'Sèmè V (Dangbo)', circonscriptionId: 'circo-17-sem' },
    { id: 'sem_6', name: 'Sèmè VI (Porto-Novo)', circonscriptionId: 'circo-17-sem' }
  ]
};

// Fonctions pour récupérer les données hiérarchisées
export const getCommunes = (departementId: string): Commune[] => {
  const communes = communesData[departementId] || [];
  return communes.map(commune => ({
    ...commune,
    circonscriptions: getCirconscriptions(commune.id)
  }));
};

export const getCirconscriptions = (communeId: string): Circonscription[] => {
  // Gestion des alias et des incohérences de noms
  const normalizedCommuneId = (() => {
    switch(communeId) {
      case 'segbanan': return 'segban';
      case 'mat_et_ou': return 'materi';
      case 'kpodaha': return 'kpomasse';
      case 'kpomassè': return 'kpomasse';
      case 'pehonco': return 'pehunco';
      default: return communeId;
    }
  })();

  // Récupération des circonscriptions pour la commune normalisée
  let circonscriptions = circonscriptionsData[normalizedCommuneId] || [];
  
  // Si aucune circonscription n'est trouvée, essayer avec l'ID d'origine
  if (circonscriptions.length === 0 && normalizedCommuneId !== communeId) {
    circonscriptions = circonscriptionsData[communeId] || [];
  }

  // Si toujours pas de circonscription, essayer de trouver une correspondance partielle
  if (circonscriptions.length === 0) {
    const matchingKey = Object.keys(circonscriptionsData).find(key => 
      key.toLowerCase().includes(normalizedCommuneId.toLowerCase()) || 
      normalizedCommuneId.toLowerCase().includes(key.toLowerCase())
    );
    
    if (matchingKey) {
      circonscriptions = circonscriptionsData[matchingKey];
    }
  }

  return circonscriptions.map(circo => ({
    ...circo,
    arrondissements: getArrondissements(circo.id)
  }));
};

/**
 * Récupère les arrondissements d'une circonscription électorale
 * @param circonscriptionId - ID de la circonscription (format: 'circo-XX' ou 'circo-XX-YYY')
 * @returns Liste des arrondissements de la circonscription
 */
export function getArrondissements(circonscriptionId: string): Arrondissement[] {
  let arrondissements: Arrondissement[] = [];
  
  // Vérifier d'abord l'ID exact
  if (arrondissementsData[circonscriptionId]) {
    arrondissements = [...arrondissementsData[circonscriptionId]];
  } else {
    // Pour les circonscriptions avec un suffixe (ex: circo-15-1)
    const baseId = circonscriptionId.split('-').slice(0, 2).join('-');
    for (const key in arrondissementsData) {
      if (key.startsWith(baseId)) {
        arrondissements = [...arrondissementsData[key]];
        break;
      }
    }
  }
  
  // Supprimer le contenu entre parenthèses dans les noms des arrondissements
  return arrondissements.map(arrondissement => ({
    ...arrondissement,
    name: arrondissement.name.replace(/\s*\([^)]*\)/g, '').trim()
  }));
};
