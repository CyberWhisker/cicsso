import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';
import { Stop, Warning } from '@mui/icons-material';

const NotEnrolled = () => {
    const navigate = useNavigate();

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            bgcolor="#f5f5f5"
            px={20}
        >
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                bgcolor="#e0f7fa"
                borderRadius="50%"
                width={100}
                height={100}
                mb={2}
            >
                <Warning color="error" style={{ fontSize: 50 }} />
            </Box>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                Student not Enrolled
            </Typography>
            <Typography variant="body1" textAlign="center" mb={2}>
                We regret to inform you that our records indicate you are not currently listed in the official enrollment database. If you believe this is an error or have recently completed your enrollment, please reach out to the administration office for assistance and verification.
            </Typography>
            {/* <CheckCircleIcon color="success" style={{ fontSize: 30, marginBottom: 16 }} /> */}
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/')}
            >
                Go Back to Home
            </Button>
        </Box>
    );
};

export default NotEnrolled;
