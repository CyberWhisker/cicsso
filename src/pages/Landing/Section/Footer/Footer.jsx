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
          <Typography sx={{ textAlign: 'center' }}>An Organization composed of God-fearing and law-abiding individuals who are united by a common ideal that unites the student body to achieve the organization's goals and aspirations for the benefit of the studets.</Typography>
        </Box>
        <Box>
          <Typography variant='h5' fontWeight='bold' sx={{ textAlign: 'center' }}>Mission:</Typography>
          <Typography sx={{ textAlign: 'center' }}>To provide student service, unite,and represent the student body, protect and promote student's rights, welfare, and developments through activities and projects, that will benefit the welfare of the students.</Typography>
        </Box>
      </Stack>
    </Box>
  )
}

export default Footer