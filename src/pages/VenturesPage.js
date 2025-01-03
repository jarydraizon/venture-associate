import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './VenturesPage.css'; // Optional: if you have specific styles

const VenturesPage = () => {
    const [ventures, setVentures] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchVentures = async () => {
            try {
                const response = await axios.get('/api/ventures', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setVentures(response.data.ventures);
            } catch (error) {
                console.error('Error fetching ventures:', error);
            }
        };

        fetchVentures();
    }, [token]);

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