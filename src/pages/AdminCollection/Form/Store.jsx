import React, { useEffect, useState } from 'react';
import { Box, Button, Divider, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { storeCollection } from '../../../api/CollectionApi';
import { fetchSchoolYear } from '../../../api/SchoolYearApi';
import moment from 'moment';

function Store({ handleGetData, handleCloseModal }) {
    const [formData, setFormData] = useState({
        collectionName: '',
        fine: '',
        startDate: null,
        endDate: null
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleDateChange = (name, value) =>
        setFormData({ ...formData, [name]: value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        const { collectionName, fine, startDate, endDate, label } = formData;
        if (!collectionName || !fine || !startDate || !endDate || !label) {
            toast.error("All fields are required");
            return;
        }
        const { data, error } = await storeCollection(formData)
        if (error) {
            toast.error(error)
        } else {
            handleGetData();
            toast.success("Collection added successfully");
            setFormData({ collectionName: '', fine: '', startDate: null, endDate: null });
            handleCloseModal();
        }
        setSubmitted(false);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Box sx={{ width: '60vh', p: 2 }}>
                <Typography variant='h4' fontWeight='bold'>Add Collection</Typography>
                <Box>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={1}>
                            <Divider />
                            <Typography>Collection Information</Typography>
                            <TextField
                                label='Enter Collection'
                                name='collectionName'
                                variant="outlined"
                                sx={{ width: '100%' }}
                                value={formData.collectionName}
                                onChange={handleChange}
                                error={submitted && !formData.collectionName}
                                helperText={submitted && !formData.collectionName ? "Required" : ""}
                            />
                            <TextField
                                label='Enter Fine'
                                name='fine'
                                variant="outlined"
                                sx={{ width: '100%' }}
                                value={formData.fine}
                                onChange={handleChange}
                                error={submitted && !formData.fine}
                                helperText={submitted && !formData.fine ? "Required" : ""}
                            />
                            <TextField
                                label='Select Label'
                                name='label'
                                variant="outlined"
                                sx={{ width: '100%' }}
                                value={formData.label}
                                onChange={handleChange}
                                error={submitted && !formData.label}
                                helperText={submitted && !formData.label ? "Required" : ""}
                                select
                            >
                                <MenuItem value="Urgent">Urgent</MenuItem>
                                <MenuItem value="Mandatory">Mandatory</MenuItem>
                            </TextField>
                            <DatePicker
                                label='Start Date'
                                name='startDate'
                                variant="outlined"
                                sx={{ width: '100%' }}
                                value={formData.startDate}
                                onChange={(value) => handleDateChange("startDate", value)}
                                slotProps={{
                                    textField: {
                                        error: submitted && !formData.startDate,
                                        helperText: submitted && !formData.startDate ? "Required" : "",
                                    },
                                }}
                            />

                            <DatePicker
                                label='End Date'
                                name='endDate'
                                variant="outlined"
                                sx={{ width: '100%' }}
                                value={formData.endDate}
                                onChange={(value) => handleDateChange("endDate", value)}
                                slotProps={{
                                    textField: {
                                        error: submitted && !formData.endDate,
                                        helperText: submitted && !formData.endDate ? "Required" : "",
                                    },
                                }}
                            />

                            <Divider />

                            <SelectIndicator handleChange={handleChange} formData={formData} />
                            <Button type='submit' variant='contained' sx={{ mt: 2, width: '100%' }}>
                                Submit
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Box>
        </LocalizationProvider>
    );
}

function SelectIndicator({ handleChange, formData }) {
    const [data, setData] = useState([])
    const handleGetSchoolYear = async () => {
        const { data, error } = await fetchSchoolYear();
        if (!error) {
            setData(data)
        }
    }
    useEffect(() => {
        handleGetSchoolYear()
    }, [])
    return (
        <Stack spacing={1}>
            <Typography>Semester Indicator (Optional)</Typography>
            <TextField
                label="Select Semester"
                name='indicator1'
                onChange={handleChange}
                value={formData.indicator1 || ''}
                select
            >
                {data.map((item, index) => (
                    <MenuItem key={index} value={item._id}>{item.semester} S.Y ({moment(item.startDate).format("YYYY")} - {moment(item.endDate).format("YYYY")})</MenuItem>
                ))}
            </TextField>
            <TextField
                label="Select Semester"
                name='indicator2'
                onChange={handleChange}
                value={formData.indicator2 || ''}
                select
            >
                {data.map((item, index) => (
                    <MenuItem key={index} value={item._id}>{item.semester} S.Y ({moment(item.startDate).format("YYYY")} - {moment(item.endDate).format("YYYY")})</MenuItem>
                ))}
            </TextField>
        </Stack>
    )
}

export default Store;
