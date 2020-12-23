import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button'; 
import AddIcon from '@material-ui/icons/Add';
import Input from '@material-ui/core/Input';
import Select from "react-select";
import { useRouter } from "next/router";
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useForm, Controller } from "react-hook-form";
import InputLabel from '@material-ui/core/InputLabel';
import getConfig from "next/config";
import FormHelperText from '@material-ui/core/FormHelperText';

export default function Add({ dataProvinsi }) {
    const router = useRouter();
    const { publicRuntimeConfig } = getConfig();
    const { control, errors, handleSubmit, reset } = useForm();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errMsg, setErrMsg] = useState(null);
    const [loading, setLoading] = useState(false);

    const addPelabuhan = async (data) => {
        setLoading(true)
        const host = publicRuntimeConfig.API_URL || "http://localhost:5000/";
        const sendData = JSON.stringify({
            pelabuhan: {
                id_provinsi: data.provinsi.value,
                nama_pelabuhan: data.nama_pelabuhan,
                kota_pelabuhan: data.kota_pelabuhan
            }
        })
        const addData = await axios.post(`${host}api/v1/pelabuhan/add`, sendData)
        if(addData.status == 200){
            setLoading(false)         
            setSuccess(true)  
            reset()       
        }else{
            setError(true)
            setLoading(false)
            setErrMsg("Ada Yang salah, refresh halaman dan coba lagi")
        }
    }

    return ( 
        <>  
            {dataProvinsi && (
                <Box bgcolor="#fff" boxShadow={3} borderRadius={16} style={{ padding: "3em" }}>
                <Grid container item direction="row" xs={12} md={12} lg={12}>            
                    <Grid item xs={12} md={12} lg={12}> 
                        {error ?<Alert variant="filled" severity="error"> { errMsg } ! </Alert> : ''}
                        {success ?<Alert variant="filled" severity="success"> Berhasil Menambahkan pelabuhan ! </Alert> : ''}
                        <Box display="flex" justifyContent="center">
                            {loading ?<CircularProgress color="secondary" /> : ''}
                        </Box>                
                    </Grid>
                </Grid>         
                <Grid container item direction="row" xs={12} md={12} lg={12}>            
                    <Grid item xs={12} md={12} lg={12}>
                        <h2>Tambah Pelabuhan</h2> 
                        <small>Wajib di isi (<span style={{ color: "red" }}>*</span>)</small>                
                    </Grid>
                </Grid>         
                <form onSubmit={handleSubmit(addPelabuhan)}>
                    <Grid container item direction="row" xs={12} md={12} lg={12}>
                        <Grid item xs={12} md={6} lg={6} style={{ marginTop: "20px", }}> 
                            <InputLabel htmlFor="kota_pelabuhan">Kota Pelabuhan<span style={{ color: "red" }}>*</span></InputLabel>                    
                            <Controller
                                as={Input}
                                name="kota_pelabuhan"
                                control={control}
                                defaultValue=""
                                className="materialUIInput"
                                fullWidth
                                disabled={loading}
                                id="kota_pelabuhan"
                                rules={{ required: true }}
                            />
                            <FormHelperText>{errors.kota_pelabuhan && <span style={{ color: "red" }}>Mohon di isi</span>}</FormHelperText>                                           
                        </Grid>                
                        <Grid item xs={12} md={6} lg={6} style={{ marginTop: "20px", }}> 
                            <InputLabel htmlFor="nama_pelabuhan">Nama Pelabuhan<span style={{ color: "red" }}>*</span></InputLabel>                    
                            <Controller
                                as={Input}
                                name="nama_pelabuhan"
                                control={control}
                                defaultValue=""
                                className="materialUIInput"
                                fullWidth
                                disabled={loading}
                                id="nama_pelabuhan"
                                rules={{ required: true }}
                            />
                            <FormHelperText>{errors.nama_pelabuhan && <span style={{ color: "red" }}>Mohon di isi</span>}</FormHelperText>                                           
                        </Grid>
                    </Grid>         
                    <Grid container item direction="row" xs={12} md={12} lg={12}>
                        <Grid item xs={12} md={6} lg={6} style={{ marginTop: "20px", }}>   
                            <InputLabel style={{ marginBottom: "10px" }} htmlFor="provinsi">Provinsi<span style={{ color: "red" }}>*</span></InputLabel>
                            <Controller                        
                                name="provinsi"
                                as={Select}
                                options={ dataProvinsi }
                                control={control}
                                defaultValue=""
                                fullWidth    
                                rules={{ required: true }}                  
                            />                
                            <FormHelperText>{errors.provinsi && <span style={{ color: "red" }}>Mohon di isi</span>}</FormHelperText>                                  
                        </Grid>           
                    </Grid>         
                    <Grid container item direction="row" xs={12} md={12} lg={12}>
                        <Grid item xs={12} md={12} lg={12} style={{ marginTop: "10px" }}>                
                            <Button
                                variant="contained"
                                style={{ backgroundColor: "#2979ff", color: "#fff" }}
                                startIcon={<ArrowBackIosIcon/>}
                                onClick={ () => router.push('/manage/pelabuhan/')}
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
                                Tambah
                            </Button>
                        </Grid>
                    </Grid>                   
                </form>
            </Box>
            )}
        </>
    );
}
