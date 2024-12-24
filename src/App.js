
import React from 'react';
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      <main className="container">
        <h1>Welcome to VentureAssociate</h1>
        <p>Your AI-powered venture analysis assistant</p>
        <button>Get Started</button>
      </main>
    </div>
  );
}

export default App;
