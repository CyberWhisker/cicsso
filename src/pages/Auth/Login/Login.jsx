import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import MasterAuth from '../../../layouts/MasterAuth';
import LoginForm from './Form/LoginForm';

export default function Login() {

  return (
    <MasterAuth>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <LoginForm/>
    </MasterAuth>
  );
}