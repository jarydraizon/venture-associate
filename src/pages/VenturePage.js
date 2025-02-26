
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const VenturePage = () => {
    const { ventureName } = useParams();
    const [sources, setSources] = useState([]);

    return (
        <div className="venture-page">
            <header className="venture-header">
                <h1>{ventureName}</h1>
                <div className="header-actions">
                    <button className="share-btn">Share</button>
                    <button className="settings-btn">Settings</button>
                </div>
            </header>
            
            <div className="content-layout">
                <div className="sources-panel">
                    <div className="sources-header">
                        <h2>Sources</h2>
                        <button className="add-source-btn">+ Add source</button>
                    </div>
                    {sources.length === 0 ? (
                        <div className="empty-sources">
                            <div className="placeholder-icon">📄</div>
                            <p>Saved sources will appear here</p>
                            <p className="subtitle">Click Add source above to add PDFs, websites, text, videos or audio files. Or import a file directly from Google Drive.</p>
                        </div>
                    ) : (
                        <div className="sources-list">
                            {sources.map(source => (
                                <div key={source.id} className="source-item">
                                    {source.title}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                
                <div className="chat-panel">
                    <div className="empty-chat">
                        <div className="upload-prompt">
                            <div className="upload-icon">⬆️</div>
                            <h2>Add a source to get started</h2>
                            <button className="upload-btn">Upload a source</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VenturePage;
