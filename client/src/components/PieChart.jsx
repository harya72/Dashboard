import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { Select } from "antd";
import { PieChartFilter } from "./filters/PieChartFilter";

const PieChart = ({ jsonData }) => {
  const [selectedFilter, setSelectedFilter] = useState("sector");
  const [chartData, setChartData] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    setChartData(PieChartFilter(jsonData, selectedFilter));
  }, [selectedFilter, jsonData]);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  useEffect(() => {
    if (chartData) {
      // Destroy the previous chart instance
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      // Create or update the pie chart with responsive options
      const ctx = document.getElementById("pieChart").getContext("2d");
      chartRef.current = new Chart(ctx, {
        type: "pie",
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  }, [chartData]);

  return (
    <div>
      <div className="myButton">
        <Select
          value={selectedFilter}
          style={{
            width: 120,
            border: "2px solid black",
            fontWeight: "bold",
            borderRadius: 10,
          }}
          onChange={(value) => handleFilterChange(value)}
        >
          <Select.Option value="country">Country</Select.Option>
          <Select.Option value="region">Region</Select.Option>
          <Select.Option value="pestle">Pestle</Select.Option>
          <Select.Option value="sector">Sector</Select.Option>
        </Select>
      </div>

      <div className="chart-container1">
        <canvas id="pieChart"></canvas>
      </div>
    </div>
  );
};

export default PieChart;
