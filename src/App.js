
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import AuthForm from './components/AuthForm';
import VenturesPage from './pages/VenturesPage';
import InsightsPage from './pages/InsightsPage';
import { AuthProvider, useAuth } from './context/AuthContext';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" />;
}

function MainContent() {
  const { user, login, signup } = useAuth();
  const [isLogin, setIsLogin] = React.useState(true);

  if (!user) {
    return (
      <main className="container">
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
      </main>
    );
  }

  return <Navigate to="/ventures" />;
}

function App() {
  const { user } = useAuth();
  
  console.log('App rendering, user:', user);
  
  return (
    <AuthProvider>
      <Router>
        <div className="app-container debug-outline">
          {user && <Navbar />}
          <div className="main-content">
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route 
                path="/ventures" 
                element={
                  <PrivateRoute>
                    <VenturesPage />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/insights" 
                element={
                  <PrivateRoute>
                    <InsightsPage />
                  </PrivateRoute>
                } 
              />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
