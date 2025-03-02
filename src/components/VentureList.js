import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/VentureList.css';

const VentureList = () => {
    const [ventures, setVentures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    console.log('VentureList component rendered');

    useEffect(() => {
        const fetchVentures = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('No authentication token found');
                    setLoading(false);
                    return;
                }

                console.log('Fetching ventures...');
                const response = await axios.get('/api/ventures', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                console.log('Ventures response:', response.data);

                if (Array.isArray(response.data.ventures)) {
                    setVentures(response.data.ventures);
                } else if (typeof response.data.ventures === 'object') {
                    // Convert object to array if needed
                    const venturesArray = Object.values(response.data.ventures);
                    setVentures(venturesArray);
                    console.log('Converted ventures to array:', venturesArray);
                } else {
                    console.error('Unexpected ventures format:', response.data.ventures);
                    setError('Received unexpected data format from server');
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching ventures:', error.response || error);
                setError(error.response?.data?.error || 'Failed to fetch ventures');
                setLoading(false);
            }
        };

        fetchVentures();
    }, []);

    return (
        <div className="venture-list">
            {loading ? (
                <p>Loading ventures...</p>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : ventures.length === 0 ? (
                <p>No ventures found. Create one to get started!</p>
            ) : (
                <div className="ventures-grid">
                    {ventures.map(venture => {
                        console.log('Rendering venture:', venture);
                        return (
                            <Link 
                                to={`/ventures/${venture.name}`}
                                key={venture.venture_id || Math.random().toString(36).substring(7)}
                                className="venture-card"
                            >
                                <h3>{venture.name}</h3>
                                <p>{venture.description || 'No description available'}</p>
                                <p className="venture-date">
                                    {venture.created_at 
                                        ? new Date(venture.created_at).toLocaleDateString() 
                                        : 'Date unavailable'}
                                </p>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default VentureList;