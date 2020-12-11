import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

import MapChart from "../mapchart";

export default function SectionThree({ data }) {
  const [bongkar, setBongkar] = useState(null);
  const [muat, setMuat] = useState(null);
  useEffect(() => {
    masuk(data);
    keluar(data);
  }, [data]);

  const masuk = (data) => {
    let total = 0;
    data.forEach((item, index) => {
      if (item.JENIS === "BONGKAR") {
        item.SATUAN === "TON"
          ? (total += parseInt(item.VOLUME) * 1000)
          : (total += parseInt(item.VOLUME));
      }
    });

    setBongkar(total);
  };

  const keluar = (data) => {
    let total = 0;
    data.forEach((item, index) => {
      if (item.JENIS === "MUAT") {
        item.SATUAN === "TON"
          ? (total += parseInt(item.VOLUME) * 1000)
          : (total += parseInt(item.VOLUME));
      }
    });

    setMuat(total);
  };

  return (
    <Grid container item direction="row" xs={12} spacing={4}>
      <Grid item xs={12} md={6} lg={6}>
        <Box borderRadius={16} boxShadow={3}>
          <MapChart title={"Masuk"} data={bongkar} />
        </Box>
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Box borderRadius={16} boxShadow={3}>
          <MapChart title={"Keluar"} data={muat} />
        </Box>
      </Grid>
    </Grid>
  );
}
