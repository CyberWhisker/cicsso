import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Drawer,
  LinearProgress,
  Menu,
  MenuItem,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import Master from "../../layouts/Master";
import Store from "./Form/Store";
import Update from "./Form/Update";
import Delete from "./Form/Delete";
import { DataGrid, GridMoreVertIcon, GridToolbar } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import { AlertModal } from "../../components";
import moment from "moment";
import { fetchSchoolYear, updateSchoolYear } from "../../api/SchoolYearApi";

function SchoolYear() {
  const [storeModal, setStoreModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const handleGetData = async () => {
    setIsLoading(true)
    const { data, error } = await fetchSchoolYear();
    if (error) {
      toast.error(error)
    } else {
      setData(data)
    }
    setIsLoading(false)
  };

  useEffect(() => {
    handleGetData();
  }, []);
  return (
    <Master>
      <Stack spacing={2}>
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <Typography variant="h5" fontWeight="bold">
            School Year List :
          </Typography>
          <Button variant="contained" onClick={() => setStoreModal(true)}>
            Add School Year
          </Button>
        </Stack>
        <Box>
          <Divider />
          {isLoading && <LinearProgress />}
        </Box>
        <DataGridList data={data} handleGetData={handleGetData} />
      </Stack>
      <Drawer
        open={storeModal}
        anchor="right"
        onClose={() => setStoreModal(false)}
      >
        <Store
          handleGetData={handleGetData}
          onClose={() => setStoreModal(false)}
        />
      </Drawer>
    </Master>
  );
}

function DataGridList({ data, handleGetData }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState(null);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const handleMenuOpen = (event, item) => {
    setAnchorEl(event.currentTarget);
    setSelected(item);
  };
  const handleMenuClose = (event, item) => {
    setAnchorEl(null);
  };
  const handleUpdateModal = () => {
    handleMenuClose();
    setUpdateModal(true);
  };
  const handleDeleteModal = () => {
    handleMenuClose();
    setDeleteModal(true);
  };
  const handleCloseModal = () => {
    setDeleteModal(false);
    setUpdateModal(false);
  };
  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      headerAlign: "center",
    },
    {
      field: "semester",
      headerName: "Semester",
      flex: 1,
      headerAlign: "center",
    },
    {
      field: "startDate",
      headerName: "Start Date",
      flex: 1,
      headerAlign: "center",
    },
    {
      field: "endDate",
      headerName: "End Date",
      flex: 1,
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "Active",
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ textAlign: "center" }}>
          <ToggleSwitch params={params}/>
        </Box>
      ),
      headerAlign: "center",
    },
    {
      field: "setting",
      headerName: "Setting",
      renderCell: (params) => (
        <Box sx={{ textAlign: "center" }}>
          <GridMoreVertIcon
            onClick={(e) => handleMenuOpen(e, params.row)}
            sx={{ cursor: "pointer" }}
          />
        </Box>
      ),
      headerAlign: "center",
    },
  ];

  const rows = useMemo(
    () =>
      data.map((item) => ({
        ...item,
        id: item._id,
        startDate: moment(item.startDate).format("MMMM DD YYYY"),
        endDate: moment(item.endDate).format("MMMM DD YYYY"),
      })),
    [data]
  );
  return (
    <>
      <Card sx={{ width: "100%", height: 550 }} elevation={5}>
        <DataGrid
          columns={columns}
          rows={rows}
          initialState={{
            ...rows.initialState,
            filter: {
              filterModel: {
                items: [],
                quickFilterValues: [],
              },
            },
          }}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
        />
      </Card>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleUpdateModal}>
          <Typography color="warning.main">Edit</Typography>
        </MenuItem>
        <MenuItem onClick={handleDeleteModal}>
          <Typography color="error.main">Delete</Typography>
        </MenuItem>
      </Menu>
      <Drawer open={updateModal} onClose={handleCloseModal} anchor="right">
        <Update
          selected={selected}
          onClose={handleCloseModal}
          handleGetData={handleGetData}
        />
      </Drawer>
      <AlertModal open={deleteModal} onClose={handleCloseModal} anchor="right">
        <Delete
          selected={selected}
          onClose={handleCloseModal}
          handleGetData={handleGetData}
        />
      </AlertModal>
    </>
  );
}

function ToggleSwitch ({params}) {
  const [switchValue, setSwitchValue] = useState(params.row.status) 
  const [isChange, setIsChange] = useState(false) 
  const handleSwitch = async () => {
    setIsChange(true)
    let formData = {
      ...params.row,
      status: isChange ? !switchValue : !params.row.status
    }
    const {data, error} = await updateSchoolYear(formData)
    if (error) {
      toast.error(error)
    } else {
      toast.success("Successfully Updated")
      setSwitchValue(formData.status)
    }
  }
  return (
    <Switch  checked={switchValue} onChange={handleSwitch}/>
  )
}

export default SchoolYear;
