import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Chart, CustomCard } from '../../components';
import Master from '../../layouts/Master';
import { Card, Chip, Divider, MenuItem, Stack, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';

function Dashboard() {
  return (
    <Master>
        <Stack gap={2}>
            <InfoSection/>
            <ChartSection/>
        </Stack>
    </Master>
  )
}

function InfoSection() {
    const theme = useTheme();
    return (
        <Grid container spacing={2}>
            <Grid item xs={6} md={3}>
                <Card sx={{p:2, backgroundColor: theme.palette.primary.main}}>
                    <Typography>Users:</Typography>
                    <Typography textAlign="center" variant='h4' fontWeight="bold">700</Typography>
                </Card>
            </Grid>
            <Grid item xs={6} md={3}>
                <Card sx={{p:2, backgroundColor: theme.palette.error.main}}>
                    <Typography>Penalty:</Typography>
                    <Typography textAlign="center" variant='h4' fontWeight="bold">12</Typography>
                </Card>
            </Grid>
            <Grid item xs={6} md={3}>
                <Card sx={{p:2, backgroundColor: theme.palette.warning.main}}>
                    <Typography>Pending Transaction:</Typography>
                    <Typography textAlign="center" variant='h4' fontWeight="bold">30</Typography>
                </Card>
            </Grid>
            <Grid item xs={6} md={3}>
                <Card sx={{p:2, backgroundColor: theme.palette.success.main}}>
                    <Typography>Funds:</Typography>
                    <Typography textAlign="center" variant='h4' fontWeight="bold">4005</Typography>
                </Card>
            </Grid>
        </Grid>
    )
}

function ChartSection() {
    return (
        <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
            <Paper
                sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 500,
                }}
            >
                <Chart />
            </Paper>
            </Grid>
            <EventList/>
        </Grid>
    )
}

function EventList() {
    const Data = [
        {
            name: "Event 1",
            status: "Active"
        },
        {
            name: "Event 2",
            status: "Pending"
        },
        {
            name: "Event 3",
            status: "Pending"
        },
        {
            name: "Event 4",
            status: "Pending"
        },
        {
            name: "Event 5",
            status: "Pending"
        }
    ]
    return (
        <Grid item xs={12} md={4} lg={3}>
            <Paper
                sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 500,
                }}
            >
                <Typography fontWeight="bold">Events List:</Typography>
                <Divider/>
                {Data.map((item, index) => (
                    <MenuItem sx={{display: 'flex', justifyContent: 'space-between'}} key={index}>
                        <Typography>{item.name}</Typography>
                        <Chip label={item.status} color={item.status == 'Active' ? 'success' : 'warning'}/>
                    </MenuItem>
                ))}
            </Paper>
        </Grid>
    )
} 

export default Dashboard