import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./components/NavBar";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import TimeLineChart from "./components/TimeLineChart";
import BubbleChart from "./components/LineChart";
import "./App.css";
import BarChartFilter from "./components/filters/BarChartFilter";

const App = () => {
  const [data, setData] = useState([]);
  const [topic, setTopic] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/data");
        const fetchedData = response.data;
        setData(fetchedData);
        console.log("Data fetched successfully");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const newTopic = BarChartFilter(
      "topic",
      "intensity",
      ["rgba(75,192,192,1)", "#ecf0f1", "#50AF95", "#f3ba2f", "#2a71d0"],
      data
    );

    setTopic(newTopic);
  }, [data]);

  return (
    <div className="App">
      <NavBar />

      {data.length === 0 ? (
        <div className="loader-container">
        <div class="loader"></div>
        </div>
      ) : (
        <div className="main">
          <div className="container1">
            <BarChart topics={topic} />
            <PieChart jsonData={data} />
          </div>
          <div className="timeline">
            <BubbleChart data={data} />
            <TimeLineChart jsonData={data} />
          </div>
        </div>
      )}
    </div>
  );
};
export default App;
