import React, { useEffect, useState } from 'react'
import Master from '../../layouts/Master'
import { Box, Card, Chip, Divider, Drawer, Grid, LinearProgress, MenuItem, Stack, Typography } from '@mui/material'
import { CustomCard, DropDown, AlertModal } from '../../components'
import { Add, Error } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import Store from './Form/Store'
import Update from './Form/Update'
import Delete from './Form/Delete'
import { toast } from 'react-toastify'
import moment from 'moment'
import { fetchCollections } from '../../api/CollectionApi'
import { fetchActiveSchoolYear } from '../../api/SchoolYearApi'

function Collection() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <Master>
      <Stack spacing={2}>
        <Typography variant="h5" fontWeight='bold'>Collection List:</Typography>
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
  const [schoolYearStatus, setSchoolYearStatus] = useState(false);
  const [storeModal, setStoreModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selected, setSelected] = useState([]);
  const [projects, setProjects] = useState([]);

  const handleGetData = async () => {
    setIsLoading(true)
    const { data, error } = await fetchCollections();
    if (error) {
      setIsLoading(false)
      toast.error(error)
    } else {
      setIsLoading(false)
      setProjects(data)
    }
  }

  const handleGetActiveSchoolYear = async () => {
    const { data, error } = await fetchActiveSchoolYear();
    if (error) {
      toast.error("No Active School Year")
      setSchoolYearStatus(false)
    } else {
      setSchoolYearStatus(true)
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
    handleGetData()
    handleGetActiveSchoolYear()
  }, [])

  return (
    <Grid container spacing={2}>

      <Grid
        item
        xs={6}
        md={4}
      >
        {schoolYearStatus && (
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
              <Typography fontWeight='bold'>Add Collection</Typography>
              <Add sx={{ fontSize: { xs: '5vh', md: '8vh' } }} />
            </Box>
          </CustomCard>
        )}
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
      </Grid>
      {projects.map((item, index) => (
        <Grid
          item
          xs={6}
          md={4}
          key={index}
        >
          <CustomCard>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography textAlign='center' fontWeight='bold' variant='h5' color="primary" noWrap>{item.collectionName}</Typography>
                <Stack direction={'row'} alignItems={'center'}>
                  {item.label == "Mandatory" && <Chip label={`${item.label}`} color='warning'/>}
                  {item.label == "Urgent" && <Chip label={`${item.label}`} color='error'/>}
                  <DropDown >
                    <MenuItem onClick={() => handleUpdateModal(item)}>Edit</MenuItem>
                    <MenuItem onClick={() => handleDeleteModal(item)}>Delete</MenuItem>
                  </DropDown>
                </Stack>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textDecoration: 'none', minHeight: '15vh' }}
                component={Link}
                to={`/transaction/${item._id}`}
              >
                <Typography textAlign='center' fontWeight='bold' variant='h3' color='primary'>₱ {item.fine}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>AY: {moment(item.startDate).format('MMM DD, YYYY')} - {moment(item.endDate).format('MMM DD, YYYY')}</Typography>
              </Box>
            </Box>
          </CustomCard>
        </Grid>
      ))}

      <Drawer open={storeModal} anchor='right' onClose={() => handleCloseModal()}>
        <Store handleGetData={handleGetData} handleCloseModal={handleCloseModal} />
      </Drawer>
      <Drawer open={updateModal} anchor='right' onClose={() => handleCloseModal()}>
        <Update selected={selected} handleCloseModal={handleCloseModal} handleGetData={handleGetData} />
      </Drawer>
      <AlertModal open={deleteModal} onClose={handleCloseModal}>
        <Delete onClose={handleCloseModal} selected={selected} handleGetData={handleGetData} />
      </AlertModal>
    </Grid>
  )
}

export default Collection