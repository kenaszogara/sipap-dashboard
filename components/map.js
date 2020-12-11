import React, { Component } from "react";
import { findDOMNode, render } from "react-dom";
import Highcharts from "highcharts";
import HighMaps from "highcharts/highmaps";
import drilldown from "highcharts/modules/drilldown";
import map from "highcharts/modules/map";
import mapDataIndonesia from "./mapindonesia";

class MapChart extends Component {
  componentDidMount() {
    let data = this.props.data;

    const options = {

      title: {
        text: "HighMap Test"
      },
      plotOptions: {
        map: {
          states: {
            hover: {
              color: "#EEDD66"
            }
          }
        }
      },
      colorAxis: {
        min: 0,
        minColor: "#E6E7E8",
        maxColor: "#005645"
      },
      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle"
      },

      subtitle: {
        text: "USA",
        floating: true,
        align: "right",
        y: 50,
        style: {
          fontSize: "16px"
        }
      },
      series: [
        {
          mapData: mapDataIndonesia,
          data: data,
          name: "Indonesia",
          dataLabels: {
            enabled: true,
            format: "{point.name}"
          }
        }
      ],
      mapNavigation: {
        enabled: true,
        buttonOptions: {
          verticalAlign: "bottom"
        }
      }
    };

    
    this.chart = new HighMaps["Map"](findDOMNode(this), options);

  }

  componentWillUnmount() {
    this.chart.destroy();
  }

  render() {
    return <div className="in-highchart" />;
  }
}

export default MapChart;
