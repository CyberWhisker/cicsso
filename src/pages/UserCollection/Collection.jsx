import React, { useEffect, useState } from 'react'
import Master from '../../layouts/Master'
import { Box, Chip, Divider, Drawer, Grid, LinearProgress, MenuItem, Stack, TextField, Typography } from '@mui/material'
import { CustomCard } from '../../components'
import { toast } from 'react-toastify'
import moment from 'moment'
import { fetchCollectionBySchoolYearIdandUserId, fetchCollectionWithTransactionByUserId } from '../../api/CollectionApi'
import { useAuthContext } from '../../hooks/useAuthContext'
import Payment from './Form/Payment'
import { fetchSchoolYear } from '../../api/SchoolYearApi'

function Collection() {
  const { auth } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);
  const [collections, setCollection] = useState([]);
  const [selectedValue, setSelectedValue] = useState('')

  const handleGetData = async (academicId) => {
    setIsLoading(true)
    const { data, error } = await fetchCollectionBySchoolYearIdandUserId(academicId, auth.user._id)
    if (error) {
      toast.error(error)
    } else {
      setCollection(data)
    }
    setIsLoading(false)
  }

  return (
    <Master>
      <Stack spacing={2}>
        <Stack direction={'row'} spacing={2} sx={{ alignItems: 'center' }}>
          <Typography variant="h5" fontWeight='bold'>Collection List Fines:</Typography>
          <AcademicYearList handleGetCollection={handleGetData} setSelectedValue={setSelectedValue} selectedValue={selectedValue} />
        </Stack>
        <Box>
          <Divider />
          {isLoading &&
            <LinearProgress />
          }
        </Box>
        <Box>
          <CollectionList setIsLoading={setIsLoading} handleGetData={() => handleGetData(selectedValue)} collections={collections} />
        </Box>
      </Stack>
    </Master>
  )
}

function CollectionList({ handleGetData, collections }) {
  const [selected, setSelected] = useState([]);
  const [paymentModal, setPaymentModal] = useState(false);
  const { auth } = useAuthContext();

  const handleCloseModal = () => {
    setPaymentModal(false)
  }

  return (
    <Grid container spacing={2}>
      {collections.map((item, index) => {
        if (item.eventId) {
          return (
            <EventCard data={item} setPaymentModal={setPaymentModal} setSelected={setSelected} auth={auth} key={index} />
          )
        } else {
          return (
            <CollectionCard data={item} setPaymentModal={setPaymentModal} setSelected={setSelected} auth={auth} key={index} />
          )
        }
      })}
      <Drawer open={paymentModal} anchor='right' onClose={handleCloseModal}>
        <Payment selected={selected} handleGetData={handleGetData} handleCloseModal={handleCloseModal} />
      </Drawer>
    </Grid>
  )
}

function CollectionCard({ data, setSelected, setPaymentModal, auth }) {
  const handlePaymentModal = async (item) => {
    const dataForm = {
      ...item,
      dataForm: {
        userId: auth.user._id,
        collectionId: item._id,
        payment: 'Cash',
        amount: item.fine,
        file: null,
        status: 'pending',
        date: moment()
      }
    }
    setSelected(dataForm)
    setPaymentModal(true)
  }
  return (
    <Grid
      item
      xs={6}
      md={4}
    >
      <CustomCard>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography textAlign='center' fontWeight='bold' variant='h5' color="primary" noWrap>{data.collectionName}</Typography>
            {data.transaction[0]?.status == 'confirm' && <Chip label='Confirmed' color='success' />}
            {data.transaction[0]?.status == 'pending' && <Chip label='Pending' color='warning' />}
            {data.transaction[0]?.status == 'decline' && <Chip label='Decline' color='error' />}
            {/* {!data.transaction[0]?.status && <Chip label='Unpaid' color='error' />} */}
            {!data.transaction[0]?.status && data?.label == "Urgent" && <Chip label={`${data.label}`} color='error' />}
            {!data.transaction[0]?.status && data?.label == "Mandatory" && <Chip label={`${data.label}`} color='warning' />}
            {!data.transaction[0]?.status && data?.label == "Optional" && <Chip label={`${data.label}`} />}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textDecoration: 'none', minHeight: '15vh' }}
            onClick={() => handlePaymentModal(data)}
          >
            <Typography textAlign='center' fontWeight='bold' variant='h3' color='primary'>₱ {data.fine.toFixed(2)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>AY: {moment(data.startDate).format('MMM DD, YYYY')} - {moment(data.endDate).format('MMM DD, YYYY')}</Typography>
          </Box>
        </Box>
      </CustomCard>
    </Grid>
  )
}

function EventCard({ data, setSelected, setPaymentModal, auth }) {
  const [totalPenalty, setTotalPenalty] = useState(0);
  const [totalFine, setTotalFine] = useState(0);
  const currentDay = moment();

  const handlePenalty = () => {
    let countTotalAttendance = 0;
    let countAttendance = 0;
    let today = moment();
    const filteredSched = data.eventId.schedules.filter((item) => moment(item.date).isSameOrBefore(currentDay, 'day'))
    // countTotalAttendance = filteredSched.length * 4
    filteredSched.map((sched) => {

      if (today.isAfter(sched.amIn)) {
        countTotalAttendance++
      }
      if (today.isAfter(sched.amOut)) {
        countTotalAttendance++
      }
      if (today.isAfter(sched.pmIn)) {
        countTotalAttendance++
      }
      if (today.isAfter(sched.pmOut)) {
        countTotalAttendance++
      }

      if (sched.attendances.length > 0) {
        if (sched.attendances[0].amIn) {
          countAttendance++
        }
        if (sched.attendances[0].amOut) {
          countAttendance++
        }
        if (sched.attendances[0].pmIn) {
          countAttendance++
        }
        if (sched.attendances[0].pmOut) {
          countAttendance++
        }
      }
    })
    setTotalPenalty(countTotalAttendance - countAttendance)
    handleFine(countTotalAttendance, countAttendance)
  }

  const handleFine = (totalAttendance, attendance) => {
    let totalPenalty = totalAttendance - attendance
    setTotalFine(totalPenalty * data.fine)
  }

  const handlePaymentModal = async (item) => {
    const dataForm = {
      ...item,
      dataForm: {
        userId: auth.user._id,
        collectionId: item._id,
        payment: 'Cash',
        amount: totalFine,
        file: null,
        status: 'pending',
        date: moment()
      }
    }
    setSelected(dataForm)
    setPaymentModal(true)
  }

  useEffect(() => {
    handlePenalty()
  }, [])
  return (
    <Grid
      item
      xs={6}
      md={4}
    >
      <CustomCard>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography textAlign='center' fontWeight='bold' variant='h5' color="primary" noWrap>{data.collectionName}</Typography>
            {totalPenalty === 0 ? (
              <>
                {moment(data.endDate).isAfter(currentDay, 'day') ?
                  <Chip label="Upcoming" />
                  :
                  <Chip label="Complete" color="success" />
                }
              </>
            ) : (
              <>
                {data.transaction[0]?.status === 'confirm' && (
                  <Chip label="Paid" color="success" />
                )}
                {data.transaction[0]?.status === 'pending' && (
                  <Chip label="Pending" color="warning" />
                )}
                {data.transaction[0]?.status === 'decline' && (
                  <Chip label="Decline" color="error" />
                )}
                {!data.transaction[0]?.status && (
                  <Chip label="Unpaid" color="error" />
                )}
              </>
            )}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textDecoration: 'none', minHeight: '15vh' }}
            onClick={() => handlePaymentModal(data)}
          >
            <Typography textAlign='center' fontWeight='bold' variant='h3' color='primary'>₱ {totalFine.toFixed(2)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>AY: {moment(data.startDate).format('MMM DD, YYYY')} - {moment(data.endDate).format('MMM DD, YYYY')}</Typography>
            {moment().isAfter(data.endDate) &&
              <Chip label={totalPenalty} color='error' />
            }
          </Box>
        </Box>
      </CustomCard>
    </Grid>
  )
}

function AcademicYearList({ handleGetCollection, selectedValue, setSelectedValue }) {
  const [academicData, setAcademicData] = useState([])

  const handleGetData = async () => {
    const { data, error } = await fetchSchoolYear()
    if (!error) {
      const active = data.find((item) => item.status)
      setSelectedValue(active ? active._id : '')
      setAcademicData(data)
      handleGetCollection(active._id)
    }
  }

  const handleChange = (event) => {
    handleGetCollection(event.target.value)
    setSelectedValue(event.target.value) // Update the selected value
  }

  useState(() => {
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

export default Collection