import React, { useEffect, useMemo, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Badge, Box, Card, Chip, Divider,Grid,LinearProgress, Stack, Typography } from '@mui/material';
import Master from '../../layouts/Master';
import { toast } from 'react-toastify';
import { ExpandMore } from '@mui/icons-material';
import { fetchScheduleByEventId } from '../../api/ScheduleApi';
import { fetchEvent } from '../../api/EventApi';
import moment from 'moment';
import { DataGrid } from '@mui/x-data-grid';
import { fetchAttendanceBySchedule } from '../../api/AttendanceApi';

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
                <EventList/>
            </Stack>
        </Master>
    )
}

function EventList() {
    const [eventData, setEventData] = useState([]);
    const [schedAttend, setSchedAttend] = useState([]);

    const handleGetEvent = async () => {
        const {data, error} = await fetchEvent();
        if (error) {
            toast.error(error)
        } else {
            setEventData(data);
        }
    }
    const handleGetSchedAttend = async (eventId) => {
        try {
            const { data: schedData, error: schedError } = await fetchScheduleByEventId(eventId);
    
        if (schedError) {
            toast.error(schedError);
            return;
        }
    
        // Fetch attendance for each schedule asynchronously
        const combinedData = await Promise.all(
            schedData.map(async (event) => {
            const { data: attendData, error: attendError } = await fetchAttendanceBySchedule(event._id);
    
            if (attendError) {
                toast.error(attendError);
                return { ...event, attendData: null }; // Return event with empty attendance in case of error
            }
    
            return {
                ...event,
                attendance: attendData[0],
            };
            })
        );
        console.log(combinedData)
            setSchedAttend(combinedData);
        } catch (err) {
            toast.error("An unexpected error occurred");
            console.error(err);
        }
    };
    useEffect(() => {
        handleGetEvent()
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
            headerAlign: 'center'
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

    const rows = useMemo(() => 
        schedAttend.map((item) => ({
            id: item._id,
            date: moment(item.date).format("MMMM DD, YYYY"),
        })),
        [schedAttend]
    );
    return(
        <Stack spacing={2}>
            {eventData.map((item, index) => (
                <Accordion key={index} sx={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.5)' }}>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        onClick={() => handleGetSchedAttend(item._id)}
                    >{item.event} </AccordionSummary>
                    <DataGrid
                    columns={columns}
                    rows={rows}
                    />
                </Accordion>
            ))}
        </Stack>
    )
}

export default Attendance