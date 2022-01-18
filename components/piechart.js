import React, { useRef } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie,
  getDatasetAtEvent,
  getElementAtEvent,
  getElementsAtEvent } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart(props) {
  const { id, datasets, labels, tooltipsCallback, backgroundColor, openData, column, isClicked } = props;

  const data = {
    labels: labels,
    datasets: [
      {
        data: datasets,
        backgroundColor: backgroundColor
      }
    ]
  };

  
  const chartRef = useRef(null);

  const printDatasetAtEvent = (dataset) => {
    if (!dataset.length) return;

    const datasetIndex = dataset[0].datasetIndex;

    return data.datasets[datasetIndex].label;
  };

  const printElementAtEvent = (element) => {
    if (!element.length) return;

    const { datasetIndex, index } = element[0];

    return data.labels[index];
  };

  const onClick = (event) => {
    const { current: chart } = chartRef;
    
    if (!chart) {
      return;
    }

    if(isClicked){
      if (!getDatasetAtEvent(chart, event).length) return;
      openData({ komoditas: printElementAtEvent(getElementAtEvent(chart, event)) }, column);
    }
  };

  return (
    <Pie
      ref={chartRef}
      onClick={onClick}
      data={data}
      options={{
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          datalabels: {
            display: true,
            color: "black",
            font: { size: "14" },
            formatter: function (value, context) {
              var data = new Intl.NumberFormat("id-ID").format(parseInt(value));
              return data == "NaN" ? "" : data;
            }
          }
        },
        maintainAspectRatio: false
      }}
      width="300"
      height="210"
    />
  );
}
