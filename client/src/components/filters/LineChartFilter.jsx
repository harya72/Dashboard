const LineChartFilter = ({ data }) => {
  const filteredData = data
    .filter(({ start_year, end_year, sector }) => start_year !== "" && end_year !== "" && sector !== "")
    .reduce((uniqueData, sectorData) => {
      if (!sectorData.sector) {
        return uniqueData;
      }

      const existingDataIndex = uniqueData.findIndex((s) => s.label === sectorData.sector);

      const weightedScore = sectorData.relevance * sectorData.likelihood;

      const dataPoint = {
        x: Number(sectorData.start_year),
        y: weightedScore,
        year: Number(sectorData.start_year),
        relevance: sectorData.relevance,
        likelihood: sectorData.likelihood,
      };

      if (existingDataIndex === -1) {
        uniqueData.push({
          label: sectorData.sector,
          data: [
            dataPoint,
            {
              x: Number(sectorData.end_year),
              y: sectorData.likelihood,
              year: Number(sectorData.end_year),
              relevance: sectorData.relevance,
              likelihood: sectorData.likelihood,
            },
          ],
          borderColor: getRandomColor(),
          backgroundColor: "transparent",
          pointBackgroundColor: getRandomColor(),
          pointRadius: 5,
          pointHoverRadius: 8,
        });
      }

      return uniqueData;
    }, []);

  return filteredData;
};

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default LineChartFilter;
