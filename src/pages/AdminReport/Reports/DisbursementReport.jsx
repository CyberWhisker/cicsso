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
import { fetchProjectBySchoolYear } from '../../../api/ProjectApi';
import { Print } from '@mui/icons-material';
import moment from 'moment';

function DisbursementReport({ selectedAY }) {
    const contentRef = useRef(null);
    const printFile = useReactToPrint({ contentRef })
    return (
        <>
            <MenuItem onClick={printFile}>
                <ListItemIcon><Print /></ListItemIcon>
                <ListItemText>Financial Report</ListItemText>
            </MenuItem>
            <Box sx={{ display: 'none' }}>
                <Layout contentRef={contentRef} selectedAY={selectedAY} />
            </Box>
        </>
    )
}

function Layout({ contentRef, selectedAY }) {
    const [totalRevenue, setTotalRevenue] = useState(0)
    const [totalExpense, setTotalExpense] = useState(0)
    return (
        <Box ref={contentRef} sx={{ p: 2 }}>
            <div style={{ pageBreakAfter: 'always' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={3} sx={{ border: 'none' }}>
                                <HeaderContent />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={3}>
                                <Stack spacing={2}>
                                    <Stack spacing={2}>
                                        <Typography
                                            variant='h5'
                                            fontWeight={'bold'}
                                            sx={{
                                                fontFamily: "'Times New Roman', Times, serif",
                                            }}
                                        >
                                            Disbursement
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                    <ProjectRow selectedAY={selectedAY} />
                    <Signatories />
                </Table>
            </div>
        </Box>
    )
}

function ProjectRow({ selectedAY, }) {
    const [rows, setRows] = useState([])
    const [total, setTotal] = useState(0)
    const handleGetData = async () => {
        const { data, error } = await fetchProjectBySchoolYear(selectedAY)
        if (!error) {
            const getTotal = data.map((item) => {
                return item.items.reduce((sum, item) => item.amount + sum, 0);
            }).reduce((sum, amount) => sum + amount, 0);
            setTotal(getTotal);
            setRows(data)
        }
    }
    useEffect(() => {
        handleGetData()
    }, [])
    return (
        <>
            {rows.map((item, index) => (
                <React.Fragment key={index}>

                    <TableHead
                        key={index}
                        sx={{
                            border: "1px solid rgba(224, 224, 224, 1)"
                        }}
                    >
                        <TableRow sx={{ bgcolor: "#d3d3d3" }}>
                            <TableCell colSpan={3}>
                                <Typography fontWeight={'bold'} textAlign={'center'}>
                                    {item.project}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
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
                                }}
                            >
                                <Typography fontWeight={'bold'} textAlign={'center'}>
                                    ACTIVITY
                                </Typography>
                            </TableCell>
                            <TableCell
                                sx={{
                                    border: "1px solid rgba(224, 224, 224, 1)"
                                }}>
                                <Typography fontWeight={'bold'} textAlign={'center'}>
                                    AMOUNT
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    {item.items.map((item, index) => (
                        <TableBody
                            key={index}
                            sx={{
                                border: "1px solid rgba(224, 224, 224, 1)"
                            }}
                        >
                            <TableRow>
                                <TableCell
                                    sx={{
                                        width: '10vh',
                                        border: "1px solid rgba(224, 224, 224, 1)"  // Outer table border
                                    }}>
                                    <Typography>{moment(item.createdAt).format('MM/DD/YYYY')}</Typography>
                                </TableCell>
                                <TableCell
                                    sx={{
                                        border: "1px solid rgba(224, 224, 224, 1)"  // Outer table border
                                    }}>
                                    <Typography>{item.item}</Typography>
                                </TableCell>
                                <TableCell align="right"
                                    sx={{
                                        border: "1px solid rgba(224, 224, 224, 1)"  // Outer table border
                                    }}>
                                    <Typography>₱ {item.amount.toFixed(2)}</Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    ))}
                </React.Fragment>
            ))}
            <TotalRow total={total} />
        </>
    )
}

function TotalRow({ total }) {
    return (

        <TableBody
            sx={{
                border: "1px solid rgba(224, 224, 224, 1)"
            }}
        >
            <TableRow >
                <TableCell
                    sx={{
                        width: '10vh',
                        border: "1px solid rgba(224, 224, 224, 1)"  // Outer table border
                    }}>
                    <Typography fontWeight={'bold'}>TOTAL:</Typography>
                </TableCell>
                <TableCell
                    sx={{
                        border: "1px solid rgba(224, 224, 224, 1)"  // Outer table border
                    }}>
                </TableCell>
                <TableCell align="right"
                    sx={{
                        border: "1px solid rgba(224, 224, 224, 1)",  // Outer table border
                        bgcolor: 'error.light'
                    }}>
                    <Typography fontWeight={'bold'}>₱ {total.toFixed(2)}</Typography>
                </TableCell>
            </TableRow>
        </TableBody>
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
                <TableCell colSpan={3} sx={{ paddingTop: 10, border: 'none' }} >
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

export default DisbursementReport