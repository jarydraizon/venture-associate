
import React from 'react';
import VentureForm from '../components/VentureForm';
import VentureList from '../components/VentureList';

const VenturesPage = () => {
    return (
        <div className="ventures-page">
            <h1 className="welcome-title">Welcome to Boola</h1>
            <h2 className="section-title">My Ventures</h2>
            <VentureForm />
            <VentureList />
        </div>
    );
};

export default VenturesPage;
