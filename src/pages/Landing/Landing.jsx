import React from 'react'
import MasterLanding from '../../layouts/MasterLanding'
import { Box } from '@mui/material'
import { AttendanceSection, ClearanceSection, FooterSection, HeroSection, PaymentSection, ProcedureSection } from './Section'

function Landing() {
    return (
        <MasterLanding>
            <Box 
            sx={{
            pt: { xs: 10, sm: 20 },
            }}
            >
                <HeroSection />
                </Box>
                <Box 
                sx={{
                pt: { xs: 5, sm: 11 },
                }}
                >
                <ProcedureSection/>
                </Box>
                <Box 
                id="attendance"
                sx={{
                pt: { xs: 5, sm: 11 },
                }}
                >
                <AttendanceSection/>
                </Box>
                <Box 
                id="payment"
                sx={{
                pt: { xs: 5, sm: 11 },
                }}
                >
                <PaymentSection/>
                </Box>
                <Box 
                id="clearance"
                sx={{
                pt: { xs: 5, sm: 11 },
                }}
                >
                <ClearanceSection/>
            </Box>
            <FooterSection/>
            
        </MasterLanding>
    )
}

export default Landing