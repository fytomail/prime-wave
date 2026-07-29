import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Types, getProfile } from '@workspace/api-client-react';

interface AuthContextType {
  user: Types.User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: Types.User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Types.User | null>(() => {
    try {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(() => !localStorage.getItem('access_token') && !localStorage.getItem('user') ? false : true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setIsLoading(false);
      return;
    }

    // Verify token and fetch profile in background
    getProfile()
      .then((res: any) => {
        if (res.success && res.data?.user) {
          setUser(res.data.user);
          localStorage.setItem('user', JSON.stringify(res.data.user));
        } else if (res.data?.user) {
          setUser(res.data.user);
          localStorage.setItem('user', JSON.stringify(res.data.user));
        }
      })
      .catch((err) => {
        console.warn('Profile fetch failed, using cached user if available:', err);
        // Only clear if 401 / invalid token explicitly
        if (err?.status === 401 || err?.statusCode === 401) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('user');
          setUser(null);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const login = (token: string, userData: Types.User) => {
    localStorage.setItem('access_token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
