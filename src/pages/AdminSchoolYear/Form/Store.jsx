import React, { useState } from 'react';
import { Box, Button, Divider, Stack, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { toast } from 'react-toastify';
import { storeSchoolYear } from '../../../api/SchoolYearApi';
import moment from 'moment';

function Store({ onClose, handleGetData }) {
    const [formData, setFormData] = useState({
        semester: '',
        startDate: null,
        endDate: null,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleDate = (name, value) => {
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data, error } = await storeSchoolYear(formData);
        if (error) {
            toast.error(error)
        } else {
            toast.success("Successfuly Added")
            handleGetData()
            onClose();
        }
    };


    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Box sx={{ width: '70vh', p: 2 }}>
                <Typography variant='h4' fontWeight='bold'>Add School Year</Typography>
                <Divider />
                <Box mt={2}>
                    <form onSubmit={handleSubmit}>
                        <Stack direction={'column'} spacing={1}>
                            <TextField
                                label='Semester'
                                name='semester'
                                value={formData.semester}
                                onChange={handleChange}
                            />
                            <DatePicker
                                label='Start Date'
                                name='startDate'
                                value={moment(formData.startDate)}
                                maxDate={moment(formData.endDate ? formData.endDate : null)}
                                onChange={(value) => handleDate("startDate", value)}
                            />
                            <DatePicker
                                label='End Date'
                                name='endDate'
                                value={moment(formData.endDate)}
                                minDate={moment(formData.startDate ? formData.startDate : null)}
                                onChange={(value) => handleDate("endDate", value)}
                            />
                            <Button type='submit' variant='contained' sx={{ width: '100%' }}>
                                Submit
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Box>
        </LocalizationProvider>
    );
}

export default Store;
