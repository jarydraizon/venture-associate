
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

    useEffect(() => {
        fetchVentures();
    }, []);

    return (
        <div className="venture-list">
            <h2>Your Ventures</h2>
            {error && <p className="error">{error}</p>}
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Created At</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventures.map(venture => (
                            <tr key={venture.venture_id}>
                                <td>{venture.name}</td>
                                <td>{venture.description}</td>
                                <td>{new Date(venture.created_at).toLocaleDateString()}</td>
                                <td>{venture.active ? 'Active' : 'Inactive'}</td>
                                <td>
                                    <button 
                                        onClick={() => toggleActive(venture.venture_id)}
                                        className={venture.active ? 'deactivate' : 'activate'}
                                    >
                                        {venture.active ? 'Deactivate' : 'Activate'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VentureList;
