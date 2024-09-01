import React, { useEffect, useState } from 'react'
import Master from '../../layouts/Master'
import { Box, Chip, Divider, Drawer, Grid, LinearProgress, MenuItem, Stack, Typography } from '@mui/material'
import { CustomCard, DeleteModal, DropDown } from '../../components'
import { Add, Folder } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import Store from './Form/Store'
import Update from './Form/Update'
import useFetch from 'react-fetch-hook'
import moment from 'moment';

function Events() {
  const {isLoading, error, data} = useFetch(`${import.meta.env.VITE_API}/api/event`);
  return (
    <Master>
      <Stack direction={'column'} spacing={2}>
        <Typography variant="h5" fontWeight='bold'>Events :</Typography>
        <Box>
          <Divider/>
          {isLoading && (
            <LinearProgress/>
          )}
        </Box>
        <Box>
          <EventList isLoading={isLoading} data={data} error={error}/>
        </Box>
      </Stack>
    </Master>
  )
}

function EventList({isLoading, error, data}) {
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


  useEffect(() => {
    if (data && !isLoading && !error) {
      setEvents(data);
    }
  }, [data, isLoading, error, setEvents]);
  
  return (
    <Grid container spacing={2}>
      <Grid 
        item 
        xs={6} 
        md={4}
      >
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
            <Add sx={{fontSize: {xs: '5vh', md: '8vh'}}}/>
          </Box>
        </CustomCard>
      </Grid>
      {events.map((item, index) => (
        <Grid 
          item 
          xs={6} 
          md={4}
          key={index}
        >
          <CustomCard>
            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '23vh',}}>
              <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography fontWeight={'bold'}>{item.event}</Typography>
                <DropDown >
                  <MenuItem onClick={() => handleUpdate(item)}>Edit</MenuItem>
                  <MenuItem onClick={() => handleDelete(item._id)}>Delete</MenuItem>
                </DropDown>
              </Box>
              <Box sx={{textAlign: 'center'}} 
                component={Link}
                to={`/schedule/${item._id}`}
              >
                <Typography color="primary">
                  <Folder sx={{fontSize: '15vh'}}/>
                </Typography>
              </Box>
              <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography><strong>Period:</strong> {formatDate(item.startDate)} - {formatDate(item.endDate)}</Typography>
                <Chip label='Status' color='success'/>
              </Box>
            </Box>
          </CustomCard>
        </Grid>
      ))}

      <Drawer open={storeModal} anchor='right' onClose={handleCloseModal}>
        <Store setEvents={setEvents} onClose={handleCloseModal}/>
      </Drawer>
      <Drawer open={updateModal} anchor='right' onClose={handleCloseModal}>
        <Update data={updateData} setEvents={setEvents} events={events} onClose={handleCloseModal}/>
      </Drawer>
      <DeleteModal open={deleteModal} anchor='right' onClose={handleCloseModal} api={deleteApi} datas={events} setEvents={setEvents} _id={selectedId}/>
    </Grid>
  )
}

function formatDate(dateString) {
  return moment(dateString).format('MMM-DD-YY');
}

export default Events