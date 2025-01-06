
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VentureList = () => {
    const [ventures, setVentures] = useState([]);
    const [files, setFiles] = useState([]);
    const [webUrls, setWebUrls] = useState([]);
    const [youtubeUrls, setYoutubeUrls] = useState([]);
    const [otherCompanies, setOtherCompanies] = useState([]);
    const [error, setError] = useState('');

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = { 'Authorization': `Bearer ${token}` };
            
            const [venturesRes, filesRes, webRes, youtubeRes, companiesRes] = await Promise.all([
                axios.get('/api/ventures', { headers }),
                axios.get('/api/ventures/files', { headers }),
                axios.get('/api/ventures/web-urls', { headers }),
                axios.get('/api/ventures/youtube-urls', { headers }),
                axios.get('/api/ventures/other-companies', { headers })
            ]);

            setVentures(venturesRes.data.ventures);
            setFiles(filesRes.data.files);
            setWebUrls(webRes.data.webUrls);
            setYoutubeUrls(youtubeRes.data.youtubeUrls);
            setOtherCompanies(companiesRes.data.companies);
        } catch (error) {
            setError('Failed to fetch data');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const toggleActive = async (ventureId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`/api/ventures/${ventureId}/toggle`, {}, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            await fetchData();
        } catch (err) {
            setError('Failed to toggle venture status');
        }
    };

    return (
        <div className="venture-list">
            <h2>Your Ventures</h2>
            {error && <p className="error">{error}</p>}
            
            <h3>Ventures</h3>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Created At</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventures.map(venture => (
                            <tr key={venture.venture_id}>
                                <td>{venture.name}</td>
                                <td>{venture.description}</td>
                                <td>{new Date(venture.created_at).toLocaleDateString()}</td>
                                <td>{venture.active ? 'Active' : 'Inactive'}</td>
                                <td>
                                    <button 
                                        onClick={() => toggleActive(venture.venture_id)}
                                        className={venture.active ? 'deactivate' : 'activate'}
                                    >
                                        {venture.active ? 'Deactivate' : 'Activate'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <h3>Files</h3>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>URL</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {files.map(file => (
                            <tr key={file.file_id}>
                                <td>{file.name}</td>
                                <td><a href={file.url} target="_blank" rel="noopener noreferrer">{file.url}</a></td>
                                <td>{new Date(file.created_at).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <h3>Web URLs</h3>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>URL</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {webUrls.map(url => (
                            <tr key={url.url_id}>
                                <td>{url.name}</td>
                                <td><a href={url.url} target="_blank" rel="noopener noreferrer">{url.url}</a></td>
                                <td>{new Date(url.created_at).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <h3>YouTube URLs</h3>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>URL</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {youtubeUrls.map(url => (
                            <tr key={url.youtube_id}>
                                <td>{url.name}</td>
                                <td><a href={url.url} target="_blank" rel="noopener noreferrer">{url.url}</a></td>
                                <td>{new Date(url.created_at).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <h3>Related Companies</h3>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {otherCompanies.map(company => (
                            <tr key={company.company_id}>
                                <td>{company.name}</td>
                                <td>{company.type}</td>
                                <td>{new Date(company.created_at).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VentureList;
