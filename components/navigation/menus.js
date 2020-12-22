import * as React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import InstansiIcon from "@material-ui/icons/AccountBalance";
import KomoditasIcon from "@material-ui/icons/AllInboxSharp";
import PergerakanKomoditas from "@material-ui/icons/DirectionsBoat";
import SatuanIcon from "@material-ui/icons/ViewAgenda";
import SettingsIcon from "@material-ui/icons/Settings";
import SubIcon from "@material-ui/icons/ArrowForwardIos";
import ProvinsiIcon from "@material-ui/icons/FilterHdr";
import { useRouter } from "next/router";

export default function Menus() {
  const router = useRouter();
  return (
    <div>
      <ListItem button onClick={() => router.push("/")}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>

      <ListItem button onClick={() => router.push("/pelindo")}>
        <ListItemIcon>
          <InstansiIcon />
        </ListItemIcon>
        <ListItemText primary="Pelindo" />
      </ListItem>

      <ListItem button onClick={() => router.push("/jembatan")}>
        <ListItemIcon>
          <KomoditasIcon />
        </ListItemIcon>
        <ListItemText primary="Jembatan Timbang" />
      </ListItem>

      <ListItem button onClick={() => router.push("/kai")}>
        <ListItemIcon>
          <PergerakanKomoditas />
        </ListItemIcon>
        <ListItemText primary="Kereta Api Indonesia" />
      </ListItem>

      <ListItem button onClick={() => router.push("/ews")}>
        <ListItemIcon>
          <SatuanIcon />
        </ListItemIcon>
        <ListItemText primary="Early Warning System" />
      </ListItem>
    </div>
  );
}
