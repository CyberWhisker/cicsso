import React, { useEffect, useMemo, useState } from 'react';
import { Box, Button, Card, Chip, Divider, Drawer, LinearProgress, Menu, MenuItem, Stack, Typography } from '@mui/material';
import Master from '../../layouts/Master';
import Store from './Form/Store';
import Update from './Form/Update';
import Delete from './Form/Delete';
import { DataGrid, GridMoreVertIcon, GridToolbar, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { fetchItemByProjectId } from '../../api/ItemApi';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AlertModal } from '../../components';
import moment from 'moment';
import { Add, DisabledByDefault, KeyboardReturn } from '@mui/icons-material';
import { fetchUsers } from '../../api/userApi';
import { fetchTransactionByCollectionId } from '../../api/TransactionApi';
import { fetchCollectionById } from '../../api/CollectionApi';


function Details() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [storeModal, setStoreModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const handleGetData = async () => {
        const [
            { data: userData, error: userError },
            { data: TransData, error: TransError },
        ] = await Promise.all([
            fetchUsers(),
            fetchTransactionByCollectionId(id)
        ])
        if (userError || TransError) {
            toast.error(error)
        } else {
            const combinedData = userData.map(user => ({
                ...user,
                transaction: TransData.find(trans => trans.userId == user._id)
            }))
            setData(combinedData)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        handleGetData()
    }, [])

    return (
        <Master>
            <Stack spacing={1}>
                <Stack direction={'row'} spacing={2} alignItems={'center'}>
                    <Typography variant="h5" fontWeight="bold">Transaction List :</Typography>
                    <Button variant="contained" onClick={() => navigate(-1)} startIcon={<KeyboardReturn />}>Collection</Button>
                    <Button variant="contained" onClick={() => setStoreModal(true)} endIcon={<Add />}>Add Transaction</Button>
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
                <Store handleGetData={handleGetData} handleCloseModal={() => setStoreModal(false)} data={data} />
            </Drawer>
        </Master>
    )
}

function QuickSearchToolbar() {
    const { id } = useParams();
    const [data, setData] = useState({})

    const handleGetData = async () => {
        const { data, error } = await fetchCollectionById(id)
        if (!error) {
            setData(data[0])
        }
    }

    useEffect(() => {
        handleGetData()
    }, [])
    return (
        <Box
            sx={{
                p: 0.5,
                pb: 0,
                display: 'flex',
                justifyContent: 'space-between'
            }}
        >
            <Typography variant='h5' fontWeight={'bold'} color={'primary'}>{data?.collectionName || "Loading..."}</Typography>
            <GridToolbarQuickFilter
                quickFilterParser={(searchInput) =>
                    searchInput
                        .split(',')
                        .map((value) => value.trim())
                        .filter((value) => value !== '')
                }
            />
        </Box>
    );
}

function DataGridList({ data, handleGetData }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selected, setSelected] = useState(null);
    const [updateModal, setUpdateModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const handleMenuOpen = (event, item) => {
        setAnchorEl(event.currentTarget)
        const { _id: userId } = item
        const { _id: _id, collectionId, payment, amount, date, status, image } = item.transaction
        const newForm = {
            _id: _id,
            userId: userId,
            collectionId: collectionId,
            payment: payment,
            amount: amount,
            date: date,
            status: status,
            image: image
        }
        setSelected(newForm)
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
            field: 'name',
            headerName: 'Name',
            flex: 1,
            headerAlign: 'center'
        },
        {
            field: 'payment',
            headerName: 'Payment',
            flex: 1,
            headerAlign: 'center',
            renderCell: (params) => (
                params.row.transaction?.payment ? (
                    <Box sx={{ textAlign: 'center' }}>
                        <Chip label={params.row.transaction.payment} color='success' />
                    </Box>
                ) :
                    <Box sx={{ textAlign: 'center' }}>
                        <Chip label='Unpaid' color='error' />
                    </Box>
            )
        },
        {
            field: 'amount',
            headerName: 'Amount',
            flex: 1,
            headerAlign: 'center',
            renderCell: (params) => (
                params.row.transaction?.amount ? (
                    <Box sx={{ textAlign: 'center' }}>
                        <Chip label={`₱ ${params.row.transaction.amount.toFixed(2)}`} />
                    </Box>
                ) :
                    <Box sx={{ textAlign: 'center' }}>
                        <Chip label='Unpaid' color='error' />
                    </Box>
            )
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            headerAlign: 'center',
            renderCell: (params) => (
                params.row.transaction?.status ? (
                    <Box sx={{ textAlign: 'center' }}>
                        <StatusChip status={params.row.transaction.status} />
                    </Box>
                ) :
                    <Box sx={{ textAlign: 'center' }}>
                        <Chip label='Unpaid' color='error' />
                    </Box>
            )
        },
        {
            field: 'date',
            headerName: 'Date',
            flex: 1,
            headerAlign: 'center'
        },
        {
            field: 'setting',
            headerName: 'Setting',
            renderCell: (params) => (
                params.row.transaction?._id ? (
                    <Stack height={'100%'} justifyContent={'center'} alignItems={'center'}>
                        <GridMoreVertIcon onClick={(e) => handleMenuOpen(e, params.row)} sx={{ cursor: 'pointer' }} />
                    </Stack>
                ) : (
                    <Stack height={'100%'} justifyContent={'center'} alignItems={'center'}>
                        <DisabledByDefault />
                    </Stack>
                )
            ),
            headerAlign: 'center'

        },
    ]

    const rows = useMemo(() =>
        data.map((item) => ({
            ...item,
            id: item._id,
            name: `${item.lastName}, ${item.firstName} ${item.middleName ? item.middleName[0] : ''}.`,
            date: item.transaction?.date ? moment(item.transaction.date).format("MMMM DD YYYY") :
                null,
            payment: item.transaction?.payment,
            amount: item.transaction?.amount,
            status: item.transaction?.status
        })),
        [data]
    );
    return (
        <>
            <Card sx={{ width: '100%' }} elevation={5}>
                <DataGrid
                    sx={{ height: '80vh' }}
                    columns={columns}
                    rows={rows}
                    slots={{ toolbar: QuickSearchToolbar }}
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
                    <Typography color="error.main">Decline</Typography>
                </MenuItem>
            </Menu>
            <Drawer open={updateModal} onClose={handleCloseModal} anchor='right'>
                <Update selected={selected} onClose={handleCloseModal} handleGetData={handleGetData} data={data} />
            </Drawer>
            <AlertModal open={deleteModal} onClose={handleCloseModal} anchor='right'>
                <Delete selected={selected} onClose={handleCloseModal} handleGetData={handleGetData} />
            </AlertModal>
        </>
    )
}

function StatusChip({ status }) {
    if (status == 'pending') {
        return <Chip color='warning' label='Pending' />
    } else if (status == 'confirm') {
        return <Chip color='success' label='Confirm' />
    } else {
        return <Chip color='error' label='Decline' />
    }
}
export default Details