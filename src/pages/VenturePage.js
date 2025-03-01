
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/VenturePage.css';
import VentureFileManager from '../components/VentureFileManager';

function VenturePage() {
  const { ventureName } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('details');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [ventureData, setVentureData] = useState(null);

  useEffect(() => {
    if (!ventureName) {
      navigate('/ventures');
      return;
    }

    const fetchVentureData = async () => {
      try {
        setLoading(true);
        // You can add API calls here to fetch venture-specific data
        console.log(`Loading venture data for: ${ventureName}`);
        
        // Simulate successful data load for now
        setVentureData({ name: ventureName });
        setLoading(false);
      } catch (err) {
        console.error('Error loading venture data:', err);
        setError('Failed to load venture data');
        setLoading(false);
      }
    };

    fetchVentureData();
  }, [ventureName, navigate]);

  if (loading) return <div className="loading-container">Loading...</div>;
  if (error) return <div className="error-container">{error}</div>;
  if (!ventureName) return null;

  return (
    <div className="venture-page">
      <div className="venture-header">
        <h1>{ventureName}</h1>
      </div>
      
      <div className="tabs-container">
        <div 
          className={`tab ${activeTab === 'details' ? 'active' : ''}`} 
          onClick={() => setActiveTab('details')}
        >
          Venture Details
        </div>
        <div 
          className={`tab ${activeTab === 'chat' ? 'active' : ''}`} 
          onClick={() => setActiveTab('chat')}
        >
          Chat with Expert
        </div>
        <div 
          className={`tab ${activeTab === 'reports' ? 'active' : ''}`} 
          onClick={() => setActiveTab('reports')}
        >
          Generate Reports
        </div>
      </div>
      
      <div className="tab-content">
        {activeTab === 'details' && (
          <div className="details-panel">
            <VentureFileManager ventureName={ventureName} />
          </div>
        )}
        
        {activeTab === 'chat' && (
          <div className="chat-panel">
            <h2>Chat with Expert</h2>
            <p className="coming-soon">Coming soon...</p>
          </div>
        )}
        
        {activeTab === 'reports' && (
          <div className="reports-panel">
            <h2>Generate Reports</h2>
            <p className="coming-soon">Coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default VenturePage;
