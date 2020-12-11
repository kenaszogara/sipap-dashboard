import React, { useEffect, useState } from "react";
import axios from "axios";
import getConfig from "next/config";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
// material ui
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";

import SectionOne from "../components/content/sectionOne";
import SectionTwo from "../components/content/sectionTwo";
import SectionThree from "../components/content/sectionThree";
import SectionFour from "../components/content/sectionFour";

import dataKomoditas from "../json/data";

const { publicRuntimeConfig } = getConfig();

// material ui theme
const theme = createMuiTheme({});

// material ui css
const useStyles = makeStyles((theme) => ({
  linearProgress: {
    width: "100%",
    height: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Pelindo() {
  const classes = useStyles();

  const [data, setData] = useState(null);
  const [neracaSurplus, setSurplus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (neracaSurplus == null) {
      let hasilNeracaSurplus = 0;
      const date = new Date();
      const thisMonth = date.getMonth();
      dataKomoditas.map((row) => {
        if (thisMonth === row.bulan) {
          hasilNeracaSurplus =
            hasilNeracaSurplus + row.ketersediaan - row.kebutuhan;
        }
      });
      setSurplus(hasilNeracaSurplus);
    }
  }, [neracaSurplus]);

  useEffect(() => {
    if (data == null) {
      setLoading(true);
      const host = publicRuntimeConfig.API_URL || "http://localhost:5000/";
      axios
        .get(`${host}api/v1/auth/PP3_USR1`)
        .then((res) => {
          const token = res.data.JWT;
          // console.log(token);
          axios
            .get(`${host}api/v1/pelindo/2020/2021`, {
              headers: {
                Authorization: token,
              },
            })
            .then((res) => {
              // console.log(res.data);
              setData(res.data);
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

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5">SIPAP Dashboard</Typography>
        </Toolbar>
      </AppBar>

      {/* loading animation */}
      {loading && (
        <Grid container>
          <Grid item className={classes.linearProgress} xs={12}>
            <LinearProgress />
          </Grid>
        </Grid>
      )}

      {!loading && !error && data && (
        <div
          style={{ marginLeft: "4em", marginRight: "4em", marginTop: "1.3em" }}
        >
          <Grid container spacing={2}>
            <SectionOne chart={data} surplus={neracaSurplus} />

            <SectionTwo dataBapok={dataKomoditas} />

            <SectionThree data={data} />

            <SectionFour dataBapok={dataKomoditas} />
          </Grid>
        </div>
      )}
    </div>
  );
}
