import React, { useEffect, useRef } from "react";
import Chart from "chart.js";

export default function LineGraph(props) {
  const { data } = props;
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      new Chart(chartRef.current.getContext("2d"), {
        type: "line",
        data: {
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
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

  return <canvas id="myLineChart" ref={chartRef} />;
}
