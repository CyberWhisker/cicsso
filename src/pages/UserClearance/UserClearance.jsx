import React, { useEffect, useMemo, useRef, useState } from 'react';
import Master from '../../layouts/Master';
import { Box, Button, Card, Chip, Divider, Drawer, Stack, Typography } from '@mui/material';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { Add } from '@mui/icons-material';
import Store from './Form/Store';
import { fetchClearanceByUserId, fetchClearances } from '../../api/ClearanceApi';
import moment from 'moment';
import { useReactToPrint } from 'react-to-print';
import StudentClearance from '../../layouts/PDF/StudentClearance';
import { fetchCollectionBySchoolYear, fetchCollectionBySchoolYearIdandUserId, fetchCollections } from '../../api/CollectionApi';
import { useAuthContext } from '../../hooks/useAuthContext';

function UserClearance() {
    const { auth } = useAuthContext();
    const [isLoading, setIsLoading] = useState(true);
    const [storeModal, setStoreModal] = useState(false);
    const [selected, setSelected] = useState(null);
    const [data, setData] = useState([]);

    const handleGetClearance = async () => {
        setIsLoading(true);
        const { data, error } = await fetchClearanceByUserId(auth.user._id);
        if (error) {
            toast.error(error);
        } else {
            setData(data);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        handleGetClearance();
    }, []);

    const handleCloseModal = () => {
        setStoreModal(false);
    };

    const handleStoreModal = () => {
        setStoreModal(true);
    };

    const contentRef = useRef(null);

    return (
        <Master>
            <Stack spacing={1}>
                <Stack direction={'row'} spacing={2}>
                    <Typography fontWeight={'bold'} variant="h5">
                        Clearance List:
                    </Typography>
                    <Button variant="contained" endIcon={<Add />} onClick={handleStoreModal}>
                        Request Clearance
                    </Button>
                </Stack>
                <Divider />
                <DataTable isLoading={isLoading} data={data} setSelected={setSelected} contentRef={contentRef} />
                {selected && (
                    <div style={{ display: 'none' }}>
                        <div ref={contentRef}>
                            <StudentClearance selected={selected} />
                        </div>
                    </div>
                )}
            </Stack>
            <Drawer open={storeModal} onClose={handleCloseModal} anchor="right">
                <Store handleGetData={handleGetClearance} handleCloseModal={handleCloseModal} />
            </Drawer>
        </Master>
    );
}

function QuickSearchToolbar() {
    return (
        <Box
            sx={{
                p: 0.5,
                pb: 0,
                display: 'flex',
                justifyContent: 'end',
            }}
        >
            <GridToolbarQuickFilter
                quickFilterParser={(searchInput) =>
                    searchInput.split(',').map((value) => value.trim()).filter((value) => value !== '')
                }
            />
        </Box>
    );
}

function DataTable({ data, isLoading, setSelected, contentRef }) {
    const columns = [
        { field: 'id', headerName: 'ID', flex: 1, headerAlign: 'center' },
        { field: 'name', headerName: 'Name', flex: 1, headerAlign: 'center' },
        { field: 'semester', headerName: 'Semester', flex: 1, headerAlign: 'center' },
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
            field: 'clearance',
            headerName: 'Clearance',
            flex: 1,
            headerAlign: 'center',
            renderCell: (params) => (
                <Box sx={{ textAlign: 'center' }}>
                    <PdfButton params={params} setSelected={setSelected} contentRef={contentRef} />
                </Box>
            ),
        },
    ];
    const rows = useMemo(
        () =>
            data.map((item) => ({
                ...item,
                id: item._id,
                semester: `${item.schoolYear.semester} S.Y (${moment(item.schoolYear.startDate).format('YYYY')} - ${moment(item.schoolYear.startDate).format('YYYY')})`,
                name: `${item.user.lastName}, ${item.user.firstName} ${item.user.lastName[0]}.`,
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
    );
}

function PdfButton({ params, setSelected, contentRef }) {
    const printFile = useReactToPrint({ contentRef })

    const handlePrint = async () => {
        const eventData = await handleGetCollection(params.row)
        await setSelected({
            ...params.row,
            eventData
        })
        await printFile()
    };

    return (
        <>
            {params.row.status == 'Complete' && (
                <Button variant="contained" color="warning" onClick={handlePrint}>
                    PDF FILE
                </Button>
            )}
            {params.row.status == 'Pending' && (
                <Button variant="contained" color="error" >
                    Unavailable
                </Button>
            )}
        </>
    );
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

export default UserClearance;
