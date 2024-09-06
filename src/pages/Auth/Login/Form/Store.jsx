import { Button, Divider, Stack, TextField } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function Store() {
  return (
    <form>
        <Stack spacing={2}>
            <TextField label='Enter Email'/>
            <TextField label='Enter Password'/>
            <Button variant='contained'>Login</Button>
            <Button variant='outlined' component={Link} to='/register'>Register</Button>
        </Stack>
    </form>
  )
}

export default Store