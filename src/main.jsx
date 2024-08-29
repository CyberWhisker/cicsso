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
      <>
        <Dashboard/>
      </>
    )
  },
  {
    path: "/users",
    element: 
    (
      <>
        <Users/>
      </>
    )
  },
  {
    path: "/events",
    element: 
    (
      <>
        <Events/>
      </>
    )
  },
  {
    path: "/events/:eventId/",
    element: 
    (
      <>
        <EventDetails/>
      </>
    )
  },
  {
    path: "/attendance/:eventId/",
    element:
    (
      <>
        <Attendance/>
      </>
    ) 
  },
  {
    path: "/Transaction",
    element: 
    (
      <>
        <Transaction/>
      </>
    )
  },
  {
    path: "/projects",
    element: 
    (
      <>
        <ProjectPage/>
      </>
    )
  },
  {
    path: "/projects/:projectId",
    element: 
    (
      <>
        <ProjectDetails/>
      </>
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
