import React, { useEffect, useState } from "react";
import Dashboard from './../../../components/manage/dashboard/Dashboard';
import EditComponent from './../../../components/manage/provinsi/edit'
import getConfig from "next/config";
import { useRouter } from "next/router";
import { getUser } from '../../../utils/Common';

const { publicRuntimeConfig } = getConfig();  

export default function Edit({ data }) {    
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
                <Dashboard content={ <EditComponent data={data}/> }/>
            )}
        </>
    );
}

export async function getServerSideProps(context) {        
    const { id } = context.query;
    const host = publicRuntimeConfig.API_URL || "http://localhost:5000/";  	 
    const res = await fetch(`${host}api/v1/provinsi/${id}`)      	     	
    let data = await res.json()  
    data = data.data
    return { 
        props: {         
            data
        } 
    }
}