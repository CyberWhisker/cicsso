import { Box, Checkbox, Chip, Container, Divider, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import moment from 'moment';
import { Check } from '@mui/icons-material';

function StudentClearance({ selected }) {
    return (
        <div>
            <div id="test" style={{ fontFamily: "'Times New Roman', Times, serif", color: 'black' }}>
                <Container sx={{ fontFamily: "'Times New Roman', Times, serif", mt: 5 }}>
                    <Stack spacing={3}>
                        <HeaderContent />
                        <SemesterContent selected={selected} />
                        <UserContent selected={selected} />
                        <EventContent selected={selected} />
                        <Typography fontWeight={'bold'}
                            sx={{
                                textIndent: '4em',
                                fontFamily: "'Times New Roman', Times, serif",
                            }}
                        >
                            This is to certify that the above-mentioned student has settled all the student organization dues for the
                            academic year and semester stated above.
                        </Typography>
                        <SignatoryContent selected={selected} />
                    </Stack>
                </Container>
                {/* <Divider
                    sx={{
                        width: '100%',
                        borderBottom: '3px dashed rgba(0, 0, 0, 1)',
                        mt: 5,
                    }}
                /> */}
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

function SemesterContent({ selected }) {
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
                S.Y {moment(selected?.schoolYear?.startDate).format("YYYY")} - {moment(selected?.schoolYear?.endDate).format("YYYY")} {selected?.schoolYear?.semester || 'Null'}
            </Typography>
        </Stack>
    );
}

function UserContent({ selected }) {
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
                        {selected?.user?.lastName || 'Null'}
                    </Typography>
                    <Divider sx={{ bgcolor: 'rgba(0, 0, 0, 1)' }} />
                </Grid>
                <Grid item xs={3}>
                    <Typography sx={{ textAlign: 'center', fontFamily: "'Times New Roman', Times, serif" }}>
                        {selected?.user?.firstName || 'Null'}
                    </Typography>
                    <Divider sx={{ bgcolor: 'rgba(0, 0, 0, 1)' }} />
                </Grid>
                <Grid item xs={3}>
                    <Typography sx={{ textAlign: 'center', fontFamily: "'Times New Roman', Times, serif" }}>
                        {selected?.user?.middleName || 'Null'}
                    </Typography>
                    <Divider sx={{ bgcolor: 'rgba(0, 0, 0, 1)' }} />
                </Grid>
                <Grid item xs={2}>
                    <Typography sx={{ textAlign: 'center', fontFamily: "'Times New Roman', Times, serif" }}>
                        {selected?.user?.extensionName || 'N/A'}
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
                        {selected?.user?.program || 'Null'}
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
                        {selected?.user?.year || 'Null'}
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
                        {selected?.user?.section || 'Null'}
                    </Typography>
                    <Divider sx={{ bgcolor: 'rgba(0, 0, 0, 1)' }} />
                </Grid>
            </Grid>

            <Stack direction={'row'} spacing={1}>
                {selected?.user?.type == "Regular" && (
                    <Stack direction={'row'} spacing={2}>
                        <Typography fontWeight={'bold'} sx={{ fontFamily: "'Times New Roman', Times, serif" }}>
                            (<Check />) Regular
                        </Typography>
                        <Typography display={'flex'} alignItems={'end'} fontWeight={'bold'} sx={{ fontFamily: "'Times New Roman', Times, serif" }}>
                            (_) Irregular
                        </Typography>
                    </Stack>
                )}
                {selected?.user?.type != "Regular" && (
                    <>
                        <Typography display={'flex'} alignItems={'end'} fontWeight={'bold'} sx={{ fontFamily: "'Times New Roman', Times, serif" }}>
                            (_) Regular
                        </Typography>
                        <Typography fontWeight={'bold'} sx={{ fontFamily: "'Times New Roman', Times, serif" }}>
                            (<Check />) Irregular
                        </Typography>
                    </>
                )}
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
                        {selected?.user?.studentId}
                    </Typography>
                    <Divider sx={{ bgcolor: 'rgba(0, 0, 0, 1)' }} />
                </Stack>
            </Stack>
        </Stack>
    );
}

function EventContent({ selected }) {
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
                    {selected?.schoolYear.collection.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td style={{ border: '1px solid black', padding: '8px' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography sx={{ fontFamily: "'Times New Roman', Times, serif" }}>{item.collectionName}</Typography>

                                        <Typography fontWeight={'bold'} sx={{ fontFamily: "'Times New Roman', Times, serif" }}>₱ {item.fine.toFixed(2)}</Typography>
                                    </Box>
                                    {item.indicator1 && (
                                        <>
                                            {selected.schoolYear.semester == '1st Semester' && (
                                                <Stack direction={'row'} alignItems={'center'}>
                                                    <Checkbox defaultChecked />
                                                    <Typography sx={{ fontFamily: "'Times New Roman', Times, serif" }}>1st Semester</Typography>
                                                    <Checkbox />
                                                    <Typography sx={{ fontFamily: "'Times New Roman', Times, serif" }}>2nd Semester</Typography>
                                                </Stack>
                                            )}
                                            {selected.schoolYear.semester == '2nd Semester' && (
                                                <Stack direction={'row'} alignItems={'center'}>
                                                    <Checkbox defaultChecked />
                                                    <Typography sx={{ fontFamily: "'Times New Roman', Times, serif" }}>1st Semester</Typography>
                                                    <Checkbox defaultChecked />
                                                    <Typography sx={{ fontFamily: "'Times New Roman', Times, serif" }}>2nd Semester</Typography>
                                                </Stack>
                                            )}
                                        </>
                                    )}
                                </td>
                                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                                    <Chip color='success' label={
                                        <Typography sx={{ fontFamily: "'Times New Roman', Times, serif" }}>Paid</Typography>
                                    } />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </Box>
    );
}

function SignatoryContent({ selected }) {
    return (
        <Box>
            <Typography fontWeight={'bold'} sx={{ fontFamily: "'Times New Roman', Times, serif" }}>Attested by:</Typography>
            <Box sx={{ textAlign: 'center', fontFamily: "'Times New Roman', Times, serif", mt: 5 }}>
                <Box sx={{ display: 'inline-block', textAlign: 'center' }}>
                    <img alt='Signature' src={`/signatureImg/${selected?.schoolYear.signatories[0].image}`} style={{ height: 100 }} />
                    <Typography sx={{ fontFamily: "'Times New Roman', Times, serif" }}>
                        {selected?.schoolYear.signatories[0].name}
                    </Typography>
                    <Divider sx={{ bgcolor: 'rgba(0, 0, 0, 1)', width: '100%' }} />
                </Box>
                <Typography sx={{ fontFamily: "'Times New Roman', Times, serif" }}>{selected?.schoolYear.signatories[0].role}</Typography>
            </Box>
        </Box>
    );
}

export default StudentClearance;
