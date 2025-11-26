import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { apiClient, setAuthToken } from '@/lib/api';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [initialising, setInitialising] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      setInitialising(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const { data } = await apiClient.get('/auth/me');
        setUser(data.user);
      } catch (error) {
        console.error('Failed to load profile', error);
        setAuthToken(null);
        setUser(null);
      } finally {
        setInitialising(false);
      }
    };

    fetchProfile();
  }, []);

  const login = async ({ email, password }) => {
    const { data } = await apiClient.post('/auth/login', { email, password });
    setAuthToken(data.token);
    setUser(data.user);
    return data.user;
  };

  const register = async ({ username, email, password, isCounselor }) => {
    const { data } = await apiClient.post('/auth/register', {
      username,
      email,
      password,
      isCounselor,
    });
    setAuthToken(data.token);
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
      loading: initialising,
    }),
    [user, initialising]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);

  if (ctx === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return ctx;
};

