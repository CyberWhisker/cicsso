import React, { useEffect, useMemo, useState } from 'react';
import { Avatar, Box, Button, Chip, Divider, Drawer, LinearProgress, MenuItem, Stack, TextField, Typography } from '@mui/material';
import Master from '../../layouts/Master';
import { DataTable, DropDown } from '../../components';
import Store from './Form/Store';
import Update from './Form/Update';
import Delete from './Form/Delete';
import { useNavigate, useParams } from 'react-router-dom';
import { Add, KeyboardReturn } from '@mui/icons-material';
import { toast } from 'react-toastify';
import moment from 'moment';
import AlertModal from '../../components/AlertModal';
import { fetchScheduleById } from '../../api/ScheduleApi';
import { fetchUsersWithAttendanceBySchedId } from '../../api/userApi';
import { DataGrid, GridToolbarQuickFilter, GridToolbar, GridToolbarExport, GridToolbarContainer } from "@mui/x-data-grid";


function Attendance() {
  const { id } = useParams();
  const [storeModal, setStoreModal] = useState(false);
  const [combinedData, setCombinedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleGetData = async () => {
    setIsLoading(true);

    try {
      const { data, error } = await fetchUsersWithAttendanceBySchedId(id);
      if (error) {
        console.log(error)
      } else {
        setCombinedData(data)
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
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Stack direction={'row'} spacing={2}>
            <Typography variant="h5" fontWeight="bold">Attendance List :</Typography>
            <Button variant="contained" onClick={handleGoBack} startIcon={<KeyboardReturn />}>Schedule List</Button>
            <Button variant="contained" color='success' endIcon={<Add />} onClick={() => setStoreModal(true)}>Attendance</Button>
          </Stack>
        </Box>
        <Box>
          <Divider />
          {isLoading && (
            <LinearProgress />
          )}
        </Box>
        <AttendanceTable combinedData={combinedData} handleGetData={handleGetData} id={id} />
      </Stack>

      <Drawer
        open={storeModal}
        anchor="right"
        onClose={handleCloseModal}
      >
        <Store onClose={handleCloseModal} handleGetData={handleGetData} />
      </Drawer>
    </Master>
  );
}


function AttendanceTable({ combinedData, handleGetData, id }) {
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [schedule, setSchedule] = useState({});
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
    const timeLimit = parseInt(import.meta.env.VITE_TIME_LIMIT);

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
    if (currentTime.isSameOrAfter(amIn) && currentTime.isSameOrBefore(getEndTime(amIn))) {
      setActive({ ...active, amInChip: true })
    }
    if (currentTime.isSameOrAfter(amOut) && currentTime.isSameOrBefore(getEndTime(amOut))) {
      setActive({ ...active, amOutChip: true })
    }
    if (currentTime.isSameOrAfter(pmIn) && currentTime.isSameOrBefore(getEndTime(pmIn))) {
      setActive({ ...active, pmINChip: true })
    }
    if (currentTime.isSameOrAfter(pmOut) && currentTime.isSameOrBefore(getEndTime(pmOut))) {
      setActive({ ...active, pmOutChip: true })
    }
  };

  useEffect(() => {
    const getSchedule = async () => {
      const { data, error } = await fetchScheduleById(id)
      if (error) {
        console.log(error)
      } else {
        setSchedule(data)
        handleActive(data)
      }
    }
    getSchedule();
  }, []);

  const currentDay = moment()

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      headerAlign: "center",
    },
    {
      field: "year",
      headerName: "Year",
      flex: 1,
      headerAlign: "center",
    },
    {
      field: "section",
      headerName: "Section",
      flex: 1,
      headerAlign: "center",
    },
    {
      field: "amInFormat",
      headerName: "Am In",
      flex: 1,
      headerAlign: "center",
      valueFormatter: (value) => value ? moment(value).format('hh:mm A') : "Absent",
      renderCell: (params) => (
        <Box sx={{ textAlign: "center" }}>
          {params.row.amIn &&
            <Chip color='success' label={moment(params?.row?.amIn).format('hh:mm A')} />
          }
          {!params.row.amIn && moment(schedule[0].amIn).isBefore(currentDay) ?
            <Chip color='error' label='Absent' /> :
            <Chip label='Absent' />
          }
        </Box>
      ),
    },
    {
      field: "amOutFormat",
      headerName: "Am Out",
      flex: 1,
      headerAlign: "center",
      valueFormatter: (value) => value ? moment(value).format('hh:mm A') : "Absent",
      renderCell: (params) => (
        <Box sx={{ textAlign: "center" }}>
          {params.row.amOut &&
            <Chip color='success' label={moment(params?.row?.amOut).format('hh:mm A')} />
          }
          {!params.row.amOut && moment(schedule[0].amOut).isBefore(currentDay) ?
            <Chip color='error' label='Absent' /> :
            <Chip label='Absent' />
          }
        </Box>
      ),
    },
    {
      field: "pmInFormat",
      headerName: "Pm In",
      flex: 1,
      headerAlign: "center",
      valueFormatter: (value) => value ? moment(value).format('hh:mm A') : "Absent",
      renderCell: (params) => (
        <Box sx={{ textAlign: "center" }}>
          {params.row.pmIn &&
            <Chip color='success' label={moment(params?.row?.pmIn).format('hh:mm A')} />
          }
          {!params.row.pmIn && moment(schedule[0].pmIn).isBefore(currentDay) ?
            <Chip color='error' label='Absent' /> :
            <Chip label='Absent' />
          }
        </Box>
      ),
    },
    {
      field: "pmOutFormat",
      headerName: "Pm Out",
      flex: 1,
      headerAlign: "center",
      valueFormatter: (value) => value ? moment(value).format('hh:mm A') : "Absent",
      renderCell: (params) => (
        <Box sx={{ textAlign: "center" }}>
          {params.row.pmOut &&
            <Chip color='success' label={moment(params?.row?.pmOut).format('hh:mm A')} />
          }
          {!params.row.pmOut && moment(schedule[0].pmOut).isBefore(currentDay) ?
            <Chip color='error' label='Absent' /> :
            <Chip label='Absent' />
          }
        </Box>
      ),
    },
    {
      field: "setting",
      headerName: "Setting",
      renderCell: (params) => (
        <Box sx={{ textAlign: "center" }}>
          {params.row.setting}
        </Box>
      ),
      headerAlign: "center",
    },
  ];

  const rows = useMemo(
    () =>
      combinedData.map((item) => ({
        ...item,
        id: item._id,
        name: `${item.lastName}, ${item.firstName} ${item.middleName[0]}.`,
        amInFormat: item?.attendances[0]?.amIn || null,
        amOutFormat: item?.attendances[0]?.amOut || null,
        pmInFormat: item?.attendances[0]?.pmIn || null,
        pmOutFormat: item?.attendances[0]?.pmOut || null,
        picture: item.picture,
        amIn: item?.attendances[0]?.amIn ? item?.attendances[0]?.amIn : null,
        amOut: item?.attendances[0]?.amOut ? item?.attendances[0]?.amOut : null,
        pmIn: item?.attendances[0]?.pmIn ? item?.attendances[0]?.pmIn : null,
        pmOut: item?.attendances[0]?.pmOut ? item?.attendances[0]?.pmOut : null,
        setting:
          <DropDown>
            {item?.attendances[0]?._id ? (
              <>
                <MenuItem onClick={() => handleUpdateModal(item)}>
                  <Typography color="warning.main">Edit</Typography>
                </MenuItem>
                <MenuItem onClick={(e) => handleDeleteModal(item)}>
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
      <DataGrid
        columns={columns}
        rows={rows}
        slots={{
          toolbar: CustomToolbar,
        }}
      // slotProps={{ toolbar: { printOptions: { disableToolbarButton: false } } }}
      />
      <Drawer anchor='right' open={updateModal} onClose={handleCloseModal}>
        <Update onClose={handleCloseModal} selected={selected} handleGetData={handleGetData} />
      </Drawer>
      <AlertModal open={deleteModal} onClose={handleCloseModal}>
        <Delete onClose={handleCloseModal} selected={selected} handleGetData={handleGetData} />
      </AlertModal>
    </Box>
  );
}

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%'
      }}>
        <GridToolbar printOptions={{ disableToolbarButton: true }} />
        <GridToolbarQuickFilter
          quickFilterParser={(searchInput) =>
            searchInput
              .split(',')
              .map((value) => value.trim())
              .filter((value) => value !== '')
          }
        />
      </Box>
    </GridToolbarContainer>
  );
}

export default Attendance;
