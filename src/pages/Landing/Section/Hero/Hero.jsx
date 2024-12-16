import { Box, Stack, Typography, Button } from '@mui/material';
import React from 'react';
import Logo from '/appImg/Logo.png';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" spacing={4}>
        <Box sx={{ textAlign: { xs: 'center', sm: 'left' }, width: '100%' }}>
          <Stack direction="row" alignItems="center">
            <Typography variant="h1" fontWeight="bold">
              CICS{'\u00A0'}
            </Typography>
            <Box
              sx={{
                display: { xs: 'none', sm: 'flex' },
                flexDirection: 'column'
              }}
            >
              <Typography component="span" fontWeight="bold" variant="h4" color="primary.main">
                Student{' '}
              </Typography>
              <Typography fontWeight="bold" variant="h4" color="primary.main">
                Organization
              </Typography>
            </Box>
            <Typography
              variant="h1"
              fontWeight="bold"
              color="primary.main"
              sx={{ display: { xs: 'flex', sm: 'none' } }}
            >
              SO
            </Typography>
          </Stack>
          <Typography variant="h6" sx={{ mt: 2, textAlign: 'center' }}>
            The College of Information and Computing Sciences (CICS) student organization at Marinduque State University is responsible for organizing and managing all major events within the department. The organization plays a key role in fostering collaboration among students while promoting the development of technical skills. Whether coordinating workshops, seminars, or social gatherings, CICS ensures that IT and IS students have opportunities to engage, learn, and grow in both their academic and professional pursuits.
          </Typography>
          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              // width: 200,
              height: 50,
              fontWeight: 'bold',
              fontSize: 20,
            }}
            component={Link}
            to='/dashboard'
          >
            Get Started
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            order: { xs: -1, sm: 1 }, // Change order to stack on large screens
            mt: { xs: 4, sm: 0 }, // Add margin on top for spacing on small screens
          }}
        >
          <img
            src={Logo}
            alt="Logo"
            style={{
              width: '80%',
              height: 'auto',
              borderRadius: '50%',
            }}
          />
        </Box>
      </Stack>
    </Box>
  );
}

export default Hero;
