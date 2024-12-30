import React, { useEffect, useState } from 'react'
import Master from '../../layouts/Master'
import { Box, Button, Card, Chip, Container, Divider, Paper, Stack, Typography } from '@mui/material'
import { fetchNotification, fetchNotificationByUserId } from '../../api/NotificationApi'
import { toast } from 'react-toastify'
import { Delete as Trashbin } from '@mui/icons-material'
import { AlertModal } from '../../components'
import Delete from './Form/Delete'
import { useAuthContext } from '../../hooks/useAuthContext'

function Notification() {
  return (
    <Master>
      <Stack spacing={2}>
        <Typography variant='h4' fontWeight={'bold'}>Notification:</Typography>
        <Divider />

        <NotificationList />

      </Stack>
    </Master>
  )
}

// add update
function NotificationList() {
  const { auth } = useAuthContext()
  const [notificationData, setNotificationData] = useState([])
  const [deleteModal, setDeleteModal] = useState(false)
  const [selected, setSelected] = useState({})

  const handleDeleteModal = (data) => {
    setSelected(data)
    setDeleteModal(true)
  }

  const handleCloseModal = () => {
    setDeleteModal(false)
  }

  const handleGetNotification = async () => {
    if (auth.user.role == 'admin') {
      const { data, error } = await fetchNotification()
      if (error) {
        toast.error(error)
      } else {
        setNotificationData(data)
      }
    } else {
      const { data, error } = await fetchNotificationByUserId(auth.user._id)
      if (error) {
        toast.error(error)
      } else {
        setNotificationData(data)
      }
    }
  }

  useEffect(() => {
    handleGetNotification()
  }, [])

  return (
    <Stack spacing={2}>
      {notificationData.map((item, index) => (
        <Card key={index} sx={{ p: 2 }}>
          <Stack spacing={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography fontWeight={'bold'} variant='h5'>Title: {item.transactionId?.collectionId?.collectionName || "Removed"}</Typography>
              <Button variant='outlined' color='error' onClick={() => handleDeleteModal(item)}><Trashbin /></Button>
            </Box>
            <Typography>Name: {item?.userId?.lastName || "Removed"}, {item?.userId?.firstName || "Removed"} {item?.userId?.middleName || "Removed"}</Typography>
            <Divider />
            <Container>
              <Typography>
                {item?.message || "Removed"}
              </Typography>
            </Container>
            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
              <Stack direction={'row'} spacing={2}>
                <Typography fontWeight={'bold'} variant='h5'>Payment: {item?.transactionId?.payment || "Removed"}</Typography>
                <Chip label={
                  <Typography fontWeight={'bold'} variant='h5'>Amount: ₱ {item?.transactionId?.amount.toFixed(2) || "Removed"}</Typography>
                } color='success' />
              </Stack>
            </Box>
          </Stack>
        </Card>
      ))}
      <AlertModal open={deleteModal} onClose={handleCloseModal}>
        <Delete onClose={handleCloseModal} selected={selected} handleGetData={handleGetNotification} />
      </AlertModal>
    </Stack>
  )
}

export default Notification