import { Box, Stack, Typography, Button } from '@mui/material';
import React from 'react';
import Logo from '/appImg/Logo.png';

function Hero() {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" spacing={4}>
      <Box sx={{ textAlign: {xs: 'center', sm: 'left'}, width: '100%' }}>
        <Stack direction="row" alignItems="center" spacing={2}>
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
        <Typography variant="h6" sx={{ mt: 2 }}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque similique corporis
          exercitationem suscipit, odit rerum inventore architecto aspernatur aliquam alias
          possimus adipisci, repellendus veritatis, nemo necessitatibus aut dolores corrupti
          eligendi!
        </Typography>
        <Button
          variant="contained"
          sx={{
            mt: 2,
            width: 200,
            height: 50,
            fontWeight: 'bold',
            fontSize: 20,
          }}
          href='/user'
        >
          Get Started
        </Button>
      </Box>
      <Box
        sx={{
          maxWidth: '100%',
          maxHeight: '100%',
          order: { xs: -1, sm: 1 }, // Change order to stack on large screens
          mt: { xs: 4, sm: 0 }, // Add margin on top for spacing on small screens
        }}
      >
        <img
          src={Logo}
          alt="Logo"
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '50%',
          }}
        />
      </Box>
    </Stack>
  );
}

export default Hero;
