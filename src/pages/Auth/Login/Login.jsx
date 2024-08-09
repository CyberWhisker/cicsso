import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import MasterAuth from '../../../layouts/MasterAuth';
import LoginForm from './Form/LoginForm';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';

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
      <Grid container justifyContent="flex-end" mt={2}>
        <Grid item>
          <Typography component={Link} color={'primary'} to={'/register'}>
            I don't have an account
          </Typography>
        </Grid>
      </Grid>
      <Copyright sx={{ mt: 2 }} />
    </MasterAuth>
  );
}



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Typography component={Link} to={'/'} color="primary">
        Your Website
      </Typography>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}