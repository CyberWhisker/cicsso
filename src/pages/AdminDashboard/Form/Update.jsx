import React, { useState } from 'react';
import { Box, Button, MenuItem, Stack, styled, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { updateCollection } from '../../../api/CollectionApi';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment';
import { updateTransaction } from '../../../api/TransactionApi';
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

function Update({selected, onClose, handleGetData, data}) {
    console.log(selected)
    const [formData, setFormData] = useState(selected);
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
        if (!userId || !payment || !amount || !date) {
            toast.error("All fields are required");
            return;
        }

        const {data, error} = await updateTransaction(formData)
        if (error) {
            toast.error(error)
        } else {
            onClose();
            handleGetData();
            toast.success("Transaction added successfully");
        }
        setSubmitted(false);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Box sx={{ width: '60vh', p: 2 }}>
                <Typography variant='h4' fontWeight='bold'>Update Collection</Typography>
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
                                disabled
                            >
                                {data.map((user, index) => 
                                    <MenuItem value={user._id} key={index}>{user.name}</MenuItem>
                                )}
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
                                <>
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
                                    <img src={`/gcashImg/${formData.image}`} alt='NoImage'/>
                                </>
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
                                value={moment(formData.date)}
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

export default Update;
