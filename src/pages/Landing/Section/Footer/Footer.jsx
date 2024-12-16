import { Facebook, Instagram, Twitter } from '@mui/icons-material'
import { Box, Divider, Stack, Typography } from '@mui/material'
import React from 'react'

function Footer() {
  return (
    <Box>
      <Divider />
      <Stack sx={{ p: 1 }} direction={{ sm: 'column', md: 'row' }} justifyContent='space-between' gap={{ xs: 2, md: 30 }}>
        {/* <Box>
            <Typography>Follow us on:</Typography>
            <Stack gap={1} direction='row'>
              <Facebook/>
              <Twitter/>
              <Instagram/>
            </Stack>
          </Box> */}
        <Box>
          <Typography variant='h5' fontWeight='bold' sx={{ textAlign: 'center' }}>Vision:</Typography>
          <Typography sx={{ textAlign: 'center' }}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus, distinctio labore qui nesciunt rem veritatis unde odit impedit itaque! Blanditiis, rerum obcaecati aperiam saepe ab doloremque tenetur corrupti quis repellat.</Typography>
        </Box>
        <Box>
          <Typography variant='h5' fontWeight='bold' sx={{ textAlign: 'center' }}>Mission:</Typography>
          <Typography sx={{ textAlign: 'center' }}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus, distinctio labore qui nesciunt rem veritatis unde odit impedit itaque! Blanditiis, rerum obcaecati aperiam saepe ab doloremque tenetur corrupti quis repellat.</Typography>
        </Box>
      </Stack>
    </Box>
  )
}

export default Footer