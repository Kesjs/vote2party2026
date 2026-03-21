'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type UserContextType = {
  user: any | null;
  login: (userData: any) => void;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<UserContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isLoading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check localStorage on mount
    const storedUser = localStorage.getItem('vote_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse user session');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userData: any) => {
    setUser(userData);
    localStorage.setItem('vote_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vote_user');
    router.push('/connexion');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
