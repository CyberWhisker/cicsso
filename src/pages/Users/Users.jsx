import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Card, Divider, Drawer, Grid, LinearProgress, MenuItem, Stack, TextField, Typography } from '@mui/material';
import Master from '../../layouts/Master';
import { CustomCard, DeleteModal } from '../../components';
import Store from './Form/Store';
import Update from './Form/Update';
import Delete from './Form/Delete';
import { Person } from '@mui/icons-material';
import useFetch from 'react-fetch-hook';
import { toast } from 'react-toastify';


function Users() {
    const [open, setOpen] = useState(false);
    const [userData, setUserData] = useState(null);
    const [detailsLoading, setDetailsLoading] = useState(false);
    const {isLoading, data, error} = useFetch(`${import.meta.env.VITE_AUTH0_API}/api/v2/users`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_TOKEN}`
        }
    });

    return (
        <Master>
            <Stack direction={'column'} spacing={2}>
                <Typography variant="h5" fontWeight="bold">User Management</Typography>
                <Divider/>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <UsersList data={data} isLoading={isLoading} setUserData={setUserData} setDetailsLoading={setDetailsLoading}/>
                    </Grid>
                    <Grid item xs={8}>
                        <UserDetails userData={userData} detailsLoading={detailsLoading}/>
                    </Grid>
                </Grid>
            </Stack>
            <StoreDrawer open={open} setOpen={setOpen} />
        </Master>
    )
}

function UsersList({data, isLoading, setUserData, setDetailsLoading}) {
    const handleUserData = async (item) => {
        setDetailsLoading(true);
        const response = await fetch(`${import.meta.env.VITE_AUTH0_API}/api/v2/users/${item.user_id}/roles`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${import.meta.env.VITE_TOKEN}`
            }
        })
        if (response.ok) {
            setDetailsLoading(false);
            const roles = await response.json();  
            setUserData({ ...item, roles });
        } else {
            setUserData(item)
        }
    }
    return (
        <Card sx={{p: 2, height: '75vh', overflow: 'auto'}} elevation={2}>
            <Stack direction={'column'} spacing={2}>
                <Typography fontWeight={'bold'}>User List:</Typography>
                <Box>
                    <Divider/>
                    {isLoading && (
                        <LinearProgress/>
                    )}
                </Box>
                {!isLoading && data.map((item, index) => (
                    <CustomCard key={index} >
                        <Box sx={{height: 50}} onClick={() => handleUserData(item)}>
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

function UserDetails({userData, detailsLoading}) {
    if (!userData) {
      return(
        <Card sx={{p: 2, height: '75vh', overflowY: 'auto'}}>
            <Stack direction={'column'} spacing={2} sx={{ height: '100%'}}>
                <Typography fontWeight={'bold'}>User Details</Typography>
                <Box>
                    <Divider/>
                    {detailsLoading && (
                        <LinearProgress/>
                    )}
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
        <Card sx={{p: 2, height: '75vh', overflow: 'auto'}}>
            <Stack direction={'column'} spacing={2}>
                <Typography fontWeight={'bold'}>User Details</Typography>
                <Box>
                    <Divider/>
                    {detailsLoading && (
                        <LinearProgress/>
                    )}
                </Box>
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
                            <RoleList userData={userData}/>
                        </Stack>
                    </Grid>
                </Grid>
            </Stack>
        </Card>
    )
}

function RoleList({userData}) {
    const [selectedRole, setSelectedRole] = useState('');
    const { isLoading, data, error } = useFetch(`${import.meta.env.VITE_AUTH0_API}/api/v2/roles`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_TOKEN}`
        }
    });

    useEffect(() => {
        // Set the default value to the first available role once the data is fetched
        if (!isLoading && data && data.length > 0) {
            setSelectedRole(userData.roles[0].id); // Adjust this logic as needed based on your app
        }
    }, [isLoading, data]);

    const handleChange = (event) => {
        setSelectedRole(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            // Step 1: Remove existing roles
            const removeResponse = await fetch(`${import.meta.env.VITE_AUTH0_API}/api/v2/users/${userData.user_id}/roles`, {
                method: 'DELETE',  // Use DELETE to remove existing roles
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_TOKEN}`
                },
                body: JSON.stringify({ roles: userData.roles.map(role => role.id) })  // Send all current roles to remove
            });
            
            if (!removeResponse.ok) {
                const errorData = await removeResponse.json();
                console.log('Failed to remove roles:', errorData);
                return;  // Exit if role removal fails
            }
    
            // Step 2: Assign the new role
            const assignResponse = await fetch(`${import.meta.env.VITE_AUTH0_API}/api/v2/users/${userData.user_id}/roles`, {
                method: 'POST',  // Use POST to assign the new role
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_TOKEN}`
                },
                body: JSON.stringify({ roles: [selectedRole] })  // Send the new selected role as an array
            });
            
            if (assignResponse.ok) {
                toast.success("Role successfully updated");
            } else {
                const errorData = await assignResponse.json();
                console.log('Failed to assign role:', errorData);
            }
        } catch (error) {
            console.log('Error updating role:', error);
        }
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
                    {isLoading ? (
                        <MenuItem disabled>Loading...</MenuItem>
                    ) : (
                        data && data.length > 0 ? (
                            data.map((item, index) => (
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


function StoreDrawer({ open, setOpen }) {
    return (
    <Drawer
        open={open}
        anchor="right"
        onClose={() => setOpen(false)}
        sx={{ width: { xs: '100%', sm: '75%', md: '50%' } }}
    >
        <Store />
    </Drawer>
    );
}

function UpdateDrawer({ open, setOpen }) {
    return (
    <Drawer
        open={open}
        anchor="right"
        onClose={() => setOpen(false)}
        sx={{ width: { xs: '100%', sm: '75%', md: '50%' } }}
    >
        <Update />
    </Drawer>
    );
}

function DeleteDrawer({ open, handleClose }) {
    return (
    <DeleteModal open={open} anchor="right" handleClose={handleClose}>
        <Delete />
    </DeleteModal>
    );
}

export default Users