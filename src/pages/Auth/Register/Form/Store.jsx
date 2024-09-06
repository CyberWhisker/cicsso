import { Button, Divider, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function Store() {
  return (
    <form>
        <Stack spacing={2}>
            <TextField label='Enter Email'/>
            <TextField label='Name'/>
            <TextField select label='Year'>
              <MenuItem>1st Year</MenuItem>
              <MenuItem>2nd Year</MenuItem>
              <MenuItem>3rd Year</MenuItem>
              <MenuItem>4th Year</MenuItem>
            </TextField>
            <TextField select label='Section'>
              <MenuItem>A</MenuItem>
              <MenuItem>B</MenuItem>
              <MenuItem>C</MenuItem>
              <MenuItem>D</MenuItem>
            </TextField>
            <TextField label='Enter Password'/>
            <TextField label='Confirm Password'/>
            <Button variant='contained'>Submit</Button>
            <Typography variant='outlined' color='primary' component={Link} to='/login' textAlign='center' sx={{textDecoration: 'none'}}>I Already Have an Account</Typography>
        </Stack>
    </form>
  )
}

export default Store