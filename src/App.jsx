import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { 
  Attendance, 
  Dashboard, 
  Events, 
  Landing, 
  Login, 
  Penalties, 
  ProjectDetails, 
  ProjectPage, 
  Register, 
  Schedule, 
  Transaction, 
  Users 
} from './pages';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const {user} = useAuthContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/events" element={<Events />} />
        <Route path="/schedule/:id" element={<Schedule />} />
        <Route path="/attendance/:id" element={<Attendance />} />
        <Route path="/penalties" element={<Penalties />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/projects/:projectId" element={<ProjectDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
