import React, { useEffect, useMemo, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Badge, Box, Card, Chip, Divider,Grid,LinearProgress, Stack, Typography } from '@mui/material';
import Master from '../../layouts/Master';
import { toast } from 'react-toastify';
import { ExpandMore } from '@mui/icons-material';
import { fetchSchedule, fetchScheduleByEventId } from '../../api/ScheduleApi';
import { fetchEvent } from '../../api/EventApi';
import moment from 'moment';
import { DataGrid } from '@mui/x-data-grid';
import { fetchAttendanceBySchedule, fetchAttendanceByUserId } from '../../api/AttendanceApi';
import { useAuthContext } from '../../hooks/useAuthContext';

function Attendance() {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <Master>
            <Stack spacing={2}>
                <Typography variant="h5" fontWeight="bold">Attendance</Typography>
                <Box>
                    <Divider/>
                    {isLoading && <LinearProgress/>}
                </Box>
                <EventList setIsLoading={setIsLoading}/>
            </Stack>
        </Master>
    )
}

function EventList({setIsLoading}) {
    const [data, setData] = useState([]);
    const { auth } = useAuthContext();

    const handleGetData = async () => {
        setIsLoading(true)
        try {
            // Fetch data concurrently
            const [{ data: eventData, error: eventError }, { data: schedData, error: schedError }, { data: attendData, error: attendError }] = await Promise.all([
                fetchEvent(),
                fetchSchedule(),
                fetchAttendanceByUserId(auth.user._id)
            ]);
    
            // Handle errors
            if (eventError || schedError || attendError) {
                console.error('Errors:', { eventError, schedError, attendError });
                return;
            }
            // Create a map of attendance by scheduleId
            const attendanceMap = attendData.reduce((map, { scheduleId, ...attend }) => {
                map[scheduleId] = attend || {};
                return map;
            }, {});
    
            // Map events to schedules and attach attendance
            const currentDate = moment()
            const eventSched = eventData.map(event => ({
                ...event,
                schedules: schedData
                    .filter(schedule => schedule.eventId === event._id && moment(schedule.date).isSameOrBefore(currentDate))
                    .map(schedule => ({
                        ...schedule,
                        attendance: attendanceMap[schedule._id] || []
                    }))
            }));
            setData(eventSched)
        } catch (error) {
            console.error('Unexpected error:', error);
        }
        setIsLoading(false)
    };
    useEffect(() => {
        handleGetData()
    },[])

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
                params.row.attendance?.amIn ? (
                    <Box sx={{textAlign: 'center'}}>
                        <Chip label={params.row.attendance.amIn}/>
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
                params.row.attendance?.amOut ? (
                    <Box sx={{textAlign: 'center'}}>
                        <Chip label={params.row.attendance.amOut}/>
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
            headerAlign: 'center'
        },
        {
            field: 'pmOut',
            headerName: 'Pm Out',
            flex: 1,
            headerAlign: 'center'
        },
    ]

    return(
        <Stack spacing={2}>
            {data.map((item, index) => {
                console.log(item.schedules)
                
                const rows = useMemo(() => 
                    item.schedules.map((sched) => ({
                        id: sched._id,
                        date: moment(sched.date).format("MMMM DD, YYYY"),
                    })),[]
                );
                return (
                    <Accordion key={index} sx={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.5)' }}>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                        >{item.event} </AccordionSummary>
                        <DataGrid
                        columns={columns}
                        rows={[]}
                        />
                    </Accordion>
                )
            })}
        </Stack>
    )
}

export default Attendance