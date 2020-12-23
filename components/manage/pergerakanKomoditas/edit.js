import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button'; 
import AddIcon from '@material-ui/icons/Add';
import Select from "react-select";
import { useRouter } from "next/router";
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useForm, Controller } from "react-hook-form";
import InputLabel from '@material-ui/core/InputLabel';
import getConfig from "next/config";
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField'
import { RadioGroup, Radio,FormControlLabel } from "@material-ui/core";

export default function Edit({ dataProvinsi, dataKomoditas, dataSatuan, dataInstansi, dataUserInput, dataUserValidator, data }) {
    const router = useRouter();
    const { publicRuntimeConfig } = getConfig();
    const { control,register, errors, handleSubmit, reset } = useForm();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errMsg, setErrMsg] = useState(null);
    const [loading, setLoading] = useState(false);

    const editPergerakanKomoditas = async (dataForm) => {        
        setLoading(true)
        const host = publicRuntimeConfig.API_URL || "http://localhost:5000/";
        const sendData = JSON.stringify({
            pergerakanKomoditas: {
                tgl_input: dataForm.tgl_input,
                tgl_transaksi: dataForm.tgl_transaksi,
                komoditas: dataForm.komoditas.value,
                volume: dataForm.volume,
                satuan: dataForm.satuan.value,
                harga: dataForm.harga,
                provinsi: dataForm.provinsi.value,
                instansi: dataForm.instansi.value,
                user_input: dataForm.user_input.value,
                user_validator: dataForm.user_validator.value,
                jenis: dataForm.jenis
            }
        })
        const editData = await axios.post(`${host}api/v1/pergerakanKomoditas/edit/${data.id}`, sendData)
        if(editData.status == 200){            
            setSuccess(true)  
            router.push('/manage/pergerakanKomoditas')         
        }else{
            setError(true)
            setLoading(false)
            setErrMsg("Ada Yang salah, refresh halaman dan coba lagi")
        }
    }

    return (         
        <Box bgcolor="#fff" boxShadow={3} borderRadius={16} style={{ padding: "3em" }}>
            <Grid container item direction="row" xs={12} md={12} lg={12}>            
                <Grid item xs={12} md={12} lg={12}> 
                    {error ?<Alert variant="filled" severity="error"> { errMsg } ! </Alert> : ''}
                    {success ?<Alert variant="filled" severity="success"> Berhasil Mengubah Pergerakan Komoditas ! </Alert> : ''}
                    <Box display="flex" justifyContent="center">
                        {loading ?<CircularProgress color="secondary" /> : ''}
                    </Box>                
                </Grid>
            </Grid>         
            <Grid container item direction="row" xs={12} md={12} lg={12}>            
                <Grid item xs={12} md={12} lg={12}>
                    <h2>Ubah Pergerakan Komoditas</h2> 
                    <small>Wajib di isi (<span style={{ color: "red" }}>*</span>)</small>                
                </Grid>
            </Grid>         
            <form onSubmit={handleSubmit(editPergerakanKomoditas)}>
                <Grid container item direction="row" xs={12} md={12} lg={12}>
                    <Grid item xs={12} md={6} lg={6} style={{ marginTop: "20px", padding: "5px"}}> 
                        <InputLabel htmlFor="tgl_input">Tanggal Input<span style={{ color: "red" }}>*</span></InputLabel>                    
                        <Controller
                            control={control}
                            as={TextField}
                            disabled={loading}
                            type="date"
                            fullWidth
                            name="tgl_input"  
                            id="tgl_input"          
                            defaultValue={data.tgl_input}
                            rules={{ required: true }}                                                    
                        />
                        <FormHelperText>{errors.tgl_input && <span style={{ color: "red" }}>Mohon di isi</span>}</FormHelperText>                                           
                    </Grid>                
                    <Grid item xs={12} md={6} lg={6} style={{ marginTop: "20px", padding: "5px"}}> 
                        <InputLabel htmlFor="tgl_transaksi">Tanggal Transaksi<span style={{ color: "red" }}>*</span></InputLabel>                    
                        <Controller
                            control={control}
                            as={TextField}
                            disabled={loading}
                            fullWidth
                            type="date"
                            name="tgl_transaksi" 
                            id="tgl_transaksi"           
                            rules={{ required: true }}                    
                            defaultValue={data.tgl_transaksi}                                
                        />
                        <FormHelperText>{errors.tgl_transaksi && <span style={{ color: "red" }}>Mohon di isi</span>}</FormHelperText>                                           
                    </Grid>                                       
                </Grid>         
                
                <Grid container item direction="row" xs={12} md={12} lg={12}>
                    <Grid item xs={12} md={6} lg={6} style={{ marginTop: "20px", padding: "5px"}}>   
                        <InputLabel style={{ marginBottom: "10px" }} htmlFor="komoditas">Komoditas<span style={{ color: "red" }}>*</span></InputLabel>
                        <Controller                        
                            name="komoditas"
                            as={Select}
                            disabled={loading}
                            options={ dataKomoditas }
                            control={control}
                            defaultValue={data.komoditas}
                            id="komoditas"
                            fullWidth    
                            rules={{ required: true }}                  
                        />                
                        <FormHelperText>{errors.komoditas && <span style={{ color: "red" }}>Mohon di isi</span>}</FormHelperText>                                  
                    </Grid>
                    <Grid item xs={12} md={6} lg={6} style={{ marginTop: "20px", padding: "5px"}}> 
                        <InputLabel htmlFor="volume">Volume<span style={{ color: "red" }}>*</span></InputLabel>                    
                        <Controller
                            name="volume"
                            as={TextField}
                            control={control}
                            placeholder="Volume"
                            defaultValue={data.volume}
                            disabled={loading}
                            className="materialUIInput"
                            fullWidth
                            disabled={loading}
                            id="volume"
                            rules={{ required: true }}
                            type="number"
                        />
                        <FormHelperText>{errors.volume && <span style={{ color: "red" }}>Mohon di isi</span>}</FormHelperText>                                           
                    </Grid>           
                </Grid>         
                
                <Grid container item direction="row" xs={12} md={12} lg={12}>
                    <Grid item xs={12} md={6} lg={6} style={{ marginTop: "20px", padding: "5px"}}>   
                        <InputLabel style={{ marginBottom: "10px" }} htmlFor="satuan">Satuan<span style={{ color: "red" }}>*</span></InputLabel>
                        <Controller                        
                            name="satuan"
                            as={Select}
                            disabled={loading}
                            options={ dataSatuan }
                            control={control}
                            id="satuan"
                            defaultValue={data.satuan}
                            fullWidth    
                            rules={{ required: true }}                  
                        />                
                        <FormHelperText>{errors.satuan && <span style={{ color: "red" }}>Mohon di isi</span>}</FormHelperText>                                  
                    </Grid>
                    <Grid item xs={12} md={6} lg={6} style={{ marginTop: "20px", padding: "5px"}}> 
                        <InputLabel htmlFor="harga">Harga<span style={{ color: "red" }}>*</span></InputLabel>                    
                        <Controller
                            name="harga"
                            control={control}
                            as={TextField}
                            placeholder="Harga"
                            disabled={loading}
                            defaultValue={data.harga}
                            className="materialUIInput"
                            fullWidth
                            disabled={loading}
                            id="harga"
                            type="number"
                            rules={{ required: true }}
                            // render={({ onChange, onBlur, value }) => (
                            //     <TextField                                        
                            //         defaultValue=""
                            //         onChange={onChange}
                            //         onBlur={onBlur}
                            //         selected={value}
                            //     />                                
                            // )}
                        />
                        <FormHelperText>{errors.harga && <span style={{ color: "red" }}>Mohon di isi</span>}</FormHelperText>                                           
                    </Grid>           
                </Grid>         
                
                <Grid container item direction="row" xs={12} md={12} lg={12}>
                    <Grid item xs={12} md={6} lg={6} style={{ marginTop: "20px", padding: "5px"}}>   
                        <InputLabel style={{ marginBottom: "10px" }} htmlFor="provinsi">Provinsi<span style={{ color: "red" }}>*</span></InputLabel>
                        <Controller                        
                            name="provinsi"
                            as={Select}
                            options={ dataProvinsi }
                            control={control}
                            defaultValue={data.provinsi}
                            disabled={loading}
                            fullWidth    
                            id="provinsi"
                            rules={{ required: true }}                  
                        />                
                        <FormHelperText>{errors.provinsi && <span style={{ color: "red" }}>Mohon di isi</span>}</FormHelperText>                                  
                    </Grid>
                    <Grid item xs={12} md={6} lg={6} style={{ marginTop: "20px", padding: "5px"}}>   
                        <InputLabel style={{ marginBottom: "10px" }} htmlFor="instansi">Instansi<span style={{ color: "red" }}>*</span></InputLabel>
                        <Controller                        
                            name="instansi"
                            as={Select}
                            options={ dataInstansi }
                            control={control}
                            defaultValue={data.instansi}
                            id="instansi"
                            fullWidth    
                            rules={{ required: true }}  
                            disabled={loading}                
                        />                
                        <FormHelperText>{errors.instansi && <span style={{ color: "red" }}>Mohon di isi</span>}</FormHelperText>                                  
                    </Grid>
                </Grid>         

                <Grid container item direction="row" xs={12} md={12} lg={12}>
                    <Grid item xs={12} md={6} lg={6} style={{ marginTop: "20px", padding: "5px"}}>   
                        <InputLabel style={{ marginBottom: "10px" }} htmlFor="user_input">User Input
                        {/* <span style={{ color: "red" }}>*</span> */}
                        </InputLabel>
                        <Controller                        
                            name="user_input"
                            as={Select}
                            options={ dataUserInput }
                            control={control}
                            defaultValue={data.user_input}
                            disabled={loading}
                            fullWidth    
                            id="user_input"
                            // rules={{ required: true }}                  
                        />                
                        <FormHelperText>{errors.user_input && <span style={{ color: "red" }}>Mohon di isi</span>}</FormHelperText>                                  
                    </Grid>
                    <Grid item xs={12} md={6} lg={6} style={{ marginTop: "20px", padding: "5px"}}>   
                        <InputLabel style={{ marginBottom: "10px" }} htmlFor="user_validator">User Validator
                        {/* <span style={{ color: "red" }}>*</span> */}
                        </InputLabel>
                        <Controller                        
                            name="user_validator"
                            as={Select}
                            id="user_validator"
                            options={ dataUserValidator }
                            disabled={loading}
                            control={control}
                            defaultValue={data.user_validator}
                            fullWidth    
                            // rules={{ required: true }}                  
                        />                
                        <FormHelperText>{errors.user_validator && <span style={{ color: "red" }}>Mohon di isi</span>}</FormHelperText>                                  
                    </Grid>
                </Grid>         
                
                <Grid container item direction="row" xs={12} md={12} lg={12}>
                    <Grid item xs={12} md={6} lg={6} style={{ marginTop: "20px", padding: "5px"}}>   
                        <InputLabel style={{ marginBottom: "10px" }} htmlFor="jenis">
                            Jenis
                        <span style={{ color: "red" }}>*</span>
                        </InputLabel>
                        <Controller
                            as={
                                <RadioGroup aria-label="jenis">
                                    <FormControlLabel
                                        value="Masuk"
                                        control={<Radio />}
                                        label="Masuk"                                        
                                        />
                                    <FormControlLabel 
                                        value="Keluar" 
                                        control={<Radio />} 
                                        label="Keluar" 
                                    />
                                </RadioGroup>
                            }
                            defaultValue={data.jenis}
                            name="jenis"        
                            disabled={loading}                        
                            control={control}
                            rules={{ required: true }}
                        />           
                        <FormHelperText>{errors.jenis && <span style={{ color: "red" }}>Mohon di isi</span>}</FormHelperText>                                  
                    </Grid>
                </Grid>         
                
                <Grid container item direction="row" xs={12} md={12} lg={12}>
                    <Grid item xs={12} md={12} lg={12} style={{ marginTop: "10px" }}>                
                        <Button
                            variant="contained"
                            style={{ backgroundColor: "#2979ff", color: "#fff" }}
                            startIcon={<ArrowBackIosIcon/>}
                            onClick={ () => router.push('/manage/pergerakanKomoditas/')}
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
