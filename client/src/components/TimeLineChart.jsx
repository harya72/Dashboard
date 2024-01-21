import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { DatePicker, Select } from "antd";
import TimeLineFilter from "./filters/TimeLineFilter"; // Adjust the path accordingly

const TimeLineChart = ({ jsonData }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("sector");
  const [chartData, setChartData] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const filteredChartData = TimeLineFilter({
      jsonData,
      selectedDate,
      selectedCategory,
    });

    if (filteredChartData) {
      setChartData(filteredChartData);
    }
  }, [selectedDate, jsonData, selectedCategory]);

  const handleDateChange = (date) => {
    const jsDate = date ? date.toDate() : null;
    setSelectedDate(jsDate);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    if (chartData) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const ctx = document.getElementById("TimeLineSelectors").getContext("2d");
      chartRef.current = new Chart(ctx, {
        type: "bar",
        data: chartData,
        options: {
          scales: {
            y: {
              beginAtZero: true,
              stepSize: 1,
            },
          },
        },
      });
    }
  }, [chartData, selectedDate, selectedCategory]);

  return (
    <>
      <div>
        <label style={{ fontWeight: "bold" }}>Select Date: </label>
        <DatePicker
          className="custom-date-picker"
          onChange={(date) => handleDateChange(date)}
          style={{ margin: 10, borderRadius: 10, border: "2px solid black" }}
        />

        <div>
          <label style={{ fontWeight: "bold" }}>Select Category: </label>
          <Select
            value={selectedCategory}
            style={{
              width: 120,
              border: "2px solid black",
              fontWeight: "bold",
              borderRadius: 10,
              margin: 10,
            }}
            onChange={handleCategoryChange}
          >
            <Select.Option value="sector">Sector</Select.Option>
            <Select.Option value="country">Country</Select.Option>
          </Select>
        </div>

        {selectedDate && (
          <div className="time-bar">
            <canvas id="TimeLineSelectors"></canvas>
          </div>
        )}
      </div>
    </>
  );
};

export default TimeLineChart;
