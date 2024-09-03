import React, { useEffect, useMemo, useState } from 'react';
import { Avatar, Box, Button, Divider, Drawer, LinearProgress, MenuItem, Stack, TextField, Typography } from '@mui/material';
import Master from '../../layouts/Master';
import { DataTable } from '../../components';
import Store from './Form/Store';
import Update from './Form/Update';
import Delete from './Form/Delete';
import { useNavigate, useParams } from 'react-router-dom';
import { Add, KeyboardReturn } from '@mui/icons-material';
import { fetchAttendanceBySchedule } from '../../api/AttendanceApi';
import { toast } from 'react-toastify';
import moment from 'moment';
import AlertModal from '../../components/AlertModal';

function Attendance() {
  const {id} = useParams();
  const [storeModal, setStoreModal] = useState(false);
  const [attendances, setAttendances] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getAttendance = async () => {
      setIsLoading(true);
      const {data, error} = await fetchAttendanceBySchedule(id)
      if (error) {
        toast.error("Opss... Something went wrong")
      } else {
        setAttendances(data)
      }
      setIsLoading(false);
    }
    getAttendance(attendances)
  },[])

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
            <Button variant="contained" color='success' endIcon={<Add/>} onClick={() => setStoreModal(true)}>Attendance</Button>
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
        <Box>
          <Divider/>
          {isLoading && (
            <LinearProgress/>
          )}
        </Box>
        <AttendanceTable attendances={attendances} setAttendances={setAttendances}/>
      </Stack>

      <Drawer
        open={storeModal}
        anchor="right"
        onClose={handleCloseModal}
      >
        <Store setAttendances={setAttendances} onClose={handleCloseModal}/>
      </Drawer>
    </Master>
  );
}


function AttendanceTable({attendances, setAttendances}) {
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selected, setSelected] = useState([]);

  const handleCloseModal = () => {
    setUpdateModal(false);
    setDeleteModal(false);
  }

  const handleUpdateModal = (row) => {
    setSelected(row); 
    setUpdateModal(true); 
  };
  
  const handleDeleteModal = (row) => {
    setSelected(row); 
    setDeleteModal(true);
  };
  

  const columns = [
    { id: 'pictureFormat', label: 'Avatar' },
    { id: 'name', label: 'Name' },
    { id: 'amInFormat', label: 'AM IN' },
    { id: 'amOutFormat', label: 'AM OUT' },
    { id: 'pmInFormat', label: 'PM IN' },
    { id: 'pmOutFormat', label: 'PM OUT' },
  ];

  const rows = useMemo(() => 
    attendances.map((attendance) => ({
      _id: attendance._id,  
      pictureFormat: <Avatar src={attendance.picture} alt={attendance.picture} />, 
      name: attendance.name,
      amInFormat: moment(attendance.amIn).format('hh:mm A'),
      amOutFormat: moment(attendance.amOut).format('hh:mm A'),
      pmInFormat: moment(attendance.pmIn).format('hh:mm A'),
      pmOutFormat: moment(attendance.pmOut).format('hh:mm A'),
      picture: attendance.picture, 
      amIn: attendance.amIn,
      amOut: attendance.amOut,
      pmIn: attendance.pmIn,
      pmOut: attendance.pmOut,
    })),
    [attendances]
  );

  return (
    <Box>
      <DataTable 
        rows={rows} 
        columns={columns}
        rowAction={(row) => (
            <>
              <MenuItem onClick={() => handleUpdateModal(row)}>
                <Typography color="warning.main">Edit</Typography>
              </MenuItem>
              <MenuItem onClick={(e) => handleDeleteModal(row)}>
                <Typography color="error.main">Delete</Typography>
              </MenuItem>
            </>
          )}
        />
      <Drawer anchor='right' open={updateModal} onClose={handleCloseModal}>
        <Update onClose={handleCloseModal} selected={selected} setAttendances={setAttendances}/>
      </Drawer>
      <AlertModal open={deleteModal} onClose={handleCloseModal}>
        <Delete onClose={handleCloseModal} selected={selected} setAttendances={setAttendances}/>
      </AlertModal>
    </Box>
  );
}

export default Attendance;
