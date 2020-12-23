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
  const [users, setUsers] = useState(data)
  const router = useRouter();
  const { publicRuntimeConfig } = getConfig();  

  return ( 
   <main className={classes.content}>   
    <Container maxWidth="lg" className={classes.container}>   
      <Grid container item direction="row" xs={12} md={12} lg={12}>            
        <Grid item xs={12} md={12} lg={12} justify = "center"> 
            {error ?<Alert variant="filled" severity="error"> { errMsg } ! </Alert> : ''}
            {success ?<Alert variant="filled" severity="success"> Berhasil menghapus users ! </Alert> : ''}
            <Box display="flex" justifyContent="center">
                {loading ?<CircularProgress color="secondary" /> : ''}
            </Box>
        </Grid>
      </Grid>           
      <Grid container item direction="row" xs={12} md={12} lg={12}>
        <Grid item xs={12} md={12} lg={12}>
          {users && (
            <MaterialTable 
                width={1}
                editable={{                 
                  onRowDelete: async oldData => {            
                    const host = publicRuntimeConfig.API_URL || "http://localhost:5000/";      
                    const delData = await axios.post(`${host}api/v1/user/del/${oldData.userid}`)
                      if(delData.status == 200){
                        const dataDelete = [...users];
                        const index = oldData.tableData.id;
                        dataDelete.splice(index, 1);
                        setUsers(dataDelete);                        			
                      }        
                  }
                }}
                actions={[
                  {
                    icon: () => <AddIcon style={{ color: "#2979ff" }}/>,
                    tooltip: 'Tambah',
                    onClick: () => router.push('/manage/users/add'),
                    isFreeAction: true
                  },
                  {
                    icon: 'edit',
                    tooltip: 'Ubah',
                    iconProps: { style: { color: "#ffc400" } },
                    onClick: (event, rowData) => router.push({
                      pathname: '/manage/users/edit',
                      query: { id : rowData.userid },
                    })
                  }                  
                ]}
                options={{
                  actionsColumnIndex: -1
                }}
                columns={[
                  { title: "No", render: rowData => rowData.tableData.id + 1 },
                  { title : "Username", field: "username" },
                  { title : "Password", field: "userpwd" },
                  { title : "Level", field: "level" },
                  { title : "PID", field: "pid" },
                ]}
                data={users}
                title="Data users"
            />
          )}
        </Grid>
      </Grid>            
    </Container>
  </main>
  );
}
