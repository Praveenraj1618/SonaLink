import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from './types';
import { mockUser } from './mock-data';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for stored auth on mount
    const storedAuth = localStorage.getItem('sonalink_auth');
    if (storedAuth) {
      const parsedAuth = JSON.parse(storedAuth);
      setUser(parsedAuth.user);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simulate successful login
    const userData = { ...mockUser, email };
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('sonalink_auth', JSON.stringify({ user: userData }));
  };

  const signup = async (name: string, email: string, password: string) => {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simulate successful signup
    const userData = { ...mockUser, name, email };
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('sonalink_auth', JSON.stringify({ user: userData }));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('sonalink_auth');
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('sonalink_auth', JSON.stringify({ user: updatedUser }));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout, updateUser }}>
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
