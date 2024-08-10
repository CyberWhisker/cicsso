import React, { useState } from 'react'
import Master from '../../../layouts/Master'
import { Box, Divider, Drawer, Grid, MenuItem, Modal, Typography } from '@mui/material'
import { CustomCard, DeleteModal, DropDown } from '../../../components'
import { Add, Folder } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import Store from './Form/Store'
import Update from './Form/Update'
import Delete from './Form/Delete'
import { format } from 'date-fns';

function Events() {
  return (
    <Master>
      <Typography variant="h5" fontWeight='bold'>Event Details:</Typography>
      <Divider/>
      <Box sx={{mt: 2}}>
        <EventList/>
      </Box>
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
      name: 'Attendance 1',
      date: '05/30/2024'
    },
    {
      _id: '2',
      name: 'Attendance 2',
      date: '05/31/2024'
    },
  ]
  return (
    <Grid container spacing={2}>
      {Project.map((item, index) => {
        const date = new Date(item.date);

        // Extracting the desired parts of the date
        const dayOfWeek = format(date, 'EEEE');
        const month = format(date, 'MMMM');
        const day = format(date, 'd');
        const year = format(date, 'yyyy');

        return (
          <Grid 
            item 
            xs={6} 
            md={3}
            key={index}
          >
            <CustomCard>
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography fontWeight="bold" variant='h6'>{month}</Typography>
                  <DropDown>
                    <MenuItem onClick={() => setUpdateModal(true)}>Edit</MenuItem>
                    <MenuItem onClick={() => setDeleteModal(true)}>Delete</MenuItem>
                  </DropDown>
                </Box>
                <Box sx={{ textAlign: 'center', textDecoration: 'none' }} 
                  component={Link}
                  to={`/attendance/${item._id}`}
                >
                  <Typography color="primary" variant='h6'>
                    {dayOfWeek}
                  </Typography>
                  <Typography color="primary" variant='h2' fontWeight="bold">
                    {day}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>{year}</Typography>
                  <Typography>Status</Typography> {/* You can replace "Status" with the actual status if available */}
                </Box>
              </Box>
            </CustomCard>
          </Grid>
        );
      })}
      
      <Grid 
        item 
        xs={6} 
        md={3}
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
            <Add sx={{ fontSize: { xs: '5vh', md: '8vh' } }} />
          </Box>
        </CustomCard>
      </Grid>

      <StoreDrawer open={open} setOpen={setOpen}/>
      <UpdateDrawer open={updateModal} setOpen={setUpdateModal}/>
      <DeleteDrawer open={deleteModal} handleClose={() => setDeleteModal(false)}/>
    </Grid>
  );
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