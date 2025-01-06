import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';

const VentureList = () => {
    const [ventures, setVentures] = useState([]);
    const [files, setFiles] = useState([]);
    const [webUrls, setWebUrls] = useState([]);
    const [youtubeUrls, setYoutubeUrls] = useState([]);
    const [otherCompanies, setOtherCompanies] = useState([]);
    const [error, setError] = useState('');
    
    // Modal states
    const [activeModal, setActiveModal] = useState(null);
    const [formData, setFormData] = useState({});

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No authentication token found');
                return;
            }
            
            const headers = { 'Authorization': `Bearer ${token}` };
            console.log('Fetching data with token:', token);
            
            const [venturesRes, filesRes, webRes, youtubeRes, companiesRes] = await Promise.all([
                axios.get('/api/ventures', { headers }),
                axios.get('/api/ventures/files', { headers }),
                axios.get('/api/ventures/web-urls', { headers }),
                axios.get('/api/ventures/youtube-urls', { headers }),
                axios.get('/api/ventures/other-companies', { headers })
            ]);

            setVentures(venturesRes.data.ventures || []);
            setFiles(filesRes.data.files || []);
            setWebUrls(webRes.data.webUrls || []);
            setYoutubeUrls(youtubeRes.data.youtubeUrls || []);
            setOtherCompanies(companiesRes.data.companies || []);
        } catch (error) {
            console.error('Error fetching data:', error.response || error);
            setError(error.response?.data?.error || 'Failed to fetch data');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const headers = { 'Authorization': `Bearer ${token}` };

        try {
            switch(activeModal) {
                case 'file':
                    await axios.post('/api/ventures/files', formData, { headers });
                    break;
                case 'webUrl':
                    await axios.post('/api/ventures/web-urls', formData, { headers });
                    break;
                case 'youtubeUrl':
                    await axios.post('/api/ventures/youtube-urls', formData, { headers });
                    break;
                case 'company':
                    await axios.post('/api/ventures/other-companies', formData, { headers });
                    break;
                default:
                    return;
            }
            
            fetchData();
            setActiveModal(null);
            setFormData({});
        } catch (error) {
            setError(error.response?.data?.error || 'Failed to add item');
        }
    };

    const handleToggleActive = async (ventureId) => {
        try {
            const token = localStorage.getItem('token');
            const headers = { 'Authorization': `Bearer ${token}` };
            await axios.put(`/api/ventures/${ventureId}/toggle-active`, {}, { headers });
            fetchData();
        } catch (error) {
            setError(error.response?.data?.error || 'Failed to toggle active status');
        }
    };

    return (
        <div className="venture-list">
            <h2>Your Ventures</h2>
            {error && <p className="error">{error}</p>}
            
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Created At</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventures.map(venture => (
                            <tr key={venture.venture_id}>
                                <td>{venture.name}</td>
                                <td>{venture.description}</td>
                                <td>{new Date(venture.created_at).toLocaleDateString()}</td>
                                <td>
                                    {venture.active ? (
                                        <button className="deactivate" onClick={() => handleToggleActive(venture.venture_id)}>
                                            Deactivate
                                        </button>
                                    ) : (
                                        <button className="activate" onClick={() => handleToggleActive(venture.venture_id)}>
                                            Activate
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <h3>Files</h3>
            <button className="add-button" onClick={() => setActiveModal('file')}>Add New File</button>
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
            <button className="add-button" onClick={() => setActiveModal('webUrl')}>Add New Web URL</button>
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
            <button className="add-button" onClick={() => setActiveModal('youtubeUrl')}>Add New YouTube URL</button>
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
            <button className="add-button" onClick={() => setActiveModal('company')}>Add New Company</button>
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

            <Modal
                isOpen={activeModal === 'file'}
                onClose={() => setActiveModal(null)}
                title="Add New File"
            >
                <form onSubmit={handleSubmit} className="modal-form">
                    <input
                        type="text"
                        placeholder="File Name"
                        value={formData.name || ''}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        required
                    />
                    <input
                        type="url"
                        placeholder="File URL"
                        value={formData.url || ''}
                        onChange={e => setFormData({...formData, url: e.target.value})}
                        required
                    />
                    <button type="submit">Add File</button>
                </form>
            </Modal>

            <Modal
                isOpen={activeModal === 'webUrl'}
                onClose={() => setActiveModal(null)}
                title="Add New Web URL"
            >
                <form onSubmit={handleSubmit} className="modal-form">
                    <input
                        type="text"
                        placeholder="URL Name"
                        value={formData.name || ''}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        required
                    />
                    <input
                        type="url"
                        placeholder="Web URL"
                        value={formData.url || ''}
                        onChange={e => setFormData({...formData, url: e.target.value})}
                        required
                    />
                    <button type="submit">Add Web URL</button>
                </form>
            </Modal>

            <Modal
                isOpen={activeModal === 'youtubeUrl'}
                onClose={() => setActiveModal(null)}
                title="Add New YouTube URL"
            >
                <form onSubmit={handleSubmit} className="modal-form">
                    <input
                        type="text"
                        placeholder="Video Name"
                        value={formData.name || ''}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        required
                    />
                    <input
                        type="url"
                        placeholder="YouTube URL"
                        value={formData.url || ''}
                        onChange={e => setFormData({...formData, url: e.target.value})}
                        required
                    />
                    <button type="submit">Add YouTube URL</button>
                </form>
            </Modal>

            <Modal
                isOpen={activeModal === 'company'}
                onClose={() => setActiveModal(null)}
                title="Add Related Company"
            >
                <form onSubmit={handleSubmit} className="modal-form">
                    <input
                        type="text"
                        placeholder="Company Name"
                        value={formData.name || ''}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Company Type"
                        value={formData.type || ''}
                        onChange={e => setFormData({...formData, type: e.target.value})}
                        required
                    />
                    <button type="submit">Add Company</button>
                </form>
            </Modal>
        </div>
    );
};

export default VentureList;