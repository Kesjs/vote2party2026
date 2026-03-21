import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface VoteDistributionChartProps {
  data: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor: string[];
      borderWidth: number;
    }>;
  };
  title?: string;
}

export const VoteDistributionChart: React.FC<VoteDistributionChartProps> = ({ data, title = 'Répartition des votes' }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number | string) => `${value}%`,
        },
      },
    },
  };

  return <Bar options={options} data={data} />;
};

export default VoteDistributionChart;
