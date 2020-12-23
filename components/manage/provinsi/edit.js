import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button'; 
import AddIcon from '@material-ui/icons/Add';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import { useRouter } from "next/router";
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useForm, Controller } from "react-hook-form";
import InputLabel from '@material-ui/core/InputLabel';
import getConfig from "next/config";
import FormHelperText from '@material-ui/core/FormHelperText';

export default function Add({ data }) {
    const router = useRouter();
    const { publicRuntimeConfig } = getConfig();
    const { control, errors, handleSubmit, reset } = useForm();    
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errMsg, setErrMsg] = useState(null);
    const [loading, setLoading] = useState(false);

    const editProvinsi = async (formData) => {    
        setLoading(true)
        const host = publicRuntimeConfig.API_URL || "http://localhost:5000/";
        const sendData = JSON.stringify({
            provinsi: {
                nama: formData.nama
            }
        })
        const addData = await axios.post(`${host}api/v1/provinsi/edit/${data.id}`, sendData)
        if(addData.status == 200){
            setLoading(false)                
            setSuccess(true)   
            router.push('/manage/provinsi/')      
        }else{
            setError(true)
            setLoading(false)
            setErrMsg("Ada Yang salah, refresh halaman dan coba lagi")
        }        
    }

  return ( 
    <Box bgcolor="#fff" boxShadow={3} borderRadius={16} style={{ padding: "3em" }}>
        <Grid container item direction="row" xs={12} md={12} lg={12}>            
            <Grid item xs={12} md={12} lg={12} justify = "center"> 
                {error ?<Alert variant="filled" severity="error"> { errMsg } ! </Alert> : ''}
                {success ?<Alert variant="filled" severity="success"> Berhasil Menambahkan provinsi ! </Alert> : ''}
                <Box display="flex" justifyContent="center">
                    {loading ?<CircularProgress color="secondary" /> : ''}
                </Box>
            </Grid>
        </Grid>         
        <Grid container item direction="row" xs={12} md={12} lg={12}>            
            <Grid item xs={12} md={12} lg={12}>
                <h2>Ubah Provinsi</h2>                 
            </Grid>
        </Grid>      
        <form onSubmit={handleSubmit(editProvinsi)}>
        <Grid container item direction="row" xs={12} md={12} lg={12}>
            <Grid item xs={12} md={6} lg={6} style={{ padding: "5px" }}>                
                <InputLabel htmlFor="nama">ID Provinsi<span style={{ color: "red" }}>*</span></InputLabel>                                    
                <Controller
                    as={TextField}
                    name="id"
                    type="number"
                    control={control}
                    disabled="true"
                    defaultValue={data.id}
                    InputProps={{
                        inputProps: { 
                            max: 99, min: 1
                        }
                    }}
                    className="materialUIInput"
                    fullWidth
                    id="nama"
                    rules={{ 
                        required: true 
                    }}
                />
                <FormHelperText>{errors.id && <span style={{ color: "red" }}>Mohon di isi</span>}</FormHelperText>                                           
            </Grid>
            <Grid item xs={12} md={6} lg={6} style={{ padding: "5px" }}>                
                <InputLabel htmlFor="nama">Nama provinsi<span style={{ color: "red" }}>*</span></InputLabel>                    
                <Controller
                    as={Input}
                    name="nama"
                    control={control}
                    defaultValue={data.nama}
                    className="materialUIInput"
                    fullWidth
                    disabled={loading}
                    id="nama"
                    rules={{ required: true }}
                />
                <FormHelperText>{errors.nama && <span style={{ color: "red" }}>Mohon di isi</span>}</FormHelperText>                                           
            </Grid>
        </Grid>         
        <Grid container item direction="row" xs={12} md={12} lg={12}>            
            <Grid item xs={12} md={6} lg={6} style={{ marginTop: "10px" }}>                
                <Button
                    variant="contained"
                    style={{ backgroundColor: "#2979ff", color: "#fff" }}
                    startIcon={<ArrowBackIosIcon/>}
                    onClick={ () => router.push('/manage/provinsi/')}
                    disabled={loading}
                >
                    Kembali
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ marginLeft: "5px" }}
                    startIcon={<AddIcon/>}                    
                    disabled={loading}                    
                >
                    Ubah
                </Button>
            </Grid>
        </Grid>         
        </form>
    </Box>
  );
}
