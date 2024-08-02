import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function ToggleAuth() {
  return (
    <React.Fragment>
        <Button variant='outlined' component={Link} to='/register'>Register</Button>
        <Button variant='contained' component={Link} to='/login'>Login</Button>
    </React.Fragment>
  )
}

export default ToggleAuth