import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import MaterialTable from "material-table";

import MapChart from "../mapchart";

const transposObjToArr = (obj, arr) => {
  // transpose object to array
  for (const [key, value] of Object.entries(obj)) {
    const temp = [key, value];
    arr.push(temp);
  }
};

export default function SectionThree({ data }) {
  const [bongkar, setBongkar] = useState(null);
  const [muat, setMuat] = useState(null);
  useEffect(() => {
    masuk(data);
    keluar(data);
  }, [data]);

  const masuk = (data) => {
    const geoData = {};
    const geoProv = {};
    const geoTable = [];
    const geoMap = [];
    let provinsi = "";
    let hc_key = "";
    let total = 0;

    data.forEach((item) => {
      if (item.JENIS === "BONGKAR") {
        if (
          Object.keys(item.PROV_MUAT).length !== 0 &&
          item.PROV_MUAT.constructor === Object
        ) {
          if (provinsi != item.PROV_MUAT.nama) {
            hc_key = item.PROV_MUAT.hc_key;
            provinsi = item.PROV_MUAT.nama;

            if (geoData.hasOwnProperty(hc_key)) {
              total = geoData[hc_key];
            } else {
              total = 0;
            }
          }

          item.SATUAN === "TON"
            ? (total += parseInt(item.VOLUME) * 1000)
            : (total += parseInt(item.VOLUME));

          geoData[hc_key] = total;
          geoProv[provinsi] = total;
        }
      }
    });

    // transpose geoData to geoMap
    transposObjToArr(geoData, geoMap);

    // tranpose geoProv to geoTable
    for (const [key, value] of Object.entries(geoProv)) {
      geoTable.push({
        provinsi: key,
        volume: value,
        satuan: "TON",
      });
    }

    // console.log(geoArr);
    // console.log(geoTable);
    setBongkar({ map: geoMap, table: geoTable });
  };

  const keluar = (data) => {
    const geoData = {};
    const geoProv = {};
    const geoTable = [];
    const geoMap = [];
    let provinsi = "";
    let hc_key = "";
    let total = 0;

    data.forEach((item) => {
      if (item.JENIS === "MUAT") {
        if (
          Object.keys(item.PROV_BONGKAR).length !== 0 &&
          item.PROV_BONGKAR.constructor === Object
        ) {
          if (provinsi != item.PROV_BONGKAR.nama) {
            hc_key = item.PROV_BONGKAR.hc_key;
            provinsi = item.PROV_BONGKAR.nama;

            if (geoData.hasOwnProperty(hc_key)) {
              total = geoData[hc_key];
            } else {
              total = 0;
            }
          }

          item.SATUAN === "TON"
            ? (total += parseInt(item.VOLUME) * 1000)
            : (total += parseInt(item.VOLUME));

          geoData[hc_key] = total;
          geoProv[provinsi] = total;
        }
      }
    });

    // transpose geoData to geoMap
    transposObjToArr(geoData, geoMap);

    // tranpose geoProv to geoTable
    for (const [key, value] of Object.entries(geoProv)) {
      geoTable.push({
        provinsi: key,
        volume: value,
        satuan: "TON",
      });
    }

    // console.log(geoMap);
    // console.log(geoTable);
    setMuat({ map: geoMap, table: geoTable });
  };

  return (
    <Grid container item direction="row" xs={12} spacing={4}>
      <Grid item xs={12} md={6} lg={6}>
        {bongkar && (
          <Box borderRadius={16} boxShadow={3}>
            <MapChart title={"Masuk"} data={bongkar.map} />
            <MaterialTable
              columns={[
                { title: "Provinsi", field: "provinsi" },
                {
                  title: "Volume",
                  field: "volume",
                  type: "numeric",
                  render: (RowData) =>
                    new Intl.NumberFormat("id-ID").format(
                      parseInt(RowData.volume)
                    ),
                },
                { title: "Satuan", field: "satuan" },
              ]}
              data={bongkar.table}
              title=""
            />
          </Box>
        )}
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        {muat && (
          <Box borderRadius={16} boxShadow={3}>
            <MapChart title={"Keluar"} data={muat.map} />
            <MaterialTable
              columns={[
                { title: "Provinsi", field: "provinsi" },
                {
                  title: "Volume",
                  field: "volume",
                  type: "numeric",
                  render: (RowData) =>
                    new Intl.NumberFormat("id-ID").format(
                      parseInt(RowData.volume)
                    ),
                },
                { title: "Satuan", field: "satuan" },
              ]}
              data={muat.table}
              title=""
            />
          </Box>
        )}
      </Grid>
    </Grid>
  );
}
