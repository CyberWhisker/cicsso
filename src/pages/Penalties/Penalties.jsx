import React, { useEffect, useState } from 'react';
import { Avatar, Box, Card, Divider,Grid,LinearProgress, Stack, Typography } from '@mui/material';
import Master from '../../layouts/Master';
import { CustomCard } from '../../components';
import { toast } from 'react-toastify';
import { fetchUserById, fetchUsers, } from '../../api/userApi';

function Penalties() {
    const [isLoading, setIsLoading] = useState(true);
    const [usersData, setUsersData] = useState([]);
    useEffect(() => {
        const getUsers = async () => {
            setIsLoading(true);
            const { data, error } = await fetchUsers();
            if (error) {
                console.log(error);
            } else {
                setUsersData(data);
            }
            setIsLoading(false);
        };
        getUsers();
    }, []);
    return (
        <Master>
            <Stack direction={'column'} spacing={2}>
                <Typography variant="h5" fontWeight="bold">Penalties</Typography>
                <Box>
                    <Divider/>
                    {isLoading && (
                        <LinearProgress/>
                    )}
                </Box>
            </Stack>
            <Grid container mt={1} spacing={2}>
                <Grid item xs={4}>
                    <UsersList isLoading={isLoading} usersData={usersData} setUserData={setUsersData}/>
                </Grid>
                <Grid item xs={8}>
                    <AttendanceList/>
                </Grid>
            </Grid>
        </Master>
    )
}

function UsersList({usersData}) {
    return (
        <Card sx={{p: 2, height: '75vh', overflow: 'auto'}} elevation={5}>
            <Stack direction={'column'} spacing={2}>
                <Typography fontWeight={'bold'}>User List:</Typography>
                <Divider/>
                {usersData.map((item, index) => (
                    <CustomCard key={index} >
                        <Box sx={{height: 50}}>
                            <Stack direction={'row'} spacing={2}>
                                <Avatar alt='img' src={item.picture} sx={{
                                    height: 50,
                                    width: 50
                                }}/>
                                <Box>
                                    <Typography fontWeight={'bold'}>{item.name}</Typography>
                                    <Typography>{item.email}</Typography>
                                </Box>
                            </Stack>
                        </Box>
                    </CustomCard>
                ))}
            </Stack>
        </Card>
    );
}

function AttendanceList() {
    return(
        <Card sx={{p: 2, height: '75vh', overflow: 'auto'}} elevation={5}>
            <Stack direction={'column'} spacing={2}>
                <Typography fontWeight={'bold'}>Attendance</Typography>
                <Divider/>
                
            </Stack>
        </Card>
    )
}

function AttendanceDataTable() {
    const [updateModal, setUpdateModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [selected, setSelected] = useState([]);
    const handleCloseModal = () => {
        setUpdateModal(false);
        setDeleteModal(false);
    }

    const handleUpdateModal = (row) => {
        setSelected(row); 
        setUpdateModal(true); 
    };
    
    const handleDeleteModal = (row) => {
        setSelected(row); 
        setDeleteModal(true);
    };

    const columns = [
        { id: 'amInFormat', label: <Chip label="AM IN"/> },
        { id: 'amOutFormat', label: <Chip label='AM OUT'/> },
        { id: 'pmInFormat', label: <Chip label='PM IN'/> },
        { id: 'pmOutFormat', label: <Chip label='PM OUT'/> },
    ];

    const rows = useMemo(() => 
        combinedData.map((item) => ({
        _id: item.attendance?._id ? item.attendance._id : null,
        amInFormat: item.attendance?.amIn ? 
            <Chip color='success' label={moment(item.attendance.amIn).format('hh:mm A')}/> : 
            <Chip color='error' label='Absent'/>,
        amOutFormat: item.attendance?.amOut ? 
            <Chip color='success' label={moment(item.attendance.amOut).format('hh:mm A')}/> : 
            <Chip color='error' label='Absent'/>,
        pmInFormat: item.attendance?.pmIn ? 
            <Chip color='success' label={moment(item.attendance.pmIn).format('hh:mm A')}/> : 
            <Chip color='error' label='Absent'/>,
        pmOutFormat: item.attendance?.pmOut ? 
            <Chip color='success' label={moment(item.attendance.pmOut).format('hh:mm A')}/> : 
            <Chip color='error' label='Absent'/>,
        picture: item.picture, 
        amIn: item.attendance?.amIn ? item.attendance.amIn : null,
        amOut: item.attendance?.amOut ? item.attendance.amOut : null,
        pmIn: item.attendance?.pmIn ? item.attendance.pmIn : null,
        pmOut: item.attendance?.pmOut ? item.attendance.pmOut : null,
        })),
        [combinedData]
    );

    return (
        <Box>
        <DataTable 
            rows={rows} 
            columns={columns}
            rowAction={(row) => (
                <>
                {row._id ? (
                    <>
                    <MenuItem onClick={() => handleUpdateModal(row)}>
                        <Typography color="warning.main">Edit</Typography>
                    </MenuItem>
                    <MenuItem onClick={(e) => handleDeleteModal(row)}>
                        <Typography color="error.main">Delete</Typography>
                    </MenuItem>
                    </>
                ) : (
                    
                    <MenuItem disabled>
                    <Typography color="error.main">No Record</Typography>
                    </MenuItem>
                )}
                </>
            )}
            />
        <Drawer anchor='right' open={updateModal} onClose={handleCloseModal}>
            <Update />
        </Drawer>
        <AlertModal open={deleteModal} onClose={handleCloseModal}>
            <Delete />
        </AlertModal>
        </Box>
    );
}

export default Penalties