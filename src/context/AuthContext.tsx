import React, { createContext, useCallback, useState } from 'react';

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
}

export const AuthContext = createContext<ContextShape>({} as ContextShape);

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

  return (
    <AuthContext.Provider value={{ user: data.user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};