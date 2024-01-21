const PieChartFilter = (jsonData, selectedFilter) => {
  const uniqueValues = [
    ...new Set(jsonData.map((item) => item[selectedFilter])),
  ].filter((value) => value !== "");
  const countOccurrences = uniqueValues.reduce((accumulator, value) => {
    accumulator[value] = jsonData.filter(
      (item) => item[selectedFilter] === value
    ).length;
    return accumulator;
  }, {});

  const getRandomColors = (count) => {
    // Generate random colors based on the count
    return Array.from({ length: count }, () => getRandomColor());
  };

  const getRandomColor = () => {
    // Generate a random hex color code
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

  return {
    labels: Object.keys(countOccurrences),
    datasets: [
      {
        data: Object.values(countOccurrences),
        backgroundColor: getRandomColors(Object.keys(countOccurrences).length),
      },
    ],
  };
};

export { PieChartFilter };
