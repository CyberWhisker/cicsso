import React, { useEffect, useState } from 'react';
import { Box, Button, Divider, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { toast } from 'react-toastify';
import { fetchSchoolYear } from '../../../api/SchoolYearApi';
import moment from 'moment';
import { storeSignatorie } from '../../../api/SignatoriesApi';

function Store({ onClose, handleGetData }) {
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        schoolYear: '',
        file: '',
    });

    const [schoolYearData, setSchoolYearData] = useState([])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    
    const handleFileChange = (event) => 
        setFormData({ ...formData, file: event.target.files[0]});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data, error } = await storeSignatorie(formData);
        if (error) {
            toast.error(error)
        } else {
            toast.success("Successfuly Added")
            handleGetData()
            onClose();
        }
    };

    const handleGetSchoolYear = async () => {
        const {data, error} = await fetchSchoolYear();
        if (error) {
            toast.error(error)
        } else {
            setSchoolYearData(data)
        }
    }

    useEffect(() => {
        handleGetSchoolYear()
    },[])

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Box sx={{ width: '60vh', p: 2 }}>
                <Typography variant='h4' fontWeight='bold'>Add Signatories</Typography>
                <Divider />
                <Box mt={2}>
                    <form onSubmit={handleSubmit}>
                        <Stack direction={'column'} spacing={1}>
                            <TextField
                                label='Name'
                                name='name'
                                value={formData.name}
                                onChange={handleChange}
                            />
                            <TextField
                                label='Role'
                                name='role'
                                value={formData.role}
                                onChange={handleChange}
                            />
                            <TextField select name='schoolYear' value={formData.schoolYear} onChange={handleChange} label='School Year'>
                                {schoolYearData.map((item, index) => (
                                    <MenuItem value={item._id} key={index}>{item.semester} ({moment(item.startDate).format('MMM YYYY')} - {moment(item.endDate).format('MMM YYYY')})</MenuItem>
                                ))}
                            </TextField>
                            <Typography>Upload Signature</Typography>
                            <TextField type='file' name='file' onChange={handleFileChange}/>
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

export default Store;
