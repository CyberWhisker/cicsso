import React, { useState } from 'react'
import Master from '../../layouts/Master'
import { Box, Divider, Drawer, Grid, MenuItem, Typography } from '@mui/material'
import { CustomCard, DeleteModal, DropDown } from '../../components'
import { Add, Folder } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import Store from './Form/Store'
import Update from './Form/Update'
import Delete from './Form/Delete'

function ProjectPage() {
  return (
    <Master>
      <Typography variant="h5" fontWeight='bold'>Project List:</Typography>
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
        name: 'Project Alpha',
        cost: 1500,
        date: '2024-05-30',
        },
        {
        _id: '2',
        name: 'Project Beta',
        cost: 2500,
        date: '2024-06-15',
        },
        {
        _id: '3',
        name: 'Project Gamma',
        cost: 1200,
        date: '2024-07-20',
        },
        {
        _id: '4',
        name: 'Project Delta',
        cost: 1800,
        date: '2024-08-05',
        },
        {
        _id: '5',
        name: 'Project Epsilon',
        cost: 2200,
        date: '2024-09-10',
        },
    ];
  
  return (
    <Grid container spacing={2}>
      {Project.map((item, index) => (
        <Grid 
          item 
          xs={6} 
          md={4}
          key={index}
        >
          <CustomCard>
            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
              <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography textAlign='center' fontWeight='bold' variant='h5' color="primary">{item.name}</Typography>
                <DropDown >
                  <MenuItem onClick={() => setUpdateModal(true)}>Edit</MenuItem>
                  <MenuItem onClick={() => setDeleteModal(true)}>Delete</MenuItem>
                </DropDown>
              </Box>
              <Box sx={{display: 'flex',flexDirection: 'column' ,justifyContent: 'center', textDecoration: 'none', height: '15vh'}} 
                component={Link}
                to={`/projects/${item._id}`}
              >
                <Typography textAlign='center' fontWeight='bold' variant='h3' color='primary'>₱ {item.cost}</Typography>
                <Typography textAlign='center' fontWeight='bold' color='primary'>Total Cost</Typography>
              </Box>
              <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography>Created At: {item.date}</Typography>
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
            <Typography fontWeight='bold'>Add Project</Typography>
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

export default ProjectPage