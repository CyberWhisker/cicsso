import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Card, Divider, Drawer, Grid, LinearProgress, MenuItem, Stack, TextField, Typography } from '@mui/material';
import Master from '../../layouts/Master';
import { AlertModal, CustomCard } from '../../components';
import { Person } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { deleteUser, fetchUserById, fetchUsers, updateUser } from '../../api/userApi';
import Delete from './Form/Delete';


function Users() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [usersData, setUsersData] = useState([]);
    const [userData, setUserData] = useState(null);

    const getUsers = async () => {
        setIsLoading(true);
        const { data, error } = await fetchUsers();
        if (error) {
            setError(error);
        } else {
            setUsersData(data);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <Master>
            <Stack direction={'column'} spacing={2}>
                <Typography variant="h5" fontWeight="bold">User Management</Typography>
                <Box>
                    <Divider/>
                    {isLoading && (
                        <LinearProgress/>
                    )}
                </Box>
            </Stack>
            <Grid container spacing={2} mt={1}>
                <Grid item xs={4}>
                    <UsersList usersData={usersData} setIsLoading={setIsLoading} setUserData={setUserData}/>
                </Grid>
                <Grid item xs={8}>
                    <UserDetails userData={userData} setIsLoading={setIsLoading} setUserData={setUserData} getUsers={getUsers}/>
                </Grid>
            </Grid>
        </Master>
    )
}

function UsersList({usersData, setIsLoading, setUserData}) {
    const handleUserData = async (id) => {
        setIsLoading(true)
        const {data, error} = await fetchUserById(id);
        if (error) {
            toast.error("Failed to get data");
        } else {
            setUserData(data)
        }
        setIsLoading(false)
    }
    return (
        <Card sx={{p: 2, height: '75vh', overflow: 'auto'}} elevation={5}>
            <Stack direction={'column'} spacing={2}>
                <Typography fontWeight={'bold'}>User List:</Typography>
                <Divider/>
                {usersData.map((item, index) => (
                    <CustomCard key={index} >
                        <Box sx={{height: 50}} onClick={() => handleUserData(item._id)}>
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

function UserDetails({userData, setUserData, getUsers}) {
    const [toggleUpdate, setToggleUpdate] = useState(true)
    const [deleteModal, setDeleteModal] = useState(false)

    const handleUpdate = () => {
        setToggleUpdate(false);
    }

    const handleChange = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value})
    }

    const handleCloseModal = () => {
        setDeleteModal(false);
    }

    const handleUpdateSubmit = async () => {
        const {data, error} = await updateUser(userData)
        if (error) {
            toast.error(error)
        } else {
            getUsers()
            toast.success('Successfully Updated')
        }
        setToggleUpdate(true)
    }

    const handleDeleteSubmit = async () => {
        setDeleteModal(true)
    }
    if (!userData) {
      return(
        <Card sx={{p: 2, height: '75vh', overflowY: 'auto'}} elevation={5}>
            <Stack direction={'column'} spacing={2} sx={{ height: '100%'}}>
                <Typography fontWeight={'bold'}>User Details</Typography>
                <Box>
                    <Divider/>
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                    <Avatar sx={{height: 230, width: 230}}>
                        {<Person sx={{height: 200, width: 200}}/>}
                    </Avatar>
                    <Typography variant='h4' mt={2} fontWeight={'bold'}>Select User</Typography>
                </Box>
            </Stack>
        </Card>
      )  
    }
    return(
        <>
            <Card sx={{p: 2, height: '75vh', overflow: 'auto'}} elevation={5}>
                <Stack direction={'column'} spacing={1}>
                    <Typography fontWeight={'bold'}>User Details</Typography>
                    <Divider/>
                    <Grid container spacing={2} px={2}>
                        <Grid item xs={4}>
                            <Stack spacing={2}>
                                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                                    <Avatar alt={userData.name} src={userData.image} sx={{
                                        height: 150,
                                        width: 150,
                                    }}/>
                                </Box>
                                {!toggleUpdate && <Button variant='contained' onClick={handleUpdateSubmit}>Save Changes</Button>}
                                {toggleUpdate && <Button variant='contained' color='warning' onClick={() => handleUpdate()}>Update</Button>}                         
                                <Button variant='contained' color='error' onClick={handleDeleteSubmit}>Delete User</Button>
                            </Stack>
                        </Grid>
                        <Grid item xs={8}>
                            <Stack direction={'column'} spacing={2}>
                                <Box>
                                    <Typography>Name:</Typography>
                                    <TextField 
                                    name='name'
                                    sx={{width: '100%'}} 
                                    value={userData.name}
                                    disabled={toggleUpdate}
                                    onChange={handleChange}
                                    />
                                </Box>
                                <Box>
                                    <Typography>Email:</Typography>
                                    <TextField 
                                    name='email'
                                    sx={{width: '100%'}} 
                                    value={userData.email}
                                    disabled={toggleUpdate}
                                    onChange={handleChange}
                                    />
                                </Box>
                                <Stack direction={'row'} spacing={2}>
                                    <Box sx={{width: '100%'}}>
                                        <Typography>Year</Typography>
                                        <TextField 
                                        name='year'
                                        sx={{width: '100%'}} 
                                        value={userData.year}
                                        select
                                        disabled={toggleUpdate}
                                        onChange={handleChange}
                                        >
                                            <MenuItem value='1st Year'>1st year</MenuItem>
                                            <MenuItem value='2nd Year'>2nd year</MenuItem>
                                            <MenuItem value='3rd Year'>3rd year</MenuItem>
                                            <MenuItem value='4th Year'>4th year</MenuItem>
                                        </TextField>
                                    </Box>
                                    <Box sx={{width: '100%'}}>
                                        <Typography>Section</Typography>
                                        <TextField 
                                        name='section'
                                        sx={{width: '100%'}} 
                                        value={userData.section}
                                        disabled={toggleUpdate}
                                        select
                                        onChange={handleChange}
                                        >
                                            <MenuItem value='A'>A</MenuItem>
                                            <MenuItem value='B'>B</MenuItem>
                                            <MenuItem value='C'>C</MenuItem>
                                            <MenuItem value='D'>Dr</MenuItem>
                                        </TextField>
                                    </Box>
                                </Stack>
                                <Divider/>
                                <Box>
                                    <Typography>Role</Typography>
                                    <TextField 
                                    name='role'
                                    sx={{width: '100%'}} 
                                    value={userData.role}
                                    select
                                    disabled={toggleUpdate}
                                    onChange={handleChange}
                                    >
                                        <MenuItem value='admin'>Admin</MenuItem>
                                        <MenuItem value='user'>User</MenuItem>
                                    </TextField>
                                </Box>
                            </Stack>
                        </Grid>
                    </Grid>
                </Stack>
            </Card>
            <AlertModal open={deleteModal} onClose={handleCloseModal}>
                <Delete selected={userData} onClose={handleCloseModal} handleGetData={getUsers}/>
            </AlertModal>
        </>
    )
}

export default Users