import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../feature/layout/MainLayout';
import Login from '../pages/LoginPage';
import ForgotPassword from '../feature/layout/authLayout/ForgotPassword';
import ResetPassword from '../feature/layout/authLayout/ResetPassword';
import DashboardPage from '../pages/DashboardPage';
import ProtectedRoute from '../components/ProtectedRoute';


import TrainerPage from '../pages/TrainerPage';
import TrainerDetailPage from '../pages/TrainerDetailPage';
import UserPage from '../pages/UserPage';
import UserDetailPage from '../feature/user/userDetail';
import BatchPage from '../pages/BatchPage';
import BatchDetailPage from '../pages/BatchDetailPage';
import BannerPage from '../pages/BannerPage';
import PageManagementPage from '../pages/PageManagementPage';
import FeedbackPage from '../pages/FeedbackPage';
import SettingsPage from '../pages/SettingsPage';
import TeamRolePage from '../pages/TeamRolePage';
import TeamListPage from '../pages/TeamListPage';
import StudioPackagePage from '../pages/StudioPackagePage';
import ProgramPage from '../pages/ProgramPage';
import StudioPage from '../pages/StudioPage';
import TicketPage from '../pages/TicketPage';
import FaqPage from '../pages/FaqPage';
import DeleteRequestPage from '../pages/DeleteRequestPage';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
    ],
  },
  { path: '/user', element: <ProtectedRoute><Layout /></ProtectedRoute>, children: [{ index: true, element: <UserPage /> }] },
  { path: '/user/:userId', element: <ProtectedRoute><Layout /></ProtectedRoute>, children: [{ index: true, element: <UserDetailPage /> }] },
  { path: '/trainer/detail/:userId', element: <ProtectedRoute><Layout /></ProtectedRoute>, children: [{ index: true, element: <TrainerDetailPage /> }] },
  { path: '/trainer', element: <ProtectedRoute><Layout /></ProtectedRoute>, children: [{ index: true, element: <TrainerPage /> }] },
  { path: '/batch', element: <ProtectedRoute><Layout /></ProtectedRoute>, children: [{ index: true, element: <BatchPage /> }] },
  { path: '/batch/detail/:batchId', element: <ProtectedRoute><Layout /></ProtectedRoute>, children: [{ index: true, element: <BatchDetailPage /> }] },
  { path: '/banner', element: <ProtectedRoute><Layout /></ProtectedRoute>, children: [{ index: true, element: <BannerPage /> }] },
  { path: '/pages', element: <ProtectedRoute><Layout /></ProtectedRoute>, children: [{ index: true, element: <PageManagementPage /> }] },
  { path: '/feedback', element: <ProtectedRoute><Layout /></ProtectedRoute>, children: [{ index: true, element: <FeedbackPage /> }] },
  { path: '/settings', element: <ProtectedRoute><Layout /></ProtectedRoute>, children: [{ index: true, element: <SettingsPage /> }] },
  { path: '/team/role', element: <ProtectedRoute><Layout /></ProtectedRoute>, children: [{ index: true, element: <TeamRolePage /> }] },
  { path: '/team/list', element: <ProtectedRoute><Layout /></ProtectedRoute>, children: [{ index: true, element: <TeamListPage /> }] },
  { path: '/setup/studio-packages', element: <ProtectedRoute><Layout /></ProtectedRoute>, children: [{ index: true, element: <StudioPackagePage /> }] },
  { path: '/setup/program', element: <ProtectedRoute><Layout /></ProtectedRoute>, children: [{ index: true, element: <ProgramPage /> }] },
  { path: '/setup/studio', element: <ProtectedRoute><Layout /></ProtectedRoute>, children: [{ index: true, element: <StudioPage /> }] },
  { path: '/support/ticket', element: <ProtectedRoute><Layout /></ProtectedRoute>, children: [{ index: true, element: <TicketPage /> }] },
  { path: '/support/faq', element: <ProtectedRoute><Layout /></ProtectedRoute>, children: [{ index: true, element: <FaqPage /> }] },
  { path: '/support/delete-request', element: <ProtectedRoute><Layout /></ProtectedRoute>, children: [{ index: true, element: <DeleteRequestPage /> }] },

]);


