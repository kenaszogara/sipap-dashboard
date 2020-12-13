import React, { useEffect, useState } from "react";
import LineGraph from "./../linegraph";
import BarGraph from "./../bargraph";
import NeracaUpIcon from "@material-ui/icons/ExpandLess";
import NeracaDownIcon from "@material-ui/icons/ExpandMore";
import Box from "@material-ui/core/Box";
import { DateTime } from "luxon";
import Grid from "@material-ui/core/Grid";
import { harga } from "./../../json/harga";
import { ntp } from "./../../json/ntp";

// format number
const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export default function SectionOne({ chart }) {
  const [topBongkarVolumeData, setTopBongkarVolumeData] = useState(null);
  const [topMuatVolumeData, setTopMuatVolumeData] = useState(null);
  const [surplus, setSurplus] = useState(null);
  const [indexTerima, setIndexTerima] = useState([]);
  const [indexBayar, setIndexBayar] = useState([]);
  const [indexNTP, setIndexNTP] = useState([]);
  const [dataHarga, setDataHarga] = useState({});

  useEffect(() => {
    bongkar(chart);
    muat(chart);
    parseNTP(ntp);
    parseHarga(harga);
  }, [chart]);

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
      setSurplus(numberWithCommas(Number(bongkar - muat)));
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
    const indexTerima = ntp.map((item) => {
      return item.indexTerima;
    });

    const indexBayar = ntp.map((item) => {
      return item.indexBayar;
    });

    const indexNTP = ntp.map((item) => {
      return item.ntp;
    });

    setIndexTerima(indexTerima);
    setIndexBayar(indexBayar);
    setIndexNTP(indexNTP);
  };

  const parseHarga = (data) => {
    // parse labels by comodities
    const labels = [];
    const dataOktober = [];
    const dataNopember = [];

    // parse by month oktober
    const parse = data.map((item) => {
      if (item.bulan == 10) {
        labels.push(`${item.komoditas} (${item.satuan})`);
        dataOktober.push(item.harga);
      } else {
        dataNopember.push(item.harga);
      }
    });

    // set state
    setDataHarga({
      labels,
      dataOktober,
      dataNopember,
    });
  };

  return (
    <Grid container item direction="row" xs={12} spacing={4}>
      <Grid item xs={12} md={8} lg={9}>
        <h2>Transaksi Keluar dan Masuk Per Bulanan</h2>
        <Box borderRadius={4} boxShadow={3}>
          <LineGraph
            data={[
              {
                label: "keluar",
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
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <h2>Neraca Surplus Pedagangan Bulan Ini</h2>
        <Box
          borderRadius={4}
          width={1}
          boxShadow={3}
          style={{ padding: "20px" }}
        >
          <h1
            align="center"
            className="neraca-surplus"
            style={surplus < 0 ? { color: "#FE7979" } : { color: "#009688" }}
          >
            {surplus < 0 ? (
              <NeracaDownIcon style={{ fontSize: "30px", color: "#FE7979" }} />
            ) : (
              <NeracaUpIcon style={{ fontSize: "30px", color: "#009688" }} />
            )}
            {surplus} m<sup>3</sup>
          </h1>
          <div>
            <br />
            <ul
              style={{ display: "flex", justifyContent: "center", padding: 0 }}
            >
              <li style={{ marginRight: "1em" }}>
                <NeracaUpIcon style={{ fontSize: "30px", color: "#009688" }} />
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

      <Grid container item direction="row" xs={12} spacing={4}>
        <Grid item xs={12} lg={6}>
          <h2>Data Nilai Tukar Petani</h2>
          <Box
            borderRadius={4}
            width={1}
            boxShadow={3}
            style={{ padding: "20px" }}
          >
            <LineGraph
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
            />
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <h2>Data Harga Komoditas</h2>
          <Box
            borderRadius={4}
            width={1}
            boxShadow={3}
            style={{ padding: "20px" }}
          >
            <BarGraph
              labels={dataHarga.labels}
              datasets={[
                {
                  label: "Oktober",
                  backgroundColor: "#FE7979",
                  data: dataHarga.dataOktober,
                },
                {
                  label: "Nopember",
                  backgroundColor: "#009688",
                  data: dataHarga.dataNopember,
                },
              ]}
            />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}
