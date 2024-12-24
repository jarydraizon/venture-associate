
import React, { useState } from 'react';

const AuthForm = ({ onSubmit, isLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await onSubmit({ email, password });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      {error && <div className="error-message">{error}</div>}
      <button type="submit">
        {isLogin ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
};

export default AuthForm;
