"use client";

import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { PieChart as PieChartIcon, Clock, Eye, EyeOff, BarChart2, Radar as RadarIcon } from "lucide-react";

// Mappage des codes de département vers les noms complets
const departementNames: Record<string, string> = {
  'ali': 'Alibori',
  'ata': 'Atacora',
  'atl': 'Atlantique',
  'bor': 'Borgou',
  'col': 'Collines',
  'kou': 'Couffo',
  'don': 'Donga',
  'lit': 'Littoral',
  'mon': 'Mono',
  'oue': 'Ouémé',
  'pla': 'Plateau',
  'zou': 'Zou',
  'Inconnu': 'Inconnu'
};

// Fonction utilitaire pour obtenir le nom complet d'un département
const getFullDepartmentName = (code: string): string => {
  return departementNames[code] || code;
};

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
} as const;
import { ResultsPieChart } from "@/components/charts/ResultsPieChart";
import { supabase } from "@/lib/supabase";

// Define PieChartData type to match the component's expectations
interface PieChartData {
  id: string;
  name: string;
  value: number;
  color: string;
  percentage: number;
}

// Types pour les données de vote
interface VoteData {
  id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  nip: string;
  departement: string;
  commune: string;
  circonscription: string;
  arrondissement: string;
  captcha: string;
  referral_link: string;
  created_at: string;
}

// Types pour les statistiques par localité
interface LocationStats {
  name: string;
  count: number;
  percentage: number;
  children?: LocationStats[];
}

// Types pour les données de participation
interface ParticipationData {
  name: string;
  value: number;
  participation: number;
}

// Type pour les données des communes et circonscriptions
interface LocationData {
  name: string;
  count: number;
  percentage: number;
}

// Cette constante n'est plus utilisée car nous affichons maintenant des statistiques par localité
// plutôt que par parti politique

const COLORS = {
  primary: "#4f46e5",
  secondary: "#10b981",
  background: "#f9fafb",
  text: {
    primary: "#111827",
    secondary: "#6b7280",
  },
};

export default function ResultsSection() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [votes, setVotes] = useState<VoteData[]>([]);
  const [showDetailedResults, setShowDetailedResults] = useState(false);

  // Récupérer les votes depuis Supabase
  useEffect(() => {
    const fetchVotes = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('votes')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Erreur Supabase:', error);
          throw new Error(`Erreur ${error.code}: ${error.message}`);
        }
        
        if (!data) {
          throw new Error('Aucune donnée reçue du serveur');
        }
        
        console.log('Données reçues:', data);
        setVotes(data);
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error 
          ? `Erreur lors de la récupération des votes: ${err.message}`
          : 'Une erreur inconnue est survenue';
          
        console.error('Erreur:', err);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchVotes();

    // S'abonner aux mises à jour en temps réel
    const subscription = supabase
      .channel('votes_changes')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'votes' }, 
        (payload) => {
          setVotes(prev => [...prev, payload.new as VoteData]);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Calcul des statistiques par localité
  const locationStats = useMemo(() => {
    const stats: LocationStats[] = [];
    
    // Grouper par département
    const byDepartment: Record<string, {
      count: number;
      communes: Record<string, number>;
      circonscriptions: Record<string, number>;
    }> = {};
    
    votes.forEach(vote => {
      const dept = vote.departement || 'Inconnu';
      const commune = vote.commune || 'Inconnu';
      const circonscription = vote.circonscription || 'Inconnue';
      
      // Initialiser le département si nécessaire
      if (!byDepartment[dept]) {
        byDepartment[dept] = { count: 0, communes: {}, circonscriptions: {} };
      }
      
      // Incrémenter les compteurs
      byDepartment[dept].count++;
      byDepartment[dept].communes[commune] = (byDepartment[dept].communes[commune] || 0) + 1;
      byDepartment[dept].circonscriptions[circonscription] = (byDepartment[dept].circonscriptions[circonscription] || 0) + 1;
    });
    
    // Convertir en structure arborescente
    for (const [dept, data] of Object.entries(byDepartment)) {
      const deptPercentage = Math.round((data.count / Math.max(1, votes.length)) * 100);
      
      const communes = Object.entries(data.communes)
        .map(([name, count]) => ({
          name: `${name} (${count})`,
          count,
          percentage: Math.round((count / data.count) * 100)
        }))
        .sort((a, b) => b.count - a.count);
      
      const circonscriptions = Object.entries(data.circonscriptions)
        .map(([name, count]) => ({
          name: `${name} (${count})`,
          count,
          percentage: Math.round((count / data.count) * 100)
        }))
        .sort((a, b) => b.count - a.count);
      
      stats.push({
        name: `${getFullDepartmentName(dept)} (${data.count})`,
        count: data.count,
        percentage: deptPercentage,
        children: [
          {
            name: `Communes (${communes.length})`,
            count: data.count,
            percentage: 100,
            children: communes
          },
          {
            name: `Circonscriptions (${circonscriptions.length})`,
            count: data.count,
            percentage: 100,
            children: circonscriptions
          }
        ]
      });
    }
    
    return stats.sort((a, b) => b.count - a.count);
  }, [votes]);

  // Données de participation par circonscription (exemple avec des données simulées)
  const constituencyParticipationData = useMemo((): ParticipationData[] => {
    interface CircoData {
      voters: number;
      total: number;
    }
    
    const circoMap = new Map<string, CircoData>();
    
    // Simuler des données de participation
    votes.forEach((vote: VoteData) => {
      const circo = vote.circonscription || 'Inconnue';
      const current = circoMap.get(circo) || { voters: 0, total: 0 };
      // Simuler un taux de participation aléatoire entre 50% et 90%
      const participationRate = 0.5 + Math.random() * 0.4;
      circoMap.set(circo, {
        voters: current.voters + 1,
        total: current.total + Math.round(1 / participationRate)
      });
    });
    
    const participationData: ParticipationData[] = [];
    
    circoMap.forEach(({ voters, total }, name) => {
      const value = Math.min(100, Math.round((voters / total) * 100)) || 0;
      participationData.push({
        name,
        value,
        participation: value
      });
    });
    
    return participationData.sort((a, b) => b.value - a.value);
  }, [votes]);

  // État pour le filtre de département
  const [selectedDepartment, setSelectedDepartment] = useState<string>('tous');

  // Données pour le graphique en barres des communes
  const communeData = useMemo(() => {
    const communeMap = new Map<string, number>();
    
    votes.forEach((vote: VoteData) => {
      if (selectedDepartment !== 'tous' && vote.departement !== selectedDepartment) return;
      
      const commune = vote.commune || 'Inconnue';
      communeMap.set(commune, (communeMap.get(commune) || 0) + 1);
    });

    return Array.from(communeMap.entries())
      .map(([name, value]) => ({
        name,
        value,
        fill: `hsl(${Math.random() * 360}, 70%, 60%)`
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10); // Top 10 des communes
  }, [votes, selectedDepartment]);

  // Données pour le graphique radar des circonscriptions
  const circonscriptionData = useMemo(() => {
    const circoMap = new Map<string, number>();
    
    votes.forEach((vote: VoteData) => {
      if (selectedDepartment !== 'tous' && vote.departement !== selectedDepartment) return;
      
      const circo = vote.circonscription || 'Inconnue';
      circoMap.set(circo, (circoMap.get(circo) || 0) + 1);
    });

    return Array.from(circoMap.entries())
      .map(([subject, A], i) => ({
        subject,
        A,
        fullMark: Math.max(...Array.from(circoMap.values())) * 1.2
      }));
  }, [votes, selectedDepartment]);

  // Données pour le graphique circulaire par département
  const pieData = useMemo(() => {
    // Grouper les votes par département
    const deptVotes = votes.reduce((acc: Record<string, number>, vote: VoteData) => {
      const dept = vote.departement || 'Inconnu';
      acc[dept] = (acc[dept] || 0) + 1;
      return acc;
    }, {});

    // Convertir en tableau et calculer les pourcentages
    const total = votes.length || 1; // Éviter la division par zéro
    return Object.entries(deptVotes)
      .map(([name, value]) => ({
        id: name,
        name: getFullDepartmentName(name) || name,
        value,
        color: `hsl(${Math.random() * 360}, 70%, 50%)`,
        percentage: Math.round((value / total) * 100)
      }))
      .sort((a, b) => b.value - a.value);
  }, [votes]);

  // Liste des départements uniques pour le filtre
  const departments = useMemo(() => {
    const depts = new Set<string>();
    votes.forEach(vote => vote.departement && depts.add(vote.departement));
    return Array.from(depts).sort();
  }, [votes]);

  // Calcul du total des inscrits
  const totalInscrits = votes.length;

  return (
    <section 
      id="resultats" 
      className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white"
      aria-label="Résultats électoraux"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
       
        {/* En-tête */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Résultats en temps réel
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-600">
            Visualisation interactive des tendances électorales à travers le pays
          </p>
          
          <div className="mt-8 p-4 bg-blue-50 rounded-lg inline-flex items-center">
            <Clock className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-blue-800">
              Dernière mise à jour: {new Date().toLocaleTimeString()}
            </span>
          </div>
        </motion.header>

        {/* Section principale des résultats */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Colonne principale avec les graphiques */}
          <div className="xl:col-span-2 space-y-8">
            {/* Carte de répartition des votes */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
              aria-labelledby="vote-distribution-heading"
            >
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <PieChartIcon className="w-5 h-5 text-indigo-600 mr-2" />
                    <h3 
                      id="vote-distribution-heading" 
                      className="text-lg font-semibold text-gray-900"
                    >
                      Répartition par département
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowDetailedResults(!showDetailedResults)}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    aria-expanded={showDetailedResults}
                    aria-controls="detailed-results"
                  >
                    {showDetailedResults ? (
                      <>
                        <EyeOff className="-ml-0.5 mr-2 h-4 w-4" />
                        Masquer les détails
                      </>
                    ) : (
                      <>
                        <Eye className="-ml-0.5 mr-2 h-4 w-4" />
                        Afficher les détails
                      </>
                    )}
                  </button>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {totalInscrits === 0 ? 'Aucune inscription enregistrée pour le moment.' : `Total: ${totalInscrits.toLocaleString()} personnes inscrites`}
                </p>
              </div>
              
              <div className="space-y-12">
                {/* Graphique en barres pour les communes */}
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                    <BarChart2 className="mr-2 h-5 w-5 text-green-600" />
                    Répartition par commune
                  </h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={communeData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="name" 
                          angle={-45} 
                          textAnchor="end" 
                          height={70}
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis />
                        <Tooltip 
                          formatter={(value: number | undefined) => [`${value || 0} votes`, 'Nombre de votes']}
                        />
                        <Bar dataKey="value" fill="#10B981" name="Votes" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Graphique radar pour les circonscriptions */}
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                    <RadarIcon className="mr-2 h-5 w-5 text-blue-600" />
                    Analyse par circonscription
                  </h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={circonscriptionData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis angle={30} domain={[0, 'dataMax + 10']} />
                        <Radar
                          name="Votes"
                          dataKey="A"
                          stroke="#3B82F6"
                          fill="#3B82F6"
                          fillOpacity={0.6}
                        />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

              </div>
              
              {/* Légende détaillée */}
              {showDetailedResults && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">
                    Détails par département
                  </h3>
                  <div className="space-y-3">
                    {pieData.map((item) => (
                      <div key={item.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <div 
                          className="w-4 h-4 rounded-full mr-3 flex-shrink-0" 
                          style={{ backgroundColor: item.color }}
                          aria-hidden="true"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {item.name}
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">
                              {typeof item.percentage === 'number' ? item.percentage.toFixed(1) + '%' : 'N/A'}
                            </span>
                            <span className="text-sm font-medium text-gray-900 ml-2">
                              {item.value.toLocaleString()} votes
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.section>
          </div>
          
          {/* Barre latérale avec les statistiques */}
          <div className="space-y-8">
            {/* Graphique circulaire par département */}
            <div className="bg-white p-8 rounded-2xl shadow-lg sticky top-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                <PieChartIcon className="mr-2 h-5 w-5 text-purple-600" />
                Répartition par département
              </h3>
              <div className="h-96 -mt-4 -mb-2">
                <ResultsPieChart 
                  data={pieData}
                  innerRadius="60%"
                  outerRadius="90%"
                  showLabel={true}
                  tooltipFormatter={(value, name, entry) => [
                    `${value.toLocaleString()} votes (${entry.percentage?.toFixed(1)}%)`,
                    name
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}