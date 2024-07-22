import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Dashboard from './pages/dashboard/page.tsx';
import EditUser from './pages/dashboard/users/[userId]/page.tsx';
import CreateUser from './pages/dashboard/users/new/page.tsx';
import UsersList from './pages/dashboard/users/page.tsx';
import Login from './pages/login/page.tsx';
import Signup from './pages/signup/page.tsx';

const router = createBrowserRouter([
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/dashboard',
    children: [
      {
        path: '',
        element: <Dashboard />,
      },
      {
        path: 'users',
        children: [
          {
            path: '',
            element: <UsersList />,
          },
          {
            path: 'new',
            element: <CreateUser />,
          },
          {
            path: ':userId',
            element: <EditUser />,
          },
        ],
      },
    ],
  },
]);

export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
