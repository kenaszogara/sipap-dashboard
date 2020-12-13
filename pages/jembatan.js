import React, { useEffect, useState } from "react";
import axios from "axios";
import getConfig from "next/config";
import { useRouter } from "next/router";
// material ui
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import MaterialTable from "material-table";

const { publicRuntimeConfig } = getConfig();

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

export default function Jembatan() {
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
        .get(`${host}api/v1/jembatanTimbang`)
        .then((res) => {
          console.log(res);
          setData(res.data.data);
          setLoading(false);
          setError(false);
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
          <h1>Jembatang Timbang</h1>
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
          <Grid container item xs={10} spacing={4}>
            <MaterialTable
              columns={[
                {
                  title: "Tgl",
                  field: "tanggal_str",
                  type: "date",
                  cellStyle: {
                    width: 1,
                    maxWidth: 1,
                  },
                  headerStyle: {
                    width: 1,
                    maxWidth: 1,
                  },
                },
                { title: "Muatan", field: "muatan" },
                { title: "Berat Kosong", field: "berat_kosong" },
                { title: "JBI", field: "jbi" },
                { title: "Kelebihan Muatan", field: "kelebihan_muatan" },
              ]}
              data={data}
              title="Jembatan Timbang"
              options={{
                pageSize: 10,
                pageSizeOptions: [10, 20, 30, 50, 100],
              }}
            />
          </Grid>
        )}
      </Grid>
    </div>
  );
}
