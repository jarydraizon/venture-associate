import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/venture-page.css';

const VenturePage = () => {
    const { ventureName } = useParams();
    const [sources, setSources] = useState([]);
    const [chatMessages, setChatMessages] = useState([]);
    const [chatInput, setChatInput] = useState('');

    const handleChatSubmit = async (e) => {
        e.preventDefault();
        if (!chatInput.trim()) return;
        
        const userMessage = { text: chatInput, sender: 'user' };
        setChatMessages(prev => [...prev, userMessage]);
        setChatInput('');

        // Check if previous message was requesting URL
        const lastMessage = chatMessages[chatMessages.length - 1];
        if (lastMessage?.text === "Please provide your landing page URL") {
            try {
                // Add loading message
                setChatMessages(prev => [...prev, { 
                    text: "Analyzing landing page...", 
                    sender: 'assistant',
                    isLoading: true
                }]);

                const response = await fetch('/api/analyze-landing-page', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url: chatInput })
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const analysis = await response.json();
                
                // Remove loading message and add analysis
                setChatMessages(prev => {
                    const filtered = prev.filter(msg => !msg.isLoading);
                    return [...filtered, { 
                        text: typeof analysis === 'string' ? analysis : JSON.stringify(analysis, null, 2),
                        sender: 'assistant'
                    }];
                });
            } catch (error) {
                console.error('Landing page analysis error:', error);
                setChatMessages(prev => {
                    const filtered = prev.filter(msg => !msg.isLoading);
                    return [...filtered, {
                        text: `Error analyzing landing page: ${error.message || 'Please check the URL and try again'}`,
                        sender: 'assistant'
                    }];
                });
            }
        } else {
            setChatMessages(prev => [...prev, {
                text: "I'm here to help analyze landing pages. Click the 'Analyze My Landing Page' button to get started!",
                sender: 'assistant'
            }]);
        }
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
                <h1>{ventureName}</h1>
            </div>
            <div className="panels-container">
                <div className="sources-panel">
                    <div className="panel-header">
                        <h2>Sources</h2>
                    </div>
                    <button className="add-button">+ Add source</button>
                    <div className="sources-list">
                        {sources.length === 0 ? (
                            <div className="empty-state">
                                <div>No sources yet</div>
                                <div>Add sources to get started</div>
                            </div>
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
                    <div className="panel-header">
                        <h2>Chat</h2>
                    </div>
                    <div className="chat-messages">
                        {chatMessages.length === 0 ? (
                            <div className="empty-state">
                                <div>No messages yet</div>
                                <div>Start a conversation</div>
                            </div>
                        ) : (
                            chatMessages.map((msg, index) => (
                                <div key={index} className={`message ${msg.sender}`}>
                                    {msg.text}
                                </div>
                            ))
                        )}
                    </div>
                    <form onSubmit={handleChatSubmit} className="chat-input-form">
                        <input
                            type="text"
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            placeholder="Ask anything about this venture..."
                            className="chat-input"
                        />
                        <button type="submit" className="send-button">Send</button>
                    </form>
                </div>

                <div className="actions-panel">
                    <div className="panel-header">
                        <h2>Actions</h2>
                    </div>
                    <button 
                        className="analyze-landing-btn"
                        onClick={() => {
                            setChatMessages([...chatMessages, {
                                text: "Please provide your landing page URL",
                                sender: "assistant"
                            }]);
                        }}
                    >
                        Analyze My Landing Page
                    </button>
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
