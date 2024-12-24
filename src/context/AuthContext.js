
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    try {
      const res = await fetch('https://venture-associate.bf4f9ef4-d20e-442f-9fb7-9fec72d5f47a-00-zorraerlixil.spock.replit.dev/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        credentials: 'include'
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      
      localStorage.setItem('token', data.token);
      setUser(data.user);
      return data;
    } catch (err) {
      console.error('Login error:', err);
      throw err;
    }
  };

  const signup = async (credentials) => {
    try {
      const res = await fetch('https://venture-associate.bf4f9ef4-d20e-442f-9fb7-9fec72d5f47a-00-zorraerlixil.spock.replit.dev/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        credentials: 'include'
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Signup failed');
      
      localStorage.setItem('token', data.token);
      setUser(data.user);
      return data;
    } catch (err) {
      console.error('Signup error:', err);
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
