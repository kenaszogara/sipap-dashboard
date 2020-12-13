import React, { useEffect, useState } from "react";
import Dashboard from './../../../components/manage/dashboard/Dashboard';
import Home from './../../../components/manage/instansi/index'
import getConfig from "next/config";
import axios from "axios";

const { publicRuntimeConfig } = getConfig();

function IndexInstansi({ data }) {
  return ( 
    <Dashboard content={ <Home data={data} /> }/>
  );
}

export async function getServerSideProps() {
  	const host = publicRuntimeConfig.API_URL || "http://localhost:5000/";
  	let data = null
  	const getToken = await axios.get(`${host}api/v1/auth/PP3_USR1`)   
  	const getData = await axios.get(`${host}api/v1/pelindo/2019/2020`, { headers: { Authorization: getToken.data.JWT } })      	
  	data = getData.data  	
    return { 
      	props: { 
      		data 
      	} 
      }
}

export default IndexInstansi
