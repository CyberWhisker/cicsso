import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { Attendance, Dashboard, EventDetails, Events, ProjectDetails, ProjectPage, Transaction, Users } from './pages/index.jsx';
import Auth0Context from './context/Auth0Context.jsx';
import AuthRoute from './components/AuthRoute.jsx';

// if user is login
const user = true;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/dashboard",
    element: 
    (
      <AuthRoute>
        <Dashboard/>
      </AuthRoute>
    )
  },
  {
    path: "/users",
    element: 
    (
      <AuthRoute>
        <Users/>
      </AuthRoute>
    )
  },
  {
    path: "/events",
    element: 
    (
      <AuthRoute>
        <Events/>
      </AuthRoute>
    )
  },
  {
    path: "/events/:eventId/",
    element: 
    (
      <AuthRoute>
        <EventDetails/>
      </AuthRoute>
    )
  },
  {
    path: "/attendance/:eventId/",
    element:
    (
      <AuthRoute>
        <Attendance/>
      </AuthRoute>
    ) 
  },
  {
    path: "/Transaction",
    element: 
    (
      <AuthRoute>
        <Transaction/>
      </AuthRoute>
    )
  },
  {
    path: "/projects",
    element: 
    (
      <AuthRoute>
        <ProjectPage/>
      </AuthRoute>
    )
  },
  {
    path: "/projects/:projectId",
    element: 
    (
      <AuthRoute>
        <ProjectDetails/>
      </AuthRoute>
    )
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Context>
      <RouterProvider router={router} />
    </Auth0Context>
  </React.StrictMode>,
)
