import React, { useEffect, useState } from "react";
import Dashboard from './../../../components/manage/dashboard/Dashboard';
import AddComponent from './../../../components/manage/pergerakanKomoditas/add'
import getConfig from "next/config";
import axios from 'axios';
import { useRouter } from "next/router";
import { getUser } from '../../../utils/Common';

const { publicRuntimeConfig } = getConfig();

export default function Add({provinsi, komoditas, satuan, instansi, users}) {  
  const router = useRouter();
	const getLoginStatus = getUser();
	const [pageReady, setPageReady] = useState(false)

	useEffect(() => {        
		if(getLoginStatus === null){
		  router.push('/manage/auth')
		}else{
		  setPageReady(true)
    }
  }, [])

  return ( 
    <>	
      {pageReady && (
        <Dashboard content={ 
            <AddComponent 
              dataProvinsi={provinsi} 
              dataKomoditas={komoditas} 
              dataSatuan={satuan} 
              dataInstansi={instansi}
              dataUserInput={users}
              dataUserValidator={users}
            /> 
          }
        />
      )}
		</>    
  )
}


export async function getServerSideProps() {
    let provinsi = []
    let komoditas = []
    let satuan = []
    let instansi = []
    let users = []
  	const host = publicRuntimeConfig.API_URL || "http://localhost:5000/";  	
  	const getDataProvinsi = await axios.get(`${host}api/v1/provinsi`)      	
  	const getDataKomoditas = await axios.get(`${host}api/v1/komoditas`)      	
  	const getDataSatuan = await axios.get(`${host}api/v1/satuan`)      	
  	const getDataInstansi = await axios.get(`${host}api/v1/instansi`)      	
  	const getDataUser = await axios.get(`${host}api/v1/user`)      	
    const provinsiData = getDataProvinsi.data.data  
    const komoditasData = getDataKomoditas.data.data  
    const satuanData = getDataSatuan.data.data  
    const instansiData = getDataInstansi.data.data  
    const userData = getDataUser.data.data  

    console.log(userData)

    provinsiData.map((data)=>{
      provinsi.push({ value: data.id, label: data.nama })
    })    
    
    komoditasData.map((data)=>{
      komoditas.push({ value: data.id, label: data.nama })
    })    
    
    satuanData.map((data)=>{
      satuan.push({ value: data.id, label: data.nama })
    })    
    
    instansiData.map((data)=>{
      instansi.push({ value: data.id, label: data.nama })
    })    
    
    userData.map((data)=>{
      users.push({ value: data.userid, label: data.username })
    })    
    
    return { 
      	props: { 
          provinsi,
          komoditas,
          satuan,
          instansi,
          users 
      	} 
      }
}
