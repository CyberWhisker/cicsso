import React, { useEffect, useState } from 'react';
import Master from '../../layouts/Master';
import { Box, Card, Divider, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import { fetchTransactionByStatus } from '../../api/TransactionApi';
import { toast } from 'react-toastify';
import moment from 'moment';
import { fetchItem } from '../../api/ItemApi';

function AdminReport() {
  const [reportType, setReportType] = useState('annually');
  const [selectedYear, setSelectedYear] = useState(moment().year()); // Default to current year

  const handleChangeReportType = (e) => {
    setReportType(e.target.value);
  };

  const handleChangeYear = (e) => {
    setSelectedYear(e.target.value);
  };

  return (
    <Master>
      <Stack spacing={1} pb={2}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant='h4' fontWeight={'bold'}>Reports</Typography>
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
            {/* Assuming you want to show a range of years */}
            {[2022, 2023, 2024, 2025, 2026].map(year => (
              <MenuItem key={year} value={year}>{year}</MenuItem>
            ))}
          </TextField>
        </Box>
        <Divider />
        <TransactionReport reportType={reportType} selectedYear={selectedYear} />
        <DisbursementReport reportType={reportType} selectedYear={selectedYear} />
      </Stack>
    </Master>
  );
}

function TransactionReport({ reportType, selectedYear }) {
  const [dataValue, setDataValue] = useState([]);
  const [dataName, setDataName] = useState([]);

  const handleGetTransaction = async () => {
    const transactionStatus = 'confirm'
    try {
      const { data, error } = await fetchTransactionByStatus(transactionStatus);
      if (error) {
        toast.error(error);
        return; 
      }

      // Filter data by selected year
      const filteredByYear = data.filter(item => moment(item.date).year() === parseInt(selectedYear));

      let filteredData;
      switch (reportType) {
        case 'monthly':
          filteredData = filterMonthly(filteredByYear);
          break;
        case 'quarterly':
          filteredData = filterQuarterly(filteredByYear);
          break;
        case 'annually':
          filteredData = filterAnnually(filteredByYear);
          break;
        default:
          filteredData = { name: [], value: [] };
      }

      setDataName(filteredData.name);
      setDataValue(filteredData.value);
    } catch (err) {
      toast.error("Failed to fetch transactions."); 
    }
  };

  useEffect(() => {
    handleGetTransaction();
  }, [reportType, selectedYear]); // Run when reportType or selectedYear changes

  return (
    <Stack spacing={2}>
      <Typography variant='h5' fontWeight={'bold'}>Transaction Report</Typography>
      <Card sx={{ display: 'flex' }}>
        <BarChart
          xAxis={[{ scaleType: 'band', data: dataName }]}
          series={[{ label: 'Amount', data: dataValue }]}
          width={1000}
          height={300}
        />
      </Card>
      <Divider/>
    </Stack>
  );
}

function DisbursementReport({ reportType, selectedYear }) {
  const [dataValue, setDataValue] = useState([]);
  const [dataName, setDataName] = useState([]);
  const [dataRemaining, setDataRemaining] = useState([]);
  const [transValue, setTransValue] = useState([]);

  const handleGetTransaction = async () => {
    const transactionStatus = 'confirm'
    try {
      const [
        {data: transData, error: transError},
        {data: itemData, error: itemError},
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
      <Typography variant='h5' fontWeight={'bold'}>Disbursement Report</Typography>
      <Card sx={{ display: 'flex' }}>
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
      </Card>
    </Stack>
  );
}

function filterMonthly(data) {
  const monthNames = moment.months();
  let value = new Array(12).fill(0); 

  data.forEach(item => {
    const monthIndex = moment(item.date).month(); 
    value[monthIndex] += item.amount; 
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
    const amount = item.amount;

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
    const year = moment(item.date).format('YYYY');
    totalAmount[year] = (totalAmount[year] || 0) + item.amount;
  });
  return {
    name: Object.keys(totalAmount),
    value: Object.values(totalAmount)
  };
}

export default AdminReport;
