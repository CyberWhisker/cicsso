import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';

function Store() {
    const [formData, setFormData] = useState({
        event: '',
        startDate: '',
        endDate: '',
        image: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => 
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);

        const { event, startDate, endDate } = formData;
        if (!event || !startDate || !endDate) {
            toast.error("All fields are required");
            return;
        }

        console.log("Event submitted:", formData);
        toast.success("Event added successfully");
        setFormData({ event: '', startDate: '', endDate: '' });
        setSubmitted(false);
    };

    return (
        <React.Fragment>
            <Box sx={{ width: '60vh', p: 2 }}>
                <Typography variant='h4' fontWeight='bold'>Add Event</Typography>
                <Box mt={2}>
                    <form onSubmit={handleSubmit}>
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
                            <Typography>Enter Event</Typography>
                            <TextField
                                name='event'
                                variant="outlined"
                                sx={{ width: '100%'}}
                                value={formData.event}
                                onChange={handleChange}
                                error={submitted && !formData.event}
                                helperText={submitted && !formData.event ? "Required" : ""}
                            />
                            <Typography>Enter Start Date</Typography>
                            <TextField
                                name='startDate'
                                variant="outlined"
                                sx={{ width: '100%'}}
                                value={formData.startDate}
                                onChange={handleChange}
                                type='date'
                                error={submitted && !formData.startDate}
                                helperText={submitted && !formData.startDate ? "Required" : ""}
                            />
                            <Typography>Enter End Date</Typography>
                            <TextField
                                name='endDate'
                                variant="outlined"
                                sx={{ width: '100%'}}
                                value={formData.endDate}
                                onChange={handleChange}
                                type='date'
                                error={submitted && !formData.endDate}
                                helperText={submitted && !formData.endDate ? "Required" : ""}
                            />
                            <Typography>Insert Banner</Typography>
                            <TextField
                                name='image'
                                variant="outlined"
                                sx={{ width: '100%'}}
                                value={formData.image}
                                onChange={handleChange}
                                type='file'
                                error={submitted && !formData.image}
                                helperText={submitted && !formData.image ? "Required" : ""}
                            />
                            <Button type='submit' variant='contained' sx={{ mt: 2 ,width: '100%'}}>
                                Submit
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Box>
        </React.Fragment>
    );
}

export default Store;
