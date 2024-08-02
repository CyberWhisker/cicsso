import React from 'react';
import Hero from './Section/Hero/Hero';
import { Box } from '@mui/material';
import Footer from './Section/Footer/Footer';
import Procedure from './Section/Procedure/Procedure';
import Attendance from './Section/Attendance/Attendance';
import Payment from './Section/Payment/Payment';
import Clearance from './Section/Clearance/Clearance';
import Master from '../../layouts/Master';

function Landing() {
  return (
    <Master>
        <Box 
        sx={{
          pt: { xs: 10, sm: 20 },
        }}
        >
          <Hero />
        </Box>
        <Box 
        sx={{
          pt: { xs: 5, sm: 11 },
        }}
        >
          <Procedure/>
        </Box>
        <Box 
        id="attendance"
        sx={{
          pt: { xs: 5, sm: 11 },
        }}
        >
          <Attendance/>
        </Box>
        <Box 
        id="payment"
        sx={{
          pt: { xs: 5, sm: 11 },
        }}
        >
          <Payment/>
        </Box>
        <Box 
        id="clearance"
        sx={{
          pt: { xs: 5, sm: 11 },
        }}
        >
          <Clearance/>
        </Box>
        <Footer/>
    </Master>
  );
}

export default Landing;
