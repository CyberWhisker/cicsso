import React, { useState } from 'react';
import { Box, Button, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { updateClearance } from '../../../api/ClearanceApi';

function Update({ selected, onClose, handleGetData }) {
    const [formData, setFormData] = useState(selected);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleDate = (name, value) => {
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        const { data, error } = await updateClearance(formData);
        if (error) {
            toast.error(error)
        } else {
            toast.success("Successfuly Updated item")
            handleGetData()
            onClose();
        }
    };

    return (
        <Box sx={{ width: '70vh', p: 2 }}>
            <Typography variant='h4' fontWeight='bold'>Update Item</Typography>
            <Box mt={2}>
                <form onSubmit={handleSubmit}>
                    <Stack direction={'column'} spacing={2}>
                        <TextField
                            label='Selected User'
                            value={selected.name}
                            variant="outlined"
                            sx={{ width: '100%' }}
                            disabled
                        />
                        <TextField
                            label='Semester'
                            variant="outlined"
                            value={selected.semester}
                            disabled
                        />
                        <TextField
                            label='Status'
                            name='status'
                            value={formData.status}
                            onChange={handleChange}
                            select
                        >
                            <MenuItem value="Pending">Pending</MenuItem>
                            <MenuItem value="Complete">Complete</MenuItem>
                        </TextField>
                        <Button type='submit' variant='contained' sx={{ width: '100%' }}>
                            Submit
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Box>
    );
}

export default Update;
