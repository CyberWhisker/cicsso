import React, { useEffect, useMemo, useState } from 'react';
import { Avatar, Box, Button, Chip, Divider, Drawer, LinearProgress, MenuItem, Stack, TextField, Typography } from '@mui/material';
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
import { fetchScheduleById } from '../../api/ScheduleApi';
import { fetchUsers } from '../../api/userApi';

function Attendance() {
  const {id} = useParams();
  const [storeModal, setStoreModal] = useState(false);
  const [attendances, setAttendances] = useState([]);
  const [users, setUsers] = useState([]); 
  const [combinedData, setCombinedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      const {data, error} = await fetchUsers();
      if (error) {
        console.log(error)
      } else {
        setUsers(data)
      }
    }
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
    const combineData = async () => {
      await getUsers();

      const combined = users.map(user => {
        const userAttendance = attendances.find(att => att.user_id === user.user_id);
        return {
          ...user,
          attendance: userAttendance || {}
        };
      });

      setCombinedData(combined);
      console.log(combinedData)
    };

    getAttendance();
    combineData();
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
        <AttendanceTable attendances={attendances} setAttendances={setAttendances} id={id}/>
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


function AttendanceTable({attendances, setAttendances, id}) {
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
