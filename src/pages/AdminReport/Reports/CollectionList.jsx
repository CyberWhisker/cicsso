import { Card, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { fetchCollectionBySchoolYear, fetchCollections } from '../../../api/CollectionApi'
import { DataGrid } from '@mui/x-data-grid'

function CollectionList({ selectedAY }) {
    const [data, setData] = useState([])

    useEffect(() => {
        const handleGetData = async () => {
            if (selectedAY) {
                const { data, error } = await fetchCollectionBySchoolYear(selectedAY)
                if (!error) {
                    const formatedData = data.map((item) => {
                        const totalCollectionFunds = item.transaction
                            .filter((item) => item.status == "confirm")
                            .reduce((sum, item) => sum + item.amount, 0)
                        let total = 0
                        const remainingFund = totalCollectionFunds - total
                        return {
                            id: item._id,
                            collectionName: item.collectionName,
                            total: `₱ ${remainingFund.toFixed(2)}`
                        }
                    })
                    setData(formatedData)
                }
            }
        }
        handleGetData()
    }, [selectedAY])

    const columns = [
        {
            field: 'collectionName',
            headerName: 'Collection Name',
            flex: 1,
            // align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'total',
            headerName: 'Total',
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },
    ]

    return (
        <Card sx={{ p: 1, height: '100%' }}>
            <Typography variant='h5' fontWeight={'bold'}>Collection  List:</Typography>
            <DataGrid
                rows={data}
                columns={columns}
                sx={{
                    flex: 1, // Allows DataGrid to fill remaining space within the Card
                    height: '70vh', // Prevents infinite height
                }}
            />
        </Card>
    )
}

export default CollectionList