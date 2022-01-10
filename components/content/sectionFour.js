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
  const { dataBapok, dataPelindo, year } = props;
  const [bapokBulan, setBapokBulan] = useState(null);
  const [neracaBapokBulan, setNeracaBapokBulan] = useState(null);
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
    setDataNeracaBapok(filteredData)
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

  function setDataNeracaBapok(filteredData){
    const date = new Date();
    const thisMonth = date.getMonth() + 1;
    let dataPelindoMonth = dataPelindo.filter(e => {
      var [year, month] = e.TGL_TRANSAKSI.split('-'); // Or, var month = e.date.split('-')[1];
      return (thisMonth === +month) && (year == year);
    });

    filteredData.forEach(row => {
      // console.log(row.komoditas);
      row.bongkar = getTotalBongkar(dataPelindoMonth, row.komoditas)
      row.muat = getTotalMuat(dataPelindoMonth, row.komoditas) 
      row.surplus_new = row.ketersediaan - row.kebutuhan - row.muat + row.bongkar
    })

    setNeracaBapokBulan(filteredData)
    // console.log(filteredData)
  }

  
  // categorized data
  const getTotalBongkar = (data, komoditas) => {
    const totalBongkar = data.filter((item, index) => {
      return item.JENIS === "BONGKAR" && item.KOMODITAS === komoditas;
    });
    let totalAfterParse = parseVolumeData(totalBongkar)
    let total = 0;
    totalAfterParse.forEach((row) => {
      total += row.volume;
    })

    return total;
  };

  // categorized data
  const getTotalMuat = (data, komoditas) => {
     const totalMuat = data.filter((item, index) => {
        return item.JENIS === "MUAT" && item.KOMODITAS === komoditas;
      });
      let totalAfterParse = parseVolumeData(totalMuat)
      let total = 0;
      totalAfterParse.forEach((row) => {
        total += row.volume;
      })
  
      return total;
  };

  // parse volume data
  const parseVolumeData = (data) => {
    const tempData = {};
    let volume = 0;
    data.forEach((item, index) => {
      if (!tempData.hasOwnProperty(item.KOMODITAS)) {
        item.SATUAN === "TON"
          ? (volume += parseInt(item.VOLUME) * 1000)
          : (volume += parseInt(item.VOLUME));

        tempData[item.KOMODITAS] = volume;
      } else {
        item.SATUAN === "TON"
          ? (volume += parseInt(item.VOLUME) * 1000)
          : (volume += parseInt(item.VOLUME));

        tempData[item.KOMODITAS] = volume;
      }
    });

    // sort data by volume
    const sortedTempData = Object.fromEntries(
      Object.entries(tempData).sort(([, a], [, b]) => b - a)
    );

    const top = 10;
    const list = Object.entries(sortedTempData)
      .slice(0, top)
      .map(([key, value], index) => ({
        no: index + 1,
        name: key,
        volume: value,
      }));

    // console.log(list);
    return list;
  };

  return (
    <>
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
      <Grid container item direction="row" xs={12} spacing={4}>
      <Grid item xs={12} md={12} lg={12}>
        <Box borderRadius={16} boxShadow={3}>
          {neracaBapokBulan && (
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
                  title: "Muat",
                  field: "muat",
                  type: "numeric",
                  render: (RowData) =>
                    new Intl.NumberFormat("id-ID").format(
                      parseInt(RowData.muat)
                    ),
                },
                {
                  title: "Bongkar",
                  field: "bongkar",
                  type: "numeric",
                  render: (RowData) =>
                    new Intl.NumberFormat("id-ID").format(
                      parseInt(RowData.bongkar)
                    ),
                },
                {
                  title: "Surplus/Minus",
                  field: "surplus",
                  type: "numeric",
                  render: (rowData) =>
                      rowData.surplus_new < 0 ? (
                        <p style={{ color: "#f44336", textAlign: "right" }}>
                          {new Intl.NumberFormat("id-ID").format(
                            parseInt(rowData.surplus_new)
                          )}
                        </p>
                      ) : (
                        <p style={{ color: "#4caf50", textAlign: "right" }}>
                          {new Intl.NumberFormat("id-ID").format(
                            parseInt(rowData.surplus_new)
                          )}
                        </p>
                      ),
                }
              ]}
              title="Neraca Dagang Bapok"
              data={neracaBapokBulan}
              options={{
                search: false,
              }}
            />
          )}
        </Box>
      </Grid>
    </Grid>
    </>
  );
}

