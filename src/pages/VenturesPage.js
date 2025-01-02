
import React from 'react';
import VentureForm from '../components/VentureForm';
import VentureList from '../components/VentureList';

function VenturesPage() {
  return (
    <div className="main-content">
      <h1>Ventures</h1>
      <VentureForm />
      <VentureList />
    </div>
  );
}

export default VenturesPage;
