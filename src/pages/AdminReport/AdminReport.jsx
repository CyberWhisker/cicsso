import React from 'react'
import Master from '../../layouts/Master';
import { Divider, Stack, Typography } from '@mui/material';

function AdminReport() {
  return (
    <Master>
        <Stack spacing={1}>
            <Typography variant='h4' fontWeight={'bold'}>Reports</Typography>
            <Divider/>
            
        </Stack>
    </Master>
  )
}

export default AdminReport