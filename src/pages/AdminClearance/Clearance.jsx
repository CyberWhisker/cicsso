import React, { useEffect, useMemo, useState } from 'react';
import { Avatar, Box, Button, Card, Chip, Divider, Drawer, LinearProgress, Menu, MenuItem, Stack, Typography } from '@mui/material';
import Master from '../../layouts/Master';
import Store from './Form/Store';
import Update from './Form/Update';
import Delete from './Form/Delete';
import { DataGrid, GridMoreVertIcon, GridToolbar } from '@mui/x-data-grid';
import { AlertModal } from '../../components';
import moment from 'moment';
import StudentClearance from '../../layouts/PDF/StudentClearance';
import { fetchUsers } from '../../api/userApi';
import { toast } from 'react-toastify';


function Clearance() {
    const [userData, setUserData] = useState([])
    const [storeModal, setStoreModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const handleGetData = async () => {
        setIsLoading(true)
        const { data, error } = await fetchUsers()
        if (error) {
            toast.error(error)
        } else {
            setUserData(data)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        handleGetData()
    }, [])

    return (
        <Master>
            <Stack spacing={2}>
                <Stack direction={'row'} spacing={2} alignItems={'center'}>
                    <Typography variant="h5" fontWeight="bold">Clearance Master List :</Typography>
                </Stack>
                <Divider />

                <DataGridList isLoading={isLoading} userData={userData} handleGetData={handleGetData} />

                {/* <Document/> */}
            </Stack>
        </Master>
    )
}

function DataGridList({ userData, handleGetData, isLoading }) {
    const [selected, setSelected] = useState(null);
    const [updateModal, setUpdateModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const handleCloseModal = () => {
        setDeleteModal(false)
        setUpdateModal(false)
    }

    const columns = [
        {
            field: 'pictureFormat',
            headerName: 'Avatar',
            flex: 1,
            headerAlign: 'center',
            renderCell: ({params}) => (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Avatar src={params?.row.image} alt="Img" />
                </Box>
            )
        },
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            headerAlign: 'center'
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            headerAlign: 'center',
            renderCell: (params) => (
                <Box sx={{ textAlign: 'center' }}>
                    <ChipCollection params={params}/>
                </Box>
            ),
        },
        {
            field: 'clearance',
            headerName: 'Clearance',
            flex: 1,
            headerAlign: 'center',
            renderCell: ({params}) => (
                <Box sx={{ textAlign: 'center' }}>
                    <PdfButton/>
                </Box>
            ),
        },
        {
            field: 'setting',
            headerName: 'Setting',
            renderCell: (params) => (
                <Box sx={{ textAlign: 'center' }}>
                    <DropDownMenu params={params} setSelected={setSelected} />
                </Box>
            ),
            headerAlign: 'center'

        },
    ]

    const rows = useMemo(() =>
        userData.map((item) => ({
            ...item,
            name: `${item.lastName}, ${item.firstName} ${item.middleName[0]}.`,
            pictureFormat: item.image,
            date: moment(item.date).format("MMMM DD YYYY")
        })),
        [userData]
    );
    return (
        <>
            <Card sx={{ width: '100%', height: 550 }} elevation={5}>
                <DataGrid
                    loading={isLoading}
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
            <Drawer open={updateModal} onClose={handleCloseModal} anchor='right'>
                <Update selected={selected} onClose={handleCloseModal} handleGetData={handleGetData} />
            </Drawer>
            <AlertModal open={deleteModal} onClose={handleCloseModal} anchor='right'>
                <Delete selected={selected} onClose={handleCloseModal} handleGetData={handleGetData} />
            </AlertModal>
        </>
    )
}

function PdfButton () {
    return (
        <Button variant='contained' color='warning'>PDF FILE</Button>
    )
}

function ChipCollection ({params}) {
    console.log(params.row)
    return (
        <Chip label="Complete" color='success'/>
    )
}

function DropDownMenu({ params, setSelected }) {

    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenuOpen = (event, item) => {
        setAnchorEl(event.currentTarget)
        setSelected(item)
    }
    const handleMenuClose = (event, item) => {
        setAnchorEl(null)
    }
    const handleUpdateModal = () => {
        handleMenuClose();
        setUpdateModal(true)
    }
    const handleDeleteModal = () => {
        handleMenuClose();
        setDeleteModal(true)
    }
    return (
        <>
            <GridMoreVertIcon onClick={(e) => handleMenuOpen(e, params.row)} sx={{ cursor: 'pointer' }} />
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
        </>
    )
}

function Document() {
    return (
        <Stack spacing={2}>
            <StudentClearance />
            <Button variant='contained' color='error' disabled>Not Available</Button>
        </Stack>
    )
}

export default Clearance