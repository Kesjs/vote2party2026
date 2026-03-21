'use client';


import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  PieLabelRenderProps
} from 'recharts';
import { memo } from 'react';

export interface PieChartData {
  name: string;
  value: number;
  color: string;
  percentage?: number;
}

interface ResultsPieChartProps {
  data: PieChartData[];
  height?: number | string;
  innerRadius?: number | string;
  outerRadius?: number | string;
  showLabel?: boolean;
  tooltipFormatter?: (
    value: number,
    name: string,
    entry: PieChartData
  ) => [string, string];
}

const defaultTooltipFormatter = (
  value: number,
  name: string,
  entry: PieChartData
): [string, string] => [
  name,
  `${value.toLocaleString()} votes (${entry.percentage?.toFixed(1) ?? '0'}%)`
];

const renderCustomizedLabel = (props: PieLabelRenderProps) => {
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    name,
    fill
  } = props;

  if (
    cx == null ||
    cy == null ||
    midAngle == null ||
    innerRadius == null ||
    outerRadius == null ||
    percent == null ||
    name == null
  ) {
    return null;
  }

  const RADIAN = Math.PI / 180;
  const radius =
    Number(innerRadius) +
    (Number(outerRadius) - Number(innerRadius)) / 2;

  const x = Number(cx) + radius * Math.cos(-midAngle * RADIAN);
  const y = Number(cy) + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill={fill ?? '#000'}
      textAnchor={x > Number(cx) ? 'start' : 'end'}
      dominantBaseline="central"
      className="text-xs font-medium"
    >
      {`${name} (${(percent * 100).toFixed(1)}%)`}
    </text>
  );
};

export const ResultsPieChart = memo(
  ({
    data,
    height = 360,
    innerRadius = '60%',
    outerRadius = '80%',
    showLabel = true,
    tooltipFormatter = defaultTooltipFormatter
  }: ResultsPieChartProps) => {
    if (!data || data.length === 0) {
      return (
        <div className="flex items-center justify-center h-full min-h-[200px] text-gray-500">
          Aucune donnée disponible
        </div>
      );
    }

    const total = data.reduce((sum, item) => sum + item.value, 0);

    const dataWithPercentages = data.map(item => ({
      ...item,
      percentage: total > 0 ? (item.value / total) * 100 : 0
    }));

    return (
      <div
        style={{
          width: '100%',
          height: typeof height === 'number' ? `${height}px` : height
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={dataWithPercentages}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              paddingAngle={4}
              label={showLabel ? renderCustomizedLabel : false}
              labelLine={false}
              animationBegin={0}
              animationDuration={800}
              animationEasing="ease-out"
            >
              {dataWithPercentages.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  stroke="#ffffff"
                  strokeWidth={2}
                  aria-label={`${entry.name}: ${entry.value} votes (${entry.percentage?.toFixed(
                    1
                  )}%)`}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value, name, item) => {
                if (
                  typeof value !== 'number' ||
                  !item ||
                  !item.payload
                ) {
                  return ['', ''];
                }

                const payload = item.payload as PieChartData;
                const nameStr = name !== undefined ? String(name) : 'Inconnu';

                return tooltipFormatter(
                  value,
                  nameStr,
                  payload
                );
              }}
              contentStyle={{
                borderRadius: '0.5rem',
                border: '1px solid #e5e7eb',
                boxShadow:
                  '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
              }}
              itemStyle={{
                padding: '0.25rem 0',
                textTransform: 'capitalize'
              }}
              cursor={{ fill: 'rgba(0, 0, 0, 0.02)' }}
            />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    );
  }
);

ResultsPieChart.displayName = 'ResultsPieChart';
