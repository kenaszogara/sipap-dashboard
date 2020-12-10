import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import InstansiIcon from '@material-ui/icons/AccountBalance';
import KomoditasIcon from '@material-ui/icons/AllInboxSharp';
import PergerakanKomoditas from '@material-ui/icons/LocalShipping';
import SatuanIcon from '@material-ui/icons/ViewAgenda';
import SettingsIcon from '@material-ui/icons/Settings';
import SubIcon from '@material-ui/icons/ArrowForwardIos';
import { useRouter } from 'next/router';

const menuItem = [
  {icon : <DashboardIcon />       , nama : 'Home', url: '/manage'},
  {icon : <InstansiIcon />        , nama : 'Instansi', url: '/manage/instansi'},
  {icon : <KomoditasIcon />       , nama : 'Komoditas', url: '/manage/komoditas'},
  {icon : <PergerakanKomoditas /> , nama : 'Pergerakan Komoditas', url: '/manage/pergerakanKomoditas'},
  {icon : <SatuanIcon />          , nama : 'Satuan', url: '/manage/satuan'},
  {
    icon : <SettingsIcon />, 
    nama : 'Pengetaran', 
    url  : '',
    sub  : [ 
        {icon : <SubIcon /> , nama : 'Users', url: '/manage/users'},
        {icon : <SubIcon /> , nama : 'User Levels', url: '/manage/userlevels'},
        {icon : <SubIcon /> , nama : 'Permissions', url: '/manage/permissions'},     
      ]
  }
]

export default function Menus() {
  const [active, setActive] = React.useState(0);  
  // const history = useHistory();

  return (
    <div>
      menuItem.map( (menu) => {
        <ListItem
            button
            selected={active == 1 ? true : false}
            onClick={() => {
              setActive(1);
              router.push({{menu.url}});
            }}
          >
            <ListItemIcon>
              {menu.icon}
            </ListItemIcon>
            <ListItemText primary={menu.nama} />
          </ListItem> 
      })      
    </div>
  );
}
