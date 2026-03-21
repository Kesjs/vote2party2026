// src/components/charts/ParticipationMap.tsx
'use client';

import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

export const ParticipationMap = ({ data }: { data: any[] }) => {
  const maxParticipation = Math.max(...data.map(d => d.participation), 0);

  return (
    <div className="relative w-full h-96">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="grid grid-cols-3 gap-2 w-full h-full">
          {data.map((dept) => {
            const height = (dept.participation / maxParticipation) * 100;
            return (
              <div key={dept.id} className="flex flex-col items-center">
                <div 
                  className="w-full bg-green-500 rounded-t-md transition-all duration-500 ease-out"
                  style={{ 
                    height: `${height}%`,
                    backgroundColor: `hsl(${120 * (dept.participation / 100)}, 70%, 50%)`
                  }}
                  data-tooltip-id={`tooltip-${dept.id}`}
                  data-tooltip-content={`${dept.name}: ${dept.participation}%`}
                />
                <span className="text-xs mt-1 text-center">{dept.name}</span>
              </div>
            );
          })}
        </div>
      </div>
      <Tooltip id="tooltip" />
    </div>
  );
};