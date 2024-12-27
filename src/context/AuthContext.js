import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    return token ? { email: localStorage.getItem('userEmail') } : null;
  });
  const [error, setError] = useState(null);

  const login = async (credentials) => {
    try {
      const response = await fetch('http://0.0.0.0:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();
      console.log('Login response:', data);
      
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Create user object with email and ensure we have valid data
      if (data.token) {
        const userObj = {
          email: credentials.email,
          id: data.userId || data.user?.id
        };
        
        setUser(userObj);
        localStorage.setItem('token', data.token);
        localStorage.setItem('userEmail', credentials.email);
      } else {
        throw new Error('Invalid login response');
      }
      return data;
    } catch (err) {
      console.error('Signup failed:', err);
      const errorMessage = err.message || 'Failed to create account';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const signup = async (credentials) => {
    try {
      console.log('Sending signup request:', credentials);
      const response = await fetch('http://0.0.0.0:3001/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(credentials)
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);
      
      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      setUser(data.user);
      localStorage.setItem('token', data.token);
      return data;
    } catch (err) {
      console.error('Signup failed:', err);
      const errorMessage = err.message || 'Failed to create account';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ user, error, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);