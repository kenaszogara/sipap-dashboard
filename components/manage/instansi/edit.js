import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import { useRouter } from "next/router";
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import getConfig from "next/config";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';


export default function Edit({ data }) {    
    const router = useRouter();
    const { publicRuntimeConfig } = getConfig();
    const [instansi, setInstansi] = useState(data.nama);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errMsg, setErrMsg] = useState(null);
    const [loading, setLoading] = useState(false);
  
  const input = (e) => {
    setInstansi(e.target.value)
    setError(false)
    setLoading(false)
    setSuccess(false)
  }
  
  const editInstansi = async () => {
    if(instansi == null || instansi == ''){
        setError(true)
        setErrMsg("Input Yang anda Masukan Kosong")
    }else{
        setLoading(true)
        const host = publicRuntimeConfig.API_URL || "http://localhost:5000/";
        const dataInstansi = JSON.stringify({
            instansi: {
                nama: instansi
            }
        })
        const addData = await axios.post(`${host}api/v1/instansi/edit/${data.id}`, dataInstansi)
        if(addData.status == 200){
            setLoading(false)         
            setInstansi("")         
            setSuccess(true)
            router.push('/manage/instansi')         
        }else{
            setError(true)
            setLoading(false)
            setErrMsg("Ada Yang salah, refresh halaman dan coba lagi")
        }
    }
  }

  return ( 
    <Box bgcolor="#fff" boxShadow={3} borderRadius={16} style={{ padding: "3em" }}>
        <Grid container item direction="row" xs={12} md={12} lg={12}>            
            <Grid item xs={12} md={12} lg={12} justify = "center"> 
                {error ?<Alert variant="filled" severity="error"> { errMsg } ! </Alert> : ''}
                {success ?<Alert variant="filled" severity="success"> Berhasil Mengubah Instansi ! </Alert> : ''}
                <Box display="flex" justifyContent="center">
                    {loading ?<CircularProgress color="secondary" /> : ''}
                </Box>
            </Grid>
        </Grid>         
        <Grid container item direction="row" xs={12} md={12} lg={12}>            
            <Grid item xs={12} md={12} lg={12}>
                <h2>Ubah Instansi</h2>                 
            </Grid>
        </Grid>         
        <Grid container item direction="row" xs={12} md={12} lg={12}>
            <Grid item xs={12} md={12} lg={12}>                
                <TextField
                    id="instansi"
                    label="Nama Instansi"
                    placeholder="Instansi"
                    style={{ 
                        paddingTop: "15px",
                        paddingBottom: "15px",
                    }}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                        style: {
                            fontSize: "25px"
                        }
                    }}
                    disabled={loading}
                    onChange={ input }
                    value={instansi}
                />
            </Grid>
        </Grid>         
        <Grid container item direction="row" xs={12} md={12} lg={12}>
            <Grid item xs={12} md={12} lg={12}>                
                <Button
                    variant="contained"
                    style={{ backgroundColor: "#2979ff", color: "#fff" }}
                    startIcon={<ArrowBackIosIcon/>}
                    onClick={ () => router.push('/manage/instansi/')}
                    disabled={loading}
                >
                    Kembali
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ marginLeft: "5px" }}
                    startIcon={<AddIcon/>}
                    onClick={editInstansi}
                    disabled={loading}
                >
                    Ubah
                </Button>
            </Grid>
        </Grid>         
    </Box>
  );
}
