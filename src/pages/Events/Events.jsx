import React, { useState } from 'react'
import Master from '../../layouts/Master'
import { Box, Chip, Divider, Drawer, Grid, MenuItem, Skeleton, Stack, Typography } from '@mui/material'
import { CustomCard, DeleteModal, DropDown } from '../../components'
import { Add, Folder } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import Store from './Form/Store'
import Update from './Form/Update'
import Delete from './Form/Delete'
import useFetch from 'react-fetch-hook'
import moment from 'moment';

function Events() {
  return (
    <Master>
      <Stack direction={'column'} spacing={2}>
        <Typography variant="h5" fontWeight='bold'>Events :</Typography>
        <Divider/>
        <Box>
          <EventList/>
        </Box>
      </Stack>
    </Master>
  )
}

function formatDate(dateString) {
  return moment(dateString).format('MMM-DD-YY');
}

function EventList() {
  const [open, setOpen] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const {isLoading, error, data} = useFetch(`${import.meta.env.VITE_API}/api/event`);
  const [updateData, setUpdateData] = useState([]);

  const handleUpdate = (data) => {
    setUpdateModal(true);
    setUpdateData(data);
  }
  if (isLoading) {
    return (
      <Grid container spacing={2}>
        <Grid 
          item 
          xs={6} 
          md={4}
        >
          <Skeleton variant="rectangular" width={'100%'} height={'25vh'} sx={{borderRadius: 5}}/>
          <Skeleton variant="rectangular" width={'100%'} height={'5vh'} sx={{borderRadius: 5 , mt: 2}}/>
        </Grid>
      </Grid>
    )
  }
  
  return (
    <Grid container spacing={2}>
      <Grid 
        item 
        xs={6} 
        md={4}
      >
        <CustomCard>
          <Box 
          onClick={() => setOpen(true)}
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
      {data.map((item, index) => (
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
                  <MenuItem onClick={() => setDeleteModal(true)}>Delete</MenuItem>
                </DropDown>
              </Box>
              <Box sx={{textAlign: 'center'}} 
                component={Link}
                to={`/events/${item._id}`}
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

      <Drawer open={open} anchor='right' onClose={() => setOpen(false)}>
        <Store/>
      </Drawer>
      <Drawer open={updateModal} anchor='right' onClose={() => setUpdateModal(false)}>
        <Update data={updateData}/>
      </Drawer>
      <DeleteModal open={deleteModal} anchor='right' onClose={() => setDeleteModal(false)}>
        <Delete/>
      </DeleteModal>
    </Grid>
  )
}

export default Events