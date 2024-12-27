
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import AuthForm from './components/AuthForm';
import { AuthProvider, useAuth } from './context/AuthContext';

function MainContent() {
  const { user, login, signup } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (credentials) => {
    if (isLogin) {
      await login(credentials);
    } else {
      await signup(credentials);
    }
  };

  return (
    <main className="container">
      {!user ? (
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
      ) : (
        <>
          <h1>Welcome to Voogle</h1>
          <p>Your AI-powered venture analysis assistant</p>
          <button>Get Started</button>
        </>
      )}
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
