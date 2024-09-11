import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from './useAuthContext';

const PrivateRoute = ({ children }) => {
  const { auth } = useAuthContext();
  console.log(auth)
  // If not authenticated, redirect to login
  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render the protected component
  return children;
};

export default PrivateRoute;
