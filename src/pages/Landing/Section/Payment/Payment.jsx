import { PaymentRounded } from '@mui/icons-material'
import { Box, Stack, Typography } from '@mui/material'
import React from 'react'

function Payment() {
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
          order: { xs: -1, sm: 1 }, // Change order to stack on large screens
          mt: { xs: 4, sm: 0 }, // Add margin on top for spacing on small screens
        }}
      >
        <PaymentRounded sx={{ height: '100%', width: '100%' }} />
      </Box>
      <Box sx={{ width: '50%', textAlign: { xs: 'center', sm: 'left' } }}>
        <Typography variant="h3" fontWeight="bold">
            Payment
        </Typography>
        <Typography variant="h6" sx={{ mt: 2, width: '100%' }}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque similique corporis
          exercitationem suscipit, odit rerum inventore architecto aspernatur aliquam alias
          possimus adipisci, repellendus veritatis, nemo necessitatibus aut dolores corrupti
          eligendi!
        </Typography>
      </Box>
    </Stack>
  )
}

export default Payment