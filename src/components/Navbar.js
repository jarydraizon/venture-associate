import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <nav className="sidebar">
      <div className="sidebar-content">
        <div className="sidebar-top">
          <div className="logo">
            <img src="/logo.svg" alt="boola" width="32" height="32" style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            boola
          </div>
          <div className="nav-links">
            <button 
              className={`nav-link ${location.pathname === '/ventures' ? 'active' : ''}`}
              onClick={() => navigate('/ventures')}
            >
              Ventures
            </button>
            <button 
              className={`nav-link ${location.pathname === '/insights' ? 'active' : ''}`}
              onClick={() => navigate('/insights')}
            >
              Insights
            </button>
          </div>
        </div>
        <div className="sidebar-bottom">
          {user && (
            <>
              <span className="user-email">{user.email}</span>
              <button className="sign-out-btn" onClick={logout}>Sign Out</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;