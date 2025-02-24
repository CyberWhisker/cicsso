
import { Box, Button, Divider, MenuItem, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import readXlsxFile from 'read-excel-file'
import { fetchSchoolYear } from '../../../api/SchoolYearApi';
import moment from 'moment';
import { storeMultipleUsers } from '../../../api/userApi';
import { LoadingButton } from '@mui/lab';

function UploadForm({ getUsers, onClose }) {
    const [formData, setFormData] = useState([])
    const [submitted, setSubmitted] = useState(false)
    const [excelFile, setExcelFile] = useState(null)
    const [error, setError] = useState(null)
    const [helperText, setHelperText] = useState([]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleChangeExcel = (e) => {
        setError(false)
        let selectedFile = e.target.files[0]
        if (selectedFile) {
            readXlsxFile(selectedFile).then((rows) => {
                const formattedData = FormatData(rows)
                setFormData({
                    ...formData,
                    users: formattedData
                })
            })
            setHelperText([])
        } else {
            console.log('Please select your file')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true)
        const { data, error } = await storeMultipleUsers(formData)
        if (error) {
            toast.error("Something went wrong")
        } else {
            toast.success("Successfully Inserted")
            getUsers()
            onClose()
        }
        setSubmitted(false)
    }

    return (
        <Box sx={{ width: '60vh', p: 2 }}>
            <Typography variant='h4' fontWeight='bold'>Upload Users</Typography>
            <form onSubmit={handleSubmit}>
                <Stack spacing={1}>
                    <Divider />
                    <Typography>Select Academic Year</Typography>
                    <SelectAcademicYear handleChange={handleChange} />
                    <Typography>Please Select Excel File</Typography>
                    <TextField type='file' onChange={handleChangeExcel} error={error} helperText={helperText.fileError} />
                    <LoadingButton
                        type="submit"
                        variant="contained"
                        loading={submitted}
                    >Submit</LoadingButton>
                </Stack>
            </form>
        </Box>
    )
}

function SelectAcademicYear({ handleChange }) {
    const [data, setData] = useState([])
    const [selected, setSelected] = useState('')

    const handleSelect = (e) => {
        setSelected(e.target.value)
        handleChange(e)
    }

    const handleGetData = async () => {
        const { data, error } = await fetchSchoolYear();
        if (error) {
            console.log(error)
        } else {
            setData(data)
        }
    }

    useEffect(() => {
        handleGetData();
    }, [])

    return (
        <TextField
            select
            label='Academic Year'
            name='academicYear'
            value={selected}
            onChange={handleSelect}
            fullWidth
        >
            {data.map((item, index) => (
                <MenuItem key={index} value={item._id}>
                    {item.semester} ({moment(item.startDate).format('YYYY')} - {moment(item.endDate).format('YYYY')})
                </MenuItem>
            ))}
        </TextField>
    )
}

const FormatData = (data) => {
    const columns = data[0];
    const formattedData = data.slice(1).map(row =>
        Object.fromEntries(columns.map((key, index) =>
            [key, row[index]]
        )));

    return formattedData;
}

export default UploadForm