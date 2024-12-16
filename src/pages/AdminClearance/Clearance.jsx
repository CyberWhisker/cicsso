import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Box, Button, Card, Chip, Divider, Drawer, Menu, MenuItem, Stack, Typography } from '@mui/material';
import Master from '../../layouts/Master';
import { DataGrid, GridToolbarQuickFilter, GridActionsCellItem } from '@mui/x-data-grid';
import moment from 'moment';
import StudentClearance from '../../layouts/PDF/StudentClearance';
import { toast } from 'react-toastify';
import { useReactToPrint } from 'react-to-print/lib';
import Update from './Form/Update';
import Delete from './Form/Delete';
import { AlertModal } from '../../components';
import { fetchClearances } from '../../api/ClearanceApi';
import { Add, Edit, Visibility, Delete as DeleteIcon } from '@mui/icons-material';
import Store from './Form/Store';
import SelectedUpdate from './Form/SelectedUpdate';
import View from './Form/View';
import { fetchCollectionBySchoolYearIdandUserId } from '../../api/CollectionApi';

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
                    <Button variant='contained' endIcon={<Add />} onClick={handleStoreModal}>Add Clearance</Button>
                </Stack>
                <Divider />

                <DataGridList isLoading={isLoading} clearanceData={clearanceData} contentRef={contentRef} setSelected={setSelected} selected={selected} handleGetData={handleGetData} />
                {selected && (
                    <div style={{ display: 'none' }}>
                        <div ref={contentRef}>
                            <StudentClearance selected={selected} />
                        </div>
                    </div>
                )}
            </Stack>
            <Drawer anchor='right' onClose={handleCloseModal} open={storeModal}>
                <Store handleGetData={handleGetData} onClose={handleCloseModal} />
            </Drawer>
        </Master>
    )
}

function DataGridList({ clearanceData, isLoading, contentRef, setSelected, selected, handleGetData }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [updateModal, setUpdateModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [viewModal, setViewModal] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]); // State for selected rows

    const handleMenuOpen = (event, item) => {
        setAnchorEl(event.currentTarget);
        setSelected(item);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleUpdateModal = (params) => {
        setSelected(params.row)
        setUpdateModal(true);
    };

    const handleViewModal = (params) => {
        setSelected(params.row)
        setViewModal(true);
    };

    const handleDeleteModal = (params) => {
        setSelected(params.row)
        setDeleteModal(true);
    };

    const handleCloseModal = () => {
        setViewModal(false);
        setDeleteModal(false);
        setUpdateModal(false);
    };

    const columns = [
        { field: 'id', headerName: 'Id', headerAlign: 'center' },
        { field: 'name', headerName: 'Name', flex: 1, headerAlign: 'center' },
        { field: 'semester', headerName: 'Semester', flex: 1, headerAlign: 'center' },
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
                    {params.row.status === 'Complete' && <Chip label="Complete" color="success" />}
                    {params.row.status === 'Pending' && <Chip label="Pending" color="warning" />}
                </Box>
            ),
        },
        {
            field: 'actions',
            headerName: 'Action',
            type: 'actions',
            headerAlign: 'center',
            flex: 1,
            getActions: (params) => {
                return [
                    <GridActionsCellItem
                        icon={<Edit />}
                        label="Edit"
                        color="warning"
                        onClick={() => handleUpdateModal(params)}
                    />,
                    <GridActionsCellItem
                        icon={<Visibility />}
                        label="View"
                        color="success"
                        onClick={() => handleViewModal(params)}
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        color="error"
                        onClick={() => handleDeleteModal(params)}
                    />,
                ]

            }
        },
    ];

    const rows = useMemo(
        () =>
            clearanceData.map((item) => ({
                ...item,
                id: item._id, // Ensure this matches the `selectionModel` IDs
                name: `${item.user.lastName}, ${item.user.firstName} ${item.user.middleName[0]}.`,
                semester: item.schoolYear.semester,
            })),
        [clearanceData]
    );

    // Filter selected data based on the IDs in selectedRows
    const selectedData = rows.filter((row) => selectedRows.includes(row.id));

    return (
        <>
            <PrintCheckedPdfButton selectedData={selectedData} handleGetData={handleGetData} />
            <Card sx={{ width: '100%', height: 550 }} elevation={5}>
                <DataGrid
                    loading={isLoading}
                    columns={columns}
                    rows={rows}
                    slots={{ toolbar: QuickSearchToolbar }}
                    checkboxSelection
                    disableRowSelectionOnClick
                    onRowSelectionModelChange={(newSelectionModel) => {
                        setSelectedRows(newSelectionModel); // Update the selected rows
                    }}
                    rowSelectionModel={selectedRows}
                />

                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                    <MenuItem onClick={handleUpdateModal}>
                        <Typography color="warning.main">Edit</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleDeleteModal}>
                        <Typography color="error.main">Delete</Typography>
                    </MenuItem>
                </Menu>
            </Card>

            <Drawer open={updateModal} onClose={handleCloseModal} anchor="right">
                <Update selected={selected} onClose={handleCloseModal} handleGetData={handleGetData} />
            </Drawer>
            <Drawer open={viewModal} onClose={handleCloseModal} anchor="right">
                <View selected={selected} onClose={handleCloseModal} handleGetData={handleGetData} />
            </Drawer>
            <AlertModal open={deleteModal} onClose={handleCloseModal}>
                <Delete selected={selected} onClose={handleCloseModal} handleGetData={handleGetData} />
            </AlertModal>
        </>
    );
}

// function PrintCheckedPdfButton({ selectedData }) {
//     const handlePrint = async () => {
//         printFile()
//     };
//     const contentRef = useRef(null);
//     const printFile = useReactToPrint({ contentRef })
//     return (
//         <>
//             {selectedData.length > 0 && <Button variant='contained' onClick={() => handlePrint()}>Approve Clearance ({selectedData.length}) </Button>}


//             {selectedData.length > 0 && (
//                 <div style={{ display: 'none' }}>
//                     <div ref={contentRef}>
//                         {selectedData.map((item, index) => (
//                             <div key={index} style={{ pageBreakAfter: 'always' }}>
//                                 <StudentClearance selected={item} />
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             )}
//         </>
//     )
// }

function PrintCheckedPdfButton({ selectedData, handleGetData }) {
    const [updateModal, setUpdateModal] = useState(false)

    const handleApprove = async () => {
        setUpdateModal(true)
    };
    return (
        <>
            {selectedData.length > 0 && <Button variant='contained' onClick={() => handleApprove()}>Approve Clearance ({selectedData.length}) </Button>}
            <AlertModal open={updateModal} onClose={() => setUpdateModal(false)}>
                <SelectedUpdate selected={selectedData} onClose={() => setUpdateModal(false)} handleGetData={handleGetData} />
            </AlertModal>
        </>
    )
}

function PdfButton({ params, contentRef, setSelected }) {
    const printFile = useReactToPrint({ contentRef })
    const handlePrint = async () => {
        if (params.row.schoolYear.signatories.length == 0) {
            toast.error(`Error: No assign Signatories on ${params.row.schoolYear.semester} S.Y (${moment(params.row.schoolYear.startDate).format('YYYY')} - ${moment(params.row.schoolYear.endDate).format('YYYY')})`)
        } else {
            const eventData = await handleGetCollection(params.row)
            await setSelected({
                ...params.row,
                eventData
            })
            printFile()
        }
    };
    return (
        <Button variant='contained' color='warning' onClick={handlePrint}>PDF FILE</Button>
    )
}

const handleGetCollection = async (selected) => {
    const { data, error } = await fetchCollectionBySchoolYearIdandUserId(selected.schoolYear._id, selected.user._id)
    if (!error) {
        const eventList = data.filter((item) => item.eventId)
        const collectionList = data.filter((item) => !item.eventId && item.label != "Optional" || item.label == "Optional" && item.transaction.length > 0)
        const collectionData = collectionList.map((item) => {
            let remainingBalance = 0;
            remainingBalance = item.fine
            if (item.transaction.length > 0) {
                remainingBalance = remainingBalance - item.transaction[0].amount
            }
            return {
                id: item._id,
                collection: item.collectionName,
                status: remainingBalance,
                indicator1: item.indicator1,
                indicator2: item.indicator2,
                fine: item.fine
            }
        })
        const eventData = eventList.map((item) => {
            let countSchedule = 0;
            let countAttendance = 0;
            let remainingBalance = 0;
            item.eventId.schedules.map((item) => {
                countSchedule += 4
                if (item.attendances.length > 0) {
                    if (item.attendances[0].amIn) {
                        countAttendance++
                    }
                    if (item.attendances[0].amOut) {
                        countAttendance++
                    }
                    if (item.attendances[0].pmIn) {
                        countAttendance++
                    }
                    if (item.attendances[0].pmOut) {
                        countAttendance++
                    }
                }
            })
            remainingBalance = (countSchedule - countAttendance) * item.fine
            if (item.transaction.length > 0) {
                remainingBalance = remainingBalance - item.transaction[0].amount
            }
            return {
                id: item._id,
                collection: item.collectionName,
                status: remainingBalance,
                indicator1: item.indicator1,
                indicator2: item.indicator2,
                fine: item.fine
            }
        })
        const combinedData = [
            ...collectionData,
            ...eventData
        ]
        return combinedData
    }
}


export default Clearance