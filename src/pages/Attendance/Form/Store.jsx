import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Form } from 'react-router-dom'
import { FormComponent } from '../../../components';
import { toast } from 'react-toastify';

function Store() {

    const initializeFormData = {
        event: '',
        dateStart: '',
        dateEnd: '',
    }

    const [formData, setFormData] = useState(initializeFormData);

    const handleSubmit = (data, setSubmitted) => {
        const { firstname, lastname, mobile, email, password, confirm_password } = data;
        
        if (!firstname || !lastname || !mobile || !email || !password || !confirm_password) {
            setSubmitted(true);
            toast.error('Please fill out all fields');
            return;
        }
    
        if (password !== confirm_password) {
            setSubmitted(true);
            toast.error('Passwords do not match');
            return;
        }
    
        // Handle form submission...
    
        // Clear form data after submission
        setFormData(initialFormData);
    
        toast.success('Registration successful');
      };
    return (
        <Box sx={{width: '60vh', p:2}}>
            <Typography variant='h4' fontWeight={'bold'}>Add Event</Typography>
            <Box mt={2}>
                <FormComponent formData={formData} setFormData={setFormData} onSubmit={handleSubmit}/>
            </Box>
        </Box>
    )
}

export default Store