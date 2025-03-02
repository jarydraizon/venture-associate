
import React, { useState, useEffect } from 'react';
import '../styles/insights-page.css';

function InsightsPage() {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [activeVenture, setActiveVenture] = useState(null);

  // Fetch active venture on component mount
  useEffect(() => {
    // Simulate fetching active venture data
    // In a real implementation, this would be an API call
    const fetchActiveVenture = async () => {
      // Example venture data - in production this would come from your API
      setActiveVenture({
        id: 9,
        name: 'MIllivolt',
        description: 'GPU Processing Algorithm',
        status: 'Active'
      });
    };

    fetchActiveVenture();
  }, []);

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
        {/* Venture Info Panel */}
        <div className="venture-info-panel">
          <h2>Active Venture</h2>
          {activeVenture ? (
            <div className="venture-details">
              <h3>{activeVenture.name}</h3>
              <p className="venture-description">{activeVenture.description}</p>
              <div className="venture-status">
                <span className="status-indicator"></span>
                {activeVenture.status}
              </div>
              <div className="venture-metrics">
                <div className="metric">
                  <span className="metric-label">Documents</span>
                  <span className="metric-value">12</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Analyses</span>
                  <span className="metric-value">5</span>
                </div>
              </div>
            </div>
          ) : (
            <p>No venture selected</p>
          )}
        </div>
        
        {/* Chat Panel */}
        <div className="chat-panel">
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
        <div className="actions-panel">
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
