import React, { useEffect, useMemo, useState } from 'react';
import { Avatar, Box, Button, Divider, Drawer, MenuItem, Stack, TextField, Typography } from '@mui/material';
import Master from '../../layouts/Master';
import { DataTable, DeleteModal } from '../../components';
import Store from './Form/Store';
import Update from './Form/Update';
import Delete from './Form/Delete';
import { useNavigate, useParams } from 'react-router-dom';
import { Add, KeyboardReturn, Person } from '@mui/icons-material';
import { fetchAttendanceBySchedule } from '../../api/AttendanceApi';
import { toast } from 'react-toastify';
import moment from 'moment';

function Attendance() {
  const [storeModal, setStoreModal] = useState(false);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  }

  const handleCloseModal = () => {
    setStoreModal(false)
  }
  return (
    <Master>
      <Stack direction={'column'} spacing={2}>
        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <Stack direction={'row'} spacing={2}>
            <Typography variant="h5" fontWeight="bold">Attendance List :</Typography>
            <Button variant="contained" onClick={handleGoBack} startIcon={<KeyboardReturn/>}>Schedule List</Button>
          </Stack>
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
        </Box>
        <Divider/>
        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <Button variant="contained" color='success' endIcon={<Add/>} onClick={() => setStoreModal(true)}>Attendance</Button>
          <ToolList/>
        </Box>
        <AttendanceList />
      </Stack>

      <Drawer
        open={storeModal}
        anchor="right"
        onClose={handleCloseModal}
      >
        <Store />
      </Drawer>
    </Master>
  );
}

function ToolList() {
  const [activeButtons, setActiveButtons] = useState({
    amIn: false,
    amOut: false,
    pmIn: false,
    pmOut: false,
  });

  const handleToggle = (button) => {
    setActiveButtons((prevState) => ({
      ...prevState,
      [button]: !prevState[button],  // Toggle the active state for the clicked button
    }));
  };

  return (
    <Stack direction={'row'} spacing={2}>
      <Button
        variant='contained'
        color={activeButtons.amIn ? 'success' : 'error'}
        sx={{ minWidth: 100 }}
        onClick={() => handleToggle('amIn')}
      >
        Am In
      </Button>
      <Button
        variant='contained'
        color={activeButtons.amOut ? 'success' : 'error'}
        sx={{ minWidth: 100 }}
        onClick={() => handleToggle('amOut')}
      >
        Am Out
      </Button>
      <Button
        variant='contained'
        color={activeButtons.pmIn ? 'success' : 'error'}
        sx={{ minWidth: 100 }}
        onClick={() => handleToggle('pmIn')}
      >
        Pm In
      </Button>
      <Button
        variant='contained'
        color={activeButtons.pmOut ? 'success' : 'error'}
        sx={{ minWidth: 100 }}
        onClick={() => handleToggle('pmOut')}
      >
        Pm Out
      </Button>
    </Stack>
  );
}

function AttendanceList() {
  const {id} = useParams();
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [attendances, setAttendances] = useState([]);

  useEffect(() => {
    const getAttendance = async () => {
      const {data, error} = await fetchAttendanceBySchedule(id)
      if (error) {
        toast.error("Opss... Something went wrong")
      } else {
        setAttendances(data)
      }
    }
    getAttendance()
  },[])

  const handleCloseModal = () => {
    setUpdateModal(false);
    setDeleteModal(false);
  }

  const columns = [
    { id: 'picture', label: 'Avatar' },
    { id: 'name', label: 'Name' },
    { id: 'amIn', label: 'AM IN' },
    { id: 'amOut', label: 'AM OUT' },
    { id: 'pmIn', label: 'PM IN' },
    { id: 'pmOut', label: 'PM OUT' },
  ];

  const rows = useMemo(() => 
    attendances.map((attendance) => ({
      picture: <Avatar src={attendance.picture} alt={attendance.picture} />,  // Use picture from the data
      name: attendance.name,  // Assuming name is available in attendance data
      amIn: moment(attendance.amIn).format('hh:mm A'),
      amOut: moment(attendance.amOut).format('hh:mm A'),
      pmIn: moment(attendance.pmIn).format('hh:mm A'),
      pmOut: moment(attendance.pmOut).format('hh:mm A'),
    })),
    [attendances]
  );

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
      <DeleteModal open={deleteModal} anchor='right' onClose={handleCloseModal}/>
    </React.Fragment>
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
