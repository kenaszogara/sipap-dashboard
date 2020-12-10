import React, { useEffect, useState } from "react";
import Home from '../../components/manage/index'
import Dashboard from '../../components/manage/dashboard/dashboard'

// import axios from "axios";
// import { makeStyles, useTheme } from '@material-ui/core/styles';
// import getConfig from "next/config";
// import { useRouter } from "next/router";

export default function IndexManage() {
  return ( 
    <Dashboard content={ <Home/> }/>
  );
}
