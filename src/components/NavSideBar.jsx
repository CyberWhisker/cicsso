import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { styled} from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Navlist from './Navlist';
import Logo from '/appImg/Logo.png'
import { ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        }),
      },
    }),
);

function NavSideBar({children}) {
  const [open, setOpen] = React.useState(localStorage.getItem('sideMode') === 'true' ? true : false);

  const toggleDrawer = () => {
    setOpen(!open);
    localStorage.setItem('sideMode', !open);
  };
  const rotate = !open ? 'rotate(180deg)' : 'rotate(0deg)';
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh'}}>
      <CssBaseline />
      <Drawer variant="permanent" open={open} sx={{display: {xs: 'none', md: 'block'}}}>
        <List component="nav">
          <ListItemButton onClick={toggleDrawer}>
            <ListItemIcon>
              <img src={Logo} alt="Logo" style={{height: '5.6vh', borderRadius: '100%'}}/>
            </ListItemIcon>
            <ListItemText primary="CICSSO" />
            <ChevronLeft/>
          </ListItemButton>
          <Divider />
          <Navlist/>
        </List>
      </Drawer>
      <Box sx={{width: "100%"}}>
          {children}
      </Box>
    </Box>
  )
}

export default NavSideBar