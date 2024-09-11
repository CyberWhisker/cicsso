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
  UserAttendance
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
        {/* Admin */}
        <Route path="/dashboard" element={
          <PrivateRoute>
            {auth && auth.user.role == 'admin' ? (
              <AdminDashboard />
            ) : (
              <UserDashboard />
            )}
          </PrivateRoute>
        } />
        <Route path="/users" element={<AdminUsers />} />
        <Route path="/events" element={<AdminEvents />} />
        <Route path="/schedule/:id" element={<AdminSchedule />} />
        <Route path="/attendance/:id" element={<AdminAttendance />} />
        <Route path="/penalties" element={<AdminPenalties />} />
        <Route path="/transaction/:id" element={<AdminTransaction />} />
        <Route path="/projects" element={<AdminProject />} />
        <Route path="/item/:id" element={<AdminItem />} />
        <Route path="/collection" element={<AdminCollection />} />
        
        <Route path="/attendance" element={<UserAttendance />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
