import React, { useEffect, useState } from 'react';
import { Box, Button, Divider, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { fetchUsers } from '../../../api/userApi';
import { storeAttendance } from '../../../api/AttendanceApi';

function Store({onClose, handleGetData}) {
    const {id} = useParams();
    const [submitted, setSubmitted] = useState(false);
    const [userDatas, setUserDatas] = useState([]);
    const [formData, setFormData] = useState({
        schedule: id,
        user: '',
        amIn: null,
        amOut: null,
        pmIn: null,
        pmOut: null,
    });

    useEffect(() => {
        const getUsers = async () => {
            const {data, error} = await fetchUsers();
            if (error) {
                toast.error("Something went wrong")
            } else {
                setUserDatas(data)
            }
        };
        getUsers();
    }, [])

    const handleChange = (e) => {
        const user = userDatas.find(item => item._id == e.target.value)
        // Update formData with new values
        setFormData(prevState => ({
            ...prevState,
            user: e.target.value,
        }));
    }

    const handleTimeChange = (name, time) => {
        setFormData({ ...formData, [name]: time });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        const { user } = formData;
        // Check if all fields are filled
        if (!user ) {
            toast.error("All fields, including times, are required");
            return;
        }

        const {data, error} = await storeAttendance(formData);
        if (error) {
            onClose();
            toast.error("Data already exist")
        } else {
            onClose();
            toast.success("Successfully Inserted")
            handleGetData()
            setSubmitted(false);
            setFormData({
                user: null,
                amIn: null,
                amOut: null,
                pmIn: null,
                pmOut: null,
            });
        }
        
    };

    
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Box sx={{ width: '70vh', p: 2 }}>
                <Typography variant='h4' fontWeight='bold'>Add Attendnace</Typography>
                <Box mt={2}>
                    <form onSubmit={handleSubmit}>
                        <Stack direction={'column'} spacing={2}>
                            <TextField
                                label='Select User'
                                name='user'
                                variant="outlined"
                                sx={{ width: '100%'}}
                                value={formData.user}
                                onChange={handleChange}
                                error={submitted && !formData.user}
                                helperText={submitted && !formData.user ? "Required" : ""}
                                select
                            >
                                {!userDatas && (
                                    <MenuItem value={0}>No Record Found</MenuItem>
                                )}
                                {userDatas && userDatas.map((item, index) => (
                                    <MenuItem value={item._id} key={index}>{item.lastName}, {item.firstName} {item.middleName}</MenuItem>
                                ))}
                            </TextField>
                            <Divider/>
                            <Typography>Time</Typography>
                            <Stack direction={'row'} spacing={2}>
                                <TimePicker 
                                    label="AM IN"
                                    value={formData.amIn}
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
                                    value={formData.amOut}
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
                                    value={formData.pmIn}
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
                                    value={formData.pmOut}
                                    onChange={(newValue) => handleTimeChange('pmOut', newValue)}
                                    slotProps={{
                                        textField: {
                                            error: submitted && !formData.pmOut,
                                            helperText: submitted && !formData.pmOut ? "Required" : "",
                                        },
                                    }}
                                />
                            </Stack>
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
