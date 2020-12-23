import React, { useEffect, useState } from "react";
import Dashboard from './../../../components/manage/dashboard/Dashboard';
import EditComponent from './../../../components/manage/pelabuhan/edit'
import getConfig from "next/config";
import axios from "axios";
import { useRouter } from "next/router";
import { getUser } from '../../../utils/Common';

const { publicRuntimeConfig } = getConfig();  

export default function Edit({ provinsi, data }) {  
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
            {data && pageReady && (
                <Dashboard content={ <EditComponent dataProvinsi={provinsi} data={data}/> }/>
            )}
        </>
    );
}

export async function getServerSideProps(context) {        
    const { id } = context.query;
    let provinsi = []
    const host = publicRuntimeConfig.API_URL || "http://localhost:5000/";  	
    const provinsiData = await fetch(`${host}api/v1/provinsi`)     
    const pelabuhanData = await fetch(`${host}api/v1/pelabuhan/${id}`)      	     	
    let provinsiTer = await provinsiData.json()  
    let dataPelabuhan = await pelabuhanData.json()    
    let data = dataPelabuhan.data    
    provinsiTer.data.map((data)=>{
        provinsi.push({ value: data.id, label: data.nama })
    })
    data.dataProvinsi = provinsi.find( ( { value } )=>{
        return value == data.id_provinsi;
    })    
    return { 
        props: { 
            provinsi,
            data
        } 
    }
}