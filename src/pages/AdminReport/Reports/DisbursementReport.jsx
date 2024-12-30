import {
    Box,
    Button,
    Card,
    Divider,
    Grid,
    Stack,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print';
import moment from 'moment';
import { fetchCollectionWithTransactionBySchoolYear } from '../../../api/CollectionApi';
import { fetchProjectBySchoolYear } from '../../../api/ProjectApi';
import { PieChart } from '@mui/x-charts';

function DisbursementReport({ selectedAY }) {
    const contentRef = useRef(null);
    const printFile = useReactToPrint({ contentRef })

    return (
        <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 1 }}>
                <Typography variant='h5' fontWeight={'bold'}>Financial & Disbursement Report</Typography>
            </Box>
            <Box sx={{ p: 1, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Stack spacing={2} sx={{ width: '100%' }}>
                    <Button variant='contained' onClick={printFile} fullWidth>Print</Button>
                </Stack>
            </Box>
            <Box sx={{ display: 'none' }}>
                <Layout contentRef={contentRef} selectedAY={selectedAY} />
            </Box>
        </Card>
    )
}

function Layout({ contentRef, selectedAY }) {

    return (
        <Box ref={contentRef} sx={{ p: 2 }}>
            <div style={{ pageBreakAfter: 'always' }}>
                <div id="test" style={{ fontFamily: "'Times New Roman', Times, serif", color: 'black' }}>
                    <HeaderContent />
                    <Box sx={{ px: 5, mt: 10 }}>
                        <FinanceReport selectedAY={selectedAY} />
                    </Box>
                </div>
            </div>
            <div style={{ pageBreakAfter: 'always' }}>
                <div id="test" style={{ fontFamily: "'Times New Roman', Times, serif", color: 'black', paddingTop: 2 }}>
                    <HeaderContent />
                    <Box sx={{ px: 5, mt: 5 }}>
                        <DisbursementRecord selectedAY={selectedAY} />
                    </Box>
                </div>
            </div>
            <div style={{ pageBreakAfter: 'always' }}>
                <div id="test" style={{ fontFamily: "'Times New Roman', Times, serif", color: 'black', paddingTop: 2 }}>
                    <HeaderContent />
                    <Box sx={{ px: 5, mt: 5 }}>
                        <GraphReport selectedAY={selectedAY} />
                    </Box>
                </div>
            </div>
        </Box>
    )
}

function FinanceReport({ selectedAY }) {
    const [collection, setCollection] = useState([])
    const [totalCollection, setTotalCollection] = useState(0)
    const [project, setProject] = useState([])
    const [totalProject, setTotalProject] = useState(0)

    const handleGetCollection = async () => {
        if (selectedAY) {
            const { data, error } = await fetchCollectionWithTransactionBySchoolYear(selectedAY)
            if (!error) {
                let total = 0
                const newGraphData = data.map((item) => {
                    const totalAmount = item.transaction.reduce((sum, transaction) => sum + transaction.amount, 0);
                    total += totalAmount
                    return {
                        id: item._id,
                        label: item.collectionName,
                        value: totalAmount,
                    };
                });
                setTotalCollection(total)
                setCollection(newGraphData);
            }
        }
    }

    const handleGetProject = async () => {
        if (selectedAY) {
            const { data, error } = await fetchProjectBySchoolYear(selectedAY)
            if (!error) {
                let total = 0
                const projectData = data.map((item) => {
                    const totalItem = item.items.reduce((sum, item) => sum + (item.amount * item.quantity), 0)
                    total += totalItem
                    return {
                        label: item.project,
                        value: totalItem
                    }
                })
                setTotalProject(total)
                setProject(projectData)
            }
        }
    }

    useEffect(() => {
        handleGetCollection()
        handleGetProject()
    }, [selectedAY])
    return (
        <Stack spacing={2}>
            <Stack spacing={2}>
                <Typography
                    fontWeight={'bold'}
                    sx={{
                        fontFamily: "'Times New Roman', Times, serif",
                    }}
                >
                    Overview
                </Typography>

                <Typography
                    fontWeight={'bold'}
                    sx={{
                        fontFamily: "'Times New Roman', Times, serif",
                    }}
                > The purpose of this department budget statement is to provide a detailed breakdown of the financial resources allocated to the department for the specified budget period. This statement outlines the estimated revenues, expenses, and financial goals of the department to ensure effitive financial management and transpanrency
                </Typography>

                <Typography
                    fontWeight={'bold'}
                    textAlign={'center'}
                    sx={{
                        fontFamily: "'Times New Roman', Times, serif",
                    }}
                >STATEMENT OF FINANCIAL PERFORMANCE
                </Typography>
                <Typography
                    textAlign={'center'}
                    sx={{
                        fontFamily: "'Times New Roman', Times, serif",
                    }}
                >Semester
                </Typography>
            </Stack>

            <Stack spacing={1}>
                <Typography
                    fontWeight={'bold'}
                    sx={{
                        fontFamily: "'Times New Roman', Times, serif",
                    }}
                >REVENUE
                </Typography>
                {collection.map((item, index) => (
                    <Grid key={index} container>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}>
                            {item.label}
                        </Grid>
                        <Grid item xs={4}>
                            {item.value.toFixed(2)}
                        </Grid>
                    </Grid>
                ))}
                <Grid container>
                    <Grid item xs={4}>
                        <Typography
                            fontWeight={'bold'}
                            sx={{
                                fontFamily: "'Times New Roman', Times, serif",
                            }}
                        >TOTAL REVENUE
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>

                    </Grid>
                    <Grid item xs={2}>
                        <Divider />
                        {totalCollection.toFixed(2)}
                    </Grid>
                </Grid>
            </Stack>

            <Stack spacing={1}>
                <Typography
                    fontWeight={'bold'}
                    sx={{
                        fontFamily: "'Times New Roman', Times, serif",
                    }}
                >LESS: EXPENSES
                </Typography>
                {project.map((item, index) => (
                    <Grid key={index} container>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}>
                            {item.label}
                        </Grid>
                        <Grid item xs={4}>
                            {item.value.toFixed(2)}
                        </Grid>
                    </Grid>
                ))}
                <Grid container>
                    <Grid item xs={4}>
                        <Typography
                            fontWeight={'bold'}
                            sx={{
                                fontFamily: "'Times New Roman', Times, serif",
                            }}
                        >TOTAL EXPENSES
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>

                    </Grid>
                    <Grid item xs={2}>
                        <Divider />
                        {totalProject.toFixed(2)}
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item xs={4}>
                        <Typography
                            fontWeight={'bold'}
                            sx={{
                                fontFamily: "'Times New Roman', Times, serif",
                            }}
                        >REMAINING FUNDS
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>

                    </Grid>
                    <Grid item xs={2}>
                        <Divider />
                        {(totalCollection.toFixed(2) - totalProject.toFixed(2)).toFixed(2)}
                    </Grid>
                </Grid>
            </Stack>
        </Stack>
    )
}

function DisbursementRecord({ selectedAY }) {

    const [rows, setRows] = useState([])

    const handleGetProject = async () => {
        if (selectedAY) {
            const { data, error } = await fetchProjectBySchoolYear(selectedAY)
            if (!error) {
                let total = 0
                let count = 0;
                const projectData = data.map((item) => {
                    count++
                    const totalItem = item.items.reduce((sum, item) => sum + (item.amount * item.quantity), 0)
                    total += totalItem
                    return {
                        no: count,
                        date: moment(item.createdAt).format('DD/MM/YYYY'),
                        particulars: item.project,
                        account: "Expenses",
                        amount: totalItem
                    }
                })
                setRows(projectData)
            }
        }
    }



    useEffect(() => {
        handleGetProject()
    }, [selectedAY])

    return (
        <Stack spacing={2} sx={{ p: 2 }}>
            <Typography
                fontWeight={'bold'}
                textAlign={'center'}
                sx={{
                    fontFamily: "'Times New Roman', Times, serif",
                }}
            >CASH DISBURSEMENT REPORT
            </Typography>
            <TableContainer component={Paper} sx={{ border: '1px solid #ddd' }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
                            <TableCell align="center" sx={{ fontWeight: 'bold', borderRight: '1px solid #ddd' }}>No.</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', borderRight: '1px solid #ddd' }}>Date</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', borderRight: '1px solid #ddd' }}>Particulars</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', borderRight: '1px solid #ddd' }}>Account</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.no}>
                                <TableCell align="center" sx={{ borderRight: '1px solid #ddd' }}>{row.no}</TableCell>
                                <TableCell align="center" sx={{ borderRight: '1px solid #ddd' }}>{row.date}</TableCell>
                                <TableCell align="center" sx={{ borderRight: '1px solid #ddd' }}>{row.particulars}</TableCell>
                                <TableCell align="center" sx={{ borderRight: '1px solid #ddd' }}>{row.account}</TableCell>
                                <TableCell align="center">{row.amount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
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

function GraphReport({ selectedAY }) {

    const [graphData, setGraphData] = useState([])

    const handleGetProject = async () => {
        if (selectedAY) {
            const { data, error } = await fetchProjectBySchoolYear(selectedAY)
            if (!error) {
                let total = 0
                let count = 0;
                const projectData = data.map((item) => {
                    count++
                    const totalItem = item.items.reduce((sum, item) => sum + (item.amount * item.quantity), 0)
                    total += totalItem
                    return {
                        label: item.project,
                        value: totalItem
                    }
                })
                setGraphData(projectData)
            }
        }
    }

    useEffect(() => {
        handleGetProject()
    }, [selectedAY])

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography
                fontWeight={'bold'}
                textAlign={'center'}
                sx={{
                    fontFamily: "'Times New Roman', Times, serif",
                }}
            >BUDGET ALLOCATION
            </Typography>
            <PieChart
                series={[{ data: graphData, innerRadius: 20, outerRadius: 230 }]}
                // colors={colors}
                width={500}
                height={700}
                margin={{ right: 0, top: 0 }}
                slotProps={{
                    legend: {
                        labelStyle: {
                            tableLayout: 'fixed',
                        },
                        direction: 'row',
                        position: {
                            horizontal: 'middle',
                            vertical: 'bottom',
                        },
                    },
                }}
                sx={{}}
            />
        </Box>
    )
}

export default DisbursementReport