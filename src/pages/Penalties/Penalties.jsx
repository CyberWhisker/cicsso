import React, { useEffect, useMemo, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Badge, Box, Card, Chip, Divider,Grid,LinearProgress, Stack, Typography } from '@mui/material';
import Master from '../../layouts/Master';
import { CustomCard, DataTable } from '../../components';
import { toast } from 'react-toastify';
import { fetchUsers, } from '../../api/userApi';
import { CalendarMonth, ExpandMore } from '@mui/icons-material';
import { fetchAttendanceByUserId, fetchAttendances } from '../../api/AttendanceApi';
import { fetchSchedule } from '../../api/ScheduleApi';
import { fetchEvent } from '../../api/EventApi';

function Penalties() {
    const [isLoading, setIsLoading] = useState(true);
    const [usersData, setUsersData] = useState([]);
    const [selectedUserData, setSelectedUserData] = useState([]);
    const getData = async () => {
        setIsLoading(true);
        const [{ data: userData, error: userError }, { data: attendanceData, error: attendanceError }, {data: scheduleData, error : scheduleError}] = await Promise.all([
            fetchUsers(),
            fetchAttendances(),
            fetchSchedule(),
          ]);
        if (userError || attendanceError || scheduleError) {
            console.log(userError, attendanceError, scheduleError);
        } else {
            const countSchedule = scheduleData.length;
            const totalAttendance = countSchedule * 4;
            // Combine the data after both are fetched
            const combined = userData.map(user => {
                let countAbsent = 0;
                const userAttendance = attendanceData.filter(att => att.user_id === user.user_id);
                userAttendance.map((item) => {
                    if (item.amIn) {
                        countAbsent++;
                    }
                    if (item.amOut) {
                        countAbsent++;
                    }
                    if (item.pmIn) {
                        countAbsent++;
                    }
                    if (item.pmOut) {
                        countAbsent++;
                    }
                })
                return {
                    ...user,
                    attendance: userAttendance || {},
                    absent: totalAttendance - countAbsent
                };
            });
            setUsersData(combined)
        }
        setIsLoading(false);
    };
    useEffect(() => {
        
        getData();
    }, []);
    return (
        <Master>
            <Stack direction={'column'} spacing={2}>
                <Typography variant="h5" fontWeight="bold">Penalties</Typography>
                <Box>
                    <Divider/>
                    {isLoading && (
                        <LinearProgress/>
                    )}
                </Box>
            </Stack>
            <Grid container mt={1} spacing={2}>
                <Grid item xs={4}>
                    <UsersList usersData={usersData} setSelectedUserData={setSelectedUserData}/>
                </Grid>
                <Grid item xs={8}>
                    <AttendanceList selectedUserData={selectedUserData}/>
                </Grid>
            </Grid>
        </Master>
    )
}

function UsersList({usersData, setSelectedUserData}) {
    const getUserAttendance = async (id) => {
        const [
            {data:eventData, error:eventError},
            {data:schedData, error:schedError},
            {data:attendData, error:attendError},
        ] = await Promise.all([fetchEvent, fetchSchedule, fetchAttendanceByUserId(id)])
    }
    return (
        <Card sx={{p: 2, height: '75vh', overflow: 'auto'}} elevation={5}>
            <Stack direction={'column'} spacing={2}>
                <Typography fontWeight={'bold'}>User List:</Typography>
                <Divider/>
                {usersData.map((item, index) => (
                    <CustomCard key={index} >
                        <Box sx={{height: 50}} onClick={() => getUserAttendance(item.user_id)}>
                            <Stack direction={'row'} spacing={2}>
                                <Avatar alt='img' src={item.picture} sx={{
                                    height: 50,
                                    width: 50
                                }}/>
                                <Box>
                                    <Typography fontWeight={'bold'}>{item.name}</Typography>
                                    <Typography>{item.email}</Typography>
                                </Box>
                                <Badge badgeContent={item.absent} color="error">
                                    <CalendarMonth />
                                </Badge>
                            </Stack>
                        </Box>
                    </CustomCard>
                ))}
            </Stack>
        </Card>
    );
}

function AttendanceList({selectedUserData}) {

    const columns = [
        { id: 'date', label: 'Date' },
        { id: 'amInFormat', label: <Chip label="AM IN"/> },
        { id: 'amOutFormat', label: <Chip label='AM OUT'/> },
        { id: 'pmInFormat', label: <Chip label='PM IN'/> },
        { id: 'pmOutFormat', label: <Chip label='PM OUT'/> },
    ];

    const rows = useMemo(() => 
        selectedUserData.map((item) => ({
        _id: item.attendance?._id ? item.attendance._id : null,
        amInFormat: item.attendance?.amIn ? 
            <Chip color='success' label={moment(item.attendance.amIn).format('hh:mm A')}/> : 
            <Chip color='error' label='Absent'/>,
        amOutFormat: item.attendance?.amOut ? 
            <Chip color='success' label={moment(item.attendance.amOut).format('hh:mm A')}/> : 
            <Chip color='error' label='Absent'/>,
        pmInFormat: item.attendance?.pmIn ? 
            <Chip color='success' label={moment(item.attendance.pmIn).format('hh:mm A')}/> : 
            <Chip color='error' label='Absent'/>,
        pmOutFormat: item.attendance?.pmOut ? 
            <Chip color='success' label={moment(item.attendance.pmOut).format('hh:mm A')}/> : 
            <Chip color='error' label='Absent'/>,
        picture: item.picture, 
        amIn: item.attendance?.amIn ? item.attendance.amIn : null,
        amOut: item.attendance?.amOut ? item.attendance.amOut : null,
        pmIn: item.attendance?.pmIn ? item.attendance.pmIn : null,
        pmOut: item.attendance?.pmOut ? item.attendance.pmOut : null,
        })),
        [selectedUserData]
    );
    return(
        <Card sx={{p: 2, height: '75vh', overflow: 'auto'}} elevation={5}>
            <Stack direction={'column'} spacing={2}>
                <Typography fontWeight={'bold'}>Attendance</Typography>
                <Divider/>
                <Box>
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        >
                        Accordion 1
                        </AccordionSummary>
                        <AccordionDetails>
                            <DataTable 
                            rows={rows} 
                            columns={columns}
                            />
                        </AccordionDetails>
                    </Accordion>
                    
                </Box>
            </Stack>
        </Card>
    )
}

export default Penalties