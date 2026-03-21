'use client'

import { mockParties } from '@/data/mockData';
import { Users, FileText } from 'lucide-react';

const PartiesSection = () => {
  return (
    <section id="partis" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Les Partis Politiques
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez les principaux partis en lice
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {mockParties.map((party) => (
            <div
              key={party.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
            >
              {/* Header with party color */}
              <div 
                className="h-2 w-full"
                style={{ backgroundColor: party.color }}
              />

              <div className="p-8">
                {/* Party name */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {party.name}
                  </h3>
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: party.color }}
                  >
                    {party.name.substring(0, 2)}
                  </div>
                </div>

                {/* Candidate info */}
                <div className="mb-6">
                  <div className="flex items-center text-gray-700 mb-2">
                    <Users className="w-5 h-5 mr-2 text-gray-500" />
                    <span className="font-medium">Candidat :</span>
                  </div>
                  <p className="text-xl font-semibold text-gray-900 ml-7">
                    {party.candidate}
                  </p>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <div className="flex items-center text-gray-700 mb-2">
                    <FileText className="w-5 h-5 mr-2 text-gray-500" />
                    <span className="font-medium">Description :</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed ml-7">
                    {party.description}
                  </p>
                </div>

                {/* Action button */}
                <button 
                  className="w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 border-2"
                  style={{ 
                    borderColor: party.color,
                    color: party.color 
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = party.color;
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = party.color;
                  }}
                >
                  En savoir plus
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PartiesSection;
