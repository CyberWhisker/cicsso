import React from 'react'
import MasterAuth from '../../../layouts/MasterAuth'
import { Avatar, Box, Card, Divider, Stack, Typography } from '@mui/material'
import Store from './Form/Store'
import Logo from '/appImg/Logo.png';

function Login() {
  return (
    <MasterAuth>
      <Box sx={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Card sx={{p:2, minWidth: '40vh'}} elevation={5}>
          <Stack spacing={1}>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
              <Avatar src={Logo} sx={{height: '20vh', width: '20vh'}}/>
            </Box>
            <Typography fontWeight={'bold'} variant='h4'>Login</Typography>
            <Divider/>
            <Store/>
          </Stack>
        </Card>
      </Box>
    </MasterAuth>
  )
}

export default Login