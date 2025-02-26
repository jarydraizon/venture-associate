
import React from 'react';
import VentureList from '../components/VentureList';
import '../styles/venture-page.css';

const VenturesPage = () => {
    return (
        <div className="ventures-page">
            <h1 className="welcome-title">Welcome to your portfolio</h1>
            <hr className="separator" />
            <div className="ventures-section">
                <h2 className="section-title">My ventures</h2>
                <button className="create-new">+ Create new</button>
                <VentureList />
            </div>
        </div>
    );
};

export default VenturesPage;
