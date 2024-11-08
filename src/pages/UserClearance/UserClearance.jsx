import React, { useEffect, useMemo, useState } from 'react'
import Master from '../../layouts/Master'
import { Box, Button, Card, Divider, Drawer, Stack, Typography } from '@mui/material'
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid'
import { Add } from '@mui/icons-material'
import Store from './Form/Store'
import { fetchClearances } from '../../api/ClearanceApi'
import moment from 'moment'

function UserClearance() {
    const [isLoading, setIsLoading] = useState(true)
    const [storeModal, setStoreModal] = useState(false)
    const [data, setData] = useState([])
    const handleGetClearance = async () => {
        setIsLoading(true)
        const { data, error } = await fetchClearances()
        console.log(data)
        if (error) {
            toast.error(error)
        } else {
            setData(data)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        handleGetClearance()
    }, [])
    const handleCloseModal = () => {
        setStoreModal(false)
    }
    const handleStoreModal = () => {
        setStoreModal(true)
    }
    return (
        <Master>
            <Stack spacing={1}>
                <Stack direction={'row'} spacing={2}>
                    <Typography fontWeight={'bold'} variant='h5'>Clearance List:</Typography>
                    <Button variant="contained" endIcon={<Add />} onClick={handleStoreModal}>Request Clearance</Button>
                </Stack>
                <Divider />
                <DataTable isLoading={isLoading} data={data} />
            </Stack>
            <Drawer open={storeModal} onClose={handleCloseModal} anchor='right'>
                <Store handleGetData={handleGetClearance} handleCloseModal={handleCloseModal}/>
            </Drawer>
        </Master>
    )
}

function QuickSearchToolbar() {
    return (
        <Box
            sx={{
                p: 0.5,
                pb: 0,
                display: 'flex',
                justifyContent: 'end'
            }}
        >
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

function DataTable({ data, isLoading }) {
    const rows = useMemo(() =>
        data.map((item) => ({
            ...item,
            id: item._id,
            semester: `${item.schoolYear.semester} S.Y (${moment(item.schoolYear.startDate).format("YYYY")} - ${moment(item.schoolYear.startDate).format("YYYY")})`,
            name: `${item.user.lastName}, ${item.user.firstName} ${item.user.lastName[0]}.`
        })),
        [data]
    );
    return (
        <Card sx={{ height: '70vh' }}>
            <DataGrid
                loading={isLoading}
                columns={columns}
                rows={rows}
                slots={{ toolbar: QuickSearchToolbar }}
            />
        </Card>
    )
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
        field: 'semester',
        headerName: 'Semester',
        flex: 1,
        headerAlign: 'center'
    },
    {
        field: 'status',
        headerName: 'Status',
        flex: 1,
        headerAlign: 'center'
    },
    {
        field: 'clearance',
        headerName: 'Clearance',
        flex: 1,
        headerAlign: 'center'
    },
]

export default UserClearance