import React, { useEffect } from "react";
import Highcharts from "highcharts/highmaps";
import mapDataIndonesia from "./mapIndonesia";
import Box from "@material-ui/core/Box";
// import HighchartsExporting from 'highcharts/modules/exporting'

// if (typeof Highcharts === "object") { HighchartsExporting(Highcharts) ; }

export default function MapChart({ title, data }) {
  let dataMap = data;

  useEffect(() => {
    Highcharts.mapChart(title, {
      title: {
        text: "Perdagangan " + title,
      },
      subtitle: {
        text: "(Sumber: PELINDO III)",
      },
      mapNavigation: {
        enabled: true,
        buttonOptions: {
          verticalAlign: "bottom",
        },
      },
      colorAxis: {
        min: 0,
      },
      legend: {
        layout: "vertical",
        align: "left",
        verticalAlign: "bottom",
        title: {
          text: "VOLUME PER TON",
          style: {
            color: "black",
          },
        },
      },
      mapNavigation: {
        enabled: true,
        buttonOptions: {
          verticalAlign: "bottom",
        },
      },
      series: [
        {
          data: dataMap,
          mapData: mapDataIndonesia,
          name: "Data Perdagangan",
          states: {
            hover: {
              color: "#BADA55",
            },
          },
          dataLabels: {
            enabled: true,
            format: "{point.name}",
          },
        },
      ],
    });
  });

  return (
    <Box borderRadius={16} boxShadow={3}>
      <div className="map_bg" id={title} />
    </Box>
  );
}
