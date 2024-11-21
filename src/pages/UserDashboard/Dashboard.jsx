import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Chart, CustomCard } from '../../components';
import Master from '../../layouts/Master';
import { Box, Card, Chip, Divider, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { fetchEventsWithAttendanceByUserId } from '../../api/EventApi';
import moment from 'moment';
import { fetchTransactionByUserId } from '../../api/TransactionApi';
import { fetchCollections, fetchCollectionWithEventAndAttendance } from '../../api/CollectionApi';
import { List, Search } from '@mui/icons-material';

function Dashboard() {
    const {auth} = useAuthContext();
    const [events, setEvents] = useState([])
    const [unfilteredEvent, setUnfilteredEvent] = useState([])
    
    const handleGetEventWithAttendance = async () => {
        const {data, error} = await fetchEventsWithAttendanceByUserId(auth.user._id)
        if (error) {
            toast.error(error)
        } else {
            const filteredSched = data.map(event => {
                return {
                    ...event,
                    schedules: event.schedules.filter(sched => moment(sched.date).isSameOrBefore(moment()))
                }
            });
            setUnfilteredEvent(data)
            setEvents(filteredSched)
        }
    }

    useEffect(() => {
        handleGetEventWithAttendance()
    },[])

    return (
        <Master>
            <Stack gap={2}>
                <InfoSection events={events} auth={auth}/>
                <EventSection unfilteredEvent={unfilteredEvent}/>
            </Stack>
        </Master>
    )
}

function InfoSection({events, auth}) {
    const theme = useTheme();
    const [attendance, setAttendance] = useState(0);
    const [penalties, setPenalties] = useState(0);
    const [transaction, setTransaction] = useState(0);
    const [credit, setCredit] = useState(0);
    
    const handleAttendance = async () => {
        let totalAttend = 0;
        events.map(event => {
            event.schedules.map(sched => {
                sched.attendances.map(attend => {
                    if (attend.amIn) {
                        totalAttend++
                    }
                    if (attend.amOut) {
                        totalAttend++
                    }
                    if (attend.pmIn) {
                        totalAttend++
                    }
                    if (attend.pmOut) {
                        totalAttend++
                    }
                })
            })
        })
        setAttendance(totalAttend)
    }

    const handlePenalties = async () => {
        let totalAttend = 0;
        let totalSched = 0;
        events.map(event => {
            event.schedules.map(sched => {
                totalSched++
                sched.attendances.map(attend => {
                    if (attend.amIn) {
                        totalAttend++
                    }
                    if (attend.amOut) {
                        totalAttend++
                    }
                    if (attend.pmIn) {
                        totalAttend++
                    }
                    if (attend.pmOut) {
                        totalAttend++
                    }
                })
            })
        })
        setPenalties(totalSched * 4 - totalAttend)
        await handleTransaction(totalAttend)
    }

    const handleTransaction = async (totalAttend) => {
        const {data, error} = await fetchTransactionByUserId(auth.user._id)
        if (error) {
            toast.error(error)
        } else {
            setTransaction(data.length)
            await handleCredit(data, totalAttend)
        }
    }

    const handleCredit = async (trans, totalAttend) => {
        const {data, error} = await fetchCollectionWithEventAndAttendance();
        if (error) {
            toast.error(error)
        } else {
            let totalFine = 0;
            let attend = 0;
            data.map((item, index) => {
                if (item.eventId) {
                    attend = item.eventId.schedules.length * 4 - totalAttend
                    totalFine +=  item.fine * attend
                } else {
                    totalFine += item.fine
                }
            })
            // const totalFine = data.reduce((sum, item) => sum + item.fine, 0);
            const totalAmount = trans.reduce((sum, item) => {
                return item.status === 'confirm' ? sum + item.amount : sum;
            }, 0);

            setCredit(totalFine - totalAmount);
        }
    }

    useEffect(() => {
        handleAttendance()
        handlePenalties()
    },[events])

    return (
        <Grid container spacing={2}>
            <Grid item xs={6} md={3}>
                <Card sx={{p:2, backgroundColor: theme.palette.primary.main}}>
                    <Typography>Attendance:</Typography>
                    <Typography textAlign="center" variant='h4' fontWeight="bold">{attendance}</Typography>
                </Card>
            </Grid>
            <Grid item xs={6} md={3}>
                <Card sx={{p:2, backgroundColor: theme.palette.error.main}}>
                    <Typography>Penalty:</Typography>
                    <Typography textAlign="center" variant='h4' fontWeight="bold">{penalties}</Typography>
                </Card>
            </Grid>
            <Grid item xs={6} md={3}>
                <Card sx={{p:2, backgroundColor: theme.palette.warning.main}}>
                    <Typography>Transaction:</Typography>
                    <Typography textAlign="center" variant='h4' fontWeight="bold">{transaction}</Typography>
                </Card>
            </Grid>
            <Grid item xs={6} md={3}>
                <Card sx={{p:2, backgroundColor: theme.palette.success.main}}>
                    <Typography>Credit:</Typography>
                    <Typography textAlign="center" variant='h4' fontWeight="bold">{credit}</Typography>
                </Card>
            </Grid>
        </Grid>
    )
}

function EventSection({unfilteredEvent}) {
    const [schedules, setSchedules] = useState([])

    const handleSchedules = (event) => {
        setSchedules(event.schedules)
    }
    return (
        <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
            <Paper
                sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                minheight: 500,
                }}
            >
                {schedules.length == 0 && (
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        height="70vh" // Full height of the viewport
                        textAlign="center"
                    >
                        <Search style={{ fontSize: 100 }} /> {/* Large icon */}
                        <Box mt={2}> {/* Margin top for spacing */}
                            Please select from the event list
                        </Box>
                    </Box>
                )}
                <SceduleList schedules={schedules}/>
            </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
                <Paper
                    sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    minheight: 500,
                    }}
                >
                    <Typography fontWeight="bold">Events List:</Typography>
                    <Divider/>
                    {unfilteredEvent.map((item, index) => {
                        const currentDate = moment();
                        let status;
                        if (currentDate.isSameOrAfter(moment(item.startDate)) && currentDate.isSameOrBefore(moment(item.endDate))) {
                            status = 'active';
                        } else if (currentDate.isBefore(moment(item.startDate))) {
                            status = 'pending';
                        } else {
                            status = 'expired';
                        }
                        return (
                            <MenuItem sx={{ display: 'flex', justifyContent: 'space-between' }} key={index} onClick={() => handleSchedules(item)}>
                                <Typography 
                                    sx={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} 
                                    noWrap
                                >
                                    {item.event}
                                </Typography>
                                {status === 'active' && (
                                    <Chip color="success" label="Active" />
                                )}
                                {status === 'pending' && (
                                    <Chip color="warning" label="Pending" />
                                )}
                                {status === 'expired' && (
                                    <Chip color="error" label="Expired" />
                                )}
                            </MenuItem>
                        )
                    })}
                </Paper>
            </Grid>
        </Grid>
    )
}

function SceduleList ({schedules}) {
    return (
        <Grid container spacing={2}>
            {schedules.map((item, index) => {
                const today = moment().startOf('day');
                const eventDate = moment(item.date).startOf('day');
                let status = '';
                let color = '';
                if (today.isBefore(eventDate)) {
                    status = 'Pending';
                    color = 'warning';  // Pending status
                } else if (today.isSame(eventDate)) {
                    status = 'Active'; 
                    color = 'success';  // Success status if today is the event date
                } else if (today.isAfter(eventDate)) {
                    status = 'Expired';
                    color = 'error';    // Expired status if today is after the event date
                }
                return (
                    <Grid 
                        item 
                        xs={6} 
                        md={4}
                        key={index}
                    >
                        <CustomCard>
                        <Stack direction={'column'} spacing={1}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography fontWeight="bold" variant='h6'>{moment(item.date).format('MMMM')}</Typography>
                            <Chip label={status} color={color}/>
                            </Box>
                            <Stack direction={'row'} justifyContent={'center'} spacing={2} sx={{ textDecoration: 'none' }}
                            >
                                <Typography color="primary" variant='h3' fontWeight="bold" textAlign='center'>
                                    {moment(item.date).format('ddd')}
                                </Typography>
                                <Typography color="primary" variant='h3' fontWeight="bold" textAlign='center'>
                                    {moment(item.date).format('DD')}
                                </Typography>
                            </Stack>
                            <Stack direction={'row'} spacing={2}>
                                <TextField color='error' label='AM IN' size='small' value={moment(item.amIn).format('hh : mm a')} disabled/>
                                <TextField label='AM OUT' size='small' value={moment(item.amOut).format('hh : mm a')} disabled/>
                            </Stack>
                            <Stack direction={'row'} spacing={2}>
                                <TextField label='PM IN' size='small' value={moment(item.pmIn).format('hh : mm a')} disabled/>
                                <TextField label='PM OUT' size='small' value={moment(item.pmOut).format('hh : mm a')} disabled/>
                            </Stack>
                        </Stack>
                        </CustomCard>
                    </Grid>
                )
            }
            )}
        </Grid>
    )
}

export default Dashboard