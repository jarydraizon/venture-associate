
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Your AI Venture Associate</h1>
        <h2>Make better investment decisions with AI-powered insights</h2>
        <button 
          className="cta-button"
          onClick={() => navigate('/login')}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HomePage;
