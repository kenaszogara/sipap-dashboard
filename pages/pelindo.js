import React, { useEffect, useState } from "react";
import axios from "axios";
import getConfig from "next/config";
import { useRouter } from "next/router";
// material ui
import {
  makeStyles,
  createTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import Header from "../components/pelindo/header";
import Chart from "../components/pelindo/chart";
import Table from "../components/pelindo/table";

const { publicRuntimeConfig } = getConfig();

// material ui theme
const theme = createTheme({});

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

export default function Pelindo() {
  const classes = useStyles();

  const router = useRouter();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // fetch data from api
  useEffect(() => {
    if (data == null) {
      setLoading(true);
      const host = publicRuntimeConfig.API_URL || "http://localhost:5000/";
      axios
        .get(`${host}api/v1/pelindo/auth/PP3_USR1`)
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
              // console.log(err);
              setLoading(false);
              setError(true);
            });
        })
        .catch((err) => {
          // console.log(err);
          setLoading(false);
          setError(true);
        });
    }
  }, [data]);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={() => router.push("/")}>
            <ArrowBackIcon style={{ color: "white" }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Grid
        container
        spacing={2}
        style={{ marginLeft: "4em", marginRight: "4em" }}
      >
        <Grid container item spacing={2} alignItems="baseline">
          <h1>Pelindo</h1>
          <span
            style={{
              marginLeft: "1em",
              fontSize: "18px",
              fontWeight: "700",
              color: "gray",
            }}
          >
            2020
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

        {!loading && !error && data && (
          <Grid container spacing={4}>
            {/* Header Data */}
            <Header data={data} />

            {/* Body Data */}
            <Chart data={data} />

            {/* Pelindo III Data Table */}
            <Table data={data} />
          </Grid>
        )}
      </Grid>
    </div>
  );
}
