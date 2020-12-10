import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import MaterialTable from 'material-table';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Receipts(props) {
  const { receipts, categories, handleOnRowClick } = props;
  const classes = useStyles();

  let lookupCategory = {};
  // console.log('receipts: ' + receipts);
  // console.log('categories: ' + categories);
  categories.map(category => {
    lookupCategory[category.id] = category.name;
  });

  // table columns setting
  const TableColumns = [
    {
      title: 'Date',
      field: 'date',
      type: 'date',
      dateSetting: { locale: 'ja' },
    },
    { title: 'Category', field: 'id_category', lookup: lookupCategory },
    { title: 'Memo', field: 'memo' },
    {
      title: 'Type',
      field: 'type',
      lookup: { income: 'Income', expense: 'Expenses' },
    },
    {
      title: 'Amount',
      field: 'amount',
      type: 'currency',
      currencySetting: {
        locale: 'tw',
        currencyCode: 'NTD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      },
    },
  ];

  // table actions settings
  const TableActions = [
    {
      icon: 'edit',
      tooltip: 'View',
      onClick: (event, rowData) => console.log(rowData),
    },
  ];

  // table options settings
  const TableOptions = {
    actionsColumnIndex: -1,
  };

  // debugging
  // console.log(TableColumns);

  return (
    <MaterialTable
      title="This Month Receipts"
      columns={TableColumns}
      data={receipts}
      // actions={TableActions}
      options={TableOptions}
      onRowClick={(event, rowData) => handleOnRowClick(rowData)}
    />
  );
}
