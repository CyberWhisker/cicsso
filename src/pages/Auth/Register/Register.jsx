import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import MasterAuth from '../../../layouts/MasterAuth';
import RegisterForm from './Form/RegisterForm';

export default function Register() {

  return (
    <MasterAuth>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Register
      </Typography>
      <RegisterForm/>
    </MasterAuth>
  );
}