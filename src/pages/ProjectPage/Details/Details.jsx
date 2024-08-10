import React, { useState } from 'react';
import { Box, Button, Divider, Drawer, Grid, MenuItem, TextField, Typography } from '@mui/material';
import Master from '../../../layouts/Master';
import { DataTable, DeleteModal } from '../../../components';
import Store from './Form/Store';
import Update from './Form/Update';
import Delete from './Form/Delete';


function Details() {
    const [open, setOpen] = useState(false);
    return (
        <Master>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6} sx={{display: 'flex', gap: 2}}>
                    <Typography variant="h5" fontWeight="bold">Item List :</Typography>
                    <Button variant="contained" onClick={() => setOpen(true)}>Add Item</Button>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'flex-end', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%', justifyContent: 'end'}}>
                        <Typography sx={{display: {xs: 'none', md: 'block'}}}>Search: </Typography>
                        <TextField 
                        variant="outlined"
                        name="student_search"
                        label="Enter Item"
                        size="small"
                        sx={{ width: { xs: '100%', md: 'auto' } }}
                        />
                    </Box>
                    </Box>
                </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ mt: 2 }}>
                <ItemList />
            </Box>
            <StoreDrawer open={open} setOpen={setOpen} />
        </Master>
    )
}

function ItemList() {
    const [updateModal, setUpdateModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const columns = [
        { id: '_id', label: 'ID' },
        { id: 'item', label: 'Item Name' },
        { id: 'quantity', label: 'Quantity' },
        { id: 'price', label: 'Price' },
        { id: 'date', label: 'Date' },
    ];

    const rows = [
        {
        _id: 1,
        item: 'Laptop',
        quantity: 2,
        price: 1200.00,
        date: '2024-05-15',
        },
        {
        _id: 2,
        item: 'Desk Chair',
        quantity: 5,
        price: 150.00,
        date: '2024-06-01',
        },
        {
        _id: 3,
        item: 'Monitor',
        quantity: 3,
        price: 300.00,
        date: '2024-07-22',
        },
        {
        _id: 4,
        item: 'Keyboard',
        quantity: 10,
        price: 50.00,
        date: '2024-08-10',
        },
        {
        _id: 5,
        item: 'Mouse',
        quantity: 8,
        price: 25.00,
        date: '2024-09-05',
        },
        {
        _id: 6,
        item: 'Printer',
        quantity: 1,
        price: 200.00,
        date: '2024-09-20',
        },
        {
        _id: 7,
        item: 'External Hard Drive',
        quantity: 4,
        price: 100.00,
        date: '2024-10-10',
        },
        {
        _id: 8,
        item: 'Webcam',
        quantity: 6,
        price: 80.00,
        date: '2024-11-01',
        },
        {
        _id: 9,
        item: 'Headphones',
        quantity: 7,
        price: 70.00,
        date: '2024-11-15',
        },
        {
        _id: 10,
        item: 'Docking Station',
        quantity: 3,
        price: 150.00,
        date: '2024-12-05',
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

export default Details