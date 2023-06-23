import "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";
import { Chart, ChartOptions, registerables } from "chart.js";
import { Statistic } from "../../types/PokemonStats";
Chart.register(...registerables);

type Props = {
  stats: Statistic[];
  color: string;
};

export const PokemonStatsChart: React.FC<Props> = ({ stats, color }) => {
  const preparedStatValues = stats.map((stat) => {
    const { base_stat } = stat;
    return base_stat;
  });

  const chartData = {
    labels: [
      `HP ${preparedStatValues[0]}`,
      `ATK ${preparedStatValues[1]}`,
      `DEF ${preparedStatValues[2]}`,
      `SATK ${preparedStatValues[3]}`,
      `SDEF ${preparedStatValues[4]}`,
      `SPD ${preparedStatValues[5]}`,
    ],
    datasets: [
      {
        data: preparedStatValues,
        backgroundColor: color,
        borderColor: color,
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
        border: {
          display: false
        },
        grid: {
          display: false,
          color: 'transparent',
        },
        ticks: {
          display: false,
        }
      },
      y: {
        border: {
          display: false
        },
        grid: {
          display: false,
          color: 'transparent',
        },
        ticks: {
          font: {
            size: 14,
            weight: 'bold',
          },
          color: "#333",
        },
      },
    },
  };

  return (
    <div className="w-full h-full">
      <Bar
        width={"100%"}
        height={"200px"}
        data={chartData}
        options={chartOptions}
      />
    </div>
  );
};
