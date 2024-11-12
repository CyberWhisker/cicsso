import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Box, Button, Card, Chip, Divider, Drawer, Menu, MenuItem, Stack, Typography } from '@mui/material';
import Master from '../../layouts/Master';
import { DataGrid, GridToolbarQuickFilter, GridMoreVertIcon } from '@mui/x-data-grid';
import moment from 'moment';
import StudentClearance from '../../layouts/PDF/StudentClearance';
import { toast } from 'react-toastify';
import { fetchActiveSchoolYear } from '../../api/SchoolYearApi';
import { useReactToPrint } from 'react-to-print/lib';
import Update from './Form/Update';
import Delete from './Form/Delete';
import { AlertModal } from '../../components';
import { fetchClearances } from '../../api/ClearanceApi';
import { Add } from '@mui/icons-material';
import Store from './Form/Store';

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


function Clearance() {
    const [selected, setSelected] = useState(null);
    const [clearanceData, setClearanceData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [storeModal, setStoreModal] = useState(false);

    const handleStoreModal = () => {
        setStoreModal(true)
    }

    const handleCloseModal = () => {
        setStoreModal(false)
    }

    const handleGetData = async () => {
        setIsLoading(true)
        const { data, error } = await fetchClearances()
        if (error) {
            toast.error(error)
        } else {
            setClearanceData(data)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        handleGetData()
    }, [])


    const contentRef = useRef(null);

    return (
        <Master>
            <Stack spacing={2}>
                <Stack direction={'row'} spacing={2} alignItems={'center'}>
                    <Typography variant="h5" fontWeight="bold">Clearance Master List :</Typography>
                    <Button variant='contained' endIcon={<Add/>} onClick={handleStoreModal}>Add Clearance</Button>
                </Stack>
                <Divider />

                <DataGridList isLoading={isLoading} clearanceData={clearanceData} contentRef={contentRef} setSelected={setSelected} selected={selected} handleGetData={handleGetData} />
                {selected && (
                    <div style={{display: 'none'}}>
                        <div ref={contentRef}>
                            <StudentClearance selected={selected} />
                        </div>
                    </div>
                )}
            </Stack>
            <Drawer anchor='right' onClose={handleCloseModal} open={storeModal}>
                <Store handleGetData={handleGetData} onClose={handleCloseModal}/>
            </Drawer>
        </Master>
    )
}

function DataGridList({ clearanceData, isLoading, contentRef, setSelected, selected, handleGetData }) {
    const [anchorEl, setAnchorEl] = useState(null);
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
            headerName: 'Id',
            flex: 1,
            headerAlign: 'center',
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
            headerAlign: 'center',
        },
        {
            field: 'clearance',
            headerName: 'Clearance',
            flex: 1,
            headerAlign: 'center',
            renderCell: (params) => (
                <Box sx={{ textAlign: 'center' }}>
                    <PdfButton params={params} contentRef={contentRef} setSelected={setSelected} />
                </Box>
            ),
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            headerAlign: 'center',
            renderCell: (params) => (
                <Box sx={{ textAlign: 'center' }}>
                    {params.row.status == "Complete" && (
                        <Chip label="Complete" color='success' />
                    )}
                    {params.row.status == "Pending" && (
                        <Chip label="Pending" color='warning' />
                    )}
                </Box>
            ),
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
        clearanceData.map((item) => ({
            ...item,
            id: item._id,
            name: `${item.user.lastName}, ${item.user.firstName} ${item.user.middleName[0]}.`,
            semester: item.schoolYear.semester
        })),
        [clearanceData]
    );
    return (
        <>
            <Card sx={{ width: '100%', height: 550 }} elevation={5}>
                <DataGrid
                    loading={isLoading}
                    columns={columns}
                    rows={rows}
                    slots={{ toolbar: QuickSearchToolbar }}
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                        },
                    }}
                />

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

function PdfButton({ params, contentRef, setSelected }) {
    const printFile = useReactToPrint({ contentRef })
    const handlePrint = async () => {
        await setSelected(params.row)
        printFile()
    };
    return (
        <Button variant='contained' color='warning' onClick={handlePrint}>PDF FILE</Button>
    )
}


export default Clearance