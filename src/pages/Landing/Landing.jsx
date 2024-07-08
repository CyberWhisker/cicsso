import React from 'react';
import Master from '../../layouts/Master';
import Hero from './Section/Hero/Hero';
import { Box, Divider } from '@mui/material';
import Footer from './Section/Footer/Footer';

function Landing() {
  return (
    <>
      <Master>
        <Box
          sx={{
            pt: { xs: 14, sm: 20 },
          }}
        >
          <Box sx={{ flex: '1 0 auto' }}> {/* This box will push footer to bottom */}
            <Hero />
          </Box>
        </Box>
      </Master>
    </>
  );
}

export default Landing;
