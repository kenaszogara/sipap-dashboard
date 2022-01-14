import React, { useEffect, useRef } from "react";
import Chart from "chart.js";
let chart;

// format number
const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export default function LineGraphPerdangan(props) {
  const { id, data, labels, tooltipsCallback, openData } = props;
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
          onClick: function(evt) {          
            var activePoints = chart.getElementsAtEventForMode(evt, 'point', chart.options);
            if(activePoints.length > 0){
              var firstPoint = activePoints[0];
              var lebelDataset = chart.data.datasets[firstPoint._datasetIndex].label;
              var labelMonth = chart.data.labels[firstPoint._index];
              var value = chart.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];
              openData(lebelDataset, labelMonth)
            }
          },
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
          animation: {
            duration: 100,
            loop: false,
            onComplete: function () {
              var chartInstance = this.chart,
              ctx = chartInstance.ctx;
              ctx.textAlign = 'center';
              ctx.fillStyle = "rgba(0, 0, 0, 1)";
              ctx.textBaseline = 'bottom';
              this.data.datasets.forEach(function (dataset, i) {
                  var meta = chartInstance.controller.getDatasetMeta(i);
                  meta.data.forEach(function (bar, index) {
                      var data = new Intl.NumberFormat("id-ID").format(
                        parseInt(dataset.data[index])
                      );
                      ctx.fillText(data == "NaN" ? "" : data, bar._model.x, bar._model.y - 5);
                  });
              });
            }
          }
        },
      });
    }
  });

  return <canvas id={id} ref={chartRef} />;
}
