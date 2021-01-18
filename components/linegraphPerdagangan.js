import React, { useEffect, useRef } from "react";
import Chart from "chart.js";
let chart;

// format number
const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export default function LineGraphPerdangan(props) {
  const { id, data, labels, tooltipsCallback } = props;
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      if (typeof chart !== "undefined") chart.destroy();

      chart = new Chart(chartRef.current.getContext("2d"), {
        type: "line",
        data: {
          labels: labels,
          datasets: data,
        },
        options: {
          responsive: true,
          title: {
            display: true,
            text: "",
          },
          tooltips: {
            mode: "index",
            intersect: false,
            callbacks: tooltipsCallback,
          },
          hover: {
            mode: "nearest",
            intersect: true,
          },
          scales: {
            xAxes: [
              {
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: "Month",
                },
              },
            ],
            yAxes: [
              {
                display: true,
                labelString: "TON",
              },
            ],
          },
          elements: {
            line: {
              tension: 0, // disables bezier curves
            },
          },
        },
      });
    }
  });

  return <canvas id={id} ref={chartRef} />;
}
