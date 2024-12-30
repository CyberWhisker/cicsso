import React, { useEffect, useState } from 'react';
import { Box, Button, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { storeItem } from '../../../api/ItemApi';
import { toast } from 'react-toastify';
import { fetchUsers } from '../../../api/userApi';
import { fetchSchoolYear } from '../../../api/SchoolYearApi';
import moment from 'moment';
import { storeClearance } from '../../../api/ClearanceApi';

function Store({ onClose, handleGetData }) {
    const [submitted, setSubmitted] = useState(false);
    const [userData, setUserData] = useState([]);
    const [semesterData, setSemesterData] = useState([]);
    const [formData, setFormData] = useState({
        user: '',
        schoolYear: '',
        status: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        const { data, error } = await storeClearance(formData);
        if (error) {
            toast.error(error)
        } else {
            toast.success("Successfuly added item")
            handleGetData()
            onClose();
        }
    };

    const handleGetUserData = async () => {
        const { data, error } = await fetchUsers();
        if (!error) {
            setUserData(data)
        }
    }

    const handleGetSemesterData = async () => {
        const { data, error } = await fetchSchoolYear();
        if (!error) {
            setSemesterData(data)
        }
    }

    useEffect(() => {
        handleGetUserData()
        handleGetSemesterData()
    }, [])

    return (
        <Box sx={{ width: '70vh', p: 2 }}>
            <Typography variant='h4' fontWeight='bold'>Add Item</Typography>
            <Box mt={2}>
                <form onSubmit={handleSubmit}>
                    <Stack direction={'column'} spacing={2}>
                        <TextField
                            select
                            label='Select User'
                            name='user'
                            variant="outlined"
                            sx={{ width: '100%' }}
                            value={formData.user}
                            onChange={handleChange}
                        >
                            {userData.map((item, index) => (
                                <MenuItem key={index} value={item._id}>{item.lastName},{item.firstName} {item.middleName[0]}.</MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            select
                            label='Select Semester'
                            name='schoolYear'
                            variant="outlined"
                            sx={{ width: '100%' }}
                            value={formData.schoolYear}
                            onChange={handleChange}
                        >
                            {semesterData.map((item, index) => (
                                <MenuItem key={index} value={item._id}>{item.semester} S.Y ({moment(item.startDate).format('YYYY')} - {moment(item.endDate).format('YYYY')})</MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            select
                            label='Status'
                            name='status'
                            variant="outlined"
                            sx={{ width: '100%' }}
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <MenuItem value='Pending'>Pending</MenuItem>
                            <MenuItem value='Complete'>Complete</MenuItem>
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

export default Store;
