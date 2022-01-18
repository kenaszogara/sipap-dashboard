import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import BarGraph from "./../bargraph";
import MaterialTable from "material-table";
import PieChart from "./../piechart";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  }
}));

const comodityDataColors = [
  "rgb(242, 199, 110, 0.5)",
  "rgb(189, 157, 234, 0.5)",
  "rgb(234, 113, 134, 0.5)",
  "rgb(122, 119, 185, 0.5)",
  "rgb(0, 150, 136, 0.5)",
  "rgb(3, 155, 229, 0.5)",
  "#ef9a9a",
  "#80cbc4",
  "#a8aa88",
  "#d0d4ed"
];

const barGrahpLebel = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

export default function Chart({ data }) {
  const classes = useStyles();

  const [barData, setBarData] = useState(null);
  const [pieData, setPieData] = useState(null);
  const [pieLabel, setPieLabel] = useState(null);
  const [pieColors, setPieColor] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [dataTrx, setDataTrx] = useState(null);

  useEffect(() => {
    parseBarData(data);
    parsePieData(data);
  }, [data]);

  // parse group data by month for barChart
  const parseBarData = (data) => {
    const barData = [];
    let count = 0;
    let month = 1;
    data.forEach((item, index) => {
      const date = DateTime.fromISO(item.TGL_TRANSAKSI).month;
      if (date === month) {
        count++;
      } else {
        barData.push(count);
        month++;
        count = 1;
      }

      if (data.length === index + 1) {
        barData.push(count);
      }
    });

    setBarData(barData);
  };

  // parse data by komoditas for pieChart
  const parsePieData = (data) => {
    const comodityData = {};
    const comodityLebel = [];
    const comodityValue = [];
    let pieColor = [];
    let countComodity = 0;
    
    data.forEach((item, index) => {
      comodityLebel.push(item.KOMODITAS)
      pieColor.push(comodityDataColors[index] ?? "#d4d4d4");
    });
    
    data.forEach((item, index, arr) => {
        let data = arr.filter((row) => {
          return row.KOMODITAS == item.KOMODITAS;
        });

      comodityData[item.KOMODITAS] = data.length;
    });
    
    const sortedComodityData = Object.fromEntries(
      Object.entries(comodityData).sort(([, a], [, b]) => b - a)
    );

    setPieLabel(Object.keys(sortedComodityData));
    setPieData(Object.values(sortedComodityData));
    setPieColor(pieColor);
  };

  function openData(param) {
    let filteredData = []
    if(param.month){
      let month =
        barGrahpLebel.findIndex((row) => {
          return row == param.month;
        }) + 1;

        filteredData = data.filter((row) => {
        return DateTime.fromISO(row.TGL_TRANSAKSI).month == month;
      });
    }
    if(param.komoditas){
      filteredData = data.filter((row) => {
        return row.KOMODITAS == param.komoditas;
      });
    }
    
    setDataTrx(filteredData);
    setOpenModal(true);
  }

  return (
    <>
      <Dialog
        fullScreen
        open={openModal}
        onClose={() => setOpenModal(!openModal)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{""}</DialogTitle>
        <DialogContent>
          <MaterialTable
            data={dataTrx}
            title={
              "Data Detil Transaksi Pelindo"
            }
            columns={[
              {
                title: "Tgl. Transaksi",
                field: "TGL_TRANSAKSI",
                type: "date",
                dateSetting: {
                  locale: "id"
                }
              },
              {
                title: "Jenis",
                field: "JENIS"
              },
              { title: "Komoditas", field: "KOMODITAS" },
              {
                title: "Volume",
                field: "VOLUME",
                type: "numeric",
                render: (RowData) =>
                  new Intl.NumberFormat("id-ID").format(
                    parseInt(RowData.VOLUME)
                  )
              },
              {
                title: "Satuan",
                field: "SATUAN"
              },
              {
                title: "Pelabuhan Muat",
                field: "PROV_MUAT.nama"
              },
              {
                title: "Pelabuhan Bongkar",
                field: "PROV_BONGKAR.nama"
              }
            ]}
            options={{
              pageSize: 10,
              pageSizeOptions: [10, 20, 50, 100]
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenModal(!openModal)}
            color="primary"
            autoFocus
          >
            Tutup
          </Button>
        </DialogActions>
      </Dialog>
      <Grid container item direction="row" xs={12} spacing={4}>
        <Grid item xs={12} md={7}>
          <h2>Jumlah Transaksi Perbulan</h2>
          <Paper className={classes.paper}>
            {barData && (
              <BarGraph
                labels={barGrahpLebel}
                datasets={[
                  {
                    lebel: "Transaksi Perbulan",
                    backgroundColor: "rgb(242, 199, 110, 0.5)",
                    data: barData
                  }
                ]}
                openData={openData}
                isClicked={true}
                options={{
                  legend: {
                    display: false
                  }
                }}
              />
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          <h2>Transaksi per Komoditas</h2>
          <Paper className={classes.paper} style={{ padding: "20px" }}>
            {pieLabel && pieData && (
              <PieChart
                labels={pieLabel}
                datasets={pieData}
                backgroundColor={pieColors}
                openData={openData}
                options={{
                  legend: false
                }}
                isClicked={true}
              />
            )}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
