import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/venture-page.css';

const VenturePage = () => {
    const { ventureName } = useParams();
    const [sources, setSources] = useState([]);
    const [chatMessages, setChatMessages] = useState([{
        text: "Hello! I'm your AI assistant. How can I help you today?",
        sender: 'assistant'
    }]);
    const [chatInput, setChatInput] = useState('');

    const handleChatSubmit = async (e) => {
        e.preventDefault();
        if (!chatInput.trim()) return;

        const userMessage = { text: chatInput, sender: 'user' };
        setChatMessages(prev => [...prev, userMessage]);
        setChatInput('');

        // Add loading indicator
        setChatMessages(prev => [...prev, { 
            text: "Thinking...", 
            sender: 'assistant',
            isLoading: true
        }]);

        try {
            // Check if the message is a URL (for landing page analysis)
            const isURL = chatInput.startsWith('http://') || chatInput.startsWith('https://');
            
            if (isURL && chatMessages[chatMessages.length - 2]?.text.includes('provide the URL')) {
                // Handle landing page analysis
                const response = await fetch('/api/analyzeLandingPage', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url: chatInput })
                });

                if (!response.ok) {
                    throw new Error('Failed to analyze landing page');
                }

                const data = await response.json();
                
                // Remove loading message and add analysis response
                setChatMessages(prev => {
                    const filtered = prev.filter(msg => !msg.isLoading);
                    return [...filtered, { 
                        text: data.analysis,
                        sender: 'assistant'
                    }];
                });
            } else {
                // Handle regular chat
                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: chatInput })
                });

                if (!response.ok) {
                    throw new Error('Failed to get response');
                }

                const data = await response.json();

                // Remove loading message and add response
                setChatMessages(prev => {
                    const filtered = prev.filter(msg => !msg.isLoading);
                    return [...filtered, { 
                        text: data.response,
                        sender: 'assistant'
                    }];
                });
            }
        } catch (error) {
            console.error('Chat error:', error);
            setChatMessages(prev => {
                const filtered = prev.filter(msg => !msg.isLoading);
                return [...filtered, {
                    text: "I apologize, but I'm having trouble responding right now. Please try again.",
                    sender: 'assistant'
                }];
            });
        }
    };

    const agentActions = [
        { id: 1, label: 'Generate Value Proposition' },
        { id: 2, label: 'Size the Market' },
        { id: 3, label: 'Analyze Competition' },
        { id: 4, label: 'Create SWOT Analysis' },
        { id: 5, label: 'Generate Business Model Canvas' },
        { id: 6, label: 'Assess Market Fit' },
        { id: 7, label: 'Analyze Landing Page', onClick: async () => {
            // Send initial message to start landing page analysis
            setChatMessages(prev => [...prev, {
                text: "Your new task is to analyze a landing page. Please provide the URL you'd like me to analyze.",
                sender: 'assistant'
            }]);
        }},
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
                            placeholder="Ask anything..."
                            className="chat-input"
                        />
                        <button type="submit" className="send-button">Send</button>
                    </form>
                </div>

                <div className="actions-panel">
                    <div className="panel-header">
                        <h2>Actions</h2>
                    </div>
                    <div className="actions-list"> {/*Removed Analyze My Landing Page button*/}
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