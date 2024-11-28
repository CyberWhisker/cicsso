import React, { useEffect, useMemo, useState } from 'react'
import Master from '../../layouts/Master'
import { Box, Card, Chip, Divider, LinearProgress, Stack, Typography } from '@mui/material'
import { fetchTransactionByUserId } from '../../api/TransactionApi'
import { useAuthContext } from '../../hooks/useAuthContext'
import { toast } from 'react-toastify'
import { DataGrid } from '@mui/x-data-grid'
import moment from 'moment'

function Transaction() {
    const {auth} = useAuthContext();
    const [isLoading, setIsLoading] = useState(true)
    const [transData, setTransData] = useState([])
    const handleGetData = async () => {
        const {data, error}= await fetchTransactionByUserId(auth.user._id)
        if (error) {
            toast.error("Something wen wrong")
        } else {
            setTransData(data)
            setIsLoading(false)
        }
    }
    useEffect(() => {
        handleGetData()
    },[])
    return (
        <Master>
            <Stack spacing={1}>
                <Typography variant="h4" fontWeight={'bold'}>Transaction</Typography>
                <Box>
                    <Divider/>
                    {isLoading && <LinearProgress/>}
                </Box>
                <TableSection transData={transData}/>
            </Stack>
        </Master>
    )
}

function TableSection ({transData}) {
    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            flex: 1,
            headerAlign: 'center'
        },
        {
            field: 'collection',
            headerName: 'Collection Name',
            flex: 1,
            headerAlign: 'center'
        },
        {
            field: 'payment',
            headerName: 'Payment',
            flex: 1,
            headerAlign: 'center',
            renderCell: (params) => (
                params.row.payment ? (
                    <Box sx={{textAlign: 'center'}}>
                        <Chip label={params.row.payment} color='success'/>
                    </Box>
                ) : 
                    <Box sx={{textAlign: 'center'}}>
                        <Chip label='Unpaid' color='error'/>       
                    </Box> 
            )
        },
        {
            field: 'amount',
            headerName: 'Amount',
            flex: 1,
            headerAlign: 'center',
            renderCell: (params) => (
                params.row.amount ? (
                    <Box sx={{textAlign: 'center'}}>
                        <Chip label={`₱ ${params.row.amount.toFixed(2)}`}/>
                    </Box>
                ) : 
                    <Box sx={{textAlign: 'center'}}>
                        <Chip label='Unpaid' color='error'/>     
                    </Box>
            )
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            headerAlign: 'center',
            renderCell: (params) => (
                <>
                    {params.row.status == 'confirm' && 
                        <Box sx={{textAlign: 'center'}}>
                            <Chip label='Confirm' color='success'/>     
                        </Box>
                    }
                    {params.row.status == 'pending' && 
                        <Box sx={{textAlign: 'center'}}>
                            <Chip label='Pending' color='warning'/>     
                        </Box>
                    }
                    {params.row.status == 'decline' && 
                        <Box sx={{textAlign: 'center'}}>
                            <Chip label='Decline' color='error'/>     
                        </Box>
                    }
                </>
            )
        },
        {
            field: 'date',
            headerName: 'Date',
            flex: 1,
            headerAlign: 'center'
        },
    ]
    const rows = useMemo(() => 
        transData.map(item => ({
            ...item,
            id: item._id,
            collection: item.collectionId?.collectionName,
            date: moment(item.date).format('MMMM DD YYYY')
        })),
        [transData]
    )
    return (
        <Card sx={{p:2}} elevation={5}>
            <DataGrid
            columns={columns}
            rows={rows}
            />
        </Card>
    )
}

export default Transaction