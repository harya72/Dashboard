const BarChartFilter = (keyField, intensityField, backgroundColors, data) => {
  const groupedData = data.reduce((accumulator, currentItem) => {
    const key = currentItem[keyField];

    accumulator[key] = accumulator[key] || { totalIntensity: 0, count: 0 };
    accumulator[key].totalIntensity += currentItem[intensityField];
    accumulator[key].count += 1;

    return accumulator;
  }, {});

  const uniqueData = Object.entries(groupedData).map(([key, { totalIntensity, count }]) => ({
    key,
    averageIntensity: totalIntensity / count,
  }));

  return {
    labels: uniqueData.map((item) => item.key),
    datasets: [
      {
        label: `Average Intensity by ${keyField}`,
        data: uniqueData.map((item) => item.averageIntensity),
        backgroundColor: backgroundColors,
      },
    ],
  };
};

export default BarChartFilter;
