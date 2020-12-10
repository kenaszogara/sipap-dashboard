import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';

import DirectionsBoatIcon from "@material-ui/icons/DirectionsBoat";

const useStyles = makeStyles((theme) => ({
  iconButton: {
    color: "#fafafa",
    margin: "0.3em",
  },
}));

export default function Header({ data }) {
  const classes = useStyles();

  const [headerData, setHeaderData] = useState(null);

  useEffect(() => {
    categorizeDataByJenis(data);
  }, [data]);

  // parse header data
  const categorizeDataByJenis = (data) => {
    const totalData = data.length;
    const totalBongkar = data.filter((item, index) => {
      return item.JENIS === "BONGKAR";
    });
    const totalMuat = data.filter((item, index) => {
      return item.JENIS === "MUAT";
    });

    setHeaderData({
      totalData,
      totalBongkar,
      totalMuat,
    });
  };

  return (
    <Grid container item direction="row" xs={12} spacing={4}>
      <Grid container item alignItems="center" xs={6} md={3} lg={2}>
        <IconButton
          className={classes.iconButton}
          style={{ backgroundColor: "#F2C76E" }}
        >
          <DirectionsBoatIcon />
        </IconButton>
        <div>
          <span style={{ color: "#F2C76E", fontWeight: "500" }}>
            Pelindo III
          </span>
          <Typography>Tanjung Emas</Typography>
        </div>
      </Grid>

      <Grid container item alignItems="center" xs={6} md={3} lg={2}>
        <IconButton
          style={{ backgroundColor: "#039be5" }}
          className={classes.iconButton}
          onClick={() => (window.location.href = "#transaksi")}
        >
          <i className="fas fa-boxes"></i>
        </IconButton>
        <div>
          <span style={{ color: "#039be5", fontWeight: "500" }}>
            Total Transaksi
          </span>
          <Typography>
            {headerData && headerData.totalData.toLocaleString("id-ID")}
          </Typography>
        </div>
      </Grid>

      <Grid container item alignItems="center" xs={6} md={3} lg={2}>
        <IconButton
          style={{ backgroundColor: "#009688" }}
          className={classes.iconButton}
          onClick={() => (window.location.href = "#bongkar")}
        >
          <i className="fas fa-box-open"></i>
        </IconButton>
        <div>
          <span style={{ color: "#009688", fontWeight: "500" }}>
            Jenis Bongkar
          </span>
          <Typography>
            {headerData &&
              headerData.totalBongkar.length.toLocaleString("id-ID")}
          </Typography>
        </div>
      </Grid>

      <Grid container item alignItems="center" xs={6} md={3} lg={2}>
        <IconButton
          style={{ backgroundColor: "#e91e63" }}
          className={classes.iconButton}
          onClick={() => (window.location.href = "#muat")}
        >
          <i className="fas fa-box"></i>
        </IconButton>
        <div>
          <span style={{ color: "#e91e63", fontWeight: "500" }}>
            Jenis Muat
          </span>
          <Typography>
            {headerData && headerData.totalMuat.length.toLocaleString("id-ID")}
          </Typography>
        </div>
      </Grid>
      <Grid container item alignItems="center" xs={6} md={3} lg={2}>      
      </Grid>
      <Grid container item alignItems="center" xs={6} md={3} lg={2}>
        <Button variant="contained" color="primary" href="/manage">
          Manage
        </Button>
      </Grid>

    </Grid>
  );
}
