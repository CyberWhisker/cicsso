import React, { useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import { updateItem } from '../../../api/ItemApi';

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
        const { data, error } = await updateItem(formData);
        if (error) {
            toast.error(error)
        } else {
            toast.success("Successfuly Updated item")
            handleGetData()
            onClose();
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Box sx={{ width: '70vh', p: 2 }}>
                <Typography variant='h4' fontWeight='bold'>Update Item</Typography>
                <Box mt={2}>
                    <form onSubmit={handleSubmit}>
                        <Stack direction={'column'} spacing={2}>
                            <TextField
                                label='Enter Item'
                                name='item'
                                variant="outlined"
                                sx={{ width: '100%' }}
                                value={formData.item}
                                onChange={handleChange}
                                error={submitted && !formData.item}
                                helperText={submitted && !formData.item ? "Required" : ""}
                            />
                            <TextField
                                label='Quantity'
                                name='quantity'
                                value={formData.quantity}
                                onChange={handleChange}
                                error={submitted && !formData.quantity}
                                helperText={submitted && !formData.quantity ? "Required" : ""}
                            />
                            <TextField
                                label='Amount'
                                name='amount'
                                value={formData.amount}
                                onChange={handleChange}
                                error={submitted && !formData.amount}
                                helperText={submitted && !formData.amount ? "Required" : ""}
                            />
                            <DatePicker
                                label='Date'
                                name='date'
                                value={moment(formData.date)}
                                onChange={(value) => handleDate("date", value)}
                                slotProps={{
                                    textField: {
                                        error: submitted && !formData.date,
                                        helperText: submitted && !formData.date ? "Required" : "",
                                    },
                                }}
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

export default Update;
