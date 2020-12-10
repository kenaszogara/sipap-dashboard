import React, { useEffect, useState } from "react";
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({  
  appBarSpacer: theme.mixins.toolbar,
  content: {
  	backgroundColor: theme.palette.grey[100],
    flexGrow: 1,
    overflow: 'auto',
  },
  paper: {
    padding: theme.spacing(2),
  },
}));

export default function Home(props) {
  const { data } = props;
  const classes = useStyles();
  return ( 
   <main className={classes.content}>   
    <Container maxWidth="lg" className={classes.container}>
    	<Paper className={classes.paper}>
	      <Grid container>        
	        <Grid item xs={12} md={12} lg={12}>
	            Instansi
	        </Grid>
	      </Grid>      
	    </Paper>
    </Container>
  </main>
  );
}
