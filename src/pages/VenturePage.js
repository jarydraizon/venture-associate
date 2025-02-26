import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/venture-page.css';

const VenturePage = () => {
    const { ventureName } = useParams();
    const [sources, setSources] = useState([]);
    const [venture, setVenture] = useState(null);
    const [chatInput, setChatInput] = useState('');
    const [error, setError] = useState('');

    const agentActions = [
        { id: 1, label: 'Generate Value Proposition' },
        { id: 2, label: 'Size the Market' },
        { id: 3, label: 'Analyze Competition' },
        { id: 4, label: 'Create SWOT Analysis' },
        { id: 5, label: 'Generate Business Model Canvas' },
        { id: 6, label: 'Assess Market Fit' },
        { id: 7, label: 'Financial Projections' },
        { id: 8, label: 'Risk Assessment' }
    ];

    useEffect(() => {
        const fetchVentureData = async () => {
            if (!ventureName) return;
            try {
                const token = localStorage.getItem('token');
                const headers = { 'Authorization': `Bearer ${token}` };
                const response = await axios.get(`/api/ventures/${encodeURIComponent(ventureName)}`, { headers });
                setVenture(response.data.venture);
            } catch (err) {
                setError(err.response?.data?.error || 'Failed to fetch venture data');
            }
        };
        fetchVentureData();
    }, [ventureName]);

    return (
        <div className="venture-page">
            <div className="content-layout">
                <div className="sources-panel">
                    <div className="panel-header">
                        <h2>Sources</h2>
                    </div>
                    <button className="add-source-btn">+ Add source</button>
                    {sources.length === 0 ? (
                        <div className="empty-panel">
                            <div className="empty-icon">📄</div>
                            <p>No sources yet</p>
                            <p className="subtitle">Add sources to get started</p>
                        </div>
                    ) : (
                        <div className="sources-list">
                            {sources.map(source => (
                                <div key={source.id} className="source-item">
                                    <h3>{source.title}</h3>
                                    <p>{source.summary}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="chat-panel">
                    <div className="panel-header">
                        <h2>Chat</h2>
                    </div>
                    <div className="chat-messages">
                        {/* Chat messages will appear here */}
                    </div>
                    <div className="chat-input-container">
                        <input
                            type="text"
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            placeholder="Ask anything about this venture..."
                            className="chat-input"
                        />
                        <button className="send-btn">Send</button>
                    </div>
                </div>

                <div className="actions-panel">
                    <div className="panel-header">
                        <h2>Actions</h2>
                    </div>
                    <div className="actions-list">
                        {agentActions.map(action => (
                            <button key={action.id} className="action-btn">
                                {action.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VenturePage;