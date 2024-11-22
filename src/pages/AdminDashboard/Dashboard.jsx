import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Master from '../../layouts/Master';
import { Box, Card, Chip, Divider, Drawer, LinearProgress, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import { fetchUsers } from '../../api/userApi';
import { toast } from 'react-toastify';
import { fetchEvent } from '../../api/EventApi';
import { fetchSchedule } from '../../api/ScheduleApi';
import { fetchAttendances } from '../../api/AttendanceApi';
import { fetchTransactions } from '../../api/TransactionApi';
import { useState, useEffect, useMemo } from 'react';
import moment from 'moment';
import { DataGrid, GridMoreVertIcon } from '@mui/x-data-grid';
import Update from './Form/Update';
import Delete from './Form/Delete';
import { AlertModal } from '../../components';
import { fetchItem } from '../../api/ItemApi';

function Dashboard() {
    const [isLoading, setIsLoading] = useState(true)
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPenalties, setTotalPenalties] = useState(0);
    const [totalPending, setTotalPending] = useState(0);
    const [totalFunds, setTotalFunds] = useState(0);
    const [allData, setAllData] = useState([]);
    const [pendingData, setPendingData] = useState([]);
    const [userData, setUserData] = useState([]);
    const handleGetData = async () => {
        const [
            {data: userData, error: userError},
            {data: eventData, error: eventError},
            {data: schedData, error: schedError},
            {data: atttendData, error: attendError},
            {data: transacData, error: transacError},
            {data: itemData, error: itemError},
        ] = await Promise.all([
            fetchUsers(),
            fetchEvent(),
            fetchSchedule(),
            fetchAttendances(),
            fetchTransactions(),
            fetchItem()
        ])
        if (userError, eventError, schedError, attendError, transacError, itemError) {
            toast.error('Something Went Wrong');
        } else {
            // count total Users
            const totalUsers = userData.length
            setTotalUsers(totalUsers)  

            // count total Penalties
            const filterSched = atttendData.filter(attend => moment(attend.data).isSameOrBefore(moment()))
            const totalAtttendance = (filterSched.length * 4) * totalUsers

            let totalUserAttendance = 0;
            atttendData.map((attend) => {
                if (attend.amIn) {
                    totalUserAttendance++
                }
                if (attend.amOut) {
                    totalUserAttendance++
                }
                if (attend.pmIn) {
                    totalUserAttendance++
                }
                if (attend.pmOut) {
                    totalUserAttendance++
                }
            })
            setTotalPenalties(totalAtttendance - totalUserAttendance);

            //count total Pending Transaction
            const totalPendingTransaction = transacData.reduce((count, current) => {
                return current.status === 'pending' ? count + 1 : count;
              }, 0);
              setTotalPending(totalPendingTransaction)

            // count total Transaction
            const totalFund = transacData.reduce((total, current) => {
                return current.status === 'confirm' ? total + current.amount : total;
            }, 0);
            setTotalFunds(totalFund - itemData.reduce((sum, item) => sum + item.amount * item.quantity, 0))

            // Pending Data
            const pendingTransaction = transacData.filter(trans => trans.status == 'pending');
            setPendingData(pendingTransaction)
            // User Data
            setUserData(userData)

            const combinedEventSched = eventData.map((event) => ({
                ...event,
                schedules: schedData.filter(sched => sched.eventId == event._id)
            }))
            
            setAllData(combinedEventSched)
            setIsLoading(false)
        }
    }
    useEffect(() => {
        handleGetData();
    },[])
    return (
        <Master>
            <Stack gap={2}>
                {isLoading && (
                    <LinearProgress/>
                )}
                <InfoSection totalUsers={totalUsers} totalPenalties={totalPenalties} totalFunds={totalFunds} totalPending={totalPending}/>
                
                <Grid container spacing={3}>
                    {/* Chart */}
                    <Grid item xs={12} md={8} lg={9}>
                        <PendingTable pendingData={pendingData} handleGetData={handleGetData} userData={userData}/>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <EventList allData={allData}/>
                    </Grid>
                </Grid>
            </Stack>
        </Master>
    )
}

function InfoSection({totalUsers, totalPenalties, totalFunds, totalPending}) {
    const theme = useTheme();
    return (
        <Grid container spacing={2}>
            <Grid item xs={6} md={3}>
                <Card sx={{p:2, backgroundColor: theme.palette.primary.main}}>
                    <Typography>Users:</Typography>
                    <Typography textAlign="center" variant='h4' fontWeight="bold">{totalUsers}</Typography>
                </Card>
            </Grid>
            <Grid item xs={6} md={3}>
                <Card sx={{p:2, backgroundColor: theme.palette.error.main}}>
                    <Typography>Penalty:</Typography>
                    <Typography textAlign="center" variant='h4' fontWeight="bold">{totalPenalties}</Typography>
                </Card>
            </Grid>
            <Grid item xs={6} md={3}>
                <Card sx={{p:2, backgroundColor: theme.palette.warning.main}}>
                    <Typography>Pending Transaction:</Typography>
                    <Typography textAlign="center" variant='h4' fontWeight="bold">{totalPending}</Typography>
                </Card>
            </Grid>
            <Grid item xs={6} md={3}>
                <Card sx={{p:2, backgroundColor: theme.palette.success.main}}>
                    <Typography>Funds:</Typography>
                    <Typography textAlign="center" variant='h4' fontWeight="bold">{totalFunds}</Typography>
                </Card>
            </Grid>
        </Grid>
    )
}

function PendingTable({pendingData, handleGetData, userData}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selected, setSelected] = useState(null);
    const [updateModal, setUpdateModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const handleMenuClose = (event, item) => {
        setAnchorEl(null)
    }

    const handleUpdateModal = () => {
        handleMenuClose();
        setUpdateModal(true)
    }

    const handleDeleteModal = () => {
        handleMenuClose();
        setDeleteModal(true)
    }

    const handleCloseModal = () => {
        setDeleteModal(false)
        setUpdateModal(false)
    }
    const handleMenuOpen = (event, item) => {
        setAnchorEl(event.currentTarget)
        const {_id: _id, collectionId, payment, amount, date, status, image, userId} = item
        const newForm = {
            _id: _id,
            userId: userId._id,
            collectionId: collectionId._id,
            payment: payment,
            amount: amount,
            date: date,
            status: status,
            image: image
        }
        setSelected(newForm)
    }
    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            flex: 1,
            headerAlign: 'center'
        },
        {
            field: 'name',
            headerName: 'Name',
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
                        <Chip label={params.row.amount}/>
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
            renderCell: () => (
                <Box sx={{textAlign: 'center'}}>
                    <Chip label='Pending' color='warning'/>     
                </Box>
            )
        },
        {
            field: 'date',
            headerName: 'Date',
            flex: 1,
            headerAlign: 'center'
        },
        {
            field: 'setting',
            headerName: 'Setting',
            renderCell: (params) => (
                <Stack height={'100%'} justifyContent={'center'} alignItems={'center'}>
                    <GridMoreVertIcon onClick={(e) => handleMenuOpen(e, params.row)} sx={{cursor: 'pointer'}}/>
                </Stack>
            ),
            headerAlign: 'center'
            
        },
    ]
    const rows = useMemo(() => 
        pendingData.map((item) => ({
            ...item,
            id: item._id,
            name: `${item.userId?.lastName}, ${item.userId?.firstName} ${item.userId?.lastName[0]}.`,
            date: moment(item.date).format('MMM DD, YYYY')
        })),
        [pendingData]
    );
    return (
        <Paper
            sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 500,
            }}
        >
            <DataGrid
            columns={columns}
            rows={rows}
            />
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleUpdateModal}>
                    <Typography color="warning.main">Edit</Typography>
                </MenuItem>
                <MenuItem onClick={handleDeleteModal}>
                    <Typography color="error.main">Delete</Typography>
                </MenuItem>
            </Menu>
            <Drawer open={updateModal} onClose={handleCloseModal} anchor='right'>
                <Update selected={selected} onClose={handleCloseModal} handleGetData={handleGetData} data={userData}/>
            </Drawer>
            <AlertModal open={deleteModal} onClose={handleCloseModal} anchor='right'>
                <Delete selected={selected} onClose={handleCloseModal} handleGetData={handleGetData}/>
            </AlertModal>
        </Paper>
    )
}

function EventList({ allData }) {
    const currentData = moment();
    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 500,
            }}
        >
            <Typography fontWeight="bold">Events List:</Typography>
            <Divider />
            {allData.map((item, index) => {
                let status;
                if (currentData.isSameOrAfter(moment(item.startDate)) && currentData.isSameOrBefore(moment(item.endDate))) {
                    status = 'active';
                } else if (currentData.isBefore(moment(item.startDate))) {
                    status = 'pending';
                } else {
                    status = 'expired';
                }
                return (
                    <MenuItem sx={{ display: 'flex', justifyContent: 'space-between' }} key={index}>
                        <Typography 
                            sx={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} 
                            noWrap
                        >
                            {item.event}
                        </Typography>
                        {status === 'active' && (
                            <Chip color="success" label="Active" />
                        )}
                        {status === 'pending' && (
                            <Chip color="warning" label="Pending" />
                        )}
                        {status === 'expired' && (
                            <Chip color="error" label="Expired" />
                        )}
                    </MenuItem>
                );
            })}
        </Paper>
    );
}

export default Dashboard