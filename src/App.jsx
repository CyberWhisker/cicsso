import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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

function App() {
  const { auth } = useAuthContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={
          <PrivateRoute>
            {auth && auth.user.role != 'user' ? (
              <AdminDashboard />
            ) : (
              <UserDashboard />
            )}
          </PrivateRoute>
        } />

        <Route path="/users" element={
          <PrivateRoute>
            {auth && auth.user.role != 'user' ? (
              <AdminUsers />
            ) : (
              <Login />
            )}
          </PrivateRoute>
        } />

        <Route path="/events" element={
          <PrivateRoute>
            {auth && auth.user.role != 'user' ? (
              <AdminEvents />
            ) : (
              <Login />
            )}
          </PrivateRoute>
        } />

        <Route path="/schedule/:id" element={
          <PrivateRoute>
            {auth && auth.user.role != 'user' ? (
              <AdminSchedule />
            ) : (
              <Login />
            )}
          </PrivateRoute>
        } />

        <Route path="/attendance/:id" element={
          <PrivateRoute>
            {auth && auth.user.role != 'user' ? (
              <AdminAttendance />
            ) : (
              <Login />
            )}
          </PrivateRoute>
        } />

        <Route path="/penalties" element={
          <PrivateRoute>
            {auth && auth.user.role != 'user' ? (
              <AdminPenalties />
            ) : (
              <Login />
            )}
          </PrivateRoute>
        } />

        <Route path="/transaction/:id" element={
          <PrivateRoute>
            {auth && auth.user.role != 'user' ? (
              <AdminTransaction />
            ) : (
              <Login />
            )}
          </PrivateRoute>
        } />

        <Route path="/projects" element={
          <PrivateRoute>
            {auth && auth.user.role != 'user' ? (
              <AdminProject />
            ) : (
              <Login />
            )}
          </PrivateRoute>
        } />

        <Route path="/item/:id" element={
          <PrivateRoute>
            {auth && auth.user.role != 'user' ? (
              <AdminItem />
            ) : (
              <Login />
            )}
          </PrivateRoute>
        } />

        <Route path="/collection" element={
          <PrivateRoute>
            {auth && auth.user.role != 'user' ? (
              <AdminCollection />
            ) : (
              <UserCollection />
            )}
          </PrivateRoute>
        } />

        <Route path="/report" element={
          <PrivateRoute>
            <AdminReport />
          </PrivateRoute>
        } />

        <Route path="/clearance" element={
          <PrivateRoute>
            <AdminClearance />
          </PrivateRoute>
        } />

        <Route path="/academicYear" element={
          <PrivateRoute>
            <AdminSchoolYear />
          </PrivateRoute>
        } />

        <Route path="/signatories" element={
          <PrivateRoute>
            <AdminSignatories />
          </PrivateRoute>
        } />

        <Route path="/attendance" element={
          <PrivateRoute>
            <UserAttendance />
          </PrivateRoute>
        } />

        <Route path="/transaction" element={
          <PrivateRoute>
            <UserTransaction />
          </PrivateRoute>
        } />

        <Route path="/ClearanceForm" element={
          <PrivateRoute>
            <StudentClearance />
          </PrivateRoute>
        } />

        <Route path="/userClearance" element={
          <PrivateRoute>
            <UserClearance />
          </PrivateRoute>
        } />

        <Route path="/notification" element={
          <PrivateRoute>
            <Notification />
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
