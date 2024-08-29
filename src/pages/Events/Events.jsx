import React, { useEffect, useState } from 'react'
import Master from '../../layouts/Master'
import { Box, Chip, Divider, Drawer, Grid, MenuItem, Skeleton, Stack, Typography } from '@mui/material'
import { CustomCard, DeleteModal, DropDown } from '../../components'
import { Add, Folder } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import Store from './Form/Store'
import Update from './Form/Update'
import Delete from './Form/Delete'
import useFetch from 'react-fetch-hook'

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

function EventList() {
  const [open, setOpen] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const Project = [
    {
      _id: '1',
      name: 'Event 1',
      date: '05/30/2024'
    },
    {
      _id: '2',
      name: 'Event 2',
      date: '05/30/2024'
    },
    {
      _id: '3',
      name: 'Event 3',
      date: '05/30/2024'
    },
    {
      _id: '4',
      name: 'Event 4',
      date: '05/30/2024'
    },
  ]
  const {isLoading, error, data} = useFetch(`${import.meta.env.VITE_API}/api/event`);

  if (isLoading) {
    return (
      <Grid container spacing={2}>
        <Grid 
          item 
          xs={6} 
          md={4}
        >
          <Skeleton variant="rectangular" width={'50vh'} height={'25vh'} sx={{borderRadius: 5}}/>
          <Skeleton variant="rectangular" width={'50vh'} height={'5vh'} sx={{borderRadius: 5 , mt: 2}}/>
        </Grid>
      </Grid>
    )
  }
  
  return (
    <Grid container spacing={2}>
      {data.map((item, index) => (
        <Grid 
          item 
          xs={6} 
          md={4}
          key={index}
        >
          <CustomCard>
            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
              <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography fontWeight={'bold'}>{item.name}</Typography>
                <DropDown >
                  <MenuItem onClick={() => setUpdateModal(true)}>Edit</MenuItem>
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
                <Typography><strong>Period:</strong> {item.start_date} - {item.end_date}</Typography>
                <Chip label='Status' color='success'/>
              </Box>
            </Box>
          </CustomCard>
        </Grid>
      ))}
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
            height: '100%'
          }}>
            <Typography fontWeight='bold'>Add Event</Typography>
            <Add sx={{fontSize: {xs: '5vh', md: '8vh'}}}/>
          </Box>
        </CustomCard>
      </Grid>

      <StoreDrawer open={open} setOpen={setOpen}/>
      <UpdateDrawer open={updateModal} setOpen={setUpdateModal}/>
      <DeleteDrawer open={deleteModal} handleClose={() => setDeleteModal(false)}/>
    </Grid>
  )
}

function StoreDrawer({open, setOpen}) {
  return (
    <Drawer open={open} anchor='right' onClose={() => setOpen(false)}>
      <Store/>
    </Drawer>
  ) 
}

function UpdateDrawer({open, setOpen}) {
  return (
    <Drawer open={open} anchor='right' onClose={() => setOpen(false)}>
      <Update/>
    </Drawer>
  ) 
}

function DeleteDrawer({open, handleClose}) {
  return (
    <DeleteModal open={open} anchor='right' handleClose={handleClose}>
      <Delete/>
    </DeleteModal>
  ) 
}

export default Events