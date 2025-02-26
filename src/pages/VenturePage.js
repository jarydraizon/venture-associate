
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/venture-page.css';

const VenturePage = () => {
    const { ventureName } = useParams();
    const [sources, setSources] = useState([]);
    const [venture, setVenture] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchVentureData = async () => {
            try {
                const token = localStorage.getItem('token');
                const headers = { 'Authorization': `Bearer ${token}` };
                const response = await axios.get(`/api/ventures/${ventureName}`, { headers });
                setVenture(response.data.venture);
            } catch (err) {
                setError(err.response?.data?.error || 'Failed to fetch venture data');
            }
        };

        fetchVentureData();
    }, [ventureName]);

    return (
        <div className="venture-page">
            {error && <p className="error">{error}</p>}
            {venture && (
                <>
                    <h1>{venture.name}</h1>
                    <p className="description">{venture.description}</p>
                    <div className="sources-section">
                        <h2>Sources</h2>
                        <button className="add-source-btn">Add Source</button>
                        <div className="sources-list">
                            {sources.map(source => (
                                <div key={source.id} className="source-item">
                                    <h3>{source.title}</h3>
                                    <p>{source.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default VenturePage;
