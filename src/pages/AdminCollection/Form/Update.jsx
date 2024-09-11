import React, { useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { updateCollection } from '../../../api/CollectionApi';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment';

function Update({selected, handleCloseModal, handleGetData}) {
    const [formData, setFormData] = useState(selected);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => 
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleDateChange = (name, value) => 
        setFormData({ ...formData, [name]: value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        const { collectionName, fine, startDate, endDate } = formData;
        if (!collectionName || !fine || !startDate || !endDate) {
            toast.error("All fields are required");
            return;
        }

        const {data, error} = await updateCollection(formData)
        if (error) {
            toast.error(error)
        } else {
            handleCloseModal();
            handleGetData();
            toast.success("Event added successfully");
        }
        setSubmitted(false);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Box sx={{ width: '60vh', p: 2 }}>
                <Typography variant='h4' fontWeight='bold'>Update Collection</Typography>
                <Box mt={2}>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={2}>
                            <TextField
                                label='Enter Collection'
                                name='collectionName'
                                variant="outlined"
                                sx={{ width: '100%'}}
                                value={formData.collectionName}
                                onChange={handleChange}
                                error={submitted && !formData.collectionName}
                                helperText={submitted && !formData.collectionName ? "Required" : ""}
                            />
                            <TextField
                                label='Enter Fine'
                                name='fine'
                                variant="outlined"
                                sx={{ width: '100%'}}
                                value={formData.fine}
                                onChange={handleChange}
                                error={submitted && !formData.fine}
                                helperText={submitted && !formData.fine ? "Required" : ""}
                            />
                            <DatePicker
                                label='Start Date'
                                name='startDate'
                                variant="outlined"
                                sx={{ width: '100%'}}
                                value={moment(formData.startDate)}
                                onChange={(value) => handleDateChange("startDate", value)}
                                slotProps={{
                                    textField: {
                                        error: submitted && !formData.startDate,
                                        helperText: submitted && !formData.startDate ? "Required" : "",
                                    },
                                }}
                            />

                            <DatePicker
                                label='End Date'
                                name='endDate'
                                variant="outlined"
                                sx={{ width: '100%'}}
                                value={moment(formData.endDate)}
                                onChange={(value) => handleDateChange("endDate", value)}
                                slotProps={{
                                    textField: {
                                        error: submitted && !formData.endDate,
                                        helperText: submitted && !formData.endDate ? "Required" : "",
                                    },
                                }}
                            />
                            <Button type='submit' variant='contained' sx={{ mt: 2 ,width: '100%'}}>
                                Submit
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Box>
        </LocalizationProvider>
    );
}

export default Update;
