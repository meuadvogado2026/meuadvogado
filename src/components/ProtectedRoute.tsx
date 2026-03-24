import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Array<'client' | 'lawyer' | 'admin'>;
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, role, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Se não estiver logado, manda pro login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Se estiver logado, mas não tiver a permissão (role) correta
  if (allowedRoles && role && !allowedRoles.includes(role as any)) {
    if (role === 'admin') return <Navigate to="/admin" replace />;
    if (role === 'lawyer') return <Navigate to="/painel/advogado" replace />;
    return <Navigate to="/painel/cliente" replace />;
  }

  return <>{children}</>;
};