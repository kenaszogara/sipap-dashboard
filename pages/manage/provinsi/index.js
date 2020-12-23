import React, { useEffect, useState } from "react";
import Dashboard from './../../../components/manage/dashboard/Dashboard';
import Home from './../../../components/manage/provinsi/index'
import getConfig from "next/config";
import axios from "axios";
import { useRouter } from "next/router";
import { getUser } from '../../../utils/Common';

const { publicRuntimeConfig } = getConfig();

export default function IndexProvinsi({ data }) {
	const [success, setSuccess] = useState(false);
	const [provinsi, setProvinsi] = useState(data);
	const [error, setError] = useState(false);
	const [errMsg, setErrMsg] = useState(null);
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const getLoginStatus = getUser();
	const [pageReady, setPageReady] = useState(false)

	async function onDelete(params) {		
		const host = publicRuntimeConfig.API_URL || "http://localhost:5000/";      
		const delData = await axios.post(`${host}api/v1/provinsi/del/${params.id}`)
		console.log(delData.data.data)
		if(delData.status == 200){
							
		}else{
			setError(true)
			setErrMsg("Ada Yang salah, refresh halaman dan coba lagi")
		}
	};

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
				<Dashboard content={ <Home data={provinsi} 
						onDelete={onDelete} 
						loading={loading} 
						success={success} 
						error={error} 
						errMsg={errMsg}/> 
				}/>
			)}
		</>
	);
}

export async function getServerSideProps() {
	let data = null
  	const host = publicRuntimeConfig.API_URL || "http://localhost:5000/";  	
  	const getData = await axios.get(`${host}api/v1/provinsi`)      	
    data = getData.data.data  
    return { 
      	props: { 
      		data 
      	} 
      }
}
