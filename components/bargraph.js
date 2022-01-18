import React, { useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { 
  Bar,
  getDatasetAtEvent,
  getElementAtEvent,
  getElementsAtEvent,
} from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

export default function BarGraph(props) {
  const { id, datasets, labels, tooltipsCallback, openData, column, options, isClicked } = props;

  const dataChart = {
    labels: labels,
    datasets: datasets
  };

  const optionsChart = {
    responsive: true,
    plugins: {
      datalabels: {
        display: true,
        color: "black",
        align: "end",
        anchor: "end",
        font: { size: "14" },
        formatter: function(value, context) {
          var data = new Intl.NumberFormat("id-ID").format(
            parseInt(value)
          );
          return data == "NaN" ? "" : data;
        }
      }
    },
    legend: {
      display: false,
      position: "top"
    },
    title: {
      display: true,
      text: ""
    },
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: tooltipsCallback,
    },
    hover: {
      mode: "nearest",
      intersect: true
    },
    scales: {
      xAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Month"
          }
        }
      ],
      yAxes: [
        {
          display: true,
          labelString: "TON"
        }
      ]
    },
    elements: {
      line: {
        tension: 0 // disables bezier curves
      }
    },
    ...options
  };

  const chartRef = useRef(null);

  const printDatasetAtEvent = (dataset) => {
    if (!dataset.length) return;

    const datasetIndex = dataset[0].datasetIndex;

    return dataChart.datasets[datasetIndex].label;
  };

  const printElementAtEvent = (element) => {
    if (!element.length) return;

    const { datasetIndex, index } = element[0];

    return dataChart.labels[index];
  };

  const onClick = (event) => {
    const { current: chart } = chartRef;
    
    if (!chart) {
      return;
    }

    if(isClicked){
      if (!getDatasetAtEvent(chart, event).length) return;
      openData({ month: printElementAtEvent(getElementAtEvent(chart, event)) }, column);
    }
  };

  return <Bar ref={chartRef} options={optionsChart} data={dataChart} onClick={onClick} />;
}
