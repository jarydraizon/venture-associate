
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/VenturePage.css';
import { VentureFileManager } from '../components/VentureFileManager';

const VenturePage = () => {
  const { ventureName } = useParams();
  const [activePanel, setActivePanel] = useState('venture');
  const [venture, setVenture] = useState({ 
    name: '', 
    description: '', 
    industry: '', 
    website: '', 
    regions: '' 
  });
  const [competitors, setCompetitors] = useState([]);
  const [activeCompetitor, setActiveCompetitor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditingVenture, setIsEditingVenture] = useState(false);
  const [isEditingCompetitor, setIsEditingCompetitor] = useState(false);
  const [newCompetitor, setNewCompetitor] = useState({ 
    name: '', 
    description: '', 
    industry: '', 
    website: '', 
    regions: '' 
  });

  // Fetch venture data and competitors
  useEffect(() => {
    const fetchVentureData = async () => {
      try {
        setLoading(true);
        console.log('Loading venture data for:', ventureName);
        
        // Get auth token from localStorage
        const token = localStorage.getItem('token');
        
        if (!token) {
          setError('Authentication required. Please log in again.');
          setLoading(false);
          return;
        }
        
        // Configure headers with authentication
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        };
        
        // Fetch venture details with auth headers
        const detailsRes = await axios.get(`/api/venture-files/${ventureName}/details`, config);
        console.log('Venture details response:', detailsRes.data);
        
        if (detailsRes.data.details) {
          setVenture(detailsRes.data.details);
        }
        
        // Fetch competitors with auth headers
        const competitorsRes = await axios.get(`/api/venture-files/${ventureName}/competitors`, config);
        console.log('Competitors response:', competitorsRes.data);
        
        if (competitorsRes.data.competitors) {
          setCompetitors(competitorsRes.data.competitors.sort((a, b) => a.name.localeCompare(b.name)));
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error loading venture data:', err);
        if (err.response && err.response.status === 401) {
          setError('Session expired. Please log in again.');
        } else {
          setError('Failed to load venture data. Please try refreshing the page.');
        }
        setLoading(false);
      }
    };

    if (ventureName) {
      fetchVentureData();
    }
  }, [ventureName]);

  const handleVentureChange = (e) => {
    const { name, value } = e.target;
    setVenture(prev => ({ ...prev, [name]: value }));
  };

  const handleCompetitorChange = (e) => {
    const { name, value } = e.target;
    setNewCompetitor(prev => ({ ...prev, [name]: value }));
  };

  const handleActiveCompetitorChange = (e) => {
    const { name, value } = e.target;
    setActiveCompetitor(prev => ({ ...prev, [name]: value }));
  };

  const saveVentureDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      
      await axios.post(`/api/venture-files/${ventureName}/details`, venture, config);
      setIsEditingVenture(false);
      alert('Venture details saved successfully');
    } catch (err) {
      console.error('Error saving venture details:', err);
      alert('Failed to save venture details');
    }
  };

  const saveCompetitorDetails = async () => {
    try {
      if (activeCompetitor) {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        
        // Update existing competitor
        await axios.put(`/api/ventures/${ventureName}/competitors/${activeCompetitor.id}`, activeCompetitor, config);
        
        // Update the competitors list
        setCompetitors(prev => 
          prev.map(comp => comp.id === activeCompetitor.id ? activeCompetitor : comp)
            .sort((a, b) => a.name.localeCompare(b.name))
        );
        
        setIsEditingCompetitor(false);
        alert('Competitor details updated successfully');
      }
    } catch (err) {
      console.error('Error updating competitor:', err);
      alert('Failed to update competitor details');
    }
  };

  const addNewCompetitor = async () => {
    try {
      // Verify we have all required fields
      if (!newCompetitor.name.trim()) {
        alert('Competitor name is required');
        return;
      }
      
      // Get auth token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You need to be logged in to add a competitor');
        return;
      }
      
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      
      console.log('Adding competitor for venture:', ventureName);
      console.log('Competitor data:', newCompetitor);
      
      // Ensure the endpoint is properly formatted
      const response = await axios.post(`/api/ventures/${ventureName}/competitors`, newCompetitor, config);
      console.log('Add competitor response:', response.data);
      
      const addedCompetitor = response.data.competitor;
      
      // Add to competitors list
      setCompetitors(prev => 
        [...prev, addedCompetitor].sort((a, b) => a.name.localeCompare(b.name))
      );
      
      // Reset form
      setNewCompetitor({ 
        name: '', 
        description: '', 
        industry: '', 
        website: '', 
        regions: '' 
      });
      
      // Set the newly added competitor as active
      setActiveCompetitor(addedCompetitor);
      setActivePanel('competitor');
      alert('Competitor added successfully');
    } catch (err) {
      console.error('Error adding competitor:', err);
      if (err.response) {
        console.error('Error response:', err.response.data);
        console.error('Status code:', err.response.status);
        if (err.response.status === 401) {
          alert('Session expired. Please log in again.');
        } else {
          alert(`Failed to add competitor: ${err.response.data.error || 'Unknown error'}`);
        }
      } else {
        alert('Failed to add competitor: Network error');
      }
    }
  };

  const selectCompetitor = (competitor) => {
    setActiveCompetitor(competitor);
    setActivePanel('competitor');
    setIsEditingCompetitor(false);
  };

  if (loading) return <div className="loading-screen">Loading venture data...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="venture-page">
      <div className="venture-header">
        <h1>{ventureName}</h1>
        <div className="tabs">
          <button 
            className={`tab-button ${activePanel === 'venture' ? 'active' : ''}`} 
            onClick={() => setActivePanel('venture')}
          >
            Venture Details
          </button>
          <button 
            className={`tab-button ${activePanel === 'competitors' ? 'active' : ''}`} 
            onClick={() => {
              setActivePanel('competitors');
              setActiveCompetitor(null);
            }}
          >
            Competitors
          </button>
          <button 
            className={`tab-button ${activePanel === 'add-data' ? 'active' : ''}`} 
            onClick={() => setActivePanel('add-data')}
          >
            Add Data
          </button>
        </div>
      </div>

      <div className="panel-container">
        {/* Venture Details Panel */}
        {activePanel === 'venture' && (
          <div className="panel venture-details-panel">
            <div className="panel-header">
              <h2>Venture Details</h2>
              <div className="panel-actions">
                <button 
                  className="action-button"
                  onClick={() => isEditingVenture ? saveVentureDetails() : setIsEditingVenture(true)}
                >
                  {isEditingVenture ? 'Save Details' : 'Edit Details'}
                </button>
                <button 
                  className="action-button"
                  onClick={() => setActivePanel('add-data')}
                >
                  Add Data
                </button>
              </div>
            </div>

            <div className="panel-content">
              {isEditingVenture ? (
                <div className="edit-form">
                  <div className="form-group">
                    <label>Company Name:</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={venture.name || ''} 
                      onChange={handleVentureChange} 
                      placeholder="Company name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Industry:</label>
                    <input 
                      type="text" 
                      name="industry" 
                      value={venture.industry || ''} 
                      onChange={handleVentureChange} 
                      placeholder="Industry"
                    />
                  </div>
                  <div className="form-group">
                    <label>Website:</label>
                    <input 
                      type="text" 
                      name="website" 
                      value={venture.website || ''} 
                      onChange={handleVentureChange} 
                      placeholder="Website URL"
                    />
                  </div>
                  <div className="form-group">
                    <label>Regions of Operation:</label>
                    <input 
                      type="text" 
                      name="regions" 
                      value={venture.regions || ''} 
                      onChange={handleVentureChange} 
                      placeholder="Regions (comma separated)"
                    />
                  </div>
                  <div className="form-group">
                    <label>Description:</label>
                    <textarea 
                      name="description" 
                      value={venture.description || ''} 
                      onChange={handleVentureChange} 
                      placeholder="Describe this venture"
                      rows={5}
                    />
                  </div>
                </div>
              ) : (
                <div className="info-display">
                  {Object.keys(venture).some(key => venture[key]) ? (
                    <>
                      <div className="info-group">
                        <label>Company Name:</label>
                        <p>{venture.name || 'Not specified'}</p>
                      </div>
                      <div className="info-group">
                        <label>Industry:</label>
                        <p>{venture.industry || 'Not specified'}</p>
                      </div>
                      <div className="info-group">
                        <label>Website:</label>
                        <p>
                          {venture.website ? (
                            <a href={venture.website} target="_blank" rel="noopener noreferrer">
                              {venture.website}
                            </a>
                          ) : 'Not specified'}
                        </p>
                      </div>
                      <div className="info-group">
                        <label>Regions of Operation:</label>
                        <p>{venture.regions || 'Not specified'}</p>
                      </div>
                      <div className="info-group">
                        <label>Description:</label>
                        <p className="description">{venture.description || 'No description available'}</p>
                      </div>
                    </>
                  ) : (
                    <div className="empty-state">
                      <p>No venture details available. Click 'Edit Details' to add information.</p>
                    </div>
                  )}
                </div>
              )}
              
              {/* Files and URLs associated with this venture */}
              <div className="venture-files-section">
                <h3>Associated Files & URLs</h3>
                <VentureFileManager ventureName={ventureName} />
              </div>
            </div>
          </div>
        )}

        {/* Competitors List Panel */}
        {activePanel === 'competitors' && !activeCompetitor && (
          <div className="panel competitors-panel">
            <div className="panel-header">
              <h2>Competitors</h2>
              <button 
                className="action-button"
                onClick={() => setActivePanel('add-competitor')}
              >
                Add Competitor
              </button>
            </div>

            <div className="panel-content">
              {competitors.length > 0 ? (
                <div className="competitors-list">
                  {competitors.map((competitor, index) => (
                    <button 
                      key={index} 
                      className="competitor-button"
                      onClick={() => selectCompetitor(competitor)}
                    >
                      {competitor.name}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <p>No competitors added yet. Click 'Add Competitor' to get started.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Add Competitor Panel */}
        {activePanel === 'add-competitor' && (
          <div className="panel add-competitor-panel">
            <div className="panel-header">
              <h2>Add New Competitor</h2>
              <button 
                className="action-button"
                onClick={() => setActivePanel('competitors')}
              >
                Back to Competitors
              </button>
            </div>

            <div className="panel-content">
              <div className="edit-form">
                <div className="form-group">
                  <label>Company Name:</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={newCompetitor.name} 
                    onChange={handleCompetitorChange} 
                    placeholder="Company name"
                  />
                </div>
                <div className="form-group">
                  <label>Industry:</label>
                  <input 
                    type="text" 
                    name="industry" 
                    value={newCompetitor.industry} 
                    onChange={handleCompetitorChange} 
                    placeholder="Industry"
                  />
                </div>
                <div className="form-group">
                  <label>Website:</label>
                  <input 
                    type="text" 
                    name="website" 
                    value={newCompetitor.website} 
                    onChange={handleCompetitorChange} 
                    placeholder="Website URL"
                  />
                </div>
                <div className="form-group">
                  <label>Regions of Operation:</label>
                  <input 
                    type="text" 
                    name="regions" 
                    value={newCompetitor.regions} 
                    onChange={handleCompetitorChange} 
                    placeholder="Regions (comma separated)"
                  />
                </div>
                <div className="form-group">
                  <label>Description:</label>
                  <textarea 
                    name="description" 
                    value={newCompetitor.description} 
                    onChange={handleCompetitorChange} 
                    placeholder="Describe this competitor"
                    rows={5}
                  />
                </div>
                <button 
                  className="submit-button"
                  onClick={addNewCompetitor}
                  disabled={!newCompetitor.name}
                >
                  Add Competitor
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Active Competitor Details Panel */}
        {activePanel === 'competitor' && activeCompetitor && (
          <div className="panel competitor-details-panel">
            <div className="panel-header">
              <h2>Competitor: {activeCompetitor.name}</h2>
              <div className="panel-actions">
                <button 
                  className="action-button"
                  onClick={() => setActivePanel('competitors')}
                >
                  Back to List
                </button>
                <button 
                  className="action-button"
                  onClick={() => isEditingCompetitor ? saveCompetitorDetails() : setIsEditingCompetitor(true)}
                >
                  {isEditingCompetitor ? 'Save Details' : 'Edit Details'}
                </button>
                <button 
                  className="action-button"
                  onClick={() => setActivePanel('add-data-competitor')}
                >
                  Add Data
                </button>
              </div>
            </div>

            <div className="panel-content">
              {isEditingCompetitor ? (
                <div className="edit-form">
                  <div className="form-group">
                    <label>Company Name:</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={activeCompetitor.name || ''} 
                      onChange={handleActiveCompetitorChange} 
                      placeholder="Company name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Industry:</label>
                    <input 
                      type="text" 
                      name="industry" 
                      value={activeCompetitor.industry || ''} 
                      onChange={handleActiveCompetitorChange} 
                      placeholder="Industry"
                    />
                  </div>
                  <div className="form-group">
                    <label>Website:</label>
                    <input 
                      type="text" 
                      name="website" 
                      value={activeCompetitor.website || ''} 
                      onChange={handleActiveCompetitorChange} 
                      placeholder="Website URL"
                    />
                  </div>
                  <div className="form-group">
                    <label>Regions of Operation:</label>
                    <input 
                      type="text" 
                      name="regions" 
                      value={activeCompetitor.regions || ''} 
                      onChange={handleActiveCompetitorChange} 
                      placeholder="Regions (comma separated)"
                    />
                  </div>
                  <div className="form-group">
                    <label>Description:</label>
                    <textarea 
                      name="description" 
                      value={activeCompetitor.description || ''} 
                      onChange={handleActiveCompetitorChange} 
                      placeholder="Describe this competitor"
                      rows={5}
                    />
                  </div>
                </div>
              ) : (
                <div className="info-display">
                  <div className="info-group">
                    <label>Company Name:</label>
                    <p>{activeCompetitor.name || 'Not specified'}</p>
                  </div>
                  <div className="info-group">
                    <label>Industry:</label>
                    <p>{activeCompetitor.industry || 'Not specified'}</p>
                  </div>
                  <div className="info-group">
                    <label>Website:</label>
                    <p>
                      {activeCompetitor.website ? (
                        <a href={activeCompetitor.website} target="_blank" rel="noopener noreferrer">
                          {activeCompetitor.website}
                        </a>
                      ) : 'Not specified'}
                    </p>
                  </div>
                  <div className="info-group">
                    <label>Regions of Operation:</label>
                    <p>{activeCompetitor.regions || 'Not specified'}</p>
                  </div>
                  <div className="info-group">
                    <label>Description:</label>
                    <p className="description">{activeCompetitor.description || 'No description available'}</p>
                  </div>
                </div>
              )}
              
              {/* Files and URLs associated with this competitor */}
              <div className="competitor-files-section">
                <h3>Associated Files & URLs</h3>
                <VentureFileManager 
                  ventureName={ventureName} 
                  competitorId={activeCompetitor.id} 
                />
              </div>
            </div>
          </div>
        )}

        {/* Add Data Panel for Venture */}
        {activePanel === 'add-data' && (
          <div className="panel add-data-panel">
            <div className="panel-header">
              <h2>Add Data for {ventureName}</h2>
              <button 
                className="action-button"
                onClick={() => setActivePanel('venture')}
              >
                Back to Venture Details
              </button>
            </div>

            <div className="panel-content">
              <VentureFileManager 
                ventureName={ventureName} 
                fullWidth={true}
              />
            </div>
          </div>
        )}

        {/* Add Data Panel for Competitor */}
        {activePanel === 'add-data-competitor' && activeCompetitor && (
          <div className="panel add-data-panel">
            <div className="panel-header">
              <h2>Add Data for {activeCompetitor.name}</h2>
              <button 
                className="action-button"
                onClick={() => setActivePanel('competitor')}
              >
                Back to Competitor Details
              </button>
            </div>

            <div className="panel-content">
              <VentureFileManager 
                ventureName={ventureName} 
                competitorId={activeCompetitor.id}
                fullWidth={true}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VenturePage;
