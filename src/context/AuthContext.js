
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Initialize user state from localStorage if token exists
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    const initialUser = token ? { email: localStorage.getItem('userEmail') } : null;
    console.log('Initial user state:', initialUser);
    return initialUser;
  });
  const [error, setError] = useState(null);

  // Login handler - authenticates user and stores token
  const login = async (credentials) => {
    try {
      // Make API request to login endpoint
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();
      
      // Handle unsuccessful login
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Only set user state if we received a valid token
      if (data.token) {
        const userObj = {
          email: credentials.email,
          id: data.userId || data.user?.id
        };
        
        // Store auth data in localStorage and state
        localStorage.setItem('token', data.token);
        localStorage.setItem('userEmail', credentials.email);
        setUser(userObj);
      } else {
        throw new Error('Invalid login response');
      }
      return data;
    } catch (err) {
      setError(err.message);
      throw new Error(err.message);
    }
  };

  // Signup handler - creates new user and logs them in
  const signup = async (credentials) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      // Store user data and token after successful signup
      setUser(data.user);
      localStorage.setItem('token', data.token);
      return data;
    } catch (err) {
      setError(err.message);
      throw new Error(err.message);
    }
  };

  // Logout handler - clears auth state
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
