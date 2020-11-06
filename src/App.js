import React, { useRef, useEffect, useState } from "react";
import "./App.css";
// temporary local data
// import { data } from "./data";
import styled from "styled-components";
import Chart from "chart.js";
import { DateTime } from "luxon";
import axios from "axios";

// material ui
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";

// material icons
import DirectionsBoatIcon from "@material-ui/icons/DirectionsBoat";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  pallete: theme.pallete,
  appBarSpacer: theme.mixins.toolbar,
  content: {
    backgroundColor:
      theme.palette.mode === "light"
        ? theme.palette.grey[100]
        : theme.palette.grey[900],
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    overflowX: "hidden",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  iconButton: {
    color: "#fafafa",
    margin: "0.3em",
  },
  linearProgress: {
    width: "100%",
    height: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function BarGraph(props) {
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

function PieChart(props) {
  const { labels, datasets, options, backgroundColor } = props;
  const chartRef = useRef(null);
  // const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const newChartInstance = new Chart(chartRef.current.getContext("2d"), {
        type: "pie",
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

  return <canvas id="myPieChart" ref={chartRef} />;
}

function App() {
  const classes = useStyles();

  const [data, setData] = useState(null);
  const [headerData, setHeaderData] = useState(null);
  const [barData, setBarData] = useState(null);
  const [pieData, setPieData] = useState(null);
  const [pieLabel, setPieLabel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // fetch data from api
  useEffect(() => {
    if (data == null) {
      setLoading(true);
      const host = process.env.REACT_APP_API_URL || "http://localhost:5000/";
      axios
        .get(`${host}api/v1/auth/PP3_USR1`)
        .then((res) => {
          const token = res.data.JWT;
          // console.log(token);
          axios
            .get(`${host}api/v1/pelindo/2019/2020`, {
              headers: {
                Authorization: token,
              },
            })
            .then((res) => {
              // console.log(res.data);
              setData(res.data);
              parseHeaderData(res.data);
              parseBarData(res.data);
              parsePieData(res.data);
              setLoading(false);
              setError(false);
            })
            .catch((err) => {
              console.log(err);
              setLoading(false);
              setError(true);
            });
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setError(true);
        });
    }
  }, [data]);

  // parse header data
  const parseHeaderData = (data) => {
    const totalData = data.length;
    const totalBongkar = data.filter((item, index) => {
      return item.JENIS === "BONGKAR";
    });
    const totalMuat = data.filter((item, index) => {
      return item.JENIS === "MUAT";
    });

    setHeaderData({
      totalData,
      totalBongkar,
      totalMuat,
    });
  };

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

      if (data.length == index + 1) {
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

    setPieLabel(Object.keys(sortedComodityData).slice(0, 4));
    setPieData(Object.values(sortedComodityData));
  };

  const comodityDataColors = [
    "rgb(242, 199, 110, 0.5)",
    "rgb(189, 157, 234, 0.5)",
    "rgb(234, 113, 134, 0.5)",
    "rgb(122, 119, 185, 0.5)",
  ];

  return (
    <div style={{ marginLeft: "4em", marginRight: "4em" }}>
      <Grid container spacing={2}>
        <Grid container item spacing={2} alignItems="baseline">
          <h1>Pelindo Dashboard</h1>
          <span
            style={{
              marginLeft: "1em",
              fontSize: "18px",
              fontWeight: "700",
              color: "gray",
            }}
          >
            2019
          </span>
        </Grid>

        {/* loading animation */}
        {loading && (
          <Grid container spacing={4}>
            <Grid item className={classes.linearProgress} xs={12}>
              <LinearProgress />
            </Grid>
          </Grid>
        )}

        {!loading && !error && headerData && pieData && pieLabel && barData && (
          <>
            {/* Header Data */}
            <Grid container item direction="row" xs={12} spacing={4}>
              <Grid container item alignItems="center" xs={6} md={3} lg={2}>
                <IconButton
                  className={classes.iconButton}
                  style={{ backgroundColor: "#F2C76E" }}
                >
                  <DirectionsBoatIcon />
                </IconButton>
                <Typography>Tanjung Emas</Typography>
              </Grid>
              <Grid container item alignItems="center" xs={6} md={3} lg={2}>
                <IconButton
                  style={{ backgroundColor: "#039be5" }}
                  className={classes.iconButton}
                >
                  <i className="fas fa-boxes"></i>
                </IconButton>
                <Typography>{headerData.totalData}</Typography>
              </Grid>
              <Grid container item alignItems="center" xs={6} md={3} lg={2}>
                <IconButton
                  style={{ backgroundColor: "#009688" }}
                  className={classes.iconButton}
                >
                  <i className="fas fa-box-open"></i>
                </IconButton>
                <Typography>{headerData.totalBongkar.length}</Typography>
              </Grid>
              <Grid container item alignItems="center" xs={6} md={3} lg={2}>
                <IconButton
                  style={{ backgroundColor: "#e91e63" }}
                  className={classes.iconButton}
                >
                  <i className="fas fa-box"></i>
                </IconButton>
                <Typography>{headerData.totalMuat.length}</Typography>
              </Grid>
            </Grid>

            {/* Chart Data */}
            <Grid container item spacing={4}>
              <Grid item xs={12} md={7}>
                <h2>Transaksi</h2>
                <Paper className={classes.paper}>
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
                </Paper>
              </Grid>
              <Grid item xs={12} md={5}>
                <h2>Komoditas</h2>
                <Paper className={classes.paper}>
                  <PieChart
                    labels={pieLabel}
                    datasets={pieData}
                    backgroundColor={comodityDataColors}
                    options={{
                      legend: {
                        position: "bottom",
                      },
                    }}
                  />
                </Paper>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
}

export default App;
