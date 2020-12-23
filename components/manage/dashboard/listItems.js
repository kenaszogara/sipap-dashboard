import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import InstansiIcon from '@material-ui/icons/AccountBalance';
import KomoditasIcon from '@material-ui/icons/AllInboxSharp';
import PergerakanKomoditas from '@material-ui/icons/DirectionsBoat';
import SatuanIcon from '@material-ui/icons/ViewAgenda';
import PelabuhanIcon from '@material-ui/icons/GolfCourseSharp';
import SettingsIcon from '@material-ui/icons/Settings';
import SubIcon from '@material-ui/icons/KeyboardArrowRight';
import { makeStyles } from '@material-ui/core/styles';
import ProvinsiIcon from '@material-ui/icons/FilterHdr';
import { useRouter } from 'next/router';
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const menu = [
  // {icon : <DashboardIcon />       , nama : 'Home', url: '/manage'},
  {icon : <PelabuhanIcon />       , nama : 'Pelabuhan', url: '/manage/pelabuhan'},
  {icon : <InstansiIcon />        , nama : 'Instansi', url: '/manage/instansi'},
  {icon : <KomoditasIcon />       , nama : 'Komoditas', url: '/manage/komoditas'},
  {icon : <PergerakanKomoditas /> , nama : 'Pergerakan Komoditas', url: '/manage/pergerakanKomoditas'},
  {icon : <SatuanIcon />          , nama : 'Satuan', url: '/manage/satuan'},    
  {icon : <ProvinsiIcon />        , nama : 'Provinsi', url: '/manage/provinsi'}    
]

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function MainListItems(){
  const router = useRouter();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      {menu.map( function(row, key){
        return(
          <ListItem key={key} button onClick={() => router.push(row.url) }>
            <ListItemIcon>
              {row.icon}
            </ListItemIcon>
            <ListItemText primary={row.nama} />
          </ListItem>
        )
      })} 
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Pengaturan" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button onClick={() => router.push('/manage/users') } className={classes.nested}>
              <ListItemIcon>
                <SubIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
            <ListItem button onClick={() => router.push('/manage/userLevel') } className={classes.nested}>
              <ListItemIcon>
                <SubIcon />
              </ListItemIcon>
              <ListItemText primary="User Levels" />
            </ListItem>
            <ListItem button onClick={() => router.push('/manage/permissions') } className={classes.nested}>
              <ListItemIcon>
                <SubIcon />
              </ListItemIcon>
              <ListItemText primary="Permissons" />
            </ListItem>
          </List>
        </Collapse>      
    </>
  );
}
