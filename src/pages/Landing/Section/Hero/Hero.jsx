import { Box, Stack, Typography, Button, Grid } from '@mui/material'
import React from 'react'
import Logo from '/appImg/Logo.png'

function Hero() {
  return (
    <Grid 
    container 
    spacing={2}
    >
        <Grid xs={6} item>
            <Stack 
            direction='row'
            >
                <Typography
                    variant="h1"
                    fontWeight="bold"
                    sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignSelf: 'center',
                    textAlign: 'center',
                    }}
                >
                    CICS{String.fromCharCode(160)}
                </Typography>
                
                <Box 
                sx={{
                    display: 'flex',
                    alignItems: 'center'
                }}
                >
                    <Typography
                        component="span"
                        fontWeight="bold"
                        variant="h4"
                        sx={{
                        color: (theme) =>
                            theme.palette.mode == localStorage.getItem('mode') ? 'primary.main' : 'primary.light',
                        }}
                        >
                        Student
                        <Typography
                        fontWeight="bold"
                        variant="h4"
                        sx={{
                        color: (theme) =>
                            theme.palette.mode == localStorage.getItem('mode') ? 'primary.main' : 'primary.light',
                        }}
                        >
                            Organization
                        </Typography>
                    </Typography>
                </Box>
                
            </Stack>
            <Typography variant="h6">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque similique corporis exercitationem suscipit, odit rerum inventore architecto aspernatur aliquam alias possimus adipisci, repellendus veritatis, nemo necessitatibus aut dolores corrupti eligendi!</Typography>
            <Button variant="contained" sx={{mt: 2}} size="xl">
            SignUP
            </Button>
        </Grid>
        <Grid xs={6} item 
        sx={{
            display: 'flex',
            justifyContent: 'flex-end'
        }}
        >
            <img src={Logo} alt="no Img" 
            style={{
                height: 500,
                borderRadius: '50%'
            }}
            />
        </Grid>
    </Grid>
  )
}

export default Hero