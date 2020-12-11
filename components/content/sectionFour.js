import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import MaterialTable from "material-table";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const month = [
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

export default function SectionFour(props) {
  const { dataBapok } = props;
  const [bapokBulan, setBapokBulan] = useState(null);
  const [bapokTahun, setBapokTahun] = useState(null);
  const [filterMonth, setFilterMonth] = useState(12);
  const groupByBulan = groupBy(dataBapok, (komo) => komo.bulan);
  const groupByKomoditas = groupBy(dataBapok, (item) => item.komoditas);

  useEffect(() => {
    filterKomoditasData(groupByBulan, filterMonth);
  }, [dataBapok, filterMonth]);

  useEffect(() => {
    filterBapokPerTahun(groupByKomoditas);
  }, [dataBapok]);

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

  function filterKomoditasData(data, filterMonth) {
    const filteredData = data.get(filterMonth);

    // count surpluse/minus
    filteredData.map((item, index) => {
      const surplus = item.ketersediaan - item.kebutuhan;
      item.surplus = surplus;
    });

    setBapokBulan(filteredData);
  }

  function filterBapokPerTahun(data) {
    let holder = [];

    data.forEach((value, key, map) => {
      const komoditas = key;
      // console.log(value);
      const kebutuhan = value.reduce((total, obj) => obj.kebutuhan + total, 0);
      const ketersediaan = value.reduce(
        (total, obj) => obj.ketersediaan + total,
        0
      );
      // console.log(kebutuhan);

      holder.push({ komoditas, kebutuhan, ketersediaan });
    });

    // count surpluse/minus
    holder.map((item, index) => {
      const surplus = item.ketersediaan - item.kebutuhan;
      item.surplus = surplus;
    });

    // console.log(holder);
    setBapokTahun(holder);
  }

  const handleFilter = (event) => {
    setFilterMonth(event.target.value);
  };

  return (
    <Grid container item direction="row" xs={12} spacing={4}>
      <Grid item xs={12} md={12} lg={6}>
        <Box borderRadius={16} boxShadow={3}>
          {bapokBulan && (
            <MaterialTable
              columns={[
                {
                  title: "Komoditas",
                  field: "komoditas",
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
                  field: "kebutuhan",
                  type: "numeric",
                  render: (RowData) =>
                    new Intl.NumberFormat("id-ID").format(
                      parseInt(RowData.kebutuhan)
                    ),
                },
                {
                  title: "Ketersediaan",
                  field: "ketersediaan",
                  type: "numeric",
                  render: (RowData) =>
                    new Intl.NumberFormat("id-ID").format(
                      parseInt(RowData.ketersediaan)
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
              title="Komoditas Bulanan"
              data={bapokBulan}
              options={{
                search: false,
              }}
              actions={[
                {
                  isFreeAction: true,
                  icon: (props) => (
                    <FormControl>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={filterMonth}
                        onChange={handleFilter}
                      >
                        {month.map((item, index) => (
                          <MenuItem key={index} value={index + 1}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ),
                },
              ]}
            />
          )}
        </Box>
      </Grid>
      <Grid item xs={12} md={12} lg={6}>
        <Box borderRadius={16} boxShadow={3}>
          {bapokTahun && (
            <MaterialTable
              columns={[
                {
                  title: "Komoditas",
                  field: "komoditas",
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
                  field: "kebutuhan",
                  type: "numeric",
                  render: (RowData) =>
                    new Intl.NumberFormat("id-ID").format(
                      parseInt(RowData.kebutuhan)
                    ),
                },
                {
                  title: "Ketersediaan",
                  field: "ketersediaan",
                  type: "numeric",
                  render: (RowData) =>
                    new Intl.NumberFormat("id-ID").format(
                      parseInt(RowData.ketersediaan)
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
              title="Komoditas per Tahun"
              data={bapokTahun}
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
