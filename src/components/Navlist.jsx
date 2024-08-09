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
import LayersIcon from '@mui/icons-material/Layers';
import { PanTool } from '@mui/icons-material';

function Navlist({ setopen }) {
  let location = useLocation();
  const userRole = ('admin');
  return (
    <React.Fragment>
      {location.pathname == '/' && (
        <NavLanding setopen={setopen} />
      )}
      {userRole == 'admin' && (
        <NavAdmin/>
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
      <ListItemButton component={Link} to={'/events'} selected={location.pathname.startsWith('/events')}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Events" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <PanTool />
        </ListItemIcon>
        <ListItemText primary="Attendance" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Payment" />
      </ListItemButton>
    </React.Fragment>
  )
}

export default Navlist;
