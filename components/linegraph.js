import React, { useEffect, useRef } from "react";
import Chart from "chart.js";

export default function LineGraph(props) {
  const { dataBongkar, dataMuat } = props;
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
          datasets: [
            {
              label: "keluar",
              backgroundColor: "#fe7979",
              borderColor: "#fe7979",
              data: dataMuat,
              fill: false,
              lineTension: "0",
            },
            {
              label: "Masuk",
              fill: false,
              backgroundColor: "#6a7df3",
              borderColor: "#6a7df3",
              data: dataBongkar,
              lineTension: "0",
            },
          ],
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
                labelString: 'TON'
              }
            }]
          },
          elements: {
            line: {
                tension: 0 // disables bezier curves
            }
          },
        },
      });
    }
  });

  return <canvas id="myLineChart" ref={chartRef} />;
}
