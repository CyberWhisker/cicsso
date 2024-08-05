import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Chart } from '../../../components';
import Master from '../../../layouts/Master';

function Dashboard() {
  return (
    <Master>
        <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
            <Paper
                sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
                }}
            >
                <Chart />
            </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
            <Paper
                sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
                }}
            >
            </Paper>
            </Grid>
            <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            </Paper>
            </Grid>
        </Grid>
    </Master>
  )
}

export default Dashboard