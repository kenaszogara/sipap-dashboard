import React, { useEffect, useState } from "react";
import Dashboard from './../../../components/manage/dashboard/Dashboard';
import EditComponent from './../../../components/manage/instansi/edit'
import getConfig from "next/config";
import axios from "axios";
import { useRouter } from "next/router";
import { getUser } from '../../../utils/Common';

export default function Edit() {
    const router = useRouter();
	const getLoginStatus = getUser();
	const [pageReady, setPageReady] = useState(false)
    const { id } = router.query;
    const [ data , setData] = useState(null);
    const { publicRuntimeConfig } = getConfig();  
    
    useEffect(()=>{        
        getDataInstansi()
    , [data]})
    
    useEffect(() => {        
        if(getLoginStatus === null){
            router.push('/manage/auth')
        }else{
            setPageReady(true)
        }
    }, [])

    const getDataInstansi = async () => {
        const host = publicRuntimeConfig.API_URL || "http://localhost:5000/";  	
        const getData = await axios.get(`${host}api/v1/instansi/${id}`)      	
        setData(getData.data.data)   
    }

    return ( 
        <>
            {data && pageReady && (
                <Dashboard content={ <EditComponent data={data}/> }/>
            )}
        </>
    );
}