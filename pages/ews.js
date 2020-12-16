import React, { useEffect, useState } from "react";
import axios from "axios";
import getConfig from "next/config";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";

import SectionTwo from "./../components/content/sectionTwo";
import SectionFour from "./../components/content/sectionFour";
import MaterialTable from "material-table";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import InfoIcon from "@material-ui/icons/Info";

import dataKomoditas from "./../json/data";

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

export default function Home() {
  const classes = useStyles();
  const router = useRouter();

  const [data, setData] = useState(null);
  const [dataInflasi, setDataInflasi] = useState(null);
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

  useEffect(() => {
    if (dataInflasi == null) {
      setLoading(true);
      const host = publicRuntimeConfig.API_URL || "http://localhost:5000/";
      axios
        .get(`${host}api/v1/inflasi`)
        .then((res) => {
          // console.log(res);
          setDataInflasi(res.data.data);
          setLoading(false);
          setError(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setError(true);
        });
    }
  }, [dataInflasi]);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={() => router.push("/")}>
            <ArrowBackIcon style={{ color: "white" }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* loading animation */}
      {loading && !data && (
        <Grid container>
          <Grid item className={classes.linearProgress} xs={12}>
            <LinearProgress color="secondary" />
          </Grid>
        </Grid>
      )}

      {data && (
        <div
          style={{ marginLeft: "4em", marginRight: "4em", marginTop: "4em" }}
        >
          <Grid container item xs={12} spacing={4}>
            <Box
              borderRadius={4}
              width={1}
              boxShadow={3}
              style={{ padding: "20px", display: "flex", alignItems: "center" }}
            >
              <span style={{ marginRight: "0.5em", color: "#009688" }}>
                <InfoIcon />
              </span>
              <span style={{ color: "#009688" }}>
                Info: Kondisi surplus perdagangan. Semua Aman.
              </span>
            </Box>

            <Grid item xs={12}>
              <h2>Data Inflasi</h2>
              {dataInflasi && (
                <MaterialTable
                  columns={[
                    { title: "Tahun", field: "tahun" },
                    { title: "Jan", field: "jan" },
                    { title: "Feb", field: "feb" },
                    { title: "Mar", field: "mar" },
                    { title: "Apr", field: "apr" },
                    { title: "Mei", field: "mei" },
                    { title: "Jun", field: "jun" },
                    { title: "Jul", field: "jul" },
                    { title: "Agust", field: "agust" },
                    { title: "Sep", field: "sep" },
                    { title: "Okt", field: "okt" },
                    { title: "Nov", field: "nov" },
                    { title: "Des", field: "des" },
                  ]}
                  data={dataInflasi}
                  options={{
                    pageSize: 5,
                    pageSizeOptions: [5, 10, 20, 30, 50, 100],
                  }}
                />
              )}
            </Grid>

            <SectionTwo dataBapok={dataKomoditas} />

            <SectionFour dataBapok={dataKomoditas} />
          </Grid>
        </div>
      )}
    </div>
  );
}
