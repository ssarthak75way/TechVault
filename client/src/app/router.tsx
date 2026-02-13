import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// Lazy load components for code splitting
const Login = lazy(() => import('../modules/auth/Login'));
const Register = lazy(() => import('../modules/auth/Register'));
const AuthGuard = lazy(() => import('../modules/auth/AuthGuard'));
const AppLayout = lazy(() => import('../layouts/AppLayout'));
const Dashboard = lazy(() => import('../modules/dashboard/Dashboard'));
const AssetList = lazy(() => import('../modules/assets/AssetList'));
const AssetCreate = lazy(() => import('../modules/assets/AssetCreate'));
const RequestList = lazy(() => import('../modules/requests/RequestList'));

export const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/',
        element: <AuthGuard />,
        children: [
            {
                path: '/',
                element: <Navigate to="/dashboard" replace />,
            },
            {
                path: 'dashboard',
                element: <AppLayout />,
                children: [
                    {
                        index: true,
                        element: <Dashboard />,
                    },
                    {
                        path: 'assets',
                        element: <AssetList />,
                    },
                    {
                        path: 'assets/create',
                        element: <AssetCreate />,
                    },
                    {
                        path: 'requests',
                        element: <RequestList />,
                    },
                ],
            },
        ],
    },
]);
