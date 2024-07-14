import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Login, Register } from './pages/Auth'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { UserDashboard } from './pages/User/index.jsx';

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
    path: "/user",
    element: <UserDashboard/>
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
