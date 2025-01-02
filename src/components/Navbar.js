
import React from 'react';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav>
      <div className="container">
        <div className="logo">boola</div>
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
