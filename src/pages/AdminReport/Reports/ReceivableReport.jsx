import {
    Box,
    Divider,
    Stack,
    Typography,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Grid,
} from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print';
import { Print } from '@mui/icons-material';
import { fetchUsers } from '../../../api/userApi';
import { fetchCollectionWithEventAndAttendance } from '../../../api/CollectionApi';
import moment from 'moment';

function ReceivableReport({ selectedAY }) {
    const contentRef = useRef(null);
    const printFile = useReactToPrint({ contentRef })
    return (
        <>
            <MenuItem onClick={printFile}>
                <ListItemIcon><Print /></ListItemIcon>
                <ListItemText>Receivable Report</ListItemText>
            </MenuItem>
            <Box sx={{ display: 'block' }}>
                <Layout contentRef={contentRef} selectedAY={selectedAY} />
            </Box>
        </>
    )
}

function Layout({ contentRef, selectedAY }) {
    const [receivable, setReceivable] = useState([])

    const handleGetData = async () => {
        const data = await computeData(selectedAY)
        setReceivable(data)
    }
    useEffect(() => {
        handleGetData()
    }, [])

    return (
        <Box ref={contentRef} sx={{ p: 2 }}>
            <div style={{ pageBreakAfter: 'always' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={4} sx={{ border: 'none' }}>
                                <HeaderContent />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={4}>
                                <Stack spacing={2}>
                                    <Stack spacing={2}>
                                        <Typography
                                            variant='h5'
                                            fontWeight={'bold'}
                                            sx={{
                                                fontFamily: "'Times New Roman', Times, serif",
                                            }}
                                        >
                                            Receivable/Collectible
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                    <ReceivableRow receivable={receivable} />
                    <Signatories receivable={receivable} />
                </Table>
            </div>
        </Box>
    )
}

function ReceivableRow({ receivable, }) {
    return (
        <>
            <TableHead
                sx={{
                    border: "1px solid rgba(224, 224, 224, 1)"
                }}
            >
                <TableRow sx={{ bgcolor: 'success.light' }}>
                    <TableCell
                        sx={{
                            border: "1px solid rgba(224, 224, 224, 1)"
                        }}
                    >
                        <Typography fontWeight={'bold'} textAlign={'center'}>
                            NO
                        </Typography>
                    </TableCell>
                    <TableCell
                        sx={{
                            border: "1px solid rgba(224, 224, 224, 1)"
                        }}
                    >
                        <Typography fontWeight={'bold'} textAlign={'center'}>
                            ACTIVITY
                        </Typography>
                    </TableCell>
                    <TableCell
                        sx={{
                            border: "1px solid rgba(224, 224, 224, 1)"
                        }}
                    >
                        <Typography fontWeight={'bold'} textAlign={'center'}>
                            DATE
                        </Typography>
                    </TableCell>
                    <TableCell
                        sx={{
                            border: "1px solid rgba(224, 224, 224, 1)"
                        }}>
                        <Typography fontWeight={'bold'} textAlign={'center'}>
                            TOTAL RECEIVABLE
                        </Typography>
                    </TableCell>
                </TableRow>
            </TableHead>
            {receivable.map((item, index) => (
                <React.Fragment key={index}>
                    <TableBody
                        key={index}
                        sx={{
                            border: "1px solid rgba(224, 224, 224, 1)"
                        }}
                    >
                        <TableRow>
                            <TableCell
                                sx={{
                                    border: "1px solid rgba(224, 224, 224, 1)"
                                }}
                            >
                                <Typography fontWeight={'bold'} textAlign={'center'}>
                                    {item.no}
                                </Typography>
                            </TableCell>
                            <TableCell
                                sx={{
                                    border: "1px solid rgba(224, 224, 224, 1)"
                                }}
                            >
                                <Typography fontWeight={'bold'} textAlign={'center'}>
                                    {item.label}
                                </Typography>
                            </TableCell>
                            <TableCell
                                sx={{
                                    border: "1px solid rgba(224, 224, 224, 1)"
                                }}
                            >
                                <Typography fontWeight={'bold'} textAlign={'center'}>
                                    {item.date}
                                </Typography>
                            </TableCell>
                            <TableCell
                                sx={{
                                    border: "1px solid rgba(224, 224, 224, 1)"
                                }}>
                                <Typography fontWeight={'bold'} textAlign={'center'}>
                                    ₱ {item.value.toFixed(2)}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </React.Fragment>
            ))}
        </>
    )
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

function Signatories() {
    return (
        <TableBody>
            <TableRow >
                <TableCell colSpan={4} sx={{ paddingTop: 10, border: 'none' }} >
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Stack spacing={6}>
                                <Typography>Prepared by: </Typography>
                                <Stack spacing={2}>
                                    <Typography fontWeight={'bold'} >
                                        JAMIE M. SOLINA
                                    </Typography>
                                    <Typography >
                                        TREASURER, CICSSO
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={6}>
                                <Typography>Approved by:</Typography>
                                <Stack spacing={2}>
                                    <Typography fontWeight={'bold'} >
                                        DOREENA JOY. C. BORJA
                                    </Typography>
                                    <Typography >
                                        Adviser, CICSSO
                                    </Typography>
                                </Stack>
                            </Stack>
                            <Stack spacing={6} sx={{ paddingTop: 10 }}>
                                <Typography>Noted by: </Typography>
                                <Stack spacing={2}>
                                    <Typography fontWeight={'bold'} >
                                        RONJIE MAR L. MALINAO, DIT
                                    </Typography>
                                    <Typography >
                                        Dean, CICS
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Grid>
                    </Grid>
                </TableCell>
            </TableRow>
        </TableBody>
    )
}

const computeData = async (selectedAY) => {
    const [
        { data: eventData, error: eventError },
        { data: userData, error: userError }
    ] = await Promise.all([
        fetchCollectionWithEventAndAttendance(selectedAY),
        fetchUsers()
    ])

    if (!eventError && !userError) {
        // Process Attendance data
        let number = 0;
        const attendanceData = eventData
            .filter((item) => item.eventId && item.label != "Optional")
            .map((item) => {
                let countTotalAttendances = 0
                let countTotalUserAttendances = 0
                item.eventId.schedules.map((schedule) => {
                    schedule.attendances.map((attendance) => {
                        if (attendance.amIn) countTotalUserAttendances++
                        if (attendance.amOut) countTotalUserAttendances++
                        if (attendance.pmIn) countTotalUserAttendances++
                        if (attendance.pmOut) countTotalUserAttendances++
                    })
                    if (schedule.amIn) countTotalAttendances++
                    if (schedule.amOut) countTotalAttendances++
                    if (schedule.pmIn) countTotalAttendances++
                    if (schedule.pmOut) countTotalAttendances++
                })
                number++;
                const filterUser = userData.filter((item) => item.role == 'user')
                const total = (countTotalAttendances * filterUser.length) - countTotalUserAttendances
                return {
                    no: number,
                    label: item.collectionName,
                    value: total * item.fine,
                    date: `${moment(item.schoolYearId.startDate).format('MM/DD/YYYY')} - ${moment(item.schoolYearId.endDate).format('MM/DD/YYYY')} (${item.schoolYearId.semester})`
                }
            })

        // Process Collection data
        const collectionDataProcessed = eventData
            .filter((item) => !item.eventId && item.label != "Optional")
            .map((item) => {
                const totalPayment = item.fine * userData.length
                const userPayment = item.transaction.reduce((sum, transaction) => sum + transaction.amount, 0)
                number++;
                return {
                    no: number,
                    label: item.collectionName,
                    value: totalPayment - userPayment,
                    date: `${moment(item.schoolYearId.startDate).format('MM/DD/YYYY')} - ${moment(item.schoolYearId.endDate).format('MM/DD/YYYY')} (${item.schoolYearId.semester})`
                }
            })
        return ([...attendanceData, ...collectionDataProcessed])
    }
}

export default ReceivableReport