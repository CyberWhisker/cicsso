import { Box, Container, Divider, Grid, Stack, Typography } from '@mui/material';
import React, { useRef } from 'react';
import { Check } from '@mui/icons-material';
import { useReactToPrint } from 'react-to-print';

function StudentClearance() {
    const contentRef = useRef(null);
    // Function to print using react-to-print
    const handlePrint = useReactToPrint({contentRef});

    return (
        <div>
            <button onClick={handlePrint}>Print</button>
            <div ref={contentRef} id="test" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                <Container sx={{ fontFamily: "'Times New Roman', Times, serif", mt: 5 }}>
                    <Stack spacing={3}>
                        <HeaderContent />
                        <SemesterContent />
                        <UserContent />
                        <EventContent />
                        <Typography fontWeight={'bold'}
                            sx={{
                                textIndent: '4em',
                                fontFamily: "'Times New Roman', Times, serif",
                            }}
                        >
                            This is to certify that the above-mentioned student has settled all the student organization dues for the
                            academic year and semester stated above.
                        </Typography>
                        <SignatoryContent />
                    </Stack>
                </Container>
                <Divider
                    sx={{
                        width: '100%',
                        borderBottom: '3px dashed rgba(0, 0, 0, 1)',
                        mt: 5,
                    }}
                />
            </div>
        </div>
    );
}

function HeaderContent() {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                fontFamily: "'Times New Roman', Times, serif", // Set font family here as well
            }}
        >
            {/* Left logo */}
            <img
                alt="Logo"
                src="/appImg/MarsuLogo.png"
                style={{ height: '100px', objectFit: 'contain' }}
            />

            {/* Centered text */}
            <Stack textAlign="center" sx={{ height: '100px', justifyContent: 'center' }}>
                <Typography sx={{ fontFamily: "'Times New Roman', Times, serif" }}>
                    Marinduque State College
                </Typography>
                <Typography fontWeight={'bold'} sx={{ fontFamily: "'Times New Roman', Times, serif" }}>
                    COLLEGE OF INFORMATION AND COMPUTING SCIENCES
                </Typography>
                <Typography sx={{ fontFamily: "'Times New Roman', Times, serif" }}>
                    Panfilo M. Manguerra Sr., Rd., Tanza, Boac, Marinduque
                </Typography>
                <Typography fontWeight={'bold'} sx={{ fontFamily: "'Times New Roman', Times, serif" }}>
                    College of Information and Computing Sciences Student Organization (CICSSO)
                </Typography>
                <Divider
                    sx={{
                        width: '100%',
                        borderBottom: '4px double rgba(0, 0, 0, 1)',
                    }}
                />
            </Stack>

            {/* Right logo */}
            <img
                alt="Logo"
                src="/appImg/Logo.png"
                style={{ height: '100px', objectFit: 'contain' }}
            />
        </Box>
    );
}

function SemesterContent() {
    return (
        <Stack spacing={1}>
            <Typography
                fontWeight={'bold'}
                variant="h5"
                textAlign={'center'}
                sx={{
                    fontFamily: "'Times New Roman', Times, serif",
                }}
            >
                CICSSO SEMESTRAL CLEARANCE
            </Typography>
            <Typography
                fontWeight={'bold'}
                variant="h5"
                textAlign={'center'}
                sx={{
                    fontFamily: "'Times New Roman', Times, serif",
                }}
            >
                S.Y 2023 - 2024 2nd SEMESTER
            </Typography>
        </Stack>
    );
}

function UserContent() {
    return (
        <Stack spacing={1}>
            <Grid container>
                <Grid item xs={1}>
                    <Typography fontWeight={'bold'} sx={{ fontFamily: "'Times New Roman', Times, serif" }}>
                        Name:
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography sx={{ textAlign: 'center', fontFamily: "'Times New Roman', Times, serif" }}>
                        Lopez
                    </Typography>
                    <Divider sx={{ bgcolor: 'rgba(0, 0, 0, 1)' }} />
                </Grid>
                <Grid item xs={3}>
                    <Typography sx={{ textAlign: 'center', fontFamily: "'Times New Roman', Times, serif" }}>
                        Erick John
                    </Typography>
                    <Divider sx={{ bgcolor: 'rgba(0, 0, 0, 1)' }} />
                </Grid>
                <Grid item xs={3}>
                    <Typography sx={{ textAlign: 'center', fontFamily: "'Times New Roman', Times, serif" }}>
                        Orqueza
                    </Typography>
                    <Divider sx={{ bgcolor: 'rgba(0, 0, 0, 1)' }} />
                </Grid>
                <Grid item xs={2}>
                    <Typography sx={{ textAlign: 'center', fontFamily: "'Times New Roman', Times, serif" }}>
                        Jr
                    </Typography>
                    <Divider sx={{ bgcolor: 'rgba(0, 0, 0, 1)' }} />
                </Grid>
            </Grid>

            <Grid container>
                <Grid item xs={1}></Grid>
                <Grid item xs={3}>
                    <Typography fontWeight={'bold'} sx={{ textAlign: 'center', fontFamily: "'Times New Roman', Times, serif" }}>
                        LAST NAME
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography fontWeight={'bold'} sx={{ textAlign: 'center', fontFamily: "'Times New Roman', Times, serif" }}>
                        FIRST NAME
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography fontWeight={'bold'} sx={{ textAlign: 'center', fontFamily: "'Times New Roman', Times, serif" }}>
                        MIDDLE NAME
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography fontWeight={'bold'} sx={{ textAlign: 'center', fontFamily: "'Times New Roman', Times, serif" }}>
                        Ext.
                    </Typography>
                </Grid>
            </Grid>

            <Grid container>
                <Grid item xs={1}>
                    <Typography fontWeight={'bold'} sx={{ fontFamily: "'Times New Roman', Times, serif" }}>Program:</Typography>
                </Grid>
                <Grid item xs={5}>
                    <Typography sx={{ textAlign: 'center', fontFamily: "'Times New Roman', Times, serif" }}>
                        BS Information Technology
                    </Typography>
                    <Divider sx={{ bgcolor: 'rgba(0, 0, 0, 1)' }} />
                </Grid>
                <Grid item xs={1}>
                    <Typography fontWeight={'bold'} sx={{ textAlign: 'center', fontFamily: "'Times New Roman', Times, serif" }}>
                        Year:
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography sx={{ textAlign: 'center', fontFamily: "'Times New Roman', Times, serif" }}>
                        4th
                    </Typography>
                    <Divider sx={{ bgcolor: 'rgba(0, 0, 0, 1)' }} />
                </Grid>
                <Grid item xs={1}>
                    <Typography fontWeight={'bold'} sx={{ textAlign: 'center', fontFamily: "'Times New Roman', Times, serif" }}>
                        Section:
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography sx={{ textAlign: 'center', fontFamily: "'Times New Roman', Times, serif" }}>
                        B
                    </Typography>
                    <Divider sx={{ bgcolor: 'rgba(0, 0, 0, 1)' }} />
                </Grid>
            </Grid>

            <Stack direction={'row'} spacing={1}>
                <Typography fontWeight={'bold'} sx={{ fontFamily: "'Times New Roman', Times, serif" }}>
                    (<Check />) Regular
                </Typography>
                <Typography fontWeight={'bold'} sx={{ fontFamily: "'Times New Roman', Times, serif" }}>
                    (<Check />) Irregular
                </Typography>
                <Typography fontWeight={'bold'} sx={{ alignItems: 'end', display: 'flex', fontFamily: "'Times New Roman', Times, serif" }}>
                    Student ID #:
                </Typography>
                <Stack width={100}>
                    <Typography
                        sx={{
                            justifyContent: 'center',
                            alignItems: 'end',
                            display: 'flex',
                            fontFamily: "'Times New Roman', Times, serif",
                        }}
                    >
                        4th
                    </Typography>
                    <Divider sx={{ bgcolor: 'rgba(0, 0, 0, 1)' }} />
                </Stack>
            </Stack>
        </Stack>
    );
}

function EventContent() {
    return (
        <Box sx={{ px: 20, fontFamily: "'Times New Roman', Times, serif" }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid black', padding: '8px' }}>
                            <Typography variant="h6" fontWeight="bold" sx={{ fontFamily: "'Times New Roman', Times, serif" }}>
                                Due
                            </Typography>
                        </th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>
                            <Typography variant="h6" fontWeight="bold" sx={{ fontFamily: "'Times New Roman', Times, serif" }}>
                                Status
                            </Typography>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ border: '1px solid black', padding: '8px' }}>
                            <Typography sx={{ fontFamily: "'Times New Roman', Times, serif" }}>Example Due Date</Typography>
                        </td>
                        <td style={{ border: '1px solid black', padding: '8px' }}>
                            <Typography sx={{ fontFamily: "'Times New Roman', Times, serif" }}>Example Status</Typography>
                        </td>
                    </tr>
                </tbody>
            </table>
        </Box>
    );
}

function SignatoryContent() {
    return (
        <Box>
            <Typography fontWeight={'bold'} sx={{ fontFamily: "'Times New Roman', Times, serif" }}>Attested by:</Typography>
            <Box sx={{ textAlign: 'center', fontFamily: "'Times New Roman', Times, serif", mt: 5 }}>
                <Box sx={{ display: 'inline-block', textAlign: 'center' }}>
                    <Typography sx={{ fontFamily: "'Times New Roman', Times, serif" }}>
                        JAMIE M. SOLINA
                    </Typography>
                    <Divider sx={{ bgcolor: 'rgba(0, 0, 0, 1)', width: '100%' }} />
                </Box>
                <Typography sx={{ fontFamily: "'Times New Roman', Times, serif" }}>CICSSO Treasurer</Typography>
            </Box>
        </Box>
    );
}

export default StudentClearance;
