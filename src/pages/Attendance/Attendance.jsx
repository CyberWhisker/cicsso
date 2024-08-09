import React, { useState } from 'react'
import { Box, Divider, Drawer, Grid, MenuItem, Typography } from '@mui/material'
import { Add, Folder } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import Store from './Form/Store'
import Master from '../../layouts/Master'
import { CustomCard, DataTable, DropDown } from '../../components'

function Attendance() {
  return (
    <Master>
      <Typography variant="h5" fontWeight='bold'>Attendance List :</Typography>
      <Divider/>
      <Box sx={{mt: 2}}>
        <AttendanceList/>
      </Box>
    </Master>
  )
}

function AttendanceList() {
    const Project = [
      {
        _id: '1',
        name: 'Event 1',
        date: '05/30/2024'
      },
      {
        _id: '2',
        name: 'Event 2',
        date: '05/30/2024'
      },
      {
        _id: '3',
        name: 'Event 3',
        date: '05/30/2024'
      },
      {
        _id: '4',
        name: 'Event 4',
        date: '05/30/2024'
      },
    ]
    return (
      <DataTable/>
    )
  }
  
function AttendanceMenu() {
    return(
        <DropDown >
            <MenuItem>Edit</MenuItem>
            <MenuItem>Share</MenuItem>
            <MenuItem>Delete</MenuItem>
        </DropDown>
    )
}

function SideDrawer({open, setOpen}) {
    return (
        <Drawer open={open} anchor='right' onClose={() => setOpen(false)}>
            <Store/>
        </Drawer>
    ) 
}

export default Attendance