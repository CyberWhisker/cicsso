import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Login, Register } from './pages/Auth'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { Attendance, Dashboard, EventDetails, Events } from './pages/index.jsx';

// if user is login
const user = true;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "login",
    element: <Login/>
  },
  {
    path: "register",
    element: <Register/>
  },
  {
    path: "/dashboard",
    element: <Dashboard/>
  },
  {
    path: "/events",
    element: <Events/>
  },
  {
    path: "/events/:eventId/",
    element: <EventDetails/>
  },
  {
    path: "/attendance/:eventId/",
    element: <Attendance/>
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
