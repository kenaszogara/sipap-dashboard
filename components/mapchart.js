import React, { useEffect, useRef } from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import mapDataIndonesia from './mapIndonesia';
import highchartsMap from "highcharts/modules/map";

highchartsMap(Highcharts)

export default function MapChart({ title, data }) {    

  var data = [
    ['id-jt', data]
  ];

  const mapOptions = {
    chart: {
        map: mapDataIndonesia
    },
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
        verticalAlign: 'bottom'
    },
    series: [{
      mapData: mapDataIndonesia,
      name: 'Indoensia',
      data: data,
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
  };

  return (
      <HighchartsReact
        options={mapOptions}
        constructorType={'mapChart'}
        highcharts={Highcharts}
      />
    );
}
