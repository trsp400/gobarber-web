import React, { createContext, useCallback, useContext, useState } from 'react';

import UserInterface from '../interfaces/User';
import api from '../services/api';

interface Credentials {
  email: string;
  password: string;
}

interface AuthState {
  token: string;
  user: UserInterface;
}

interface ContextShape {
  user: UserInterface;
  signIn(credentials: Credentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<ContextShape>({} as ContextShape);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber-token');
    const user = localStorage.getItem('@GoBarber-user');

    if (token && user) return { token, user: JSON.parse(user) };

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@GoBarber-token', token);
    localStorage.setItem('@GoBarber-user', JSON.stringify(user));

    setData({ token, user });

    return response.data;
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber-token');
    localStorage.removeItem('@GoBarber-user');
    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): ContextShape {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
