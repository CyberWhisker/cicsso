import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Card, Divider, Grid, LinearProgress, MenuItem, Stack, TextField, Typography } from '@mui/material';
import Master from '../../layouts/Master';
import { CustomCard } from '../../components';
import { Person } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { fetchUserById, fetchUsers, updateUserRole } from '../../api/userApi';
import { fetchRoles } from '../../api/roleApi';


function Users() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [usersData, setUsersData] = useState([]);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
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
                    <UserDetails userData={userData} setIsLoading={setIsLoading}/>
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
                        <Box sx={{height: 50}} onClick={() => handleUserData(item.user_id)}>
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

function UserDetails({userData, setIsLoading}) {
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
        <Card sx={{p: 2, height: '75vh', overflow: 'auto'}} elevation={5}>
            <Stack direction={'column'} spacing={2}>
                <Typography fontWeight={'bold'}>User Details</Typography>
                <Divider/>
                <Grid container>
                    <Grid item xs={4}>
                        <Box sx={{display: 'flex', justifyContent: 'center'}}>
                            <Avatar alt='user' src={userData.picture} sx={{
                                height: 150,
                                width: 150,
                            }}/>
                        
                        </Box>
                    </Grid>
                    <Grid item xs={8}>
                        <Stack direction={'column'} spacing={2}>
                            <Box>
                                <Typography>Email:</Typography>
                                <TextField 
                                sx={{width: '100%'}} 
                                value={userData.email}
                                disabled
                                />
                            </Box>
                            <Box>
                                <Typography>First Name:</Typography>
                                <TextField 
                                sx={{width: '100%'}} 
                                value={userData.given_name}
                                disabled
                                />
                            </Box>
                            <Box>
                                <Typography>Last Name:</Typography>
                                <TextField 
                                sx={{width: '100%'}} 
                                value={userData.family_name}
                                disabled
                                />
                            </Box>
                            <Box>
                                <Typography>Nickname:</Typography>
                                <TextField 
                                sx={{width: '100%'}} 
                                value={userData.nickname}
                                disabled
                                />
                            </Box>
                            <Divider/>
                            <RoleList userData={userData} setIsLoading={setIsLoading}/>
                        </Stack>
                    </Grid>
                </Grid>
            </Stack>
        </Card>
    )
}

function RoleList({userData, setIsLoading}) {
    const [roleIsLoading, setRoleIsLoading] = useState(false);
    const [selectedRole, setSelectedRole] = useState('');
    const [roles, setRoles] = useState([]);
    useEffect(() => {
        const getRoles = async () => {
            setIsLoading(true);
            setRoleIsLoading(true);
            const {data, error} = await fetchRoles();
            if (error) {
                console.log(error)
            } else {
                setRoles(data)
                setSelectedRole(userData.roles[0].id)
            }
            setRoleIsLoading(false);
            setIsLoading(false);
        }
        getRoles();
    }, []);

    const handleChange = (event) => {
        setSelectedRole(event.target.value);
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        await updateUserRole(userData, selectedRole)
        setIsLoading(false);
    };
    return (
        <Box>
            <Typography>Roles:</Typography>
            <Stack spacing={2}>
                <TextField 
                    sx={{ width: '100%' }} 
                    value={selectedRole}
                    select
                    onChange={handleChange}
                >
                    {roleIsLoading ? (
                        <MenuItem disabled>Loading...</MenuItem>
                    ) : (
                        roles && roles.length > 0 ? (
                            roles.map((item, index) => (
                                <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                            ))
                        ) : (
                            <MenuItem disabled>No roles available</MenuItem>
                        )
                    )}
                </TextField>
                <Button variant='contained' onClick={handleSubmit}>Save</Button>
            </Stack>
        </Box>
    );
}

export default Users