import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import BarGraph from "./../bargraph";
import PieChart from "./../piechart";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

const comodityDataColors = [
  "rgb(242, 199, 110, 0.5)",
  "rgb(189, 157, 234, 0.5)",
  "rgb(234, 113, 134, 0.5)",
  "rgb(122, 119, 185, 0.5)",
];

export default function Chart({ data }) {
  const classes = useStyles();

  const [barData, setBarData] = useState(null);
  const [pieData, setPieData] = useState(null);
  const [pieLabel, setPieLabel] = useState(null);

  useEffect(() => {
    parseBarData(data);
    parsePieData(data);
  }, [data]);

  // parse group data by month for barChart
  const parseBarData = (data) => {
    const barData = [];
    let count = 0;
    let month = 1;
    data.forEach((item, index) => {
      const date = DateTime.fromISO(item.TGL_TRANSAKSI).month;

      if (date === month) {
        count++;
      } else {
        barData.push(count);
        month++;
        count = 0;
      }

      if (data.length === index + 1) {
        barData.push(count);
      }
    });

    setBarData(barData);
  };

  // parse data by komoditas for pieChart
  const parsePieData = (data) => {
    const comodityData = {};
    let countComodity = 0;
    data.forEach((item, index) => {
      if (!comodityData.hasOwnProperty(item.KOMODITAS)) {
        countComodity = 1;
        comodityData[item.KOMODITAS] = countComodity;
        countComodity++;
      } else {
        comodityData[item.KOMODITAS] = countComodity;
        countComodity++;
      }
    });

    const sortedComodityData = Object.fromEntries(
      Object.entries(comodityData).sort(([, a], [, b]) => b - a)
    );

    // setPieLabel(Object.keys(sortedComodityData).slice(0, 4));
    setPieLabel(Object.keys(sortedComodityData));
    setPieData(Object.values(sortedComodityData));
  };

  return (
    <Grid container item spacing={4}>
      <Grid item xs={12} md={7}>
        <h2>Transaksi</h2>
        <Paper className={classes.paper}>
          {barData && (
            <BarGraph
              labels={[
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "June",
                "July",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ]}
              datasets={barData}
              backgroundColor={"rgb(242, 199, 110, 0.5)"}
              options={{
                legend: {
                  display: false,
                },
              }}
            />
          )}
        </Paper>
      </Grid>
      <Grid item xs={12} md={5}>
        <h2>Transaksi per Komoditas</h2>
        <Paper className={classes.paper}>
          {pieLabel && pieData && (
            <PieChart
              labels={pieLabel}
              datasets={pieData}
              backgroundColor={comodityDataColors}
              options={{
                legend: false,
              }}
            />
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}
