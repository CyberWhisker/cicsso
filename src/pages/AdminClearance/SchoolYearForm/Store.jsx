import React, { useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { storeItem } from '../../../api/ItemApi';
import { toast } from 'react-toastify';

function Store({onClose, handleGetData}) {
    const {id} = useParams();
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        project: id,
        item: '',
        quantity: '',
        amount: '',
        date: null
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleDate = (name, value) => {
        setFormData({...formData, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        const {data, error} = await storeItem(formData);
        if (error) {
            toast.error(error)
        } else {
            toast.success("Successfuly added item")
            handleGetData()
            onClose();
        }
    };

    
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Box sx={{ width: '70vh', p: 2 }}>
                <Typography variant='h4' fontWeight='bold'>Add Item</Typography>
                <Box mt={2}>
                    <form onSubmit={handleSubmit}>
                        <Stack direction={'column'} spacing={2}>
                            <TextField
                                label='Enter Item'
                                name='item'
                                variant="outlined"
                                sx={{ width: '100%'}}
                                value={formData.item}
                                onChange={handleChange}
                                error={submitted && !formData.item}
                                helperText={submitted && !formData.item ? "Required" : ""}
                            />
                            <TextField
                                label='Qauntity'
                                name='quantity'
                                value={formData.quantity}
                                onChange={handleChange}
                                error={submitted && !formData.quantity}
                                helperText={submitted && !formData.quantity ? "Required": ""}
                            />
                            <TextField
                                label='Amount'
                                name='amount'
                                value={formData.amount}
                                onChange={handleChange}
                                error={submitted && !formData.amount}
                                helperText={submitted && !formData.amount ? "Required": ""}
                            />
                            <DatePicker
                                label='Date'
                                name='date'
                                value={formData.date}
                                onChange={(value) => handleDate("date", value)}
                                slotProps={{
                                    textField: {
                                        error: submitted && !formData.date,
                                        helperText: submitted && !formData.date ? "Required" : "",
                                    },
                                }}
                            />
                            <Button type='submit' variant='contained' sx={{width: '100%'}}>
                                Submit
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Box>
        </LocalizationProvider>
    );
}

export default Store;
