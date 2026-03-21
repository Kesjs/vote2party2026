// Types pour les données mockées
export interface PoliticalParty {
  id: string;
  name: string;
  candidate: string;
  description: string;
  color: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
}

export interface Commune {
  id: string;
  name: string;
  departmentId: string;
  constituency: string;
}

export interface VoteResult {
  partyId: string;
  percentage: number;
  votes: number;
}

export interface DepartmentParticipation {
  departmentName: string;
  percentage: number;
}

export interface ConstituencyParticipation {
  name: string;
  percentage: number;
}

export interface RecentVote {
  id: string;
  firstName: string;
  lastName: string;
  maskedNIP: string;
  partyName: string;
  constituency: string;
  timestamp: Date;
}

export interface FormData {
  lastName: string;
  firstName: string;
  nip: string;
  phone: string;
  email: string;
  party: string;
  department: string;
  commune: string;
  constituency: string;
  captcha: string;
}

// Données mockées
export const mockParties: PoliticalParty[] = [
  {
    id: 'fcbe',
    name: 'FCBE',
    candidate: 'Romuald WADAGNI',
    description: 'Ministre des finances de 2016–2026, candidat de la mouvance.',
    color: '#059669'
  }
];

export const mockDepartments: Department[] = [
  { id: 'littoral', name: 'Littoral', code: 'LIT' },
  { id: 'couffo', name: 'Couffo', code: 'COU' },
  { id: 'alibori', name: 'Alibori', code: 'ALI' }
];

export const mockCommunes: Commune[] = [
  { id: 'cotonou', name: 'Cotonou', departmentId: 'littoral', constituency: '1ère circonscription électorale' },
  { id: 'porto-novo', name: 'Porto-Novo', departmentId: 'littoral', constituency: '2ème circonscription électorale' },
  { id: 'djougou', name: 'Djougou', departmentId: 'couffo', constituency: 'Circonscription de Couffo' },
  { id: 'kandi', name: 'Kandi', departmentId: 'alibori', constituency: 'Circonscription d\'Alibori' }
];

export const mockVoteResults: VoteResult[] = [
  {
    partyId: 'fcbe',
    percentage: 100,
    votes: 15420
  }
];

export const mockDepartmentParticipation: DepartmentParticipation[] = [
  { departmentName: 'Littoral', percentage: 50 },
  { departmentName: 'Couffo', percentage: 25 },
  { departmentName: 'Alibori', percentage: 25 }
];

export const mockConstituencyParticipation: ConstituencyParticipation[] = [
  { name: 'Circonscription de Couffo', percentage: 50 },
  { name: '1ère circonscription électorale', percentage: 50 }
];

export const mockRecentVotes: RecentVote[] = [
  {
    id: '1',
    firstName: 'Jean',
    lastName: 'KOUASSI',
    maskedNIP: '***7895',
    partyName: 'FCBE',
    constituency: '1ère circonscription électorale',
    timestamp: new Date(Date.now() - 5 * 60 * 1000) // il y a 5 minutes
  },
  {
    id: '2',
    firstName: 'Marie',
    lastName: 'ADJOVI',
    maskedNIP: '***2341',
    partyName: 'FCBE',
    constituency: 'Circonscription de Couffo',
    timestamp: new Date(Date.now() - 12 * 60 * 1000) // il y a 12 minutes
  },
  {
    id: '3',
    firstName: 'Paul',
    lastName: 'TOSSOU',
    maskedNIP: '***5678',
    partyName: 'FCBE',
    constituency: '2ème circonscription électorale',
    timestamp: new Date(Date.now() - 25 * 60 * 1000) // il y a 25 minutes
  }
];

// Fonctions utilitaires
export const getCommunesByDepartment = (departmentId: string): Commune[] => {
  return mockCommunes.filter(commune => commune.departmentId === departmentId);
};

export const getConstituencyByCommune = (communeId: string): string => {
  const commune = mockCommunes.find(c => c.id === communeId);
  return commune?.constituency || '';
};

export const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 60) {
    return `il y a ${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''}`;
  } else if (diffInMinutes < 1440) {
    const hours = Math.floor(diffInMinutes / 60);
    return `il y a ${hours} heure${hours > 1 ? 's' : ''}`;
  } else {
    const days = Math.floor(diffInMinutes / 1440);
    return `il y a ${days} jour${days > 1 ? 's' : ''}`;
  }
};
