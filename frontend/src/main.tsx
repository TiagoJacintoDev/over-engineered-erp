import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ChooseCompany from './pages/choose-company/page.tsx';
import Dashboard from './pages/dashboard/page.tsx';
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
    path: '/choose-company',
    element: <ChooseCompany />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
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
