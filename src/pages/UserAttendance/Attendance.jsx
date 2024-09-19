import React, { useEffect, useState } from 'react';
import { Accordion, AccordionSummary, Box, Chip, Divider,LinearProgress, Stack, Typography } from '@mui/material';
import Master from '../../layouts/Master';
import { toast } from 'react-toastify';
import { ExpandMore } from '@mui/icons-material';
import { fetchEventsWithAttendanceByUserId } from '../../api/EventApi';
import moment from 'moment';
import { DataGrid } from '@mui/x-data-grid';
import { useAuthContext } from '../../hooks/useAuthContext';

function Attendance() {
    const {auth} = useAuthContext();
    const [isLoading, setIsLoading] = useState(true);
    const [event, setEvents] = useState([]);

    const handleGetData = async () => {
        const {data,error} = await fetchEventsWithAttendanceByUserId(auth.user._id)
        if (error) {
            toast.error(error)
        } else {
            setEvents(data)
            setIsLoading(false);
        }
    }

    useEffect(() => {
        handleGetData()
    },[])
    return (
        <Master>
            <Stack spacing={2}>
                <Typography variant="h5" fontWeight="bold">Attendance</Typography>
                <Box>
                    <Divider/>
                    {isLoading && <LinearProgress/>}
                </Box>
                <EventList event={event}/>
            </Stack>
        </Master>
    )
}

function EventList({event}) {

    const columns = [
        {
            field: 'date',
            headerName: 'Date',
            flex: 1,
            headerAlign: 'center'
        },
        {
            field: 'amIn',
            headerName: 'Am In',
            flex: 1,
            headerAlign: 'center',
            renderCell: (params) => (
                params.row?.amIn ? (
                    <Box sx={{textAlign: 'center'}}>
                        <Chip color='success' label={moment(params.row.amIn).format('hh:mm A')}/>
                    </Box>
                ) : 
                    <Box sx={{textAlign: 'center'}}>
                        <Chip label='Absent' color='error'/>     
                    </Box>
            )
        },
        {
            field: 'amOut',
            headerName: 'Am Out',
            flex: 1,
            headerAlign: 'center',
            renderCell: (params) => (
                params.row?.amOut ? (
                    <Box sx={{textAlign: 'center'}}>
                        <Chip color='success' label={moment(params.row.amOut).format('hh:mm A')}/>
                    </Box>
                ) : 
                    <Box sx={{textAlign: 'center'}}>
                        <Chip label='Absent' color='error'/>     
                    </Box>
            )
        },
        {
            field: 'pmIn',
            headerName: 'Pm In',
            flex: 1,
            headerAlign: 'center',
            renderCell: (params) => (
                params.row?.pmIn ? (
                    <Box sx={{textAlign: 'center'}}>
                        <Chip color='success' label={moment(params.row.pmIn).format('hh:mm A')}/>
                    </Box>
                ) : 
                    <Box sx={{textAlign: 'center'}}>
                        <Chip label='Absent' color='error'/>     
                    </Box>
            )
        },
        {
            field: 'pmOut',
            headerName: 'Pm Out',
            flex: 1,
            headerAlign: 'center',
            renderCell: (params) => (
                params.row?.pmOut ? (
                    <Box sx={{textAlign: 'center'}}>
                        <Chip color='success' label={moment(params.row.pmOut).format('hh:mm A')}/>
                    </Box>
                ) : 
                    <Box sx={{textAlign: 'center'}}>
                        <Chip label='Absent' color='error'/>     
                    </Box>
            )
        },
    ]

    const getRows = (schedules) => 
        schedules.map((sched) => ({
            id: sched?._id,
            date: moment(sched.date).format('MMM DD, YYYY'),
            amIn: sched.attendances[0]?.amIn || null,
            amOut: sched.attendances[0]?.amOut || null,
            pmIn: sched.attendances[0]?.pmIn || null,
            pmOut: sched.attendances[0]?.pmOut || null,
        })) 
    
    return(
        <Stack spacing={2}>
            {event.map((item, index) => (
                <Accordion key={index} sx={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.5)' }}>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                    >{item.event} </AccordionSummary>
                    <DataGrid
                    columns={columns}
                    rows={getRows(item.schedules)}
                    />
                </Accordion>
                )
            )}
        </Stack>
    )
}

export default Attendance