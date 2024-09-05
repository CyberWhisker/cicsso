import React, { useEffect, useMemo, useState } from 'react';
import { Avatar, Box, Button, Chip, Divider, Drawer, LinearProgress, MenuItem, Stack, TextField, Typography } from '@mui/material';
import Master from '../../layouts/Master';
import { DataTable, DropDown } from '../../components';
import Store from './Form/Store';
import Update from './Form/Update';
import Delete from './Form/Delete';
import { useNavigate, useParams } from 'react-router-dom';
import { Add, KeyboardReturn } from '@mui/icons-material';
import { fetchAttendanceBySchedule } from '../../api/AttendanceApi';
import { toast } from 'react-toastify';
import moment from 'moment';
import AlertModal from '../../components/AlertModal';
import { fetchScheduleById } from '../../api/ScheduleApi';
import { fetchUsers } from '../../api/userApi';

function Attendance() {
  const {id} = useParams();
  const [storeModal, setStoreModal] = useState(false);
  const [combinedData, setCombinedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleGetData = async () => {
    setIsLoading(true);
  
    try {
      // Fetch both users and attendance
      const [{ data: userData, error: userError }, { data: attendanceData, error: attendanceError }] = await Promise.all([
        fetchUsers(),
        fetchAttendanceBySchedule(id)
      ]);
  
      if (userError || attendanceError) {
        console.log(userError || attendanceError);
        toast.error("Opss... Something went wrong");
      } else {
        // Combine the data after both are fetched
        const combined = userData.map(user => {
          const userAttendance = attendanceData.find(att => att.user_id === user.user_id);
          return {
            ...user,
            attendance: userAttendance || {}
          };
        });
        setCombinedData(combined);  // Set the combined data
      }
    } catch (error) {
      console.error(error);
      toast.error("Opss... Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetData();
  }, [id]);

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
        <AttendanceTable combinedData={combinedData} handleGetData={handleGetData} id={id}/>
      </Stack>

      <Drawer
        open={storeModal}
        anchor="right"
        onClose={handleCloseModal}
      >
        <Store onClose={handleCloseModal} handleGetData={handleGetData}/>
      </Drawer>
    </Master>
  );
}


function AttendanceTable({combinedData, handleGetData, id}) {
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selected, setSelected] = useState([]);
  const [active, setActive] = useState({
    amInChip: false,
    amOutChip: false,
    pmINChip: false,
    pmOutChip: false,
  });
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

  const handleActive = (sched) => {
    // Parse the time limit from environment variable and ensure it's an integer
    const timeLimit = parseInt(import.meta.env.VITE_TIME_LIMIT, 10);
    
    // Create moment objects from schedule times
    const amIn = moment(sched[0].amIn);
    const amOut = moment(sched[0].amOut);
    const pmIn = moment(sched[0].pmIn);
    const pmOut = moment(sched[0].pmOut);
    
    // Get the current time
    const currentTime = moment();
  
    // Helper function to compute end time based on the given limit
    const getEndTime = (time) => time.clone().add(timeLimit, 'hours');
  
    // Check if currentTime falls within any of the adjusted time ranges
    if (amIn.isSameOrBefore(currentTime) && currentTime.isBefore(getEndTime(amIn))) {
      setActive({...active, amInChip: true})
    } 
    if (amOut.isSameOrBefore(currentTime) && currentTime.isBefore(getEndTime(amOut))) {
      setActive({...active, amOutChip: true})
    } 
    if (pmIn.isSameOrBefore(currentTime) && currentTime.isBefore(getEndTime(pmIn))) {
      setActive({...active, pmINChip: true})
    } 
    if (pmOut.isSameOrBefore(currentTime) && currentTime.isBefore(getEndTime(pmOut))) {
      setActive({...active, pmOutChip: true})
    } 
  };

  useEffect(() => 
  {
    const getSchedule = async () => {
      const {data, error} = await fetchScheduleById(id)
      if ( error ) {
        console.log(error)
      } else {
        handleActive(data)
      }
    }
    getSchedule();
  },[]);

  const columns = [
    { id: 'pictureFormat', label: 'Avatar' },
    { id: 'name', label: 'Name' },
    { id: 'amInFormat', label: <Chip color={active.amInChip ? 'success' : 'error'} label="AM IN"/> },
    { id: 'amOutFormat', label: <Chip color={active.amOutChip ? 'success' : 'error'} label='AM OUT'/> },
    { id: 'pmInFormat', label: <Chip color={active.pmINChip ? 'success' : 'error'} label='PM IN'/> },
    { id: 'pmOutFormat', label: <Chip color={active.pmOutChip ? 'success' : 'error'} label='PM OUT'/> },
    { id: 'setting', label: 'Settings'},
  ];

  const rows = useMemo(() => 
    combinedData.map((item) => ({
      _id: item.attendance?._id ? item.attendance._id : null,  
      pictureFormat: <Avatar src={item.picture} alt={item.picture} />, 
      name: item.name,
      amInFormat: item.attendance?.amIn ? 
        <Chip color='success' label={moment(item.attendance.amIn).format('hh:mm A')}/> : 
        <Chip color='error' label='Absent'/>,
      amOutFormat: item.attendance?.amOut ? 
        <Chip color='success' label={moment(item.attendance.amOut).format('hh:mm A')}/> : 
        <Chip color='error' label='Absent'/>,
      pmInFormat: item.attendance?.pmIn ? 
        <Chip color='success' label={moment(item.attendance.pmIn).format('hh:mm A')}/> : 
        <Chip color='error' label='Absent'/>,
      pmOutFormat: item.attendance?.pmOut ? 
        <Chip color='success' label={moment(item.attendance.pmOut).format('hh:mm A')}/> : 
        <Chip color='error' label='Absent'/>,
      picture: item.picture, 
      amIn: item.attendance?.amIn ? item.attendance.amIn : null,
      amOut: item.attendance?.amOut ? item.attendance.amOut : null,
      pmIn: item.attendance?.pmIn ? item.attendance.pmIn : null,
      pmOut: item.attendance?.pmOut ? item.attendance.pmOut : null,
      setting: 
        <DropDown>
          {item.attendance._id ? (
            <>
              <MenuItem onClick={() => handleUpdateModal(item.attendance)}>
                <Typography color="warning.main">Edit</Typography>
              </MenuItem>
              <MenuItem onClick={(e) => handleDeleteModal(item.attendance)}>
                <Typography color="error.main">Delete</Typography>
              </MenuItem>
            </>
          ) : (
            <MenuItem disabled>
              <Typography color="error.main">No Record</Typography>
            </MenuItem>
          )}
        </DropDown> 
    })),
    [combinedData]
  );

  return (
    <Box>
      <DataTable 
        rows={rows} 
        columns={columns}
        />
      <Drawer anchor='right' open={updateModal} onClose={handleCloseModal}>
        <Update onClose={handleCloseModal} selected={selected} handleGetData={handleGetData}/>
      </Drawer>
      <AlertModal open={deleteModal} onClose={handleCloseModal}>
        <Delete onClose={handleCloseModal} selected={selected} handleGetData={handleGetData}/>
      </AlertModal>
    </Box>
  );
}

export default Attendance;
