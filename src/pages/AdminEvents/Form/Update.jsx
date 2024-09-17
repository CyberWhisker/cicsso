import React, { useState } from 'react';
import { Box, Button, Divider, Stack, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment';

function Update({data, setEvents, events, onClose}) {
    const [formData, setFormData] = useState(data);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => 
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleDateChange = (name, date) => {
        setFormData({ ...formData, [name]: date });
    };

    const handleTimeChange = (name, time) => {
        setFormData({ ...formData, [name]: time });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        const { event, startDate, endDate, amIn, amOut, pmIn, pmOut } = formData;

        // Check if all fields are filled
        if (!event || !startDate) {
            toast.error("All fields are required");
            return;
        }

        const response = await fetch(`${import.meta.env.VITE_API}/api/event/${formData._id}`, {
            method: 'PATCH',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (response.ok) {
            const updatedEvent = await response.json();
            const updatedEvents = events.map(event => 
                event._id === updatedEvent._id ? updatedEvent : event
            );
            onClose()
            setEvents(updatedEvents);
            toast.success("Event updated successfully");
        }

        setSubmitted(false);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Box sx={{ width: '70vh', p: 2 }}>
                <Typography variant='h4' fontWeight='bold'>Update Event</Typography>
                <Box mt={2}>
                    <form onSubmit={handleSubmit}>
                        <Stack direction={'column'} spacing={2}>
                            <TextField
                                label='Enter Event'
                                name='event'
                                variant="outlined"
                                sx={{ width: '100%'}}
                                value={formData.event}
                                onChange={handleChange}
                                error={submitted && !formData.event}
                                helperText={submitted && !formData.event ? "Required" : ""}
                            />
                            <Divider/>
                            <DatePicker 
                                label="Start Date"
                                defaultValue={moment(formData.startDate)}
                                onChange={(newValue) => handleDateChange('startDate', newValue)}
                                minDate={moment()}
                                maxDate={moment(formData.endDate ? formData.endDate : null )}
                                slotProps={{
                                    textField: {
                                        error: submitted && !formData.startDate,
                                        helperText: submitted && !formData.startDate ? "Required" : "",
                                    },
                                }}
                            />
                            <DatePicker 
                                label="End Date"
                                defaultValue={moment(formData.endDate)}
                                onChange={(newValue) => handleDateChange('endDate', newValue)}
                                minDate={moment(formData.startDate ? formData.startDate : null )}
                                slotProps={{
                                    textField: {
                                        error: submitted && !formData.endDate,
                                        helperText: submitted && !formData.endDate ? "Required" : "",
                                    },
                                }}
                            />
                            <Divider/>
                            <Typography>Insert Banner</Typography>
                            <TextField
                                name='image'
                                variant="outlined"
                                sx={{ width: '100%'}}
                                value={formData.image}
                                onChange={handleChange}
                                type='file'
                            />
                            <Button type='submit' variant='contained' color='warning' sx={{ mt: 2 ,width: '100%'}}>
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
