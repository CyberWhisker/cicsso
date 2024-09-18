import React from 'react'
import MasterAuth from '../../../layouts/MasterAuth'
import { Box, Card, Divider, Stack, Typography } from '@mui/material'
import Store from './Form/Store'

function Register() {
  return (
    <MasterAuth>
      <Box sx={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Card sx={{p:2, minWidth: {xs: '50vh', md: '60vh'}}} elevation={5}>
          <Stack spacing={1}>
            <Typography fontWeight={'bold'} variant='h4'>Register</Typography>
            <Divider/>
            <Store/>
          </Stack>
        </Card>
      </Box>
    </MasterAuth>
  )
}

export default Register