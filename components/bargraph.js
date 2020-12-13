import React, { useEffect, useRef } from "react";
import Chart from "chart.js";

export default function BarGraph(props) {
  const { labels, datasets, options } = props;
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      new Chart(chartRef.current.getContext("2d"), {
        type: "bar",
        data: {
          labels: labels,
          datasets: datasets,
        },
        options: options,
      });
    }
  });

  return <canvas id="myBarChart" ref={chartRef} />;
}
