import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { styled} from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Navlist from './Navlist';

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
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const rotate = !open ? 'rotate(180deg)' : 'rotate(0deg)';
    return (
        <Box sx={{ display: 'flex', minHeight: '100vh'}}>
          <CssBaseline />
          <Drawer variant="permanent" open={open} sx={{display: {xs: 'none', md: 'block'}}}>
            <Toolbar
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
            }}
            >
            <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon sx={{ transition: 'transform 0.3s', transform: rotate, height: 55 }} />
            </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
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