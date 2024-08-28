import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';

const AuthRoute = ({ children }) => {
    const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            if (!isAuthenticated && !isLoading) {
                // Redirect to login page if not authenticated
                await loginWithRedirect();
            } else {
                setIsChecked(true);
            }
        };

        checkAuth();
    }, [isAuthenticated, isLoading, loginWithRedirect]);

    // Show a loading spinner or placeholder while authentication check is in progress
    if (isLoading || !isChecked) {
        return <div>Loading...</div>; // Or any loading indicator you prefer
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />; // Redirect to login page if not authenticated
    }

    return children; // Render children if authenticated
};

export default AuthRoute;
