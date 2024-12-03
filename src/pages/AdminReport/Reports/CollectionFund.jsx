import { Box, Card, MenuItem, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { fetchCollectionWithTransaction, fetchCollectionWithTransactionBySchoolYear } from '../../../api/CollectionApi'
import { PieChart } from '@mui/x-charts'
import { fetchSchoolYear } from '../../../api/SchoolYearApi'
import moment from 'moment'

function CollectionFund() {
    const [data, setData] = useState()
    const [graphData, setGraphData] = useState([])
    const [selectedAY, setselectedAY] = useState('')
    const [schoolYearData, setSchoolYearData] = useState([])

    const handleSelect = (e) => {
        const selected = schoolYearData.find((item) => item._id == e.target.value)
        setselectedAY(selected)

    }

    useEffect(() => {
        const handleGetData = async () => {
            if (selectedAY) {
                const { data, error } = await fetchCollectionWithTransactionBySchoolYear(selectedAY._id);
                if (!error) {
                    const newGraphData = data.map((item) => {
                        const totalAmount = item.transaction.reduce((sum, transaction) => sum + transaction.amount, 0);
                        return {
                            id: item._id,
                            label: item.collectionName,
                            value: totalAmount,
                        };
                    });

                    setGraphData(newGraphData);

                }
            } else {
                const { data, error } = await fetchCollectionWithTransaction(selectedAY._id);
                if (!error) {
                    const newGraphData = data.map((item) => {
                        const totalAmount = item.transaction.reduce((sum, transaction) => sum + transaction.amount, 0);
                        return {
                            id: item._id,
                            label: item.collectionName,
                            value: totalAmount,
                        };
                    });

                    setGraphData(newGraphData);

                }
            }
        }
        const handleGetAY = async () => {
            const { data, error } = await fetchSchoolYear()
            if (!error) {
                setSchoolYearData(data)
            }
        }
        handleGetAY()

        handleGetData()
    }, [selectedAY])

    return (
        <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='h5' fontWeight={'bold'}>Collection  Total:</Typography>
                    <TextField label="Select Semester" select sx={{ width: 200 }} defaultValue={''} onChange={handleSelect}>
                        {schoolYearData.map((item, index) => (
                            <MenuItem key={index} value={item._id}>{item.semester} A.Y({moment(item.startDate).format('MM-DD-YYYY')} to {moment(item.endDate).format('MM-DD-YYYY')})</MenuItem>
                        ))}
                    </TextField>
                </Box>
                <PieChart
                    series={[
                        {
                            data: graphData,
                            innerRadius: 15,
                            paddingAngle: 6,
                            highlightScope: { fade: 'global', highlight: 'item' },
                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                        },
                    ]}

                    width={550}
                    height={200}
                />
            </Box>
        </Card>
    )
}

export default CollectionFund