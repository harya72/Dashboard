import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ topics }) => {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="chart-container">
      <Bar data={topics} options={chartOptions} />
    </div>
  );
};

export default BarChart;
