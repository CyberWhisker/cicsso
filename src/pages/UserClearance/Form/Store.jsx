import React, { useEffect, useState } from 'react';
import { Box, Button, Divider, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { fetchSchoolYear } from '../../../api/SchoolYearApi';
import moment from 'moment';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { storeClearance } from '../../../api/ClearanceApi';
import { toast } from 'react-toastify';


function Store({ handleGetData, handleCloseModal }) {
    const {auth} = useAuthContext();
    const [formData, setFormData] = useState({
        user: auth.user._id,
        schoolYear: ''
    });
    const [semesterData, setSemesterData] = useState([])

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {data, error } = await storeClearance(formData)
        if (error) {
            toast.error(error)
        } else {
            toast.success("Successfully Inserted")
            handleGetData()
            handleCloseModal()
        }
    };

    const handleGetSemester = async () => {
        const { data, error } = await fetchSchoolYear();
        if (!error) {
            setSemesterData(data)
        }
    }

    useEffect(() => {
        handleGetSemester()
    }, [])

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Box sx={{ width: '60vh', p: 2 }}>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={1}>
                        <Typography variant='h4' fontWeight='bold'>Request Clearance</Typography>
                        <Divider />
                        <Typography>Clearance Information</Typography>
                        <TextField
                            label="Semester"
                            name="schoolYear"
                            select
                            onChange={handleChange}
                            value={formData.schoolYear}
                        >
                            {semesterData.map((item, index) => (
                                <MenuItem key={index} value={item._id}>{item.semester} S.Y ({moment(item.startDate).format("YYYY")} - {moment(item.endDate).format("YYYY")})</MenuItem>
                            ))}
                        </TextField>
                        <Button type='submit' variant='contained' sx={{ mt: 2, width: '100%' }}>
                            Submit
                        </Button>
                    </Stack>
                </form>
            </Box>
        </LocalizationProvider>
    );
}

export default Store;
