import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../feature/layout/MainLayout';
import Login from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';


import TrainerPage from '../pages/TrainerPage';
import TrainerDetailPage from '../pages/TrainerDetailPage';
import UserPage from '../pages/UserPage';
import UserDetailPage from '../pages/UserDetailPage';
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
  { path: '/trainer/detail', element: <Layout />, children: [{ index: true, element: <TrainerDetailPage/> }] },
  { path: '/trainer', element: <Layout />, children: [{ index: true, element:<TrainerPage/> }] },
  { path: '/batch', element: <Layout />, children: [{ index: true, element: <BatchPage/> }] },
  { path: '/batch/detail', element: <Layout />, children: [{ index: true, element: <BatchDetailPage/> }] },
  { path: '/banner', element: <Layout />, children: [{ index: true, element: <BannerPage/> }] },
  { path: '/pages', element: <Layout />, children: [{ index: true, element: <PageManagementPage /> }] },
  { path: '/feedback', element: <Layout />, children: [{ index: true, element: <FeedbackPage /> }] },
  { path: '/settings', element: <Layout />, children: [{ index: true, element: <SettingsPage /> }] },
  { path: '/team/role', element: <Layout />, children: [{ index: true, element: <TeamRolePage /> }] },
  { path: '/team/list', element: <Layout />, children: [{ index: true, element: <TeamListPage /> }] },
  { path: '/setup/studio-packages', element: <Layout />, children: [{ index: true, element: <StudioPackagePage /> }] },
  { path: '/setup/program', element: <Layout />, children: [{ index: true, element: <ProgramPage /> }] },
  { path: '/setup/studio', element: <Layout />, children: [{ index: true, element: <StudioPage /> }] },
  { path: '/support/ticket', element: <Layout />, children: [{ index: true, element: <TicketPage /> }] },

]);


