import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CircularProgress, Typography, Box, Button } from '@mui/material';
import { CheckCircle, ErrorOutline } from '@mui/icons-material';
import { toast } from 'react-toastify';

const Verify = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const userId = searchParams.get('userId');
    const [status, setStatus] = useState('loading'); // 'loading', 'success', or 'error'

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await fetch(`https://cicsso-backend.onrender.com/api/user/verify?token=${token}&userId=${userId}`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Failed to verify email.');
                }

                setStatus('success');
                toast.success('Email verified successfully!');
            } catch (error) {
                setStatus('error');
                toast.error(error.message);
            }
        };

        verifyEmail();
    }, [token, userId]);

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
            {status === 'loading' && (
                <>
                    <CircularProgress />
                    <Typography variant="h6" mt={2}>
                        Verifying your email...
                    </Typography>
                </>
            )}
            {status === 'success' && (
                <>
                    <CheckCircle color="success" fontSize="large" />
                    <Typography variant="h5" mt={2}>
                        Email Verified!
                    </Typography>
                    <Button href="/" variant="contained" color="primary" sx={{ mt: 2 }}>
                        Go to Home
                    </Button>
                </>
            )}
            {status === 'error' && (
                <>
                    <ErrorOutline color="error" fontSize="large" />
                    <Typography variant="h5" mt={2}>
                        Email Verification Failed
                    </Typography>
                    <Button href="/" variant="contained" color="primary" sx={{ mt: 2 }}>
                        Go to Home
                    </Button>
                </>
            )}
        </Box>
    );
};

export default Verify;
