import React, { useEffect, useState } from "react";
import Dashboard from './../../../components/manage/dashboard/Dashboard';
import AddComponent from './../../../components/manage/pelabuhan/add'
import getConfig from "next/config";
import axios from 'axios';
import { useRouter } from "next/router";
import { getUser } from '../../../utils/Common';

const { publicRuntimeConfig } = getConfig();

export default function Add({provinsi}) {  
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
            <Dashboard content={ <AddComponent dataProvinsi={provinsi}/> }/>
      )}
    </>
  );
}

export async function getServerSideProps() {
	  let provinsiTer = null
	  let provinsi = []
  	const host = publicRuntimeConfig.API_URL || "http://localhost:5000/";  	
  	const getData = await axios.get(`${host}api/v1/provinsi`)      	
    provinsiTer = getData.data.data  

    provinsiTer.map((data)=>{
      provinsi.push({ value: data.id, label: data.nama })
    })    
    return { 
      	props: { 
      		provinsi 
      	} 
      }
}
