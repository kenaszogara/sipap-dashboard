import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import InstansiIcon from '@material-ui/icons/AccountBalance';
import KomoditasIcon from '@material-ui/icons/AllInboxSharp';
import PergerakanKomoditas from '@material-ui/icons/DirectionsBoat';
import SatuanIcon from '@material-ui/icons/ViewAgenda';
import SettingsIcon from '@material-ui/icons/Settings';
import SubIcon from '@material-ui/icons/ArrowForwardIos';
import ProvinsiIcon from '@material-ui/icons/FilterHdr';
import { useRouter } from 'next/router';

export default function MainListItems(){
  const router = useRouter();
  return (
    <div>
      <ListItem button onClick={() => router.push('/manage') }>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>

      <ListItem button onClick={() => router.push('/manage/instansi') }>
        <ListItemIcon>
          <InstansiIcon />
        </ListItemIcon>
        <ListItemText primary="Instansi" />
      </ListItem>

      <ListItem button onClick={() => router.push('/manage/komoditas') }>
        <ListItemIcon>
          <KomoditasIcon />
        </ListItemIcon>
        <ListItemText primary="Komoditas" />
      </ListItem>

      <ListItem button onClick={() => router.push('/manage/pergerakanKomoditas') }>
        <ListItemIcon>
          <PergerakanKomoditas />
        </ListItemIcon>
        <ListItemText primary="Pergerakan Komoditas" />
      </ListItem>

      <ListItem button onClick={() => router.push('/manage/satuan') }>
        <ListItemIcon>
          <SatuanIcon />
        </ListItemIcon>
        <ListItemText primary="Satuan" />
      </ListItem>

      <ListItem button onClick={() => router.push('/manage/provinsi') }>
        <ListItemIcon>
          <ProvinsiIcon />
        </ListItemIcon>
        <ListItemText primary="Provinsi" />
      </ListItem>

    </div>
  );
}
