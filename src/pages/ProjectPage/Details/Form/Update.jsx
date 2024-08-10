import React, { useState } from 'react';
import { Box, Button, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Form } from 'react-router-dom';
import { toast } from 'react-toastify';

function Update() {
    const [formData, setFormData] = useState({
        name: '',
        am_in: '',
        am_out: '',
        pm_in: '',
        pm_out: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => 
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);

        const { name, am_in, am_out, pm_in, pm_out } = formData;
        if (!name || !am_in || !am_out || pm_in || pm_out) {
            toast.error("All fields are required");
            return;
        }

        console.log("Event submitted:", formData);
        toast.success("Event added successfully");
        setFormData({ name: '', am_in: '', am_out: '', pm_in: '', pm_out: '' });
        setSubmitted(false);
    };

    return (
        <Box sx={{ width: '60vh', p: 2 }}>
            <Typography variant='h4' fontWeight='bold'>Update Event</Typography>
            <Box mt={2}>
                <Form onSubmit={handleSubmit}>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
                        <Typography>Select Student</Typography>
                        <Select
                            name='name'
                            id="demo-simple-select"
                            value={formData.event}
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>Student 1</MenuItem>
                            <MenuItem value={20}>Student 2</MenuItem>
                        </Select>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography>AM IN</Typography>
                                <TextField
                                    name='am_in'
                                    variant="outlined"
                                    sx={{ width: '100%'}}
                                    value={formData.event}
                                    onChange={handleChange}
                                    error={submitted && !formData.event}
                                    helperText={submitted && !formData.event ? "Required" : ""}
                                    type='time'
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>AM OUT</Typography>
                                <TextField
                                    name='am_out'
                                    variant="outlined"
                                    sx={{ width: '100%'}}
                                    value={formData.event}
                                    onChange={handleChange}
                                    error={submitted && !formData.event}
                                    helperText={submitted && !formData.event ? "Required" : ""}
                                    type='time'
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>PM IN</Typography>
                                <TextField
                                    name='pm_in'
                                    variant="outlined"
                                    sx={{ width: '100%'}}
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    error={submitted && !formData.startDate}
                                    helperText={submitted && !formData.startDate ? "Required" : ""}
                                    type='time'
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>PM OUT</Typography>
                                <TextField
                                    name='pm_out'
                                    variant="outlined"
                                    sx={{ width: '100%'}}
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    error={submitted && !formData.endDate}
                                    helperText={submitted && !formData.endDate ? "Required" : ""}
                                    type='time'
                                />
                            </Grid>
                        </Grid>
                        
                        <Button type='submit' variant='contained' color='warning' sx={{ mt: 2 ,width: '100%'}}>
                            Submit
                        </Button>
                    </Box>
                </Form>
            </Box>
        </Box>
    );
}

export default Update;
