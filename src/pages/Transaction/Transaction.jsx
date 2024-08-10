import React, { useState } from 'react';
import { Box, Button, Divider, Drawer, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material';
import Master from '../../layouts/Master';
import { DataTable, DeleteModal, DropDown } from '../../components';
import Store from './Form/Store';
import Update from './Form/Update';
import Delete from './Form/Delete';


function Transaction() {
    const [open, setOpen] = useState(false);
    return (
        <Master>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6} sx={{display: 'flex', gap: 2}}>
                    <Typography variant="h5" fontWeight="bold">Transaction List :</Typography>
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
                <TransactionList />
            </Box>
            <StoreDrawer open={open} setOpen={setOpen} />
        </Master>
    )
}

function TransactionList() {
    const [updateModal, setUpdateModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const columns = [
        { id: '_id', label: 'ID' },
        { id: 'last_name', label: 'Last Name' },
        { id: 'first_name', label: 'First Name' },
        { id: 'middle_name', label: 'Middle Name' },
        { id: 'status', label: 'Status' },
        { id: 'date', label: 'Date' },
        { id: 'cash', label: 'Cash' },
    ];

    const rows = [
        {
        _id: 1,
        last_name: "Smith",
        first_name: "John",
        middle_name: "A.",
        status: "Paid",
        date: "2024-08-10",
        cash: 150.00,
        },
        {
        _id: 2,
        last_name: "Doe",
        first_name: "Jane",
        middle_name: "B.",
        status: "Pending",
        date: "2024-08-11",
        cash: 75.00,
        },
        {
        _id: 3,
        last_name: "Johnson",
        first_name: "Emily",
        middle_name: "C.",
        status: "Paid",
        date: "2024-08-12",
        cash: 200.00,
        },
        {
        _id: 4,
        last_name: "Williams",
        first_name: "Michael",
        middle_name: "D.",
        status: "Pending",
        date: "2024-08-13",
        cash: 50.00,
        },
        {
        _id: 5,
        last_name: "Brown",
        first_name: "Sarah",
        middle_name: "E.",
        status: "Paid",
        date: "2024-08-14",
        cash: 120.00,
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

export default Transaction