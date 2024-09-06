import React, { useState } from 'react';
import { Button, Stack, TextField, } from '@mui/material';
import { Link } from 'react-router-dom';

function Store() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validateEmail = (email) => {
    // Basic email validation regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    let hasErrors = false;
    const newErrors = { email: '', password: '' };

    if (!email) {
      newErrors.email = 'Email is required';
      hasErrors = true;
    } else if (!validateEmail(email)) {
      newErrors.email = 'Invalid email format';
      hasErrors = true;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      hasErrors = true;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
    } else {
      // Handle successful validation (e.g., submit the form)
      console.log('Form submitted with:', { email, password });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
        label='Enter Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        helperText={errors.email}
        error={!!errors.email}
        />
        
        <TextField
        label='Enter Password'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        helperText={errors.password}
        error={!!errors.password}
        />
        
        <Button variant='contained' type='submit'>Login</Button>
        <Button variant='outlined' component={Link} to='/register'>Register</Button>
      </Stack>
    </form>
  );
}

export default Store;
