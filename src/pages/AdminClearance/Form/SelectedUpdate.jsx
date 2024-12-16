import React from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import { toast } from 'react-toastify';
import { deleteClearance, updateSelectedClearance } from '../../../api/ClearanceApi';

const headerStyle = {
    p: 2,
    backgroundColor: (theme) => theme.palette.warning.main,  // Error color for header
    color: 'white',
    borderRadius: '4px 4px 0 0',  // Rounded corners for the top
};

const footerStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 1,
    p: 2
};

function SelectedUpdate({ selected, onClose, handleGetData }) {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const userIds = selected.map((item) => item._id)
        const formData = {
            usersId: userIds,
            status: 'Complete'
        }
        const { data, error } = await updateSelectedClearance(formData);
        if (error) {
            onClose();
            toast.error("Something went wrong!")
        } else {
            onClose();
            toast.success("Successfully deleted")
            handleGetData();
        }
    }
    return (
        <>
            <Box sx={headerStyle}>
                <Typography id="delete-modal-title" variant="h6" component="h2">
                    Update Confirmation
                </Typography>
            </Box>
            <Typography id="delete-modal-description" sx={{ p: 2 }}>
                Are you sure you want to update this item?
            </Typography>
            <Divider />
            <form onSubmit={handleSubmit}>
                <Box sx={footerStyle}>
                    <Button variant="outlined" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="warning" type='submit'>
                        Update
                    </Button>
                </Box>
            </form>
        </>
    )
}

export default SelectedUpdate