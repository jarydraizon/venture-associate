import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/insights-page.css';

const InsightsPage = () => {
  const { ventureName } = useParams();
  const [userMessage, setUserMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [ventureInfo, setVentureInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch venture information when component mounts
  useEffect(() => {
    const fetchVentureInfo = async () => {
      if (!ventureName) return;

      try {
        setLoading(true);
        const token = localStorage.getItem('token');

        if (!token) {
          console.error('No auth token found');
          setLoading(false);
          return;
        }

        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        };

        const response = await axios.get(`/api/ventures/${ventureName}/details`, config);
        console.log('Venture details fetched:', response.data);

        if (response.data.details) {
          setVentureInfo(response.data.details);
        }
      } catch (error) {
        console.error('Error fetching venture details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVentureInfo();
  }, [ventureName]);

  const handleSendMessage = () => {
    if (!userMessage.trim()) return;

    // Add user message to chat
    setMessages([...messages, { text: userMessage, sender: 'user' }]);
    setUserMessage('');

    // Here you would typically handle the API call to get a response
    // For now, we're just simulating a response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "I'm your digital copilot. How can I help with your venture?", 
        sender: 'bot' 
      }]);
    }, 1000);
  };

  return (
    <div className="main-content">
      <h1 className="page-title">Your Digital Copilot</h1>

      <div className="insights-container">
        <div className="panels-container">
          {/* Venture Info Panel */}
          <div className="venture-info-panel">
            <h2 className="panel-title">Venture Information</h2>
            {loading ? (
              <div className="loading">Loading venture data...</div>
            ) : ventureInfo ? (
              <div className="venture-info-content">
                <div className="info-item">
                  <span className="info-label">Name:</span>
                  <span className="info-value">{ventureInfo.name || 'Not specified'}</span>
                </div>

                <div className="info-item">
                  <span className="info-label">Industry:</span>
                  <span className="info-value">{ventureInfo.industry || 'Not specified'}</span>
                </div>

                <div className="info-item">
                  <span className="info-label">Website:</span>
                  <span className="info-value">
                    {ventureInfo.website ? (
                      <a href={ventureInfo.website} target="_blank" rel="noopener noreferrer">
                        {ventureInfo.website}
                      </a>
                    ) : 'Not specified'}
                  </span>
                </div>

                <div className="info-item">
                  <span className="info-label">Regions:</span>
                  <span className="info-value">{ventureInfo.regions || 'Not specified'}</span>
                </div>

                <div className="info-item description">
                  <span className="info-label">Description:</span>
                  <p className="info-value description-text">{ventureInfo.description || 'No description available'}</p>
                </div>
              </div>
            ) : (
              <div className="empty-state">
                <p>No venture information available</p>
              </div>
            )}
          </div>

          {/* Chat Panel */}
          <div className="chat-panel">
            <h2 className="panel-title">Chat</h2>
            <div className="chat-messages">
              {messages.length > 0 ? (
                messages.map((msg, index) => (
                  <div key={index} className={`message ${msg.sender}`}>
                    {msg.text}
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <p>No messages yet</p>
                  <p>Start a conversation</p>
                </div>
              )}
            </div>
            <div className="chat-input">
              <input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                placeholder="Ask anything about this venture..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsPage;