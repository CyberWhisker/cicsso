import React, { useEffect, useMemo, useState } from 'react';
import { Accordion, AccordionSummary, Avatar, Badge, Box, Card, Chip, Divider, Grid, LinearProgress, Stack, Typography } from '@mui/material';
import Master from '../../layouts/Master';
import { CustomCard, DataTable } from '../../components';
import { fetchUsersWithAttendance, } from '../../api/userApi';
import { CalendarMonth, ExpandMore } from '@mui/icons-material';
import { fetchSchedule } from '../../api/ScheduleApi';
import { fetchEventsWithAttendanceByUserId } from '../../api/EventApi';
import moment from 'moment';
import { toast } from 'react-toastify';

function Penalties() {
    const [isLoading, setIsLoading] = useState(true);
    const [usersData, setUsersData] = useState([]);
    const [eventWithAttend, setEventWithAttend] = useState([]);
    const handleGetUser = async () => {
        setIsLoading(true);

        const [{ data: userData, error: userError }, { data: schedData, error: schedError }] = await Promise.all([
            fetchUsersWithAttendance(),
            fetchSchedule(),
        ])

        if (userError, schedError) {
            toast.error('Something went wrong....');
        } else {
            let totalSchedule = 0;
            schedData.map(sched => {
                if (moment(sched.date).isSameOrBefore(moment())) {
                    totalSchedule++
                }
            })
            totalSchedule = totalSchedule * 4
            const newData = userData.map(user => {
                let present = 0
                if (user.attendances.length > 0) {
                    user.attendances.map(attendance => {
                        if (attendance.amIn) {
                            present++
                        }
                        if (attendance.amOut) {
                            present++
                        }
                        if (attendance.pmIn) {
                            present++
                        }
                        if (attendance.pmOut) {
                            present++
                        }
                    })
                }
                let absent = totalSchedule - present
                return {
                    ...user,
                    absent: absent
                }
            })
            setUsersData(newData)
        }
        setIsLoading(false);
    };
    useEffect(() => {
        handleGetUser();
    }, []);
    return (
        <Master>
            <Stack direction={'column'} spacing={2}>
                <Typography variant="h5" fontWeight="bold">Penalties</Typography>
                <Box>
                    <Divider />
                    {isLoading && (
                        <LinearProgress />
                    )}
                </Box>
            </Stack>
            <Grid container mt={1} spacing={2}>
                <Grid item xs={4}>
                    <UsersList usersData={usersData} setEventWithAttend={setEventWithAttend} setIsLoading={setIsLoading} />
                </Grid>
                <Grid item xs={8}>
                    <AttendanceList eventWithAttend={eventWithAttend} />
                </Grid>
            </Grid>
        </Master>
    )
}

function UsersList({ usersData, setEventWithAttend, setIsLoading }) {
    const getUserAttendance = async (id) => {
        setIsLoading(true)
        try {
            const { data, error } = await fetchEventsWithAttendanceByUserId(id)
            if (error) {
                toast.error(error.message)
            } else {
                const newData = data.map((event) => ({
                    ...event,
                    schedules: event.schedules.filter(sched => moment(sched.date).isSameOrBefore(moment()))
                }))
                setEventWithAttend(newData)
            }
        } catch (error) {
            console.error('Unexpected error:', error);
        }
        setIsLoading(false)
    };
    return (
        <Card sx={{ p: 2, minHeight: '75vh', overflow: 'auto' }} elevation={5}>
            <Stack direction={'column'} spacing={2}>
                <Typography fontWeight={'bold'}>User List:</Typography>
                <Divider />
                {usersData.map((item, index) => (
                    <CustomCard key={index} >
                        <Box sx={{ minHeight: 50 }} onClick={() => getUserAttendance(item._id)}>
                            <Stack direction={'row'} spacing={2} justifyContent={'space-between'}>
                                <Stack direction={'row'} spacing={2}>
                                    <Avatar alt='img' src={item.picture} sx={{
                                        height: 50,
                                        width: 50
                                    }} />
                                    <Box>
                                        <Typography fontWeight={'bold'}>{item.lastName}, {item.firstName} {item.middleName[0]}.</Typography>
                                        <Typography>{item.email}</Typography>
                                    </Box>
                                </Stack>
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

function AttendanceList({ eventWithAttend }) {
    const currentDay = moment()
    // Columns definition
    const columns = useMemo(() => [
        { id: 'date', label: 'Date' },
        { id: 'amInFormat', label: <Chip label="AM IN" /> },
        { id: 'amOutFormat', label: <Chip label='AM OUT' /> },
        { id: 'pmInFormat', label: <Chip label='PM IN' /> },
        { id: 'pmOutFormat', label: <Chip label='PM OUT' /> },
    ], []);

    // Function to get rows from schedules
    const getRows = (schedules) =>
        schedules.map((item) => {
            const attendance = item.attendances?.[0];
            return {
                date: moment(item.date).format('MMM - DD - YYYY ddd'),
                amInFormat: attendance?.amIn &&
                    <Chip color='success' label={moment(attendance.amIn).format('hh:mm A')} /> ||
                    moment(item.pmIn).isBefore(currentDay) ?
                    <Chip color='error' label='Absent' /> :
                    <Chip label='Absent' />,
                amOutFormat: attendance?.amOut &&
                    <Chip color='success' label={moment(attendance.amOut).format('hh:mm A')} /> ||
                    moment(item.amOut).isBefore(currentDay) ?
                    <Chip color='error' label='Absent' /> :
                    <Chip label='Absent' />,
                pmInFormat: attendance?.pmIn &&
                    <Chip color='success' label={moment(attendance.pmIn).format('hh:mm A')} /> ||
                    moment(item.pmIn).isBefore(currentDay) ?
                    <Chip color='error' label='Absent' /> :
                    <Chip label='Absent' />,
                pmOutFormat: attendance?.pmOut &&
                    <Chip color='success' label={moment(attendance.pmOut).format('hh:mm A')} /> ||
                    moment(item.pmOut).isBefore(currentDay) ?
                    <Chip color='error' label='Absent' /> :
                    <Chip label='Absent' />,
                amIn: attendance?.amIn || null,
                amOut: attendance?.amOut || null,
                pmIn: attendance?.pmIn || null,
                pmOut: attendance?.pmOut || null,
            }
        });

    return (
        <Card sx={{ p: 2, height: '75vh', overflow: 'auto' }} elevation={5}>
            <Stack direction={'column'} spacing={2}>
                <Typography fontWeight={'bold'}>Attendance</Typography>
                <Divider />
                <Box>
                    {eventWithAttend.map((event) => (
                        <Accordion key={event._id}>
                            <AccordionSummary
                                expandIcon={<ExpandMore />}
                                aria-controls={`panel-${event._id}-content`}
                                id={`panel-${event._id}-header`}
                            >
                                {event.event}
                            </AccordionSummary>
                            <DataTable
                                columns={columns}
                                rows={getRows(event.schedules)}
                            />
                        </Accordion>
                    ))}
                </Box>
            </Stack>
        </Card>
    );
}

export default Penalties