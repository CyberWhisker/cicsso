import React, { useState } from 'react';
import { Box, Button, Divider, Stack, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment';

function Store({setEvents, onClose}) {
    const [formData, setFormData] = useState({
        event: '',
        startDate: null,
        endDate: null,
        image: ''
    });

    const [formSchedule, setFormSchedule] = useState({
        event: '',
        date: null,
        amIn: null,
        amOut: null,
        pmIn: null,
        pmOut: null,
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => 
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleDateChange = (name, date) => {
        setFormData({ ...formData, [name]: date });
    };

    const handleTimeChange = (name, time) => {
        setFormSchedule({ ...formSchedule, [name]: time });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        const { event, startDate, endDate } = formData;
        const { amIn, amOut, pmIn, pmOut } = formSchedule;

        // Check if all fields are filled
        if (!event || !startDate || !endDate || !amIn || !amOut || !pmIn || !pmOut) {
            toast.error("All fields, including times, are required");
            return;
        }

        handleEvent();

        setFormData({
            event: '',
            startDate: null,
            endDate: null,
            image: ''
        });
        setFormSchedule({
            event: '',
            date: null,
            amIn: null,
            amOut: null,
            pmIn: null,
            pmOut: null,
        });
        setSubmitted(false);
    };

    const handleEvent = async () => {

        const response = await fetch(`${import.meta.env.VITE_API}/api/event`, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (response.ok) {
            const newData = await response.json()
            const eventId = newData._id;
            setEvents(prevEvents => [newData, ...prevEvents])
            toast.success("Event added successfully");
            onClose()
            await handleSchedule(eventId);
        }
    }

    const handleSchedule = async (eventId) => {
        let minDate = moment(formData.startDate);
        const endDate = moment(formData.endDate);
    
        while (minDate.isSameOrBefore(endDate)) {
            let scheduleDateAmIn = minDate.clone();
            let scheduleDateAmOut = minDate.clone();
            let scheduleDatePmIn = minDate.clone();
            let scheduleDatePmOut = minDate.clone();
            if (formSchedule.amIn) {
                const amInTime = moment(formSchedule.amIn); // Ensure amIn is a Moment.js object
                scheduleDateAmIn.set({
                    hour: amInTime.hour(),
                    minute: amInTime.minute(),
                    second: amInTime.second(), // Optional, if you need seconds as well
                });
            }
            if (formSchedule.amIn) {
                const amOutTime = moment(formSchedule.amOut); // Ensure amIn is a Moment.js object
                scheduleDateAmOut.set({
                    hour: amOutTime.hour(),
                    minute: amOutTime.minute(),
                    second: amOutTime.second(), // Optional, if you need seconds as well
                });
            }
            if (formSchedule.pmIn) {
                const pmInTime = moment(formSchedule.pmIn); // Ensure amIn is a Moment.js object
                scheduleDatePmIn.set({
                    hour: pmInTime.hour(),
                    minute: pmInTime.minute(),
                    second: pmInTime.second(), // Optional, if you need seconds as well
                });
            }
            if (formSchedule.pmOut) {
                const pmOutTime = moment(formSchedule.pmOut); // Ensure amIn is a Moment.js object
                scheduleDatePmOut.set({
                    hour: pmOutTime.hour(),
                    minute: pmOutTime.minute(),
                    second: pmOutTime.second(), // Optional, if you need seconds as well
                });
            }
    
            const currentSchedule = {
                event: eventId,
                date: minDate, 
                amIn: scheduleDateAmIn,
                amOut: scheduleDateAmOut,
                pmIn: scheduleDatePmIn,
                pmOut: scheduleDatePmOut,
            };
    
            const response = await fetch(`${import.meta.env.VITE_API}/api/schedule`, {
                method: 'POST',
                body: JSON.stringify(currentSchedule),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                toast.success("Schedule added successfully");
            } else {
                toast.error("Failed to add schedule");
            }
    
            // Move to the next day
            minDate.add(1, 'days');
        }
    };
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Box sx={{ width: '70vh', p: 2 }}>
                <Typography variant='h4' fontWeight='bold'>Add Event</Typography>
                <Box mt={2}>
                    <form onSubmit={handleSubmit}>
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
                                value={formData.endDate}
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
                            <Typography>Time</Typography>
                            <Stack direction={'row'} spacing={2}>
                                <TimePicker 
                                    label="AM IN"
                                    value={formSchedule.amIn}
                                    onChange={(newValue) => handleTimeChange('amIn', newValue)}
                                    slotProps={{
                                        textField: {
                                            error: submitted && !formSchedule.amIn,
                                            helperText: submitted && !formSchedule.amIn ? "Required" : "",
                                        },
                                    }}
                                />
                                <TimePicker 
                                    label="AM OUT"
                                    value={formSchedule.amOut}
                                    onChange={(newValue) => handleTimeChange('amOut', newValue)}
                                    slotProps={{
                                        textField: {
                                            error: submitted && !formSchedule.amOut,
                                            helperText: submitted && !formSchedule.amOut ? "Required" : "",
                                        },
                                    }}
                                />
                            </Stack>
                            <Stack direction={'row'} spacing={2}>
                                <TimePicker 
                                    label="PM IN"
                                    value={formSchedule.pmIn}
                                    onChange={(newValue) => handleTimeChange('pmIn', newValue)}
                                    slotProps={{
                                        textField: {
                                            error: submitted && !formSchedule.pmIn,
                                            helperText: submitted && !formSchedule.pmIn ? "Required" : "",
                                        },
                                    }}
                                />
                                <TimePicker 
                                    label="PM OUT"
                                    value={formSchedule.pmOut}
                                    onChange={(newValue) => handleTimeChange('pmOut', newValue)}
                                    slotProps={{
                                        textField: {
                                            error: submitted && !formSchedule.pmOut,
                                            helperText: submitted && !formSchedule.pmOut ? "Required" : "",
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
                    </form>
                </Box>
            </Box>
        </LocalizationProvider>
    );
}

export default Store;
