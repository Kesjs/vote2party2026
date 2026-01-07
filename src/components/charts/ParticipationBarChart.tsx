import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { memo } from 'react';

interface DataPoint {
  name: string;
  value: number;
}

interface ParticipationBarChartProps {
  data: DataPoint[];
  color: string;
  yAxisLabel?: string;
  tooltipLabel?: string;
  height?: number | string;
  barSize?: number;
}

export const ParticipationBarChart = memo(({ 
  data, 
  color, 
  yAxisLabel = 'Taux de participation (%)',
  tooltipLabel = 'Participation',
  height = 300,
  barSize = 30
}: ParticipationBarChartProps) => {
  // Vérifier si des données sont disponibles
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full min-h-[200px] text-gray-500">
        Aucune donnée disponible
      </div>
    );
  }

  return (
    <div className="w-full" style={{ height: typeof height === 'number' ? `${height}px` : height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          barSize={barSize}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="name" 
            angle={-45} 
            textAnchor="end" 
            height={60}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            label={{ 
              value: yAxisLabel, 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle' },
              className: 'text-xs'
            }}
            domain={[0, 100]}
            tickFormatter={(value: number) => `${value}%`}
            width={60}
          />
          <Tooltip 
            formatter={(value: number | undefined) => [`${value || 0}%`, tooltipLabel]}
  labelFormatter={(label: string) => `Département: ${label}`}
  contentStyle={{
              borderRadius: '0.5rem',
              border: '1px solid #e5e7eb',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
            }}
          />
          <Bar 
            dataKey="value" 
            radius={[4, 4, 0, 0]}
            name={tooltipLabel}
            isAnimationActive={true}
            animationDuration={1000}
            animationEasing="ease-out"
          >
            {data.map((entry, index) => {
              const fillColor = entry.value > 50 ? color : `${color}80`;
              return (
                <Cell 
                  key={`cell-${index}`} 
                  fill={fillColor}
                  stroke="#fff"
                  strokeWidth={1}
                  aria-label={`${entry.name}: ${entry.value}%`}
                />
              );
            })}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
});

ParticipationBarChart.displayName = 'ParticipationBarChart';
