import { Button} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLogout } from '../hooks/useLogout';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

function AuthButton() {
  const {auth} = useAuthContext();
  const { logout } = useLogout()
  const handleLogout = () => {
    logout()
  }
  return (
    <React.Fragment>
      {!auth &&
        <Button
        variant='contained'
        size='small'
        component={Link}
        to='/login'>
          Log In
        </Button>
      }
      {auth && 
        <Button
        variant='contained'
        color='error'
        size='small'
        onClick={() => handleLogout()}>
          Log Out
        </Button>
      }
    </React.Fragment>
  )
}


export default AuthButton