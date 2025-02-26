import React from 'react';
import VentureList from '../components/VentureList';
import '../styles/venture-page.css';

const VenturesPage = () => {
    return (
        <div className="ventures-page">
            <h1>Ventures</h1>
            <VentureList />
        </div>
    );
};

export default VenturesPage;