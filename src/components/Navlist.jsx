// Example of correct usage
import { MenuItem, Typography } from '@mui/material';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import { AttachMoney, CreditCard, Folder, GetAppRounded, List, Notifications, PanTool, WarningAmber, WavingHand } from '@mui/icons-material';
import { useAuthContext } from '../hooks/useAuthContext';

function Navlist({ setopen }) {
  let location = useLocation();
  const {auth} = useAuthContext()
  return (
    <React.Fragment>
      {location.pathname == '/' && (
        <NavLanding setopen={setopen} />
      )}
      {(auth && auth.user.role == 'admin' && location.pathname != '/') && (
        <NavAdmin/>
      )}
      {(auth && auth.user.role  == 'user' && location.pathname != '/') && (
        <NavUser/>
      )}
    </React.Fragment>
  );
}

function NavLanding({ setopen }) {
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
    }
    setopen(false);
  };

  return (
    <React.Fragment>
      <MenuItem onClick={() => scrollToSection('attendance')}>
        <Typography color="primary.main">Attendance</Typography>
      </MenuItem>
      <MenuItem onClick={() => scrollToSection('payment')}>
        <Typography color="primary.main">Payment</Typography>
      </MenuItem>
      <MenuItem onClick={() => scrollToSection('clearance')}>
        <Typography color="primary.main">Clearance</Typography>
      </MenuItem>
    </React.Fragment>
  );
}

function NavAdmin() {
  const location = useLocation();
  return (
    <React.Fragment>
      <ListItemButton component={Link} to={'/dashboard'} selected={location.pathname == '/dashboard'}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>

      <ListItemButton component={Link} to={'/users'} selected={location.pathname.startsWith('/users')}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItemButton>

      <ListItemButton component={Link} to={'/events'} selected={location.pathname.startsWith('/events')}>
        <ListItemIcon>
          <List />
        </ListItemIcon>
        <ListItemText primary="Events" />
      </ListItemButton>
      
      <ListItemButton component={Link} to={'/penalties'} selected={location.pathname.startsWith('/penalties')}>
        <ListItemIcon>
          <WarningAmber />
        </ListItemIcon>
        <ListItemText primary="Penalties" />
      </ListItemButton>

      <ListItemButton component={Link} to={'/projects'} selected={location.pathname.startsWith('/projects')}>
        <ListItemIcon>
          <Folder />
        </ListItemIcon>
        <ListItemText primary="Projects" />
      </ListItemButton>

      <ListItemButton component={Link} to={'/collection'} selected={location.pathname.startsWith('/collection')}>
        <ListItemIcon>
          <AttachMoney />
        </ListItemIcon>
        <ListItemText primary="Collection" />
      </ListItemButton>

      <ListItemButton component={Link} to={'/clearance'} selected={location.pathname.startsWith('/clearance')}>
        <ListItemIcon>
          <GetAppRounded />
        </ListItemIcon>
        <ListItemText primary="Clearance" />
      </ListItemButton>

      <ListItemButton component={Link} to={'/report'} selected={location.pathname.startsWith('/report')}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItemButton>
    </React.Fragment>

    
  )
}

function NavUser() {
  const location = useLocation();
  return (
    <React.Fragment>
      <ListItemButton component={Link} to={'/dashboard'} selected={location.pathname == '/dashboard'}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>

      <ListItemButton component={Link} to={'/attendance'} selected={location.pathname.startsWith('/attendance')}>
        <ListItemIcon>
          <WavingHand />
        </ListItemIcon>
        <ListItemText primary="Attendance" />
      </ListItemButton>

      <ListItemButton component={Link} to={'/collection'} selected={location.pathname.startsWith('/collection')}>
        <ListItemIcon>
          <AttachMoney />
        </ListItemIcon>
        <ListItemText primary="Collection" />
      </ListItemButton>

      <ListItemButton component={Link} to={'/transaction'} selected={location.pathname.startsWith('/transaction')}>
        <ListItemIcon>
          <CreditCard />
        </ListItemIcon>
        <ListItemText primary="Transaction" />
      </ListItemButton>

    </React.Fragment>
  )
}

export default Navlist;
