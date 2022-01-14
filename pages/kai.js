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
        .get(`${host}api/v1/kai`)
        .then((res) => {
          // console.log(res);
          setData(res.data.data);
          setLoading(false);
          setError(false);
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
          <h1>Keretea Api Indonesia</h1>
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
                  field: "tgl",
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
                { title: "STN Asal", field: "stasiun_asal" },
                { title: "STN Tujuan", field: "stasiun_tujuan" },
                { title: "Komoditas", field: "komoditas" },
                { title: "Berat", field: "berat" },
                { title: "Satuan", field: "satuan" },
              ]}
              data={data}
              title="KAI"
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
