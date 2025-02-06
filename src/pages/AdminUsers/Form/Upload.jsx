
import { Box, Button, Divider, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import readXlsxFile from 'read-excel-file'

function UploadForm({ getUsers, onClose }) {
    const [submitted, setSubmitted] = useState(false)
    const [excelFile, setExcelFile] = useState(null)
    const [error, setError] = useState(null)
    const [helperText, setHelperText] = useState([]);

    const handleChange = (e) => {
        setError(false)
        let selectedFile = e.target.files[0]
        console.log(selectedFile)
        if (selectedFile) {
            readXlsxFile(selectedFile).then((rows) => {
                console.log(rows)
            })
            setHelperText([])
        } else {
            console.log('Please select your file')
        }
    }

    const handleSubmit = () => {

    }

    return (
        <Box sx={{ width: '60vh', p: 1 }}>
            <Typography variant='h4' fontWeight='bold'>Upload Users</Typography>
            <form>
                <Stack spacing={2}>
                    <Divider />
                    <Typography>Please Select Excel File</Typography>
                    <TextField type='file' onChange={handleChange} error={error} helperText={helperText.fileError} />
                    <Button type="submit" variant="contained" disabled={submitted}>Submit</Button>
                </Stack>
            </form>
        </Box>
    )
}

export default UploadForm