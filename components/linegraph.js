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
          labels: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
          datasets: [
            {
              label: 'keluar',
              backgroundColor: '#fe7979',
              borderColor: '#fe7979',
              data: dataMuat,
              fill: false,
            },{
              label: 'Masuk',
              fill: false,
              backgroundColor: '#6a7df3',
              borderColor: '#6a7df3',
              data: dataBongkar,
            }
          ],
        },
        options: {
          responsive: true,
          title: {
            display: true,
            text: ''
          },
          lineTension: '0',          
          tooltips: {
            mode: 'index',
            intersect: false,
          },
          hover: {
            mode: 'nearest',
            intersect: true
          },
          scales: {
            xAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Month'
              }
            }],
            yAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'TON'
              }
            }]
          }
        }
      });
    }
  });
     
  return <canvas id="myBarChart" ref={chartRef} />;
}
