import {
    Box,
    Divider,
    Stack,
    Typography,
    MenuItem,
    ListItemIcon,
    ListItemText,
    TableContainer,
    Table,
    Tab,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Grid,
} from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print';
import { fetchCollectionBySchoolYear } from '../../../api/CollectionApi';
import { fetchProjectBySchoolYear } from '../../../api/ProjectApi';
import { Print } from '@mui/icons-material';

function FinancialReport({ selectedAY }) {
    const contentRef = useRef(null);
    const printFile = useReactToPrint({ contentRef })
    return (
        <>
            <MenuItem onClick={printFile}>
                <ListItemIcon><Print /></ListItemIcon>
                <ListItemText>Financial Report</ListItemText>
            </MenuItem>
            <Box sx={{ display: 'none' }}>
                <NewLayout contentRef={contentRef} selectedAY={selectedAY} />
            </Box>
        </>
    )
}

function NewLayout({ contentRef, selectedAY }) {
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
                                            INTRODUCTION
                                        </Typography>

                                        <Typography
                                            fontWeight={'bold'}
                                            sx={{
                                                fontFamily: "'Times New Roman', Times, serif",
                                            }}
                                        >
                                            The College of Information and Computing Sciences (CICSSO) is primarily funded by
                                            contributions from the CICS student body, is committed to delivering high-quality services while
                                            fostering transparency and camaraderie within the college. The collected financial resources play
                                            a vital role in supporting student activities, competitions, providing assistance to students, and
                                            implementing initiatives that directly benefit its members. These efforts promote responsibility
                                            among students and enrich their overall experience. To ensure a positive impact on the CICS
                                            community, this financial report provides a detailed breakdown of the funds received, expenses
                                            incurred, and the organization’s current financial standing, thereby promoting transparency and
                                            accountability
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </TableCell>
                        </TableRow>
                    </TableBody>

                    <TableHead
                        sx={{
                            border: "1px solid rgba(224, 224, 224, 1)"
                        }}
                    >
                        <TableRow sx={{ bgcolor: "success.light" }}>
                            <TableCell colSpan={3}>
                                <Typography fontWeight={'bold'} textAlign={'center'}>
                                    Financial Report
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={3}>
                                <Typography fontWeight={'bold'} textAlign={'center'}>
                                    Statement of Financial Performance
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={3}>
                                <Typography fontWeight={'bold'} textAlign={'center'}>
                                    for the First Semester Ended December 2023
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <RevenueRow selectedAY={selectedAY} setTotalRevenue={setTotalRevenue} />
                    <ExpenseRow selectedAY={selectedAY} setTotalExpense={setTotalExpense} />
                    <SurplusRow totalExpense={totalExpense} totalRevenue={totalRevenue} />
                    <Signatories />
                </Table>
            </div>
        </Box>
    )
}

function SurplusRow({ totalExpense, totalRevenue, }) {
    return (
        <TableBody
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
                    <Typography fontWeight={'bold'}>NET SURPLUS/LOSS</Typography>
                </TableCell>
                <TableCell
                    sx={{
                        border: "1px solid rgba(224, 224, 224, 1)"  // Outer table border
                    }}>
                </TableCell>
                <TableCell align="right"
                    sx={{
                        border: "1px solid rgba(224, 224, 224, 1)"  // Outer table border
                    }}>
                    <Typography fontWeight={'bold'}>
                        ₱ {(totalRevenue - totalExpense).toFixed(2)}
                    </Typography>
                </TableCell>
            </TableRow>
        </TableBody>
    )
}

function RevenueRow({ selectedAY, setTotalRevenue }) {
    const [rows, setRows] = useState([])
    const [total, setTotal] = useState(0)
    const handleGetProject = async () => {
        if (selectedAY) {
            const { data, error } = await fetchCollectionBySchoolYear(selectedAY)
            if (!error) {
                let no = 1;
                let overAll = 0;
                const formattedData = data.map((item) => {
                    let amount = 0;
                    if (item.transaction.length > 0) {
                        amount = item.transaction.reduce((sum, item) => sum + item.amount, 0)
                        overAll += amount
                    }
                    return ({ ...item, no: no++, totalAmount: amount })
                })
                // console.log(formattedData)
                setTotalRevenue(overAll)
                setTotal(overAll)
                setRows(formattedData)
            }
        }
    }

    useEffect(() => {
        handleGetProject()
    }, [selectedAY])
    return (
        <>
            <TableHead
                sx={{
                    border: "1px solid rgba(224, 224, 224, 1)"
                }}
            >
                <TableRow>
                    <TableCell colSpan={3}>
                        <Typography fontWeight={'bold'}>REVENUE</Typography>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.length == 0 && (
                    <TableRow>
                        <TableCell rowSpan={3}>No Record Found</TableCell>
                    </TableRow>
                )}
                {rows.map((item, index) => (
                    <TableRow key={index}>
                        <TableCell
                            sx={{
                                width: '10vh',
                                border: "1px solid rgba(224, 224, 224, 1)"  // Outer table border
                            }}>

                        </TableCell>
                        <TableCell
                            sx={{
                                border: "1px solid rgba(224, 224, 224, 1)"  // Outer table border
                            }}>
                            {item.collectionName}
                        </TableCell>
                        <TableCell align="right"
                            sx={{
                                border: "1px solid rgba(224, 224, 224, 1)"  // Outer table border
                            }}>
                            ₱ {item.totalAmount.toFixed(2)}
                        </TableCell>
                    </TableRow>
                ))}
                <TableRow>
                    <TableCell
                        sx={{
                            width: '15vh',
                            border: "1px solid rgba(224, 224, 224, 1)"  // Outer table border
                        }}>

                        <Typography fontWeight={'bold'}>
                            TOTAL REVENUE
                        </Typography>
                    </TableCell>
                    <TableCell
                        sx={{
                            border: "1px solid rgba(224, 224, 224, 1)"  // Outer table border
                        }}>
                    </TableCell>
                    <TableCell align="right"
                        sx={{
                            border: "1px solid rgba(224, 224, 224, 1)"  // Outer table border
                        }}>
                        <Typography fontWeight={'bold'}>
                            ₱ {total.toFixed(2)}
                        </Typography>
                    </TableCell>
                </TableRow>
            </TableBody>
        </>
    )
}

function ExpenseRow({ selectedAY, setTotalExpense }) {
    const [rows, setRows] = useState([])
    const [total, setTotal] = useState(0)
    const handleGetProject = async () => {
        if (selectedAY) {
            const { data, error } = await fetchProjectBySchoolYear(selectedAY)
            if (!error) {
                let no = 1;
                let overAll = 0;
                const formattedData = data.map((item) => {
                    let amount = 0;
                    if (item.items.length > 0) {
                        amount = item.items.reduce((sum, item) => sum + item.amount * item.quantity, 0)
                        overAll += amount
                    }
                    return ({ ...item, no: no++, totalAmount: amount })
                })
                setTotalExpense(overAll)
                setTotal(overAll)
                setRows(formattedData)
            }
        }
    }

    useEffect(() => {
        handleGetProject()
    }, [selectedAY])
    return (
        <>
            <TableHead
                sx={{
                    border: "1px solid rgba(224, 224, 224, 1)"
                }}
            >
                <TableRow>
                    <TableCell colSpan={3}>
                        <Typography fontWeight={'bold'}>LOSS: EXPENSES</Typography>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.length == 0 && (
                    <TableRow>
                        <TableCell rowSpan={3}>No Record Found</TableCell>
                    </TableRow>
                )}
                {rows.map((item, index) => (
                    <TableRow key={index}>
                        <TableCell
                            sx={{
                                width: '10vh',
                                border: "1px solid rgba(224, 224, 224, 1)"  // Outer table border
                            }}>

                        </TableCell>
                        <TableCell
                            sx={{
                                border: "1px solid rgba(224, 224, 224, 1)"  // Outer table border
                            }}>
                            {item.project}
                        </TableCell>
                        <TableCell align="right"
                            sx={{
                                border: "1px solid rgba(224, 224, 224, 1)"  // Outer table border
                            }}>
                            ₱ {item.totalAmount.toFixed(2)}
                        </TableCell>
                    </TableRow>
                ))}
                <TableRow>
                    <TableCell
                        sx={{
                            width: '15vh',
                            border: "1px solid rgba(224, 224, 224, 1)"  // Outer table border
                        }}>

                        <Typography fontWeight={'bold'}>
                            TOTAL EXPENSES
                        </Typography>
                    </TableCell>
                    <TableCell
                        sx={{
                            border: "1px solid rgba(224, 224, 224, 1)"  // Outer table border
                        }}>
                    </TableCell>
                    <TableCell align="right"
                        sx={{
                            border: "1px solid rgba(224, 224, 224, 1)"  // Outer table border
                        }}>
                        <Typography fontWeight={'bold'}>
                            ₱ {total.toFixed(2)}
                        </Typography>
                    </TableCell>
                </TableRow>
            </TableBody>
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

export default FinancialReport