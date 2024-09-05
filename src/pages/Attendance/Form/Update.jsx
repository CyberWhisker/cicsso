import React, { useState } from 'react';
import { Box, Button, Divider, Grid, Stack, TextField, Typography } from '@mui/material';
import { Form } from 'react-router-dom';
import { toast } from 'react-toastify';
import moment from 'moment';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { updateAttendance } from '../../../api/AttendanceApi';

function Update({selected, onClose, handleGetData}) {
    const [formData, setFormData] = useState(selected);
    const [submitted, setSubmitted] = useState(false);

    const handleTimeChange = (name, time) => {
        setFormData({ ...formData, [name]: time });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        const {data, error} = await updateAttendance(formData);
        console.log(formData)
        if (error) {
            console.log(error)
            toast.error("Something went wrong");
            return
        } else {
            handleGetData()
            toast.success("Successfully updated")
            onClose();
        }
        setFormData({ name: '', amIn: '', amOut: '', pmIn: '', pmOut: '' });
        setSubmitted(false);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Box sx={{ width: '60vh', p: 2 }}>
                <Typography variant='h4' fontWeight='bold'>Update Event</Typography>
                <Box mt={2}>
                    <Form onSubmit={handleSubmit}>
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
                            <Typography>Select Student</Typography>
                            <TextField
                                name='name'
                                value={formData.name}
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
                        </Box>
                    </Form>
                </Box>
            </Box>
        </LocalizationProvider>
    );
}

export default Update;
