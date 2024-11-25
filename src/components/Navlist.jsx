// Example of correct usage
import { Divider, MenuItem, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import { AttachMoney, CreditCard, Folder, GetAppRounded, List, Message, Notifications, PanTool, Settings, WarningAmber, WavingHand } from '@mui/icons-material';
import { useAuthContext } from '../hooks/useAuthContext';
import { CalendarIcon } from '@mui/x-date-pickers';
import { AuthContext } from '../context/AuthContext';

function Navlist({ setopen }) {
  let location = useLocation();
  const { auth } = useAuthContext()
  return (
    <React.Fragment>
      {location.pathname == '/' && (
        <NavLanding setopen={setopen} />
      )}
      {(auth && auth.user.role != 'user' && location.pathname != '/') && (
        <NavAdmin />
      )}
      {(auth && auth.user.role == 'user' && location.pathname != '/') && (
        <NavUser />
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
  const {auth} = useContext(AuthContext)
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

      <Divider />

      <ListItemButton component={Link} to={'/events'} selected={location.pathname.startsWith('/events')}>
        <ListItemIcon>
          <List />
        </ListItemIcon>
        <ListItemText primary="Attendance" />
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

      <Divider />

      <ListItemButton component={Link} to={'/report'} selected={location.pathname.startsWith('/report')}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItemButton>

      <ListItemButton component={Link} to={'/notification'} selected={location.pathname.startsWith('/notification')}>
        <ListItemIcon>
          <Message />
        </ListItemIcon>
        <ListItemText primary="Notification" />
      </ListItemButton>

      <Divider />
      {auth.user.role == "superAdmin" && (
        <ListItemButton component={Link} to={'/schoolYear'} selected={location.pathname.startsWith('/schoolYear')}>
          <ListItemIcon>
            <CalendarIcon />
          </ListItemIcon>
          <ListItemText primary="School Year" />
        </ListItemButton>
      )}

      <ListItemButton component={Link} to={'/signatories'} selected={location.pathname.startsWith('/signatories')}>
        <ListItemIcon>
          <Settings />
        </ListItemIcon>
        <ListItemText primary="Signatories" />
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

      <ListItemButton component={Link} to={'/userClearance'} selected={location.pathname.startsWith('/userClearance')}>
        <ListItemIcon>
          <GetAppRounded />
        </ListItemIcon>
        <ListItemText primary="Clearance" />
      </ListItemButton>

      <ListItemButton component={Link} to={'/transaction'} selected={location.pathname.startsWith('/transaction')}>
        <ListItemIcon>
          <CreditCard />
        </ListItemIcon>
        <ListItemText primary="Transaction" />
      </ListItemButton>

      <ListItemButton component={Link} to={'/notification'} selected={location.pathname.startsWith('/notification')}>
        <ListItemIcon>
          <Message />
        </ListItemIcon>
        <ListItemText primary="Notification" />
      </ListItemButton>

    </React.Fragment>
  )
}

export default Navlist;
