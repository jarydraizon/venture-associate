import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/VentureFileManager.css';

function VentureFileManager({ ventureName, competitorId, fullWidth }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [urls, setUrls] = useState('');
  const [details, setDetails] = useState({ name: '', description: '', industry: '', website: '', regions: '' });

  const getApiEndpoint = () => {
    const base = `/api/venture-files/${ventureName}`;
    return competitorId ? `${base}/competitors/${competitorId}` : base;
  };

  const loadData = async () => {
    try {
      setLoading(true);
      setError(''); // Clear any previous errors
      await fetchFiles();
    } catch (err) {
      console.error('Error loading data:', err);
      setError('Failed to load data. Please try again.');
      setLoading(false);
    }
  };

  // Add useEffect to load data when component mounts
  useEffect(() => {
    loadData();
  }, [ventureName, competitorId]); // Add dependencies to reload when these change

  useEffect(() => {
    if (ventureName) {
      loadData();
    }
  }, [ventureName, competitorId]);

  const handleFileUpload = async (event) => {
    const files = event.target.files;
    if (!files.length) return;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      setUploading(true);
      const endpoint = getApiEndpoint();
      await axios.post(`${endpoint}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      loadData(); // Refresh the file list
      setUploading(false);
    } catch (err) {
      console.error('Upload error:', err);
      setError('File upload failed');
      setUploading(false);
    }
  };

  const handleSaveUrls = async () => {
    try {
      const urlList = urls.split('\n').filter(url => url.trim());
      const endpoint = getApiEndpoint();
      await axios.post(`${endpoint}/urls`, { urls: urlList });
      alert('URLs saved successfully');
    } catch (err) {
      console.error('Error saving URLs:', err);
      setError('Failed to save URLs');
    }
  };

  const handleSaveDetails = async () => {
    try {
      const endpoint = getApiEndpoint();
      await axios.post(`${endpoint}/details`, details);
      alert('Details saved successfully');
    } catch (err) {
      console.error('Error saving details:', err);
      setError('Failed to save details');
    }
  };

  const handleDetailChange = (e) => {
    const { name, value } = e.target;
    setDetails(prev => ({ ...prev, [name]: value }));
  };

  if (loading) return <div className="loading">Loading data...</div>;
  if (error) return <div className="error">{error}</div>;

  //Closure to access state variables within fetchFiles
  const fetchFiles = async () => {
    try {
      setLoading(true);
      const endpoint = `${getApiEndpoint()}/files`;
      const response = await axios.get(endpoint, getAuthConfig());
      if (response.data.files) {
        setFiles(response.data.files);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching files:', error);
      setError('Failed to load files');
      setLoading(false);
    }
  };


  return (
    <div className={`venture-file-manager ${fullWidth ? 'full-width' : ''}`}>
      {!fullWidth && (
        <div className="venture-section">
          <h2>{competitorId ? 'Competitor Details' : 'Venture Details'}</h2>
          <div className="form-group">
            <label>Name:</label>
            <input 
              type="text" 
              name="name" 
              value={details.name || ''} 
              onChange={handleDetailChange} 
              placeholder="Company name"
            />
          </div>
          <div className="form-group">
            <label>Industry:</label>
            <input 
              type="text" 
              name="industry" 
              value={details.industry || ''} 
              onChange={handleDetailChange} 
              placeholder="Industry"
            />
          </div>
          <div className="form-group">
            <label>Website:</label>
            <input 
              type="text" 
              name="website" 
              value={details.website || ''} 
              onChange={handleDetailChange} 
              placeholder="Website URL"
            />
          </div>
          <div className="form-group">
            <label>Regions of Operation:</label>
            <input 
              type="text" 
              name="regions" 
              value={details.regions || ''} 
              onChange={handleDetailChange} 
              placeholder="Regions of operation"
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea 
              name="description" 
              value={details.description || ''} 
              onChange={handleDetailChange} 
              placeholder="Description"
            />
          </div>
          <button onClick={handleSaveDetails} className="save-btn">Save Details</button>
        </div>
      )}

      <div className="venture-section">
        <h2>Important URLs</h2>
        <p className="helper-text">Enter one URL per line (website, landing pages, competitors, etc.)</p>
        <textarea 
          value={urls} 
          onChange={(e) => setUrls(e.target.value)} 
          placeholder="https://example.com"
          rows={5}
        />
        <button onClick={handleSaveUrls} className="save-btn">Save URLs</button>
      </div>

      <div className="venture-section">
        <h2>Uploaded Files</h2>
        <div className="file-upload">
          <label className="upload-btn">
            Upload Files
            <input 
              type="file" 
              multiple 
              onChange={handleFileUpload} 
              disabled={uploading}
              style={{ display: 'none' }}
            />
          </label>
          {uploading && <span className="uploading">Uploading...</span>}
        </div>

        <div className="files-list">
          {files.length > 0 ? (
            files.map((file, index) => (
              <div key={index} className="file-item">
                <span className="file-name">{file.name}</span>
                <a 
                  href={file.path} 
                  download 
                  className="download-link"
                >
                  Download
                </a>
              </div>
            ))
          ) : (
            <p className="no-files">No files uploaded yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

// Add authentication token to requests
const getAuthConfig = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
};


export { VentureFileManager };