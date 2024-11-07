import React, { Component, useEffect, useMemo, useRef, useState } from 'react';
import { Avatar, Box, Button, Card, Chip, Divider, Stack, Typography } from '@mui/material';
import Master from '../../layouts/Master';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import moment from 'moment';
import StudentClearance from '../../layouts/PDF/StudentClearance';
import { fetchUsers } from '../../api/userApi';
import { toast } from 'react-toastify';
import { fetchActiveSchoolYear, fetchSchoolYear } from '../../api/SchoolYearApi';
import { useReactToPrint } from 'react-to-print/lib';

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
    const [selected, setSelected] = useState({});
    const [userData, setUserData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [schoolYearData, setSchoolYearData] = useState([]);

    const handleGetSchoolYearData = async () => {
        const { data, error } = await fetchActiveSchoolYear();
        if (error) {
            toast.error("No Active School Year Available")
        } else {
            setSchoolYearData(data)
        }
    }

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
        handleGetSchoolYearData()
    }, [])

    
    const contentRef = useRef(null);

    return (
        <Master>
            <Stack spacing={2}>
                <Stack direction={'row'} spacing={2} alignItems={'center'}>
                    <Typography variant="h5" fontWeight="bold">Clearance Master List :</Typography>
                </Stack>
                <Divider />

                <DataGridList isLoading={isLoading} userData={userData} schoolYearData={schoolYearData} contentRef={contentRef} setSelected={setSelected}/>

                <div ref={contentRef}>
                    <StudentClearance selected={selected}/>
                </div>
            </Stack>
        </Master>
    )
}

function DataGridList({ userData, isLoading, schoolYearData, contentRef, setSelected }) {
    const columns = [
        {
            field: 'pictureFormat',
            headerName: 'Avatar',
            flex: 1,
            headerAlign: 'center',
            renderCell: ({ params }) => (
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
                    <PdfButton params={params} contentRef={contentRef} setSelected={setSelected}/>
                </Box>
            ),
        }
    ]

    const rows = useMemo(() =>
        userData.map((item) => ({
            ...item,
            name: `${item.lastName}, ${item.firstName} ${item.middleName[0]}.`,
            pictureFormat: item.image,
            semester: schoolYearData.semester,
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
                    slots={{ toolbar: QuickSearchToolbar }}
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                        },
                    }}
                />
            </Card>
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