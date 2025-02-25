import React, { useEffect, useMemo, useRef, useState } from 'react';
import Master from '../../layouts/Master';
import { Box, Button, Card, Chip, Divider, Grid, Menu, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import { fetchTransactionByStatus, fetchTransactions } from '../../api/TransactionApi';
import { toast } from 'react-toastify';
import moment from 'moment';
import { fetchItem, fetchItemWithProject } from '../../api/ItemApi';
import { DataGrid } from '@mui/x-data-grid';
import { useReactToPrint } from 'react-to-print';
import CollectionList from './Reports/CollectionList';
import ReceivableAmount from './Reports/ReceivableAmount';
import DisbursementReport from './Reports/DisbursementReport';
import { fetchSchoolYear } from '../../api/SchoolYearApi';
import ReceivableAmountOptional from './Reports/ReceivableAmountOptional';
import { ArrowDropDown, Print } from '@mui/icons-material';
import CollectionReport from './Reports/CollectionReport';
import FinancialReport from './Reports/FinancialReport';
import ReceivableReport from './Reports/ReceivableReport';

function AdminReport() {
  const [reportType, setReportType] = useState('annually');
  const [selectedYear, setSelectedYear] = useState(moment().year()); // Default to current year
  const [selectedAY, setselectedAY] = useState('')

  const handleChangeReportType = (e) => {
    setReportType(e.target.value);
  };

  const handleChangeYear = (e) => {
    setSelectedYear(e.target.value);
  };

  const contentRef = useRef(null);
  const printFile = useReactToPrint({ contentRef })

  return (
    <Master>
      <Stack spacing={1} pb={2}>
        <Stack justifyContent={'space-between'} direction={'row'} alignItems={'center'}>
          <Stack direction={'row'} spacing={2}>
            <Typography variant='h4' fontWeight={'bold'}>Reports</Typography>
            <Printool selectedAY={selectedAY} />
          </Stack>
          <AcademicYearList setSelectedValue={setselectedAY} selectedValue={selectedAY} />
        </Stack>
        <Divider />
        <Grid container gap={2} alignItems="stretch">
          <Grid item xs={5}>
            <CollectionList selectedAY={selectedAY} />
          </Grid>
          <Grid item xs={6.8}>
            <Stack spacing={2} sx={{ height: '100%' }}>
              <ReceivableAmount selectedAY={selectedAY} />
              <ReceivableAmountOptional selectedAY={selectedAY} />
            </Stack>
          </Grid>
        </Grid>
        {/* <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Stack spacing={2} direction={'row'}>
            <Button variant='contained' color='warning' onClick={printFile}>Print</Button>
          </Stack>
          <TextField
            select
            size='small'
            label='Report Type'
            sx={{ width: '30vh' }}
            value={reportType}
            onChange={handleChangeReportType}
          >
            <MenuItem value='monthly'>Monthly</MenuItem>
            <MenuItem value='quarterly'>Quarterly</MenuItem>
            <MenuItem value='annually'>Annually</MenuItem>
          </TextField>
          <TextField
            select
            size='small'
            label='Year'
            sx={{ width: '30vh' }}
            value={selectedYear}
            onChange={handleChangeYear}
          >
            {[2022, 2023, 2024, 2025, 2026].map(year => (
              <MenuItem key={year} value={year}>{year}</MenuItem>
            ))}
          </TextField>
        </Box> */}
        <Stack spacing={2} ref={contentRef} margin={2}>

          {/* <CollectionReport reportType={reportType} selectedYear={selectedYear} />
          <ExpensesReport reportType={reportType} selectedYear={selectedYear} /> */}
          {/* <DispursementReport /> */}
        </Stack>
      </Stack>
    </Master>
  );
}

// function CollectionReport({ reportType, selectedYear }) {
//   const [dataValue, setDataValue] = useState([]);
//   const [dataName, setDataName] = useState([]);

//   const handleGetTransaction = async () => {
//     const transactionStatus = 'confirm'
//     try {
//       const { data, error } = await fetchTransactionByStatus(transactionStatus);
//       if (error) {
//         toast.error(error);
//         return;
//       }

//       // Filter data by selected year
//       const filteredByYear = data.filter(item => moment(item.date).year() === parseInt(selectedYear));

//       let filteredData;
//       switch (reportType) {
//         case 'monthly':
//           filteredData = filterMonthly(filteredByYear);
//           break;
//         case 'quarterly':
//           filteredData = filterQuarterly(filteredByYear);
//           break;
//         case 'annually':
//           filteredData = filterAnnually(filteredByYear);
//           break;
//         default:
//           filteredData = { name: [], value: [] };
//       }

//       setDataName(filteredData.name);
//       setDataValue(filteredData.value);
//     } catch (err) {
//       toast.error("Failed to fetch transactions.");
//     }
//   };

//   useEffect(() => {
//     handleGetTransaction();
//   }, [reportType, selectedYear]); // Run when reportType or selectedYear changes
//   return (
//     <Stack spacing={2}>
//       <Card sx={{ display: 'flex', p: 1 }}>
//         <Stack spacing={2}>
//           <Typography variant='h5' fontWeight={'bold'}>Collection Report:</Typography>
//           <BarChart
//             xAxis={[{ scaleType: 'band', data: dataName }]}
//             series={[{ label: 'Amount', data: dataValue }]}
//             width={1000}
//             height={300}
//           />
//         </Stack>
//       </Card>
//       <Divider />
//     </Stack>
//   );
// }

function ExpensesReport({ reportType, selectedYear }) {
  const [dataValue, setDataValue] = useState([]);
  const [dataName, setDataName] = useState([]);
  const [dataRemaining, setDataRemaining] = useState([]);
  const [transValue, setTransValue] = useState([]);

  const handleGetTransaction = async () => {
    const transactionStatus = 'confirm'
    try {
      const [
        { data: transData, error: transError },
        { data: itemData, error: itemError },
      ] = await Promise.all([
        fetchTransactionByStatus(transactionStatus),
        fetchItem(),
      ]);
      if (itemError || transError) {
        toast.error("Something went Wrong");
        return;
      }

      // Filter data by selected year
      const filteredByYearItem = itemData.filter(item => moment(item.date).year() === parseInt(selectedYear));
      const filteredByYearTrans = transData.filter(item => moment(item.date).year() === parseInt(selectedYear));

      let filteredDataItem;
      let filteredDataTrans;
      switch (reportType) {
        case 'monthly':
          filteredDataItem = filterMonthly(filteredByYearItem);
          filteredDataTrans = filterMonthly(filteredByYearTrans);
          break;
        case 'quarterly':
          filteredDataItem = filterQuarterly(filteredByYearItem);
          filteredDataTrans = filterQuarterly(filteredByYearTrans);
          break;
        case 'annually':
          filteredDataItem = filterAnnually(filteredByYearItem);
          filteredDataTrans = filterAnnually(filteredByYearTrans);
          break;
        default:
          filteredDataItem = { name: [], value: [] };
      }
      let remain;
      if (filteredDataItem.value.length > 0) {
        remain = filteredDataTrans.value.map((num, index) => num - filteredDataItem.value[index]);
      } else {
        remain = filteredDataTrans.value
      }
      setDataName(filteredDataItem.name.lengt > 0 ? filteredDataItem.name : filteredDataTrans.name);
      setDataValue(filteredDataItem.value);
      setTransValue(filteredDataTrans.value);
      setDataRemaining(remain);
    } catch (err) {
      toast.error("Failed to fetch transactions.");
    }
  };

  useEffect(() => {
    handleGetTransaction();
  }, [reportType, selectedYear]); // Run when reportType or selectedYear changes

  return (
    <Stack spacing={2}>
      <Card sx={{ display: 'flex', p: 1 }}>
        <Stack spacing={2}>
          <Typography variant='h5' fontWeight={'bold'}>Expenses Report:</Typography>
          <BarChart
            xAxis={[{ scaleType: 'band', data: dataName }]}
            // series={[{ label: 'Total Funds', data: transValue, color: 'green' }, { label: 'Project Cost', data: dataValue, color: 'red' }]}
            series={[
              { label: 'Total Funds', data: transValue, color: 'green' },
              { data: dataRemaining, label: 'Remaining Funds', id: 'pvId', stack: 'total' },
              { data: dataValue, label: 'Project Cost', id: 'uvId', stack: 'total', color: 'red' },
            ]}
            width={1000}
            height={300}
          />
        </Stack>
      </Card>
    </Stack>
  );
}

function filterMonthly(data) {
  const monthNames = moment.months();
  let value = new Array(12).fill(0);

  data.forEach(item => {
    let amount = item.amount
    const monthIndex = moment(item.date).month();
    if (item.quantity) {
      amount = item.amount * item.quantity
    }
    value[monthIndex] += amount;
  });

  return { name: monthNames, value };
}

function filterQuarterly(data) {
  const Quarterly = [
    ['January', 'February', 'March'],
    ['April', 'May', 'June'],
    ['July', 'August', 'September'],
    ['October', 'November', 'December']
  ];

  const totalAmount = [0, 0, 0, 0];

  data.forEach(item => {
    const month = moment(item.date).format('MMMM');
    let amount = item.amount;

    if (item.quantity) {
      amount = item.amount * item.quantity
    }

    Quarterly.forEach((quarter, index) => {
      if (quarter.includes(month)) {
        totalAmount[index] += amount;
      }
    });
  });
  return {
    name: totalAmount.map((_, index) => `Quarter ${index + 1}`),
    value: totalAmount
  };
}

function filterAnnually(data) {
  const totalAmount = {};

  data.forEach(item => {
    let total = item.amount
    const year = moment(item.date).format('YYYY');
    if (item.quantity) {
      total = item.amount * item.quantity
    }
    totalAmount[year] = (totalAmount[year] || 0) + total;
  });
  return {
    name: Object.keys(totalAmount),
    value: Object.values(totalAmount)
  };
}

function DispursementReport() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleGetData = async () => {
    const [
      { data: transData, error: transError },
      { data: itemData, error: itemError },
    ] = await Promise.all([
      fetchTransactions(),
      fetchItemWithProject()
    ]);

    if (!transError && !itemError) {
      // Combine transData and itemData
      const combinedData = [...transData, ...itemData];

      // Sort by createdAt in ascending order
      combinedData.sort((a, b) => new Date(b.date) - new Date(a.date));

      // Set the combined and sorted data
      setData(combinedData);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetData()
  }, [])

  const columns = [
    {
      field: 'id',
      headerName: 'Id',
      flex: 1,
      headerAlign: 'center',
    },
    {
      field: 'collectionProject',
      headerName: 'Collection / Project',
      flex: 1,
      headerAlign: 'center'
    },
    {
      field: 'group',
      headerName: 'Group Folder',
      flex: 1,
      headerAlign: 'center'
    },
    {
      field: 'itemName',
      headerName: 'Item / Name',
      flex: 1,
      headerAlign: 'center',
    },
    {
      field: 'amount',
      headerName: 'Amount',
      flex: 1,
      headerAlign: 'center',
    },
    {
      field: 'type',
      headerName: 'Type',
      flex: 1,
      headerAlign: 'center',
      renderCell: (params) => (
        <Box sx={{ textAlign: 'center' }}>
          {params.row.type == "Inflow" && (
            <Chip label="Inflow" color='success' />
          )}
          {params.row.type == "Outflow" && (
            <Chip label="Outflow" color='error' />
          )}
        </Box>
      ),
    },
  ]

  const rows = useMemo(() =>
    data.map((item) => ({
      ...item,
      id: item._id,
      collectionProject: item?.project ? 'Project' : 'Collection',
      group: item?.project?.project || item?.collectionId?.collectionName,
      itemName: item?.item || `${item?.userId?.lastName}, ${item?.userId?.firstName} ${item?.userId?.middleName}`,
      type: item?.project ? 'Outflow' : 'Inflow',
      amount: item.quantity ? item.amount * item.quantity : item.amount
    })),
    [data]
  );
  return (
    <>
      <Divider />
      <Card sx={{ p: 1 }}>
        <Stack spacing={2}>
          <Typography variant='h5' fontWeight={'bold'}>Disbursement Record:</Typography>
          <DataGrid
            loading={isLoading}
            columns={columns}
            rows={rows}
          />
        </Stack>
      </Card>
    </>
  )
}

function AcademicYearList({ setSelectedValue, selectedValue }) {
  const [academicData, setAcademicData] = useState([])

  const handleGetData = async () => {
    const { data, error } = await fetchSchoolYear()
    if (!error) {
      const active = data.find((item) => item.status)
      setSelectedValue(active ? active._id : '')
      setAcademicData(data)
    }
  }

  const handleChange = (event) => {
    setSelectedValue(event.target.value) // Update the selected value
  }

  useEffect(() => {
    handleGetData()
  }, [])
  return (
    <TextField sx={{ width: '60vh' }} label="Academic Year" select value={selectedValue} onChange={handleChange}>
      {academicData.map((item, index) => (
        <MenuItem value={item._id} key={index}>{item.semester} A.Y ({moment(item.startDate).format('MMM-DD-YYYY')} to {moment(item.endDate).format('MMM-DD-YYYY')})</MenuItem>
      ))}
    </TextField>
  )
}

function Printool({ selectedAY }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box>
      <Button variant='contained' color='warning' onClick={handleClick} endIcon={<ArrowDropDown />}>Print</Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <CollectionReport selectedAY={selectedAY} />
        <ReceivableReport selectedAY={selectedAY} />
        <FinancialReport selectedAY={selectedAY} />
        <DisbursementReport selectedAY={selectedAY} />
      </Menu>

    </Box>
  )
}

export default AdminReport;
