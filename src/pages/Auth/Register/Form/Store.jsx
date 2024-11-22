import React, { useState } from 'react';
import { Button, Divider, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSignup } from '../../../../hooks/useSignUp';

function Store() {
  // State to hold form values
  const { signup, error, loading } = useSignup()
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    extensionName: '',
    studentId: '',
    program: '',
    type: '',
    year: '',
    section: '',
    email: '',
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
    const { firstName, lastName, middleName, program, email, year, studentId, type, section, password, confirmPassword } = formData;
    const newErrors = {};

    // Basic validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Valid email is required';
    if (!firstName) newErrors.firstName = 'First Name is required';
    if (!lastName) newErrors.lastName = 'Last Name is required';
    if (!middleName) newErrors.middleName = 'Middle Name is required';
    if (!program) newErrors.program = 'Program is required';
    if (!year) newErrors.year = 'Year is required';
    if (!section) newErrors.section = 'Section is required';
    if (!studentId) newErrors.studentId = 'Student Id is required';
    if (!type) newErrors.type = 'Type is required';
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
        <Typography fontWeight={'bold'}>User Information</Typography>
        <TextField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          error={Boolean(errors.firstName)}
          helperText={errors.firstName}
        />
        <TextField
          label="Middle Name"
          name="middleName"
          value={formData.middleName}
          onChange={handleChange}
          error={Boolean(errors.middleName)}
          helperText={errors.middleName}
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          error={Boolean(errors.lastName)}
          helperText={errors.lastName}
        />
        <TextField
          label="Extension Name (Optional)"
          name="extensionName"
          value={formData.extensionName}
          onChange={handleChange}
        />
        <Divider />
        <Typography fontWeight={'bold'}>Student Information</Typography>
        <TextField
          label="Student ID"
          name="studentId"
          value={formData.studentId}
          onChange={handleChange}
          error={Boolean(errors.studentId)}
          helperText={errors.studentId}
        />
        <TextField
          select
          label="Select Program"
          name="program"
          value={formData.program}
          onChange={handleChange}
          error={Boolean(errors.program)}
          helperText={errors.program}
        >
          <MenuItem value='BS Information Technology'>BS Information Technology</MenuItem>
          <MenuItem value='BS Information System'>BS Information System</MenuItem>
        </TextField>
        <TextField
          select
          name="type"
          label="Type"
          value={formData.type}
          onChange={handleChange}
          error={Boolean(errors.type)}
          helperText={errors.type}
        >
          <MenuItem value="Regular">Regular</MenuItem>
          <MenuItem value="Irregular">Irregular</MenuItem>
        </TextField>
        <TextField
          select
          name="year"
          label="Select Year"
          value={formData.year}
          onChange={handleChange}
          error={Boolean(errors.year)}
          helperText={errors.year}
        >
          <MenuItem value="1st">1st</MenuItem>
          <MenuItem value="2nd">2nd</MenuItem>
          <MenuItem value="3rd">3rd</MenuItem>
          <MenuItem value="4th">4th</MenuItem>
        </TextField>
        <TextField
          select
          label="Select Section"
          name="section"
          value={formData.section}
          onChange={handleChange}
          error={Boolean(errors.section)}
          helperText={errors.section}
        >
          <MenuItem value="A">A</MenuItem>
          <MenuItem value="B">B</MenuItem>
          <MenuItem value="C">C</MenuItem>
          <MenuItem value="D">D</MenuItem>
          <MenuItem value="E">E</MenuItem>
          <MenuItem value="F">F</MenuItem>
        </TextField>
        <Divider />
        <Typography fontWeight={'bold'}>Account Information</Typography>
        <TextField
          label="Enter Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={Boolean(errors.email)}
          helperText={errors.email}
        />
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
