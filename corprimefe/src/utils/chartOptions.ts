export const createChartOptions = (yAxisLimits: { min: number; max: number }) => ({
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'second',
          tooltipFormat: 'll HH:mm:ss',
        },
        title: {
          display: true,
          text: 'Time',
        },
        min: Date.now() - 30000,
        max: Date.now(),
      },
      y: {
        min: yAxisLimits.min,
        max: yAxisLimits.max,
        title: {
          display: true,
          text: 'Value',
        },
        ticks: {
          stepSize: 1,
        },
      },
    },
  });
  