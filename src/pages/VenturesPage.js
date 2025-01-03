
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './VenturesPage.css';

const VenturesPage = () => {
    const [ventures, setVentures] = useState([]);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchVentures = async () => {
            try {
                const response = await axios.get('/api/ventures', {
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                setVentures(response.data.ventures);
            } catch (error) {
                console.error('Error fetching ventures:', error);
                setError(error.response?.data?.error || 'Failed to fetch ventures');
            }
        };

        if (token) {
            fetchVentures();
        }
    }, [token]);

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="venture-list">
            <h2>Your Ventures</h2>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Active</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventures.map(venture => (
                            <tr key={venture.venture_id}>
                                <td>{venture.venture_id}</td>
                                <td>{venture.name}</td>
                                <td>{venture.description}</td>
                                <td>{venture.active ? 'Yes' : 'No'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VenturesPage;
