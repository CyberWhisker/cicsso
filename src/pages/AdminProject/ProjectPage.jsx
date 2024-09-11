import React, { useEffect, useState } from 'react'
import Master from '../../layouts/Master'
import { Box, Divider, Drawer, Grid, LinearProgress, MenuItem, Stack, Typography } from '@mui/material'
import { CustomCard, DropDown, AlertModal } from '../../components'
import { Add } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import Store from './Form/Store'
import Update from './Form/Update'
import Delete from './Form/Delete'
import { fetchProjects } from '../../api/ProjectApi'
import { toast } from 'react-toastify'
import moment from 'moment'
import { fetchItem } from '../../api/ItemApi'

function ProjectPage() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <Master>
      <Stack spacing={2}>
        <Typography variant="h5" fontWeight='bold'>Project List:</Typography>
        <Box>
          <Divider/>
          {isLoading &&
            <LinearProgress/>
          }
        </Box>
        <Box>
          <EventList setIsLoading={setIsLoading}/>
        </Box>
      </Stack>
    </Master>
  )
}

function EventList({setIsLoading}) {
  const [storeModal, setStoreModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selected, setSelected] = useState([]);
  const [projects, setProjects] = useState([]);
  
  const getProjects = async () => {
    setIsLoading(true)
    const [
      {data: projectData, error: projectError},
      {data: itemData, error: itemError}
    ] = await Promise.all([
      fetchProjects(),
      fetchItem()
    ]);
    if (projectError || itemError) {
      setIsLoading(false)
      toast.error(error)
    } else {
      const combinedData = projectData.map(project => ({
        ...project,
        items: itemData.filter(item => item.projectId == project._id )
      })) 
      setIsLoading(false)
      setProjects(combinedData)
    }
  }

  const handleCloseModal = () => {
    setStoreModal(false)
    setUpdateModal(false)
    setDeleteModal(false)
  }

  const handleDeleteModal = (item) => {
    setSelected(item)
    setDeleteModal(true)
  }

  const handleUpdateModal = (item) => {
    setSelected(item)
    setUpdateModal(true)
  }

  useEffect(() => {
    getProjects()
  },[])
  
  return (
    <Grid container spacing={2}>
      {projects.map((item, index) => {
        const totalCost = item.items.reduce((sum, item) => sum + item.price, 0);
        return (
          <Grid 
            item 
            xs={6} 
            md={4}
            key={index}
          >
            <CustomCard>
              <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <Typography textAlign='center' fontWeight='bold' variant='h5' color="primary">{item.project}</Typography>
                  <DropDown >
                    <MenuItem onClick={() => handleUpdateModal(item)}>Edit</MenuItem>
                    <MenuItem onClick={() => handleDeleteModal(item)}>Delete</MenuItem>
                  </DropDown>
                </Box>
                <Box sx={{display: 'flex',flexDirection: 'column' ,justifyContent: 'center', textDecoration: 'none', minHeight: '15vh'}} 
                  component={Link}
                  to={`/item/${item._id}`}
                >
                  <Typography textAlign='center' fontWeight='bold' variant='h3' color='primary'>₱{totalCost}</Typography>
                  <Typography textAlign='center' fontWeight='bold' color='primary'>Total Cost</Typography>
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                  <Typography>Created At: {moment(item.createdAt).format('MMMM DD, YYYY')}</Typography>
                </Box>
              </Box>
            </CustomCard>
          </Grid>
        )
      })}
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
            minHeight: '20vh'
          }}>
            <Typography fontWeight='bold'>Add Project</Typography>
            <Add sx={{fontSize: {xs: '5vh', md: '8vh'}}}/>
          </Box>
        </CustomCard>
      </Grid>

      <Drawer open={storeModal} anchor='right' onClose={() => handleCloseModal()}>
        <Store getProjects={getProjects} handleCloseModal={handleCloseModal}/>
      </Drawer>
      <Drawer open={updateModal} anchor='right' onClose={() => handleCloseModal()}>
        <Update selected={selected} handleCloseModal={handleCloseModal} getProjects={getProjects}/>
      </Drawer>
      <AlertModal open={deleteModal} onClose={handleCloseModal}>
        <Delete onClose={handleCloseModal} selected={selected} handleGetData={getProjects}/>
      </AlertModal>
    </Grid>
  )
}

export default ProjectPage