import 'chartjs-plugin-datalabels';
import { Bar } from "react-chartjs-2";
import { Chart, ChartOptions, registerables } from "chart.js";
import { Statistic } from "../../types/PokemonStats";
Chart.register(...registerables);

type Props = {
  stats: Statistic[];
};

export const PokemonStatsChart: React.FC<Props> = ({ stats }) => {
  const preparedStatValues = stats.map((stat) => {
    const { base_stat } = stat;
    return base_stat;
  });

  const chartData = {
    labels: ["HP", "ATK", "DEF", "SATK", "SDEF", "SPD"],
    datasets: [
      {
        data: preparedStatValues,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions: ChartOptions<"bar"> = {
    indexAxis: "y",
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
          color: "#333",
        },
      },
    },
  };

  return (
    <div className='w-full h-full'>
      <Bar width={'100%'} height={'250px'} data={chartData} options={chartOptions} />
      </div>
  );
};
