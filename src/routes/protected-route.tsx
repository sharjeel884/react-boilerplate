import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/modules/auth/store/auth-store';
import { Layout } from '@/shared/components/layout';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Layout>{children}</Layout>;
};

