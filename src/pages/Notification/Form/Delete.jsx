import React from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import { toast } from 'react-toastify';
import { deleteNotification } from '../../../api/NotificationApi';

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

function Delete({selected, onClose, handleGetData}) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {data, error} = await deleteNotification(selected);
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
          Delete Confirmation
        </Typography>
      </Box>
      <Typography id="delete-modal-description" sx={{ p:2}}>
        Are you sure you want to delete this item? This action cannot be undone.
      </Typography>
      <Divider/>
      <form onSubmit={handleSubmit}>
        <Box sx={footerStyle}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="error" type='submit'>
            Delete
          </Button>
        </Box>
      </form>
    </>
  )
}

export default Delete