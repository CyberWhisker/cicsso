import React, { useEffect, useState } from 'react'
import Master from '../../layouts/Master'
import { Box, Chip, Divider, Drawer, Grid, LinearProgress, Stack, Typography } from '@mui/material'
import { CustomCard } from '../../components'
import { toast } from 'react-toastify'
import moment from 'moment'
import { fetchCollectionWithTransactionByUserId } from '../../api/CollectionApi'
import { useAuthContext } from '../../hooks/useAuthContext'
import Payment from './Form/Payment'

function Collection() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <Master>
      <Stack spacing={2}>
        <Typography variant="h5" fontWeight='bold'>Collection List Fines:</Typography>
        <Box>
          <Divider />
          {isLoading &&
            <LinearProgress />
          }
        </Box>
        <Box>
          <CollectionList setIsLoading={setIsLoading} />
        </Box>
      </Stack>
    </Master>
  )
}

function CollectionList({ setIsLoading }) {
  const [selected, setSelected] = useState([]);
  const [collections, setCollection] = useState([]);
  const [paymentModal, setPaymentModal] = useState(false);
  const { auth } = useAuthContext();

  const handleGetData = async () => {
    setIsLoading(true)
    const { data, error } = await fetchCollectionWithTransactionByUserId(auth.user._id)
    if (error) {
      toast.error(error)
    } else {
      setCollection(data)
    }
    setIsLoading(false)
  }

  const handleCloseModal = () => {
    setPaymentModal(false)
  }

  useEffect(() => {
    handleGetData()
  }, [])

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

  const handlePenalty = () => {
    let countTotalAttendance = 0;
    let countAttendance = 0;
    countTotalAttendance = data.eventId.schedules.length * 4
    data.eventId.schedules.map((sched) => {
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
              <Chip label="Confirmed" color="success" />
            ) : (
              <>
                {data.transaction[0]?.status === 'confirm' && (
                  <Chip label="Confirmed" color="success" />
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
            <Chip label={totalPenalty} color='error' />
          </Box>
        </Box>
      </CustomCard>
    </Grid>
  )
}

export default Collection