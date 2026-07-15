"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '@/lib/api-client';

interface Admin {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  admin: Admin | null;
  isLoading: boolean;
  login: (tokens: { access_token: string; refresh_token: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if token exists on mount and fetch user
    const initAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          // Attach token to request
          apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const response = await apiClient.get('/auth/me');
          setAdmin(response.data.data);
        } catch (error) {
          console.error("Failed to fetch admin profile", error);
          logout();
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = (tokens: { access_token: string; refresh_token: string }) => {
    localStorage.setItem('access_token', tokens.access_token);
    localStorage.setItem('refresh_token', tokens.refresh_token);
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${tokens.access_token}`;
    
    // Fetch profile immediately after login
    apiClient.get('/auth/me')
      .then(response => {
        setAdmin(response.data.data);
      })
      .catch(() => {
        logout();
      });
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    delete apiClient.defaults.headers.common['Authorization'];
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, isLoading, login, logout }}>
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
