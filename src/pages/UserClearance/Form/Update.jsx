import React, { useEffect, useState } from 'react';
import { Box, Button, Divider, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { fetchSchoolYear } from '../../../api/SchoolYearApi';
import moment from 'moment';
import { useAuthContext } from '../../../hooks/useAuthContext';


function Update({ handleGetData, handleCloseModal, data }) {
    const {auth} = useAuthContext();
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        userId: auth.user._id,
        status: "complete",
        schoolYear: ''
    });
    const [semesterData, setSemesterData] = useState([])

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
    };

    const handleGetSemester = async () => {
        setIsLoading(false)
        const { data, error } = await fetchSchoolYear();
        if (!error) {
            setSemesterData(data)
        }
        setIsLoading(true)
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

export default Update;
