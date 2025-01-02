
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VentureList = () => {
    const [ventures, setVentures] = useState([]);
    const [error, setError] = useState('');

    const fetchVentures = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/ventures', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setVentures(response.data.ventures);
        } catch (error) {
            setError('Failed to fetch ventures');
        }
    };

    const toggleActive = async (ventureId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`/api/ventures/${ventureId}/toggle`, {}, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchVentures(); // Refresh the list
        } catch (error) {
            setError('Failed to toggle venture status');
        }
    };

    useEffect(() => {
        fetchVentures();
    }, []);

    return (
        <div className="venture-list">
            <h2>Your Ventures</h2>
            {error && <p className="error">{error}</p>}
            <div className="ventures">
                {ventures.map(venture => (
                    <div key={venture.venture_id} className={`venture-item ${venture.active ? 'active' : ''}`}>
                        <h3>{venture.name}</h3>
                        <p>{venture.description}</p>
                        <button onClick={() => toggleActive(venture.venture_id)}>
                            {venture.active ? 'Deactivate' : 'Activate'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VentureList;
