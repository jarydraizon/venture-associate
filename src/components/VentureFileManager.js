import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/VentureFileManager.css';

const VentureFileManager = ({ ventureName }) => {
  const [files, setFiles] = useState([]);
  const [urls, setUrls] = useState([]);
  const [newUrl, setNewUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [details, setDetails] = useState({
    company_name: '',
    industry: '',
    country_of_operation: '',
    list_of_competitors: []
  });
  const [competitors, setCompetitors] = useState('');

  useEffect(() => {
    loadData();
  }, [ventureName]);

  const loadData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { 'Authorization': `Bearer ${token}` };

      // Fetch files
      const filesRes = await axios.get(`/api/venture-files/${ventureName}/files`, { headers });
      setFiles(filesRes.data.files || []);

      // Fetch URLs
      const urlsRes = await axios.get(`/api/venture-files/${ventureName}/urls`, { headers });
      setUrls(urlsRes.data.urls || []);

      // Fetch details
      const detailsRes = await axios.get(`/api/venture-files/${ventureName}/details`, { headers });
      if (detailsRes.data.details) {
        setDetails(detailsRes.data.details);
        setCompetitors(detailsRes.data.details.list_of_competitors.join(', '));
      }
    } catch (error) {
      console.error('Error loading data:', error);
      setMessage(`Error: ${error.response?.data?.error || 'Failed to load data'}`);
    }
  };

  const handleDetailsSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const headers = { 'Authorization': `Bearer ${token}` };

      const updatedDetails = {
        ...details,
        list_of_competitors: competitors.split(',').map(comp => comp.trim())
      };

      await axios.post(`/api/venture-files/${ventureName}/details`, updatedDetails, { headers });
      setMessage('Venture details saved successfully!');
      loadData();
    } catch (error) {
      console.error('Error saving details:', error);
      setMessage(`Error: ${error.response?.data?.error || 'Failed to save details'}`);
    }
  };

  const handleUrlSubmit = async (e) => {
    e.preventDefault();
    if (!newUrl.startsWith('http://') && !newUrl.startsWith('https://')) {
      setMessage('Invalid URL. Please ensure it starts with http:// or https://');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const headers = { 'Authorization': `Bearer ${token}` };

      const updatedUrls = [...urls, newUrl];
      await axios.post(`/api/venture-files/${ventureName}/urls`, { urls: updatedUrls }, { headers });

      setUrls(updatedUrls);
      setNewUrl('');
      setMessage('URL added successfully!');
    } catch (error) {
      console.error('Error adding URL:', error);
      setMessage(`Error: ${error.response?.data?.error || 'Failed to add URL'}`);
    }
  };

  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (!files.length) return;

    setUploading(true);
    setMessage('Uploading files...');

    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }

      const token = localStorage.getItem('token');
      await axios.post(`/api/venture-files/${ventureName}/upload`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      setMessage('Files uploaded successfully!');
      loadData();
    } catch (error) {
      console.error('Error uploading files:', error);
      setMessage(`Error: ${error.response?.data?.error || 'Failed to upload files'}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="venture-file-manager">
      <h2>Manage {ventureName} Files</h2>

      {message && <div className="message">{message}</div>}

      <div className="file-manager-section">
        <h3>Company Details</h3>
        <form onSubmit={handleDetailsSubmit} className="details-form">
          <div className="form-group">
            <label className="form-label">Company Name:</label>
            <input
              type="text"
              value={details.company_name}
              onChange={(e) => setDetails({...details, company_name: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Industry:</label>
            <input
              type="text"
              value={details.industry}
              onChange={(e) => setDetails({...details, industry: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Country of Operation:</label>
            <input
              type="text"
              value={details.country_of_operation}
              onChange={(e) => setDetails({...details, country_of_operation: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Competitors (comma-separated):</label>
            <input
              type="text"
              value={competitors}
              onChange={(e) => setCompetitors(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="save-button">Save Details</button>
        </form>
      </div>

      <div className="file-manager-section">
        <h3>Company URLs</h3>
        <form onSubmit={handleUrlSubmit} className="url-form">
          <div className="form-group">
            <label className="form-label">Add URL:</label>
            <input
              type="url"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="https://example.com"
              required
            />
          </div>
          <button type="submit" className="save-button">Add URL</button>
        </form>

        <div className="url-list">
          <h4>Saved URLs:</h4>
          {urls.length > 0 ? (
            <ul>
              {urls.map((url, index) => (
                <li key={index}>
                  <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No URLs saved yet.</p>
          )}
        </div>
      </div>

      <div className="file-manager-section">
        <h3>Upload Files</h3>
        <div className="file-upload">
          <input
            type="file"
            id="file-upload"
            onChange={handleFileUpload}
            multiple
            disabled={uploading}
          />
          <label htmlFor="file-upload" className={`file-upload-label ${uploading ? 'disabled' : ''}`}>
            {uploading ? 'Uploading...' : 'Choose Files'}
          </label>
        </div>

        <div className="file-list">
          <h4>Uploaded Files:</h4>
          {files.length > 0 ? (
            <ul>
              {files.map((file, index) => (
                <li key={index}>
                  <a href={file.path} download>{file.name}</a>
                  <span className="file-date">
                    {new Date(file.uploadDate).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No files uploaded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VentureFileManager;