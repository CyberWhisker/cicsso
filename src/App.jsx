import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import {
  AdminAttendance,
  AdminCollection,
  AdminDashboard,
  AdminEvents,
  AdminItem,
  Landing,
  Login,
  AdminPenalties,
  AdminProject,
  Register,
  AdminSchedule,
  AdminTransaction,
  AdminUsers,
  UserDashboard,
  UserAttendance,
  UserCollection,
  UserTransaction,
  AdminReport,
  AdminClearance,
  AdminSchoolYear,
  AdminSignatories,
  UserClearance,
  Notification
} from './pages';
import { useAuthContext } from './hooks/useAuthContext';
import PrivateRoute from './hooks/privateRoute';
import StudentClearance from './layouts/PDF/StudentClearance';
import DisbursementReport from './pages/AdminReport/Reports/DisbursementReport';
import NotVerified from './pages/NotVerified/NotVerified';
import Verify from './pages/Verify/Verify';
import { fetchUserById } from './api/userApi';
import NotEnrolled from './pages/NotEnrolled/NotEnrolled';
import CollectionReport from './pages/AdminReport/Reports/CollectionReport';
import FinancialReport from './pages/AdminReport/Reports/FinancialReport';
import ReceivableReport from './pages/AdminReport/Reports/ReceivableReport';

// Wrapper for authenticated and verified user routes
function VerifiedUserRoute({ children }) {
  const { auth } = useAuthContext();
  const [isVerified, setIsVerified] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkVerification = async () => {
      if (auth?.user) {
        try {
          const { data } = await fetchUserById(auth.user._id);
          setIsVerified(data.verified);
          setIsEnrolled(data.status)
        } catch (error) {
          console.error('Verification check failed:', error);
        }
      }
      setLoading(false);
    };
    checkVerification();
  }, [auth]);

  if (!auth) return <Navigate to="/login" replace />;
  if (loading) return <div>Loading...</div>;
  if (!isVerified) return <Navigate to="/notVerified" replace />;
  if (!isEnrolled) return <Navigate to="/notEnrolled" replace />;

  return children;
}

function App() {
  const { auth } = useAuthContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notVerified" element={<NotVerified />} />
        <Route path="/notEnrolled" element={<NotEnrolled />} />
        <Route path="/verify-email" element={<Verify />} />

        <Route path="/dashboard" element={
          <VerifiedUserRoute>
            <PrivateRoute>
              {auth && auth.user.role !== 'user' ? (
                <AdminDashboard />
              ) : (
                <UserDashboard />
              )}
            </PrivateRoute>
          </VerifiedUserRoute>
        } />

        <Route path="/users" element={
          <VerifiedUserRoute>
            <PrivateRoute>
              {auth && auth.user.role !== 'user' ? (
                <AdminUsers />
              ) : (
                <Login />
              )}
            </PrivateRoute>
          </VerifiedUserRoute>
        } />

        <Route path="/events" element={
          <VerifiedUserRoute>
            <PrivateRoute>
              {auth && auth.user.role !== 'user' ? (
                <AdminEvents />
              ) : (
                <Login />
              )}
            </PrivateRoute>
          </VerifiedUserRoute>
        } />

        <Route path="/schedule/:id" element={
          <VerifiedUserRoute>
            <PrivateRoute>
              {auth && auth.user.role !== 'user' ? (
                <AdminSchedule />
              ) : (
                <Login />
              )}
            </PrivateRoute>
          </VerifiedUserRoute>
        } />

        <Route path="/attendance/:id" element={
          <VerifiedUserRoute>
            <PrivateRoute>
              {auth && auth.user.role !== 'user' ? (
                <AdminAttendance />
              ) : (
                <Login />
              )}
            </PrivateRoute>
          </VerifiedUserRoute>
        } />

        <Route path="/penalties" element={
          <VerifiedUserRoute>
            <PrivateRoute>
              {auth && auth.user.role !== 'user' ? (
                <AdminPenalties />
              ) : (
                <Login />
              )}
            </PrivateRoute>
          </VerifiedUserRoute>
        } />

        <Route path="/transaction/:id" element={
          <VerifiedUserRoute>
            <PrivateRoute>
              {auth && auth.user.role !== 'user' ? (
                <AdminTransaction />
              ) : (
                <Login />
              )}
            </PrivateRoute>
          </VerifiedUserRoute>
        } />

        <Route path="/projects" element={
          <VerifiedUserRoute>
            <PrivateRoute>
              {auth && auth.user.role !== 'user' ? (
                <AdminProject />
              ) : (
                <Login />
              )}
            </PrivateRoute>
          </VerifiedUserRoute>
        } />

        <Route path="/item/:id" element={
          <VerifiedUserRoute>
            <PrivateRoute>
              {auth && auth.user.role !== 'user' ? (
                <AdminItem />
              ) : (
                <Login />
              )}
            </PrivateRoute>
          </VerifiedUserRoute>
        } />

        <Route path="/collection" element={
          <VerifiedUserRoute>
            <PrivateRoute>
              {auth && auth.user.role !== 'user' ? (
                <AdminCollection />
              ) : (
                <UserCollection />
              )}
            </PrivateRoute>
          </VerifiedUserRoute>
        } />

        <Route path="/report" element={
          <VerifiedUserRoute>
            <PrivateRoute>
              <AdminReport />
            </PrivateRoute>
          </VerifiedUserRoute>
        } />

        <Route path="/clearance" element={
          <VerifiedUserRoute>
            <PrivateRoute>
              <AdminClearance />
            </PrivateRoute>
          </VerifiedUserRoute>
        } />

        <Route path="/academicYear" element={
          <VerifiedUserRoute>
            <PrivateRoute>
              <AdminSchoolYear />
            </PrivateRoute>
          </VerifiedUserRoute>
        } />

        <Route path="/signatories" element={
          <VerifiedUserRoute>
            <PrivateRoute>
              <AdminSignatories />
            </PrivateRoute>
          </VerifiedUserRoute>
        } />

        <Route path="/attendance" element={
          <VerifiedUserRoute>
            <PrivateRoute>
              <UserAttendance />
            </PrivateRoute>
          </VerifiedUserRoute>
        } />

        <Route path="/transaction" element={
          <VerifiedUserRoute>
            <PrivateRoute>
              <UserTransaction />
            </PrivateRoute>
          </VerifiedUserRoute>
        } />

        <Route path="/ClearanceForm" element={
          <VerifiedUserRoute>
            <PrivateRoute>
              <StudentClearance />
            </PrivateRoute>
          </VerifiedUserRoute>
        } />

        <Route path="/userClearance" element={
          <VerifiedUserRoute>
            <PrivateRoute>
              <UserClearance />
            </PrivateRoute>
          </VerifiedUserRoute>
        } />

        <Route path="/notification" element={
          <VerifiedUserRoute>
            <PrivateRoute>
              <Notification />
            </PrivateRoute>
          </VerifiedUserRoute>
        } />

        <Route path="/disbursementLayout" element={
          <VerifiedUserRoute>
            <DisbursementReport />
          </VerifiedUserRoute>
        } />

        <Route path="/collectionLayout" element={
          <VerifiedUserRoute>
            <CollectionReport />
          </VerifiedUserRoute>
        } />
        <Route path="/financialLayout" element={
          <VerifiedUserRoute>
            <FinancialReport />
          </VerifiedUserRoute>
        } />
        <Route path="/receivableLayout" element={
          <VerifiedUserRoute>
            <ReceivableReport />
          </VerifiedUserRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
