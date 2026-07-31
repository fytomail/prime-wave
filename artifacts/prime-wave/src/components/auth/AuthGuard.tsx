import { ReactNode, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface AuthGuardProps {
  children: ReactNode;
  allowedRoles?: string[];
}

export function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated || !user) {
      setLocation('/login');
      return;
    }

    if (allowedRoles && allowedRoles.length > 0) {
      const userRole = (user.role || '').toLowerCase();
      const isAllowed = allowedRoles.some((r) => {
        const target = r.toLowerCase();
        if (target === userRole) return true;
        if (target === 'student' && (userRole === 'student' || userRole === 'student_user' || !userRole)) return true;
        if ((target === 'company' || target === 'company_hr') && (userRole.includes('company') || userRole.includes('hr'))) return true;
        if (target === 'admin' && userRole.includes('admin')) return true;
        return false;
      });

      if (!isAllowed) {
        if (userRole.includes('admin')) setLocation('/admin');
        else if (userRole.includes('hr') || userRole.includes('company')) setLocation('/hr/dashboard');
        else setLocation('/dashboard');
      }
    }
  }, [isLoading, isAuthenticated, user, allowedRoles, setLocation]);

  if (isLoading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = (user.role || '').toLowerCase();
    const isAllowed = allowedRoles.some((r) => {
      const target = r.toLowerCase();
      if (target === userRole) return true;
      if (target === 'student' && (userRole === 'student' || userRole === 'student_user' || !userRole)) return true;
      if ((target === 'company' || target === 'company_hr') && (userRole.includes('company') || userRole.includes('hr'))) return true;
      if (target === 'admin' && userRole.includes('admin')) return true;
      return false;
    });

    if (!isAllowed) return null;
  }

  return <>{children}</>;
}
