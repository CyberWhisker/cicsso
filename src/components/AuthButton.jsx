import { Button } from '@mui/material'
import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";

function AuthButton() {
  const {loginWithRedirect, logout, user, isLoading} = useAuth0();
  return (
    <React.Fragment>
      {!isLoading && !user && (
        <Button
        variant='contained'
        size='small'
        onClick={() => loginWithRedirect()}>
          Log In
        </Button>
      )}
      {!isLoading && user && (
        <Button
        variant='contained'
        color='error'
        size='small'
        onClick={() => logout()}>
          Log Out
        </Button>
      )}
    </React.Fragment>
  )
}


export default AuthButton