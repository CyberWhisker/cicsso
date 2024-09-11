import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { 
  Attendance, 
  Collection, 
  Dashboard, 
  Events, 
  Item, 
  Landing, 
  Login, 
  Penalties, 
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
        <Route path="/transaction/:id" element={<Transaction />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/item/:id" element={<Item />} />
        <Route path="/collection" element={<Collection />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
