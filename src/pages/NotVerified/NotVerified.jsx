import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';

const NotVerified = () => {
    const navigate = useNavigate();

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            bgcolor="#f5f5f5"
            px={2}
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
                <EmailIcon color="primary" style={{ fontSize: 50 }} />
            </Box>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                Verification Link Sent!
            </Typography>
            <Typography variant="body1" textAlign="center" mb={2}>
                We've sent a verification link to your email. Please check your inbox and follow the instructions to verify your account.
            </Typography>
            <CheckCircleIcon color="success" style={{ fontSize: 30, marginBottom: 16 }} />
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

export default NotVerified;
