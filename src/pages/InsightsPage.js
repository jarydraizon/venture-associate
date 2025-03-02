
import React, { useState } from 'react';
import '../styles/insights-page.css';

function InsightsPage() {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() === '') return;
    
    // Add user message to chat
    setChatMessages([...chatMessages, { text: message, sender: 'user' }]);
    setMessage('');
    
    // Simulate AI response (would be replaced with actual API call)
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        text: `I'm analyzing your question about "${message}"...`, 
        sender: 'assistant' 
      }]);
    }, 1000);
  };

  const actions = [
    "Generate Value Proposition",
    "Size the Market",
    "Analyze Competition",
    "Create SWOT Analysis",
    "Generate Business Model Canvas",
    "Assess Market Fit",
    "Financial Projections",
    "Risk Assessment"
  ];

  const handleActionClick = (action) => {
    console.log(`Action selected: ${action}`);
    // Would implement the functionality for each action
  };

  return (
    <div className="main-content">
      <h1 className="page-title">Your Digital Copilot</h1>
      
      <div className="insights-container">
        {/* Chat Panel */}
        <div className="insights-panel chat-panel">
          <h2>Chat</h2>
          <div className="chat-messages">
            {chatMessages.length === 0 ? (
              <div className="empty-chat">
                <p>No messages yet</p>
                <p>Start a conversation</p>
              </div>
            ) : (
              chatMessages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender}`}>
                  {msg.text}
                </div>
              ))
            )}
          </div>
          <form className="chat-input-form" onSubmit={handleSendMessage}>
            <input
              type="text"
              className="chat-input"
              placeholder="Ask anything about this venture..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit" className="send-button">Send</button>
          </form>
        </div>
        
        {/* Actions Panel */}
        <div className="insights-panel actions-panel">
          <h2>Actions</h2>
          <div className="actions-list">
            {actions.map((action, index) => (
              <button 
                key={index}
                className="action-button"
                onClick={() => handleActionClick(action)}
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InsightsPage;
