import React, { useEffect, useState } from 'react'
import Master from '../../layouts/Master'
import { Box, Button, Chip, Divider, Drawer, Grid, LinearProgress, MenuItem, Stack, TextField, Typography } from '@mui/material'
import { CustomCard, DropDown } from '../../components'
import { KeyboardReturn } from '@mui/icons-material'
import { Link, useParams } from 'react-router-dom'
import Update from './Form/Update'
import useFetch from 'react-fetch-hook'
import moment from 'moment'

function Schedule() {
    const {id} = useParams();
    const {isLoading, data, error} = useFetch(`${import.meta.env.VITE_API}/api/schedule/event/${id}`);
    return (
        <Master>
            <Stack direction={'column'} spacing={2}>
                <Stack direction={'row'} spacing={2}>
                    <Typography variant="h5" fontWeight='bold'>Schedules:</Typography>
                    <Button component={Link} to='/events' variant='contained' startIcon={<KeyboardReturn/>}>Events List</Button>
                </Stack>
                <Box>
                    <Divider/>
                    {isLoading && (
                    <LinearProgress/>
                    )}
                </Box>
                <Box>
                    <ScheduleList data={data} isLoading={isLoading}/>
                </Box>
            </Stack>
        </Master>
    )
}

function ScheduleList({data, isLoading}) {
    const [updateModal, setUpdateModal] = useState(false);
    const [updateData, setUpdateData] = useState([]);
    const [schedule, setSchedule] = useState([]);

    const handleCloseModal = () => {
        setUpdateModal(false);
    }

    const handleUpdateModal = (data) => {
        setUpdateModal(true);
        setUpdateData(data)
    }

    useEffect(() => {
    if (data && !isLoading) {
        setSchedule(data);
    }
    }, [data, isLoading, setSchedule])
    return (
        <Grid container spacing={2}>
            {schedule.map((item, index) => 
            (
                <Grid 
                    item 
                    xs={6} 
                    md={3}
                    key={index}
                >
                    <CustomCard>
                    <Stack direction={'column'} spacing={1}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography fontWeight="bold" variant='h6'>{moment(item.date).format('MMMM')}</Typography>
                        <DropDown>
                            <MenuItem onClick={() => handleUpdateModal(item)}>Edit</MenuItem>
                            {/* <MenuItem onClick={() => setDeleteModal(true)}>Delete</MenuItem> */}
                        </DropDown>
                        </Box>
                        <Stack direction={'row'} justifyContent={'center'} spacing={2} sx={{ textDecoration: 'none' }} 
                        component={Link}
                        to={`/attendance/${item._id}`}
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
            )}
            <Drawer open={updateModal} anchor='right' onClose={handleCloseModal}>
                <Update data={updateData} onClose={handleCloseModal} setSchedule={setSchedule} schedule={schedule}/>
            </Drawer>
        </Grid>
    );
}

export default Schedule