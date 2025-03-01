import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VentureList = () => {
    const navigate = useNavigate();
    const [ventures, setVentures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchData = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No authentication token found');
                setLoading(false);
                return;
            }

            const headers = { 'Authorization': `Bearer ${token}` };
            console.log('Fetching ventures...');
            const venturesRes = await axios.get('/api/ventures', { headers });
            console.log('Ventures response:', venturesRes.data);
            setVentures(venturesRes.data.ventures || []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching ventures:', error.response || error);
            setError(error.response?.data?.error || 'Failed to fetch ventures');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <div className="loading">Loading ventures...</div>;
    }

    return (
        <div className="venture-list">
            {error && <p className="error">{error}</p>}
            {ventures.length === 0 && !error ? (
                <div className="empty-state">
                    <p>No ventures found. Click "Create new" to add your first venture.</p>
                </div>
            ) : (
                ventures.map(venture => (
                    <div key={venture.venture_id} className="venture-card" onClick={() => navigate(`/ventures/${venture.name}`)}>
                        <h3>{venture.name}</h3>
                        <p>{venture.description || 'No description available'}</p>
                        <div className="meta">
                            {new Date(venture.created_at).toLocaleDateString()} · {venture.active ? 'Active' : 'Inactive'}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default VentureList;