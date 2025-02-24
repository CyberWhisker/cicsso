import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Card, Divider, Drawer, Grid, LinearProgress, MenuItem, Stack, TextField, Typography } from '@mui/material';
import Master from '../../layouts/Master';
import { AlertModal, CustomCard } from '../../components';
import { Add, Folder, Person, Upload } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { fetchUserById, fetchUsers, updateUser } from '../../api/userApi';
import Delete from './Form/Delete';
import * as XLSX from 'xlsx';
import Store from './Form/Store';
import UploadForm from './Form/Upload';


function Users() {
    const [isLoading, setIsLoading] = useState(true);
    const [usersData, setUsersData] = useState([]);
    const [userData, setUserData] = useState(null);
    const [backupUser, setBackupUser] = useState([]);

    const getUsers = async () => {
        setIsLoading(true);
        const { data, error } = await fetchUsers();
        if (error) {
            console.log(error);
        } else {
            setUsersData(data);
            setBackupUser(data)
        }
        setIsLoading(false);
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <Master>
            <Stack direction={'column'} spacing={2}>
                <Stack direction={'row'} spacing={2}>
                    <Typography variant="h5" fontWeight="bold">User Management</Typography>
                    <AddUser getUsers={getUsers} />
                    <UploadUser getUsers={getUsers} />
                </Stack>
                <Box>
                    <Divider />
                    {isLoading && (
                        <LinearProgress />
                    )}
                </Box>
            </Stack>
            <Grid container spacing={2} mt={1}>
                <Grid item xs={4}>
                    <UsersList usersData={usersData} setIsLoading={setIsLoading} setUserData={setUserData} setUsersData={setUsersData} backupUser={backupUser} />
                </Grid>
                <Grid item xs={8}>
                    <UserDetails userData={userData} setIsLoading={setIsLoading} setUserData={setUserData} getUsers={getUsers} />
                </Grid>
            </Grid>
        </Master>
    )
}

function UsersList({ usersData, setIsLoading, setUserData, setUsersData, backupUser }) {
    const handleUserData = async (id) => {
        setIsLoading(true)
        const { data, error } = await fetchUserById(id);
        if (error) {
            toast.error("Failed to get data");
        } else {
            setUserData(data)
        }
        setIsLoading(false)
    }
    const onChangeSearch = (e) => {
        const value = e.target.value.toLowerCase();
        const terms = value.split(' '); // Split the input into search terms

        const filtered = backupUser.filter((item) => {
            const fullName = `${item.firstName} ${item?.middleName} ${item.lastName}`.toLowerCase(); // Combine all fields
            return terms.every((term) => fullName.includes(term)); // Check if all terms exist in the fullName
        });
        setUsersData(filtered)
    }
    return (
        <Card sx={{ p: 2, height: '75vh', overflow: 'auto' }} elevation={5}>
            <Stack direction={'column'} spacing={2}>
                <Box sx={{ display: 'flex' }}>
                    {/* <Typography fontWeight={'bold'}>User List:</Typography> */}
                    <TextField fullWidth label="Search" onChange={onChangeSearch} />
                </Box>
                <Divider />
                {usersData.map((item, index) => (
                    <CustomCard key={index} >
                        <Box sx={{ minHeight: 50 }} onClick={() => handleUserData(item._id)}>
                            <Stack direction={'row'} spacing={2} >
                                <Avatar alt='img' src={item.picture} sx={{
                                    height: 50,
                                    width: 50
                                }} />
                                <Box sx={{ width: '30vh' }}>
                                    <Typography noWrap fontWeight={'bold'} >
                                        {item.lastName.toUpperCase()}, {item.firstName.toUpperCase()} {item?.middleName ? item.middleName[0] : ""}
                                    </Typography>
                                    <Typography noWrap>{item.email}</Typography>
                                </Box>
                            </Stack>
                        </Box>
                    </CustomCard>
                ))}
            </Stack>
        </Card>
    );
}

function UserDetails({ userData, setUserData, getUsers }) {
    const [errors, setErrors] = useState({});
    const [toggleUpdate, setToggleUpdate] = useState(true)
    const [deleteModal, setDeleteModal] = useState(false)

    const handleUpdate = () => {
        setToggleUpdate(false);
    }

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    const handleCloseModal = () => {
        setDeleteModal(false);
    }

    const handleUpdateSubmit = async () => {
        const newErrors = {};
        if (userData.newPassword) {
            if (userData.newPassword.length < 6) newErrors.newPassword = 'Password must be at least 6 characters';
            toast.error(newErrors.newPassword)
        }

        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            const { data, error } = await updateUser(userData)
            if (error) {
                toast.error(error)
            } else {
                getUsers()
                toast.success('Successfully Updated')
            }
            setToggleUpdate(true)
        }
    }

    const handleDeleteSubmit = async () => {
        setDeleteModal(true)
    }
    if (!userData) {
        return (
            <Card sx={{ p: 2, height: '75vh', overflowY: 'auto' }} elevation={5}>
                <Stack direction={'column'} spacing={2} sx={{ height: '100%' }}>
                    <Typography fontWeight={'bold'}>User Details</Typography>
                    <Box>
                        <Divider />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                        <Avatar sx={{ height: 230, width: 230 }}>
                            {<Person sx={{ height: 200, width: 200 }} />}
                        </Avatar>
                        <Typography variant='h4' mt={2} fontWeight={'bold'}>Select User</Typography>
                    </Box>
                </Stack>
            </Card>
        )
    }
    return (
        <>
            <Card sx={{ p: 2, height: '75vh', overflow: 'auto' }} elevation={5}>
                <Stack direction={'column'} spacing={1}>
                    <Typography fontWeight={'bold'}>User Details</Typography>
                    <Divider />
                    <Grid container spacing={2} px={2}>
                        <Grid item xs={4}>
                            <Stack spacing={2}>
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Avatar alt={userData.name} src={userData.image} sx={{
                                        height: 150,
                                        width: 150,
                                    }} />
                                </Box>
                                {!toggleUpdate && <Button variant='contained' onClick={handleUpdateSubmit}>Save Changes</Button>}
                                {toggleUpdate && <Button variant='contained' color='warning' onClick={() => handleUpdate()}>Update</Button>}
                                <Button variant='contained' color='error' onClick={handleDeleteSubmit}>Delete User</Button>
                            </Stack>
                        </Grid>
                        <Grid item xs={8}>
                            <Stack direction={'column'} spacing={1}>
                                <Typography fontWeight={'bold'}>User Information</Typography>
                                <Divider />
                                <Typography>First Name:</Typography>
                                <TextField
                                    name='firstName'
                                    sx={{ width: '100%' }}
                                    value={userData.firstName}
                                    disabled={toggleUpdate}
                                    onChange={(e) =>
                                        handleChange({
                                            target: {
                                                name: e.target.name,
                                                value: e.target.value.toUpperCase(), // Transform to uppercase
                                            },
                                        })
                                    }
                                />
                                <Typography>Middle Name:</Typography>
                                <TextField
                                    name='middleName'
                                    sx={{ width: '100%' }}
                                    value={userData?.middleName}
                                    disabled={toggleUpdate}
                                    onChange={(e) =>
                                        handleChange({
                                            target: {
                                                name: e.target.name,
                                                value: e.target.value.toUpperCase(), // Transform to uppercase
                                            },
                                        })
                                    }
                                />
                                <Typography>Last Name:</Typography>
                                <TextField
                                    name='lastName'
                                    sx={{ width: '100%' }}
                                    value={userData.lastName}
                                    disabled={toggleUpdate}
                                    onChange={(e) =>
                                        handleChange({
                                            target: {
                                                name: e.target.name,
                                                value: e.target.value.toUpperCase(), // Transform to uppercase
                                            },
                                        })
                                    }
                                />
                                <Typography fontWeight={'bold'}>Student Information</Typography>
                                <Divider />
                                <Typography>Student ID</Typography>
                                <TextField
                                    name='studentId'
                                    sx={{ width: '100%' }}
                                    value={userData.studentId}
                                    disabled={toggleUpdate}
                                    onChange={handleChange}
                                />
                                <Typography>Type</Typography>
                                {/* <TextField
                                    name='type'
                                    sx={{ width: '100%' }}
                                    value={userData.type}
                                    disabled={toggleUpdate}
                                    onChange={handleChange}
                                    select
                                >
                                    <MenuItem value='Regular'>Regular</MenuItem>
                                    <MenuItem value='Irregular'>Irregular</MenuItem>
                                </TextField> */}
                                <TextField
                                    name='type'
                                    sx={{ width: '100%' }}
                                    value={userData.type}
                                    disabled={toggleUpdate}
                                    onChange={handleChange}
                                />
                                <Typography>Program:</Typography>
                                <TextField
                                    name='program'
                                    sx={{ width: '100%' }}
                                    value={userData.program}
                                    disabled={toggleUpdate}
                                    onChange={handleChange}
                                />
                                {/* <TextField
                                    select
                                    name='program'
                                    sx={{ width: '100%' }}
                                    value={userData.program}
                                    disabled={toggleUpdate}
                                    onChange={handleChange}
                                >
                                    <MenuItem value='BS Information Technology'>BS Information Technology</MenuItem>
                                    <MenuItem value='BS Information System'>BS Information Systems</MenuItem>
                                </TextField> */}
                                <Stack direction={'row'} spacing={2}>
                                    <Box sx={{ width: '100%' }}>
                                        <Typography>Year</Typography>
                                        {/* <TextField
                                            name='year'
                                            sx={{ width: '100%' }}
                                            value={userData.year}
                                            select
                                            disabled={toggleUpdate}
                                            onChange={handleChange}
                                        >
                                            <MenuItem value='1st'>1st</MenuItem>
                                            <MenuItem value='2nd'>2nd</MenuItem>
                                            <MenuItem value='3rd'>3rd</MenuItem>
                                            <MenuItem value='4th'>4th</MenuItem>
                                        </TextField> */}
                                        <TextField
                                            name='year'
                                            sx={{ width: '100%' }}
                                            value={userData.year}
                                            disabled={toggleUpdate}
                                            onChange={handleChange}
                                        />
                                    </Box>
                                    <Box sx={{ width: '100%' }}>
                                        <Typography>Section</Typography>
                                        {/* <TextField
                                            name='section'
                                            sx={{ width: '100%' }}
                                            value={userData.section}
                                            disabled={toggleUpdate}
                                            select
                                            onChange={handleChange}
                                        >
                                            <MenuItem value='A'>A</MenuItem>
                                            <MenuItem value='B'>B</MenuItem>
                                            <MenuItem value='C'>C</MenuItem>
                                            <MenuItem value='D'>Dr</MenuItem>
                                        </TextField> */}
                                        <TextField
                                            name='section'
                                            sx={{ width: '100%' }}
                                            value={userData.section}
                                            disabled={toggleUpdate}
                                            onChange={handleChange}
                                        />
                                    </Box>
                                </Stack>
                                <Typography fontWeight={'bold'}>Account Information</Typography>
                                <Divider />
                                <Typography fontWeight={'bold'}>Email:</Typography>
                                <TextField
                                    name='email'
                                    sx={{ width: '100%' }}
                                    value={userData.email}
                                    disabled={toggleUpdate}
                                    onChange={handleChange}
                                />
                                <Typography fontWeight={'bold'}>Role:</Typography>
                                <TextField
                                    name='role'
                                    sx={{ width: '100%' }}
                                    value={userData.role}
                                    select
                                    disabled={toggleUpdate}
                                    onChange={handleChange}
                                >
                                    <MenuItem value='admin'>Admin</MenuItem>
                                    <MenuItem value='user'>User</MenuItem>
                                    <MenuItem value='superAdmin'>Super Admin</MenuItem>
                                </TextField>
                                <Typography fontWeight={'bold'}>Reset Password</Typography>
                                <Divider />
                                <TextField
                                    name='newPassword'
                                    label='Enter New Password'
                                    sx={{ width: '100%' }}
                                    disabled={toggleUpdate}
                                    onChange={handleChange}
                                    error={Boolean(errors.newPassword)}
                                    helperText={errors.newPassword}
                                />
                            </Stack>
                        </Grid>
                    </Grid>
                </Stack>
            </Card>
            <AlertModal open={deleteModal} onClose={handleCloseModal}>
                <Delete selected={userData} onClose={handleCloseModal} handleGetData={getUsers} />
            </AlertModal>
        </>
    )
}

function AddUser({ getUsers }) {
    const [storeModal, setStoreModal] = useState(false)

    return (
        <>
            <Button variant='contained' endIcon={<Add />} onClick={() => setStoreModal(true)}>Add User</Button>
            <Drawer anchor='right' open={storeModal} onClose={() => setStoreModal(false)}>
                <Store getUsers={getUsers} onClose={() => setStoreModal(false)} />
            </Drawer>
        </>
    );
}


function UploadUser({ getUsers }) {
    const [openForm, setOpenForm] = useState(false)

    return (
        <>
            <Button variant='contained' color='warning' endIcon={<Upload />} onClick={() => setOpenForm(true)}>Upload User</Button>
            <Drawer anchor='right' open={openForm} onClose={() => setOpenForm(false)}>
                <UploadForm onClose={() => setOpenForm(false)} getUsers={getUsers} />
            </Drawer>
        </>
    )
}

export default Users