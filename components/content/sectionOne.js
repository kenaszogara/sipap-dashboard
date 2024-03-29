import React, { useEffect, useState } from "react";
import LineGraph from "./../linegraph";
import LineGraphPerdangan from "./../linegraphPerdagangan";
import BarGraph from "./../bargraph";
import { makeStyles } from "@material-ui/core/styles";
import NeracaUpIcon from "@material-ui/icons/ExpandLess";
import NeracaDownIcon from "@material-ui/icons/ExpandMore";
import Box from "@material-ui/core/Box";
import { DateTime } from "luxon";
import Grid from "@material-ui/core/Grid";
import { DatePicker } from "@material-ui/pickers";

const monthLabels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// format number
const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

// material ui css
const useStyles = makeStyles((theme) => ({
  surplus: {
    color: "#009688",
    marginLeft: "1em",
    fontSize: "14px",
    fontWeight: "700",
  },
  deficit: {
    color: "#FE7979",
    marginLeft: "1em",
    fontSize: "14px",
    fontWeight: "700",
  },
}));

export default function SectionOne({ chart, data, year, handleYear }) {
  const classes = useStyles();

  const currMonth = DateTime.local();
  const lastMonth = DateTime.local().minus({ months: 1 });

  const [topBongkarVolumeData, setTopBongkarVolumeData] = useState(null);
  const [topMuatVolumeData, setTopMuatVolumeData] = useState(null);
  const [surplus, setSurplus] = useState(null);
  const [indexTerima, setIndexTerima] = useState([]);
  const [indexBayar, setIndexBayar] = useState([]);
  const [indexNTP, setIndexNTP] = useState([]);
  const [dataHarga, setDataHarga] = useState(null);
  const [lastMonthDate, handleLastMonthDate] = useState(lastMonth);
  const [currMonthDate, handleCurrMonthDate] = useState(currMonth);
  const [ntpDate, handleNTPDate] = useState(currMonth);

  useEffect(() => {
    bongkar(chart);
    muat(chart);
  }, [chart]);

  useEffect(() => {
    parseNTP(data.ntp);
  }, [data, ntpDate]);

  useEffect(() => {
    setDataHarga(null);
    parseHarga(data.harga);
    console.log(lastMonthDate);
  }, [data, lastMonthDate, currMonthDate]);

  useEffect(() => {
    const month = 11;
    if (topBongkarVolumeData && topMuatVolumeData) {
      const bongkar =
        typeof topBongkarVolumeData[month] != "undefined"
          ? topBongkarVolumeData[month]
          : 0;
      const muat =
        typeof topMuatVolumeData[month] != "undefined"
          ? topMuatVolumeData[month]
          : 0;

      const val = (bongkar - muat) / 1000;
      setSurplus(numberWithCommas(Number(val)));
    }
  }, [topBongkarVolumeData, topMuatVolumeData]);

  const bongkar = (data) => {
    const bongkar = [];
    let month = 1;
    let total = 0;
    data.forEach((item, index) => {
      if (item.JENIS === "BONGKAR") {
        const date = DateTime.fromISO(item.TGL_TRANSAKSI).month;
        if (date === month) {
          item.SATUAN === "TON"
            ? (total += parseInt(item.VOLUME) * 1000)
            : (total += parseInt(item.VOLUME));
        } else {
          bongkar.push(total);
          month++;
          total = 0;
        }
        if (data.length === index + 1) {
          bongkar.push(total);
        }
      }
    });

    setTopBongkarVolumeData(bongkar);
  };

  const muat = (data) => {
    const muat = [];
    let month = 1;
    let total = 0;
    data.forEach((item, index) => {
      if (item.JENIS === "MUAT") {
        const date = DateTime.fromISO(item.TGL_TRANSAKSI).month;
        if (date === month) {
          item.SATUAN === "TON"
            ? (total += parseInt(item.VOLUME) * 1000)
            : (total += parseInt(item.VOLUME));
        } else {
          muat.push(total);
          month++;
          total = 0;
        }
        if (data.length === index + 1) {
          muat.push(total);
        }
      }
    });

    setTopMuatVolumeData(muat);
  };

  const parseNTP = (ntp) => {
    const year = ntpDate.year;
    const indexTerima = ntp.map((item) => {
      if (item.tahun == year) return item.indexTerima;
    });

    const indexBayar = ntp.map((item) => {
      if (item.tahun == year) return item.indexBayar;
    });

    const indexNTP = ntp.map((item) => {
      if (item.tahun == year) return item.ntp;
    });

    setIndexTerima(indexTerima);
    setIndexBayar(indexBayar);
    setIndexNTP(indexNTP);
  };

  const parseHarga = (data) => {
    // parse labels by comodities
    const labels = [];
    const dataLastMonth = [];
    const dataCurrMonth = [];

    // console.log(lastMonthDate.month, currMonthDate.month);

    // parse by month oktober
    const parse = data.map((item) => {
      if (
        item.bulan == lastMonthDate.month &&
        item.tahun == lastMonthDate.year
      ) {
        dataLastMonth.push(item.harga);
      } else if (
        item.bulan == currMonthDate.month &&
        item.tahun == currMonthDate.year
      ) {
        labels.push(`${item.komoditas} (${item.satuan})`);
        dataCurrMonth.push(item.harga);
      }
    });

    // console.log(dataLastMonth, dataCurrMonth);

    // set state
    setDataHarga({
      labels,
      dataLastMonth,
      dataCurrMonth,
    });
  };

  return (
    <Grid container item direction="row" xs={12} spacing={4}>
      <Grid container item direction="column" xs={12} md={4} lg={3} spacing={2}>
        <Grid item>
          <h2>Neraca Perdagangan</h2>
          <Box
            borderRadius={4}
            width={1}
            boxShadow={3}
            style={{ padding: "20px" }}
          >
            <h1
              align="center"
              className="neraca-surplus"
              style={surplus < 0 ? { color: "#009688" } : { color: "#FE7979" }}
            >
              {surplus < 0 ? (
                <NeracaUpIcon style={{ fontSize: "30px", color: "#009688" }} />
              ) : (
                <NeracaDownIcon
                  style={{ fontSize: "30px", color: "#FE7979" }}
                />
              )}
              {surplus} ton
            </h1>
            <div>
              <br />
              <ul
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: 0,
                }}
              >
                <li style={{ marginRight: "1em" }}>
                  <NeracaUpIcon
                    style={{ fontSize: "30px", color: "#009688" }}
                  />
                  Surplus
                </li>
                <li>
                  <NeracaDownIcon
                    style={{ fontSize: "30px", color: "#FE7979" }}
                  />
                  Deficit
                </li>
              </ul>
            </div>
          </Box>
        </Grid>
        <Grid container item direction="column" spacing={2}>
          <h2 style={{ paddingLeft: "0.6em", marginBottom: "0" }}>
            Data Provinsi
          </h2>
          <h3 style={{ paddingLeft: "0.6em", marginTop: "0.3em" }}>
            Pertumbuhan sektor perdagangan Jawa Tengah (%)
          </h3>
          {data.ppj &&
            data.ppj.map((item, index) => (
              <Grid item key={index}>
                <Box
                  borderRadius={4}
                  width={1}
                  boxShadow={3}
                  style={{ padding: "20px" }}
                >
                  <b>{item.nama}</b>:
                  {item.prosentase > 0 ? (
                    <span className={classes.surplus}>+{item.prosentase}%</span>
                  ) : (
                    <span className={classes.deficit}>{item.prosentase}%</span>
                  )}
                </Box>
              </Grid>
            ))}
        </Grid>
      </Grid>
      <Grid item xs={12} md={8} lg={9}>
        <h2>Data Perdagangan Keluar dan Masuk (ton)</h2>
        <Box borderRadius={4} boxShadow={3} style={{ padding: "20px" }}>
          <DatePicker
            variant="inline"
            openTo="year"
            views={["year"]}
            label="Tahun"
            value={year}
            onChange={handleYear}
            style={{ marginRight: "1em" }}
          />
          <LineGraphPerdangan
            id="chartPerdagangan"
            labels={monthLabels}
            data={[
              {
                label: "Keluar",
                backgroundColor: "#fe7979",
                borderColor: "#fe7979",
                data: topMuatVolumeData,
                fill: false,
                lineTension: "0",
              },
              {
                label: "Masuk",
                fill: false,
                backgroundColor: "#6a7df3",
                borderColor: "#6a7df3",
                data: topBongkarVolumeData,
                lineTension: "0",
              },
            ]}
            tooltipsCallback={{
              label: function (tooltipItem, data) {
                let label = tooltipItem.datasetIndex == 0 ? "Keluar" : "Masuk";
                let value = `${numberWithCommas(tooltipItem.value)} ton` || "";

                return `${label}: ${value}`;
              },
            }}
          />
        </Box>
      </Grid>

      <Grid container item direction="row" xs={12} spacing={4}>
        <Grid item xs={12} lg={6}>
          <h2>Data Nilai Tukar Petani</h2>
          <Box
            borderRadius={4}
            width={1}
            boxShadow={3}
            style={{ padding: "20px" }}
          >
            <DatePicker
              variant="inline"
              openTo="year"
              views={["year"]}
              label="Tahun"
              value={ntpDate}
              onChange={handleNTPDate}
              style={{ marginRight: "1em" }}
            />

            <LineGraph
              id="chartNTP"
              labels={monthLabels}
              data={[
                {
                  label: "Index Diterima Petani (It)",
                  backgroundColor: "#fe7979",
                  borderColor: "#fe7979",
                  data: indexTerima,
                  fill: false,
                  lineTension: "0",
                },
                {
                  label: "Index Dibayar Petani (Ib)",
                  fill: false,
                  backgroundColor: "#6a7df3",
                  borderColor: "#6a7df3",
                  data: indexBayar,
                  lineTension: "0",
                },
                {
                  label: "NTP",
                  fill: false,
                  backgroundColor: "#F2C76E",
                  borderColor: "#F2C76E",
                  data: indexNTP,
                  lineTension: "0",
                },
              ]}
              tooltipsCallback={{
                label: function (tooltipItem, data) {
                  let i = tooltipItem.datasetIndex;
                  let label = "";
                  if (i == 0) {
                    label = "It";
                  } else if (i == 1) {
                    label = "Ib";
                  } else {
                    label = "NTP";
                  }

                  let value =
                    `${numberWithCommas(tooltipItem.value)} ton` || "";

                  return `${label}: ${value}`;
                },
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <h2>Data Harga SP2KP</h2>
          <Box
            borderRadius={4}
            width={1}
            boxShadow={3}
            style={{ padding: "20px" }}
          >
            <DatePicker
              variant="inline"
              openTo="year"
              views={["year", "month"]}
              label="Bulan Perbandingan"
              value={lastMonthDate}
              onChange={handleLastMonthDate}
              style={{ marginRight: "1em" }}
            />

            <DatePicker
              variant="inline"
              openTo="year"
              views={["year", "month"]}
              label="Bulan Sekarang"
              value={currMonthDate}
              onChange={handleCurrMonthDate}
            />

            {dataHarga != null && (
              <BarGraph
                labels={dataHarga.labels}
                datasets={[
                  {
                    label: "Bulan Perbandingan",
                    backgroundColor: "#FE7979",
                    data: dataHarga.dataLastMonth,
                  },
                  {
                    label: "Bulan Sekarang",
                    backgroundColor: "#009688",
                    data: dataHarga.dataCurrMonth,
                  },
                ]}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}
