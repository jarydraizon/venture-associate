
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav>
      <div className="container">
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
        <div>
          {user ? (
            <>
              <span className="user-email">{user.email}</span>
              <button onClick={logout}>Sign Out</button>
            </>
          ) : null}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
