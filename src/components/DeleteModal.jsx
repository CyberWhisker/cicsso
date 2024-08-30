import React from 'react';
import { Box, Modal, Typography, Button, Divider } from '@mui/material';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',  // White background
    borderRadius: 1,
    boxShadow: 24,
};

const headerStyle = {
    p: 2,
    backgroundColor: (theme) => theme.palette.error.main,  // Error color for header
    color: 'white',
    borderRadius: '4px 4px 0 0',  // Rounded corners for the top
};

const footerStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 1,
    p: 2
};

function DeleteModal({ open, onClose }) {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="delete-modal-title"
            aria-describedby="delete-modal-description"
        >
            <Box sx={modalStyle}>
                <Box sx={headerStyle}>
                    <Typography id="delete-modal-title" variant="h6" component="h2">
                        Delete Confirmation
                    </Typography>
                </Box>
                <Typography id="delete-modal-description" sx={{ p:2}}>
                    Are you sure you want to delete this item? This action cannot be undone.
                </Typography>
                <Divider/>
                <Box sx={footerStyle}>
                    <Button variant="outlined" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="error" onClick={onClose}>
                        Delete
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default DeleteModal;
