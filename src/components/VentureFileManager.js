
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/VentureFileManager.css';

function VentureFileManager({ ventureName }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [urls, setUrls] = useState('');
  const [details, setDetails] = useState({ name: '', description: '', industry: '' });

  const loadData = async () => {
    try {
      setLoading(true);
      // Fetch files
      const filesRes = await axios.get(`/api/venture-files/${ventureName}/files`);
      setFiles(filesRes.data.files || []);
      
      // Fetch URLs
      const urlsRes = await axios.get(`/api/venture-files/${ventureName}/urls`);
      setUrls(urlsRes.data.urls.join('\n'));
      
      // Fetch details
      const detailsRes = await axios.get(`/api/venture-files/${ventureName}/details`);
      if (detailsRes.data.details) {
        setDetails(detailsRes.data.details);
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Error loading venture data:', err);
      setError('Failed to load venture data');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ventureName) {
      loadData();
    }
  }, [ventureName]);

  const handleFileUpload = async (event) => {
    const files = event.target.files;
    if (!files.length) return;
    
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    
    try {
      setUploading(true);
      await axios.post(`/api/venture-files/${ventureName}/upload`, formData, {
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
      await axios.post(`/api/venture-files/${ventureName}/urls`, { urls: urlList });
      alert('URLs saved successfully');
    } catch (err) {
      console.error('Error saving URLs:', err);
      setError('Failed to save URLs');
    }
  };

  const handleSaveDetails = async () => {
    try {
      await axios.post(`/api/venture-files/${ventureName}/details`, details);
      alert('Venture details saved successfully');
    } catch (err) {
      console.error('Error saving details:', err);
      setError('Failed to save venture details');
    }
  };

  const handleDetailChange = (e) => {
    const { name, value } = e.target;
    setDetails(prev => ({ ...prev, [name]: value }));
  };

  if (loading) return <div className="loading">Loading venture data...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="venture-file-manager">
      <div className="venture-section">
        <h2>Venture Details</h2>
        <div className="form-group">
          <label>Name:</label>
          <input 
            type="text" 
            name="name" 
            value={details.name || ''} 
            onChange={handleDetailChange} 
            placeholder="Venture name"
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
          <label>Description:</label>
          <textarea 
            name="description" 
            value={details.description || ''} 
            onChange={handleDetailChange} 
            placeholder="Describe this venture"
          />
        </div>
        <button onClick={handleSaveDetails} className="save-btn">Save Details</button>
      </div>

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

export default VentureFileManager;
