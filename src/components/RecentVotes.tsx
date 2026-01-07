import { memo } from 'react';
import { Clock, Users, MapPin as MapPinIcon } from 'lucide-react';

export interface VoteRecord {
  id: string;
  partyName: string;
  partyColor: string;
  timeAgo: string;
  location: string;
  voterName?: string;
  avatarUrl?: string;
  isVerified?: boolean;
}

interface RecentVotesProps {
  votes: VoteRecord[];
  maxItems?: number;
  showHeader?: boolean;
  emptyState?: React.ReactNode;
  onVoteClick?: (vote: VoteRecord) => void;
  className?: string;
}

const defaultEmptyState = (
  <div className="text-center py-6">
    <Users className="mx-auto h-12 w-12 text-gray-400" />
    <h4 className="mt-2 text-sm font-medium text-gray-900">Aucun vote récent</h4>
    <p className="mt-1 text-sm text-gray-500">
      Les votes récents apparaîtront ici
    </p>
  </div>
);

export const RecentVotes = memo(({ 
  votes = [], 
  maxItems = 5, 
  showHeader = true,
  emptyState = defaultEmptyState,
  onVoteClick,
  className = ''
}: RecentVotesProps) => {
  // Si pas de votes, afficher l'état vide
  if (votes.length === 0) {
    return <div className={className}>{emptyState}</div>;
  }

  // Limiter le nombre d'éléments affichés
  const displayedVotes = votes.slice(0, maxItems);

  return (
    <div className={`space-y-4 ${className}`}>
      {showHeader && (
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-indigo-600" />
          Derniers votes
        </h3>
      )}
      
      <div className="space-y-3">
        {displayedVotes.map((vote) => (
          <button
            key={vote.id}
            type="button"
            onClick={() => onVoteClick?.(vote)}
            className="w-full text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-lg"
          >
            <div 
              className="flex items-start p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
              aria-label={`Vote pour ${vote.partyName} à ${vote.location} il y a ${vote.timeAgo}`}
            >
              <div className="flex-shrink-0 mr-3">
                {vote.avatarUrl ? (
                  <img 
                    src={vote.avatarUrl} 
                    alt={`${vote.voterName || 'Électeur'}`}
                    className="h-8 w-8 rounded-full"
                  />
                ) : (
                  <div 
                    className="w-3 h-3 rounded-full mt-1.5" 
                    style={{ backgroundColor: vote.partyColor || '#6b7280' }}
                    aria-hidden="true"
                  />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {vote.voterName ? (
                      <span>
                        {vote.voterName}
                        {vote.isVerified && (
                          <span className="ml-1 text-blue-500">
                            ✓
                          </span>
                        )}
                      </span>
                    ) : (
                      <span>Vote pour {vote.partyName}</span>
                    )}
                  </p>
                  {vote.isVerified && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                      Vérifié
                    </span>
                  )}
                </div>
                
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <Clock className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                  <span className="whitespace-nowrap">{vote.timeAgo}</span>
                  <span className="mx-2">•</span>
                  <span className="flex items-center truncate">
                    <MapPinIcon className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                    <span className="truncate">{vote.location}</span>
                  </span>
                </div>
                
                {!vote.voterName && (
                  <div 
                    className="mt-1 h-2 rounded-full overflow-hidden bg-gray-100"
                    aria-hidden="true"
                  >
                    <div 
                      className="h-full rounded-full"
                      style={{ 
                        width: '100%',
                        backgroundColor: vote.partyColor || '#6b7280',
                        opacity: 0.7
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
});

RecentVotes.displayName = 'RecentVotes';
