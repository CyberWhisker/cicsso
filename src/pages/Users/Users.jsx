import React, { useState } from 'react';
import { Box, Button, Divider, Drawer, Grid, MenuItem, TextField, Typography } from '@mui/material';
import Master from '../../layouts/Master';
import { DataTable, DeleteModal } from '../../components';
import Store from './Form/Store';
import Update from './Form/Update';
import Delete from './Form/Delete';


function Users() {
    const [open, setOpen] = useState(false);
    return (
        <Master>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6} sx={{display: 'flex', gap: 2}}>
                    <Typography variant="h5" fontWeight="bold">Users List :</Typography>
                    <Button variant="contained" onClick={() => setOpen(true)}>Add User</Button>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'flex-end', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%', justifyContent: 'end'}}>
                        <Typography sx={{display: {xs: 'none', md: 'block'}}}>Search: </Typography>
                        <TextField 
                        variant="outlined"
                        name="student_search"
                        label="Enter Student Name"
                        size="small"
                        sx={{ width: { xs: '100%', md: 'auto' } }}
                        />
                    </Box>
                    </Box>
                </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ mt: 2 }}>
                <UsersList />
            </Box>
            <StoreDrawer open={open} setOpen={setOpen} />
        </Master>
    )
}

function UsersList() {
    const [updateModal, setUpdateModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const columns = [
        { id: '_id', label: 'ID' },
        { id: 'last_name', label: 'Last Name' },
        { id: 'first_name', label: 'First Name' },
        { id: 'middle_name', label: 'Middle Name' },
        { id: 'role', label: 'Role' },
        { id: 'year', label: 'Year' },
        { id: 'section', label: 'Section' },
        { id: 'contact', label: 'Contact' },
        { id: 'email', label: 'Email' },
        { id: 'address', label: 'Address' },
    ];

    const rows = [
        {
        _id: 1,
        last_name: "Smith",
        first_name: "John",
        middle_name: "A.",
        role: "Student",
        year: "2024",
        section: "A",
        contact: "555-1234",
        email: "john.smith@example.com",
        address: "123 Elm Street, Springfield",
        },
        {
        _id: 2,
        last_name: "Doe",
        first_name: "Jane",
        middle_name: "B.",
        role: "Teacher",
        year: "2023",
        section: "B",
        contact: "555-5678",
        email: "jane.doe@example.com",
        address: "456 Oak Avenue, Springfield",
        },
        {
        _id: 3,
        last_name: "Johnson",
        first_name: "Emily",
        middle_name: "C.",
        role: "Student",
        year: "2025",
        section: "C",
        contact: "555-9101",
        email: "emily.johnson@example.com",
        address: "789 Pine Road, Springfield",
        },
        {
        _id: 4,
        last_name: "Williams",
        first_name: "Michael",
        middle_name: "D.",
        role: "Administrator",
        year: "2022",
        section: "D",
        contact: "555-1122",
        email: "michael.williams@example.com",
        address: "101 Maple Lane, Springfield",
        },
        {
        _id: 5,
        last_name: "Brown",
        first_name: "Sarah",
        middle_name: "E.",
        role: "Student",
        year: "2024",
        section: "E",
        contact: "555-3344",
        email: "sarah.brown@example.com",
        address: "202 Birch Boulevard, Springfield",
        },
    ];
      

    return (
        <React.Fragment>
        <DataTable rows={rows} columns={columns}>
            <MenuItem onClick={() => setUpdateModal(true)}>
            <Typography color="warning.main">Edit</Typography>
            </MenuItem>
            <MenuItem onClick={() => setDeleteModal(true)}>
            <Typography color="error.main">Delete</Typography>
            </MenuItem>
        </DataTable>
            <UpdateDrawer open={updateModal} setOpen={setUpdateModal} />
            <DeleteDrawer open={deleteModal} handleClose={() => setDeleteModal(false)} />
        </React.Fragment>
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