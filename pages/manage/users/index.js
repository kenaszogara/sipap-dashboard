import React, { useEffect, useState } from "react";
import Dashboard from './../../../components/manage/dashboard/Dashboard';
import Home from './../../../components/manage/users/index'
import getConfig from "next/config";
import axios from "axios";
import { useRouter } from "next/router";
import { getUser } from '../../../utils/Common';

const { publicRuntimeConfig } = getConfig();

export default function IndexUsers({ data }) {
	const [users, setUsers] = useState(data);
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
				<Dashboard content={ <Home data={users} />  } />
			)}
		</>
	);
}

export async function getServerSideProps() {	
  	const host = publicRuntimeConfig.API_URL || "http://localhost:5000/";  	
  	const getData = await axios.get(`${host}api/v1/user`)      	
    let data = getData.data.data  
    console.log(data)
    return { 
      	props: { 
      		data 
      	} 
      }
}
