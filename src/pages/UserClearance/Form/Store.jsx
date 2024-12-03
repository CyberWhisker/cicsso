import React, { useEffect, useState } from 'react';
import { Box, Button, Divider, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { fetchSchoolYear } from '../../../api/SchoolYearApi';
import moment from 'moment';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { storeClearance } from '../../../api/ClearanceApi';
import { toast } from 'react-toastify';
import { fetchCollectionBySchoolYearIdandUserId } from '../../../api/CollectionApi';


function Store({ handleGetData, handleCloseModal }) {
    const { auth } = useAuthContext();
    const [buttonChange, setButtonChange] = useState(true)
    const [formData, setFormData] = useState({
        user: auth.user._id,
        schoolYear: ''
    });
    const [semesterData, setSemesterData] = useState([])

    const handleChange = async (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        CheckQaulifiied(e.target.value, auth.user._id)
        const answer = await CheckQaulifiied(e.target.value, auth.user._id)
        if (answer) {
            setButtonChange(false)
        }
    }

    const CheckQaulifiied = async (schoolYearId, userId) => {
        const { data, error } = await fetchCollectionBySchoolYearIdandUserId(schoolYearId, userId)
        if (!error) {
            const filteredByEvent = data.filter((item) => item.eventId)
            const filteredByCol = data.filter((item) => !item.eventId)
            let totalFine = 0
            let totalTransaction = 0
            filteredByEvent.map((item) => {
                let countSched = 0
                item.eventId.schedules.map((item) => {
                    if (item.amIn) countSched++
                    if (item.amOut) countSched++
                    if (item.pmIn) countSched++
                    if (item.pmOut) countSched++
                    item.attendances.map((item) => {
                        if (item.amIn) countSched--
                        if (item.amOut) countSched--
                        if (item.pmIn) countSched--
                        if (item.pmOut) countSched--
                    })
                })
                item.transaction.map((item) => {
                    if (item.status == 'confirm') {
                        totalTransaction += item.amount
                    }
                })

                if (item.label != "Optional") {
                    totalFine += countSched * item.fine
                }
            })
            filteredByCol.map((item) => {
                if (item.label != "Optional") {
                    totalFine += item.fine
                }
                item.transaction.map((item) => {
                    if (item.status == 'confirm') {
                        totalTransaction += item.amount
                    }
                })
            })
            return totalFine <= totalTransaction
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data, error } = await storeClearance(formData)
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
                        {buttonChange &&
                            <Typography color='error'>Please pay all Credits</Typography>
                        }
                        <Button type='submit' variant='contained' sx={{ mt: 2, width: '100%' }} disabled={buttonChange}>
                            Submit
                        </Button>
                    </Stack>
                </form>
            </Box>
        </LocalizationProvider>
    );
}

export default Store;
