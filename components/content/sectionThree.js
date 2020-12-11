import React, { useEffect, useState } from "react";
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import LineGraph from '../linegraph';
import NeracaIcon from '@material-ui/icons/Eject';
import { DateTime } from "luxon";
import MaterialTable from "material-table";
// material ui
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import MapChart from "../mapchart";
  
export default function SectionThree({ data }) {  
  const [bongkar, setBongkar] = useState(null);
  const [muat, setMuat] = useState(null);
  useEffect(() => {
    masuk(data);          
    keluar(data);          
  }, [data]);

  const masuk = (data) => {
    let total = 0;
    data.forEach((item, index) => {
      if(item.JENIS === "BONGKAR"){
        item.SATUAN === "TON" ? (total += parseInt(item.VOLUME) * 1000) : (total += parseInt(item.VOLUME));
       }
    });

    setBongkar(total);
  };

  const keluar = (data) => {
    let total = 0;
    data.forEach((item, index) => {
      if(item.JENIS === "MUAT"){
        item.SATUAN === "TON" ? (total += parseInt(item.VOLUME) * 1000) : (total += parseInt(item.VOLUME));
       }
    });

    setMuat(total);
  };

  return (
    <Grid container item direction="row" xs={12} spacing={4}>
      <Grid item lg={12}>
        <h2 align="center" color="primary">
            Perdagangan Masuk / Keluar
        </h2>
      </Grid>

      <Grid item xs={12} md={6} lg={6}>  
        <h2 align="center" color="primary">
            Masuk
        </h2>
        <MapChart title={"Masuk"} data={bongkar}/>                                   
      </Grid> 

      <Grid item xs={12} md={6} lg={6}>  
        <h2 align="center" color="primary">
            Keluar
        </h2>        
        <MapChart title={"Keluar"} data={muat}/>                                   
      </Grid>              
    </Grid>      
  );
}
