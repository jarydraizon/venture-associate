
import React from 'react';
import VentureForm from '../components/VentureForm';
import VentureList from '../components/VentureList';

const VenturesPage = () => {
    return (
        <div className="ventures-page">
            <VentureForm />
            <VentureList />
        </div>
    );
};

export default VenturesPage;
