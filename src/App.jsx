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
  UserTransaction
} from './pages';
import { useAuthContext } from './hooks/useAuthContext';
import PrivateRoute from './hooks/privateRoute';

function App() {
  const {auth} = useAuthContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={
          <PrivateRoute>
            {auth && auth.user.role == 'admin' ? (
              <AdminDashboard />
            ) : (
              <UserDashboard />
            )}
          </PrivateRoute>
        } />

        <Route path="/users" element={
          <PrivateRoute>
            {auth && auth.user.role == 'admin' ? (
              <AdminUsers />
            ) : (
              <Login />
            )}
          </PrivateRoute>
        } />

        <Route path="/events" element={
          <PrivateRoute>
            {auth && auth.user.role == 'admin' ? (
              <AdminEvents />
            ) : (
              <Login />
            )}
          </PrivateRoute>
        } />

        <Route path="/schedule/:id" element={
          <PrivateRoute>
            {auth && auth.user.role == 'admin' ? (
              <AdminSchedule />
            ) : (
              <Login />
            )}
          </PrivateRoute>
        } />

        <Route path="/attendance/:id" element={
          <PrivateRoute>
            {auth && auth.user.role == 'admin' ? (
              <AdminAttendance />
            ) : (
              <Login />
            )}
          </PrivateRoute>
        } />

        <Route path="/penalties" element={
          <PrivateRoute>
            {auth && auth.user.role == 'admin' ? (
              <AdminPenalties />
            ) : (
              <Login />
            )}
          </PrivateRoute>
        } />

        <Route path="/transaction/:id" element={
          <PrivateRoute>
            {auth && auth.user.role == 'admin' ? (
              <AdminTransaction />
            ) : (
              <Login />
            )}
          </PrivateRoute>
        } />

        <Route path="/projects" element={
          <PrivateRoute>
            {auth && auth.user.role == 'admin' ? (
              <AdminProject />
            ) : (
              <Login />
            )}
          </PrivateRoute>
        } />

        <Route path="/item/:id" element={
          <PrivateRoute>
            {auth && auth.user.role == 'admin' ? (
              <AdminItem />
            ) : (
              <Login />
            )}
          </PrivateRoute>
        } />
        
        <Route path="/collection" element={
          <PrivateRoute>
            {auth && auth.user.role == 'admin' ? (
              <AdminCollection />
            ) : (
            <UserCollection />
            )}
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
