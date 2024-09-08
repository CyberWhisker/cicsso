import React, { useState } from 'react';
import { Box, Button, Divider, Stack, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

function Update({data, onClose, setSchedule, schedule}) {
    const [formData, setFormData] = useState(data);
    const [submitted, setSubmitted] = useState(false);

    const handleTimeChange = (name, time) => {
        setFormData({ ...formData, [name]: time });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        const { amIn, amOut, pmIn, pmOut } = formData;

        // Check if all fields are filled
        if (!amIn || !amOut || !pmIn || !pmOut) {
            toast.error("All fields, including times, are required");
            return;
        }

        const response = await fetch(`${import.meta.env.VITE_API}/api/schedule/${formData._id}`, {
            method: 'PATCH',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (response.ok) {
            const newData = await response.json();
            const newDatas = schedule.map(item => 
                item._id === newData._id ? newData : item
            );
            onClose()
            setSchedule(newDatas);
            toast.success("Updated successfully");
        }

        setSubmitted(false);
    };
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Box sx={{ width: '60vh', p: 2 }}>
                <Typography variant='h4' fontWeight='bold'>Update Event</Typography>
                <Box mt={2}>
                    <form onSubmit={handleSubmit}>
                        <Stack direction={'column'} spacing={2}>
                            <TextField
                                label="Date"
                                name='event'
                                variant="outlined"
                                sx={{ width: '100%'}}
                                value={moment(formData.date).format('MMMM - DD - YYYY')}
                                disabled
                            />
                            <Divider/>
                            <Stack direction={'row'} spacing={2}>
                                <TimePicker 
                                    label="AM IN"
                                    defaultValue={moment(formData.amIn)}
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
                                    defaultValue={moment(formData.amOut)}
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
                                    defaultValue={moment(formData.pmIn)}
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
                                    defaultValue={moment(formData.pmOut)}
                                    onChange={(newValue) => handleTimeChange('pmOut', newValue)}
                                    slotProps={{
                                        textField: {
                                            error: submitted && !formData.pmOut,
                                            helperText: submitted && !formData.pmOut ? "Required" : "",
                                        },
                                    }}
                                />
                            </Stack>
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
