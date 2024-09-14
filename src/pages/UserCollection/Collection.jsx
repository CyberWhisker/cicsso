import React, { useEffect, useState } from 'react'
import Master from '../../layouts/Master'
import { Box, Chip, Divider, Drawer, Grid, LinearProgress, Stack, Typography } from '@mui/material'
import { CustomCard } from '../../components'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import moment from 'moment'
import { fetchCollections } from '../../api/CollectionApi'
import { fetchTransactionByUserId } from '../../api/TransactionApi'
import { useAuthContext } from '../../hooks/useAuthContext'
import Payment from './Form/Payment'

function Collection() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <Master>
      <Stack spacing={2}>
        <Typography variant="h5" fontWeight='bold'>Collection List:</Typography>
        <Box>
          <Divider/>
          {isLoading &&
            <LinearProgress/>
          }
        </Box>
        <Box>
          <CollectionList setIsLoading={setIsLoading}/>
        </Box>
      </Stack>
    </Master>
  )
}

function CollectionList({setIsLoading}) {
  const [selected, setSelected] = useState([]);
  const [collections, setCollection] = useState([]);
  const [paymentModal, setPaymentModal] = useState(false);
  const {auth} = useAuthContext();
  
  const handleGetData = async () => {
    setIsLoading(true)
    const [
        {data: collectionData, error: collectionError},
        {data: transactionData, error: transactionError}
    ] = await Promise.all([
        fetchCollections(),
        fetchTransactionByUserId(auth.user._id)
    ]);
    if (collectionError || transactionError) {
      setIsLoading(false)
      toast.error(error)
    } else {
      setIsLoading(false)
      const combinedData = collectionData.map(collect => ({
        ...collect,
        transaction: transactionData.find(trans => trans.collectionId == collect._id)
      }))
      setCollection(combinedData)
    }
  }

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

  const handleCloseModal = () => {
    setPaymentModal(false)
  }

  useEffect(() => {
    handleGetData()
  },[])
  
  return (
    <Grid container spacing={2}>
      {collections.map((item, index) => (
        <Grid 
        item 
        xs={6} 
        md={4}
        key={index}
        >
          <CustomCard>
            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
              <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <Typography textAlign='center' fontWeight='bold' variant='h5' color="primary">{item.collectionName}</Typography>
                  {item.transaction?.status == 'confirm' && <Chip label='Confirmed' color='success'/>}
                  {item.transaction?.status == 'pending' && <Chip label='Pending' color='warning'/>}
                  {item.transaction?.status == 'decline' && <Chip label='Decline' color='error'/>}
                  {!item.transaction?.status && <Chip label='Unpaid' color='error'/>}
              </Box>
              <Box sx={{display: 'flex',flexDirection: 'column' ,justifyContent: 'center', textDecoration: 'none', minHeight: '15vh'}} 
                  onClick={() => handlePaymentModal(item)}
              >
                  <Typography textAlign='center' fontWeight='bold' variant='h3' color='primary'>₱ {item.fine}</Typography>
              </Box>
              <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                  <Typography>AY: {moment(item.startDate).format('MMM DD, YYYY')} - {moment(item.endDate).format('MMM DD, YYYY')}</Typography>
              </Box>
            </Box>
          </CustomCard>
        </Grid>
      ))}
      <Drawer open={paymentModal} anchor='right' onClose={handleCloseModal}>
        <Payment selected={selected} handleGetData={handleGetData} handleCloseModal={handleCloseModal}/>
      </Drawer>
    </Grid>
  )
}

export default Collection