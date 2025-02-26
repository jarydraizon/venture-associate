import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import AuthForm from './components/AuthForm';
import VenturesPage from './pages/VenturesPage';
import VenturePage from './pages/VenturePage';
import InsightsPage from './pages/InsightsPage';
import HomePage from './pages/HomePage'; // Import HomePage component
import { AuthProvider, useAuth } from './context/AuthContext';
import './styles/main.css';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" />;
}

function AppContent() {
  const { user, login, signup } = useAuth();
  const [isLogin, setIsLogin] = React.useState(true);

  return (
    <div className="app-container">
      {user && <Navbar />}
      <div className="main-content">
        <Routes>
          <Route path="/ventures" element={
            <PrivateRoute>
              <VenturesPage />
            </PrivateRoute>
          } />
          <Route path="/venture/:ventureName" element={
            <PrivateRoute>
              <VenturePage />
            </PrivateRoute>
          } />
          <Route path="/insights" element={
            <PrivateRoute>
              <InsightsPage />
            </PrivateRoute>
          } />
          <Route path="/" element={
            user ? <Navigate to="/ventures" /> : <HomePage />
          } />
          <Route path="/login" element={
            user ? <Navigate to="/ventures" /> : (
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
            )
          } />
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