import React, { useState } from 'react';
import { Box, Button, MenuItem, Stack, styled, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { useParams } from 'react-router-dom';
import { storeTransaction } from '../../../api/TransactionApi';
import { CloudUpload } from '@mui/icons-material';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

function Store({handleGetData, handleCloseModal, data}) {
    const {id} = useParams()
    const [formData, setFormData] = useState({
        userId: '',
        collectionId: id,
        payment: '',
        amount: '',
        status: 'confirm',
        file: null,
        date: null,
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => 
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleDateChange = (name, value) => 
        setFormData({ ...formData, [name]: value });

    const handleFileChange = (event) => 
        setFormData({ ...formData, file: event.target.files[0]});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        const { userId, payment, amount, date } = formData;
        if (!userId || !payment || !amount|| !date) {
            toast.error("All fields are required");
            return;
        }
        const newForm = {
            ...formData,
            notification: 1
        }
        const {data, error} = await storeTransaction(newForm)
        if (error) {
            toast.error(error)
        } else {
            handleGetData();
            toast.success("Transaction added successfully");
            setFormData({ userId: '', payment: '', amount: '', date: null});
            handleCloseModal();
        }
        setSubmitted(false);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Box sx={{ width: '60vh', p: 2 }}>
                <Typography variant='h4' fontWeight='bold'>Add Transaction</Typography>
                <Box mt={2}>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={2}>
                            <TextField
                                label='Select Student'
                                name='userId'
                                variant="outlined"
                                sx={{ width: '100%'}}
                                value={formData.userId}
                                onChange={handleChange}
                                error={submitted && !formData.userId}
                                helperText={submitted && !formData.userId ? "Required" : ""}
                                select
                            >
                                {data.map((user, index) => {
                                    if (!user.transaction) {
                                        return (
                                            <MenuItem value={user._id} key={index}>{user.name}</MenuItem>
                                        )
                                    }
                                })}
                            </TextField>
                            <TextField
                                label='Payment Type'
                                name='payment'
                                variant="outlined"
                                sx={{ width: '100%'}}
                                value={formData.payment}
                                onChange={handleChange}
                                error={submitted && !formData.payment}
                                helperText={submitted && !formData.payment ? "Required" : ""}
                                select
                            >
                                <MenuItem value='Cash'>Cash</MenuItem>
                                <MenuItem value='GCash'>GCash</MenuItem>
                            </TextField>
                            {formData.payment == 'GCash' && (
                                <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUpload />}
                                sx={{width: '100%'}}
                                >
                                Upload Gcash
                                <VisuallyHiddenInput
                                    type="file"
                                    name='file'
                                    onChange={handleFileChange}
                                    multiple
                                />
                                </Button>
                            )}
                            
                            <TextField
                                label='Enter Amount'
                                name='amount'
                                variant="outlined"
                                sx={{ width: '100%'}}
                                value={formData.amount}
                                onChange={handleChange}
                                error={submitted && !formData.amount}
                                helperText={submitted && !formData.amount ? "Required" : ""}
                            />
                            
                            <DatePicker
                                label='Date'
                                name='date'
                                variant="outlined"
                                sx={{ width: '100%'}}
                                value={formData.date}
                                onChange={(value) => handleDateChange("date", value)}
                                slotProps={{
                                    textField: {
                                        error: submitted && !formData.date,
                                        helperText: submitted && !formData.date ? "Required" : "",
                                    },
                                }}
                            />
                            <TextField
                                label='Select Status'
                                name='status'
                                variant="outlined"
                                sx={{ width: '100%'}}
                                value={formData.status}
                                onChange={handleChange}
                                error={submitted && !formData.status}
                                helperText={submitted && !formData.status ? "Required" : ""}
                                select
                            >
                                <MenuItem value='confirm'>Confirm</MenuItem>
                                <MenuItem value='pending'>Pending</MenuItem>
                                <MenuItem value='decline'>Decline</MenuItem>
                            </TextField>
                            <Button type='submit' variant='contained' sx={{ mt: 2 ,width: '100%'}}>
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
