import React, { useEffect, useState } from "react";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from "material-table";
import AddIcon from '@material-ui/icons/Add';
import { useRouter } from "next/router";
import axios from "axios";
import getConfig from "next/config";
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({  
  appBarSpacer: theme.mixins.toolbar,
  content: {
  	backgroundColor: theme.palette.grey[100],
    flexGrow: 1,
    overflow: 'auto',
  },
  paper: {
    padding: theme.spacing(2),
  },
}));

export default function Home(props) {
  const classes = useStyles();
  const { data, loading, success, error, errMsg } = props;
  const [pergerakanKomoditas, setPergerakanKomoditas] = useState(data)
  const router = useRouter();
  const { publicRuntimeConfig } = getConfig();  

  // useEffect(() => {    
  //   setPergerakanKomoditas(data)    
  // }, [pergerakanKomoditas]);
  
  // const onDelete = data => {
  //   props.onDelete(data)
  // };

  return ( 
   <main className={classes.content}>   
    <Container maxWidth="lg" className={classes.container}>   
      <Grid container item direction="row" xs={12} md={12} lg={12}>            
        <Grid item xs={12} md={12} lg={12}> 
            {error ?<Alert variant="filled" severity="error"> { errMsg } ! </Alert> : ''}
            {success ?<Alert variant="filled" severity="success"> Berhasil menghapus pergerakanKomoditas ! </Alert> : ''}
            <Box display="flex" justifyContent="center">
                {loading ?<CircularProgress color="secondary" /> : ''}
            </Box>
        </Grid>
      </Grid>           
      <Grid container item direction="row" xs={12} md={12} lg={12}>
        <Grid item xs={12} md={12} lg={12}>
          {pergerakanKomoditas && (
            <MaterialTable 
                width={1}
                editable={{                 
                  onRowDelete: async oldData => {            
                    const host = publicRuntimeConfig.API_URL || "http://localhost:5000/";      
                    const delData = await axios.post(`${host}api/v1/pergerakanKomoditas/del/${oldData.id}`)
                      if(delData.status == 200){
                        const dataDelete = [...pergerakanKomoditas];
                        const index = oldData.tableData.id;
                        dataDelete.splice(index, 1);
                        setPergerakanKomoditas(dataDelete);                        			
                      }        
                  }
                }}
                actions={[
                  {
                    icon: () => <AddIcon style={{ color: "#2979ff" }}/>,
                    tooltip: 'Tambah',
                    onClick: () => router.push('/manage/pergerakanKomoditas/add'),
                    isFreeAction: true
                  },
                  {
                    icon: 'edit',
                    tooltip: 'Ubah',
                    iconProps: { style: { color: "#ffc400" } },
                    onClick: (event, rowData) => router.push({
                      pathname: '/manage/pergerakanKomoditas/edit',
                      query: { id : rowData.id },
                    })
                  }          
                ]}
                options={{
                  actionsColumnIndex: -1
                }}
                columns={[
                  { title: "No", render: rowData => rowData.tableData.id + 1 },
                  { field : "tgl_input", title: "Tgl Input" },
                  { field : "tgl_transaksi", title: "Tgl Transaksi" },
                  { title : "Komoditas", 
                    field: "komoditas",
                    render: rowData =>  <span> {rowData.komoditas.nama } </span>,
                  },
                  { title : "Volumne", field: "volume" },
                  { title : "Satuan", 
                    field: "satuan", 
                    render: rowData =>  <span> {rowData.satuan.nama } </span>,
                  },
                  { title : "Harga", field: "harga" },
                  { title : "Provinsi", 
                    field : "provinsi",
                    render: rowData =>  <span> {rowData.provinsi.nama } </span>,
                  },                  
                  { title : "Instansi", 
                    field : "instansi",
                    render: rowData =>  <span> {rowData.instansi.nama } </span>,
                  },                  
                  { title : "Jenis", field: "jenis" }
                ]}
                data={pergerakanKomoditas}
                title="Data Pergerakan Komoditas"
            />
          )}
        </Grid>
      </Grid>            
    </Container>
  </main>
  );
}
