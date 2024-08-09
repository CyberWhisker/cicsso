import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';
import { FormComponent } from '../../../../components';

function RegisterForm() {
    const initialFormData = {
      firstname: '',
      lastname: '',
      mobile: '',
      email: '',
      password: '',
      confirm_password: '',
  };

  const [formData, setFormData] = useState(initialFormData);

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
    <Box sx={{width: '100%'}}>
      <FormComponent formData={formData} setFormData={setFormData} onSubmit={handleSubmit}/>
    </Box>
  )
}

export default RegisterForm