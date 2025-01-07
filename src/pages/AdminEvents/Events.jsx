import React, { useEffect, useState } from 'react'
import Master from '../../layouts/Master'
import { Box, Card, Chip, Divider, Drawer, Grid, LinearProgress, MenuItem, Stack, Typography } from '@mui/material'
import { CustomCard, DeleteModal, DropDown } from '../../components'
import { Add, Error, Folder } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import Store from './Form/Store'
import Update from './Form/Update'
import moment from 'moment';
import { fetchActiveSchoolYear } from '../../api/SchoolYearApi'
import { toast } from 'react-toastify'
import { fetchEvent, fetchEventBySchoolYear } from '../../api/EventApi'

function Events() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <Master>
      <Stack direction={'column'} spacing={2}>
        <Typography variant="h5" fontWeight='bold'>Events :</Typography>
        <Box>
          <Divider />
          {isLoading && (
            <LinearProgress />
          )}
        </Box>
        <Box>
          <EventList setIsLoading={setIsLoading} />
        </Box>
      </Stack>
    </Master>
  )
}

function EventList({ setIsLoading }) {
  const [schoolYearStatus, setSchoolYearStatus] = useState(false);
  const [events, setEvents] = useState([]);
  const [storeModal, setStoreModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateData, setUpdateData] = useState([]);
  const [deleteApi, setDeleteApi] = useState();
  const [selectedId, setSelectedId] = useState();

  const handleCloseModal = () => {
    setStoreModal(false);
    setUpdateModal(false);
    setDeleteModal(false);
  }

  const handleUpdate = (data) => {
    setUpdateModal(true);
    setUpdateData(data);
  }
  const handleDelete = (id) => {
    setDeleteModal(true);
    setSelectedId(id)
    setDeleteApi(`${import.meta.env.VITE_API}/api/event/${id}`)
  }

  const handleGetActiveSchoolYear = async () => {
    const { data, error } = await fetchActiveSchoolYear();
    if (error) {
      toast.error("No Active School Year")
      setSchoolYearStatus(false)
    } else {
      setSchoolYearStatus(true)
      return data
    }
  }

  const handleGetEvent = async () => {
    const activeSchool = await handleGetActiveSchoolYear()
    if (activeSchool) {
      const { data, error } = await fetchEventBySchoolYear(activeSchool._id);
      if (error) {
        toast.error(error)
      } else {
        setEvents(data)
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    handleGetEvent();
    handleGetActiveSchoolYear()
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={6}
        md={4}
      >

        {!schoolYearStatus && (
          <Card sx={{ height: '100%' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '27vh',
              }}>
              <Typography fontWeight='bold'>There is no Active School Year</Typography>
              <Error color='error' sx={{ fontSize: { xs: '5vh', md: '8vh' } }} />
            </Box>
          </Card>
        )}
        {schoolYearStatus && (
          <CustomCard>
            <Box
              onClick={() => setStoreModal(true)}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '23vh',
              }}>
              <Typography fontWeight='bold'>Add Event</Typography>
              <Add sx={{ fontSize: { xs: '5vh', md: '8vh' } }} />
            </Box>
          </CustomCard>
        )}
      </Grid>
      {events.map((item, index) => {
        let today = moment().startOf('day');  // Normalize to the start of today (midnight)
        let startDate = moment(item.startDate).startOf('day');  // Normalize start date to midnight
        let endDate = moment(item.endDate).startOf('day');  // Normalize end date to midnight
        // Determine status based on today's date
        let status = '';
        let color = '';

        if (today < startDate) {
          status = 'Pending';
          color = 'warning';  // You can use 'warning' for pending status
        }
        if (today.isBetween(startDate, endDate, null, '[]')) {
          status = 'Ongoing';
          color = 'success';  // Success status if today is within the event period
        }
        if (today > endDate) {
          status = 'Expired';
          color = 'error';    // Expired status if today is past the end date
        }
        return (
          <Grid
            item
            xs={6}
            md={4}
            key={index}
          >
            <CustomCard>
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '23vh', }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography fontWeight={'bold'}>{item.event}</Typography>
                  <DropDown >
                    <MenuItem onClick={() => handleUpdate(item)}>Edit</MenuItem>
                    <MenuItem onClick={() => handleDelete(item._id)}>Delete</MenuItem>
                  </DropDown>
                </Box>
                <Box sx={{ textAlign: 'center' }}
                  component={Link}
                  to={`/schedule/${item._id}`}
                >
                  <Typography color="primary">
                    <Folder sx={{ fontSize: '15vh' }} />
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography><strong>Period:</strong> {formatDate(item.startDate)} - {formatDate(item.endDate)}</Typography>
                  <Chip label={status} color={color} />
                </Box>
              </Box>
            </CustomCard>
          </Grid>
        )
      })}

      <Drawer open={storeModal} anchor='right' onClose={handleCloseModal}>
        <Store setEvents={setEvents} onClose={handleCloseModal} />
      </Drawer>
      <Drawer open={updateModal} anchor='right' onClose={handleCloseModal}>
        <Update data={updateData} setEvents={setEvents} events={events} onClose={handleCloseModal} />
      </Drawer>
      <DeleteModal open={deleteModal} anchor='right' onClose={handleCloseModal} api={deleteApi} datas={events} setEvents={setEvents} _id={selectedId} />
    </Grid>
  )
}

function formatDate(dateString) {
  return moment(dateString).format('MMM-DD-YY');
}

export default Events