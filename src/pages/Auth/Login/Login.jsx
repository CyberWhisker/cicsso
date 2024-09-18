import React from 'react'
import MasterAuth from '../../../layouts/MasterAuth'
import { Avatar, Box, Card, Container, Divider, Stack, Typography } from '@mui/material'
import LoginForm from './Form/LoginForm'
import Logo from '/appImg/Logo.png';

function Login() {
  return (
    <MasterAuth>
      <Box sx={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Card sx={{p:2, minWidth: {xs: '50vh', md: '60vh'}}} elevation={5}>
          <Stack spacing={1}>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
              <Avatar src={Logo} sx={{height: '20vh', width: '20vh'}}/>
            </Box>
            <Typography fontWeight={'bold'} variant='h4'>Login</Typography>
            <Divider/>
            <LoginForm/>
          </Stack>
        </Card>
      </Box>
    </MasterAuth>
  )
}

export default Login