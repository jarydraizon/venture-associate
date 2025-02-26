
import React, { useState } from 'react';

const QuickLinkSync = () => {
  const [url, setUrl] = useState('');
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/quicklink', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      setLinks(data.links);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  return (
    <div className="quick-link-container">
      <h2>QuickLinkSync</h2>
      <form onSubmit={handleSubmit} className="quick-link-form">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter website URL"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Extract Links'}
        </button>
      </form>
      {links.length > 0 && (
        <div className="links-container">
          <h3>Found Links:</h3>
          <ul>
            {links.map((link, index) => (
              <li key={index}>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default QuickLinkSync;
