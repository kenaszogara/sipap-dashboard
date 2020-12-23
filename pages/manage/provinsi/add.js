import React, { useEffect, useState } from "react";
import Dashboard from './../../../components/manage/dashboard/Dashboard';
import AddComponent from './../../../components/manage/provinsi/add'
import { useRouter } from "next/router";
import { getUser } from '../../../utils/Common';

export default function Add() {  
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
        <Dashboard content={ <AddComponent /> }/>
      )}
		</>
  );
}