import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import LineGraph from "../linegraph";
import NeracaIcon from "@material-ui/icons/Eject";
import Box from "@material-ui/core/Box";
import { DateTime } from "luxon";
import MaterialTable from "material-table";
// material ui
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

export default function SectionTwo(props) {
  const { dataBapok } = props;
  const [bapok, setBapok] = useState(null);
  const grouped = groupBy(dataBapok, (komo) => komo.bulan);

  const month_name = function (dt) {
    let mlist = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return mlist[dt];
  };

  useEffect(() => {
    dataBapok.sort((a, b) => (a.bulan > b.bulan ? 1 : -1));
    groupDataBapok(dataBapok);
    // console.log(grouped);
  }, [dataBapok]);

  const groupDataBapok = (data) => {
    const bapok = [];
    let butuh = 0;
    let sedia = 0;
    let surplus = 0;
    let month = 1;
    data.forEach((item, index) => {
      const date = item.bulan;

      if (date === month) {
        butuh = butuh + item.kebutuhan;
        sedia = sedia + item.ketersediaan;
        surplus = surplus + item.ketersediaan - item.kebutuhan;
      } else {
        let bulan = month - 1;
        bapok.push({
          bulan: month_name(bulan),
          butuh: butuh,
          sedia: sedia,
          surplus: surplus,
        });
        month++;
        butuh = 0;
        sedia = 0;
        surplus = 0;
      }

      if (data.length === index + 1) {
        let bulan = month - 1;
        bapok.push({
          bulan: month_name(bulan),
          butuh: butuh,
          sedia: sedia,
          surplus: surplus,
        });
      }
    });
    setBapok(bapok);
  };

  function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }

  return (
    <Grid container item direction="row" xs={12} spacing={4}>
      <Grid item xs={12} md={12} lg={12}>
        <Box borderRadius={16} boxShadow={3}>
          {bapok && (
            <MaterialTable
              columns={[
                {
                  title: "Bulan",
                  field: "bulan",
                  cellStyle: {
                    width: 1,
                    maxWidth: 1,
                  },
                  headerStyle: {
                    width: 1,
                    maxWidth: 1,
                  },
                },
                {
                  title: "Kebutuhan",
                  field: "butuh",
                  type: "numeric",
                  render: (RowData) =>
                    new Intl.NumberFormat("id-ID").format(
                      parseInt(RowData.butuh)
                    ),
                },
                {
                  title: "Ketersediaan",
                  field: "sedia",
                  type: "numeric",
                  render: (RowData) =>
                    new Intl.NumberFormat("id-ID").format(
                      parseInt(RowData.sedia)
                    ),
                },
                {
                  title: "Surplus/Minus",
                  field: "surplus",
                  type: "numeric",
                  render: (rowData) =>
                    rowData.surplus < 0 ? (
                      <p style={{ color: "#f44336", textAlign: "right" }}>
                        {new Intl.NumberFormat("id-ID").format(
                          parseInt(rowData.surplus)
                        )}
                      </p>
                    ) : (
                      <p style={{ color: "#4caf50", textAlign: "right" }}>
                        {new Intl.NumberFormat("id-ID").format(
                          parseInt(rowData.surplus)
                        )}
                      </p>
                    ),
                },
              ]}
              title="Neraca Bapok"
              data={bapok}
              options={{
                search: false,
              }}
            />
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
