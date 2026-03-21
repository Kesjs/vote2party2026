// src/components/charts/VoteDistributionChart.tsx
'use client';

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

export const VoteDistributionChart = ({ data }: { data: any[] }) => {
  const chartData = {
    labels: data.map(item => item.party),
    datasets: [
      {
        label: 'Nombre de votes',
        data: data.map(item => item.votes),
        backgroundColor: data.map(item => item.color),
        borderColor: data.map(item => item.color),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: any) => {
            if (value >= 1000000) return `${value / 1000000}M`;
            if (value >= 1000) return `${value / 1000}K`;
            return value;
          },
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};