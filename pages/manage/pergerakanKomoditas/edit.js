import React, { useEffect, useState } from "react";
import Dashboard from './../../../components/manage/dashboard/Dashboard';
import EditComponent from './../../../components/manage/pergerakanKomoditas/edit'
import getConfig from "next/config";
import axios from "axios";
import { useRouter } from "next/router";
import { getUser } from '../../../utils/Common';
import { DateTime } from "luxon";


const { publicRuntimeConfig } = getConfig();  

export default function Edit({ provinsi, komoditas, satuan, instansi, users, data }) {  
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
                    <EditComponent 
                        dataProvinsi={provinsi} 
                        dataKomoditas={komoditas} 
                        dataSatuan={satuan} 
                        dataInstansi={instansi}
                        dataUserInput={users}
                        dataUserValidator={users} 
                        data={data}
                    /> 
                    }
                />
            )}
        </>
    );
}

export async function getServerSideProps(context) {        
    const { id } = context.query;
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
    const getDataPergerakanKomoditas = await axios.get(`${host}api/v1/pergerakanKomoditas/${id}`)      	
    const provinsiData = getDataProvinsi.data.data  
    const komoditasData = getDataKomoditas.data.data  
    const satuanData = getDataSatuan.data.data  
    const instansiData = getDataInstansi.data.data  
    const userData = getDataUser.data.data  
    let data = getDataPergerakanKomoditas.data.data

    provinsiData.map((provinsiRow)=>{       
        if(provinsiRow.id == data.provinsi){
            data.provinsi = { value: provinsiRow.id, label: provinsiRow.nama }
        } 
        provinsi.push({ value: provinsiRow.id, label: provinsiRow.nama })
    })    
    
    komoditasData.map((komoditasRow)=>{
        if(komoditasRow.id == data.komoditas){
            data.komoditas = { value: komoditasRow.id, label: komoditasRow.nama }
        } 
        komoditas.push({ value: komoditasRow.id, label: komoditasRow.nama })
    })    
    
    satuanData.map((satuanRow)=>{
        if(satuanRow.id == data.satuan){
            data.satuan = { value: satuanRow.id, label: satuanRow.nama }
        } 
        satuan.push({ value: satuanRow.id, label: satuanRow.nama })
    })    
    
    instansiData.map((instansiRow)=>{
        if(instansiRow.id == data.instansi){
            data.instansi = { value: instansiRow.id, label: instansiRow.nama }
        }
        instansi.push({ value: instansiRow.id, label: instansiRow.nama })
    })    
    
    userData.map((userRow)=>{
        if(userRow.userid == data.user_input){
            data.user_input = { value: userRow.userid, label: userRow.username }
        }
        if(userRow.userid == data.user_validator){
            data.user_validator = { value: userRow.userid, label: userRow.username }
        }
        users.push({ value: userRow.userid, label: userRow.username })
    })    
    data.tgl_input = DateTime.fromISO(data.tgl_input).toISODate()
    data.tgl_transaksi = DateTime.fromISO(data.tgl_transaksi).toISODate()
    return { 
            props: { 
                provinsi,
                komoditas,
                satuan,
                instansi,
                users,
                data 
            } 
        }
}