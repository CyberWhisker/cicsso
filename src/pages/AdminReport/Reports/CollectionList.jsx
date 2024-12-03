import { Box, Card, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { fetchCollections } from '../../../api/CollectionApi'
import { DataGrid } from '@mui/x-data-grid'

function CollectionList() {
    const [data, setData] = useState([])

    useEffect(() => {
        const handleGetData = async () => {
            const { data, error } = await fetchCollections()
            if (!error) {
                setData(data)
            }
        }
        handleGetData()
    }, [])

    const columns = [
        {
            field: 'collectionName',
            headerName: 'Collection Name',
            flex: 1,
            align:'center',
            headerAlign: 'center'
        },
    ]

    return (
        <Card sx={{p: 1}}>
            <Typography variant='h5' fontWeight={'bold'}>Collection  List:</Typography>
            <DataGrid
                rows={data}
                columns={columns}
            />
        </Card>
    )
}

export default CollectionList