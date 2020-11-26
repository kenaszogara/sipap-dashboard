import React, { useRef, useEffect, useState } from "react";
import "./App.css";
// temporary local data
// import { data } from "./data";
// import Chart from "chart.js";
import MaterialTable from "material-table";
import { DateTime } from "luxon";
import axios from "axios";

// material ui
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";

// material icons
import DirectionsBoatIcon from "@material-ui/icons/DirectionsBoat";

// graphs and charts
import BarGraph from "./components/bargraph";
import PieChart from "./components/piechart";

// material ui theme
const theme = createMuiTheme({});

// material ui css
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

function App(props) {
  const classes = useStyles();

  const [data, setData] = useState(null);
  const [headerData, setHeaderData] = useState(null);
  const [barData, setBarData] = useState(null);
  const [pieData, setPieData] = useState(null);
  const [pieLabel, setPieLabel] = useState(null);
  const [topBongkarVolumeData, setTopBongkarVolumeData] = useState(null);
  const [topMuatVolumeData, setTopMuatVolumeData] = useState(null);
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

    setTopBongkarVolumeData(parseVolumeData(totalBongkar));
    setTopMuatVolumeData(parseVolumeData(totalMuat));

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

    // setPieLabel(Object.keys(sortedComodityData).slice(0, 4));
    setPieLabel(Object.keys(sortedComodityData));
    setPieData(Object.values(sortedComodityData));
  };

  // parse volume data
  const parseVolumeData = (data) => {
    const tempData = {};
    let volume = 0;
    data.forEach((item, index) => {
      if (!tempData.hasOwnProperty(item.KOMODITAS)) {
        item.SATUAN == "TON"
          ? (volume += parseInt(item.VOLUME) * 1000)
          : (volume += parseInt(item.VOLUME));

        tempData[item.KOMODITAS] = volume;
      } else {
        item.SATUAN == "TON"
          ? (volume += parseInt(item.VOLUME) * 1000)
          : (volume += parseInt(item.VOLUME));

        tempData[item.KOMODITAS] = volume;
      }
    });

    // sort data by volume
    const sortedTempData = Object.fromEntries(
      Object.entries(tempData).sort(([, a], [, b]) => b - a)
    );

    // pick top 10,
    /**
     *  no:
     *  name:
     *  volume:
     */
    const top = 10;
    const list = Object.entries(sortedTempData)
      .slice(0, top)
      .map(([key, value], index) => ({
        no: index + 1,
        name: key,
        volume: value,
      }));

    // console.log(list);
    return list;
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
          <Grid container spacing={4}>
            {/* Header Data */}
            <Grid container item direction="row" xs={12} spacing={4}>
              <Grid container item alignItems="center" xs={6} md={3} lg={2}>
                <IconButton
                  className={classes.iconButton}
                  style={{ backgroundColor: "#F2C76E" }}
                >
                  <DirectionsBoatIcon />
                </IconButton>
                <div>
                  <span style={{ color: "#F2C76E", fontWeight: "500" }}>
                    Pelabuhan
                  </span>
                  <Typography>Tanjung Emas</Typography>
                </div>
              </Grid>
              <Grid container item alignItems="center" xs={6} md={3} lg={2}>
                <IconButton
                  style={{ backgroundColor: "#039be5" }}
                  className={classes.iconButton}
                  onClick={() => (window.location.href = "#transaksi")}
                >
                  <i className="fas fa-boxes"></i>
                </IconButton>
                <div>
                  <span style={{ color: "#039be5", fontWeight: "500" }}>
                    Total Transaksi
                  </span>
                  <Typography>
                    {headerData.totalData.toLocaleString("id-ID")}
                  </Typography>
                </div>
              </Grid>
              <Grid container item alignItems="center" xs={6} md={3} lg={2}>
                <IconButton
                  style={{ backgroundColor: "#009688" }}
                  className={classes.iconButton}
                  onClick={() => (window.location.href = "#bongkar")}
                >
                  <i className="fas fa-box-open"></i>
                </IconButton>
                <div>
                  <span style={{ color: "#009688", fontWeight: "500" }}>
                    Jenis Bongkar
                  </span>
                  <Typography>
                    {headerData.totalBongkar.length.toLocaleString("id-ID")}
                  </Typography>
                </div>
              </Grid>
              <Grid container item alignItems="center" xs={6} md={3} lg={2}>
                <IconButton
                  style={{ backgroundColor: "#e91e63" }}
                  className={classes.iconButton}
                  onClick={() => (window.location.href = "#muat")}
                >
                  <i className="fas fa-box"></i>
                </IconButton>
                <div>
                  <span style={{ color: "#e91e63", fontWeight: "500" }}>
                    Jenis Muat
                  </span>
                  <Typography>
                    {headerData.totalMuat.length.toLocaleString("id-ID")}
                  </Typography>
                </div>
              </Grid>
            </Grid>

            {/* Body Data */}
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
                <h2>Transaksi per Komoditas</h2>
                <Paper className={classes.paper}>
                  <PieChart
                    labels={pieLabel}
                    datasets={pieData}
                    backgroundColor={comodityDataColors}
                    options={{
                      legend: false,
                    }}
                  />
                </Paper>
              </Grid>
            </Grid>

            {/* Data Table */}
            <Grid container item spacing={4}>
              <Grid item xs={12} md={6} id="bongkar">
                <MaterialTable
                  columns={[
                    {
                      title: "No.",
                      field: "no",
                      cellStyle: {
                        width: 1,
                        maxWidth: 1,
                      },
                      headerStyle: {
                        width: 1,
                        maxWidth: 1,
                      },
                    },
                    { title: "Jenis Komoditas", field: "name" },
                    {
                      title: "Jumlah (kg)",
                      field: "volume",
                      type: "numeric",
                      render: (RowData) =>
                        new Intl.NumberFormat("id-ID").format(
                          parseInt(RowData.volume)
                        ),
                    },
                  ]}
                  data={topBongkarVolumeData}
                  title="Bongkar"
                  options={{
                    search: false,
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6} id="muat">
                <MaterialTable
                  columns={[
                    {
                      title: "No.",
                      field: "no",
                      cellStyle: {
                        width: 1,
                        maxWidth: 1,
                      },
                      headerStyle: {
                        width: 1,
                        maxWidth: 1,
                      },
                    },
                    { title: "Jenis", field: "name" },
                    {
                      title: "Jumlah (kg)",
                      field: "volume",
                      type: "numeric",
                      render: (RowData) =>
                        new Intl.NumberFormat("id-ID").format(
                          parseInt(RowData.volume)
                        ),
                    },
                  ]}
                  data={topMuatVolumeData}
                  title="Muat"
                  options={{
                    search: false,
                  }}
                />
              </Grid>

              <Grid item xs={12} md={12} id="transaksi">
                <MaterialTable
                  columns={[
                    {
                      title: "Tgl. Transaksi",
                      field: "TGL_TRANSAKSI",
                      type: "date",
                    },
                    {
                      title: "Jenis",
                      field: "JENIS",
                    },
                    { title: "Komoditas", field: "KOMODITAS" },
                    {
                      title: "Volume",
                      field: "VOLUME",
                      type: "numeric",
                      render: (RowData) =>
                        new Intl.NumberFormat("id-ID").format(
                          parseInt(RowData.VOLUME)
                        ),
                    },
                    {
                      title: "Satuan",
                      field: "SATUAN",
                    },
                    {
                      title: "Pelabuhan Muat",
                      field: "PELB_MUAT",
                    },
                    {
                      title: "Pelabuhan Bongkar",
                      field: "PELB_BONGKAR",
                    },
                  ]}
                  data={data}
                  title="Data Pelindo III"
                  options={{
                    pageSize: 10,
                    pageSizeOptions: [10, 20, 50, 100],
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </div>
  );
}

export default App;
