import { PaymentRounded } from '@mui/icons-material'
import { Box, Stack, Typography } from '@mui/material'
import React from 'react'

function Clearance() {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      alignItems="center"
      spacing={4}
      sx={{
        width: '100%', // Set the Stack to occupy 100% of the screen width
        margin: '0 auto', // Center the Stack horizontally
      }}
    >
      <Box
        sx={{
          width: '50%', // Each Box takes up 100% width
          maxWidth: '100%',
          maxHeight: '100%',
          borderRadius: '100%',
          padding: 10,
          order: { xs: -1, sm: -1 }, // Change order to stack on large screens
          mt: { xs: 4, sm: 0 }, // Add margin on top for spacing on small screens
        }}
      >
        <PaymentRounded sx={{ height: '100%', width: '100%' }} />
      </Box>
      <Box sx={{ width: '50%', textAlign: { xs: 'center', sm: 'left' } }}>
        <Typography variant="h3" fontWeight="bold">
          Clearance
        </Typography>
        <Typography variant="h6" sx={{ mt: 2, width: '100%' }}>
          Simplify the clearance process with automated features. Users can download their clearance forms in a PDF format, complete with digital signatures for authentication and convenience.
        </Typography>
      </Box>
    </Stack>
  )
}

export default Clearance