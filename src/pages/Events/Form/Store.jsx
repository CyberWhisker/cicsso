import React, { useState } from 'react';
import { Box, Button, Divider, Stack, TextField, Typography } from '@mui/material';
import { Form } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function Store({setEvents, onClose}) {
    const [formData, setFormData] = useState({
        event: '',
        startDate: null,
        endDate: null,
        amIn: null,
        amOut: null,
        pmIn: null,
        pmOut: null,
        image: ''
    });
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

        const { event, startDate, endDate, amIn, amOut, pmIn, pmOut, image } = formData;

        // Check if all fields are filled
        if (!event || !startDate || !endDate || !amIn || !amOut || !pmIn || !pmOut) {
            toast.error("All fields, including times, are required");
            return;
        }

        const dataToSend = {
            event,
            startDate: startDate ? startDate.toDate() : null,
            endDate: endDate ? endDate.toDate() : null,
            amIn: amIn ? amIn.toDate() : null,
            amOut: amOut ? amOut.toDate() : null,
            pmIn: pmIn ? pmIn.toDate() : null,
            pmOut: pmOut ? pmOut.toDate() : null,
            image
        };

        const response = await fetch(`${import.meta.env.VITE_API}/api/event`, {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (response.ok) {
            const newData = await response.json()
            setEvents(prevEvents => [newData, ...prevEvents])
            toast.success("Event added successfully");
            onClose()
            setFormData({
                event: '',
                startDate: null,
                endDate: null,
                amIn: null,
                amOut: null,
                pmIn: null,
                pmOut: null,
                image: ''
            });
        }

        setSubmitted(false);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ width: '70vh', p: 2 }}>
                <Typography variant='h4' fontWeight='bold'>Add Event</Typography>
                <Box mt={2}>
                    <Form onSubmit={handleSubmit}>
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
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
                            <Typography>Date</Typography>
                            <DatePicker 
                                label="Start Date"
                                value={formData.startDate}
                                onChange={(newValue) => handleDateChange('startDate', newValue)}
                                slotProps={{
                                    textField: {
                                        error: submitted && !formData.startDate,
                                        helperText: submitted && !formData.startDate ? "Required" : "",
                                    },
                                }}
                            />
                            <DatePicker 
                                label="End Date"
                                value={formData.endDate}
                                onChange={(newValue) => handleDateChange('endDate', newValue)}
                                slotProps={{
                                    textField: {
                                        error: submitted && !formData.endDate,
                                        helperText: submitted && !formData.endDate ? "Required" : "",
                                    },
                                }}
                            />
                            <Divider/>
                            <Typography>Time</Typography>
                            <Stack direction={'row'} spacing={2}>
                                <TimePicker 
                                    label="AM IN"
                                    value={formData.amIn}
                                    onChange={(newValue) => handleTimeChange('amIn', newValue)}
                                    slotProps={{
                                        textField: {
                                            error: submitted && !formData.amIn,
                                            helperText: submitted && !formData.amIn ? "Required" : "",
                                        },
                                    }}
                                />
                                <TimePicker 
                                    label="AM OUT"
                                    value={formData.amOut}
                                    onChange={(newValue) => handleTimeChange('amOut', newValue)}
                                    slotProps={{
                                        textField: {
                                            error: submitted && !formData.amOut,
                                            helperText: submitted && !formData.amOut ? "Required" : "",
                                        },
                                    }}
                                />
                            </Stack>
                            <Stack direction={'row'} spacing={2}>
                                <TimePicker 
                                    label="PM IN"
                                    value={formData.pmIn}
                                    onChange={(newValue) => handleTimeChange('pmIn', newValue)}
                                    slotProps={{
                                        textField: {
                                            error: submitted && !formData.pmIn,
                                            helperText: submitted && !formData.pmIn ? "Required" : "",
                                        },
                                    }}
                                />
                                <TimePicker 
                                    label="PM OUT"
                                    value={formData.pmOut}
                                    onChange={(newValue) => handleTimeChange('pmOut', newValue)}
                                    slotProps={{
                                        textField: {
                                            error: submitted && !formData.pmOut,
                                            helperText: submitted && !formData.pmOut ? "Required" : "",
                                        },
                                    }}
                                />
                            </Stack>
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
                            <Button type='submit' variant='contained' sx={{ mt: 2 ,width: '100%'}}>
                                Submit
                            </Button>
                        </Box>
                    </Form>
                </Box>
            </Box>
        </LocalizationProvider>
    );
}

export default Store;
