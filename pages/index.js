import React, { useEffect, useState } from "react";
import axios from "axios";
import getConfig from "next/config";
import Image from "next/image";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import MaterialTable from "material-table";

import SectionOne from "./../components/content/sectionOne";
import SectionTwo from "./../components/content/sectionTwo";
import SectionThree from "./../components/content/sectionThree";
import SectionFour from "./../components/content/sectionFour";
import Table from "./../components/pelindo/table";

// import dataKomoditas from "./../json/data";

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
  const [dataKomoditas, setDataKomoditas] = useState(null);
  const [dataHargaPpjNtp, setDataHargaPpjNtp] = useState(null);
  const [dataJembatan, setDataJembatan] = useState(null);
  const [dataKai, setDataKai] = useState(null);
  const [dataPrognosa, setDataPrognosa] = useState(null);
  const [dataTdpud, setDataTdpud] = useState(null);
  const [neracaSurplus, setSurplus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (neracaSurplus == null && dataKomoditas != null) {
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
  }, [neracaSurplus, dataKomoditas]);

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

  // fetch data from api
  useEffect(() => {
    if (dataKomoditas == null) {
      setLoading(true);
      const host = publicRuntimeConfig.API_URL || "http://localhost:5000/";
      axios
        .get(`${host}api/v1/bapok`)
        .then((res) => {
          console.log(res);
          setDataKomoditas(res.data.data);
          setLoading(false);
          setError(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setError(true);
        });
    }
  }, [dataKomoditas]);

  // fetch data from api
  useEffect(() => {
    if (dataHargaPpjNtp == null) {
      setLoading(true);
      const host = publicRuntimeConfig.API_URL || "http://localhost:5000/";
      const harga = axios.get(`${host}api/v1/bapok`);
      const ppj = axios.get(`${host}api/v1/ppj`);
      const ntp = axios.get(`${host}api/v1/ntp`);

      axios
        .all([harga, ppj, ntp])
        .then((res) => {
          console.log(res);
          setDataHargaPpjNtp({
            harga: res[0].data.data,
            ppj: res[1].data.data,
            ntp: res[2].data.data,
          });
          setLoading(false);
          setError(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setError(true);
        });
    }
  }, [dataHargaPpjNtp]);

  // fetch data from api
  useEffect(() => {
    if (dataJembatan == null) {
      setLoading(true);
      const host = publicRuntimeConfig.API_URL || "http://localhost:5000/";
      axios
        .get(`${host}api/v1/jembatanTimbang`)
        .then((res) => {
          console.log(res);
          setDataJembatan(res.data.data);
          setLoading(false);
          setError(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setError(true);
        });
    }
  }, [dataJembatan]);

  // fetch data from api
  useEffect(() => {
    if (dataKai == null) {
      setLoading(true);
      const host = publicRuntimeConfig.API_URL || "http://localhost:5000/";
      axios
        .get(`${host}api/v1/kai`)
        .then((res) => {
          // console.log(res);
          setDataKai(res.data.data);
          setLoading(false);
          setError(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setError(true);
        });
    }
  }, [dataKai]);

  useEffect(() => {
    if (dataPrognosa == null) {
      setLoading(true);
      const host = publicRuntimeConfig.API_URL || "http://localhost:5000/";
      axios
        .get(`${host}api/v1/prognosa`)
        .then((res) => {
          // console.log(res);
          setDataPrognosa(res.data.data);
          setLoading(false);
          setError(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setError(true);
        });
    }
  }, [dataPrognosa]);

  useEffect(() => {
    if (dataTdpud == null) {
      setLoading(true);
      const host = publicRuntimeConfig.API_URL || "http://localhost:5000/";
      axios
        .get(`${host}api/v1/tdpud`)
        .then((res) => {
          // console.log(res);
          setDataTdpud(res.data.data);
          setLoading(false);
          setError(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setError(true);
        });
    }
  }, [dataTdpud]);

  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: "#DC3545" }}>
        <Toolbar>
          <Typography variant="h5">SIPAP</Typography>
          <Button
            style={{ marginLeft: "4em", color: "#f5f5f5" }}
            onClick={() => {
              router.push("/pelindo");
            }}
          >
            Pelindo
          </Button>
          <Button
            style={{ marginLeft: "1em", color: "#f5f5f5" }}
            onClick={() => {
              router.push("/jembatan");
            }}
          >
            Jembatan Timbang
          </Button>
          <Button
            style={{ marginLeft: "1em", color: "#f5f5f5" }}
            onClick={() => {
              router.push("/kai");
            }}
          >
            Kereta Api Indonesia
          </Button>
          <Button
            style={{ marginLeft: "1em", color: "#f5f5f5" }}
            onClick={() => {
              router.push("#bigData");
            }}
          >
            Big Data Analysis
          </Button>
          <Button
            style={{ marginLeft: "1em", color: "#f5f5f5" }}
            onClick={() => {
              router.push("/ews");
            }}
          >
            Early Warning System
          </Button>
          <Button
            style={{ marginLeft: "1em", color: "#f5f5f5" }}
            onClick={() =>
              (window.location.href = "https://ews.kemendag.go.id/")
            }
          >
            SP2KP
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ marginLeft: "auto" }}
            onClick={() =>
              (window.location.href = "http://18.140.74.118/sipap/login")
            }
          >
            Integrasi Aplikasi
          </Button>
        </Toolbar>
      </AppBar>

      {/* loading animation */}
      {!data && (
        <Grid container>
          <Grid item className={classes.linearProgress} xs={12}>
            <LinearProgress color="primary" />
          </Grid>
        </Grid>
      )}

      <div
        style={{ marginLeft: "4em", marginRight: "4em", marginTop: "1.3em" }}
      >
        <Grid container item xs={12} spacing={4}>
          <Grid item xs={10} style={{ margin: "auto" }}>
            <Image
              src="http://159.65.2.14/sipap/images/dashboard.png"
              alt="Dashboard Image"
              width={500}
              height={250}
              layout="responsive"
              className="hero-image"
              loading="lazy"
            />
          </Grid>

          {data && neracaSurplus && dataKomoditas && (
            <>
              <SectionOne chart={data} data={dataHargaPpjNtp} />

              <h2 style={{ paddingLeft: "0.8em" }}>Geo Tagging</h2>
              <SectionThree data={data} />

              <h2 style={{ paddingLeft: "0.8em" }}>Neraca Komoditas</h2>
              <SectionTwo dataBapok={dataKomoditas} />

              <h2 style={{ paddingLeft: "0.8em" }}>Data Konsumsi</h2>
              <SectionFour dataBapok={dataKomoditas} />

              {/* Pelindo III Data Table */}
              <h2 style={{ paddingLeft: "0.8em" }}>Data Export / Import</h2>
              <Table data={data} />

              <Grid item xs={12} id="bigData">
                <h2>Data Produksi</h2>
                {dataPrognosa && (
                  <MaterialTable
                    columns={[
                      { title: "Kabupaten", field: "kabupaten" },
                      { title: "Komoditas", field: "komoditas" },
                      { title: "Jan", field: "januari" },
                      { title: "Feb", field: "febuari" },
                      { title: "Mar", field: "maret" },
                      { title: "Apr", field: "april" },
                      { title: "Mei", field: "mei" },
                      { title: "Jun", field: "juni" },
                      { title: "Jul", field: "juli" },
                      { title: "Agust", field: "agustus" },
                      { title: "Sep", field: "september" },
                      { title: "Okt", field: "oktober" },
                      { title: "Nov", field: "november" },
                    ]}
                    data={dataPrognosa}
                    options={{
                      pageSize: 10,
                      pageSizeOptions: [10, 20, 30, 50, 100],
                    }}
                  />
                )}
              </Grid>
              <Grid item xs={12}>
                <h2>
                  Data Pelaku Usaha Terintegrasi dengan System Perijinan
                  Nasional atau Daerah
                </h2>
                {dataTdpud && (
                  <MaterialTable
                    columns={[
                      { title: "Tgl Izin", field: "tgl_izin", type: "date" },
                      { title: "Tgl Exp.", field: "tgl_exp", type: "date" },
                      { title: "Izin", field: "jenis_izin" },
                      { title: "PT/CV", field: "bentuk_usaha" },
                      { title: "Nama", field: "nama_usaha" },
                      { title: "Kab.", field: "kabupaten" },
                      { title: "Komoditas", field: "komoditas" },
                    ]}
                    data={dataTdpud}
                    title="TDPUD"
                    options={{
                      pageSize: 10,
                      pageSizeOptions: [10, 20, 30, 50, 100],
                    }}
                  />
                )}
              </Grid>
              <Grid item xs={12}>
                {dataJembatan && (
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
                    data={dataJembatan}
                    title="Jembatan Timbang"
                    options={{
                      pageSize: 10,
                      pageSizeOptions: [10, 20, 30, 50, 100],
                    }}
                  />
                )}
              </Grid>
              <Grid item xs={12}>
                {dataKai && (
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
                    data={dataKai}
                    title="KAI"
                    options={{
                      pageSize: 10,
                      pageSizeOptions: [10, 20, 30, 50, 100],
                    }}
                  />
                )}
              </Grid>
            </>
          )}
        </Grid>
      </div>
    </div>
  );
}
