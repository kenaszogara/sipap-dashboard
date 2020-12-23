import React, { useEffect, useState } from "react";
import Home from './../../components/manage/index'
import Dashboard from './../../components/manage/dashboard/Dashboard'
import { useRouter } from "next/router";
import { getUser } from '../../utils/Common';

export default function IndexManage() {
  const router = useRouter();
  const getLoginStatus = getUser();
  const [pageReady, setPageReady] = useState(false)

  useEffect(() => {        
    if(getLoginStatus === null){
      router.push('/manage/auth')
    }else{
      router.push('/manage/pergerakanKomoditas')
    }
  }, [])
  
  return ( 
    <>
      {pageReady && ( 
        <Dashboard content={ <Home/> }/>
      )}
    </>
  );
}