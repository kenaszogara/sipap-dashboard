import React, { useEffect, useState } from "react";
import LineGraph from "../linegraph";
import NeracaUpIcon from "@material-ui/icons/ExpandLess";
import NeracaDownIcon from "@material-ui/icons/ExpandMore";
import Box from "@material-ui/core/Box";
import { DateTime } from "luxon";
import Grid from "@material-ui/core/Grid";

export default function SectionOne({ chart, surplus }) {
  const [topBongkarVolumeData, setTopBongkarVolumeData] = useState(null);
  const [topMuatVolumeData, setTopMuatVolumeData] = useState(null);

  useEffect(() => {
    bongkar(chart);
    muat(chart);
  }, [chart]);

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

  return (
    <Grid container item direction="row" xs={12} spacing={4}>
      <Grid item xs={12} md={8} lg={9}>
        <h2>Transaksi Keluar dan Masuk Per Bulanan</h2>
        <Box borderRadius={4} boxShadow={3}>
          <LineGraph
            dataBongkar={topBongkarVolumeData}
            dataMuat={topMuatVolumeData}
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
          <h2 align="center">
            {surplus < 0 ? (
              <NeracaDownIcon style={{ fontSize: "30px", color: "#7bd47b" }} />
            ) : (
              <NeracaUpIcon style={{ fontSize: "30px", color: "#7bd47b" }} />
            )}
            {surplus}
          </h2>
        </Box>
      </Grid>
    </Grid>
  );
}
