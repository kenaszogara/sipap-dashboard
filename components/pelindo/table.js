import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { DateTime } from "luxon";
import Grid from "@material-ui/core/Grid";

export default function Table({ data }) {
  const [topBongkarVolumeData, setTopBongkarVolumeData] = useState(null);
  const [topBongkarVolumeDataKhusus, setTopBongkarVolumeDataKhusu] = useState(null);
  const [topMuatVolumeData, setTopMuatVolumeData] = useState(null);
  const [topMuatVolumeDataKhusus, setTopMuatVolumeDataKhusu] = useState(null);

  useEffect(() => {
    categorizeDataByJenis(data);
    // eslint-disable-next-line
  }, [data]);

  const komoditasKhusus = [
    "beras",
    "kedelai",
    "gula",
    "cabe",
    "bawang",
    "ikan",
    "ayam",
    "sapi",
    "terigu",
    "ikan",
    "telur"
  ];

  // categorized data
  const categorizeDataByJenis = (data) => {
    const totalBongkar = data.filter((item, index) => {
      return item.JENIS === "BONGKAR";
    });
    const totalMuat = data.filter((item, index) => {
      return item.JENIS === "MUAT";
    });
    
    let totalBongkarKhusus = [];
    let totalMuatKhusus = [];

    komoditasKhusus.forEach((row) => {
       let dataTempBongkar = data.filter((item, index) => {
        return item.JENIS === "BONGKAR" && item.KOMODITAS.toLowerCase().includes(row);
      });
      
      totalBongkarKhusus = [...totalBongkarKhusus, ...dataTempBongkar];

      let dataTempMuat = data.filter((item, index) => {
        return item.JENIS === "MUAT"  && item.KOMODITAS.toLowerCase().includes(row);
      });

      totalMuatKhusus = [...totalMuatKhusus, ...dataTempMuat];
    })

    setTopBongkarVolumeData(parseVolumeData(totalBongkar));
    setTopMuatVolumeData(parseVolumeData(totalMuat));

    setTopBongkarVolumeDataKhusu(parseVolumeData(totalBongkarKhusus));
    setTopMuatVolumeDataKhusu(parseVolumeData(totalMuatKhusus));
  };

  // parse volume data
  const parseVolumeData = (data) => {
    const tempData = {};
    let volume = 0;
    data.forEach((item, index) => {
      if (!tempData.hasOwnProperty(item.KOMODITAS)) {
        item.SATUAN === "TON"
          ? (volume += parseInt(item.VOLUME) * 1000)
          : (volume += parseInt(item.VOLUME));

        tempData[item.KOMODITAS] = volume;
      } else {
        item.SATUAN === "TON"
          ? (volume += parseInt(item.VOLUME) * 1000)
          : (volume += parseInt(item.VOLUME));

        tempData[item.KOMODITAS] = volume;
      }
    });

    // sort data by volume
    const sortedTempData = Object.fromEntries(
      Object.entries(tempData).sort(([, a], [, b]) => b - a)
    );

    const top = 10;
    const list = Object.entries(sortedTempData)
      .slice(0, top)
      .map(([key, value], index) => ({
        no: index + 1,
        name: key,
        volume: value,
      }));

    // console.log(list);
    return list;
  };

  return (
    <Grid container item spacing={4}>
      <Grid item xs={12} md={6} id="bongkar">
        <MaterialTable
          columns={[
            {
              title: "No.",
              field: "no",
              cellStyle: {
                width: 1,
                maxWidth: 1,
              },
              headerStyle: {
                width: 1,
                maxWidth: 1,
              },
            },
            { title: "Jenis Komoditas", field: "name" },
            {
              title: "Jumlah (kg)",
              field: "volume",
              type: "numeric",
              render: (RowData) =>
                new Intl.NumberFormat("id-ID").format(parseInt(RowData.volume)),
            },
          ]}
          data={topBongkarVolumeData}
          title="Bongkar"
          options={{
            search: false,
          }}
        />
      </Grid>

      <Grid item xs={12} md={6} id="muat">
        <MaterialTable
          columns={[
            {
              title: "No.",
              field: "no",
              cellStyle: {
                width: 1,
                maxWidth: 1,
              },
              headerStyle: {
                width: 1,
                maxWidth: 1,
              },
            },
            { title: "Jenis", field: "name" },
            {
              title: "Jumlah (kg)",
              field: "volume",
              type: "numeric",
              render: (RowData) =>
                new Intl.NumberFormat("id-ID").format(parseInt(RowData.volume)),
            },
          ]}
          data={topMuatVolumeData}
          title="Muat"
          options={{
            search: false,
          }}
        />
      </Grid>

      <Grid item xs={12} md={12} id="transaksi">
        <MaterialTable
          columns={[
            {
              title: "Tgl. Transaksi",
              field: "TGL_TRANSAKSI",
              type: "date",
              dateSetting: {
                locale: "id",
              },
            },
            {
              title: "Jenis",
              field: "JENIS",
            },
            { title: "Komoditas", field: "KOMODITAS" },
            {
              title: "Volume",
              field: "VOLUME",
              type: "numeric",
              render: (RowData) =>
                new Intl.NumberFormat("id-ID").format(parseInt(RowData.VOLUME)),
            },
            {
              title: "Satuan",
              field: "SATUAN",
            },
            {
              title: "Pelabuhan Muat",
              field: "PROV_MUAT.nama",
            },
            {
              title: "Pelabuhan Bongkar",
              field: "PROV_BONGKAR.nama",
            },
          ]}
          data={data}
          title="Data Pelindo III"
          options={{
            pageSize: 10,
            pageSizeOptions: [10, 20, 50, 100],
          }}
        />
      </Grid>

      <Grid item xs={12} md={6} id="bongkarKhusus">
        <MaterialTable
          columns={[
            {
              title: "No.",
              field: "no",
              cellStyle: {
                width: 1,
                maxWidth: 1,
              },
              headerStyle: {
                width: 1,
                maxWidth: 1,
              },
            },
            { title: "Jenis Komoditas", field: "name" },
            {
              title: "Jumlah (kg)",
              field: "volume",
              type: "numeric",
              render: (RowData) =>
                new Intl.NumberFormat("id-ID").format(parseInt(RowData.volume)),
            },
          ]}
          data={topBongkarVolumeDataKhusus}
          title="Bongkar Khusus"
          options={{
            search: false,
          }}
        />
      </Grid>

      <Grid item xs={12} md={6} id="muatKhusus">
        <MaterialTable
          columns={[
            {
              title: "No.",
              field: "no",
              cellStyle: {
                width: 1,
                maxWidth: 1,
              },
              headerStyle: {
                width: 1,
                maxWidth: 1,
              },
            },
            { title: "Jenis", field: "name" },
            {
              title: "Jumlah (kg)",
              field: "volume",
              type: "numeric",
              render: (RowData) =>
                new Intl.NumberFormat("id-ID").format(parseInt(RowData.volume)),
            },
          ]}
          data={topMuatVolumeDataKhusus}
          title="Muat Khusus"
          options={{
            search: false,
          }}
        />
      </Grid>
    </Grid>
  );
}
