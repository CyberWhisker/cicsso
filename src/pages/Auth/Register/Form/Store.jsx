import React, { useState } from 'react';
import { Button, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSignup } from '../../../../hooks/useSignUp';

function Store() {
  // State to hold form values
  const {signup, error, loading} = useSignup()
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    year: '',
    section: '',
    password: '',
    confirmPassword: ''
  });

  // State to hold validation errors
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, name, year, section, password, confirmPassword } = formData;
    const newErrors = {};

    // Basic validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Valid email is required';
    if (!name) newErrors.name = 'Name is required';
    if (!year) newErrors.year = 'Year is required';
    if (!section) newErrors.section = 'Section is required';
    if (!password || password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // Handle successful form submission
      signup(formData)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          label="Enter Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={Boolean(errors.email)}
          helperText={errors.email}
        />
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={Boolean(errors.name)}
          helperText={errors.name}
        />
        <Select
          name="year"
          value={formData.year}
          onChange={handleChange}
          displayEmpty
          error={Boolean(errors.year)}
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
          name="section"
          value={formData.section}
          onChange={handleChange}
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
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={Boolean(errors.password)}
          helperText={errors.password}
        />
        <TextField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={Boolean(errors.confirmPassword)}
          helperText={errors.confirmPassword}
        />
        {error && <Typography color={'error'} textAlign={'center'}>{error}</Typography>}
        <Button type="submit" variant="contained" disabled={loading}>Submit</Button>
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
