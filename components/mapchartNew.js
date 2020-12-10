import React, { Component } from "react";
import { findDOMNode, render } from "react-dom";
import Highcharts from "highcharts";
import HighMaps from "highcharts/highmaps";
import drilldown from "highcharts/modules/drilldown";
import map from "highcharts/modules/map";
import mapDataIndonesia from "./mapIndonesia";

class CustomHighMap extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let data = [];

    this.chart = new HighMaps["Map"](findDOMNode(this), {
      chart: {
        map: mapDataIndonesia,
      },
      title: {
        text: "Perdagangan " + this.props.title,
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
      },
      series: [
        {
          mapData: mapDataIndonesia,
          name: "Indoensia",
          data: this.props.data,
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
  }

  componentWillUnmount() {
    this.chart.destroy();
  }

  render() {
    return <div className="in-highchart" />;
  }
}

export default CustomHighMap;
