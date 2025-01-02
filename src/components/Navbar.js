
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="sidebar">
      <div className="sidebar-content">
        <div className="sidebar-top">
          <div className="logo">boola</div>
          {user && (
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
          )}
        </div>
        {user && (
          <div className="sidebar-bottom">
            <span className="user-email">{user.email}</span>
            <button className="sign-out-btn" onClick={logout}>Sign Out</button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
