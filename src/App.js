
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import AuthForm from './components/AuthForm';
import VenturesPage from './pages/VenturesPage';
import InsightsPage from './pages/InsightsPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import './styles/main.css';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" />;
}

function AppContent() {
  const { user, login, signup } = useAuth();
  const [isLogin, setIsLogin] = React.useState(true);

  if (!user) {
    return (
      <div className="auth-container">
        <h1>{isLogin ? 'Sign In' : 'Sign Up'}</h1>
        <AuthForm onSubmit={isLogin ? login : signup} isLogin={isLogin} />
        <button 
          className="switch-auth" 
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Need an account? Sign up' : 'Have an account? Sign in'}
        </button>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/ventures" element={<VenturesPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/" element={<Navigate to="/ventures" />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
