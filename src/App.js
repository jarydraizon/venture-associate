import React, { useState } from 'react';
import Navbar from './components/Navbar';
import AuthForm from './components/AuthForm';
import VentureForm from './components/VentureForm';
import { AuthProvider, useAuth } from './context/AuthContext';
import VentureList from './components/VentureList'; // Added import

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

  // This is the authenticated view
  return (
    <main className="container">
      <div className="main-content">
        <h1>Welcome to boola</h1>
        <p>Your AI-powered venture analysis assistant</p>
        <VentureForm />
        <VentureList />
        <div className="venture-helper">
          <p>Create a venture above to get started!</p>
        </div> {/* Added VentureList */}
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