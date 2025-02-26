
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/venture-page.css';

const VenturePage = () => {
    const { ventureName } = useParams();
    const [venture, setVenture] = useState(null);
    const [sources, setSources] = useState([]);
    const [chatInput, setChatInput] = useState('');
    const [chatMessages, setChatMessages] = useState([]);

    useEffect(() => {
        const fetchVenture = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`/api/ventures/${ventureName}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();
                setVenture(data);
            } catch (error) {
                console.error('Error fetching venture:', error);
            }
        };
        fetchVenture();
    }, [ventureName]);

    const handleChatSubmit = (e) => {
        e.preventDefault();
        if (chatInput.trim()) {
            setChatMessages([...chatMessages, { text: chatInput, sender: 'user' }]);
            setChatInput('');
        }
    };

    const handleAddSource = () => {
        console.log('Add source clicked');
    };

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

    return (
        <div className="venture-page">
            <div className="venture-header">
                <h1>{venture?.name || 'Loading...'}</h1>
                <p>{venture?.description}</p>
            </div>
            
            <div className="content-layout">
                <div className="sources-panel">
                    <div className="panel-header">
                        <h2>Sources</h2>
                    </div>
                    <button className="add-source-btn" onClick={handleAddSource}>+ Add source</button>
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
                                    {source.title}
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
                        {chatMessages.map((message, index) => (
                            <div key={index} className={`message ${message.sender}`}>
                                {message.text}
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleChatSubmit} className="chat-input-container">
                        <input
                            type="text"
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            placeholder="Ask anything about this venture..."
                            className="chat-input"
                        />
                        <button type="submit" className="send-btn">Send</button>
                    </form>
                </div>

                <div className="actions-panel">
                    <div className="panel-header">
                        <h2>Actions</h2>
                    </div>
                    <div className="actions-list">
                        {agentActions.map(action => (
                            <button
                                key={action.id}
                                className="action-btn"
                                onClick={() => console.log('Action clicked:', action.label)}
                            >
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
