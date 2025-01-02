import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    console.log('Navbar rendered with user:', user);
    console.log('Current location:', location.pathname);
  }, [user, location]);

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