import React, { useEffect, useMemo, useState } from 'react';
import { Box, Button, Card, Divider, Drawer, LinearProgress, Menu, MenuItem, Stack, Typography } from '@mui/material';
import Master from '../../layouts/Master';
import Store from './Form/Store';
import Update from './Form/Update';
import Delete from './Form/Delete';
import { DataGrid, GridMoreVertIcon, GridToolbar } from '@mui/x-data-grid';
import { fetchItemByProjectId } from '../../api/ItemApi';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AlertModal } from '../../components';
import moment from 'moment';
import { KeyboardReturn } from '@mui/icons-material';


function Details() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [storeModal, setStoreModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const handleGetData = async () => {
        setIsLoading(true)
        const { data, error } = await fetchItemByProjectId(id)
        if (error) {
            toast.error(error)
        } else {
            setData(data)
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
                    <Typography variant="h5" fontWeight="bold">Item List :</Typography>
                    <Button variant="contained" onClick={() => navigate(-1)} startIcon={<KeyboardReturn />}>Projects</Button>
                    <Button variant="contained" onClick={() => setStoreModal(true)}>Add Item</Button>
                </Stack>
                <Box>
                    <Divider />
                    {isLoading &&
                        <LinearProgress />
                    }
                </Box>
                <DataGridList data={data} handleGetData={handleGetData} />
            </Stack>
            <Drawer open={storeModal} anchor='right' onClose={() => setStoreModal(false)}>
                <Store handleGetData={handleGetData} onClose={() => setStoreModal(false)} />
            </Drawer>
        </Master>
    )
}

function DataGridList({ data, handleGetData }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selected, setSelected] = useState(null);
    const [updateModal, setUpdateModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
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
    const handleCloseModal = () => {
        setDeleteModal(false)
        setUpdateModal(false)
    }
    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            flex: 1,
            headerAlign: 'center'
        },
        {
            field: 'item',
            headerName: 'Item',
            flex: 1,
            headerAlign: 'center'
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            flex: 1,
            headerAlign: 'center',
            type: 'number'
        },
        {
            field: 'amount',
            headerName: 'Unit Cost',
            flex: 1,
            headerAlign: 'center',
            type: 'number',
            valueFormatter: (params) => {
                const value = params || 0;
                return `₱${value.toFixed(2)}`;
            },
        },
        {
            field: 'total',
            headerName: 'Total',
            flex: 1,
            headerAlign: 'center',
            type: 'number',
            valueFormatter: (params) => {
                const value = params || 0;
                return `₱${value.toFixed(2)}`;
            },
        },
        {
            field: 'date',
            headerName: 'Date',
            flex: 1,
            headerAlign: 'center',
            type: 'date'
        },
        {
            field: 'setting',
            headerName: 'Setting',
            renderCell: (params) => (
                <Box sx={{ textAlign: 'center' }}>
                    <GridMoreVertIcon onClick={(e) => handleMenuOpen(e, params.row)} sx={{ cursor: 'pointer' }} />
                </Box>
            ),
            headerAlign: 'center'

        },
    ]

    const rows = useMemo(() =>
        data.map((item) => ({
            ...item,
            id: item._id,
            date: new Date(item.date),
            total: item.amount * item.quantity
        })),
        [data]
    );
    return (
        <>
            <Card sx={{ width: '100%', height: 550 }} elevation={5}>
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
            <Drawer open={updateModal} onClose={handleCloseModal} anchor='right'>
                <Update selected={selected} onClose={handleCloseModal} handleGetData={handleGetData} />
            </Drawer>
            <AlertModal open={deleteModal} onClose={handleCloseModal} anchor='right'>
                <Delete selected={selected} onClose={handleCloseModal} handleGetData={handleGetData} />
            </AlertModal>
        </>
    )
}
export default Details