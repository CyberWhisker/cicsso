// Example of correct usage
import { MenuItem, Typography } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';

function Navlist({ setopen }) {
  let location = useLocation();
  console.log(location.pathname);

  return (
    <React.Fragment>
      <NavLanding setopen={setopen} />
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

export default Navlist;
