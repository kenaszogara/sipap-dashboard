import React, { useEffect } from "react";
import Highcharts from "highcharts/highmaps";
import mapDataIndonesia from "./mapindonesia";
import Box from '@material-ui/core/Box';

export default function MapChart({ title, data }) {
  let dataMap = [
    ['id-jt', data]
  ];

  useEffect(() => {
    Highcharts.mapChart(title, {        
      title: {
        text: 'Perdagangan '+title,
      },
      subtitle: {
        text: '(Sumber: PELINDO III)'
      },
      mapNavigation: {
        enabled: true,
        buttonOptions: {
            verticalAlign: 'bottom'
        }
      },
      colorAxis: {
        min: 0    
      },
      legend: {
          layout: 'vertical',
          align: 'left',
          verticalAlign: 'bottom',
          title: {
          text: "VOLUME PER TON",
          style: {
            color:  "black"
            }
          }
      },
      mapNavigation: {
        enabled: true,
        buttonOptions: {
          verticalAlign: "bottom"
        }
      },
      series: [{
        data: dataMap,
        mapData: mapDataIndonesia,
        name: "Data Perdagangan",
        states: {
          hover: {
              color: '#BADA55'
          }
        },
        dataLabels: {
        enabled: true,
        format: '{point.name}'
        }
      }]
    })
  });

  return (
    <Box borderRadius={16} boxShadow={3}>
      <div className="map_bg" id={title} />
    </Box>
  );
}
