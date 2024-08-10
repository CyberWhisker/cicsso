import React, { useState } from 'react';
import { Box, Button, Divider, Drawer, Grid, MenuItem, TextField, Typography } from '@mui/material';
import Master from '../../layouts/Master';
import { DataTable, DeleteModal, DropDown } from '../../components';
import Store from './Form/Store';
import Update from './Form/Update';
import Delete from './Form/Delete';

function Attendance() {
  const [open, setOpen] = useState(false);
  return (
    <Master>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6} sx={{display: 'flex', gap: 2}}>
          <Typography variant="h5" fontWeight="bold">Attendance List :</Typography>
          <Button variant="contained" onClick={() => setOpen(true)}>Add Attendance</Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'flex-end', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%', justifyContent: 'end'}}>
              <Typography sx={{display: {xs: 'none', md: 'block'}}}>Search: </Typography>
              <TextField 
                variant="outlined"
                name="student_search"
                label="Enter Student Name"
                size="small"
                sx={{ width: { xs: '100%', md: 'auto' } }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ mt: 2 }}>
        <AttendanceList />
      </Box>
      <StoreDrawer open={open} setOpen={setOpen} />
    </Master>
  );
}

function AttendanceList() {
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const columns = [
    { id: '_id', label: 'ID' },
    { id: 'name', label: 'Last Name' },
    { id: 'pet_type', label: 'First Name' },
    { id: 'breed', label: 'Middle Name' },
    { id: 'am_in', label: 'AM IN' },
    { id: 'am_out', label: 'AM OUT' },
    { id: 'pm_in', label: 'PM IN' },
    { id: 'pm_out', label: 'PM OUT' },
  ];

  const rows = [
    {
      "_id": 1,
      "name": "Jorge",
      "pet_type": "Dog",
      "breed": "Labrador",
      "age": 3,
    },
    {
      "_id": 2,
      "name": "Jorge",
      "pet_type": "Dog",
      "breed": "Labrador",
      "age": 3,
    },
  ];

  return (
    <React.Fragment>
      <DataTable rows={rows} columns={columns}>
        <MenuItem onClick={() => setUpdateModal(true)}>
          <Typography color="warning.main">Edit</Typography>
        </MenuItem>
        <MenuItem onClick={() => setDeleteModal(true)}>
          <Typography color="error.main">Delete</Typography>
        </MenuItem>
      </DataTable>
      <UpdateDrawer open={updateModal} setOpen={setUpdateModal} />
      <DeleteDrawer open={deleteModal} handleClose={() => setDeleteModal(false)} />
    </React.Fragment>
  );
}

function StoreDrawer({ open, setOpen }) {
  return (
    <Drawer
      open={open}
      anchor="right"
      onClose={() => setOpen(false)}
      sx={{ width: { xs: '100%', sm: '75%', md: '50%' } }}
    >
      <Store />
    </Drawer>
  );
}

function UpdateDrawer({ open, setOpen }) {
  return (
    <Drawer
      open={open}
      anchor="right"
      onClose={() => setOpen(false)}
      sx={{ width: { xs: '100%', sm: '75%', md: '50%' } }}
    >
      <Update />
    </Drawer>
  );
}

function DeleteDrawer({ open, handleClose }) {
  return (
    <DeleteModal open={open} anchor="right" handleClose={handleClose}>
      <Delete />
    </DeleteModal>
  );
}

export default Attendance;
