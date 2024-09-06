import React, { useState } from 'react';
import { Button, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function Store() {
  // State to hold form values
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [section, setSection] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // State to hold validation errors
  const [errors, setErrors] = useState({
    email: '',
    name: '',
    year: '',
    section: '',
    password: '',
    confirmPassword: ''
  });

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Basic validation
    const newErrors = {
      email: '',
      name: '',
      year: '',
      section: '',
      password: '',
      confirmPassword: ''
    };
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!name) {
      newErrors.name = 'Name is required';
    }

    if (!year) {
      newErrors.year = 'Year is required';
    }

    if (!section) {
      newErrors.section = 'Section is required';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (Object.values(newErrors).some(error => error)) {
      setErrors(newErrors);
      return;
    }

    // Handle successful form submission here (e.g., send data to server)
    console.log('Form submitted successfully!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          label="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={Boolean(errors.email)}
          helperText={errors.email}
        />
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={Boolean(errors.name)}
          helperText={errors.name}
        />
        <Select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          displayEmpty
          inputProps={{ 'aria-label': 'Year' }}
          error={Boolean(errors.year)}
          helperText={errors.year}
        >
          <MenuItem value="" disabled>Select Year</MenuItem>
          <MenuItem value="1st Year">1st Year</MenuItem>
          <MenuItem value="2nd Year">2nd Year</MenuItem>
          <MenuItem value="3rd Year">3rd Year</MenuItem>
          <MenuItem value="4th Year">4th Year</MenuItem>
        </Select>
        <TextField
          select
          label="Section"
          value={section}
          onChange={(e) => setSection(e.target.value)}
          displayEmpty
          inputProps={{ 'aria-label': 'Section' }}
          error={Boolean(errors.section)}
          helperText={errors.section}
        >
          <MenuItem value="" disabled>Select Section</MenuItem>
          <MenuItem value="A">A</MenuItem>
          <MenuItem value="B">B</MenuItem>
          <MenuItem value="C">C</MenuItem>
          <MenuItem value="D">D</MenuItem>
        </TextField>
        <TextField
          label="Enter Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={Boolean(errors.password)}
          helperText={errors.password}
        />
        <TextField
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={Boolean(errors.confirmPassword)}
          helperText={errors.confirmPassword}
        />
        <Button type="submit" variant="contained">Submit</Button>
        <Typography
          variant="body2"
          color="primary"
          component={Link}
          to="/login"
          textAlign="center"
          sx={{ textDecoration: 'none' }}
        >
          I Already Have an Account
        </Typography>
      </Stack>
    </form>
  );
}

export default Store;
