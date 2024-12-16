import React, { useEffect, useState } from 'react';
import { Box, Button, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { updateClearance } from '../../../api/ClearanceApi';
import { fetchCollectionBySchoolYearIdandUserId } from '../../../api/CollectionApi';
import { DataGrid } from '@mui/x-data-grid';

function View({ selected, onClose, handleGetData }) {
    const [collectionData, setCollectionData] = useState([])

    const handleGetCollection = async () => {
        const { data, error } = await fetchCollectionBySchoolYearIdandUserId(selected.schoolYear._id, selected.user._id)
        if (!error) {
            const eventList = data.filter((item) => item.eventId)
            const collectionList = data.filter((item) => !item.eventId)
            const eventData = eventList.map((item) => {
                let countSchedule = 0;
                let countAttendance = 0;
                let remainingBalance = 0;
                let transaction = null;
                item.eventId.schedules.map((item) => {
                    countSchedule += 4
                    if (item.attendances.length > 0) {
                        if (item.attendances[0].amIn) {
                            countAttendance++
                        }
                        if (item.attendances[0].amOut) {
                            countAttendance++
                        }
                        if (item.attendances[0].pmIn) {
                            countAttendance++
                        }
                        if (item.attendances[0].pmOut) {
                            countAttendance++
                        }
                    }
                })
                remainingBalance = (countSchedule - countAttendance) * item.fine
                if (item.transaction.length > 0) {
                    remainingBalance = remainingBalance - item.transaction[0].amount
                }
                return {
                    id: item._id,
                    collection: item.collectionName,
                    status: remainingBalance
                }
            })
            setCollectionData(eventData)
        }
    }

    useEffect(() => {
        handleGetCollection()
    }, [])

    const columns = [
        {
            field: 'collection',
            headerName: 'Collection',
            headerAlign: 'center',
            flex: 1
        },
        {
            field: 'status',
            headerName: 'Status',
            headerAlign: 'center',
            flex: 1
        },
    ]
    return (
        <Box sx={{ width: '70vh', p: 2 }}>
            <Typography variant='h4' fontWeight='bold'>Collection Item</Typography>
            <Box mt={2}>
                <DataGrid
                    columns={columns}
                    rows={collectionData}
                    sx={{ height: 500 }}
                />
            </Box>
        </Box>
    );
}

export default View;
