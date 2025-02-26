
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/venture-page.css';

const VenturePage = () => {
    const { ventureName } = useParams();
    const [sources, setSources] = useState([]);
    const [chatMessages, setChatMessages] = useState([]);
    const [chatInput, setChatInput] = useState('');

    const handleChatSubmit = (e) => {
        e.preventDefault();
        if (chatInput.trim()) {
            setChatMessages([...chatMessages, { text: chatInput, sender: 'user' }]);
            setChatInput('');
        }
    };

    const handleAddSource = () => {
        // TODO: Implement source addition
        console.log('Add source clicked');
    };

    const agentActions = [
        { id: 1, label: 'Generate Value Proposition' },
        { id: 2, label: 'Size the Market' },
        { id: 3, label: 'Analyze Competition' },
        { id: 4, label: 'Create SWOT Analysis' },
        { id: 5, label: 'Generate Business Model Canvas' },
        { id: 6, label: 'Assess Market Fit' }
    ];

    return (
        <div className="venture-page">
            <div className="venture-header">
                <h1>{ventureName}</h1>
            </div>
            <div className="panels-container">
                <div className="sources-panel">
                    <h2>Sources</h2>
                    <button onClick={handleAddSource} className="add-button">
                        + Add Source
                    </button>
                    <div className="sources-list">
                        {sources.length === 0 ? (
                            <div className="empty-state">No sources added yet</div>
                        ) : (
                            sources.map((source, index) => (
                                <div key={index} className="source-item">
                                    {source.title}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="chat-panel">
                    <h2>Chat Interface</h2>
                    <div className="chat-messages">
                        {chatMessages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender}`}>
                                {msg.text}
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleChatSubmit} className="chat-input-form">
                        <input
                            type="text"
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            placeholder="Type your message..."
                            className="chat-input"
                        />
                        <button type="submit" className="send-button">Send</button>
                    </form>
                </div>

                <div className="actions-panel">
                    <h2>Agent Actions</h2>
                    <div className="actions-list">
                        {agentActions.map((action) => (
                            <button
                                key={action.id}
                                className="action-button"
                                onClick={() => console.log(`Action clicked: ${action.label}`)}
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
