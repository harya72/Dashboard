import React from "react";
import { Line } from "react-chartjs-2";
import LineChartFilter from "./filters/LineChartFilter";

const LineChart = ({ data }) => {
  const filteredData = LineChartFilter({ data });

  const chartData = {
    datasets: filteredData,
  };

  const chartOptions = {
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        title: {
          display: true,
          text: "Year",
        },
      },
      y: {
        title: {
          display: true,
          text: "Weighted Score",
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const { label, x, y, year, relevance, likelihood } =
              context.dataset.data[context.dataIndex];
            return `Sector: ${context.dataset.label}, Year: ${year}, Relevance: ${relevance}, Likelihood: ${likelihood}, Weighted Score: ${y}`;
          },
        },
      },
    },
  };

  return (
    <div className="lineChart">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default LineChart;
