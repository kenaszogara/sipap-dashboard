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

import SectionOne from "./../components/content/sectionOne";
import SectionTwo from "./../components/content/sectionTwo";
import SectionThree from "./../components/content/sectionThree";
import SectionFour from "./../components/content/sectionFour";
import Table from "./../components/pelindo/table";
import MaterialTable from "material-table";

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
  const [dataJembatan, setDataJembatan] = useState(null);
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

  return (
    <div>
      <AppBar position="static">
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
            variant="contained"
            color="secondary"
            style={{ marginLeft: "auto" }}
            onClick={() =>
              (window.location.href = "http://159.65.2.14/sipap/login")
            }
          >
            Manage
          </Button>
        </Toolbar>
      </AppBar>

      {/* loading animation */}
      {loading && (
        <Grid container>
          <Grid item className={classes.linearProgress} xs={12}>
            <LinearProgress color="secondary" />
          </Grid>
        </Grid>
      )}

      {data && dataJembatan && (
        <div
          style={{ marginLeft: "4em", marginRight: "4em", marginTop: "1.3em" }}
        >
          <Grid container item xs={12} spacing={4}>
            <Grid item xs={10} style={{ margin: "auto" }}>
              <Image
                src="/../public/dashboard.png"
                alt="Dashboard Image"
                width={500}
                height={250}
                layout="responsive"
                loading="lazy"
                className="hero-image"
              />
            </Grid>

            <SectionOne chart={data} surplus={neracaSurplus} />

            <SectionTwo dataBapok={dataKomoditas} />

            <SectionFour dataBapok={dataKomoditas} />

            {/* Pelindo III Data Table */}
            <Table data={data} />

            <SectionThree data={data} />

            <Grid item xs={12}>
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
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
}
