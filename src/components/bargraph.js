import React, { useEffect, useRef } from "react";
import Chart from "chart.js";

export default function BarGraph(props) {
  const { labels, datasets, options, backgroundColor } = props;
  const chartRef = useRef(null);
  // const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const newChartInstance = new Chart(chartRef.current.getContext("2d"), {
        type: "bar",
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

      // setChartInstance(newChartInstance);
    }
  }, [chartRef]);

  return <canvas id="myBarChart" ref={chartRef} />;
}
