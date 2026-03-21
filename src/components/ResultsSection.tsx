// src/sections/ResultsSection.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  parties,
  departments,
  voteResults,
  formatRelativeTime,
  getChartData
} from '@/data/electionData';
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  MapPin, 
  Filter, 
  RefreshCw,
  ArrowUp,
  ArrowDown,
  Minus,
  Clock
} from 'lucide-react';
import { VoteDistributionChart } from './VoteDistributionChart';
import { TrendChart } from './charts/TrendChart';
import { ParticipationMap } from './ParticipationMap';

const ResultsSection = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [chartData, setChartData] = useState<any>(null);
  
  // Type pour les votes récents
  interface RecentVote {
    id: string;
    partyId: string;
    firstName: string;
    lastName: string;
    nip: string;
    time: string;
    location: string;
    timestamp: string;
    voterName: string;
    constituency: string;
  }

  // Données des votes récents
  const recentVotes: RecentVote[] = [
    { 
      id: '1', 
      partyId: '1', 
      firstName: 'Jean', 
      lastName: 'Dupont',
      nip: '1234',
      time: '2 min', 
      location: 'Paris 1er',
      timestamp: new Date().toISOString(),
      voterName: 'Jean Dupont',
      constituency: 'Paris 1er'
    },
    { 
      id: '2', 
      partyId: '2', 
      firstName: 'Marie', 
      lastName: 'Martin',
      nip: '5678',
      time: '5 min', 
      location: 'Lyon 2e',
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      voterName: 'Marie Martin',
      constituency: 'Lyon 2e'
    },
    { 
      id: '3', 
      partyId: '3', 
      firstName: 'Pierre', 
      lastName: 'Durand',
      nip: '9012',
      time: '10 min', 
      location: 'Marseille 8e',
      timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      voterName: 'Pierre Durand',
      constituency: 'Marseille 8e'
    }
  ];

  useEffect(() => {
    // Simuler un chargement
    const timer = setTimeout(() => {
      setChartData(getChartData(selectedDepartment || undefined));
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [selectedDepartment]);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setChartData(getChartData(selectedDepartment || undefined));
      setIsLoading(false);
    }, 800);
  };

  const totalVotes = voteResults.reduce((sum, result) => sum + result.votes, 0);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <ArrowUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <ArrowDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-yellow-500" />;
    }
  };

  if (isLoading || !chartData) {
    return (
      <section id="resultats" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <RefreshCw className="w-12 h-12 mx-auto animate-spin text-green-600" />
            <p className="mt-4 text-lg text-gray-600">Chargement des résultats...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="resultats" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tableau de bord des résultats
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Suivez en temps réel l'évolution des votes
          </p>
        </div>

        {/* Filtres */}
        <div className="mb-8 bg-white rounded-xl shadow-sm p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center">
              <Filter className="w-5 h-5 text-gray-500 mr-2" />
              <span className="text-gray-700 font-medium">Filtrer par :</span>
              <select
                className="ml-2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={selectedDepartment || ''}
                onChange={(e) => setSelectedDepartment(e.target.value || null)}
              >
                <option value="">Tous les départements</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.name}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleRefresh}
              className="flex items-center text-sm text-green-600 hover:text-green-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              Actualiser les données
            </button>
          </div>
        </div>

        {/* Cartes de synthèse */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-500 font-medium">Total des votes</h3>
              <Users className="w-6 h-6 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {totalVotes.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              <span className="text-green-500 flex items-center">
                <ArrowUp className="w-4 h-4 mr-1" />
                {Math.floor(totalVotes * 0.12).toLocaleString()} aujourd'hui
              </span>
            </div>
          </div>

          {voteResults.slice(0, 3).map((result) => {
            const party = parties.find(p => p.id === result.partyId);
            const percentage = ((result.votes / totalVotes) * 100).toFixed(1);
            
            return (
              <motion.div 
                key={result.id}
                className="bg-white rounded-xl shadow-sm p-6"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-500 font-medium">{party?.name}</h3>
                  <div className="w-6 h-6 rounded-full" style={{ backgroundColor: party?.color }} />
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {result.votes.toLocaleString()}
                </div>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <span className="mr-2">{percentage}% des voix</span>
                  {getTrendIcon(result.trend)}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Graphiques principaux */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div 
            className="bg-white rounded-xl shadow-sm p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-green-600" />
                Répartition des votes
              </h3>
              <span className="text-sm text-gray-500">
                {selectedDepartment || 'Tous les départements'}
              </span>
            </div>
            <div className="h-80">
              <VoteDistributionChart data={chartData.partyVotes} />
            </div>
          </motion.div>

          <motion.div 
            className="bg-white rounded-xl shadow-sm p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                Tendance sur 7 jours
              </h3>
              <span className="text-sm text-gray-500">
                Évolution quotidienne
              </span>
            </div>
            <div className="h-80">
              <TrendChart data={chartData.trendData} />
            </div>
          </motion.div>
        </div>

        {/* Carte de participation */}
        <motion.div 
          className="bg-white rounded-xl shadow-sm p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-purple-600" />
              Participation par département
            </h3>
            <div className="text-sm text-gray-500">
              Taux de participation moyen: {Math.round(chartData.participationData.reduce((sum: number, d: any) => sum + d.participation, 0) / chartData.participationData.length)}%
            </div>
          </div>
          <div className="h-96">
            <ParticipationMap data={chartData.participationData} />
          </div>
        </motion.div>

        {/* Derniers votes */}
        <motion.div 
          className="bg-white rounded-xl shadow-sm overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Derniers votes</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIP</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parti</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Circonscription</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentVotes.map((vote) => {
                  const party = parties?.find(p => p.id === vote.partyId);
                  return (
                    <tr key={vote.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {vote.voterName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {vote.nip}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div 
                            className="w-3 h-3 rounded-full mr-2" 
                            style={{ backgroundColor: party?.color }} 
                          />
                          <span className="text-sm text-gray-900">{party?.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {vote.constituency}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {vote.time} ({formatRelativeTime(vote.timestamp)})
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResultsSection;