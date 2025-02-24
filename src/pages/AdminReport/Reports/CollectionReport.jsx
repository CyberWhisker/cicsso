import {
    Box,
    Divider,
    Stack,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    MenuItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print';
import moment from 'moment';
import { Print } from '@mui/icons-material';
import { fetchCollectionBySchoolYear } from '../../../api/CollectionApi';

function CollectionReport({ selectedAY }) {
    const contentRef = useRef(null);
    const printFile = useReactToPrint({ contentRef })
    return (
        <>
            <MenuItem onClick={printFile}>
                <ListItemIcon><Print /></ListItemIcon>
                <ListItemText>Collection Report</ListItemText>
            </MenuItem>
            <Box sx={{ display: 'none' }}>
                <Layout contentRef={contentRef} selectedAY={selectedAY} />
            </Box>
        </>
    )
}

function Layout({ contentRef, selectedAY }) {
    const [rows, setRows] = useState([])
    const handleGetProject = async () => {
        if (selectedAY) {
            const { data, error } = await fetchCollectionBySchoolYear(selectedAY)
            if (!error) {
                let no = 1;
                const formattedData = data.map((item) => {
                    let amount = 0;
                    if (item.transaction.length > 0) {
                        amount = item.transaction.reduce((sum, item) => sum + item.amount, 0)
                    }
                    return ({ ...item, no: no++, totalAmount: amount })
                })
                // console.log(formattedData)
                setRows(formattedData)
            }
        }
    }

    useEffect(() => {
        handleGetProject()
    }, [selectedAY])


    return (
        <Box ref={contentRef} sx={{ p: 2 }}>
            <div style={{ pageBreakAfter: 'always' }}>
                <div id="test" style={{ fontFamily: "'Times New Roman', Times, serif", color: 'black', paddingTop: 2 }}>
                    <HeaderContent />
                    <Box sx={{ px: 5, mt: 5 }}>
                        <Stack spacing={2} sx={{ p: 2 }}>
                            <Typography
                                fontWeight={'bold'}
                                textAlign={'center'}
                                sx={{
                                    fontFamily: "'Times New Roman', Times, serif",
                                }}
                            >
                                COLLECTION LIST REPORT
                            </Typography>
                            <TableContainer component={Paper} sx={{ border: '1px solid #ddd' }}>
                                <Table>
                                    <TableHead>
                                        <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
                                            <TableCell align="center" sx={{ fontWeight: 'bold', borderRight: '1px solid #ddd' }}>No.</TableCell>
                                            <TableCell align="center" sx={{ fontWeight: 'bold', borderRight: '1px solid #ddd' }}>Collection Name</TableCell>
                                            <TableCell align="center" sx={{ fontWeight: 'bold', borderRight: '1px solid #ddd' }}>Academic Year</TableCell>
                                            <TableCell align="center" sx={{ fontWeight: 'bold', borderRight: '1px solid #ddd' }}>Fine</TableCell>
                                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Total</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <TableRow key={row._id}>
                                                <TableCell align="center" sx={{ borderRight: '1px solid #ddd' }}>{row.no}</TableCell>
                                                <TableCell align="center" sx={{ borderRight: '1px solid #ddd' }}>{row.collectionName}</TableCell>
                                                <TableCell align="center" sx={{ borderRight: '1px solid #ddd' }}>
                                                    {moment(row.startDate).format('MM/DD/YYYY')} - {moment(row.endDate).format('MM/DD/YYYY')}
                                                </TableCell>
                                                <TableCell align="center" sx={{ borderRight: '1px solid #ddd' }}>{row.fine.toFixed(2)}</TableCell>
                                                <TableCell align="center">{row.totalAmount.toFixed(2)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Stack>
                    </Box>
                </div>
            </div>
        </Box>
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

export default CollectionReport