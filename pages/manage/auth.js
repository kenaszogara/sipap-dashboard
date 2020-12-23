import React, { useEffect, useState } from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useForm, Controller } from "react-hook-form";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useRouter } from "next/router";
import { setUserSession, getUser } from '../../utils/Common';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit">
        SIPAP
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Auth() {
  const classes = useStyles();
  const router = useRouter();
  const { control, errors, handleSubmit, reset } = useForm();
  const getLoginStatus = getUser(); 
  const [pageReady, setPageReady] = useState(false)
  
  const login = (data) => {
    if(data.username == "admin" && data.password == "admin"){    
      sessionStorage.setItem("login", true);      
      setUserSession(data);
      router.push('/manage');
    }                        
  }

  useEffect(() => {        
    if(getLoginStatus === null){
      setPageReady(true)
    }else{
      router.push('/manage')
    }
  }, [])

  return (
    <>  
      {pageReady && (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit(login)} noValidate>
                <Controller
                    as={TextField}
                    margin="normal"
                    variant="outlined"
                    required
                    control={control}
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    defaultValue=""
                />
                <Controller
                    as={TextField}
                    variant="outlined"
                    margin="normal"
                    required
                    control={control}
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    defaultValue=""
                />         
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Login
              </Button>
            </form>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      )}
    </>
  );
}