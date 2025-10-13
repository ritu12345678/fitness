import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../feature/layout/MainLayout';
import Login from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';


import TrainerPage from '../pages/TrainerPage';
import TrainerDetailPage from '../pages/TrainerDetailPage';
import UserPage from '../pages/UserPage';
import UserDetailPage from '../pages/UserDetailPage';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <Layout />,
    children: [
      { index: true, element: <DashboardPage /> },
    ],
  },
  { path: '/user', element: <Layout />, children: [{ index: true, element: <UserPage /> }] },
  { path: '/user/detail', element: <Layout />, children: [{ index: true, element: <UserDetailPage/> }] },
   { path: '/trainer-detail', element: <Layout />, children: [{ index: true, element: <TrainerDetailPage/> }] },
  { path: '/trainer', element: <Layout />, children: [{ index: true, element:<TrainerPage/> }] },
  { path: '/batch', element: <Layout />, children: [{ index: true, element: <div>Batch page</div> }] },
  { path: '/banner', element: <Layout />, children: [{ index: true, element: <div>Banner Management</div> }] },
  { path: '/pages', element: <Layout />, children: [{ index: true, element: <div>Page Management</div> }] },
  { path: '/setup', element: <Layout />, children: [{ index: true, element: <div>Set Up</div> }] },
  { path: '/team', element: <Layout />, children: [{ index: true, element: <div>Team Management</div> }] },
  { path: '/support', element: <Layout />, children: [{ index: true, element: <div>Support Management</div> }] },
  { path: '/feedback', element: <Layout />, children: [{ index: true, element: <div>Feedback</div> }] },
  { path: '/settings', element: <Layout />, children: [{ index: true, element: <div>Settings</div> }] },
]);


