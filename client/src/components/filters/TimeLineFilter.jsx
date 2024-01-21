const TimelineFilter = ({ jsonData, selectedDate, selectedCategory }) => {
  if (!jsonData || jsonData.length === 0 || !selectedDate) {
    return null;
  }

  const isSectorCategory = selectedCategory === "sector";

  const filteredData = jsonData.filter((item) => {
    const itemDate = new Date(item.published);
    return itemDate.toDateString() === selectedDate.toDateString();
  });

  const dataGroups = filteredData.reduce((accumulator, item) => {
    const key = isSectorCategory ? item.sector : item.country;

    if (key) {
      accumulator[key] = accumulator[key] || { label: key, count: 0 };
      accumulator[key].count += 1;
    }

    return accumulator;
  }, {});

  const chartDataArray = Object.values(dataGroups);

  return {
    labels: chartDataArray.map((item) => item.label),
    datasets: [
      {
        label: `Affected ${isSectorCategory ? "Sectors" : "Countries"} on ${selectedDate.toDateString()}`,
        data: chartDataArray.map((item) => item.count),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
};

export default TimelineFilter;
