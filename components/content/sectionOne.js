import React, { useEffect, useState } from "react";
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import LineGraph from '../linegraph';
import NeracaUpIcon from '@material-ui/icons/ExpandLess';
import NeracaDownIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box';
import { DateTime } from "luxon";
// material ui
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

export default function SectionOne({chart, surplus}) {
  const [topBongkarVolumeData, setTopBongkarVolumeData] = useState(null);
  const [topMuatVolumeData, setTopMuatVolumeData] = useState(null);

  useEffect(() => {
    bongkar(chart);          
    muat(chart);          
  }, [chart]);

  const month_name = function(dt){
    let mlist = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    return mlist[dt.getMonth()];
  };

  const bongkar = (data) => {
    const bongkar = [];
    let month = 1;
    let total = 0;
    data.forEach((item, index) => {
      if(item.JENIS === "BONGKAR"){
        const date = DateTime.fromISO(item.TGL_TRANSAKSI).month;
        if (date === month) {
            item.SATUAN === "TON" ? (total += parseInt(item.VOLUME) * 1000) : (total += parseInt(item.VOLUME));
        } else {
          bongkar.push(total);
          month++;        
        }
        if (data.length === index + 1) {
          bongkar.push(total);
        }
      }
    });

    setTopBongkarVolumeData(bongkar);
  };

  const muat = (data) => {
    const muat = [];
    let month = 1;
    let total = 0;
    data.forEach((item, index) => {
      if(item.JENIS === "MUAT"){
        const date = DateTime.fromISO(item.TGL_TRANSAKSI).month;
        if (date === month) {
            item.SATUAN === "TON" ? (total += parseInt(item.VOLUME) * 1000) : (total += parseInt(item.VOLUME));
        } else {
          muat.push(total);
          month++;        
        }
        if (data.length === index + 1) {
          muat.push(total);
        }
      }
    });

    setTopMuatVolumeData(muat);
  };

  return (
    <Grid container item direction="row" xs={12} spacing={4}>              
      <Grid item xs={12} md={9} lg={9}>  
        <Typography variant="h6" align="center" color="primary">
            Transaksi Keluar dan Masuk <br/> Per Bulanan
        </Typography>
        <Box borderRadius={16} boxShadow={3}>
          <LineGraph dataBongkar={topBongkarVolumeData} dataMuat={topMuatVolumeData}/>
        </Box>                                
      </Grid>
      <Grid item xs={12} md={3} lg={3}>                                                  
        <Typography variant="h6" align="center" color="primary">
          Neraca Surplus Pedagangan     
          <br/>
          Bulan Ini              
        </Typography>                
        <Box width={1} boxShadow={3} style={{ padding: "20px" }}>
            <h2 align="center">
                { 
                  (surplus < 0) ? 
                    <NeracaDownIcon style={{ fontSize: "30px", color: '#7bd47b' }}/>
                  :
                    <NeracaUpIcon style={{ fontSize: "30px", color: '#7bd47b' }}/>
                } 
                {surplus} 
            </h2>
        </Box>
      </Grid>
    </Grid>      
  );
}
