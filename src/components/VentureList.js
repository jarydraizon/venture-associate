import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VentureList = () => {
    const navigate = useNavigate();
    const [ventures, setVentures] = useState([]);
    const [error, setError] = useState('');

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No authentication token found');
                return;
            }

            const headers = { 'Authorization': `Bearer ${token}` };
            const venturesRes = await axios.get('/api/ventures', { headers });
            setVentures(venturesRes.data.ventures || []);
        } catch (error) {
            console.error('Error fetching data:', error.response || error);
            setError(error.response?.data?.error || 'Failed to fetch data');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="venture-list">
            {error && <p className="error">{error}</p>}
            {ventures.map(venture => (
                <div key={venture.venture_id} className="venture-card" onClick={() => navigate(`/ventures/${venture.name}`)}>
                    <h3>{venture.name}</h3>
                    <p>{venture.description}</p>
                    <div className="meta">
                        {new Date(venture.created_at).toLocaleDateString()} · {venture.active ? 'Active' : 'Inactive'}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default VentureList;