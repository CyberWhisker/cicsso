import React, { useState } from 'react'
import PropTypes from 'prop-types';
import ToggleColorMode from './ToggleColorMode';
import { Box, Toolbar, Typography, AppBar, Container, Button, Tooltip, IconButton, Menu, Drawer, MenuItem } from '@mui/material';
import { AccountCircle, List } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Logo from '/appImg/Logo.png'

function StickyNav({ mode, toggleColorMode }) {
    const [open, setOpen] = useState(false);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    }

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    
    const navigate = useNavigate();

    const scrollToSection = (sectionId) => {
        const sectionElement = document.getElementById(sectionId);
        const offset = 128;
        if (sectionElement) {
          const targetScroll = sectionElement.offsetTop - offset;
          sectionElement.scrollIntoView({ behavior: 'smooth' });
          window.scrollTo({
            top: targetScroll,
            behavior: 'smooth',
          });
          setOpen(false);
        }
      };
  return (
    <Box>
        <AppBar
        position="fixed"
        sx={{
            boxShadow: 0,
            bgcolor: 'transparent',
            backgroundImage: 'none',
            mt: 2,
            zIndex: 40
        }}
        >
        <Container maxWidth="lg">
            <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              borderRadius: '999px',
              bgcolor:
                theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.4)'
                  : 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(24px)',
              maxHeight: 40,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow:
                theme.palette.mode === 'light'
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
            })}
            >
                <Box 
                sx={{
                    display: 'flex',
                    alignItems: 'center'
                }}
                >
                    <img
                    className='ml-5'
                        src={Logo}
                        style={{
                            height: 40,
                            borderRadius: '50%'
                        }}
                        alt="logo of sitemark"
                    />
                    <Button href='/' sx={{fontSize: 21, fontWeight: 'bold'}}>
                    CICSSO
                    </Button>
                    <Box ml={5}>
                        <NavItem display={'flex'}/>
                    </Box>
                </Box>
                <Box
                sx={{
                    display: { xs: 'none', md: 'flex' },
                    gap: 0.5,
                    alignItems: 'center',
                }}
                >
                    <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                    {true && (
                        <>
                        <Button
                            color="primary"
                            variant="text"
                            size="small"
                            component="a"
                            href="/login"
                        >
                            Sign in
                        </Button>
                        <Button
                            color="primary"
                            variant="contained"
                            size="small"
                            component="a"
                            href="/register"
                        >
                            Sign up
                        </Button>
                        </>
                    )}
                    {false && (
                    <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <AccountCircle/>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '27px'}}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        <Box flexDirection="row">
                        <Button href='/profile'sx={{width: 100}}>
                            <Typography textAlign="center">Profile</Typography>
                        </Button>
                        <Button href='/login'>
                            <Typography textAlign="center" color='error'>Logout</Typography>
                        </Button>
                        </Box>
                    </Menu>
                    </Box>
                    )}
                </Box>
                <Box sx={{ display: { sm: '', md: 'none' } }}>
                    
                    <Button
                        variant="text"
                        color="primary"
                        aria-label="menu"
                        onClick={toggleDrawer(true)}
                        sx={{ minWidth: '30px', p: '4px' }}
                    >
                        <List />
                    </Button>
                    <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                        <Box
                        sx={{
                            minWidth: '60dvw',
                            p: 2,
                            backgroundColor: 'background.paper',
                            flexGrow: 1,
                        }}
                        >
                            <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end'
                            }}
                            >
                                <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                            </Box>
                            <NavItem />
                        </Box>
                    </Drawer>
                </Box>
            </Toolbar>
        </Container>
        </AppBar>
    </Box>
  )
}

function NavItem(props) {
    return(
        <Box sx={{
            display: props.display
        }}>
            <MenuItem onClick={() => console.log('Test')}>
                <Typography color="text.primary">F</Typography>
            </MenuItem>
            <MenuItem onClick={() => console.log('Test')}>
                <Typography color="text.primary">TEST</Typography>
            </MenuItem>
            <MenuItem onClick={() => console.log('Test')}>
                <Typography color="text.primary">TEST</Typography>
            </MenuItem>
            <MenuItem onClick={() => console.log('Test')}>
                <Typography color="text.primary">TEST</Typography>
            </MenuItem>
        </Box>
    )
}

NavItem.propTypes = {
    display: PropTypes.string.isRequired, // Adjust the prop type as per your requirement
};

StickyNav.propTypes = {
    mode: PropTypes.oneOf(['dark', 'light']).isRequired,
    toggleColorMode: PropTypes.func.isRequired,
};

export default StickyNav