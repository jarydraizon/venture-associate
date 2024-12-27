import React, { useState } from 'react';
import Navbar from './components/Navbar';
import AuthForm from './components/AuthForm';
import VentureForm from './components/VentureForm'; // Importing the VentureForm
import { AuthProvider, useAuth } from './context/AuthContext';

function MainContent() {
  const { user, login, signup } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  
  console.log('MainContent rendered, user state:', user);
  console.log('Local Storage token:', localStorage.getItem('token'));

  const handleSubmit = async (credentials) => {
    try {
      if (isLogin) {
        const response = await login(credentials);
        console.log('Login success:', response);
      } else {
        await signup(credentials);
      }
    } catch (error) {
      console.error('Auth error:', error);
      alert(error.message);
    }
  };

  console.log("User state:", user);

  if (!user) {
    return (
      <main className="container">
        <div className="auth-container">
          <h1>{isLogin ? 'Sign In' : 'Sign Up'}</h1>
          <AuthForm onSubmit={handleSubmit} isLogin={isLogin} />
          <button 
            className="switch-auth" 
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Need an account? Sign up' : 'Have an account? Sign in'}
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="container">
      <div className="main-content">
        <h1>Welcome to Voogle</h1>
        <p>Your AI-powered venture analysis assistant</p>
        <VentureForm />
      </div>
    </main>
  );
}

function App() {
  return (
    <AuthProvider>
      <div>
        <Navbar />
        <MainContent />
      </div>
    </AuthProvider>
  );
}

export default App;