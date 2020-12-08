import React, { useEffect, useRef } from "react";
import Chart from "chart.js";

export default function PieChart(props) {
  const { labels, datasets, options, backgroundColor } = props;
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      new Chart(chartRef.current.getContext("2d"), {
        type: "pie",
        data: {
          labels: labels,
          datasets: [
            {
              backgroundColor: backgroundColor,
              data: datasets,
            },
          ],
        },
        options: options,
      });
    }
  });

  return <canvas id="myPieChart" ref={chartRef} />;
}
