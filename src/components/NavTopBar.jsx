import { AppBar, Box, Container, Stack, Typography } from '@mui/material'
import React from 'react'
import ToggleColorMode from './ToggleColorMode'
import Logo from '/appImg/Logo.png'
import Navlist from './Navlist'
import { useLocation } from 'react-router-dom'
import AppDrawer from './AppDrawer'
import AuthButton from './AuthButton'
import Notification from './Notification'

function NavTopBar({toggleColorMode, themeMode}) {
  const location = useLocation();
  return (
    <AppBar
    sx={{
      padding: 2,
      backgroundColor: themeMode == 'light' ? '#9ad29c' : '#111936ff',
      position: location.pathname == '/' ? 'fixed' : 'relative',
    }}
    >
      <Container
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
      }}
      >
        <Box sx={{display: "flex", alignItems: 'center', gap: 1}}>
          {location.pathname == '/' && (
            <Stack direction="row" sx={{display: {xs: 'none', md: 'flex'}, alignItems: 'center', gap: 1}}>
              <img src={Logo} alt="Logo" style={{height: '6vh', borderRadius: '100%'}}/>
              <Typography variant='h5' color="primary" fontWeight="bold">CICSSO</Typography>
              <Navlist/>
            </Stack>
          )}
        </Box>
        <Box sx={{display: {xs: 'none', md: 'flex'}, gap: 2, alignItems: 'center'}}>
            <AuthButton/>
            <ToggleColorMode themeMode={themeMode} toggleColorMode={toggleColorMode} />
            <Notification/>
        </Box>
        <Box sx={{display: {xs: 'block', md: 'none'}, gap: 2, alignItems: 'center'}}>
          <AppDrawer themeMode={themeMode} toggleColorMode={toggleColorMode} />
        </Box>
      </Container>
    </AppBar>
  )
}



export default NavTopBar