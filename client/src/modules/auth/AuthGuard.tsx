import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore, type UserRole } from '../../app/store';

interface AuthGuardProps {
    allowedRoles?: UserRole[];
}

export default function AuthGuard({ allowedRoles }: AuthGuardProps) {
    const { isAuthenticated, user } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
}
