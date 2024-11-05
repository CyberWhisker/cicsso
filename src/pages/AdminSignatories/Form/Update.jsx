import React, { useEffect, useState } from 'react';
import { Box, Button, Divider, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { toast } from 'react-toastify';
import { fetchSchoolYear } from '../../../api/SchoolYearApi';
import moment from 'moment';
import { updateSignatories } from '../../../api/SignatoriesApi';

function Update({ selected, onClose, handleGetData }) {
    console.log(selected.image)
    const [formData, setFormData] = useState({
        ...selected,
        schoolYear: selected.schoolYear._id
    });

    const [isLoading, setIsLoading] = useState(true)

    const [schoolYearData, setSchoolYearData] = useState([]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (event) =>
        setFormData({ ...formData, file: event.target.files[0] });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data, error } = await updateSignatories(formData);
        if (error) {
            toast.error(error);
        } else {
            toast.success("Successfully Updated");
            handleGetData();
            onClose();
        }
    };

    const handleGetSchoolYear = async () => {
        const { data, error } = await fetchSchoolYear();
        if (error) {
            toast.error(error);
        } else {
            setSchoolYearData(data);
            // Set formData.schoolYear if selected value matches an available option
            if (data.some(item => item._id === formData.schoolYear)) {
                setFormData(prevData => ({ ...prevData, schoolYear: formData.schoolYear }));
            } else {
                setFormData(prevData => ({ ...prevData, schoolYear: '' }));
            }
        }
        setIsLoading(false)
    };

    useEffect(() => {
        handleGetSchoolYear();
    }, []);

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
                            {!isLoading && (
                                <TextField
                                    select
                                    name='schoolYear'
                                    value={formData.schoolYear}
                                    onChange={handleChange}
                                    label='School Year'
                                >
                                    {schoolYearData.map((item) => (
                                        <MenuItem value={item._id} key={item._id}>
                                            {item.semester} ({moment(item.startDate).format('MMM YYYY')} - {moment(item.endDate).format('MMM YYYY')})
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                            <img alt='Image' src={`/signatureImg/${formData.image}`}/>
                            <Typography>Update Signature</Typography>
                            <TextField type='file' name='file' onChange={handleFileChange} />
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
