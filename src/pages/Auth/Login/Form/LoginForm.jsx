import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';
import { FormComponent } from '../../../../components';

const SampleData = [
  {
    email: 'user@gmail.com',
    password: '1234',
    type: 'user'
  },
  {
    email: 'admin@gmail.com',
    password: '1234',
    type: 'admin'
  },
  {
    email: 'vet@gmail.com',
    password: '1234',
    type: 'vet'
  },
  {
    email: 'shelter@gmail.com',
    password: '1234',
    type: 'shelter'
  },
];

function LoginForm() {
  const initialFormData = {
    email: '',
    password: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = (data, setSubmitted) => {
    const {email, password} = data
    if (!email || !password) {
      setSubmitted(true);
      toast.error('Please fill out all fields');
      return;
    }
    // setFormData(initialFormData);
    toast.success('Registration successful');
  }
  

  return (
    <Box width={'100%'} mt={2}>
      <FormComponent formData={formData} setFormData={setFormData} onSubmit={handleSubmit}/>
    </Box>
  )
}

export default LoginForm