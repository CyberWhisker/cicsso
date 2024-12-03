import { Box, Card, MenuItem, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { fetchCollections, fetchCollectionWithEventAndAttendance, fetchCollectionWithTransaction } from '../../../api/CollectionApi'
import { PieChart } from '@mui/x-charts'
import { fetchUsers } from '../../../api/userApi'

function ReceivableAmount() {
    const [graphData, setGraphData] = useState([])

    useEffect(() => {
        computeData(setGraphData) // Call the unified function
    }, [])

    return (
        <Card sx={{ display: 'flex', height: '100%' }}>
            <Box sx={{ p: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='h5' fontWeight={'bold'}>Receivables/Collectibles:</Typography>
                </Box>
                <PieChart
                    series={[{
                        data: graphData,
                        innerRadius: 15,
                        paddingAngle: 6,
                        highlightScope: { fade: 'global', highlight: 'item' },
                        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                    }]}
                    width={550}
                    height={200}
                />
            </Box>
        </Card>
    )
}

// Unified function to compute both attendance and collection data
const computeData = async (setGraphData) => {
    const [
        { data: eventData, error: eventError },
        { data: collectionData, error: collectionError },
        { data: userData, error: userError }
    ] = await Promise.all([
        fetchCollectionWithEventAndAttendance(),
        fetchCollectionWithTransaction(),
        fetchUsers()
    ])

    if (!eventError && !collectionError && !userError) {
        // Process Attendance data
        const attendanceData = eventData
            .filter((item) => item.eventId)
            .map((item) => {
                let countTotalAttendances = 0
                let countTotalUserAttendances = 0
                item.eventId.schedules.map((schedule) => {
                    schedule.attendances.map((attendance) => {
                        if (attendance.amIn) countTotalUserAttendances++
                        if (attendance.amOut) countTotalUserAttendances++
                        if (attendance.pmIn) countTotalUserAttendances++
                        if (attendance.pmOut) countTotalUserAttendances++
                    })
                    if (schedule.amIn) countTotalAttendances++
                    if (schedule.amOut) countTotalAttendances++
                    if (schedule.pmIn) countTotalAttendances++
                    if (schedule.pmOut) countTotalAttendances++
                })
                const total = (countTotalAttendances * userData.length) - countTotalUserAttendances
                return {
                    label: item.collectionName,
                    value: total * item.fine
                }
            })

        // Process Collection data
        const collectionDataProcessed = collectionData
            .filter((item) => !item.eventId)
            .map((item) => {
                const totalPayment = item.fine * userData.length
                const userPayment = item.transaction.reduce((sum, transaction) => sum + transaction.amount, 0)
                return {
                    label: item.collectionName,
                    value: totalPayment - userPayment
                }
            })

        // Combine both attendance and collection data
        setGraphData([...attendanceData, ...collectionDataProcessed])
    }
}

export default ReceivableAmount
