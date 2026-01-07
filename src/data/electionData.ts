// Données des partis politiques
export const parties = [
  { id: '1', name: 'Union Progressiste', candidate: 'Patrice Talon', color: '#FFD700' },
  { id: '2', name: 'Les Démocrates', candidate: 'Alain Hinkati', color: '#1E90FF' },
  { id: '3', name: 'Bloc Républicain', candidate: 'Eric Houndété', color: '#32CD32' },
  { id: '4', name: 'Force Cauris', candidate: 'Gatien Houngbédji', color: '#FF6347' },
  { id: '5', name: 'Alliance Émergente', candidate: 'Lauretta Zongo', color: '#9370DB' },
];

// Données des départements du Bénin
export const departments = [
  { id: '1', name: 'Alibori', region: 'Nord' },
  { id: '2', name: 'Atacora', region: 'Nord' },
  { id: '3', name: 'Atlantique', region: 'Sud' },
  { id: '4', name: 'Borgou', region: 'Nord' },
  { id: '5', name: 'Collines', region: 'Centre' },
  { id: '6', name: 'Couffo', region: 'Sud' },
  { id: '7', name: 'Donga', region: 'Nord' },
  { id: '8', name: 'Littoral', region: 'Sud' },
  { id: '9', name: 'Mono', region: 'Sud' },
  { id: '10', name: 'Ouémé', region: 'Sud' },
  { id: '11', name: 'Plateau', region: 'Sud' },
  { id: '12', name: 'Zou', region: 'Centre' },
];

// Données des votes par parti
export const voteResults = [
  { id: '1', partyId: '1', votes: 1250000, trend: 'up' },
  { id: '2', partyId: '2', votes: 950000, trend: 'up' },
  { id: '3', partyId: '3', votes: 780000, trend: 'down' },
  { id: '4', partyId: '4', votes: 520000, trend: 'up' },
  { id: '5', partyId: '5', votes: 320000, trend: 'up' },
];

// Données de participation par département
export const departmentParticipation = departments.map((dept, index) => ({
  id: dept.id,
  departmentId: dept.id,
  departmentName: dept.name,
  registeredVoters: Math.floor(Math.random() * 500000) + 200000,
  votes: Math.floor(Math.random() * 400000) + 100000,
  trend: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)] as 'up' | 'down' | 'stable'
}));

// Données de tendance sur 7 jours
export const sevenDayTrend = Array.from({ length: 7 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (6 - i));
  return {
    date: date.toISOString().split('T')[0],
    votes: parties.map(party => ({
      partyId: party.id,
      count: Math.floor(Math.random() * 10000) + 5000
    }))
  };
});

// Derniers votes
export const recentVotes = Array.from({ length: 10 }, (_, i) => {
  const party = parties[Math.floor(Math.random() * parties.length)];
  const dept = departments[Math.floor(Math.random() * departments.length)];
  const hoursAgo = 24 - i * 2;
  const date = new Date();
  date.setHours(date.getHours() - hoursAgo);
  
  return {
    id: `vote-${i}`,
    firstName: ['Jean', 'Marie', 'Pierre', 'Fatou', 'Koffi', 'Aïcha', 'Yves', 'Rosalie', 'Mohamed', 'Esther'][i],
    lastName: ['Doe', 'Koné', 'Soglo', 'Bakary', 'Yayi', 'Adjanohoun', 'Zinsou', 'Dossou', 'Adékambi', 'Sèdégan'][i],
    nip: `${Math.floor(1000000000 + Math.random() * 9000000000)}`,
    partyId: party.id,
    partyName: party.name,
    department: dept.name,
    constituency: `Circonscription ${Math.floor(Math.random() * 3) + 1} - ${dept.name}`,
    timestamp: date.toISOString()
  };
});

// Fonction pour formater la date relative
export const formatRelativeTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'à l\'instant';
  if (diffInSeconds < 3600) return `il y a ${Math.floor(diffInSeconds / 60)} min`;
  if (diffInSeconds < 86400) return `il y a ${Math.floor(diffInSeconds / 3600)} h`;
  return `il y a ${Math.floor(diffInSeconds / 86400)} j`;
};

// Données pour les graphiques
export const getChartData = (selectedDepartment?: string) => {
  // Si un département est sélectionné, filtrer les données
  const filteredVotes = selectedDepartment 
    ? recentVotes.filter(vote => vote.department === selectedDepartment)
    : recentVotes;
  
  // Préparer les données pour le graphique à barres
  const partyVotes = parties.map(party => {
    const votes = filteredVotes.filter(v => v.partyId === party.id).length;
    return {
      party: party.name,
      votes,
      color: party.color
    };
  });

  // Préparer les données pour le graphique de tendance
  const trendData = sevenDayTrend.map(day => {
    const dayData: any = { date: day.date };
    parties.forEach(party => {
      const vote = day.votes.find(v => v.partyId === party.id);
      dayData[party.name] = vote ? vote.count : 0;
    });
    return dayData;
  });

  // Préparer les données pour la carte de participation
  const participationData = departments.map(dept => {
    const deptData = departmentParticipation.find(d => d.departmentId === dept.id);
    return {
      id: dept.id,
      name: dept.name,
      participation: deptData 
        ? Math.round((deptData.votes / deptData.registeredVoters) * 100) 
        : 0
    };
  });

  return {
    partyVotes,
    trendData,
    participationData
  };
};
